import { auth } from "@clerk/nextjs/server";
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const response = await fetch(
      `${apiBase}/api/entitlements`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  } catch (error) {
    console.error("BFF error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}
