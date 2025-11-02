import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const { name, state, district, village, pincode, email, altphone,phone } = data;

    if (!name || !state || !district || !village || !pincode || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await prisma.submission.create({
      data: { name, state, district, village, pincode, email, altphone,phone },
    });

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
