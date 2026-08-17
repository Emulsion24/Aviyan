import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const MAX_MEMBERS = 20;
const MAX_LIMIT = 100;

const ALLOWED_LANGUAGES = new Set([
  "hi",
  "en",
  "bn",
  "mr",
  "te",
  "ta",
  "gu",
  "kn",
  "ml",
  "or",
  "pa",
  "as",
  "ur",
]);

/*
|--------------------------------------------------------------------------
| RESPONSE HELPERS
|--------------------------------------------------------------------------
*/

function errorResponse(message, status = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

function successResponse(data, status = 200) {
  return NextResponse.json(
    {
      success: true,
      ...data,
    },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

/*
|--------------------------------------------------------------------------
| STRING CLEANING
|--------------------------------------------------------------------------
*/

function cleanString(value, maxLength = 255) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

/*
|--------------------------------------------------------------------------
| ID VALIDATION
|--------------------------------------------------------------------------
*/

function isValidId(value) {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= 100
  );
}

/*
|--------------------------------------------------------------------------
| PHONE VALIDATION
|--------------------------------------------------------------------------
*/

function isValidIndianPhone(phone) {
  return /^[6-9]\d{9}$/.test(phone);
}

/*
|--------------------------------------------------------------------------
| ADMIN AUTHENTICATION
|--------------------------------------------------------------------------
|
| This is used ONLY by GET.
|
| POST remains public.
|
|--------------------------------------------------------------------------
*/

async function authenticateAdmin(req) {
  /*
   * Get JWT from HTTP-only cookie
   */

  const token =
    req.cookies.get("auth_token")?.value;

  if (!token) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message:
            "No authentication token found",
        },
        { status: 401 }
      ),
    };
  }

  /*
   * Verify JWT
   */

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch (error) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message:
            "Invalid or expired token",
        },
        { status: 401 }
      ),
    };
  }

  /*
   * Make sure decoded token is an object
   */

  if (
    !decoded ||
    typeof decoded !== "object"
  ) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Invalid token",
        },
        { status: 401 }
      ),
    };
  }

  /*
   * Your existing JWT seems to use either:
   *
   * decoded.userId
   * OR
   * decoded.id
   */

  const userId =
    decoded.userId ?? decoded.id;

  if (!userId) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message:
            "Invalid authentication token",
        },
        { status: 401 }
      ),
    };
  }

  /*
   * Check that the user still exists.
   *
   * This is important because deleting a user from
   * the database should invalidate their access even
   * if their JWT has not expired yet.
   */

  const user =
    await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },

      select: {
        id: true,
        email: true,
        name: true,
      },
    });

  if (!user) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "User not found",
        },
        { status: 401 }
      ),
    };
  }

  return {
    success: true,
    user,
  };
}


/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
|
| PUBLIC
|
| Anyone can submit the protest registration.
|
|--------------------------------------------------------------------------
*/

