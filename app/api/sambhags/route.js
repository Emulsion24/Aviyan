import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * GET /api/sambhags
 * Fetches all sambhags, or optionally filters by stateId.
 */
export async function GET(request) {
 

  const { searchParams } = new URL(request.url);
  const stateId = searchParams.get('stateId');

  let whereClause = {};
  if (stateId) {
    whereClause.stateId = stateId;
  }

  try {
    const sambhags = await prisma.sambhag.findMany({
      where: whereClause,
      include: {
        districts: {
          select: { id: true }, // Include the IDs of connected districts
        },
        prabhari: true, // Include the assigned prabhari
        state: {
          select: { name: true } // Include state name
        }
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(sambhags);
  } catch (error) {
    console.error('[API] Failed to fetch sambhags:', error);
    return NextResponse.json({ error: 'Failed to fetch sambhags' }, { status: 500 });
  }
}

/**
 * POST /api/sambhags
 * Creates a new sambhag and connects it to districts.
 */
export async function POST(request) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { name, stateId, districtIds } = body;

    if (!name || !stateId || !districtIds) {
      return NextResponse.json({ error: 'Missing required fields: name, stateId, districtIds' }, { status: 400 });
    }

    const newSambhag = await prisma.sambhag.create({
      data: {
        name,
        stateId,
        districts: {
          connect: districtIds.map((id) => ({ id })), // Connect districts by ID
        },
      },
    });
    return NextResponse.json(newSambhag, { status: 201 });
  } catch (error) {
    console.error('[API] Failed to create sambhag:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A sambhag with this name already exists in this state.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create sambhag' }, { status: 500 });
  }
}