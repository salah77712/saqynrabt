// LAW 5 COMPLIANT: proxy.ts - Clerk 5.7.2 middleware using clerkMiddleware
// Public routes explicitly defined. Matcher covers all routes except static assets.
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
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
  "/terms-and-conditions",
  "/privacy-policy",
  "/cookie-policy",
  "/portal/privacy",
  "/forgot-password",
  "/thank-you",
  "/global",
  "/onboarding",
  "/api/webhook",
  "/api/health",
  "/api/wakeup",
  "/robots.txt",
  "/sitemap.xml",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const isPublic = isPublicRoute(req);

  if (!userId && !isPublic) {
    const url = new URL(req.url);
    return NextResponse.redirect(
      new URL("/sign-in?redirect_url=" + encodeURIComponent(url.pathname), req.url)
    );
  }
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
