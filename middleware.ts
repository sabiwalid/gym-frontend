import { NextRequest, NextResponse } from 'next/server';
import { AUTH_TOKEN_KEY } from './lib/api';

// Protect /dashboard and all subroutes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/dashboard')) {
    // Check for token in cookies (SSR-safe)
    const token = request.cookies.get(AUTH_TOKEN_KEY)?.value;
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
