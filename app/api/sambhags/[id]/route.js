import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * PUT /api/sambhags/[id]
 * Updates a sambhag's name or its assigned districts.
 */
export async function PUT(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }
  
  
  const { id  } = await context.params;

  try {
    const body = await request.json();
    const { name, districtIds } = body;

    let data = {};
    if (name) {
      data.name = name;
    }

    if (districtIds && Array.isArray(districtIds)) {
      // First, disconnect all existing districts
      await prisma.sambhag.update({
        where: { id: id },
        data: {
          districts: {
            set: [],
          },
        },
      });
      
      // Then, connect the new list of districts
      data.districts = {
        connect: districtIds.map((districtId) => ({ id: districtId })),
      };
    }

    const updatedSambhag = await prisma.sambhag.update({
      where: { id: id },
      data: data,
    });
    return NextResponse.json(updatedSambhag);
  } catch (error) {
    console.error(`[API] Failed to update sambhag ${id}:`, error);
    return NextResponse.json({ error: 'Failed to update sambhag' }, { status: 500 });
  }
}

/**
 * DELETE /api/sambhags/[id]
 * Deletes a sambhag.
 */
export async function DELETE(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }
  
  const { id  } = await context.params;


  try {
    // Unlink all districts before deleting
    await prisma.sambhag.update({
      where: { id: id },
      data: {
        districts: { set: [] }
      }
    });

    await prisma.sambhag.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Sambhag deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to delete sambhag ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete sambhag' }, { status: 500 });
  }
}