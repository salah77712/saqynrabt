import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { getToken, userId } = getAuth(req);
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = await getToken({ template: 'saqyn-jwt' });
  if (!token) {
    return Response.json({ error: 'Failed to get auth token' }, { status: 500 });
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  const body = await req.json();

  try {
    const res = await fetch(`${apiBase}/api/chat`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get('Content-Type') || '';

    if (contentType.includes('text/event-stream')) {
      const { readable, writable } = new TransformStream();
      res.body?.pipeTo(writable);
      return new Response(readable, {
        status: res.status,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Chat req failed:', err);
    return Response.json({ error: 'Chat req failed' }, { status: 502 });
  }
}
