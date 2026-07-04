/**
 * Public REST API V1 - Incoming Call Automation Dispatch
 */
export async function handlePublicV1Automation(
  request: Request,
  env: any,
  sql: any,
  redis?: any
): Promise<Response> {
  const apiKey = request.headers.get('x-api-key');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'UNAUTHORIZED_MISSING_API_KEY' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // 1. Verify API key
  const [keyRow] = await sql`
    SELECT company_id FROM api_keys WHERE key_hash = ${apiKey}
  `;

  if (!keyRow) {
    return new Response(JSON.stringify({ error: 'INVALID_API_KEY' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body: any = await request.json();
    const customer = body.customer_name || 'Guest';
    const reqType = body.request_type || 'General Inquiry';

    // 2. Insert call request into Postgres company queue
    const [inserted] = await sql`
      INSERT INTO company_requests (company_id, customer_name, request_type, status, created_at)
      VALUES (${keyRow.company_id}, ${customer}, ${reqType}, 'pending', NOW())
      RETURNING id, customer_name, request_type, status, created_at
    `;

    return new Response(JSON.stringify({
      success: true,
      request: inserted
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
