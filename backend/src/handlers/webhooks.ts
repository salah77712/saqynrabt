import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, verifyClerkWebhook } from '../utils';

export async function handleClerkWebhook(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;

  const bodyText = await request.text();
  const isValid = await verifyClerkWebhook(request, bodyText, env.CLERK_WEBHOOK_SECRET, env);
  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401, headers });
  }

  try {
    const body = JSON.parse(bodyText);
    const type = body.type;
    const data = body.data;
    const sql = neon(env.DATABASE_URL);

    if (type === 'user.created' || type === 'user.updated') {
      let company_id = data.private_metadata?.company_id || data.public_metadata?.company_id;
      const clerkUserId = data.id;
      const email = data.email_addresses?.[0]?.email_address || '';
      const firstName = data.first_name || '';
      const lastName = data.last_name || '';

      // Check if there is an invitation in company_members for this email
      let inviteRole = 'employee';
      if (email) {
        const [member] = await sql`
          SELECT company_id, status, role FROM company_members WHERE LOWER(email) = LOWER(${email})
        `;
        if (member) {
          if (!company_id) {
            company_id = member.company_id;
          }
          inviteRole = member.role || 'employee';
          // Link clerk_user_id in company_members
          await sql`
            UPDATE company_members
            SET clerk_user_id = ${clerkUserId}
            WHERE LOWER(email) = LOWER(${email}) AND clerk_user_id IS NULL
          `;
        }
      }

      if (company_id) {
        // Sync company_id and role to Clerk public metadata if not already present
        if (!data.public_metadata?.company_id) {
          try {
            const clerkRes = await fetch(`https://api.clerk.com/v1/users/${clerkUserId}/metadata`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${env.CLERK_SECRET_KEY}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                public_metadata: {
                  company_id: company_id,
                  role: inviteRole
                }
              })
            });
            if (!clerkRes.ok) {
              console.error('Failed to update Clerk user metadata:', await clerkRes.text());
            }
          } catch (clerkErr) {
            console.error('Error updating Clerk user metadata:', clerkErr);
          }
        }

        // Check if already approved/active in company_members
        const [memStatus] = await sql`
          SELECT status FROM company_members WHERE LOWER(email) = LOWER(${email}) AND company_id = ${company_id}
        `;
        const isActive = memStatus?.status === 'active';

        await sql`
          INSERT INTO employees (company_id, clerk_user_id, email, first_name, last_name, role, is_active)
          VALUES (${company_id}, ${clerkUserId}, ${email}, ${firstName}, ${lastName}, ${inviteRole}, ${isActive})
          ON CONFLICT (clerk_user_id)
          DO UPDATE SET company_id = ${company_id}, email = ${email}, first_name = ${firstName}, last_name = ${lastName}, role = ${inviteRole}, is_active = ${isActive}, updated_at = NOW()
        `;
      }
    } else if (type === 'user.deleted') {
      await sql`UPDATE employees SET is_active = false WHERE clerk_user_id = ${data.id}`;
    } else if (type === 'organization.created' || type === 'organization.updated') {
      const company_id = data.id;
      const name = data.name || '';
      await sql`
        INSERT INTO companies (id, name, slug)
        VALUES (${company_id}, ${name}, ${data.slug || ''})
        ON CONFLICT (id) DO UPDATE SET name = ${name}, slug = ${data.slug || ''}, updated_at = NOW()
      `;
    } else if (type === 'organizationMembership.created') {
      const company_id = data.organization?.id;
      const clerkUserId = data.public_user_data?.user_id;
      const email = data.public_user_data?.identifier || '';
      const firstName = data.public_user_data?.first_name || '';
      const lastName = data.public_user_data?.last_name || '';
      if (company_id && clerkUserId) {
        await sql`
          INSERT INTO employees (company_id, clerk_user_id, email, first_name, last_name, is_active)
          VALUES (${company_id}, ${clerkUserId}, ${email}, ${firstName}, ${lastName}, true)
          ON CONFLICT (clerk_user_id)
          DO UPDATE SET company_id = ${company_id}, email = ${email}, first_name = ${firstName}, last_name = ${lastName}, is_active = true, updated_at = NOW()
        `;
      }
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleVapiWebhook(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;

  try {
    const bodyText = await request.text();

    const vapiSig = request.headers.get('x-vapi-signature') || '';
    const vapiSecret = env.VAPI_WEBHOOK_SECRET;
    if (!vapiSecret) {
      return new Response(JSON.stringify({ error: 'VAPI_WEBHOOK_SECRET not configured' }), { status: 500, headers });
    }
    if (!vapiSig) {
      return new Response(JSON.stringify({ error: 'Missing signature' }), { status: 401, headers });
    }
    try {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey('raw', encoder.encode(vapiSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
      const sigBytes = new Uint8Array(vapiSig.match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16)));
      const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(bodyText));
      if (!valid) {
        return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401, headers });
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Signature verification failed' }), { status: 401, headers });
    }

  const body = JSON.parse(bodyText);
  if (!body.company_id) {
    return new Response(JSON.stringify({ error: 'company_id is required in request body' }), { status: 400, headers });
  }
  const company_id = body.company_id;
  const transcript = body.message?.transcript || body.transcript || '';
    const sql = neon(env.DATABASE_URL);

    if (transcript) {
      await sql`
        INSERT INTO audit_logs (company_id, user_id, action, details)
        VALUES (${company_id}, 'vapi_webhook', 'voice_transcript_received', ${JSON.stringify({ transcript_length: transcript.length })}::jsonb)
      `;
    }

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleMessageWebhook(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;

  try {
    const bodyText = await request.text();

    const msgSig = request.headers.get('x-message-signature') || '';
    const msgSecret = env.MESSAGE_WEBHOOK_SECRET;
    if (!msgSecret) {
      return new Response(JSON.stringify({ error: 'MESSAGE_WEBHOOK_SECRET not configured' }), { status: 500, headers });
    }
    if (!msgSig) {
      return new Response(JSON.stringify({ error: 'Missing signature' }), { status: 401, headers });
    }
    try {
      const encoder = new TextEncoder();
      const key = await crypto.subtle.importKey('raw', encoder.encode(msgSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
      const sigBytes = new Uint8Array(msgSig.match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16)));
      const valid = await crypto.subtle.verify('HMAC', key, sigBytes, encoder.encode(bodyText));
      if (!valid) {
        return new Response(JSON.stringify({ error: 'Invalid signature' }), { status: 401, headers });
      }
    } catch (e) {
      return new Response(JSON.stringify({ error: 'Signature verification failed' }), { status: 401, headers });
    }

    const body = JSON.parse(bodyText);
    const companyId = body.company_id || '';
    if (!companyId) {
      return new Response(JSON.stringify({ error: 'company_id is required in request body' }), { status: 400, headers });
    }
    const message = body.message || '';
    const from = body.from || body.sender || 'unknown';
    const sql = neon(env.DATABASE_URL);

    await sql`
      INSERT INTO audit_logs (company_id, user_id, action, details)
      VALUES (${companyId}, ${from}, 'incoming_message', ${JSON.stringify({ message_length: message.length })}::jsonb)
    `;

    return new Response(JSON.stringify({ success: true, received: true }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
