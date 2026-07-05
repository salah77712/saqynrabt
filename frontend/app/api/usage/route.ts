import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { getToken, userId } = await auth();

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

  try {
    const res = await fetch(`${apiBase}/api/usage-stats`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return Response.json(data, { status: res.status });
  } catch (err) {
    console.error('Usage fetch failed:', err);
    return Response.json({ error: 'Failed to fetch usage data from live NeonDB' }, { status: 502 });
  }
}
