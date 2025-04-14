import { NextRequest, NextResponse } from 'next/server';
import { getUserStats } from '@/lib/gamification';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Get user ID from token
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    const stats = await getUserStats(userId);

    return NextResponse.json(
      { stats },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user stats error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching user stats' },
      { status: 500 }
    );
  }
}