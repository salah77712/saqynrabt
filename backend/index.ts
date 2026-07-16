import { neon } from '@neondatabase/serverless';
import { createRouter } from './src/routes';
import { checkRateLimit, checkEdgeRateLimit, corsHeaders, initRedis } from './src/utils';
import { handlePurgeCron } from './src/cron/purge-data';
import { handleIngestionBatch } from './src/queue/ingestion';
import { captureException } from './src/monitoring/sentry';
export type { Env } from './src/utils';

// NOTE: Prisma is not used in the Worker because Cloudflare Workers do not
// support the Prisma engine binary. All DB access uses Neon serverless `sql`
// in backend/src/**/*.ts. The /prisma schema is the source of truth for the
// Next.js frontend and is run during Vercel's build, not in the Worker.

const EDGE_RATE_LIMIT_PER_TENANT = 10;
const EDGE_RATE_LIMIT_WINDOW_SECONDS = 30;

export default {
  async queue(batch: any, env: any, _ctx: ExecutionContext): Promise<void> {
    // Route queue consumers to the right pipeline. Today only the RAG
    // ingestion queue exists (see wrangler.toml).
    if (batch.queue === 'saqyn-doc-ingestion') {
      await handleIngestionBatch(batch, env);
      return;
    }
    // Unknown queue: ack to avoid hot-looping a queue we don't own.
    for (const msg of batch.messages) msg.ack();
  },

  async fetch(request: Request, env: any, ctx: ExecutionContext): Promise<Response> {
    const requestId = crypto.randomUUID();
    const headers = corsHeaders(request, env);
    headers['X-Request-ID'] = requestId;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    if (
      !env.OPENAI_API_KEY ||
      !env.DATABASE_URL ||
      !env.PINECONE_API_KEY ||
      !env.CLERK_SECRET_KEY ||
      !env.REDIS_URL
    ) {
      console.error(`[${requestId}] Missing required env vars`);
      return new Response(JSON.stringify({ error: 'System configuration error.', requestId }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(request.url);

    // ── Edge rate limiter (atomic Redis) ────────────────────────────────────
    // Public/infra routes skip the limiter so health checks from Cloudflare
    // don't trigger 429s on themselves.
    const isPublicInfra =
      url.pathname === '/api/wakeup' ||
      url.pathname === '/api/health' ||
      url.pathname.endsWith('/api/wakeup') ||
      url.pathname.endsWith('/api/health');

    if (!isPublicInfra) {
      const redisForLimit = initRedis(env);
      const tenantId =
        request.headers.get('X-Tenant-Id') ||
        'global';
      const limit = await checkEdgeRateLimit(
        redisForLimit,
        tenantId,
        EDGE_RATE_LIMIT_PER_TENANT,
        EDGE_RATE_LIMIT_WINDOW_SECONDS
      );
      if (!limit.allowed) {
        return new Response(
          JSON.stringify({
            error: 'Too Many Requests',
            requestId,
            retryAfter: limit.retryAfter,
          }),
          {
            status: 429,
            headers: {
              ...headers,
              'Content-Type': 'application/json',
              'Retry-After': String(limit.retryAfter),
            },
          }
        );
      }
    }

    try {
      const sql = neon(env.DATABASE_URL);
      const redis = initRedis(env);

      (request as any).env = env;
      (request as any).ctx = ctx;
      (request as any).sql = sql;
      (request as any).redis = redis;
      (request as any).requestId = requestId;

      const router = createRouter(env);
      const response = await router.fetch(request);
      if (!response) {
        return new Response(JSON.stringify({ error: 'Not found', path: url.pathname }), {
          status: 404,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }
      return response;
} catch (err: any) {
  captureException(err, request, env);
  console.error(`[${requestId}] Unhandled error:`, err);
  return new Response(JSON.stringify({ error: 'Internal server error', requestId }), {
        status: 500,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });
    }
  },

  async scheduled(event: any, env: any, ctx: ExecutionContext): Promise<void> {
    // wrangler.toml declares a single cron at "0 3 * * *". Hand it off to the
    // existing purge-data module so we don't lose the daily data-purge job.
    if (typeof handlePurgeCron === 'function') {
      await handlePurgeCron(event, env, ctx);
    }
  },
};
