import { NextRequest, NextResponse } from 'next/server';
import { updateBadge, deleteBadge, getUsersWithBadge } from '@/lib/badges';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description, imageUrl, pointsRequired } = await request.json();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Badge ID is required' },
        { status: 400 }
      );
    }

    const data: any = {};
    if (name) data.name = name;
    if (description) data.description = description;
    if (imageUrl) data.imageUrl = imageUrl;
    if (pointsRequired !== undefined) data.pointsRequired = pointsRequired;

    const badge = await updateBadge(id, data);

    return NextResponse.json(
      { message: 'Badge updated successfully', badge },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update badge error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while updating badge' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Badge ID is required' },
        { status: 400 }
      );
    }

    await deleteBadge(id);

    return NextResponse.json(
      { message: 'Badge deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete badge error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while deleting badge' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Badge ID is required' },
        { status: 400 }
      );
    }

    const users = await getUsersWithBadge(id);

    return NextResponse.json(
      { users },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get users with badge error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while fetching users with badge' },
      { status: 500 }
    );
  }
}