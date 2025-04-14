import { NextRequest, NextResponse } from 'next/server';
import { verifyOTP } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    const result = await verifyOTP(email, otp);

    return NextResponse.json(
      { message: 'Email verified successfully', success: result.success },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred during verification' },
      { status: 500 }
    );
  }
}