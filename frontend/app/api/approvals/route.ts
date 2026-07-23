// Laws 1, 2, 3, 15, 16 COMPLIANT — auto-generated BFF proxy
import { safeGetToken } from "../../../lib/safe-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sendEmail } from "../../../lib/email";

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
      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      console.error("[/api/approvals GET] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }
  } catch (err: unknown) {
    console.error("[/api/approvals GET] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
}

export async function POST(req: NextRequest) {
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

      // If invite succeeded on the backend, send the invitation email from the BFF
      if (res.status === 200 && data.success && body && typeof body === 'object' && (body as any).action === 'invite') {
        const { name, email } = body as any;
        if (email && name) {
          try {
            const companyName = data.companyName || 'SAQYN';
            const inviterName = data.inviterName || 'A colleague';

            await sendEmail(
              email,
              `You've been invited to join ${companyName} on SAQYN RABT`,
              `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                  <h2 style="color: var(--primary); font-weight: 800; margin-bottom: 16px;">Welcome to SAQYN RABT</h2>
                  <p>Hello <strong>${name}</strong>,</p>
                  <p><strong>${inviterName}</strong> has invited you to join the <strong>${companyName}</strong> workspace on SAQYN RABT as an <strong>employee</strong>.</p>
                  <p>To accept this invitation and register your account, please click the link below:</p>
                  <div style="margin: 24px 0;">
                    <a href="https://saqynrabt.com/sign-up?email=${encodeURIComponent(email)}" style="background-color: var(--primary); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                      Accept Invitation & Sign Up
                    </a>
                  </div>
                  <p style="color: #64748b; font-size: 12px; margin-top: 32px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
                    If you did not expect this invitation, you can safely ignore this email.
                  </p>
                </div>
              `
            );
            data.email_sent = true;
          } catch (emailErr: any) {
            console.error("[/api/approvals POST] Failed to send invitation email:", emailErr);
            data.email_sent = false;
            data.email_error = emailErr?.message || 'Email delivery failed';
          }
        } else {
          data.email_sent = false;
          data.email_error = 'Invite missing name or email';
        }
      }

      return NextResponse.json(data, { status: res.status, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    } catch {
      console.error("[/api/approvals POST] Invalid JSON from backend:", text);
      return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 502, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }
  } catch (err: unknown) {
    console.error("[/api/approvals POST] Handler error:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
