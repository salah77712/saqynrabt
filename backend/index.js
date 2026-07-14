import { neon } from '@neondatabase/serverless';
import { createRouter } from './src/routes';
import { initRedis, corsHeaders } from './src/utils';
let currentDBConnections = 0;
export default {
    async queue(batch, env, ctx) {
        for (const msg of batch.messages) {
            console.log(`Queue msg ${msg.id}: processing`);
            msg.ack();
        }
    },
    async fetch(request, env, ctx) {
        const requestId = crypto.randomUUID();
        const headers = corsHeaders(request, env);
        headers['X-Request-ID'] = requestId;
        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }
        if (!env.OPENAI_API_KEY || !env.DATABASE_URL || !env.PINECONE_API_KEY || !env.CLERK_SECRET_KEY) {
            console.error(`[${requestId}] Missing required env vars`);
            return new Response(JSON.stringify({ error: 'System configuration error.', requestId }), {
                status: 500, headers: { ...headers, 'Content-Type': 'application/json' },
            });
        }
        if (currentDBConnections >= 15) {
            return new Response(JSON.stringify({ error: 'Busy', requestId }), {
                status: 503, headers: { ...headers, 'Content-Type': 'application/json', 'Retry-After': '2' },
            });
        }
        currentDBConnections++;
        try {
            const url = new URL(request.url);
            const sql = neon(env.DATABASE_URL);
            const redis = initRedis(env);
            request.env = env;
            request.ctx = ctx;
            request.sql = sql;
            request.redis = redis;
            request.requestId = requestId;
            const router = createRouter(env);
            const response = await router.fetch(request);
            if (!response) {
                return new Response(JSON.stringify({ error: 'Not found', path: url.pathname }), {
                    status: 404,
                    headers: { ...headers, 'Content-Type': 'application/json' },
                });
            }
            return response;
        }
        catch (err) {
            console.error(`[${requestId}] Unhandled error:`, err);
            return new Response(JSON.stringify({ error: 'Internal server error', requestId }), {
                status: 500, headers: { ...headers, 'Content-Type': 'application/json' },
            });
        }
        finally {
            currentDBConnections--;
        }
    },
};
