import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch distinct, valid values
    const [states, districts, villages] = await Promise.all([
      prisma.submission.findMany({
        select: { state: true },
        distinct: ["state"],
        where: {
          state: { notIn: ["", " "] },
          NOT: { state: null },
        },
        orderBy: { state: "asc" },
      }),
      prisma.submission.findMany({
        select: { district: true },
        distinct: ["district"],
        where: {
          district: { notIn: ["", " "] },
          NOT: { district: null },
        },
        orderBy: { district: "asc" },
      }),
      prisma.submission.findMany({
        select: { village: true },
        distinct: ["village"],
        where: {
          village: { notIn: ["", " "] },
          NOT: { village: null },
        },
        orderBy: { village: "asc" },
      }),
    ]);

    // Helper to clean & filter data
    const clean = (arr, key) =>
      arr
        .map((a) => a[key]?.trim())
        .filter(Boolean)
        .filter((v, i, self) => self.indexOf(v) === i);

    return Response.json({
      success: true,
      states: clean(states, "state"),
      districts: clean(districts, "district"),
      villages: clean(villages, "village"),
    });
  } catch (error) {
    console.error("❌ Filters API Error:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to fetch filter options",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
