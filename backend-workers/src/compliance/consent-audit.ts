/**
 * Cookie Consent Audit endpoint.
 * Records user cookie consent decisions for Qatari Law No. 13 of 2016 compliance.
 * Proves verifiable audit trail of consent to the Ministry of Justice.
 */

import { neon } from '@neondatabase/serverless';
import { corsHeaders, verifyJWT } from '../utils';
import type { Env } from '../utils';

interface ConsentBody {
  consent: 'accepted' | 'declined';
}

export async function handleConsentAudit(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  let body: ConsentBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers });
  }

  if (!['accepted', 'declined'].includes(body.consent)) {
    return new Response(JSON.stringify({ error: 'consent must be "accepted" or "declined"' }), { status: 400, headers });
  }

  const ipAddress = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  // Try to extract user identity from JWT if available (logged-in users), else record as anonymous
  const authHeader = request.headers.get('Authorization');
  let userId: string | null = null;
  let companyId: string | null = null;

  if (authHeader) {
    const jwt = await verifyJWT(authHeader, env);
    if (jwt) {
      userId = jwt.sub;
      companyId = jwt.company_id || null;
    }
  }

  try {
    const sql = neon(env.DATABASE_URL);

    const [record] = await sql`
      INSERT INTO audit_logs (company_id, user_id, action, details, ip_address, user_agent)
      VALUES (
        ${companyId},
        ${userId},
        ${`cookie_consent_${body.consent}`},
        ${JSON.stringify({ consent: body.consent, timestamp: new Date().toISOString() })},
        ${ipAddress},
        ${userAgent}
      )
      RETURNING id, created_at
    `;

    return new Response(JSON.stringify({
      success: true,
      auditId: record.id,
      recordedAt: record.created_at,
      message: `Cookie consent "${body.consent}" recorded for audit trail.`,
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Consent audit failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to record consent' }), { status: 500, headers });
  }
}
