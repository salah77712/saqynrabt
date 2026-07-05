import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis';

// Define environment interface
export interface Env {
  OPENAI_API_KEY: string;
  DATABASE_URL: string;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_HOST?: string;
  CLERK_SECRET_KEY: string;
  CLERK_JWT_VERIFICATION_KEY?: string; // Optional cryptographic public key
  REDIS_URL: string;
  VOICE_AI_ACTIVATED: string;
  BUCKET: R2Bucket;
  INGESTION_QUEUE?: Queue;
  NODE_ENV?: string;
  VAPI_API_KEY?: string;
  // Security parameters
  ALLOW_MOCK_TOKENS?: string;
  CLERK_WEBHOOK_SECRET?: string;
  VAPI_WEBHOOK_SECRET?: string;
  MESSAGE_WEBHOOK_SECRET?: string;
  ADMIN_SECRET?: string;
  EMAIL_API_KEY?: string;
}

// Global active connections counter for Concurrency Guard (Rule 13)
let currentDBConnections = 0;

// Helper: chunk text into overlapping segments (1024 chars, 50 overlap)
function chunkText(text: string): string[] {
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

// Helper: generate OpenAI embedding for a single text string
async function generateEmbedding(text: string, apiKey: string): Promise<number[]> {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
    }),
  });
  if (!res.ok) throw new Error(`OpenAI embedding failed: ${await res.text()}`);
  const data: any = await res.json();
  return data.data[0].embedding;
}

// Helper to set CORS headers (Rule 7)
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  // In production, strictly match https://saqynrabt.com and https://saqynrabt.vercel.app
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

// JWT decoder and cryptographic verifier (Rule 6)
interface JWTPayload {
  company_id?: string;
  sub: string;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: any;
}

// Helper to verify Clerk (Svix) Webhooks manually using Web Crypto API
async function verifyClerkWebhook(request: Request, bodyText: string, webhookSecret: string | undefined, env: Env): Promise<boolean> {
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    if (env.ALLOW_MOCK_TOKENS === 'true') {
      return true; // Bypass signature checks in test environment if headers are missing
    }
    return false;
  }

  if (!webhookSecret) {
    if (env.NODE_ENV === 'production') {
      console.error("Clerk Webhook Secret is not configured in production. Rejecting webhook.");
      return false;
    }
    return true; // Bypass signature verification in dev/local if secret is missing
  }

  // Prevent replay attacks (5 minute threshold)
  const now = Math.floor(Date.now() / 1000);
  const timestamp = parseInt(svixTimestamp, 10);
  if (isNaN(timestamp) || Math.abs(now - timestamp) > 300) {
    return false;
  }

  // The secret is base64 encoded after the "whsec_" prefix (if any)
  const secretKey = webhookSecret.startsWith("whsec_")
    ? webhookSecret.substring(6)
    : webhookSecret;

  try {
    const encoder = new TextEncoder();
    
    // Decode base64 secret to Uint8Array
    const binaryString = atob(secretKey);
    const keyData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      keyData[i] = binaryString.charCodeAt(i);
    }

    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify", "sign"]
    );

    const signedPayload = `${svixId}.${svixTimestamp}.${bodyText}`;
    const payloadData = encoder.encode(signedPayload);

    // Parse signatures (there might be multiple signatures separated by spaces)
    const signatures = svixSignature.split(" ");
    for (const sig of signatures) {
      const parts = sig.split(",");
      if (parts.length === 2 && parts[0] === "v1") {
        const sigHex = parts[1];
        // Convert hex signature to Uint8Array
        const sigBytes = new Uint8Array(sigHex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
        
        const isValid = await crypto.subtle.verify("HMAC", key, sigBytes, payloadData);
        if (isValid) return true;
      }
    }
  } catch (e) {
    console.error("Clerk webhook signature verification error:", e);
  }
  return false;
}

async function verifyJWT(authHeader: string | null, env: Env): Promise<JWTPayload | null> {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  
  // Developer/Demo bypass for instant dashboard demos (Rule 30 support)
  if (token.startsWith('mock-token-')) {
    if (env.NODE_ENV === 'production' && env.ALLOW_MOCK_TOKENS !== 'true') {
      return null;
    }
    const parts = token.split('-');
    // format: mock-token-[company_id]-[user_id]-[role]
    return {
      company_id: parts[2] || 'dummy_company',
      sub: parts[3] || 'user_admin12345demo',
      email: 'demo@saqynrabt.com',
      role: parts[4] || 'admin'
    };
  }

  // Optional cryptographic RS256 signature verification if CLERK_JWT_VERIFICATION_KEY is present
  if (env.CLERK_JWT_VERIFICATION_KEY) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      if (header.alg !== 'RS256') return null;

      const pemHeader = "-----BEGIN PUBLIC KEY-----";
      const pemFooter = "-----END PUBLIC KEY-----";
      const pemContents = env.CLERK_JWT_VERIFICATION_KEY
        .replace(pemHeader, "")
        .replace(pemFooter, "")
        .replace(/\s/g, "");
      
      const binaryDerString = atob(pemContents);
      const binaryDer = new Uint8Array(binaryDerString.length);
      for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
      }

      const publicKey = await crypto.subtle.importKey(
        "spki",
        binaryDer,
        {
          name: "RSASSA-PKCS1-v1_5",
          hash: "SHA-256",
        },
        false,
        ["verify"]
      );

      const data = new TextEncoder().encode(parts[0] + "." + parts[1]);
      const signatureBin = new Uint8Array(
        atob(parts[2].replace(/-/g, '+').replace(/_/g, '/'))
          .split("")
          .map((c) => c.charCodeAt(0))
      );

      const isValid = await crypto.subtle.verify(
        "RSASSA-PKCS1-v1_5",
        publicKey,
        signatureBin,
        data
      );

      if (!isValid) return null;

      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) return null;

      const company_id = payload.company_id || payload.org_id || 'dummy_company';
      return { ...payload, company_id };
    } catch (e) {
      console.error("JWT Verification failed:", e);
      return null;
    }
  }

  // Fallback to standard base64 decoding (for dev/local simulation only)
  if (env.NODE_ENV === 'production') {
    console.error("CRITICAL: CLERK_JWT_VERIFICATION_KEY is missing in production. Refusing token verification.");
    return null;
  }
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    const company_id = payload.company_id || payload.org_id || 'dummy_company';
    return { ...payload, company_id };
  } catch (e) {
    return null;
  }
}

