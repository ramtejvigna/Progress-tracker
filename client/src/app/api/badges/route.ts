import { NextRequest, NextResponse } from 'next/server';
import { createBadge, getBadges } from '@/lib/badges';

export async function POST(request: NextRequest) {
  try {
    const { name, description, imageUrl, pointsRequired } = await request.json();

    if (!name || !description || !imageUrl || pointsRequired === undefined) {
      return NextResponse.json(
        { error: 'Name, description, image URL, and points required are required' },
        { status: 400 }
      );
    }

    const badge = await createBadge(
      name,
      description,
      imageUrl,
      pointsRequired
    );

    return NextResponse.json(
      { message: 'Badge created successfully', badge },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create badge error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while creating badge' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const badges = await getBadges();

    return NextResponse.json(
      { badges },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get badges error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching badges' },
      { status: 500 }
    );
  }
}