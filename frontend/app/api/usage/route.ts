import { getSafeAuth } from '../../../lib/safe-auth';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { getToken } = getSafeAuth(req);
  const token = await getToken();

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  try {
    const res = await fetch(`${apiBase}/api/usage-stats`, {
      headers: token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' },
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      console.error('Usage: invalid JSON from backend:', text);
      return Response.json({ error: 'Invalid backend response' }, { status: 502 });
    }
  } catch (err) {
    console.error('Usage fetch failed:', err);
    return Response.json({ error: 'Failed to fetch usage data' }, { status: 502 });
  }
}
