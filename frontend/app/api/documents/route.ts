// Laws 1, 2, 3, 15, 16 COMPLIANT
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("[/api/documents] step 1: before safeGetToken");
    const token = await safeGetToken();
    console.log("[/api/documents] step 2: after safeGetToken, token=", !!token);
    if (!token) return NextResponse.json({ error: "Unauthorized - no auth token found" }, { status: 401 });
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    console.log("[/api/documents] step 3: before fetch");
    const response = await fetch(`${apiBase}/api/documents`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("[/api/documents] step 4: after fetch, status=", response.status);
    const data = await response.json();
    console.log("[/api/documents] step 5: after json parse");
    return NextResponse.json(data, { status: response.status });
  } catch (err: unknown) {
    console.error("[/api/documents GET CRASH]", err);
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: "Internal Server Error", detail: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = await safeGetToken();
    if (!token) return NextResponse.json({ error: "Unauthorized - no auth token found" }, { status: 401 });
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    const formData = await req.formData();
    const res = await fetch(`${apiBase}/api/documents`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const text = await res.text();
    try { const data = JSON.parse(text); return NextResponse.json(data, { status: res.status }); }
    catch { return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 }); }
  } catch (err: unknown) {
    console.error("[/api/documents POST]", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await safeGetToken();
    if (!token) return NextResponse.json({ error: "Unauthorized - no auth token found" }, { status: 401 });
    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Document ID is required" }, { status: 400 });
    const res = await fetch(`${apiBase}/api/documents/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    const text = await res.text();
    try { const data = JSON.parse(text); return NextResponse.json(data, { status: res.status }); }
    catch { return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 }); }
  } catch (err: unknown) {
    console.error("[/api/documents DELETE]", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
