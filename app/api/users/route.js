import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
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
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search,  } },
            { email: { contains: search,  } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: users,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("User fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create user" },
      { status: 500 }
    );
  }
}
