import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    root: process.cwd(),
  },
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA",
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "sk_test_mock_secret_key_for_build_safety",
  },
};

export default nextConfig;
