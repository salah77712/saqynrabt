import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://clerk.saqynrabt.com https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://img.clerk.com https://saqynrabt.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://api.saqynrabt.com https://clerk.saqynrabt.com https://api.clerk.com https://api-js.clerk.io https://ingest.clerk.com https://saqynrabt.vercel.app wss://api.saqynrabt.com https://v2.ingest.sentry.io",
  "frame-src 'self' https://clerk.saqynrabt.com",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

function applyCSP(res: NextResponse | Response) {
  if (res?.headers) {
    res.headers.set("Content-Security-Policy", CSP);
  }
  return res;
}

export default authMiddleware({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhook",
    "/api/health",
    "/api/wakeup",
    "/dashboard"
  ],
  afterAuth: (auth, req) => {
    const url = new URL(req.url);
    // If user is unauthenticated and tries to access a protected route → redirect to sign-in
    if (!auth.userId && !auth.isPublicRoute) {
      return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(url.pathname), req.url));
    }
    // If user is authenticated but email is NOT verified → redirect to verification
    if (auth.userId && auth.sessionClaims?.email_verified !== true) {
      return NextResponse.redirect(new URL('/sign-in?redirect_url=/dashboard', req.url));
    }
    // Apply CSP headers
    const res = NextResponse.next();
    applyCSP(res);
    return res;
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
