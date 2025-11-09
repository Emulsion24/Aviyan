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



// DELETE - Delete registration
export async function DELETE(request, Content) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await Content.params;
    const numericId = parseInt(id); // ✅ FIXED: ensure id is Int

    // Check if registration exists
    const existingRegistration = await prisma.registration.findUnique({
      where: { id: numericId },
    });

    if (!existingRegistration) {
      return NextResponse.json(
        { success: false, error: 'पंजीकरण नहीं मिला / Registration not found' },
        { status: 404 }
      );
    }

    // Delete registration
    await prisma.registration.delete({
      where: { id: numericId }, // ✅ FIXED here too
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
