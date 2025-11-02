import { prisma } from "@/lib/prisma";

export async function DELETE(req, context) {
  try {
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
