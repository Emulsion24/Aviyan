import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * GET /api/tehsils?districtId=...
 * Fetches all tehsils for a specific district. (Protected)
 */
export async function GET(request) {
 
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('districtId');

  if (!districtId) {
    return NextResponse.json({ error: 'districtId query parameter is required' }, { status: 400 });
  }

  try {
    const tehsils = await prisma.tehsil.findMany({
      where: { districtId: districtId },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(tehsils);
  } catch (error) {
    console.error('[API] Failed to fetch tehsils:', error);
    return NextResponse.json({ error: 'Failed to fetch tehsils' }, { status: 500 });
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
      return NextResponse.json({ error: 'A tehsil with this name already exists in this district.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create tehsil' }, { status: 500 });
  }
}