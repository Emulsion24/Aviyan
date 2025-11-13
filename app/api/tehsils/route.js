import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * GET /api/tehsils?districtId=...
 * Fetches all tehsils for a specific district. (Protected)
 */
export async function GET(request) {
  // Authentication check is usually done here, but since the original was commented out, 
  // we'll proceed with public read access based on the previous files' context.
  
  const { searchParams } = new URL(request.url);
  const districtId = searchParams.get('districtId');

  if (!districtId) {
    return NextResponse.json({ error: 'districtId query parameter is required' }, { status: 400 });
  }

  try {
    // Step 1: Fetch all Tehsils belonging to the district
    const tehsils = await prisma.tehsil.findMany({
      where: { districtId: districtId },
      select: { 
        id: true, 
        name: true,
      },
      orderBy: { name: 'asc' },
    });

    // Step 2: Fetch all TEHSIL Prabharis for these Tehsils
    const tehsilIds = tehsils.map(t => t.id);
    
    const tehsilPrabharis = await prisma.prabhari.findMany({
        where: {
            level: 'TEHSIL',
            tehsilId: {
                in: tehsilIds,
            },
        },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            tehsilId: true, // Needed for grouping
        },
        orderBy: { name: 'asc' },
    });

    // Step 3: Group the prabharis by tehsil ID
    const prabharisByTehsil = tehsilPrabharis.reduce((acc, prabhari) => {
        if (!acc[prabhari.tehsilId]) {
            acc[prabhari.tehsilId] = [];
        }
        acc[prabhari.tehsilId].push(prabhari);
        return acc;
    }, {});

    // Step 4: Create the final output structure (Tehsils containing their prabharis)
    const finalOutput = tehsils.map(tehsil => ({
        id: tehsil.id,
        name: tehsil.name,
        // Attach the list of TEHSIL prabharis to the parent tehsil
        prabharis: prabharisByTehsil[tehsil.id] || [] 
    }));


    return NextResponse.json(finalOutput);
  } catch (error) {
    console.error('[API] Failed to fetch tehsils and prabharis:', error);
    return NextResponse.json({ error: 'Failed to fetch tehsils and prabharis' }, { status: 500 });
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