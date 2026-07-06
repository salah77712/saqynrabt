import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/api/wakeup`);
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error('Wakeup failed:', err);
    return Response.json({ error: 'Failed to wake up database' }, { status: 502 });
  }
}
