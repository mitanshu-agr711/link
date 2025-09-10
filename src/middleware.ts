import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session_token');
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/auth/signin', '/auth/signup', '/api/auth/login', '/api/auth/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // If no session and trying to access protected route
  if (!sessionCookie && !isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // If has session and trying to access auth pages, redirect to dashboard
  if (sessionCookie && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
