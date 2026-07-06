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
    const res = await fetch(`${apiBase}/api/export-logs`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const blob = await res.blob();
    return new Response(blob, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'text/csv',
        'Content-Disposition': res.headers.get('Content-Disposition') || 'attachment; filename="chat_logs.csv"',
      },
    });
  } catch (err) {
    console.error('Export logs fetch failed:', err);
    return Response.json({ error: 'Failed to export logs' }, { status: 502 });
  }
}
