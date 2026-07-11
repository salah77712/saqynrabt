import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis';
import { verifyToken } from '@clerk/backend';

export interface Env {
  OPENAI_API_KEY: string;
  DATABASE_URL: string;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_HOST?: string;
  CLERK_SECRET_KEY: string;
  REDIS_URL: string;
  VOICE_AI_ACTIVATED: string;
  BUCKET: R2Bucket;
  INGESTION_QUEUE?: Queue;
  NODE_ENV?: string;
  VAPI_API_KEY?: string;
  ALLOW_MOCK_TOKENS?: string;
  CLERK_WEBHOOK_SECRET?: string;
  VAPI_WEBHOOK_SECRET?: string;
  MESSAGE_WEBHOOK_SECRET?: string;
  ADMIN_SECRET?: string;
  EMAIL_API_KEY?: string;
  CF_AI_GATEWAY?: string;
}

export interface JWTPayload {
  company_id?: string;
  sub: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

export interface RequestWithContext extends Request {
  env: Env;
  ctx: ExecutionContext;
  jwt?: JWTPayload;
}

export function initRedis(env: Env): Redis {
  const url = env.REDIS_URL;
  const httpsUrl = url.includes('redis://')
    ? `https://${url.split('@')[1]?.replace(/:.*$/, '') || ''}`
    : url;
  const token = url.includes('redis://')
    ? (url.split('@')[0]?.split('default:')[1] || '')
    : '';
  return new Redis({ url: httpsUrl, token });
}

export function chunkText(text: string): string[] {
  const size = 1024;
  const overlap = 50;
  const chunks: string[] = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + size, text.length);
    chunks.push(text.slice(start, end));
    start += size - overlap;
    if (start >= text.length) break;
  }
  return chunks;
}

export async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ input: text, model: 'text-embedding-3-small' }),
  });
  if (!res.ok) throw new Error(`OpenAI embedding failed: ${await res.text()}`);
  const data: any = await res.json();
  return data.data[0].embedding;
}

export function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  let allowedOrigin = 'https://saqynrabt.com';
  if (env.NODE_ENV !== 'production' && (origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('vercel.app'))) {
    allowedOrigin = origin;
  }
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export async function verifyJWT(authHeader: string | null, env: Env): Promise<JWTPayload | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  if (token.startsWith('mock-token-')) {
    if (env.NODE_ENV === 'production' || env.ALLOW_MOCK_TOKENS !== 'true') return null;
    console.warn('[WARN] ALLOW_MOCK_TOKENS is enabled! Auth bypass is active. This should never be set in production.');
    const parts = token.split('-');
    return { company_id: parts[2] || 'dummy_company', sub: parts[3] || 'user_admin12345demo', email: 'demo@saqynrabt.com', role: parts[4] || 'admin' };
  }
  try {
    const payload = await verifyToken(token, { secretKey: env.CLERK_SECRET_KEY });
    const company_id = (payload as any).company_id || (payload as any).public_metadata?.company_id || (payload as any).org_id || 'dummy_company';
    const role = (payload as any).role || (payload as any).public_metadata?.role || 'employee';
    return { ...(payload as any), company_id, role };
  } catch { return null; }
}

export async function verifyClerkWebhook(request: Request, bodyText: string, webhookSecret: string | undefined, env: Env): Promise<boolean> {
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");
  if (!svixId || !svixTimestamp || !svixSignature) return env.ALLOW_MOCK_TOKENS === 'true';
  if (!webhookSecret) return env.NODE_ENV !== 'production';
  const now = Math.floor(Date.now() / 1000);
  const timestamp = parseInt(svixTimestamp, 10);
  if (isNaN(timestamp) || Math.abs(now - timestamp) > 300) return false;
  const secretKey = webhookSecret.startsWith("whsec_") ? webhookSecret.substring(6) : webhookSecret;
  try {
    const keyData = Uint8Array.from(atob(secretKey), c => c.charCodeAt(0));
    const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
    const signedPayload = `${svixId}.${svixTimestamp}.${bodyText}`;
    const signatures = svixSignature.split(" ");
    for (const sig of signatures) {
      const parts = sig.split(",");
      if (parts.length === 2 && parts[0] === "v1") {
        const sigBytes = new Uint8Array(parts[1].match(/.{1,2}/g)!.map((b: string) => parseInt(b, 16)));
        if (await crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(signedPayload))) return true;
      }
    }
  } catch (e) { console.error("Webhook verification error:", e); }
  return false;
}

export async function checkRateLimit(redis: Redis, companyId: string): Promise<{ allowed: boolean; retryAfter: number }> {
  const key = `rate_limit:${companyId}`;
  const current = await redis.get(key);
  if (current && typeof current === 'number' && current >= 5) {
    const ttl = await redis.ttl(key);
    return { allowed: false, retryAfter: ttl > 0 ? ttl : 1 };
  }
  await redis.incr(key);
  await redis.expire(key, 1);
  return { allowed: true, retryAfter: 0 };
}

export async function checkUsageLimit(sql: any, companyId: string, type: 'questions' | 'texts' | 'voice'): Promise<{ limitReached: boolean; current: number; limit: number }> {
  const [entitlements, ledger] = await Promise.all([
    sql`SELECT max_questions, automation_texts_limit, voice_minutes_limit, auto_overage_enabled FROM company_entitlements WHERE company_id = ${companyId}`,
    sql`SELECT questions_used, questions_count, automation_texts_used, voice_minutes_used FROM usage_ledger WHERE company_id = ${companyId}`
  ]);
  if (entitlements?.auto_overage_enabled) return { limitReached: false, current: 0, limit: 999999 };
  if (type === 'questions') {
    const limit = entitlements?.max_questions ?? 1000;
    return { limitReached: (ledger?.questions_used ?? ledger?.questions_count ?? 0) >= limit, current: ledger?.questions_used ?? ledger?.questions_count ?? 0, limit };
  } else if (type === 'texts') {
    const limit = entitlements?.automation_texts_limit ?? 300;
    return { limitReached: (ledger?.automation_texts_used ?? 0) >= limit, current: ledger?.automation_texts_used ?? 0, limit };
  } else {
    const limit = entitlements?.voice_minutes_limit ?? 250;
    return { limitReached: (ledger?.voice_minutes_used ?? 0) >= limit, current: ledger?.voice_minutes_used ?? 0, limit };
  }
}

export async function logAudit(env: Env, company_id: string, user_id: string, action: string, details?: any, ip_address?: string | null, user_agent?: string | null): Promise<void> {
  try {
    const sql = neon(env.DATABASE_URL);
    await sql`INSERT INTO audit_logs (company_id, user_id, action, details, ip_address, user_agent) VALUES (${company_id}, ${user_id}, ${action}, ${details ? JSON.stringify(details) : null}::jsonb, ${ip_address || null}, ${user_agent || null})`;
  } catch (err) { console.error(`Audit log failed for "${action}":`, err); }
}
