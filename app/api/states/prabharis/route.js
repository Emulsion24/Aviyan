import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Correct relative path
import { verifyAuth } from '@/lib/Authhelper'; // Import auth helper

/**
 * GET /api/states/prabharis?zoneId=[id]
 * Fetches all states assigned to a specific zone (Protected)
 */
export async function GET(request) {
  

  const { searchParams } = new URL(request.url);
  const zoneId = searchParams.get('zoneId');

  if (!zoneId) {
    return NextResponse.json({ error: 'zoneId query parameter is required' }, { status: 400 });
  }

  try {
    const statesInZone = await prisma.state.findMany({
      where: {
        zoneId: zoneId,
      },
      include: {
        prabhari: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    
    return NextResponse.json(statesInZone);
  } catch (error) {
    console.error('[API] Failed to fetch states with prabharis:', error);
    return NextResponse.json({ error: 'Failed to fetch state prabharis' }, { status: 500 });
  }
}