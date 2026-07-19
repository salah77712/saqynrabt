import { safeGetToken } from "../../../../lib/safe-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const res = await fetch(`${apiBase}/api/legal/check-acceptance`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }
  } catch (err: unknown) {
    console.error("[/api/legal/check-acceptance] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
}
