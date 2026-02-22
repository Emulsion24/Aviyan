import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper';

/**
 * GET /api/downloads
 * Fetches ALL download cards.
 * No pagination, no search. Public access.
 */
export async function GET() {
  try {
    // 1. Fetch ALL cards, ordered by newest first
    const cards = await prisma.downloadCard.findMany({
     orderBy: { sortOrder: 'asc' }
    });

    // 2. Return plain array of cards
    return NextResponse.json({
      success: true,
      data: cards,
      total: cards.length
    });

  } catch (error) {
    console.error('[API] Failed to fetch download cards:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch download cards', 
      details: error.message 
    }, { status: 500 });
  }
}

/**
 * POST /api/downloads
 * Creates a new download card.
 * Protected Route (Admin only).
 */
export async function POST(request) {
  // 1. Verify Authentication
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { titleEn, titleHi, pdfUrl, cdrUrl, imageUrl, audioUrl, mainIcon } = body;

    // 2. Basic Validation
    if (!titleEn || !titleHi) {
      return NextResponse.json({ error: 'Missing required fields: titleEn, titleHi' }, { status: 400 });
    }

    // 3. Create the card
    const newCard = await prisma.downloadCard.create({
      data: {
        titleEn,
        titleHi,
        pdfUrl: pdfUrl || "",
        cdrUrl: cdrUrl || "",
        imageUrl: imageUrl || "",
        audioUrl: audioUrl || "",
        mainIcon: mainIcon || "FILE",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Card created successfully",
      data: newCard
    }, { status: 201 });

  } catch (error) {
    console.error('[API] Failed to create download card:', error);
    return NextResponse.json({ error: 'Failed to create download card' }, { status: 500 });
  }
}

/**
 * PUT /api/downloads
 * Updates an existing download card.
 * Protected Route (Admin only).
 */
export async function PUT(request) {
  // 1. Verify Authentication
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { id, titleEn, titleHi, pdfUrl, cdrUrl, imageUrl, audioUrl, mainIcon } = body;

    if (!id) {
      return NextResponse.json({ error: 'Card ID is required for update' }, { status: 400 });
    }

    // 2. Update the card
    const updatedCard = await prisma.downloadCard.update({
      where: { id },
      data: {
        titleEn,
        titleHi,
        pdfUrl,
        cdrUrl,
        imageUrl,
        audioUrl,
        mainIcon,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Card updated successfully",
      data: updatedCard
    });

  } catch (error) {
    console.error('[API] Failed to update download card:', error);
    if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Card not found' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Failed to update download card' }, { status: 500 });
  }
}

/**
 * DELETE /api/downloads
 * Deletes a download card.
 * Protected Route (Admin only).
 */
export async function DELETE(request) {
  // 1. Verify Authentication
  const auth = await verifyAuth(request);
  if (!auth.success) {
    return NextResponse.json(auth, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Card ID is required" }, { status: 400 });
    }

    // 2. Delete the card
    await prisma.downloadCard.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Card deleted successfully" });

  } catch (error) {
    console.error('[API] Failed to delete download card:', error);
    return NextResponse.json({ error: 'Failed to delete download card' }, { status: 500 });
  }
}