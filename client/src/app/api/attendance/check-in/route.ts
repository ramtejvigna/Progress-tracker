import { NextRequest, NextResponse } from 'next/server';
import { recordAttendance } from '@/lib/gamification';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { labSessionId } = await request.json();

    if (!labSessionId) {
      return NextResponse.json(
        { error: 'Lab session ID is required' },
        { status: 400 }
      );
    }

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

    const attendance = await recordAttendance(userId, labSessionId);

    return NextResponse.json(
      { message: 'Check-in recorded successfully', attendance },
      { status: 201 }
    );
  } catch (error) {
    console.error('Check-in error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during check-in' },
      { status: 500 }
    );
  }
}