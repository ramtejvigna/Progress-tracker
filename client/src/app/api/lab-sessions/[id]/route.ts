import { NextRequest, NextResponse } from 'next/server';
import { updateLabSession, deleteLabSession } from '@/lib/lab-sessions';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { startTime, endTime, isActive } = await request.json();
    const id = params.id;

    if (!id) {
      return NextResponse.json(
        { error: 'Lab session ID is required' },
        { status: 400 }
      );
    }

    const data: any = {};
    if (startTime) data.startTime = new Date(startTime);
    if (endTime) data.endTime = new Date(endTime);
    if (isActive !== undefined) data.isActive = isActive;

    const labSession = await updateLabSession(id, data);

    return NextResponse.json(
      { message: 'Lab session updated successfully', labSession },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update lab session error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while updating lab session' },
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
        { error: 'Lab session ID is required' },
        { status: 400 }
      );
    }

    await deleteLabSession(id);

    return NextResponse.json(
      { message: 'Lab session deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete lab session error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while deleting lab session' },
      { status: 500 }
    );
  }
}