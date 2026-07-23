# SAQYN Rabt — Live Verification

## Classification Labels

- LIVE VERIFIED
- CODE EXISTS — NOT LIVE VERIFIED
- PARTIAL
- MOCK/FAKE
- DISABLED HONESTLY
- MISSING
- BROKEN
- ACCESS MISSING
- NOT VERIFIED

## Available Live Systems

- Neon/Postgres (read-only MCP queries)
- Cloudflare Workers (deploy + API calls)
- Cloudflare R2 (via Worker)
- Cloudflare Queues (via Worker)
- Pinecone (vector search MCP)
- Redis/Upstash (live key-value check MCP)
- Clerk (API direct calls)
- GitHub
- live HTTP/API (curl/Invoke-RestMethod)

## RAG Verification Chain

Must verify: upload → R2 object → queue message → queue consumer → parsing/chunking → embeddings → Pinecone upsert → namespace isolation → chat retrieval → answer from context.

## Voice Verification Chain

Must verify: external/simulated call → transcript → intent → workflow/task → assignment → dashboard → audit.

## Migration Verification

Local migration is not proof. Live Neon/Postgres schema query must confirm.

## Current Auth Status (2026-07-22)

- CLERK_SECRET_KEY set via wrangler secret put ✅
- JWT verification works (onboarding returned 200 on fresh token) ✅
- Expired tokens correctly rejected ✅
- company_id resolution from employees table by clerk_user_id ✅
- Role resolution from employees table by clerk_user_id ✅ (fixed 2026-07-23, code deployed but not live-tested)
