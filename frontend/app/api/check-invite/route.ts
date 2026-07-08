import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ invited: false, error: "Email is required" }, { status: 400 });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ invited: false, error: "Backend URL is not configured." }, { status: 500 });
    }

    const res = await fetch(`${apiBase}/api/public/check-invite?email=${encodeURIComponent(email)}`);
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/check-invite GET] Invalid JSON from backend:", text);
      return NextResponse.json({ invited: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/check-invite GET] Handler error:", err);
    return NextResponse.json({ invited: false, error: "Internal Server Error" }, { status: 500 });
  }
}
