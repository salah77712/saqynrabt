// Laws 1, 2, 3, 9, 15, 16 COMPLIANT
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { getToken } = auth();
    const token = await getToken();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - no auth token found" },
        { status: 401 }
      );
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json(
        { error: "Backend URL is not configured." },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiBase}/api/entitlements`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/entitlements] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502 }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/entitlements] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
