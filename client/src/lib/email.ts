import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, otp: string) {
    const { data, error } = await resend.emails.send({
        from: 'ramtejsriram24@gmail.com',
        to: email,
        subject: 'Hello world',
        react: EmailTemplate({ otp: otp }) as React.ReactElement,
    });
}

export function generateOTP(): string {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}