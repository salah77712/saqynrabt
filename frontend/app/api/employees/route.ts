// Laws 1, 2, 3, 10, 15, 16 COMPLIANT
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const isMock = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
                   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA';

    let token: string | null = null;
    if (isMock) {
      token = 'mock-token-dummy_company-user_admin12345demo-admin';
    } else {
      const { getToken } = auth();
      token = await getToken();
    }

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

    const res = await fetch(`${apiBase}/api/employees`, {
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
      console.error("[/api/employees GET] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502 }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/employees GET] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
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
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const res = await fetch(`${apiBase}/api/employees`, {
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
      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/employees PATCH] Invalid JSON from backend:", text);
      return NextResponse.json(
        { success: false, error: "Internal Server Error" },
        { status: 502 }
      );
    }
  } catch (err: unknown) {
    console.error("[/api/employees PATCH] Handler error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
