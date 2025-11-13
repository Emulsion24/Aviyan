import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const level = searchParams.get('level');

  // --- New Pagination, Search, and Filter Params ---
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  const skip = (page - 1) * limit;
  const search = searchParams.get('search') || "";

  // Filters
  const stateId = searchParams.get('stateId');
  const districtId = searchParams.get('districtId');
  const sambhagId = searchParams.get('sambhagId');
  const zoneId = searchParams.get('zoneId');
  // --- End New Params ---

  if (!level) {
    return NextResponse.json({ error: 'Level query parameter is required' }, { status: 400 });
  }

  // --- Build Dynamic Where Clauses ---
  let wherePrabhari = { level: level };
  let whereRelated = {}; // This will be used to filter on the *related* model

  // 1. Add Search (applies to all levels)
  if (search) {
    wherePrabhari.OR = [
      { name: { contains: search, mode: 'insensitive' } }, // Use insensitive mode for robustness
      { email: { contains: search, mode: 'insensitive' } },
      { phone: { contains: search, mode: 'insensitive' } }
    ];
  }

  // 2. Add Relational Filters (based on level)
  if (level === 'ZONE') {
      // Apply zoneId filter
      if (zoneId) {
          wherePrabhari.zoneId = zoneId;
      }
  } else if (level === 'STATE') {
      // Apply stateId filter
      if (stateId) {
          wherePrabhari.stateId = stateId;
      }
  } else if (level === 'TEHSIL') {
    // FIX: Apply the specific ID filter directly, or fallback to state/non-null check
    if (districtId) {
      wherePrabhari.tehsil = { districtId: districtId }; // Filter tehsil by specific district
    } else {
      wherePrabhari.tehsilId = { not: null };
      if (stateId) {
        whereRelated.district = { stateId: stateId };
      }
    }

  } else if (level === 'DISTRICT') {
    // FIX: Apply the specific District ID filter directly to the Prabhari model
    if (districtId) {
      wherePrabhari.districtId = districtId; 
    } else {
        // Fallback for filtering all districts in a state (if districtId is missing)
        wherePrabhari.districtId = { not: null };
        if (stateId) {
          whereRelated.stateId = stateId;
        }
    }
  } else if (level === 'SAMBHAG') {
    // FIX 1: Apply the specific Sambhag ID filter directly to the Prabhari model
    if (sambhagId) {
      wherePrabhari.sambhagId = sambhagId; 
    } else {
        // Fallback for filtering all sambhags in a state
        wherePrabhari.sambhagId = { not: null };
        if (stateId) {
          whereRelated.stateId = stateId;
        }
    }
  }
  // --- End Where Clause ---

  try {
    let prabharis;
    let total;
    let flattenedPrabharis; 

    // Log the final where clause before query (helpful for debugging)
    console.log(`[API] Querying Prabhari with where: ${JSON.stringify(wherePrabhari)}`);


    if (level === 'TEHSIL') {
      // Only set wherePrabhari.tehsil if whereRelated (which includes nested district filter) was set
      if (Object.keys(whereRelated).length > 0) {
        wherePrabhari.tehsil = whereRelated; 
      }
      
      [prabharis, total] = await prisma.$transaction([
        prisma.prabhari.findMany({
          where: wherePrabhari,
          include: {
            tehsil: {
              include: {
                district: {
                  include: { state: true }
                }
              }
            }
          },
          skip: skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        prisma.prabhari.count({ where: wherePrabhari })
      ]);

      flattenedPrabharis = prabharis.map((p) => ({
        ...p,
        stateId: p.tehsil?.district?.stateId, 
        tehsilName: p.tehsil?.name,
        districtName: p.tehsil?.district?.name,
        stateName: p.tehsil?.district?.state?.name,
      }));

    } else if (level === 'DISTRICT') {
      // Only set wherePrabhari.district if whereRelated was set (i.e., we are only filtering by state)
      if (Object.keys(whereRelated).length > 0) {
        wherePrabhari.district = whereRelated;
      }

      [prabharis, total] = await prisma.$transaction([
        prisma.prabhari.findMany({
          where: wherePrabhari,
          include: {
            district: {
              include: { state: true }
            }
          },
          skip: skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        prisma.prabhari.count({ where: wherePrabhari })
      ]);
      
      flattenedPrabharis = prabharis.map((p) => ({
        ...p,
        stateId: p.district?.stateId, 
        districtName: p.district?.name,
        stateName: p.district?.state?.name,
      }));

    } else if (level === 'SAMBHAG') {
      // Only set wherePrabhari.sambhag if whereRelated was set
      if (Object.keys(whereRelated).length > 0) {
        wherePrabhari.sambhag = whereRelated;
      }

      [prabharis, total] = await prisma.$transaction([
        prisma.prabhari.findMany({
          where: wherePrabhari,
          include: {
            sambhag: {
              include: { state: true }
            }
          },
          skip: skip,
          take: limit,
          orderBy: { name: 'asc' },
        }),
        prisma.prabhari.count({ where: wherePrabhari })
      ]);

      flattenedPrabharis = prabharis.map((p) => ({
        ...p,
        stateId: p.sambhag?.stateId, 
        sambhagName: p.sambhag?.name,
        stateName: p.sambhag?.state?.name,
      }));

    } else if (level === 'STATE' || level === 'ZONE') {
        // NOTE: Filters (stateId or zoneId) are applied in the 'wherePrabhari' object above.
        const includeClause = level === 'STATE' ? { state: true } : { zone: true };
        
        [prabharis, total] = await prisma.$transaction([
             prisma.prabhari.findMany({
                where: wherePrabhari,
                include: includeClause,
                skip: skip,
                take: limit,
                orderBy: { name: 'asc' },
            }),
            prisma.prabhari.count({ where: wherePrabhari })
        ]);

        if (level === 'STATE') {
            flattenedPrabharis = prabharis.map((p) => ({ 
                ...p, 
                stateName: p.state?.name,
                stateId: p.stateId 
            }));
        } else { // ZONE
            flattenedPrabharis = prabharis.map((p) => ({ ...p, zoneName: p.zone?.name }));
        }

    } else {
      // Fallback for any other level
      [prabharis, total] = await prisma.$transaction([
          prisma.prabhari.findMany({
              where: wherePrabhari,
              skip: skip,
              take: limit,
              orderBy: { name: 'asc' },
          }),
          prisma.prabhari.count({ where: wherePrabhari })
      ]);
      flattenedPrabharis = prabharis;
    }

    // --- Return the response with data and pagination info ---
    return NextResponse.json({
        data: flattenedPrabharis,
        pagination: {
            page: page,
            limit: limit,
            total: total,
            totalPages: Math.ceil(total / limit),
        }
    });

  } catch (error) {
    console.error(`[API] Failed to fetch ${level} prabharis:`, error);
    return NextResponse.json({ error: 'Failed to fetch prabharis' }, { status: 500 });
  }
}
/**
 * POST /api/prabharis
 * Creates a new prabhari of ANY level.
 */
export async function POST(request) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { name, phone, email, level, unitId } = body;

    if (!name || !phone || !level || !unitId) {
      return NextResponse.json({ error: 'Missing required fields: name, phone, level, unitId' }, { status: 400 });
    }

    let data = {
      name,
      phone,
      email,
      level: level,
    };

    switch (level) {
      case 'ZONE':
        data.zoneId = unitId;
        break;
      case 'STATE':
        data.stateId = unitId;
        break;
      case 'SAMBHAG':
        data.sambhagId = unitId;
        break;
      case 'DISTRICT':
        data.districtId = unitId;
        break;
      case 'TEHSIL':
        data.tehsilId = unitId;
        break;
      default:
        return NextResponse.json({ error: 'Invalid prabhari level' }, { status: 400 });
    }

    const newPrabhari = await prisma.prabhari.create({
      data,
      include: {
        zone: { select: { name: true } },
        state: { select: { name: true } },
        sambhag: { select: { name: true, state: { select: { name: true } } } }, // Ensures POST also returns full data
        district: { include: { state: true } },
        tehsil: true,
      },
    });

    // Flatten data to be consistent
    const flattenedPrabhari = {
      ...newPrabhari,
      zoneName: newPrabhari.zone?.name,
      stateName: newPrabhari.state?.name || newPrabhari.district?.state?.name || newPrabhari.sambhag?.state?.name,
      sambhagName: newPrabhari.sambhag?.name,
      districtName: newPrabhari.district?.name,
    };

    return NextResponse.json(flattenedPrabhari, { status: 201 });
  } catch (error) {
    console.error('[API] Failed to create prabhari:', error);
    if (error.code === 'P2002') {
      if (error.meta?.target?.includes('phone')) {
        return NextResponse.json({ error: 'A prabhari with this phone number already exists.' }, { status: 409 });
      }
      return NextResponse.json({ error: 'This prabhari is already assigned to this unit.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create prabhari' }, { status: 500 });
  }
}