export async function POST(req) {
  const requestId =
    crypto.randomUUID();

  try {
    /*
    |--------------------------------------------------------------------------
    | CONTENT TYPE
    |--------------------------------------------------------------------------
    */

    const contentType =
      req.headers.get(
        "content-type"
      ) || "";

    if (
      !contentType
        .toLowerCase()
        .includes(
          "application/json"
        )
    ) {
      return errorResponse(
        "Content-Type must be application/json.",
        415
      );
    }

    /*
    |--------------------------------------------------------------------------
    | PARSE BODY
    |--------------------------------------------------------------------------
    */

    let body;

    try {
      body = await req.json();
    } catch {
      return errorResponse(
        "Invalid JSON request body."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | BASIC BODY VALIDATION
    |--------------------------------------------------------------------------
    */

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return errorResponse(
        "Invalid request body."
      );
    }

    const {
      language,
      wantsToAttendCapital,
      members,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | LANGUAGE
    |--------------------------------------------------------------------------
    */

    if (
      typeof language !==
        "string" ||
      !ALLOWED_LANGUAGES.has(
        language
      )
    ) {
      return errorResponse(
        "Invalid language."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | ATTENDANCE
    |--------------------------------------------------------------------------
    */

    if (
      wantsToAttendCapital !==
      true
    ) {
      return errorResponse(
        "You must confirm that you want to attend the capital protest."
      );
    }

    /*
    |--------------------------------------------------------------------------
    | MEMBERS
    |--------------------------------------------------------------------------
    */

    if (
      !Array.isArray(members)
    ) {
      return errorResponse(
        "Members must be an array."
      );
    }

    if (
      members.length === 0
    ) {
      return errorResponse(
        "At least one member is required."
      );
    }

    if (
      members.length >
      MAX_MEMBERS
    ) {
      return errorResponse(
        `Maximum ${MAX_MEMBERS} members can be registered at once.`
      );
    }

    /*
    |--------------------------------------------------------------------------
    | VALIDATE MEMBERS
    |--------------------------------------------------------------------------
    */

    const validatedMembers = [];

    const phoneSet = new Set();

    for (
      let i = 0;
      i < members.length;
      i++
    ) {
      const member =
        members[i];

      if (
        !member ||
        typeof member !==
          "object" ||
        Array.isArray(member)
      ) {
        return errorResponse(
          `Invalid member data at position ${
            i + 1
          }.`
        );
      }

      const name =
        cleanString(
          member.name,
          100
        );

      const phone =
        String(
          member.phone ||
            ""
        ).trim();

      const stateId =
        String(
          member.stateId ||
            ""
        ).trim();

      const districtId =
        String(
          member.districtId ||
            ""
        ).trim();

      const tehsilId =
        String(
          member.tehsilId ||
            ""
        ).trim();

      /*
      |--------------------------------------------------------------------------
      | NAME
      |--------------------------------------------------------------------------
      */

      if (!name) {
        return errorResponse(
          `Member ${
            i + 1
          }: name is required.`
        );
      }

      if (
        name.length < 2
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: name is too short.`
        );
      }

      if (
        !/^[\p{L}\p{M} .'\-]+$/u.test(
          name
        )
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: invalid characters in name.`
        );
      }

      /*
      |--------------------------------------------------------------------------
      | PHONE
      |--------------------------------------------------------------------------
      */

      if (
        !isValidIndianPhone(
          phone
        )
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: invalid Indian mobile number.`
        );
      }

      /*
       * Prevent duplicate numbers inside
       * the same submission.
       */

      if (
        phoneSet.has(phone)
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: duplicate mobile number.`
        );
      }

      phoneSet.add(phone);

      /*
      |--------------------------------------------------------------------------
      | LOCATION IDS
      |--------------------------------------------------------------------------
      */

      if (
        !isValidId(stateId)
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: invalid state.`
        );
      }

      if (
        !isValidId(districtId)
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: invalid district.`
        );
      }

      if (
        !isValidId(tehsilId)
      ) {
        return errorResponse(
          `Member ${
            i + 1
          }: invalid tehsil.`
        );
      }

      validatedMembers.push({
        name,
        phone,
        stateId,
        districtId,
        tehsilId,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | VERIFY STATE → DISTRICT → TEHSIL
    |--------------------------------------------------------------------------
    */

    const verifiedMembers = [];

    for (
      let i = 0;
      i <
      validatedMembers.length;
      i++
    ) {
      const member =
        validatedMembers[i];

      /*
      |--------------------------------------------------------------------------
      | STATE
      |--------------------------------------------------------------------------
      */

      const state =
        await prisma.state.findUnique(
          {
            where: {
              id: member.stateId,
            },

            select: {
              id: true,
              name: true,
            },
          }
        );

      if (!state) {
        return errorResponse(
          `Member ${
            i + 1
          }: selected state does not exist.`
        );
      }

      /*
      |--------------------------------------------------------------------------
      | DISTRICT
      |--------------------------------------------------------------------------
      |
      | Make sure district belongs to
      | selected state.
      |
      */

      const district =
        await prisma.district.findFirst(
          {
            where: {
              id:
                member.districtId,

              stateId:
                state.id,
            },

            select: {
              id: true,
              name: true,
            },
          }
        );

      if (!district) {
        return errorResponse(
          `Member ${
            i + 1
          }: selected district does not belong to the selected state.`
        );
      }

      /*
      |--------------------------------------------------------------------------
      | TEHSIL
      |--------------------------------------------------------------------------
      |
      | Make sure tehsil belongs to
      | selected district.
      |
      */

      const tehsil =
        await prisma.tehsil.findFirst(
          {
            where: {
              id:
                member.tehsilId,

              districtId:
                district.id,
            },

            select: {
              id: true,
              name: true,
            },
          }
        );

      if (!tehsil) {
        return errorResponse(
          `Member ${
            i + 1
          }: selected tehsil does not belong to the selected district.`
        );
      }

      verifiedMembers.push({
        name:
          member.name,

        phone:
          member.phone,

        stateId:
          state.id,

        districtId:
          district.id,

        tehsilId:
          tehsil.id,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | DATABASE TRANSACTION
    |--------------------------------------------------------------------------
    */

    const registration =
      await prisma.$transaction(
        async (tx) => {
          return tx.protestRegistration.create(
            {
              data: {
                language,
                wantsToAttendCapital,

                members: {
                  create:
                    verifiedMembers.map(
                      (
                        member
                      ) => ({
                        name:
                          member.name,

                        phone:
                          member.phone,

                        stateId:
                          member.stateId,

                        districtId:
                          member.districtId,

                        tehsilId:
                          member.tehsilId,
                      })
                    ),
                },
              },

              select: {
                id: true,
                createdAt: true,

                members: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            }
          );
        }
      );

    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    return successResponse(
      {
        message:
          "Registration submitted successfully.",

        registrationId:
          registration.id,

        membersRegistered:
          registration
            .members.length,
      },
      201
    );
  } catch (error) {
    console.error(
      "❌ Protest registration POST error:",
      {
        requestId,
        error,
      }
    );

    if (
      error?.code ===
      "P2002"
    ) {
      return errorResponse(
        "This registration already exists.",
        409
      );
    }

    return errorResponse(
      "Unable to process your registration right now. Please try again later.",
      500
    );
  }
}


/*
|--------------------------------------------------------------------------
| GET
|--------------------------------------------------------------------------
|
| ADMIN ONLY
|
|--------------------------------------------------------------------------
*/

export async function GET(req) {
  try {
    /*
    |--------------------------------------------------------------------------
    | ADMIN AUTHENTICATION
    |--------------------------------------------------------------------------
    */

    const auth =
      await authenticateAdmin(
        req
      );

    if (!auth.success) {
      return auth.response;
    }

    /*
    |--------------------------------------------------------------------------
    | QUERY PARAMETERS
    |--------------------------------------------------------------------------
    */

    const {
      searchParams,
    } = req.nextUrl;

    const search =
      cleanString(
        searchParams.get(
          "search"
        ) || "",
        100
      );

    const stateId =
      cleanString(
        searchParams.get(
          "stateId"
        ) || "",
        100
      );

    const districtId =
      cleanString(
        searchParams.get(
          "districtId"
        ) || "",
        100
      );

    const tehsilId =
      cleanString(
        searchParams.get(
          "tehsilId"
        ) || "",
        100
      );

    const language =
      cleanString(
        searchParams.get(
          "language"
        ) || "",
        20
      );

    /*
    |--------------------------------------------------------------------------
    | PAGE
    |--------------------------------------------------------------------------
    */

    let page =
      parseInt(
        searchParams.get(
          "page"
        ) || "1",
        10
      );

    let limit =
      parseInt(
        searchParams.get(
          "limit"
        ) || "50",
        10
      );

    if (
      !Number.isInteger(
        page
      ) ||
      page < 1
    ) {
      page = 1;
    }

    if (
      !Number.isInteger(
        limit
      ) ||
      limit < 1
    ) {
      limit = 50;
    }

    if (
      limit >
      MAX_LIMIT
    ) {
      limit =
        MAX_LIMIT;
    }

    const skip =
      (page - 1) *
      limit;

    /*
    |--------------------------------------------------------------------------
    | WHERE CLAUSE
    |--------------------------------------------------------------------------
    */

    const where = {};

    /*
    |--------------------------------------------------------------------------
    | STATE FILTER
    |--------------------------------------------------------------------------
    */

    if (stateId) {
      where.stateId =
        stateId;
    }

    /*
    |--------------------------------------------------------------------------
    | DISTRICT FILTER
    |--------------------------------------------------------------------------
    */

    if (districtId) {
      where.districtId =
        districtId;
    }

    /*
    |--------------------------------------------------------------------------
    | TEHSIL FILTER
    |--------------------------------------------------------------------------
    */

    if (tehsilId) {
      where.tehsilId =
        tehsilId;
    }

    /*
    |--------------------------------------------------------------------------
    | SEARCH
    |--------------------------------------------------------------------------
    */

    if (search) {
      where.OR = [
        {
          name: {
            contains:
              search,
          },
        },
        {
          phone: {
            contains:
              search,
          },
        },
      ];
    }

    /*
    |--------------------------------------------------------------------------
    | LANGUAGE FILTER
    |--------------------------------------------------------------------------
    */

    if (language) {
      where.registration = {
        language,
      };
    }

    /*
    |--------------------------------------------------------------------------
    | DATABASE QUERY
    |--------------------------------------------------------------------------
    */

    const [
      registrations,
      filteredTotal,
    ] =
      await prisma.$transaction(
        [
          prisma.protestRegistrationMember.findMany(
            {
              where,

              skip,
              take: limit,

              orderBy: {
                createdAt:
                  "desc",
              },

              select: {
                id: true,

                name: true,
                phone: true,

                createdAt: true,

                state: {
                  select: {
                    id: true,
                    name: true,
                  },
                },

                district: {
                  select: {
                    id: true,
                    name: true,
                  },
                },

                tehsil: {
                  select: {
                    id: true,
                    name: true,
                  },
                },

                registration: {
                  select: {
                    id: true,
                    language: true,
                    wantsToAttendCapital:
                      true,
                    createdAt:
                      true,
                  },
                },
              },
            }
          ),

          prisma.protestRegistrationMember.count(
            {
              where,
            }
          ),
        ]
      );

    /*
    |--------------------------------------------------------------------------
    | TOTAL REGISTRATIONS
    |--------------------------------------------------------------------------
    */

    const total =
      await prisma.protestRegistrationMember.count();

    /*
    |--------------------------------------------------------------------------
    | PAGINATION
    |--------------------------------------------------------------------------
    */

    const totalPages =
      Math.ceil(
        filteredTotal /
          limit
      );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    return successResponse({
      data: registrations,

      total,

      filteredTotal,

      totalPages,

      currentPage:
        page,

      pageSize:
        limit,

      hasNextPage:
        page <
        totalPages,

      hasPreviousPage:
        page > 1,

      admin: {
        id:
          auth.user.id,

        email:
          auth.user.email,
      },
    });
  } catch (error) {
    console.error(
      "❌ Protest registration GET error:",
      error
    );

    return errorResponse(
      "Failed to fetch protest registrations.",
      500
    );
  }
}