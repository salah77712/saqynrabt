import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook",
  "/api/health",
  "/api/wakeup",
]);

let handler: any = null;

if (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  try {
    handler = clerkMiddleware((auth, req) => {
      const { userId } = auth();
      const url = new URL(req.url);
      const isPublic = isPublicRoute(req);
      
      if (!userId && !isPublic) {
        return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(url.pathname), req.url));
      }
    });
  } catch (err) {
    console.error("Failed to initialize clerkMiddleware:", err);
  }
}

export default async function middleware(req: any, event: any) {
  if (!handler) {
    return NextResponse.next();
  }
  try {
    return await handler(req, event);
  } catch (err) {
    console.error("clerkMiddleware execution failed:", err);
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
