/**
 * Legal Acceptance endpoint handler.
 * Records explicit, auditable TOS/DPA acceptance with version hashing.
 * Required under Qatari Law No. 8 of 2019 (Electronic Commerce).
 */

import { neon } from '@neondatabase/serverless';
import { corsHeaders, logAudit } from '../utils';
import type { RequestWithContext } from '../utils';

interface AcceptRequest {
  documentType: 'tos' | 'dpa';
  versionHash: string;
}

export async function handleLegalAccept(request: RequestWithContext): Promise<Response> {
  const env = request.env;
  const jwt = request.jwt!;
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  let body: AcceptRequest;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
  }

  if (!['tos', 'dpa'].includes(body.documentType)) {
    return new Response(JSON.stringify({ error: 'documentType must be "tos" or "dpa"' }), { status: 400, headers });
  }

  if (!body.versionHash || typeof body.versionHash !== 'string') {
    return new Response(JSON.stringify({ error: 'versionHash is required' }), { status: 400, headers });
  }

  try {
    const sql = neon(env.DATABASE_URL);
    const ipAddress = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    const [version] = await sql`
      SELECT id FROM legal_versions
      WHERE document_name = ${body.documentType === 'tos' ? 'tos' : 'dpa'}
      AND version_hash = ${body.versionHash}
      AND superseded_at IS NULL
    `;

    if (!version) {
      return new Response(JSON.stringify({ error: 'Invalid or outdated version hash' }), { status: 400, headers });
    }

    await sql`
      UPDATE legal_acceptances
      SET is_active = FALSE
      WHERE user_id = ${jwt.sub}
      AND document_type = ${body.documentType}
      AND is_active = TRUE
    `;

    const [acceptance] = await sql`
      INSERT INTO legal_acceptances (company_id, user_id, document_type, version_hash, ip_address, user_agent)
      VALUES (${jwt.company_id}, ${jwt.sub}, ${body.documentType}, ${body.versionHash}, ${ipAddress}, ${userAgent})
      RETURNING id, accepted_at
    `;

    await logAudit(env, jwt.company_id!, jwt.sub, 'legal_accept', {
      documentType: body.documentType,
      versionHash: body.versionHash,
      acceptanceId: acceptance.id,
    }, ipAddress, userAgent);

    return new Response(JSON.stringify({
      success: true,
      acceptanceId: acceptance.id,
      acceptedAt: acceptance.accepted_at,
      documentType: body.documentType,
      versionHash: body.versionHash,
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Legal acceptance failed:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleCheckAcceptance(request: RequestWithContext): Promise<Response> {
  const env = request.env;
  const jwt = request.jwt!;
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  try {
    const sql = neon(env.DATABASE_URL);

    const [tosAcceptance] = await sql`
      SELECT version_hash, accepted_at FROM legal_acceptances
      WHERE user_id = ${jwt.sub} AND document_type = 'tos' AND is_active = TRUE
      ORDER BY accepted_at DESC LIMIT 1
    `;

    const [dpaAcceptance] = await sql`
      SELECT version_hash, accepted_at FROM legal_acceptances
      WHERE user_id = ${jwt.sub} AND document_type = 'dpa' AND is_active = TRUE
      ORDER BY accepted_at DESC LIMIT 1
    `;

    const [latestTos] = await sql`
      SELECT version_hash, effective_date FROM legal_versions
      WHERE document_name = 'tos' AND superseded_at IS NULL
      ORDER BY effective_date DESC LIMIT 1
    `;

    const [latestDpa] = await sql`
      SELECT version_hash, effective_date FROM legal_versions
      WHERE document_name = 'dpa' AND superseded_at IS NULL
      ORDER BY effective_date DESC LIMIT 1
    `;

    const needsTosAccept = !tosAcceptance || tosAcceptance.version_hash !== latestTos?.version_hash;
    const needsDpaAccept = !dpaAcceptance || dpaAcceptance.version_hash !== latestDpa?.version_hash;

    return new Response(JSON.stringify({
      tos: {
        accepted: !!tosAcceptance,
        acceptedAt: tosAcceptance?.accepted_at || null,
        currentVersion: latestTos?.version_hash || null,
        needsAccept: !!needsTosAccept,
      },
      dpa: {
        accepted: !!dpaAcceptance,
        acceptedAt: dpaAcceptance?.accepted_at || null,
        currentVersion: latestDpa?.version_hash || null,
        needsAccept: !!needsDpaAccept,
      },
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Check acceptance failed:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
