import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  // Paths that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/verify',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/verify',
    '/api/auth/resend-otp',
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(path + '/')
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token from the cookies
  const token = request.cookies.get('auth_token')?.value;

  // If there's no token, redirect to login
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token
    const decoded = verifyToken(token);

    // Admin-only paths
    const adminPaths = [
      '/admin',
      '/api/admin',
      '/api/lab-sessions',
      '/api/holidays',
      '/api/badges',
    ];

    const isAdminPath = adminPaths.some(path => 
      request.nextUrl.pathname === path || 
      request.nextUrl.pathname.startsWith(path + '/')
    );

    // If it's an admin path but the user is not an admin, redirect to dashboard
    if (isAdminPath && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Continue with the request
    return NextResponse.next();
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};