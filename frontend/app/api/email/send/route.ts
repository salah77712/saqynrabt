import { safeGetToken } from "../../../../lib/safe-auth";
import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function POST(request: Request) {
  try {
    const token = await safeGetToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    // Rate limiting: 50 emails per user per day
    const REDIS_URL = process.env.KV_REST_API_URL || process.env.REDIS_URL || '';
    const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN || '';
    if (REDIS_URL && REDIS_TOKEN) {
      try {
        const redis = new Redis({ url: REDIS_URL, token: REDIS_TOKEN });
        const emailKey = `email_limit:${token.substring(0, 16)}`;
        const count = await redis.get(emailKey);
        if (count && typeof count === 'number' && count >= 50) {
          return NextResponse.json({ success: false, error: 'Daily email limit reached (50/day).' }, { status: 429, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
        }
        await redis.incr(emailKey);
        await redis.expire(emailKey, 86400);
      } catch (e) {
        console.error('Email rate limit error (non-fatal):', e);
      }
    }

    const apiKey = process.env.EMAIL_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: 'Email service is not configured.' },
        { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    const resend = new Resend(apiKey);

    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: to, subject, html.' },
        { status: 400, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
      );
    }

    // Validate recipient domain
    const allowedDomains = process.env.ALLOWED_EMAIL_DOMAINS?.split(',').map(d => d.trim().toLowerCase()) || [];
    if (allowedDomains.length > 0) {
      const recipientDomain = to.split('@')[1]?.toLowerCase();
      if (!recipientDomain || !allowedDomains.some(d => recipientDomain === d || recipientDomain.endsWith('.' + d))) {
        return NextResponse.json({ success: false, error: 'Recipient domain not allowed.' }, { status: 403, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
      }
    }

    const data = await resend.emails.send({
      from: 'SAQYN RABT <onboarding@resend.dev>',
      to: [to],
      subject: subject,
      html: html,
    });

    return NextResponse.json({ success: true, data }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}
