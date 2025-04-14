import { NextRequest, NextResponse } from 'next/server';
import { addHoliday, getHolidays } from '@/lib/lab-sessions';

export async function POST(request: NextRequest) {
  try {
    const { date, name, description } = await request.json();

    if (!date || !name) {
      return NextResponse.json(
        { error: 'Date and name are required' },
        { status: 400 }
      );
    }

    const holiday = await addHoliday(
      new Date(date),
      name,
      description
    );

    return NextResponse.json(
      { message: 'Holiday added successfully', holiday },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add holiday error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while adding holiday' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const past = searchParams.get('past') === 'true';
    const future = searchParams.get('future') === 'true';

    const options = { past, future };
    const holidays = await getHolidays(options);

    return NextResponse.json(
      { holidays },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get holidays error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching holidays' },
      { status: 500 }
    );
  }
}