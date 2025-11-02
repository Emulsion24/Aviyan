import { prisma } from "@/lib/prisma";

export async function GET(req) {
  try {
    // Extract and parse query parameters
    const { search, state, district, village, page = "1" } =
      Object.fromEntries(req.nextUrl.searchParams);

    const take = 10;
    const pageNumber = parseInt(page, 10);
    const skip = isNaN(pageNumber) || pageNumber < 1 ? 0 : (pageNumber - 1) * take;

    // Build Prisma filter dynamically
    const where = {
      AND: [
        search
          ? {
              OR: [
                { name: { contains: search,  } },
                { email: { contains: search, } },
              ],
            }
          : {},
        state ? { state: { equals: state, } } : {},
        district ? { district: { equals: district,  } } : {},
        village ? { village: { equals: village, } } : {},
      ],
    };

    // Fetch data and total count in parallel
    const [data, total] = await Promise.all([
      prisma.submission.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      prisma.user.count({ where }),
    ]);

    // Return structured response
    return Response.json(
      {
        success: true,
        data,
        pagination: {
          total,
          totalPages: Math.ceil(total / take),
          currentPage: pageNumber,
          pageSize: take,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching users:", error);

    return Response.json(
      {
        success: false,
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
