import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';


export async function GET(request) {
  


  try {
    // We will run two queries in parallel using a single transaction
    const [countsByLevel, totalCount] = await prisma.$transaction([
      
      // Query 1: Get the count for each 'level' group
      prisma.prabhari.groupBy({
        by: ['level'], // Group by the 'level' enum (ZONE, STATE, etc.)
        _count: {
          _all: true, // Get the count of all records in each group
        },
      }),

      // Query 2: Get the grand total count
      prisma.prabhari.count(),
    ]);

    // Initialize a default object to hold the counts.
    // This ensures all keys exist, even if a level has 0 prabharis.
    const formattedCounts = {
      zone: 0,
      state: 0,
      sambhag: 0,
      district: 0,
      tehsil: 0,
    };

    // Process the result from groupBy
    // The result looks like: [{ level: 'ZONE', _count: { _all: 10 } }, ...]
    countsByLevel.forEach(item => {
      const levelName = item.level.toLowerCase(); // 'ZONE' -> 'zone'
      const count = item._count._all;
      
      if (formattedCounts.hasOwnProperty(levelName)) {
        formattedCounts[levelName] = count;
      }
    });

    // Return the complete object
    return NextResponse.json({
      total: totalCount,  // This is the grand total
      byLevel: formattedCounts // This is the object with specific counts
    });

  } catch (error) {
    console.error("Error fetching prabhari counts:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}