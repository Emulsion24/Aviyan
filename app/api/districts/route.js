import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';


/**
 * GET /api/districts
 * Fetches districts, optionally filtering by stateId or sambhagId.
 * Includes nested District Prabharis for each district.
 */
export async function GET(request) {
  // Authentication check is usually done here
  // const auth = await verifyAuth(request);
  // if (!auth.success) {
  //   return NextResponse.json(auth, { status: auth.status });
  // }

  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('stateId');
  const sambhagId = searchParams.get('sambhagId');

  let whereClause = {};

  if (stateId) {
    whereClause.stateId = stateId;
  }
  
  // FIX: Using 'sambhag' (singular) with 'is' filter for one-to-many relationship.
  if (sambhagId) {
    whereClause.sambhag = {
        is: {
            id: sambhagId,
        },
    };
  }

  try {
    const districts = await prisma.district.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        // Include the assigned District Prabharis, filtered by level
        prabharis: { 
            where: { level: 'DISTRICT' },
            select: { id: true, name: true, phone: true, email: true },
        },
        // Also select the State name (for display consistency if needed)
        state: {
          select: { name: true }
        }
      },
      orderBy: { name: 'asc' },
    });

    // Remap output to ensure a clean structure for the frontend
    const finalOutput = districts.map(district => ({
        id: district.id,
        name: district.name,
        // The frontend expects prabharis array
        prabharis: district.prabharis || [],
        // Include stateName directly
        stateName: district.state?.name || '',
    }));


    return NextResponse.json(finalOutput);
  } catch (error) {
    // Return the specific validation error if it occurs
    console.error('[API] Failed to fetch districts by state/sambhag:', error);
    return NextResponse.json({ error: 'Failed to fetch districts', validationError: error.message }, { status: 500 });
  }
}