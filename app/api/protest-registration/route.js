import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| CONFIG & CONSTANTS
|--------------------------------------------------------------------------
*/

const MAX_MEMBERS = 20;
const MAX_LIMIT = 100;
const MAX_PAYLOAD_SIZE = 50 * 1024; // 50 KB strict limit to prevent payload DDoS

const ALLOWED_LANGUAGES = new Set([
  "hi", "en", "bn", "mr", "te", "ta", "gu", "kn", "ml", "or", "pa", "as", "ur",
]);

/*
|--------------------------------------------------------------------------
| SECURITY: IN-MEMORY RATE LIMITER
|--------------------------------------------------------------------------
| Protects against basic HTTP floods from single IPs.
| Note: In serverless environments, this resets per cold boot, but still 
| mitigates severe burst attacks on active instances.
*/

const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // Max 5 submissions per minute per IP

function isRateLimited(ip) {
  if (!ip) return false; // Fallback if IP cannot be extracted
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  const requestTimestamps = rateLimitMap.get(ip) || [];
  // Filter out requests older than the window
  const currentRequests = requestTimestamps.filter((timestamp) => timestamp > windowStart);

  if (currentRequests.length >= MAX_REQUESTS_PER_WINDOW) {
    return true; // Rate limit exceeded
  }

  currentRequests.push(now);
  rateLimitMap.set(ip, currentRequests);
  return false;
}

/*
|--------------------------------------------------------------------------
| RESPONSE HELPERS
|--------------------------------------------------------------------------
*/

