import { NextRequest, NextResponse } from 'next/server';
import { getLeaderboard } from '@/lib/admin';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const leaderboard = await getLeaderboard(limit);

    return NextResponse.json(
      { leaderboard },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get leaderboard error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching leaderboard' },
      { status: 500 }
    );
  }
}