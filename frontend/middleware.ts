import { authMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

let middlewareHandler: any;
try {
  middlewareHandler = authMiddleware({
    publicRoutes: [
      "/",
      "/sign-in",
      "/sign-up",
      "/api/webhook",
      "/api/health",
      "/api/wakeup"
    ],
  });
} catch (e) {
  console.error("Clerk authMiddleware initialization failed:", e);
}

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

export function proxy(req: any, event: any) {
  if (!middlewareHandler) {
    console.error("Clerk middleware handler not initialized. Bypassing.");
    const res = NextResponse.next();
    res.headers.set("Content-Security-Policy", CSP);
    return res;
  }
  try {
    const res = middlewareHandler(req, event);
    if (res?.headers) {
      res.headers.set("Content-Security-Policy", CSP);
    }
    return res;
  } catch (err) {
    console.error("Error executing Clerk middleware:", err);
    const res = NextResponse.next();
    res.headers.set("Content-Security-Policy", CSP);
    return res;
  }
}

export default function middleware(req: any, event: any) {
  return proxy(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
