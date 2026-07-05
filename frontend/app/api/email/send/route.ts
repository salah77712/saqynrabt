import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // 1. Check if the API key exists at runtime (not build time)
    const apiKey = process.env.EMAIL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured.' },
        { status: 500 }
      );
    }

    // 2. Initialize Resend INSIDE the function call
    const resend = new Resend(apiKey);

    // 3. Parse the request body
    const body = await request.json();
    const { to, subject, html } = body;

    // 4. Send the email
    const data = await resend.emails.send({
      from: 'SAQYN RABT <onboarding@resend.dev>', // Use the free resend.dev domain
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
