import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * GET /api/tehsils
 * Fetches tehsils with filtering (stateId, districtId, search) and pagination.
 * Includes nested prabharis.
 */
export async function GET(request) {
  // We assume this is a public read endpoint based on previous context.
  
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('districtId');
  const stateId = searchParams.get('stateId');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  let whereClause = {};

  // Build the whereClause for filtering
  if (districtId) {
    whereClause.districtId = districtId;
  } else if (stateId) {
    // If filtering by state, find tehsils whose parent district is in that state
    whereClause.district = {
      stateId: stateId,
    };
  }

  // Add search functionality
  if (search) {
    whereClause.OR = [
      { name: { contains: search } }, // Search by Tehsil name
      { prabharis: { some: { name: { contains: search } } } }, // Search by Prabhari name
      { district: { name: { contains: search } } }, // Search by District name
    ];
  }

  try {
    // 1. Fetch tehsils with pagination and filtering
    const tehsils = await prisma.tehsil.findMany({
      where: whereClause,
      skip: skip,
      take: limit,
      select: { 
        id: true, 
        name: true,
        districtId: true,
        district: {
          select: {
            name: true,
            stateId: true,
            state: {
              select: { name: true }
            }
          }
        },
        prabharis: {
          where: { level: 'TEHSIL' },
          select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            tehsilId: true,
          }
        }
      },
      orderBy: { name: 'asc' },
    });

    // 2. Get total count for pagination
    const totalCount = await prisma.tehsil.count({
      where: whereClause,
    });

    // 3. Format the final output
    const finalOutput = tehsils.map(tehsil => ({
        id: tehsil.id,
        name: tehsil.name,
        prabharis: tehsil.prabharis || [],
        districtId: tehsil.districtId,
        districtName: tehsil.district?.name,
        stateId: tehsil.district?.stateId,
        stateName: tehsil.district?.state?.name,
    }));

    return NextResponse.json({
        data: finalOutput,
        pagination: {
            page: page,
            limit: limit,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
        }
    });

  } catch (error) {
    console.error('[API] Failed to fetch tehsils and prabharis:', error);
    return NextResponse.json({ error: 'Failed to fetch tehsils and prabharis', details: error.message }, { status: 500 });
  }
}

/**
 * POST /api/tehsils
 * Finds or creates a new tehsil. (Protected)
 * This is used by the Tehsil Prabhari form.
 */
export async function POST(request) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { name, districtId } = body;

    if (!name || !districtId) {
      return NextResponse.json({ error: 'Missing required fields: name, districtId' }, { status: 400 });
    }

    // Find or create the tehsil
    const tehsil = await prisma.tehsil.upsert({
      where: {
        name_districtId: {
          name: name,
          districtId: districtId,
        },
      },
      update: {}, // No update needed if found
      create: {
        name: name,
        districtId: districtId,
      },
    });

    return NextResponse.json(tehsil, { status: 201 });
  } catch (error) {
    console.error('[API] Failed to create/find tehsil:', error);
    if (error.code === 'P2002') {
      // This helps the frontend know the 'upsert' found a match, which is not an error
      // We can find the existing one and return it
      const existingTehsil = await prisma.tehsil.findUnique({
         where: {
            name_districtId: {
              name: name,
              districtId: districtId,
            },
          },
      });
      return NextResponse.json(existingTehsil, { status: 200 });
    }
    return NextResponse.json({ error: 'Failed to create tehsil' }, { status: 500 });
  }
}