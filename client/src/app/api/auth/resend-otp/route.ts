import { NextRequest, NextResponse } from 'next/server';
import { resendOTP } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const result = await resendOTP(email);

    return NextResponse.json(
      { message: 'OTP resent successfully', success: result.success },
      { status: 200 }
    );
  } catch (error) {
    console.error('Resend OTP error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred while resending OTP' },
      { status: 500 }
    );
  }
}