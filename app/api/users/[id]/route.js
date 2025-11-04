import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function DELETE(req, context) {
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
    // ✅ Unwrap params (because it's a Promise now)
    const { id } = await context.params;

    if (!id) {
      return Response.json({ error: "Missing user ID" }, { status: 400 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id, 10) },
    });

    return Response.json({ success: true, user: deletedUser });
  } catch (error) {
    console.error("DELETE user error:", error);
    return Response.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
