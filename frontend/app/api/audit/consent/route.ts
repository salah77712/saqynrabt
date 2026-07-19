import { safeGetToken } from "../../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await safeGetToken();

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const res = await fetch(`${apiBase}/api/audit/consent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      return NextResponse.json({ success: true }, { status: 200, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }
  } catch (err: unknown) {
    console.error("[/api/audit/consent] Handler error:", err);
    return NextResponse.json({ success: true }, { status: 200, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
}
