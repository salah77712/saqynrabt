import { NextRequest, NextResponse } from 'next/server';
import { getSafeAuth } from '../../../lib/safe-auth';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { getToken } = getSafeAuth(req);
    const token = await getToken({ template: 'saqyn-jwt' });

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.saqynrabt.com'}/api/usage-stats`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Usage stats proxy error:', err);
    return NextResponse.json({ error: 'Failed to fetch usage stats' }, { status: 500 });
  }
}
