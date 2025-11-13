import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


/**
 * GET /api/districts?stateId=[id]
 * Fetches all districts for a given state. (Protected)
 */
export async function GET(request) {
  // Add authentication check


  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('stateId');

  if (!stateId) {
    return NextResponse.json({ error: 'stateId query parameter is required' }, { status: 400 });
  }

  try {
    // Find all districts that belong to the stateId
    const districts = await prisma.district.findMany({
      where: {
        stateId: stateId,
      },
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(districts);
  } catch (error) {
    console.error('[API] Failed to fetch districts:', error);
    return NextResponse.json({ error: 'Failed to fetch districts' }, { status: 500 });
  }
}