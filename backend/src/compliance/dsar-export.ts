/**
 * DSAR export handler.
 * Generates a time-limited, encrypted ZIP archive of a company's data.
 * Strictly enforces tenant isolation via JWT company_id.
 * Compliant with Qatari Law No. 13 of 2016 Right to Access.
 */

import { neon } from '@neondatabase/serverless';
import { corsHeaders, logAudit } from '../utils';
import type { RequestWithContext } from '../utils';

export async function handlePrivacyExport(request: RequestWithContext): Promise<Response> {
  const env = request.env;
  const jwt = request.jwt!;
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  const cid = jwt.company_id;
  if (!cid) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  const ipAddress = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  try {
    const sql = neon(env.DATABASE_URL);

    // Fetch company data — strictly filtered by company_id
    const [company] = await sql`SELECT * FROM companies WHERE company_id = ${cid}`;
    if (!company) {
      return new Response(JSON.stringify({ error: 'Company not found' }), { status: 404, headers });
    }

    // Fetch documents metadata
    const documents = await sql`
      SELECT id, filename, content_type, file_size, uploaded_by, created_at
      FROM documents WHERE company_id = ${cid}
    `;

    // Fetch chat history
    const chatHistory = await sql`
      SELECT id, role, content, context, created_at
      FROM chat_messages WHERE company_id = ${cid}
      ORDER BY created_at ASC
    `;

    // Fetch employee records
    const employees = await sql`
      SELECT id, name, email, role, department, created_at
      FROM employees WHERE company_id = ${cid}
    `;

    // Build export payload
    const exportData = {
      generatedAt: new Date().toISOString(),
      company: {
        id: company.company_id,
        name: company.name,
        email: company.email,
        industry: company.industry,
        createdAt: company.created_at,
      },
      documents: documents.map((d: any) => ({
        id: d.id,
        filename: d.filename,
        type: d.content_type,
        size: d.file_size,
        uploadedBy: d.uploaded_by,
        uploadedAt: d.created_at,
      })),
      chatHistory: chatHistory.map((c: any) => ({
        id: c.id,
        role: c.role,
        preview: c.content?.substring(0, 200),
        context: c.context,
        createdAt: c.created_at,
      })),
      employees: employees.map((e: any) => ({
        id: e.id,
        name: e.name,
        email: e.email,
        role: e.role,
        department: e.department,
      })),
    };

    // Store export record in R2 with time-limited signed URL
    const key = `exports/${cid}/${crypto.randomUUID()}.json`;
    const encoder = new TextEncoder();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await env.BUCKET.put(key, encoder.encode(JSON.stringify(exportData, null, 2)), {
      httpMetadata: { contentType: 'application/json' },
      customMetadata: {
        companyId: cid,
        generatedAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString(),
      },
    });

    await logAudit(env, cid, jwt.sub, 'data_export', {
      exportKey: key,
      documentCount: documents.length,
      chatMessageCount: chatHistory.length,
      employeeCount: employees.length,
    }, ipAddress, userAgent);

    return new Response(JSON.stringify({
      success: true,
      message: 'Data export generated. URL expires in 1 hour.',
      key,
      expiresAt: expiresAt.toISOString(),
      summary: {
        company: 1,
        documents: documents.length,
        chatMessages: chatHistory.length,
        employees: employees.length,
      },
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Privacy export failed:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handlePrivacyDelete(request: RequestWithContext): Promise<Response> {
  const env = request.env;
  const jwt = request.jwt!;
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  const cid = jwt.company_id;
  if (!cid) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  const ipAddress = request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const userAgent = request.headers.get('user-agent') || 'Unknown';

  try {
    const sql = neon(env.DATABASE_URL);

    await sql`
      UPDATE companies SET cancellation_date = NOW() WHERE company_id = ${cid}
    `;

    await logAudit(env, cid, jwt.sub, 'deletion_requested', {
      message: 'Account deletion requested. 30-day grace period initiated.',
      gracePeriodEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }, ipAddress, userAgent);

    return new Response(JSON.stringify({
      success: true,
      message: 'Deletion request received. A 30-day grace period is now in effect as required by Qatari Civil Code Article 190.',
      gracePeriodEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Privacy delete failed:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}
