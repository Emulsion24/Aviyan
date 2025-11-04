import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
  try {
    // Verify authentication (add your auth check here)
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
    const { id } = await context.params;

    if (!id) {
      return Response.json(
        { success: false, error: "Submission ID is required" },
        { status: 400 }
      );
    }

    // Check if submission exists
    const submission = await prisma.submission.findUnique({
      where: { id: parseInt(id) },
    });

    if (!submission) {
      return Response.json(
        { success: false, error: "Submission not found" },
        { status: 404 }
      );
    }

    // Delete the submission
    await prisma.submission.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Submission Error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to delete submission",
        message: error.message,
      },
      { status: 500 }
    );
  }
}