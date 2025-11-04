// app/api/dashboard/route.js
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    // Verify authentication (add your auth check here if needed)
  const token = req.cookies.get("auth_token")?.value;
    
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "No authentication token found",
        },
        { status: 401 }
      );
    }

    // Verify JWT token
    // Verify JWT token
let decoded;
try {
  decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("Decoded token:", decoded); // Add this line to see what's in the token
} catch (err) {
  return NextResponse.json(
    {
      success: false,
      error: "Unauthorized",
      message: "Invalid or expired token",
    },
    { status: 401 }
  );
}

// Check if user exists and has admin role
const user = await prisma.user.findUnique({
  where: { id: decoded.userId || decoded.id }, // Try both
  select: { id: true, email: true },
});

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "User not found",
        },
        { status: 401 }
      );
    }

    
    const { searchParams } = req.nextUrl;
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const district = searchParams.get("district") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const take = 50; // Items per page
    const skip = (page - 1) * take;

    // Build optimized where clause
    const where = {};
    const conditions = [];

    // Enhanced search condition (name, email, state, district, or village)
    if (search.trim()) {
      conditions.push({
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { state: { contains: search } },
          { district: { contains: search } },
          { village: { contains: search } },
        ],
      });
    }

    // Filter conditions (only state and district)
    if (state) {
      conditions.push({ state: { equals: state } });
    }
    if (district) {
      conditions.push({ district: { equals: district } });
    }
    
    if (conditions.length > 0) {
      where.AND = conditions;
    }

    // Execute queries in parallel for better performance
    const [submissions, totalCount, filteredCount] = await Promise.all([
      prisma.submission.findMany({
        where,
        select: {
          id: true,
          name: true,
          altphone: true,
          email: true,
          phone: true,
          state: true,
          district: true,
          village: true,
          pincode: true,
          description:true,
          createdAt: true,
        },
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.submission.count(), // Total submissions
      prisma.submission.count({ where }), // Filtered count
    ]);

    const totalPages = Math.ceil(filteredCount / take);

    return Response.json({
      success: true,
      data: submissions,
      total: totalCount,
      filteredTotal: filteredCount,
      totalPages,
      currentPage: page,
      pageSize: take,
    });
  } catch (error) {
    console.error("❌ Dashboard API Error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch submissions",
        message: error.message,
      },
      { status: 500 }
    );
  }
}