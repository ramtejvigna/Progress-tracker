import { NextRequest, NextResponse } from 'next/server';
import { getAttendanceStats } from '@/lib/admin';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const daily = searchParams.get('daily') === 'true';
    const weekly = searchParams.get('weekly') === 'true';
    const monthly = searchParams.get('monthly') === 'true';

    const options = { daily, weekly, monthly };
    const stats = await getAttendanceStats(options);

    return NextResponse.json(
      { stats },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get attendance stats error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching attendance stats' },
      { status: 500 }
    );
  }
}