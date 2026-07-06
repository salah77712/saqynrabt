import { getSafeAuth } from '../../../../lib/safe-auth';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { getToken } = getSafeAuth(req);

  const token = await getToken();
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/api/chat/history`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const text = await res.text();
    let data: any;
    try { data = JSON.parse(text); } catch { return Response.json({ error: 'Invalid backend response' }, { status: 502 }); }
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Chat history fetch failed:', err);
    return Response.json({ error: 'Failed to fetch chat history from live NeonDB' }, { status: 502 });
  }
}
