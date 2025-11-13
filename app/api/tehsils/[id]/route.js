import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * PUT /api/tehsils/[id]
 * Updates an existing Tehsil. (Protected)
 */
export async function PUT(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  const { id } = context.params;
  
  try {
    const body = await request.json();
    const { name, districtId } = body;

    if (!name || !districtId) {
      return NextResponse.json({ error: 'Missing required fields: name, districtId' }, { status: 400 });
    }

    const updatedTehsil = await prisma.tehsil.update({
      where: { id: id },
      data: {
        name: name,
        districtId: districtId,
      },
    });

    return NextResponse.json(updatedTehsil, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to update tehsil ${id}:`, error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A tehsil with this name already exists in this district.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update tehsil' }, { status: 500 });
  }
}

/**
 * DELETE /api/tehsils/[id]
 * Deletes a Tehsil. (Protected)
 * Based on your schema, deleting a Tehsil will automatically set
 * the 'tehsilId' on related Prabharis to 'null' (onDelete: SetNull).
 */
export async function DELETE(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  const { id } = await context.params;

  try {
    await prisma.tehsil.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Tehsil deleted successfully. Associated prabharis have been unlinked.' }, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to delete tehsil ${id}:`, error);
    if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Tehsil not found.' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to delete tehsil' }, { status: 500 });
  }
}