import { safeGetToken } from "../../../../../lib/safe-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = await safeGetToken();

    const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
    if (!apiBase) {
      return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
    }

    const res = await fetch(`${apiBase}/api/admin/incidents/status`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return NextResponse.json(data, { status: res.status });
    } catch {
      return NextResponse.json({ status: "all_operational", activeIncidents: 0 }, { status: 200 });
    }
  } catch (err: unknown) {
    console.error("[/api/admin/incidents/status] Handler error:", err);
    return NextResponse.json({ status: "all_operational", activeIncidents: 0 }, { status: 200 });
  }
}
