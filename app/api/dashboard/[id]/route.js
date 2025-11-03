import { prisma } from "@/lib/prisma";

export async function DELETE(req, context) {
  try {
    // Verify authentication (add your auth check here)
    
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