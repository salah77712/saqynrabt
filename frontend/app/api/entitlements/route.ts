import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await safeGetToken();

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    }

    const response = await fetch(
      `${apiBase}/api/entitlements`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("BFF error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
