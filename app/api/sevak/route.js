import { NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import { verify } from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Verify authentication middleware
async function verifyAuth(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return null;
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// GET - Fetch sevaks with pagination and filters
export async function GET(request) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = searchParams.get("search") || "";
    const state = searchParams.get("state") || "";
    const district = searchParams.get("district") || "";
    const category = searchParams.get("category") || "";

    // Build filter conditions
    const where = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search,  } },
        { email: { contains: search, } },
        { phone: { contains: search,} },
        { state: { contains: search, } },
        { district: { contains: search,  } },
        { village: { contains: search,  } },
        { category: { contains: search,  } },
      ];
    }

    if (state) {
      where.state = state;
    }

    if (district) {
      where.district = district;
    }

    if (category) {
      where.category = category;
    }

    // Get total count with filters
    const total = await prisma.sevak.count();
    const filteredTotal = await prisma.sevak.count({ where });

    // Fetch sevaks with pagination
    const sevaks = await prisma.sevak.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      data: sevaks,
      total,
      filteredTotal,
      totalPages: Math.ceil(filteredTotal / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching sevaks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sevaks" },
      { status: 500 }
    );
  }
}

// POST - Create new sevak
export async function POST(request) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, phone, email, state, district, village, category } = body;

    // Validation
    if (!name || !phone || !state || !district || !village || !category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ["Zone Prabhari", "Rajya Prabhari", "Sambhag Prabhari"];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { success: false, error: "Invalid category" },
        { status: 400 }
      );
    }

    // Check if phone already exists
    const existingSevak = await prisma.sevak.findFirst({
      where: { phone },
    });

    if (existingSevak) {
      return NextResponse.json(
        { success: false, error: "Phone number already exists" },
        { status: 400 }
      );
    }

    // Create sevak
    const sevak = await prisma.sevak.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        state: state.trim(),
        district: district.trim(),
        village: village.trim(),
        category: category.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      data: sevak,
      message: "Sevak created successfully",
    });
  } catch (error) {
    console.error("Error creating sevak:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create sevak" },
      { status: 500 }
    );
  }
}