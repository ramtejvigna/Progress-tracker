import { NextRequest, NextResponse } from 'next/server';
import { createLabSession, getLabSessions } from '@/lib/lab-sessions';

export async function POST(request: NextRequest) {
  try {
    const { date, startTime, endTime } = await request.json();

    if (!date || !startTime || !endTime) {
      return NextResponse.json(
        { error: 'Date, start time, and end time are required' },
        { status: 400 }
      );
    }

    const labSession = await createLabSession(
      new Date(date),
      new Date(startTime),
      new Date(endTime)
    );

    return NextResponse.json(
      { message: 'Lab session created successfully', labSession },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create lab session error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while creating lab session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const past = searchParams.get('past') === 'true';
    const future = searchParams.get('future') === 'true';
    const date = searchParams.get('date');

    const options: any = { past, future };
    if (date) {
      options.date = new Date(date);
    }

    const labSessions = await getLabSessions(options);

    return NextResponse.json(
      { labSessions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get lab sessions error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching lab sessions' },
      { status: 500 }
    );
  }
}