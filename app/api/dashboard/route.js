// app/api/dashboard/route.js
import { prisma } from "@/lib/prisma";


export async function GET(req) {
  try {
    // Verify authentication

    const { searchParams } = req.nextUrl;
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const district = searchParams.get("district") || "";
    const village = searchParams.get("village") || "";
    const pincode = searchParams.get("pincode") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);

    const take = 20; // Items per page
    const skip = (page - 1) * take;

    // Build optimized where clause
    const where = {};
    const conditions = [];

    // Search condition (name or email)
    if (search.trim()) {
      conditions.push({
        OR: [
          { name: { contains: search,  } },
          { email: { contains: search,  } },
        ],
      });
    }

    // Filter conditions
    if (state) {
      conditions.push({ state: { equals: state,  } });
    }
    if (district) {
      conditions.push({ district: { equals: district,  } });
    }
    if (village) {
      conditions.push({ village: { equals: village, } });
    }
    if (pincode) {
      conditions.push({ pincode: { equals: pincode } });
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