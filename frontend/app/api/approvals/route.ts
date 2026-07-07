// Laws 1, 2, 3, 15, 16 COMPLIANT — auto-generated BFF proxy
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from 'resend';

export async function GET(req: NextRequest) {
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

    const res = await fetch(`${apiBase}/api/approvals`, {
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
      console.error("[/api/approvals GET] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/approvals GET] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

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
    try { body = await req.json(); } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const res = await fetch(`${apiBase}/api/approvals`, {
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

      // If invite succeeded on the backend, send the email from the Next.js BFF proxy
      if (res.status === 200 && data.success && body && typeof body === 'object' && (body as any).action === 'invite') {
        const { name, email } = body as any;
        const apiKey = process.env.EMAIL_API_KEY;
        if (apiKey && email && name) {
          try {
            const resend = new Resend(apiKey);
            const companyName = data.companyName || 'SAQYN';
            const inviterName = data.inviterName || 'A colleague';

            await resend.emails.send({
              from: 'SAQYN RABT <onboarding@resend.dev>',
              to: [email],
              subject: `You've been invited to join ${companyName} on SAQYN RABT`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <h2 style="color: #141F33; font-weight: 800; margin-bottom: 16px;">Welcome to SAQYN RABT</h2>
                  <p>Hello <strong>${name}</strong>,</p>
                  <p><strong>${inviterName}</strong> has invited you to join the <strong>${companyName}</strong> workspace on SAQYN RABT as an <strong>employee</strong>.</p>
                  <p>To accept this invitation and register your account, please click the link below:</p>
                  <div style="margin: 24px 0;">
                    <a href="https://saqynrabt.com/sign-up" style="background-color: #141F33; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                      Accept Invitation & Sign Up
                    </a>
                  </div>
                  <p style="color: #64748b; font-size: 12px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                    If you did not expect this invitation, you can safely ignore this email.
                  </p>
                </div>
              `
            });
          } catch (emailErr) {
            console.error("[/api/approvals POST] Failed to send invitation email:", emailErr);
          }
        }
      }

      return NextResponse.json(data, { status: res.status });
    } catch {
      console.error("[/api/approvals POST] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502 });
    }
  } catch (err: unknown) {
    console.error("[/api/approvals POST] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
