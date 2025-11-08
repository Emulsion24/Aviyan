// app/api/registration/route.js
import { verify } from "jsonwebtoken";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
const JWT_SECRET = process.env.JWT_SECRET ;
// GET - Fetch all registrations or search/filter
async function verifyAuth(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return null;
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
export async function GET(request) {
  try {
        const user = await verifyAuth(request);
            if (!user) {
              return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
              );
            }
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state');
    const district = searchParams.get('district');
    const phone = searchParams.get('phone');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build filter conditions
    const where = {};
    
    if (state) where.state = state;
    if (district) where.district = { contains: district };
    if (phone) where.phone = phone;

    // Fetch registrations with pagination
    const [registrations, total] = await Promise.all([
      prisma.registration.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      prisma.registration.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: registrations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registrations',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Create new registration
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, email, altPhone, state, district, village, meetingInfo } = body;

    // Validation
    if (!name || !phone || !state || !district || !village) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'कृपया सभी आवश्यक फ़ील्ड भरें / Please fill all required fields' 
        },
        { status: 400 }
      );
    }

    // Validate phone number format
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'कृपया 10 अंकों का फ़ोन नंबर दर्ज करें / Please enter a valid 10-digit phone number' 
        },
        { status: 400 }
      );
    }

    // Validate alternate phone if provided
    if (altPhone && (altPhone.length !== 10 || !/^\d{10}$/.test(altPhone))) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'कृपया वैकल्पिक फ़ोन नंबर 10 अंकों का दर्ज करें / Please enter a valid 10-digit alternate phone number' 
        },
        { status: 400 }
      );
    }

    // Check if phone number already exists - using findFirst instead of findUnique
    const existingRegistration = await prisma.registration.findFirst({
      where: { phone },
    });

    if (existingRegistration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'यह फ़ोन नंबर पहले से पंजीकृत है / This phone number is already registered' 
        },
        { status: 409 }
      );
    }

    // Create new registration
    const registration = await prisma.registration.create({
      data: {
        name,
        phone,
        email: email || null,
        altPhone: altPhone || null,
        state,
        district,
        village,
        meetingInfo: meetingInfo || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'पंजीकरण सफल! / Registration successful!',
        data: registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    
    // Handle Prisma unique constraint error
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'यह फ़ोन नंबर पहले से पंजीकृत है / This phone number is already registered' 
          },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'पंजीकरण में त्रुटि / Registration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}