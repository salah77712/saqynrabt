import { auth } from '@clerk/nextjs/server';
import { sendEmail } from '../../../../lib/email';

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { to?: string; subject?: string; html?: string };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { to, subject, html } = body;
  if (!to || !subject || !html) {
    return Response.json({ error: 'Missing required fields: to, subject, html' }, { status: 400 });
  }

  if (typeof to !== 'string' || !to.includes('@')) {
    return Response.json({ error: 'Invalid email address' }, { status: 400 });
  }

  try {
    await sendEmail(to, subject, html);
    return Response.json({ success: true });
  } catch (err: any) {
    console.error('Email send failed:', err);
    return Response.json({ error: err?.message || 'Failed to send email' }, { status: 502 });
  }
}
