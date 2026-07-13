import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/admin(.*)",
  "/api(.*)",
]);

let handler: any = null;

if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  handler = clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    if (!userId && isProtectedRoute(req)) {
      return NextResponse.redirect(
        new URL("/sign-in?redirect_url=" + encodeURIComponent(req.nextUrl.pathname), req.url)
      );
    }
  });
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
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
