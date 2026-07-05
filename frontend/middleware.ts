import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default clerkMiddleware((auth, request: NextRequest) => {
  const response = NextResponse.next();

  // 1. Content Security Policy (CSP) Directives
  const cspDirectives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.saqynrabt.com https://*.clerk.accounts.dev https://static.cloudflareinsights.com https://challenges.cloudflare.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://api.saqynrabt.com https://clerk.saqynrabt.com https://*.clerk.accounts.dev",
    "frame-src 'self' https://challenges.cloudflare.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "media-src 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
  ].join('; ');

  response.headers.set('Content-Security-Policy', cspDirectives);

  // 2. HTTP Strict Transport Security (HSTS)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  // 3. Prevent MIME Sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // 4. Clickjacking Prevention
  response.headers.set('X-Frame-Options', 'DENY');

  // 5. Cross-Site Scripting protection
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // 6. Referrer Policy
  response.headers.set(
    'Referrer-Policy',
    'strict-origin-when-cross-origin'
  );

  // 7. Feature/Permissions Policy
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=()'
  );

  return response;
});

export const config = {
  matcher: [
    // Apply to all routes except api, static assets, images, or files
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|icon-).*)',
  ],
};
