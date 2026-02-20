import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    // 1. Parse the incoming form data
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    // 2. Convert the file to a Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 3. Upload to Cloudinary using a Promise wrapper (since upload_stream is callback-based)
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "gau-samman-downloads", // Optional: organize in a folder
          resource_type: "auto",          // Auto-detect (image, pdf, audio)
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      // Write the buffer to the stream
      uploadStream.end(buffer);
    });

    // 4. Return the Secure URL
    return NextResponse.json({ url: result.secure_url }, { status: 200 });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}