import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/Authhelper'; // Import auth helper

export async function GET(request) {
  

  try {
    const states = await prisma.state.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(states);
  } catch (error) {
    console.error('[API] Failed to fetch states:', error);
    return NextResponse.json({ error: 'Failed to fetch states' }, { status: 500 });
  }
}