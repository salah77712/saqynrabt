/**
 * Automated Data Purge Cron Job.
 * Triggered daily at 03:00 UTC via Cloudflare Cron.
 * Purges expired data in compliance with Qatari Law No. 13 of 2016 retention schedules.
 *
 * Retention rules:
 *   - Chat messages: 365 days (configurable per client)
 *   - Audit logs: 3 years (1095 days)
 *   - Document cache: 30 days after subscription cancellation
 *   - Temporary PDFs: 10 minutes
 */

import { neon } from '@neondatabase/serverless';

export interface PurgeEnv {
  DATABASE_URL: string;
  BUCKET: R2Bucket;
  ADMIN_SECRET?: string;
}

interface RetentionConfig {
  chatMessagesDays: number;
  auditLogsDays: number;
  cancellationGraceDays: number;
  tempPdfMinutes: number;
}

const DEFAULT_CONFIG: RetentionConfig = {
  chatMessagesDays: 365,
  auditLogsDays: 1095,
  cancellationGraceDays: 30,
  tempPdfMinutes: 10,
};

export async function handlePurgeCron(env: PurgeEnv): Promise<Response> {
  const sql = neon(env.DATABASE_URL);
  const config = DEFAULT_CONFIG;
  const results: Record<string, any> = { timestamp: new Date().toISOString() };

  try {
    // 1. Purge expired chat messages
    const chatCutoff = new Date(Date.now() - config.chatMessagesDays * 24 * 60 * 60 * 1000);
    const { count: deletedChats } = await sql`
      DELETE FROM chat_history WHERE created_at < ${chatCutoff}
    `;
    results.chatMessagesDeleted = deletedChats;

    // 2. Purge expired audit logs
    const auditCutoff = new Date(Date.now() - config.auditLogsDays * 24 * 60 * 60 * 1000);
    const { count: deletedAuditLogs } = await sql`
      DELETE FROM audit_logs WHERE created_at < ${auditCutoff}
    `;
    results.auditLogsDeleted = deletedAuditLogs;

    // 3. Purge data for cancelled companies past grace period
    const graceCutoff = new Date(Date.now() - config.cancellationGraceDays * 24 * 60 * 60 * 1000);
    const cancelledCompanies = await sql`
      SELECT company_id FROM companies
      WHERE cancellation_date IS NOT NULL
      AND cancellation_date < ${graceCutoff}
    `;

    for (const company of cancelledCompanies) {
      const cid = company.company_id;

      await sql`DELETE FROM chat_history WHERE company_id = ${cid}`;
      await sql`DELETE FROM documents WHERE company_id = ${cid}`;
      await sql`DELETE FROM usage_ledger WHERE company_id = ${cid}`;
      await sql`DELETE FROM audit_logs WHERE company_id = ${cid}`;

      // Mark company as fully purged
      await sql`UPDATE companies SET purged_at = NOW() WHERE company_id = ${cid}`;

      results[`purged_${cid}`] = true;
    }
    results.companiesPurged = cancelledCompanies.length;

    // 4. Clean up temp PDF files in R2
    const tempObjects = await env.BUCKET.list({ prefix: 'legal-pdfs/' });
    const pdfCutoff = new Date(Date.now() - config.tempPdfMinutes * 60 * 1000);
    let pdfsDeleted = 0;

    for (const obj of tempObjects.objects) {
      const meta = obj.customMetadata;
      if (meta?.expiresAt && new Date(meta.expiresAt) < pdfCutoff) {
        await env.BUCKET.delete(obj.key);
        pdfsDeleted++;
      }
    }
    results.tempPdfsDeleted = pdfsDeleted;

    // 5. Purge compliance pack downloads
    const packObjects = await env.BUCKET.list({ prefix: 'compliance-pack/' });
    let packsDeleted = 0;
    for (const obj of packObjects.objects) {
      const meta = obj.customMetadata;
      if (meta?.expiresAt && new Date(meta.expiresAt) < pdfCutoff) {
        await env.BUCKET.delete(obj.key);
        packsDeleted++;
      }
    }
    results.compliancePacksDeleted = packsDeleted;

    results.status = 'success';
    console.log('Purge cron completed:', JSON.stringify(results));

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    console.error('Purge cron failed:', err);
    return new Response(JSON.stringify({ status: 'error', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
