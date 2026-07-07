import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/forgot-password(.*)",
  "/about(.*)",
  "/pricing(.*)",
  "/features(.*)",
  "/how-it-works(.*)",
  "/contact(.*)",
  "/api-docs(.*)",
  "/changelog(.*)",
  "/faq(.*)",
  "/automation(.*)",
  "/chatbot(.*)",
  "/industries(.*)",
  "/case-studies(.*)",
  "/marketplace(.*)",
  "/developers(.*)",
  "/help(.*)",
  "/legal/(.*)",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/trust",
  "/thank-you",
  "/global",
  "/onboarding",
  "/robots.txt",
  "/sitemap.xml",
  "/security.txt",
  "/.well-known(.*)",
  "/og-image(.*)",
  "/api/webhook",
  "/api/health",
  "/api/wakeup",
]);

let handler: any = null;

if (process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
  handler = clerkMiddleware((auth, req) => {
    const { userId } = auth();
    const isPublic = isPublicRoute(req);

    if (!userId && !isPublic) {
      const url = new URL(req.url);
      return NextResponse.redirect(
        new URL("/sign-in?redirect_url=" + encodeURIComponent(url.pathname), req.url)
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
