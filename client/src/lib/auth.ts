import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';
import { generateOTP, sendVerificationEmail } from './email';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function registerUser(email: string, name: string, password: string, role: 'ADMIN' | 'STUDENT' = 'STUDENT') {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash password
  const hashedPassword = await hash(password, 10);
  
  // Generate OTP
  const otp = generateOTP();
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes
  
  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
      verificationOtp: otp,
      otpExpiry,
    },
  });
  
  // Send verification email
  await sendVerificationEmail(email, otp);
  
  return { userId: user.id };
}

export async function verifyOTP(email: string, otp: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.isVerified) {
    throw new Error('User already verified');
  }
  
  if (!user.verificationOtp || !user.otpExpiry) {
    throw new Error('No OTP found for this user');
  }
  
  if (user.verificationOtp !== otp) {
    throw new Error('Invalid OTP');
  }
  
  if (user.otpExpiry < new Date()) {
    throw new Error('OTP expired');
  }
  
  // Verify user
  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      verificationOtp: null,
      otpExpiry: null,
    },
  });
  
  return { success: true };
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  if (!user.isVerified) {
    throw new Error('Please verify your email first');
  }
  
  const isPasswordValid = await compare(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate JWT token
  const token = sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '7d' }
  );
  
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

export function verifyToken(token: string) {
  try {
    return verify(token, JWT_SECRET) as { userId: string; email: string; role: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function resendOTP(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  
  if (!user) {
    throw new Error('User not found');
  }
  
  if (user.isVerified) {
    throw new Error('User already verified');
  }
  
  // Generate new OTP
  const otp = generateOTP();
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes
  
  // Update user with new OTP
  await prisma.user.update({
    where: { id: user.id },
    data: {
      verificationOtp: otp,
      otpExpiry,
    },
  });
  
  // Send verification email
  await sendVerificationEmail(email, otp);
  
  return { success: true };
}