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
      `${apiBase}/api/usage-stats`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    const flattened = {
      automation_texts_used: data.usage?.automation_texts_used ?? 0,
      automation_texts_limit: data.limits?.automation_texts_limit ?? 300,
      voice_minutes_used: data.usage?.voice_minutes_used ?? 0,
      voice_minutes_limit: data.limits?.voice_minutes_limit ?? 250,
      questions_used: data.usage?.questions_used ?? data.usage?.questions_count ?? 0,
      questions_limit: data.limits?.max_questions ?? 1000,
      employees_used: 0,
      employees_limit: data.limits?.max_employees ?? 50,
      documents_used: data.documents_used ?? 0,
      documents_limit: data.limits?.max_documents ?? 5,
    };
    return NextResponse.json(flattened, { status: response.status });
  } catch (error) {
    console.error("BFF error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
