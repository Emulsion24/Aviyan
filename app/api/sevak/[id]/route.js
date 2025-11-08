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

// PUT - Update sevak
export async function PUT(request, context) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } =await context.params;
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

    // Check if sevak exists
    const existingSevak = await prisma.sevak.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSevak) {
      return NextResponse.json(
        { success: false, error: "Sevak not found" },
        { status: 404 }
      );
    }

    // Check if phone is being changed and if it already exists for another sevak
    if (phone !== existingSevak.phone) {
      const phoneExists = await prisma.sevak.findFirst({
        where: {
          phone,
          id: { not: parseInt(id) },
        },
      });

      if (phoneExists) {
        return NextResponse.json(
          { success: false, error: "Phone number already exists" },
          { status: 400 }
        );
      }
    }

    // Update sevak
    const updatedSevak = await prisma.sevak.update({
      where: { id: parseInt(id) },
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
      data: updatedSevak,
      message: "Sevak updated successfully",
    });
  } catch (error) {
    console.error("Error updating sevak:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update sevak" },
      { status: 500 }
    );
  }
}

// DELETE - Delete sevak
export async function DELETE(request, context) {
  try {
    const user = await verifyAuth(request);
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } =await context.params;

    // Check if sevak exists
    const existingSevak = await prisma.sevak.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingSevak) {
      return NextResponse.json(
        { success: false, error: "Sevak not found" },
        { status: 404 }
      );
    }

    // Delete sevak
    await prisma.sevak.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      success: true,
      message: "Sevak deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting sevak:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete sevak" },
      { status: 500 }
    );
  }
}