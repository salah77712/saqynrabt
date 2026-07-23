import { neon } from '@neondatabase/serverless';
import type { Env, RequestWithContext } from '../utils';
import { corsHeaders, verifyJWT, logAudit, initRedis } from '../utils';

export async function handleWakeup(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  let schemaVersion = 0;
  try {
    const sql = neon(request.env.DATABASE_URL);
    const [row] = await sql`SELECT version FROM _schema_version ORDER BY version DESC LIMIT 1`;
    schemaVersion = row?.version ?? 0;
  } catch { /* table may not exist */ }
  return new Response(JSON.stringify({ status: 'warmed', schema: schemaVersion, timestamp: new Date().toISOString() }), { headers });
}

export async function handleHealth(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  let dbOk = false;
  let redisOk = false;
  try {
    const sql = neon(request.env.DATABASE_URL);
    await sql`SELECT 1`;
    dbOk = true;
  } catch { /* not ok */ }
  try {
    if (request.env.REDIS_URL) {
      const redis = initRedis(request.env);
      await redis.ping();
      redisOk = true;
    }
  } catch { /* not ok */ }
  return new Response(JSON.stringify({
    status: dbOk ? 'healthy' : 'degraded',
    checks: { database: dbOk ? 'online' : 'offline', cache: redisOk ? 'online' : 'offline' },
  }), { headers });
}

export async function handleAdminMigrate(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const adminSecret = request.headers.get('X-Admin-Secret');
  if (!env.ADMIN_SECRET || adminSecret !== env.ADMIN_SECRET) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  try {
    const sql = neon(env.DATABASE_URL);
    await sql`CREATE TABLE IF NOT EXISTS _schema_version (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
    const [row] = await sql`SELECT version FROM _schema_version ORDER BY version DESC LIMIT 1`;
    const currentVersion = row?.version ?? 0;

    const migrations: (() => Promise<void>)[] = [];
    if (currentVersion < 1) {
      migrations.push(async () => {
        await sql`CREATE TABLE IF NOT EXISTS company_members (id SERIAL PRIMARY KEY, company_id VARCHAR(255), clerk_user_id VARCHAR(255) UNIQUE, email VARCHAR(255), name VARCHAR(255), status VARCHAR(50) DEFAULT 'pending', role VARCHAR(50) DEFAULT 'employee', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS company_entitlements (company_id VARCHAR(255) PRIMARY KEY, max_employees INTEGER DEFAULT 50, max_documents INTEGER DEFAULT 5, max_questions INTEGER DEFAULT 1000, dept_limit INTEGER DEFAULT 3, automation_texts_limit INTEGER DEFAULT 300, voice_minutes_limit INTEGER DEFAULT 250, auto_overage_enabled BOOLEAN DEFAULT FALSE)`;
        await sql`CREATE TABLE IF NOT EXISTS usage_ledger (company_id VARCHAR(255) PRIMARY KEY, questions_count INTEGER DEFAULT 0, questions_used INTEGER DEFAULT 0, voice_minutes_used INTEGER DEFAULT 0, automation_texts_used INTEGER DEFAULT 0)`;
        await sql`CREATE TABLE IF NOT EXISTS knowledge_gaps (id SERIAL PRIMARY KEY, company_id VARCHAR(255), user_id VARCHAR(255), question_text TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS documents (id VARCHAR(255) PRIMARY KEY, company_id VARCHAR(255) NOT NULL, filename VARCHAR(512) NOT NULL, content_type VARCHAR(255), size_bytes INTEGER DEFAULT 0, content TEXT, status VARCHAR(50) DEFAULT 'pending', metadata JSONB DEFAULT '{}', uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`INSERT INTO _schema_version (version) VALUES (1)`;
      });
    }
    if (currentVersion < 2) {
      migrations.push(async () => {
        await sql`CREATE TABLE IF NOT EXISTS employees (id SERIAL PRIMARY KEY, company_id VARCHAR(255) NOT NULL, clerk_user_id VARCHAR(255) UNIQUE, email VARCHAR(255), first_name VARCHAR(255), last_name VARCHAR(255), role VARCHAR(100) DEFAULT 'employee', department VARCHAR(255), manager_id INTEGER, is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`INSERT INTO _schema_version (version) VALUES (2)`;
      });
    }
    if (currentVersion < 3) {
      migrations.push(async () => {
        await sql`CREATE TABLE IF NOT EXISTS automations (id SERIAL PRIMARY KEY, company_id VARCHAR(255), name VARCHAR(255), trigger_event VARCHAR(255), action_type VARCHAR(255), config JSONB DEFAULT '{}', is_active BOOLEAN DEFAULT TRUE, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS chat_history (id SERIAL PRIMARY KEY, company_id VARCHAR(255), user_id VARCHAR(255), thread_id VARCHAR(255), role VARCHAR(50), content TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS feedback (id SERIAL PRIMARY KEY, company_id VARCHAR(255), user_id VARCHAR(255), rating INTEGER, category VARCHAR(255), comment TEXT, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS audit_logs (id SERIAL PRIMARY KEY, company_id VARCHAR(255), user_id VARCHAR(255), action VARCHAR(255), details JSONB, ip_address VARCHAR(45), user_agent TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`CREATE TABLE IF NOT EXISTS companies (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255), slug VARCHAR(255), created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        await sql`INSERT INTO _schema_version (version) VALUES (3)`;
      });
    }
    if (currentVersion < 4) {
      migrations.push(async () => {
        await sql`ALTER TABLE documents ADD COLUMN IF NOT EXISTS chunk_count INTEGER DEFAULT 0`;
        await sql`ALTER TABLE documents ADD COLUMN IF NOT EXISTS extracted_r2_key VARCHAR(1024) DEFAULT ''`;
        await sql`ALTER TABLE documents ADD COLUMN IF NOT EXISTS indexed_at TIMESTAMP`;
        await sql`INSERT INTO _schema_version (version) VALUES (4)`;
      });
    }
    if (currentVersion < 5) {
      migrations.push(async () => {
        await sql`ALTER TABLE companies ADD COLUMN IF NOT EXISTS slug VARCHAR(255)`;
        await sql`INSERT INTO _schema_version (version) VALUES (5)`;
      });
    }
    if (currentVersion < 6) {
      migrations.push(async () => {
        await sql`ALTER TABLE company_entitlements ADD COLUMN IF NOT EXISTS plan_key VARCHAR(50) DEFAULT 'platform'`;
        await sql`INSERT INTO _schema_version (version) VALUES (6)`;
      });
    }

    for (const migration of migrations) {
      await migration();
    }

    return new Response(JSON.stringify({ success: true, message: `Migrations applied: ${migrations.length}`, version: currentVersion + migrations.length }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleCheckInvite(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');
    if (!email) {
      return new Response(JSON.stringify({ invited: false, error: 'Email required' }), { status: 400, headers });
    }
    const sql = neon(request.env.DATABASE_URL);
    const [member] = await sql`
      SELECT id FROM company_members WHERE LOWER(email) = LOWER(${email}) AND status = 'pending'
    `;
    return new Response(JSON.stringify({ invited: !!member }), { headers });
  } catch (err: any) {
    console.error('Check invite failed:', err);
    return new Response(JSON.stringify({ invited: false, error: 'Internal server error' }), { status: 500, headers });
  }
}
