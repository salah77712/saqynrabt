import { safeGetToken } from "../../../../lib/safe-auth";
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.EMAIL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, html.' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'SAQYN RABT <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}