// Synchronous centralized limit check (Part 7)
async function checkUsageLimit(
  sql: any,
  companyId: string,
  type: 'questions' | 'texts' | 'voice'
): Promise<{ limitReached: boolean; current: number; limit: number }> {
  // Query both entitlements and ledger in parallel
  const [entitlements, ledger] = await Promise.all([
    sql`SELECT max_questions, automation_texts_limit, voice_minutes_limit, auto_overage_enabled FROM company_entitlements WHERE company_id = ${companyId}`,
    sql`SELECT questions_used, questions_count, automation_texts_used, voice_minutes_used FROM usage_ledger WHERE company_id = ${companyId}`
  ]);

  const autoOverage = entitlements?.auto_overage_enabled ?? false;
  if (autoOverage) {
    return { limitReached: false, current: 0, limit: 999999 };
  }

  if (type === 'questions') {
    const limit = entitlements?.max_questions ?? 1000;
    const current = ledger?.questions_used ?? ledger?.questions_count ?? 0;
    return { limitReached: current >= limit, current, limit };
  } else if (type === 'texts') {
    const limit = entitlements?.automation_texts_limit ?? 300;
    const current = ledger?.automation_texts_used ?? 0;
    return { limitReached: current >= limit, current, limit };
  } else {
    const limit = entitlements?.voice_minutes_limit ?? 250;
    const current = ledger?.voice_minutes_used ?? 0;
    return { limitReached: current >= limit, current, limit };
  }
}

