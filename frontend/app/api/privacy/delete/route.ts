import { safeGetToken } from "../../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    }

    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const res = await fetch(`${apiBase}/api/privacy/delete`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/privacy/delete] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
