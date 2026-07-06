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

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const url = new URL(req.url);
  const isPublic = isPublicRoute(req);
  
  if (!userId && !isPublic) {
    return NextResponse.redirect(new URL('/sign-in?redirect_url=' + encodeURIComponent(url.pathname), req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