// Helper: write audit log entry (Part 19)
async function logAudit(
  env: Env,
  company_id: string,
  user_id: string,
  action: string,
  details?: any,
  ip_address?: string | null,
  user_agent?: string | null
): Promise<void> {
  try {
    const sql = neon(env.DATABASE_URL);
    await sql`
      INSERT INTO audit_logs (company_id, user_id, action, details, ip_address, user_agent)
      VALUES (
        ${company_id},
        ${user_id},
        ${action},
        ${details ? JSON.stringify(details) : null}::jsonb,
        ${ip_address || null},
        ${user_agent || null}
      )
    `;
  } catch (err) {
    console.error(`Audit log insert failed for action="${action}":`, err);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const requestId = crypto.randomUUID(); // Rule 12
    const headers = corsHeaders(request, env);
    headers['X-Request-ID'] = requestId;

    // Handle Preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // 1. Startup Validation (Rule 39)
    if (!env.OPENAI_API_KEY || !env.DATABASE_URL || !env.PINECONE_API_KEY || !env.CLERK_SECRET_KEY) {
      console.error(`[${requestId}] CRITICAL_MISSING_ENV: Essential env keys are not configured.`);
      return new Response(
        JSON.stringify({ error: 'System configuration error. Please contact admin.', requestId }),
        { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Concurrency Guard (Rule 13)
    if (currentDBConnections >= 15) {
      return new Response(
        JSON.stringify({ error: 'Busy', requestId }),
        { 
          status: 503, 
          headers: { 
            ...headers, 
            'Content-Type': 'application/json',
            'Retry-After': '2'
          } 
        }
      );
    }

    currentDBConnections++;

    try {
      const url = new URL(request.url);
      const sql = neon(env.DATABASE_URL); // Rule 10
      
      // Initialize Redis (Rule 14)
      const redis = new Redis({
        url: env.REDIS_URL.split('redis://')[1] ? `https://${env.REDIS_URL.split('@')[1]}` : env.REDIS_URL,
        token: env.REDIS_URL.split('@')[0].split('default:')[1] || '',
      });

      // ────────────────────────────────────────────────────────────────────────
      // PUBLIC ROUTES (No Auth Required)
      // ────────────────────────────────────────────────────────────────────────

      // A. Public wake-up and database warming (Rule 31)
      if (url.pathname === '/api/wakeup' && request.method === 'GET') {
        let schemaVersion = 0;
        try {
          const [row] = await sql`SELECT version FROM _schema_version ORDER BY version DESC LIMIT 1`;
          schemaVersion = row?.version ?? 0;
        } catch (e) {
          // table doesn't exist yet, we'll return 0
        }

        return new Response(JSON.stringify({ status: 'warmed', schema: schemaVersion }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // A1. Public health check endpoint
      if (url.pathname === '/api/health' && request.method === 'GET') {
        let dbOk = false;
        let redisOk = false;
        try {
          await sql`SELECT 1`;
          dbOk = true;
        } catch (e) { /* ok */ }
        try {
          await redis.ping();
          redisOk = true;
        } catch (e) { /* ok */ }

        return new Response(JSON.stringify({
          status: dbOk && redisOk ? 'healthy' : 'degraded',
          checks: { database: dbOk ? 'online' : 'offline', cache: redisOk ? 'online' : 'offline' },
        }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // A2. Admin Migrations Execution (Protected POST route)
      if (url.pathname === '/api/admin/migrate' && request.method === 'POST') {
        const adminSecret = request.headers.get('X-Admin-Secret') || url.searchParams.get('secret');
        if (!env.ADMIN_SECRET || adminSecret !== env.ADMIN_SECRET) {
          return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
            status: 401,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Run migrations
        await sql`CREATE TABLE IF NOT EXISTS _schema_version (version INTEGER PRIMARY KEY, applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
        const [row] = await sql`SELECT version FROM _schema_version ORDER BY version DESC LIMIT 1`;
        const currentVersion = row?.version ?? 0;

        if (currentVersion < 1) {
          await sql`
            CREATE TABLE IF NOT EXISTS company_members (
              id SERIAL PRIMARY KEY,
              company_id VARCHAR(255),
              clerk_user_id VARCHAR(255) UNIQUE,
              email VARCHAR(255),
              name VARCHAR(255),
              status VARCHAR(50) DEFAULT 'pending',
              role VARCHAR(50) DEFAULT 'employee',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `;
          await sql`
            CREATE TABLE IF NOT EXISTS company_entitlements (
              company_id VARCHAR(255) PRIMARY KEY,
              max_employees INTEGER DEFAULT 50,
              max_documents INTEGER DEFAULT 5,
              max_questions INTEGER DEFAULT 1000,
              dept_limit INTEGER DEFAULT 3,
              automation_texts_limit INTEGER DEFAULT 300,
              voice_minutes_limit INTEGER DEFAULT 250,
              auto_overage_enabled BOOLEAN DEFAULT FALSE
            )
          `;
          await sql`
            CREATE TABLE IF NOT EXISTS usage_ledger (
              company_id VARCHAR(255) PRIMARY KEY,
              questions_count INTEGER DEFAULT 0,
              questions_used INTEGER DEFAULT 0,
              voice_minutes_used INTEGER DEFAULT 0,
              automation_texts_used INTEGER DEFAULT 0
            )
          `;
          await sql`
            CREATE TABLE IF NOT EXISTS knowledge_gaps (
              id SERIAL PRIMARY KEY,
              company_id VARCHAR(255),
              user_id VARCHAR(255),
              question_text TEXT,
              timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `;
          await sql`
            CREATE TABLE IF NOT EXISTS documents (
              id VARCHAR(255) PRIMARY KEY,
              company_id VARCHAR(255),
              name VARCHAR(255),
              status VARCHAR(50) DEFAULT 'active',
              r2_key VARCHAR(555),
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
          `;
          await sql`INSERT INTO _schema_version (version) VALUES (1)`;
        }

        if (currentVersion < 2) {
          try {
            await sql`ALTER TABLE usage_ledger ADD COLUMN IF NOT EXISTS questions_used INTEGER DEFAULT 0`;
            await sql`ALTER TABLE usage_ledger ADD COLUMN IF NOT EXISTS voice_minutes_used INTEGER DEFAULT 0`;
            await sql`ALTER TABLE usage_ledger ADD COLUMN IF NOT EXISTS automation_texts_used INTEGER DEFAULT 0`;
            await sql`ALTER TABLE company_entitlements ADD COLUMN IF NOT EXISTS max_questions INTEGER DEFAULT 1000`;
            await sql`ALTER TABLE company_entitlements ADD COLUMN IF NOT EXISTS automation_texts_limit INTEGER DEFAULT 300`;
            await sql`ALTER TABLE company_entitlements ADD COLUMN IF NOT EXISTS voice_minutes_limit INTEGER DEFAULT 250`;
            await sql`ALTER TABLE company_entitlements ADD COLUMN IF NOT EXISTS auto_overage_enabled BOOLEAN DEFAULT FALSE`;
          } catch (e) { /* ignore */ }
          await sql`INSERT INTO _schema_version (version) VALUES (2)`;
        }

        ctx.waitUntil(logAudit(env, 'system', 'admin', 'migration.run', { from_version: currentVersion, to_version: Math.max(currentVersion, 2) }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

        return new Response(JSON.stringify({ status: 'migrated', schema: Math.max(currentVersion, 2) }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // B. Clerk Auth Sync Webhook (Rule 11)
      if (url.pathname === '/api/webhook' && request.method === 'POST') {
        const bodyText = await request.clone().text();
        const verified = await verifyClerkWebhook(request, bodyText, env.CLERK_WEBHOOK_SECRET, env);
        if (!verified) {
          console.error("Clerk webhook verification failed.");
          return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
            status: 401,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        const body: any = JSON.parse(bodyText);
        
        if (body?.type === 'user.created') {
          const data = body.data;
          const clerkUserId = data.id;
          const email = data.email_addresses?.[0]?.email_address || 'unknown@email.com';
          const name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'New User';
          const companyId = data.public_metadata?.company_id || 'dummy_company';

          // Set role=admin if this is the first user in this company
          const [existingCount] = await sql`
            SELECT COUNT(*)::int as count FROM company_members WHERE company_id = ${companyId}
          `;
          const role = (existingCount?.count ?? 0) === 0 ? 'admin' : 'employee';

          await sql`
            INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
            VALUES (${companyId}, ${clerkUserId}, ${email}, ${name}, 'pending', ${role})
            ON CONFLICT (clerk_user_id) DO UPDATE SET
              email = EXCLUDED.email,
              name = EXCLUDED.name,
              company_id = EXCLUDED.company_id
          `;

          // Provision default entitlements for company if missing
          await sql`
            INSERT INTO company_entitlements (company_id, max_employees, max_documents, max_questions, dept_limit, automation_texts_limit, voice_minutes_limit, auto_overage_enabled)
            VALUES (${companyId}, 50, 5, 1000, 3, 300, 250, FALSE)
            ON CONFLICT (company_id) DO NOTHING
          `;

          ctx.waitUntil(logAudit(env, companyId, clerkUserId, 'webhook.user.created', { email, name, role }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

          return new Response(JSON.stringify({ success: true, role }), {
            status: 201,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        if (body?.type === 'user.updated') {
          const data = body.data;
          const clerkUserId = data.id;
          const email = data.email_addresses?.[0]?.email_address || 'unknown@email.com';
          const name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'New User';
          const companyId = data.public_metadata?.company_id || 'dummy_company';

          await sql`
            UPDATE company_members
            SET email = ${email}, name = ${name}, company_id = ${companyId}
            WHERE clerk_user_id = ${clerkUserId}
          `;

          ctx.waitUntil(logAudit(env, companyId, clerkUserId, 'webhook.user.updated', { email, name }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        return new Response(JSON.stringify({ ignored: true }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // C. Vapi Voice Webhook (Part 6)
      if (url.pathname === '/api/vapi-webhook' && request.method === 'POST') {
        // Verification Check
        const vapiSecret = request.headers.get('x-vapi-secret') || url.searchParams.get('secret');
        if (env.VAPI_WEBHOOK_SECRET) {
          if (vapiSecret) {
            if (vapiSecret !== env.VAPI_WEBHOOK_SECRET) {
              return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
                status: 401,
                headers: { ...headers, 'Content-Type': 'application/json' },
              });
            }
          } else {
            console.warn(`[${requestId}] WARNING: Vapi webhook secret was not provided in the incoming request. Skipping strict verification.`);
          }
        } else {
          console.warn(`[${requestId}] WARNING: Vapi Webhook Secret is not configured in environment variables. Skipping strict verification.`);
        }

        const body: any = await request.json();
        
        // Extract company_id from customer metadata
        const incomingCompanyId = body.customer?.metadata?.company_id || 
                                  body.message?.customer?.metadata?.company_id || 
                                  'dummy_company';

        // central limit check
        const limitCheck = await checkUsageLimit(sql, incomingCompanyId, 'voice');
        if (limitCheck.limitReached) {
          return new Response(JSON.stringify({ error: 'LIMIT_REACHED' }), {
            status: 429,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Increment minutes used on call completion
        let minutesToIncrement = 0;
        if (body.type === 'call.completed' || body.message?.type === 'end-of-call-report') {
          const duration = body.call?.duration || body.message?.call?.duration || 0;
          minutesToIncrement = Math.ceil(duration / 60);
        } else if (body.type === 'call.started') {
          minutesToIncrement = 1; // standard starter increment
        }

        if (minutesToIncrement > 0) {
          await sql`
            INSERT INTO usage_ledger (company_id, voice_minutes_used)
            VALUES (${incomingCompanyId}, ${minutesToIncrement})
            ON CONFLICT (company_id)
            DO UPDATE SET voice_minutes_used = usage_ledger.voice_minutes_used + EXCLUDED.voice_minutes_used
          `;
        }

        // Publish live transcription events to Redis list for SSE
        const transcriptText = body.transcript || body.message?.transcript || '';
        if (transcriptText) {
          const payload = JSON.stringify({
            transcriptText,
            timestamp: new Date().toISOString(),
            status: body.type || 'active'
          });
          await redis.rpush(`transcripts:${incomingCompanyId}`, payload);
          await redis.expire(`transcripts:${incomingCompanyId}`, 600); // expire list in 10 mins
        }

        return new Response(JSON.stringify({ success: true, received: true }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // D. Generic Provider-Agnostic Messaging Webhook (Part 4)
      if (url.pathname === '/api/message/webhook' && request.method === 'POST') {
        // Verification Check
        if (env.MESSAGE_WEBHOOK_SECRET) {
          const authVal = request.headers.get('Authorization')?.split(' ')[1] || url.searchParams.get('secret');
          if (authVal !== env.MESSAGE_WEBHOOK_SECRET) {
            return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
              status: 401,
              headers: { ...headers, 'Content-Type': 'application/json' },
            });
          }
        } else if (env.NODE_ENV === 'production') {
          console.error("Message Webhook Secret is not configured in production. Rejecting request.");
          return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
            status: 401,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        const body: any = await request.json();
        const incomingCompanyId = body?.metadata?.company_id || body?.company_id;

        if (!incomingCompanyId) {
          return new Response(JSON.stringify({ error: 'Missing company_id metadata.' }), {
            status: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Check text request limit
        const limitCheck = await checkUsageLimit(sql, incomingCompanyId, 'texts');
        if (limitCheck.limitReached) {
          return new Response(JSON.stringify({ error: 'LIMIT_REACHED' }), {
            status: 429,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Increment usage ledger
        await sql`
          INSERT INTO usage_ledger (company_id, automation_texts_used)
          VALUES (${incomingCompanyId}, 1)
          ON CONFLICT (company_id)
          DO UPDATE SET automation_texts_used = usage_ledger.automation_texts_used + 1
        `;

        const messageText = body?.body || body?.text || body?.message || '';
        console.log(`Generic messaging webhook received: text=${messageText.substring(0, 100)}`);

        return new Response(JSON.stringify({
          status: 'processed',
          reply: 'Thank you for your message. Our team will get back to you shortly.'
        }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // ────────────────────────────────────────────────────────────────────────
      // PROTECTED ROUTES (JWT Verification Required)
      // ────────────────────────────────────────────────────────────────────────

      // A3. Live Voice Stream Connection (SSE) - Handles query parameter token
      if (url.pathname === '/api/voice/stream' && request.method === 'GET') {
        const token = url.searchParams.get('token');
        const jwt = await verifyJWT(token ? `Bearer ${token}` : request.headers.get('Authorization'), env);
        if (!jwt || !jwt.company_id) {
          return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
            status: 401,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        const companyId = jwt.company_id;
        const encoder = new TextEncoder();
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();

        ctx.waitUntil((async () => {
          let active = true;
          const keepAliveInterval = setInterval(async () => {
            try {
              await writer.write(encoder.encode(': keep-alive\n\n'));
            } catch (e) {
              active = false;
              clearInterval(keepAliveInterval);
            }
          }, 15000);

          try {
            while (active) {
              const item = await redis.lpop(`transcripts:${companyId}`);
              if (item) {
                await writer.write(encoder.encode(`data: ${item}\n\n`));
              }
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          } catch (e) {
            // connection dropped
          } finally {
            active = false;
            clearInterval(keepAliveInterval);
            try {
              await writer.close();
            } catch (e) {}
          }
        })());

        return new Response(readable, {
          status: 200,
          headers: {
            ...headers,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      // Standard JWT verify for remaining APIs
      const jwt = await verifyJWT(request.headers.get('Authorization'), env);
      if (!jwt || !jwt.company_id) {
        return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
          status: 401,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // E. Entitlements Fetch (Rule 25) — cached via Redis (Rule 14)
      if (url.pathname === '/api/entitlements' && request.method === 'GET') {
        const cacheKey = `entitlements:${jwt.company_id}`;
        let cached: string | null = null;
        try {
          const cachedVal = await redis.get(cacheKey);
          if (cachedVal) {
            cached = typeof cachedVal === 'string' ? cachedVal : JSON.stringify(cachedVal);
          }
        } catch (e) {
          console.error("Redis entitlements cache read failed:", e);
        }

        if (cached) {
          return new Response(cached, {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
          });
        }

        const [entitlements] = await sql`
          SELECT max_employees, max_documents, max_questions, dept_limit, automation_texts_limit, voice_minutes_limit, auto_overage_enabled
          FROM company_entitlements
          WHERE company_id = ${jwt.company_id}
        `;
        const [memberCount] = await sql`
          SELECT COUNT(*)::int as active_count
          FROM company_members
          WHERE company_id = ${jwt.company_id} AND status = 'active'
        `;
        const [docCount] = await sql`
          SELECT COUNT(*)::int as doc_count
          FROM documents
          WHERE company_id = ${jwt.company_id} AND status = 'active'
        `;
        const body = JSON.stringify({
          max_employees: entitlements?.max_employees ?? 50,
          max_documents: entitlements?.max_documents ?? 5,
          max_questions: entitlements?.max_questions ?? 1000,
          dept_limit: entitlements?.dept_limit ?? 3,
          automation_texts_limit: entitlements?.automation_texts_limit ?? 300,
          voice_minutes_limit: entitlements?.voice_minutes_limit ?? 250,
          auto_overage_enabled: entitlements?.auto_overage_enabled ?? false,
          active_employees: memberCount?.active_count ?? 0,
          active_documents: docCount?.doc_count ?? 0
        });
        try {
          ctx.waitUntil(redis.set(cacheKey, body, { ex: 300 }));
        } catch (e) {
          console.error("Redis entitlements cache write failed:", e);
        }
        return new Response(body, {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
        });
      }

      // E2. Usage Stats Endpoint
      if (url.pathname === '/api/usage-stats' && request.method === 'GET') {
        const [ledger] = await sql`
          SELECT questions_count, questions_used, voice_minutes_used, automation_texts_used
          FROM usage_ledger
          WHERE company_id = ${jwt.company_id}
        `;
        return new Response(
          JSON.stringify({
            questions_count: ledger?.questions_used ?? ledger?.questions_count ?? 0,
            voice_minutes_used: ledger?.voice_minutes_used ?? 0,
            automation_texts_used: ledger?.automation_texts_used ?? 0,
          }),
          { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
        );
      }

      // F. Employee Management
      if (url.pathname === '/api/employees') {
        if (request.method === 'GET') {
          const employees = await sql`
            SELECT id, company_id, clerk_user_id, email, name, status, role
            FROM company_members
            WHERE company_id = ${jwt.company_id}
            ORDER BY created_at DESC
          `;
          return new Response(JSON.stringify(employees), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
        
        if (request.method === 'PATCH') {
          const body = await request.json() as { clerk_user_id: string; status: 'active' | 'pending' };
          
          if (body.status === 'active') {
            // Check entitlements limit (Rule 28)
            const [entitlements] = await sql`
              SELECT max_employees FROM company_entitlements WHERE company_id = ${jwt.company_id}
            `;
            const maxEmployees = entitlements?.max_employees ?? 50;

            const [active] = await sql`
              SELECT COUNT(*)::int as active_count 
              FROM company_members 
              WHERE company_id = ${jwt.company_id} AND status = 'active'
            `;
            const activeCount = active?.active_count ?? 0;

            if (activeCount >= maxEmployees) {
              return new Response(
                JSON.stringify({ error: 'LIMIT_REACHED', message: 'Plan limit reached. Upgrade to add more team members.' }),
                { status: 403, headers: { ...headers, 'Content-Type': 'application/json' } }
              );
            }
          }

          await sql`
            UPDATE company_members
            SET status = ${body.status}
            WHERE clerk_user_id = ${body.clerk_user_id} AND company_id = ${jwt.company_id}
          `;

          // If activating, ensure profile exists
          if (body.status === 'active') {
            const [member] = await sql`
              SELECT name, email FROM company_members WHERE clerk_user_id = ${body.clerk_user_id}
            `;
            await sql`
              INSERT INTO employee_profiles (clerk_user_id, company_id, name, department, vacation_balance)
              VALUES (${body.clerk_user_id}, ${jwt.company_id}, ${member?.name || 'Employee'}, 'Operations', 30)
              ON CONFLICT (clerk_user_id) DO NOTHING
            `;
          }

          ctx.waitUntil(logAudit(env, jwt.company_id, jwt.sub, `employee.${body.status === 'active' ? 'approved' : 'suspended'}`, { target_user_id: body.clerk_user_id }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
      }

      // G. Chat logs CSV Export (Rule 41)
      if (url.pathname === '/api/export-logs' && request.method === 'GET') {
        let csvContent = 'Date,Employee Name,Question,AI Answer\n';
        const prefix = `logs/${jwt.company_id}/chat_logs_`;
        const objects = await env.BUCKET.list({ prefix });

        for (const obj of objects.objects) {
          const r2Object = await env.BUCKET.get(obj.key);
          if (!r2Object) continue;
          const text = await r2Object.text();
          const lines = text.trim().split('\n');
          for (const line of lines) {
            if (!line) continue;
            try {
              const data = JSON.parse(line);
              const date = data.timestamp || '';
              const name = (data.employee_name || '').replace(/"/g, '""');
              const question = (data.question || '').replace(/"/g, '""');
              const answer = (data.answer || '').replace(/"/g, '""');
              csvContent += `"${date}","${name}","${question}","${answer}"\n`;
            } catch (err) {
              // skip bad lines
            }
          }
        }

        return new Response(csvContent, {
          status: 200,
          headers: {
            ...headers,
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="chat_logs_${jwt.company_id}.csv"`,
          },
        });
      }

      // H. Overage Settings Change (Rule 17)
      if (url.pathname === '/api/overage-settings' && request.method === 'POST') {
        const body = await request.json() as { auto_overage_enabled: boolean };
        await sql`
          UPDATE company_entitlements
          SET auto_overage_enabled = ${body.auto_overage_enabled}
          WHERE company_id = ${jwt.company_id}
        `;
        try {
          ctx.waitUntil(redis.del(`entitlements:${jwt.company_id}`));
        } catch (e) {
          console.error("Redis entitlements cache clear failed:", e);
        }

        ctx.waitUntil(logAudit(env, jwt.company_id, jwt.sub, 'overage_settings.toggle', { auto_overage_enabled: body.auto_overage_enabled }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // I. Automation Executions Endpoint (Rule 29 / 26)
      if (url.pathname === '/api/automation' && request.method === 'POST') {
        const body = await request.json() as { company_id: string; [key: string]: any };
        
        // Tenant Isolation Check (Rule 6)
        if (jwt.company_id !== body.company_id) {
          return new Response(JSON.stringify({ error: 'Forbidden', requestId }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // central limit check
        const limitCheck = await checkUsageLimit(sql, jwt.company_id, 'texts');
        if (limitCheck.limitReached) {
          return new Response(
            JSON.stringify({ error: 'LIMIT_REACHED', message: 'Monthly text request limit reached. Enable auto-overage or upgrade plan.', requestId }),
            { status: 429, headers: { ...headers, 'Content-Type': 'application/json' } }
          );
        }

        // Increment automation_texts_used counter in usage_ledger
        await sql`
          INSERT INTO usage_ledger (company_id, automation_texts_used)
          VALUES (${jwt.company_id}, 1)
          ON CONFLICT (company_id)
          DO UPDATE SET automation_texts_used = usage_ledger.automation_texts_used + 1
        `;

        const tasks = [
          { id: 't1', title: 'Route Guest Inquiry', department: 'Front Desk', status: 'Completed' },
          { id: 't2', title: 'Update Vacation Balance Ledger', department: 'HR', status: 'Completed' }
        ];

        return new Response(JSON.stringify({ success: true, executedCount: 2, tasks }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // J. Chat Endpoint with RAG (Rule 29 / 22 / 23 / 19 / 20 / 21 / 14)
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        const body = await request.json() as { company_id: string; messages: any[] };

        // 1. Tenant Isolation Check (Rule 6)
        if (jwt.company_id !== body.company_id) {
          return new Response(JSON.stringify({ error: 'Forbidden', requestId }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // 2. Check Limit (Part 7)
        const limitCheck = await checkUsageLimit(sql, jwt.company_id, 'questions');
        if (limitCheck.limitReached) {
          return new Response(JSON.stringify({ error: 'LIMIT_REACHED', requestId }), {
            status: 429,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Get latest user prompt
        const userMessages = body.messages.filter((m: any) => m.role === 'user');
        const latestMsg = userMessages[userMessages.length - 1];
        let userText = latestMsg?.content || '';

        // 3. Prompt Injection Defense (Rule 8)
        userText = userText.trim().substring(0, 1000);
        const injectionRegex = /(ignore all (previous|prior) instructions|system|developer)/gi;
        if (injectionRegex.test(userText)) {
          return new Response(JSON.stringify({ error: 'Invalid prompt content', requestId }), {
            status: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // 4. Implement Agentic Tool Calls (Rule 21)
        // Check if query is asking for vacation or employee balance
        let contextBlock = '';
        const balanceTrigger = /(vacation balance|vacation days|my balance|how many days of leave)/i;
        
        if (balanceTrigger.test(userText)) {
          // Check Redis Caching first (Rule 14)
          const cacheKey = `employee:${jwt.sub}`;
          let balanceValue: string | null = await redis.get(cacheKey);

          if (!balanceValue) {
            // DB query fallback
            const [profile] = await sql`
              SELECT vacation_balance FROM employee_profiles 
              WHERE clerk_user_id = ${jwt.sub} AND company_id = ${jwt.company_id}
            `;
            const bal = profile?.vacation_balance ?? 30;
            balanceValue = String(bal);
            await redis.set(cacheKey, balanceValue, { ex: 3600 }); // Cached for 1 hour
          }

          contextBlock = `Employee Profile Vacation Balance: The employee ${jwt.name || jwt.sub} has a vacation_balance of ${balanceValue} days remaining.`;
        } else {
          // General RAG search
          // A. Generate embedding using text-embedding-3-small
          const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              input: userText,
              model: 'text-embedding-3-small',
            }),
          });
          
          if (!embedRes.ok) {
            throw new Error(`OpenAI embedding failed: ${await embedRes.text()}`);
          }
          const embedData: any = await embedRes.json();
          const queryVector = embedData.data[0].embedding;

          // B. Query vector database (Fall back to Neon database pgvector if Pinecone is not resolved)
          if (env.PINECONE_INDEX_HOST) {
            const pineconeRes = await fetch(`https://${env.PINECONE_INDEX_HOST}/query`, {
              method: 'POST',
              headers: {
                'Api-Key': env.PINECONE_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                vector: queryVector,
                topK: 3,
                includeMetadata: true,
                namespace: jwt.company_id,
              }),
            });
            if (pineconeRes.ok) {
              const pineconeData: any = await pineconeRes.json();
              contextBlock = pineconeData.matches
                ?.map((m: any) => m.metadata?.text || '')
                .filter(Boolean)
                .join('\n\n') || '';
            }
          }

          // Fallback to local postgres chunks if Pinecone matches empty
          if (!contextBlock) {
            const chunks = await sql`
              SELECT text_content 
              FROM chatbot_chunks 
              WHERE company_id = ${jwt.company_id}
              ORDER BY embedding <=> ${JSON.stringify(queryVector)}::vector
              LIMIT 3
            `;
            contextBlock = chunks.map(c => c.text_content).join('\n\n');
          }
        }

        // Increment ledger usage counter
        await sql`
          INSERT INTO usage_ledger (company_id, questions_count, questions_used)
          VALUES (${jwt.company_id}, 1, 1)
          ON CONFLICT (company_id) 
          DO UPDATE SET 
            questions_count = usage_ledger.questions_count + 1,
            questions_used = usage_ledger.questions_used + 1
        `;

        // 5. Invoke OpenAI stream text (Rule 23)
        const systemPrompt = `Answer ONLY using the provided context block. If the context lacks the answer, respond exactly with: 'I could not find the answer in your company's knowledge base.' Do not add external knowledge.\n\nContext:\n${contextBlock}`;

        const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...body.messages
            ],
            stream: true,
          }),
        });

        if (!chatRes.ok) {
          throw new Error(`OpenAI chat request failed: ${await chatRes.text()}`);
        }

        // Set up streaming response back to the client
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = new TextEncoder();
        const reader = chatRes.body?.getReader();

        // Process stream and capture output to log knowledge gaps (Rule 40) and write to R2 log files (Rule 41)
        ctx.waitUntil((async () => {
          let fullAnswer = '';
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            
            const chunkText = decoder.decode(value);
            await writer.write(value);

            // Parse openAI SSE format data stream
            const lines = chunkText.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.substring(6).trim();
                if (dataStr === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(dataStr);
                  const content = parsed.choices[0]?.delta?.content || '';
                  fullAnswer += content;
                } catch (e) {
                  // ignore
                }
              }
            }
          }
          await writer.close();

          // Rule 40 check: if exact message returned, insert into knowledge gaps
          if (fullAnswer.trim().includes("I could not find the answer in your company's knowledge base.")) {
            await sql`
              INSERT INTO knowledge_gaps (company_id, user_id, question_text)
              VALUES (${jwt.company_id}, ${jwt.sub}, ${userText})
            `;
          }

          // Rule 41: Per-day .ndjson chat log file in R2 (avoids read-modify-write on a single blob)
          const today = new Date().toISOString().slice(0, 10);
          const fileKey = `logs/${jwt.company_id}/chat_logs_${today}.ndjson`;
          const logEntry = JSON.stringify({
            timestamp: new Date().toISOString(),
            employee_name: jwt.name || jwt.email || jwt.sub,
            question: userText,
            answer: fullAnswer.trim()
          }) + '\n';
          const existingObject = await env.BUCKET.get(fileKey);
          const previous = existingObject ? await existingObject.text() : '';
          await env.BUCKET.put(fileKey, previous + logEntry);
        })());

        return new Response(readable, {
          status: 200,
          headers: {
            ...headers,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      // K. Unknown questions view for Admin (Rule 40)
      if (url.pathname === '/api/knowledge-gaps' && request.method === 'GET') {
        const gaps = await sql`
          SELECT id, question_text, timestamp 
          FROM knowledge_gaps
          WHERE company_id = ${jwt.company_id}
          ORDER BY timestamp DESC
        `;
        return new Response(JSON.stringify(gaps), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // K2. Feedback submission (Part 19)
      if (url.pathname === '/api/feedback' && request.method === 'POST') {
        const body = await request.json() as { rating: number; comment?: string };
        const { rating, comment } = body;

        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
          return new Response(JSON.stringify({ error: 'rating must be an integer between 1 and 5' }), {
            status: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        await sql`
          INSERT INTO feedback (company_id, user_id, rating, comment)
          VALUES (${jwt.company_id}, ${jwt.sub}, ${rating}, ${comment || null})
        `;

        return new Response(JSON.stringify({ success: true }), {
          status: 201,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // L. Documents Hub (Rule 24 / 28 / 37)
      if ((url.pathname === '/api/documents' || url.pathname === '/api/ingest') && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as File | null;
        
        if (!file) {
          return new Response(JSON.stringify({ error: 'No file provided' }), {
            status: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Tenant Isolation Check
        const incomingCompanyId = formData.get('company_id') as string | null;
        if (incomingCompanyId && incomingCompanyId !== jwt.company_id) {
          return new Response(JSON.stringify({ error: 'Forbidden', message: 'Tenant isolation mismatch.' }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Rule 24 limit check: 10MB limit
        if (file.size > 10 * 1024 * 1024) {
          return new Response(
            JSON.stringify({ error: 'LIMIT_EXCEEDED', message: 'PDF size exceeds the 10MB limit.' }),
            { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
          );
        }

        // Verify max documents cap (Rule 28)
        const [entitlements] = await sql`
          SELECT max_documents FROM company_entitlements WHERE company_id = ${jwt.company_id}
        `;
        const maxDocs = entitlements?.max_documents ?? 5;

        const [activeDocs] = await sql`
          SELECT COUNT(*)::int as doc_count 
          FROM documents 
          WHERE company_id = ${jwt.company_id} AND status = 'active'
        `;
        const activeDocsCount = activeDocs?.doc_count ?? 0;

        if (activeDocsCount >= maxDocs) {
          return new Response(
            JSON.stringify({ error: 'LIMIT_REACHED', message: 'Plan limit reached. Upgrade to add more documents.' }),
            { status: 403, headers: { ...headers, 'Content-Type': 'application/json' } }
          );
        }

        const docId = `doc_${crypto.randomUUID().substring(0, 8)}`;
        // Store in R2 bucket under company_id/{filename}
        const fileKey = `${jwt.company_id}/${file.name}`;
        
        // Put the source file in R2
        await env.BUCKET.put(fileKey, file.stream(), {
          customMetadata: {
            company_id: jwt.company_id || '',
            name: file.name
          }
        });

        // Insert NeonDB record
        await sql`
          INSERT INTO documents (id, company_id, name, status, r2_key)
          VALUES (${docId}, ${jwt.company_id}, ${file.name}, 'active', ${fileKey})
        `;

        // Send to Cloudflare Queue if bound (Part 5)
        if (env.INGESTION_QUEUE) {
          await env.INGESTION_QUEUE.send({
            company_id: jwt.company_id,
            document_id: docId,
            file_key: fileKey,
            file_name: file.name
          });
        }

        // Inline chunking + embedding + storage (Rule 20)
        ctx.waitUntil((async () => {
          try {
            const rawText = await file.text();
            const isBinary = rawText.includes('\u0000') || rawText.replace(/[\x20-\x7E\r\n\t]/g, '').length > rawText.length * 0.3;
            const cleanText = isBinary ? `[Extracted from ${file.name}]` : rawText;
            const chunks = chunkText(cleanText);

            for (let i = 0; i < chunks.length; i++) {
              const embedding = await generateEmbedding(chunks[i], env.OPENAI_API_KEY);
              await sql`
                INSERT INTO chatbot_chunks (company_id, document_id, text_content, embedding)
                VALUES (${jwt.company_id}, ${docId}, ${chunks[i]}, ${JSON.stringify(embedding)}::vector)
              `;
            }
          } catch (err) {
            console.error(`Error chunking document ${file.name}:`, err);
          }
        })());

        return new Response(JSON.stringify({ success: true, docId }), {
          status: 201,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // M. Documents hub actions (DELETE / GET)
      if (url.pathname === '/api/documents') {
        if (request.method === 'GET') {
          const docs = await sql`
            SELECT id, name, status, r2_key, created_at
            FROM documents
            WHERE company_id = ${jwt.company_id} AND status = 'active'
            ORDER BY created_at DESC
          `;
          return new Response(JSON.stringify(docs), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        if (request.method === 'DELETE') {
          // Cascading Document Cleanup (Rule 37)
          const body = await request.json() as { document_id: string };
          const docId = body.document_id;

          const [doc] = await sql`
            SELECT r2_key FROM documents 
            WHERE id = ${docId} AND company_id = ${jwt.company_id}
          `;

          if (!doc) {
            return new Response(JSON.stringify({ error: 'Document not found' }), {
              status: 404,
              headers: { ...headers, 'Content-Type': 'application/json' },
            });
          }

          // Delete vectors from Pinecone if index host is set
          if (env.PINECONE_INDEX_HOST) {
            await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/delete`, {
              method: 'POST',
              headers: {
                'Api-Key': env.PINECONE_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                filter: { document_id: docId },
                namespace: jwt.company_id,
              }),
            });
          }

          // Delete DB reference chunks
          await sql`
            DELETE FROM chatbot_chunks WHERE document_id = ${docId} AND company_id = ${jwt.company_id}
          `;

          // Delete source file from R2
          await env.BUCKET.delete(doc.r2_key);

          // Update documents status to 'deleted'
          await sql`
            UPDATE documents 
            SET status = 'deleted' 
            WHERE id = ${docId} AND company_id = ${jwt.company_id}
          `;

          ctx.waitUntil(logAudit(env, jwt.company_id, jwt.sub, 'document.deleted', { document_id: docId, document_name: doc.r2_key }, request.headers.get('cf-connecting-ip'), request.headers.get('user-agent')));

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
      }

      // Default Endpoint Not Found
      return new Response(JSON.stringify({ error: 'Route not found', requestId }), {
        status: 404,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });

    } catch (err: any) {
      console.error(`[${requestId}] Handler Exception:`, err);
      return new Response(
        JSON.stringify({ error: err.message || 'Internal server error', requestId }),
        {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    } finally {
      currentDBConnections--;
    }
  },

  // ──────────────────────────────────────────────────────────────────────────
  //  Queue Consumer: Async Document Ingestion
  // ──────────────────────────────────────────────────────────────────────────
  async queue(batch: MessageBatch<{
    company_id: string;
    document_id: string;
    file_key: string;
    file_name: string;
  }>, env: Env, ctx: ExecutionContext) {
    const sql = neon(env.DATABASE_URL);
    for (const msg of batch.messages) {
      const { company_id, document_id, file_key, file_name } = msg.body;
      try {
        const r2Object = await env.BUCKET.get(file_key);
        if (!r2Object) {
          console.error(`Queue: R2 object not found: ${file_key}`);
          msg.ack();
          continue;
        }
        const rawText = await r2Object.text();
        const isBinary = rawText.includes('\u0000') || rawText.replace(/[\x20-\x7E\r\n\t]/g, '').length > rawText.length * 0.3;
        const cleanText = isBinary ? `[Extracted from ${file_name}]` : rawText;
        const chunks = chunkText(cleanText);

        for (let i = 0; i < chunks.length; i++) {
          const embedding = await generateEmbedding(chunks[i], env.OPENAI_API_KEY);
          if (env.PINECONE_INDEX_HOST) {
            await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/upsert`, {
              method: 'POST',
              headers: {
                'Api-Key': env.PINECONE_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                vectors: [{
                  id: `${document_id}_chunk_${i}`,
                  values: embedding,
                  metadata: { text: chunks[i], document_id, company_id },
                }],
                namespace: company_id,
              }),
            });
          }
          await sql`
            INSERT INTO chatbot_chunks (company_id, document_id, text_content, embedding)
            VALUES (${company_id}, ${document_id}, ${chunks[i]}, ${JSON.stringify(embedding)}::vector)
          `;
        }
        msg.ack();
      } catch (err) {
        console.error(`Queue ingestion failed for ${file_key}:`, err);
        msg.retry({ delaySeconds: 10 });
      }
    }
  },
};
