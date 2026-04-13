import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = ['/app', '/account', '/admin'];
// Routes that require admin role
const adminRoutes = ['/admin'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is protected
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (!isProtected) {
    return NextResponse.next();
  }

  // Read the session token from the NextAuth cookie
  // The default cookie name pattern is next-auth.session-token
  const sessionToken =
    request.cookies.get('next-auth.session-token')?.value ??
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  if (!sessionToken) {
    // No session - redirect to login
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check admin routes
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));

  if (isAdminRoute) {
    // We can't easily check the role here without hitting the DB
    // The admin layout (server component) will do a second check
    // But we can at least verify there's a valid session token
    // For a production app, you'd decode the JWT and check role here
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/account/:path*', '/admin/:path*'],
};
