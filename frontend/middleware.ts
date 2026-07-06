import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const { userId } = getAuth(req);
  const url = new URL(req.url);
  const isPublicRoute = ["/", "/sign-in", "/sign-up", "/api/webhook", "/api/health", "/api/wakeup"].includes(url.pathname);
  
  // If the user is not authenticated and trying to access a protected route, redirect to sign-in
  if (!userId && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
