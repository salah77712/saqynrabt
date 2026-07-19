// Laws 1, 2, 3, 10, 15, 16 COMPLIANT
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = await safeGetToken();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - no auth token found" },
        { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json(
        { error: "Backend URL is not configured." },
        { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const res = await fetch(`${apiBase}/api/employees`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      console.error("[/api/employees GET] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/employees GET] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const token = await safeGetToken();

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized - no auth token found" },
        { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json(
        { error: "Backend URL is not configured." },
        { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const clerkUserId = body?.clerk_user_id;
    if (!clerkUserId) {
      return NextResponse.json(
        { error: "clerk_user_id is required" },
        { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const res = await fetch(`${apiBase}/api/employees/${clerkUserId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      console.error("[/api/employees PATCH] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/employees PATCH] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}
