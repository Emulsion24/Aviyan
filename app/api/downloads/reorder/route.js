import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

export async function PUT(request) {
  // 1. Verify Authentication
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    // The frontend will send an array: [{ id: "...", sortOrder: 0 }, { id: "...", sortOrder: 1 }]
    const items = await request.json();

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    // 2. Perform a Prisma Transaction to update all records at once
    const updates = items.map((item) =>
      prisma.downloadCard.update({
        where: { id: item.id },
        data: { sortOrder: item.sortOrder },
      })
    );

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true, message: "Reordered successfully" });
  } catch (error) {
    console.error('[API] Failed to reorder cards:', error);
    return NextResponse.json({ error: 'Failed to reorder cards' }, { status: 500 });
  }
}