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
    const res = await fetch(`${apiBase}/api/employees`, {
      headers: token
        ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        : { 'Content-Type': 'application/json' },
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      console.error('Employees: invalid JSON from backend:', text);
      return Response.json({ error: 'Invalid backend response' }, { status: 502 });
    }
  } catch (err) {
    console.error('Employees fetch failed:', err);
    return Response.json({ error: 'Failed to fetch employees' }, { status: 502 });
  }
}

export async function PATCH(req: NextRequest) {
  const { getToken } = getSafeAuth(req);
  const token = await getToken();

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  if (!apiBase) {
    return Response.json({ error: 'API URL not configured' }, { status: 500 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    const res = await fetch(`${apiBase}/api/employees`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      console.error('Employees PATCH: invalid JSON from backend:', text);
      return Response.json({ error: 'Invalid backend response' }, { status: 502 });
    }
  } catch (err) {
    console.error('Employee update failed:', err);
    return Response.json({ error: 'Failed to update employee' }, { status: 502 });
  }
}
