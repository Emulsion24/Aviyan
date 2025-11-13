import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';


export async function POST(request) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { districtIds } = body;

    if (!districtIds || !Array.isArray(districtIds) || districtIds.length === 0) {
      return NextResponse.json({ error: 'districtIds array is required' }, { status: 400 });
    }

    // Step 1: Fetch all DISTRICT Prabharis that belong to the provided District IDs
    const districtPrabharis = await prisma.prabhari.findMany({
      where: {
        level: 'DISTRICT', // IMPORTANT: Filter only for District level prabharis
        districtId: {
          in: districtIds,
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        districtId: true, // Needed for grouping
      },
      orderBy: { name: 'asc' },
    });

    // Step 2: Get the list of all requested Districts (to ensure all districts are included)
    const districts = await prisma.district.findMany({
        where: { id: { in: districtIds } },
        select: { id: true, name: true },
        orderBy: { name: 'asc' },
    });

    // Step 3: Combine the prabharis into a map indexed by district ID
    const prabharisByDistrict = districtPrabharis.reduce((acc, prabhari) => {
        if (!acc[prabhari.districtId]) {
            acc[prabhari.districtId] = [];
        }
        acc[prabhari.districtId].push(prabhari);
        return acc;
    }, {});

    // Step 4: Create the final output structure (districts containing their prabharis)
    const finalOutput = districts.map(district => ({
        id: district.id,
        name: district.name,
        // Attach the list of DISTRICT prabharis to the parent district
        prabharis: prabharisByDistrict[district.id] || [] 
    }));


    return NextResponse.json(finalOutput);
  } catch (error) {
    console.error('[API] Failed to fetch district prabharis for modal:', error);
    return NextResponse.json({ error: 'Failed to fetch district prabharis' }, { status: 500 });
  }
}



