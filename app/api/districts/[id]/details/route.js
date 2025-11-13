import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


/**
 * GET /api/districts/[id]/details
 * Fetches a single district, its tehsils,
 * and all prabharis for each of those tehsils.
 * This powers the details modal. (Protected)
 */
export  async function GET(request, context) {
 

  const { id} = await context.params;


  try {
    const districtDetails = await prisma.district.findUnique({
      where: { id: id },
      include: {
        // Get all tehsils under this district
        tehsils: {
          orderBy: { name: 'asc' },
          include: {
            // For EACH tehsil, get all its prabharis
            prabharis: {
              orderBy: { name: 'asc' },
            },
          },
        },
      },
    });

    if (!districtDetails) {
      return NextResponse.json({ error: 'District not found' }, { status: 404 });
    }

    return NextResponse.json(districtDetails);
  } catch (error) {
    console.error(`[API] Failed to fetch district details for ${id}:`, error);
    return NextResponse.json({ error: 'Failed to fetch district details' }, { status: 500 });
  }
}