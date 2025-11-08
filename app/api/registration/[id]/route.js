// app/api/registration/[id]/route.ts
import { verify } from "jsonwebtoken";
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
// GET - Fetch single registration by ID
async function verifyAuth(request) {
  try {
    const token = request.cookies.get("auth_token")?.value;
    if (!token) return null;
    return verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
export async function GET(request,Content) {
  try {
    const user = await verifyAuth(request);
        if (!user) {
          return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
          );
        }
    const { id } = await Content.params;
    const registration = await prisma.registration.findUnique({
      where: { id:id },
    });

    if (!registration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'पंजीकरण नहीं मिला / Registration not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: registration,
    });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch registration',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// PUT - Update registration
export async function PUT(
  request,Content
) {

  try {
        const user = await verifyAuth(request);
        if (!user) {
          return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
          );
        }
        const { id } = await Content.params;
    const body = await request.json();
    const { name, phone, email, altPhone, state, district, village, meetingInfo } = body;

    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id: id},
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'पंजीकरण नहीं मिला / Registration not found' 
        },
        { status: 404 }
      );
    }

    // Validate phone number if provided
    if (phone && (phone.length !== 10 || !/^\d{10}$/.test(phone))) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'कृपया 10 अंकों का फ़ोन नंबर दर्ज करें / Please enter a valid 10-digit phone number' 
        },
        { status: 400 }
      );
    }

    // Check if new phone number already exists (and it's not the current record)
    if (phone && phone !== existingRegistration.phone) {
      const phoneExists = await prisma.registration.findUnique({
        where: { phone },
      });

      if (phoneExists) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'यह फ़ोन नंबर पहले से पंजीकृत है / This phone number is already registered' 
          },
          { status: 409 }
        );
      }
    }

    // Update registration
    const updatedRegistration = await prisma.registration.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(email !== undefined && { email: email || null }),
        ...(altPhone !== undefined && { altPhone: altPhone || null }),
        ...(state && { state }),
        ...(district && { district }),
        ...(village && { village }),
        ...(meetingInfo !== undefined && { meetingInfo: meetingInfo || null }),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'पंजीकरण अपडेट हो गया / Registration updated successfully',
      data: updatedRegistration,
    });
  } catch (error) {
    console.error('PUT Error:', error);

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
        error: 'अपडेट में त्रुटि / Update failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}



// DELETE - Delete registration
export async function DELETE(
  request,Content
) {
  try {
        const user = await verifyAuth(request);
        if (!user) {
          return NextResponse.json(
            { success: false, error: "Unauthorized" },
            { status: 401 }
          );
        }
     const { id } = await Content.params;
    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id: id },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'पंजीकरण नहीं मिला / Registration not found' 
        },
        { status: 404 }
      );
    }

    // Delete registration
    await prisma.registration.delete({
      where: { id: id },
    });

    return NextResponse.json({
      success: true,
      message: 'पंजीकरण हटा दिया गया / Registration deleted successfully',
    });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'डिलीट में त्रुटि / Delete failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}