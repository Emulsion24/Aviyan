import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Correct relative path
import { verifyAuth } from '@/lib/Authhelper'; // Import auth helper

/**
 * PUT /api/zones/[id]
 * Updates a zone (Protected)
 */
export async function PUT(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  // Get ID from context
 
  const {id} = await context.params
console.log("Updating zone with id:", id);
  try {
    const body = await request.json();
    const { name, stateIds } = body;

    let data = {};
    if (name) {
      data.name = name;
    }

    // This logic handles updating the states assigned to the zone
    if (stateIds && Array.isArray(stateIds)) {
      // Step 1: Disconnect all existing states
      await prisma.zone.update({
        where: { id: id }, 
        data: {
          states: {
            set: [], // An empty array disconnects all relations
          },
        },
      });
      
      // Step 2: Connect the new list of states
      data.states = {
        connect: stateIds.map((stateId) => ({ id: stateId })),
      };
    }

    // Step 3: Update the name and/or the connected states
    const updatedZone = await prisma.zone.update({
      where: { id: id },
      data: data,
    });
    return NextResponse.json(updatedZone);
  } catch (error) {
    // 'id' is available in the catch block
    console.error(`[API] Failed to update zone ${id}:`, error);
    return NextResponse.json({ error: 'Failed to update zone' }, { status: 500 });
  }
}

/**
 * DELETE /api/zones/[id]
 * Deletes a zone (Protected)
 */
export async function DELETE(request, context) {
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  // Get ID from context
   const {id} = await context.params

  try {
    // Before deleting, we must disconnect related states
    await prisma.zone.update({
        where: { id: id },
        data: {
            states: { set: [] }
        }
    });

    // Now it's safe to delete the zone
    await prisma.zone.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'Zone deleted successfully' }, { status: 200 });
  } catch (error) {
    // 'id' is available in the catch block
    console.error(`[API] Failed to delete zone ${id}:`, error);
    return NextResponse.json({ error: 'Failed to delete zone' }, { status: 500 });
  }
}