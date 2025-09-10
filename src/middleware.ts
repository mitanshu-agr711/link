import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session_token');
  const { pathname } = request.nextUrl;

  const publicPaths = ['/auth/signin', '/auth/signup', '/api/auth/login', '/api/auth/register'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  if (!sessionCookie && !isPublicPath && pathname !== '/') {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }


  if (sessionCookie && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
   
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
