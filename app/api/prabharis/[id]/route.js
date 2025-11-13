import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * PUT /api/prabharis/[id]
 * Updates an existing prabhari
 * --- FIX ---
 * Updated 'include' logic for the return value to ensure
 * sambhagName and stateName are returned after an update.
 */
export async function PUT(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }
  
  const { id } = await context.params;


  try {
    const body = await request.json();
    const { name, phone, email, zoneId, stateId, sambhagId, districtId, tehsilId } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields: name, phone' }, { status: 400 });
    }

    let dataToUpdate = {
      name,
      phone,
      email,
    };
    
    // This allows updating the assignment
    if (zoneId) dataToUpdate.zoneId = zoneId;
    if (stateId) dataToUpdate.stateId = stateId;
    if (sambhagId) dataToUpdate.sambhagId = sambhagId;
    if (districtId) dataToUpdate.districtId = districtId;
    if (tehsilId) dataToUpdate.tehsilId = tehsilId;

    const updatedPrabhari = await prisma.prabhari.update({
      where: { id: id },
      data: dataToUpdate,
      // --- THIS IS THE FIX ---
      include: {
        zone: { select: { name: true } },
        state: { select: { name: true } },
        sambhag: { select: { name: true, state: { select: { name: true } } } },
        district: { include: { state: true } },
      },
      // --- END OF FIX ---
    });

    // Flatten the data to be consistent
    const flattenedPrabhari = {
      ...updatedPrabhari,
      zoneName: updatedPrabhari.zone?.name,
      stateName: updatedPrabhari.state?.name || updatedPrabhari.district?.state?.name || updatedPrabhari.sambhag?.state?.name,
      sambhagName: updatedPrabhari.sambhag?.name,
      districtName: updatedPrabhari.district?.name,
    };

    return NextResponse.json(flattenedPrabhari);
  } catch (error) {
    console.error(`[API] Failed to update prabhari ${id}:`, error);
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'A prabhari with this phone number already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to update prabhari' }, { status: 500 });
  }
}

/**
 * DELETE /api/prabharis/[id]
 * Deletes a prabhari
 */
export async function DELETE(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }
  
  const { id  } = await context.params;


  try {
    await prisma.prabhari.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Prabhari deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to delete prabhari ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete prabhari' }, { status: 500 });
  }
}