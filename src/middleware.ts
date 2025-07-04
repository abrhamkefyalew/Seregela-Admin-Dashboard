// src/middleware.ts

// DISABLING the DevTools "N" Icon does NOT work
// 

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Block Next.js DevTools loader in dev mode
  if (
    request.nextUrl.pathname.startsWith('/_next/static/devtools') ||
    request.nextUrl.pathname.includes('__nextjs__devtools')
  ) {
    return new Response('', { status: 204 }); // Empty response
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static).*)'], // Apply middleware to all routes except static files
};
