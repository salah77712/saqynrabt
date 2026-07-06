import { withAuth } from "@clerk/nextjs";

export default withAuth({
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/webhook",
    "/api/health",
    "/api/wakeup",
    "/dashboard"
  ],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
