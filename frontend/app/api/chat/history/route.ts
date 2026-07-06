import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { getToken, userId } = getAuth(req);
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = await getToken({ template: 'saqyn-jwt' });
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/api/chat/history`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Chat history fetch failed:', err);
    return Response.json({ error: 'Failed to fetch chat history from live NeonDB' }, { status: 502 });
  }
}
