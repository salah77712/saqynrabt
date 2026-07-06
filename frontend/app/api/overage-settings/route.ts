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
    const res = await fetch(`${apiBase}/api/overage-settings`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Overage settings update failed:', err);
    return Response.json({ error: 'Failed to update overage settings' }, { status: 502 });
  }
}
