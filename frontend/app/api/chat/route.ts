// Laws 1, 2, 3, 11, 15, 16 COMPLIANT - supports streaming SSE responses
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const token = await safeGetToken();

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

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const res = await fetch(`${apiBase}/api/chat`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Pass through SSE streaming responses
    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("text/event-stream")) {
      const { readable, writable } = new TransformStream();
      res.body?.pipeTo(writable);
      return new Response(readable, {
        status: res.status,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/chat POST] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502 }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/chat POST] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
