import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
  "/api/health",
  "/api/wakeup"
]);

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

let handler: any;
try {
  handler = clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const url = new URL(req.url);
    const isPublic = isPublicRoute(req);
    
    // If user is unauthenticated and tries to access a protected route → redirect to sign-in
    if (!userId && !isPublic) {
      return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(url.pathname), req.url));
    }
    
    return applyCSP(NextResponse.next());
  });
} catch (e) {
  console.error("clerkMiddleware initialization failed:", e);
}

export async function proxy(req: any, event: any) {
  if (!handler) {
    const res = NextResponse.next();
    applyCSP(res);
    return res;
  }
  try {
    return await handler(req, event);
  } catch (err) {
    console.error("clerkMiddleware execution failed:", err);
    const res = NextResponse.next();
    applyCSP(res);
    return res;
  }
}

export default async function middleware(req: any, event: any) {
  return await proxy(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
