import { NextResponse } from "next/server";

let clerkMiddleware: any = null;
let isPublicRoute: any = null;

if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  try {
    const clerk = require("@clerk/nextjs/server");
    clerkMiddleware = clerk.clerkMiddleware;
    isPublicRoute = clerk.createRouteMatcher([
      "/",
      "/sign-in(.*)",
      "/sign-up(.*)",
      "/api/webhook",
      "/api/health",
      "/api/wakeup",
    ]);
  } catch (err) {
    console.error("Clerk initialization failed:", err);
  }
}

export default async function middleware(req: any, event: any) {
  if (!clerkMiddleware || !isPublicRoute) {
    console.warn("Clerk publishable key or helper missing; bypassing auth middleware");
    return NextResponse.next();
  }

  try {
    const handler = clerkMiddleware((auth: any, req: any) => {
      const { userId } = auth();
      const url = new URL(req.url);
      const isPublic = isPublicRoute(req);
      
      if (!userId && !isPublic) {
        return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(url.pathname), req.url));
      }
    });
    return await handler(req, event);
  } catch (err) {
    console.error("clerkMiddleware execution failed:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
