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

export function proxy(req: any, event: any) {
  if (!middlewareHandler) {
    console.error("Clerk middleware handler not initialized. Bypassing.");
    return NextResponse.next();
  }
  try {
    return middlewareHandler(req, event);
  } catch (err) {
    console.error("Error executing Clerk middleware:", err);
    return NextResponse.next();
  }
}

export default function middleware(req: any, event: any) {
  return proxy(req, event);
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
