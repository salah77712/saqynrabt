// Laws 1, 2, 3, 15, 16 COMPLIANT — auto-generated BFF proxy
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

    const res = await fetch(`${apiBase}/api/onboarding`, {
      method: "GET",
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
      console.error("[/api/onboarding GET] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/onboarding GET] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
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

    let body: unknown;
    try { body = await req.json(); } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const res = await fetch(`${apiBase}/api/onboarding`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/onboarding POST] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/onboarding POST] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
