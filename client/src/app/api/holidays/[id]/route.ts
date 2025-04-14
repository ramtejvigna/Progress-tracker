import { NextRequest, NextResponse } from 'next/server';
import { updateHoliday, deleteHoliday } from '@/lib/lab-sessions';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { name, description } = await request.json();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Holiday ID is required' },
        { status: 400 }
      );
    }

    const data: any = {};
    if (name) data.name = name;
    if (description !== undefined) data.description = description;

    const holiday = await updateHoliday(id, data);

    return NextResponse.json(
      { message: 'Holiday updated successfully', holiday },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update holiday error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while updating holiday' },
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
        { error: 'Holiday ID is required' },
        { status: 400 }
      );
    }

    await deleteHoliday(id);

    return NextResponse.json(
      { message: 'Holiday deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete holiday error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while deleting holiday' },
      { status: 500 }
    );
  }
}