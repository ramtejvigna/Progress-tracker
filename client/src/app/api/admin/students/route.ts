import { NextRequest, NextResponse } from 'next/server';
import { getStudentStats } from '@/lib/admin';

export async function GET() {
  try {
    const students = await getStudentStats();

    return NextResponse.json(
      { students },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get student stats error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching student stats' },
      { status: 500 }
    );
  }
}