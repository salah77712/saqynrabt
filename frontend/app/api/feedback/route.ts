import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId, getToken } = getAuth(req);
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { rating?: number; comment?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { rating, comment } = body;

  if (typeof rating !== 'number' || rating < 1 || rating > 5) {
    return Response.json({ error: 'rating must be an integer between 1 and 5' }, { status: 400 });
  }

  const token = await getToken({ template: 'saqyn-jwt' });
  if (!token) {
    return Response.json({ error: 'Failed to get auth token' }, { status: 500 });
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/api/feedback`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating, comment }),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Feedback submission failed:', err);
    return Response.json({ error: 'Failed to submit feedback' }, { status: 502 });
  }
}
