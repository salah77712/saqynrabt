import { NextRequest, NextResponse } from 'next/server';
import { getSafeAuth } from '../../../lib/safe-auth';
import type { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { getToken } = getSafeAuth(req);
    const token = await getToken();

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://api.saqynrabt.com'}/api/onboarding`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ error: errText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Onboarding proxy error:', err);
    return NextResponse.json({ error: 'Failed to submit onboarding data' }, { status: 500 });
  }
}
