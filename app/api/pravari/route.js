import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";// Adjust path based on your setup

// GET - Fetch all pravaris with pagination, search, and filters
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';
    const state = searchParams.get('state') || '';
    const district = searchParams.get('district') || '';

    // Build where clause for filtering
    const where = {};

    // Search across multiple fields
    if (search) {
      where.OR = [
        { name: { contains: search, } },
        { email: { contains: search,  } },
        { phone: { contains: search,  } },
        { state: { contains: search, } },
        { district: { contains: search,  } },
        { village: { contains: search,  } },
        { role: { contains: search,  } },
      ];
    }

    // State filter
    if (state) {
      where.state = state;
    }

    // District filter
    if (district) {
      where.district = district;
    }

    // Get total count for pagination
    const total = await prisma.pravari.count({ where });

    // Get paginated and filtered data
    const pravaris = await prisma.pravari.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: pravaris,
      total,
      filteredTotal: total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching pravaris:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pravaris' },
      { status: 500 }
    );
  }
}

// POST - Create a new pravari
export async function POST(request) {
  try {
     const token = request.cookies.get("auth_token")?.value;
            
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
    const body = await request.json();
    const { name, phone, email, role, village, address, state, district, experience } = body;

    // Validation
    if (!name || !phone || !email || !role || !village || !address || !state || !district) {
      return NextResponse.json(
        { success: false, error: 'All required fields must be provided' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, error: 'Invalid phone format' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingPravari = await prisma.pravari.findUnique({
      where: { email },
    });

    if (existingPravari) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Create new pravari
    const pravari = await prisma.pravari.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        role: role.trim(),
        village: village.trim(),
        address: address.trim(),
        state: state.trim(),
        district: district.trim(),
        experience: experience ? experience.trim() : null,
      },
    });

    return NextResponse.json({
      success: true,
      data: pravari,
      message: 'Pravari created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating pravari:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create pravari' },
      { status: 500 }
    );
  }
}