function errorResponse(message, status = 400) {
  return NextResponse.json(
    { success: false, error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

function successResponse(data, status = 200) {
  return NextResponse.json(
    { success: true, ...data },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

/*
|--------------------------------------------------------------------------
| UTILITIES
|--------------------------------------------------------------------------
*/

function cleanString(value, maxLength = 255) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function isValidId(value) {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= 100;
}

function isValidIndianPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

/*
|--------------------------------------------------------------------------
| ADMIN AUTHENTICATION
|--------------------------------------------------------------------------
*/

async function authenticateAdmin(req) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return { success: false, response: errorResponse("No authentication token found", 401) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || typeof decoded !== "object") throw new Error();

    const userId = decoded.userId ?? decoded.id;
    const numericUserId = Number(userId);

    if (!Number.isInteger(numericUserId) || numericUserId <= 0) throw new Error();

    const user = await prisma.user.findUnique({
      where: { id: numericUserId },
      select: { id: true, email: true, name: true },
    });

    if (!user) throw new Error();

    return { success: true, user };
  } catch (error) {
    return { success: false, response: errorResponse("Invalid or expired authentication", 401) };
  }
}

/*
|--------------------------------------------------------------------------
| POST: PUBLIC REGISTRATION (SECURED)
|--------------------------------------------------------------------------
*/

export async function POST(req) {
  const requestId = crypto.randomUUID();

  try {
    /*
    |--------------------------------------------------------------------------
    | SECURITY: IP & RATE LIMITING
    |--------------------------------------------------------------------------
    */
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : req.ip || "unknown-ip";

    if (isRateLimited(ip)) {
      return errorResponse("Too many requests from this IP. Please try again in a minute.", 429);
    }

    /*
    |--------------------------------------------------------------------------
    | SECURITY: ANTI-BOT & USER-AGENT CHECKS
    |--------------------------------------------------------------------------
    */
    const userAgent = req.headers.get("user-agent") || "";
    const lowerUA = userAgent.toLowerCase();
    
    // Block common automated tools and bots
    if (
      !userAgent || 
      lowerUA.includes("bot") || 
      lowerUA.includes("curl") || 
      lowerUA.includes("postman") || 
      lowerUA.includes("python") || 
      lowerUA.includes("node")
    ) {
      return errorResponse("Invalid client request.", 403);
    }

    /*
    |--------------------------------------------------------------------------
    | CONTENT TYPE & PAYLOAD SIZE CHECKS
    |--------------------------------------------------------------------------
    */
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return errorResponse("Content-Type must be application/json.", 415);
    }

    // Protect against Payload DDoS by parsing raw text first to check length
    const rawBody = await req.text();
    if (rawBody.length > MAX_PAYLOAD_SIZE) {
      return errorResponse("Payload too large.", 413);
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return errorResponse("Invalid JSON request body.");
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Invalid request body format.");
    }

    const { language, wantsToAttendCapital, members, reason, name, phone, stateId } = body;

    /*
    |--------------------------------------------------------------------------
    | VALIDATE CORE PARAMS
    |--------------------------------------------------------------------------
    */
    if (typeof language !== "string" || !ALLOWED_LANGUAGES.has(language)) {
      return errorResponse("Invalid language.");
    }

    if (typeof wantsToAttendCapital !== "boolean") {
      return errorResponse("Attendance confirmation is required.");
    }

    /* ========================================================================
       FLOW A: WANTS TO ATTEND (YES)
       ======================================================================== */
    if (wantsToAttendCapital === true) {
      if (!Array.isArray(members) || members.length === 0) {
        return errorResponse("At least one member is required.");
      }

      if (members.length > MAX_MEMBERS) {
        return errorResponse(`Maximum ${MAX_MEMBERS} members can be registered at once.`);
      }

      const validatedMembers = [];
      const phoneSet = new Set();

      for (let i = 0; i < members.length; i++) {
        const member = members[i];

        if (!member || typeof member !== "object" || Array.isArray(member)) {
          return errorResponse(`Invalid member data at position ${i + 1}.`);
        }

        const memberName = cleanString(member.name, 100);
        if (!memberName) return errorResponse(`Member ${i + 1}: name is required.`);
        if (memberName.length < 2) return errorResponse(`Member ${i + 1}: name is too short.`);
        if (!/^[\p{L}\p{M} .'\-]+$/u.test(memberName)) return errorResponse(`Member ${i + 1}: invalid characters in name.`);

        const memberPhone = String(member.phone || "").trim();
        if (!isValidIndianPhone(memberPhone)) return errorResponse(`Member ${i + 1}: invalid Indian mobile number.`);
        if (phoneSet.has(memberPhone)) return errorResponse(`Member ${i + 1}: duplicate mobile number within the form.`);
        phoneSet.add(memberPhone);

        let mStateId = "";
        let mDistrictId = "";
        let mTehsilId = "";
        let mVillage = "";

        if (i === 0) {
          mStateId = String(member.stateId || "").trim();
          mDistrictId = String(member.districtId || "").trim();
          mTehsilId = String(member.tehsilId || "").trim();
          mVillage = cleanString(member.village, 150);

          if (!isValidId(mStateId)) return errorResponse("Member 1: state is required.");
          if (!isValidId(mDistrictId)) return errorResponse("Member 1: district is required.");
          if (!isValidId(mTehsilId)) return errorResponse("Member 1: tehsil is required.");
          if (!mVillage || mVillage.length < 2) return errorResponse("Member 1: village name is required and cannot be too short.");
        }

        validatedMembers.push({
          name: memberName,
          phone: memberPhone,
          stateId: mStateId,
          districtId: mDistrictId,
          tehsilId: mTehsilId,
          village: mVillage,
        });
      }

      const primary = validatedMembers[0];

      // Verify Location Exists
      const state = await prisma.state.findUnique({ where: { id: primary.stateId }, select: { id: true } });
      if (!state) return errorResponse("Selected state does not exist.");

      const district = await prisma.district.findFirst({ where: { id: primary.districtId, stateId: state.id }, select: { id: true } });
      if (!district) return errorResponse("Selected district does not belong to the selected state.");

      const tehsil = await prisma.tehsil.findFirst({ where: { id: primary.tehsilId, districtId: district.id }, select: { id: true } });
      if (!tehsil) return errorResponse("Selected tehsil does not belong to the selected district.");

      const verifiedMembers = validatedMembers.map((m) => ({
        name: m.name,
        phone: m.phone,
        stateId: state.id,
        districtId: district.id,
        tehsilId: tehsil.id,
        village: primary.village,
      }));

      const registration = await prisma.protestRegistration.create({
        data: {
          language,
          wantsToAttendCapital: true,
          members: {
            create: verifiedMembers,
          },
        },
        select: { id: true },
      });

      return successResponse({ message: "Registration submitted successfully.", registrationId: registration.id }, 201);
    }

    /* ========================================================================
       FLOW B: DOES NOT WANT TO ATTEND (NO)
       ======================================================================== */
    if (wantsToAttendCapital === false) {
      const cleanReason = cleanString(reason, 1000);
      const cleanStateId = String(stateId || "").trim();
      const cleanName = name ? cleanString(name, 100) : null;
      const cleanPhone = phone ? String(phone).trim() : null;

      if (!isValidId(cleanStateId)) return errorResponse("State selection is required.");
      if (!cleanReason || cleanReason.length < 2) return errorResponse("Please provide a valid reason.");

      if (cleanName && !/^[\p{L}\p{M} .'\-]+$/u.test(cleanName)) {
        return errorResponse("Invalid characters in name.");
      }

      if (cleanPhone && !isValidIndianPhone(cleanPhone)) {
        return errorResponse("Invalid Indian mobile number.");
      }

      // Verify State exists
      const state = await prisma.state.findUnique({ where: { id: cleanStateId }, select: { id: true } });
      if (!state) return errorResponse("Selected state does not exist.");

      const registration = await prisma.protestRegistration.create({
        data: {
          language,
          wantsToAttendCapital: false,
          stateId: state.id,
          reason: cleanReason,
          name: cleanName,
          phone: cleanPhone,
        },
        select: { id: true },
      });

      return successResponse({ message: "Reasoning submitted successfully.", registrationId: registration.id }, 201);
    }

  } catch (error) {
    console.error(`❌ POST error [${requestId}]:`, error);
    if (error?.code === "P2002") return errorResponse("This submission already exists.", 409);
    if (error?.code === "P2003") return errorResponse("Invalid relational data.", 400);
    return errorResponse("Unable to process request right now. Please try again later.", 500);
  }
}

/*
|--------------------------------------------------------------------------
| GET (ADMIN ONLY) - FILTER & FETCH ALL DATA
|--------------------------------------------------------------------------
|
| Query Params:
| - type (attending | not_attending | all) -> defaults to 'attending'
| - search (name, phone, village, reason)
| - stateId, districtId, tehsilId
| - language
| - page, limit
|
*/

export async function GET(req) {
  try {
    const auth = await authenticateAdmin(req);
    if (!auth.success) return auth.response;

    const { searchParams } = req.nextUrl;
    
    // Determine which dataset to fetch
    const fetchType = cleanString(searchParams.get("type") || "attending", 20); // 'attending' or 'not_attending'
    
    const search = cleanString(searchParams.get("search") || "", 100);
    const stateId = cleanString(searchParams.get("stateId") || "", 100);
    const districtId = cleanString(searchParams.get("districtId") || "", 100);
    const tehsilId = cleanString(searchParams.get("tehsilId") || "", 100);
    const language = cleanString(searchParams.get("language") || "", 20);

    let page = parseInt(searchParams.get("page") || "1", 10);
    let limit = parseInt(searchParams.get("limit") || "50", 10);

    if (!Number.isInteger(page) || page < 1) page = 1;
    if (!Number.isInteger(limit) || limit < 1) limit = 50;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const skip = (page - 1) * limit;

    /* =========================================================
       FETCH TYPE: ATTENDING (YES FLOW - ProtestRegistrationMember)
       ========================================================= */
    if (fetchType === "attending") {
      const where = {};

      if (stateId) where.stateId = stateId;
      if (districtId) where.districtId = districtId;
      if (tehsilId) where.tehsilId = tehsilId;

      if (search) {
        where.OR = [
          { name: { contains: search } },
          { phone: { contains: search } },
          { village: { contains: search } },
        ];
      }

      if (language) {
        where.registration = { language };
      }

      const [registrations, filteredTotal, total] = await prisma.$transaction([
        prisma.protestRegistrationMember.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            phone: true,
            village: true,
            createdAt: true,
            state: { select: { id: true, name: true } },
            district: { select: { id: true, name: true } },
            tehsil: { select: { id: true, name: true } },
            registration: { select: { id: true, language: true, wantsToAttendCapital: true, createdAt: true } },
          },
        }),
        prisma.protestRegistrationMember.count({ where }),
        prisma.protestRegistrationMember.count(),
      ]);

      const totalPages = Math.ceil(filteredTotal / limit);

      return successResponse({
        type: "attending",
        data: registrations,
        total,
        filteredTotal,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      });
    }

    /* =========================================================
       FETCH TYPE: NOT ATTENDING (NO FLOW - ProtestRegistration)
       ========================================================= */
    if (fetchType === "not_attending") {
      const where = { wantsToAttendCapital: false };

      if (stateId) where.stateId = stateId;
      if (language) where.language = language;

      if (search) {
        where.OR = [
          { name: { contains: search } },
          { phone: { contains: search } },
          { reason: { contains: search } },
        ];
      }

      const [absentees, filteredTotal, total] = await prisma.$transaction([
        prisma.protestRegistration.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            phone: true,
            reason: true,
            language: true,
            createdAt: true,
            state: { select: { id: true, name: true } },
          },
        }),
        prisma.protestRegistration.count({ where }),
        prisma.protestRegistration.count({ where: { wantsToAttendCapital: false } }),
      ]);

      const totalPages = Math.ceil(filteredTotal / limit);

      return successResponse({
        type: "not_attending",
        data: absentees,
        total,
        filteredTotal,
        totalPages,
        currentPage: page,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      });
    }

    return errorResponse("Invalid fetch type specified.", 400);

  } catch (error) {
    console.error("❌ Protest registration GET error:", error);
    return errorResponse("Failed to fetch protest records.", 500);
  }
}