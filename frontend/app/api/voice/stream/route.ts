import { safeGetToken } from "../../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL not configured" }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "Status check";
    const companyId = searchParams.get("company_id") || "";

    const res = await fetch(
      `${apiBase}/api/voice/stream?text=${encodeURIComponent(text)}&company_id=${encodeURIComponent(companyId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Text": text,
        },
      }
    );

    const contentType = res.headers.get("Content-Type") || "";
    if (contentType.includes("audio/")) {
      const audioBuffer = await res.arrayBuffer();
      return new Response(audioBuffer, {
        status: res.status,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(audioBuffer.byteLength),
        },
      });
    }

    const textBody = await res.text();
    try {
      const data = JSON.parse(textBody);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return new Response(textBody, { status: res.status });
    }
  } catch (err: unknown) {
    console.error("[/api/voice/stream GET] Proxy error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
