import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Correct relative path
import { verifyAuth } from '@/lib/Authhelper'; // Import auth helper

/**
 * GET /api/zones
 * Fetches all zones (Protected)
 */
export async function GET(request) {
  

  try {
    const zones = await prisma.zone.findMany({
      include: {
        states: {
          select: { id: true },
        },
        prabhari: true,
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(zones);
  } catch (error) {
    console.error('[API] Failed to fetch zones:', error);
    return NextResponse.json({ error: 'Failed to fetch zones' }, { status: 500 });
  }
}

/**
 * POST /api/zones
 * Creates a new zone (Protected)
 */
export async function POST(request) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({ error: 'Missing required field: name' }, { status: 400 });
    }

    const newZone = await prisma.zone.create({
      data: { name },
    });
    return NextResponse.json(newZone, { status: 201 });
  } catch (error) {
    console.error('[API] Failed to create zone:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A zone with this name already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create zone' }, { status: 500 });
  }
}