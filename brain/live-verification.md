# SAQYN Rabt — Live Verification

**Last updated:** 2026-07-23
**Verification method notes:** This file uses precise method labels:
- **live verified via CLI/API** = direct HTTP call (curl), wrangler CLI, or raw API call
- **live verified via direct SQL** = SQL query against live Neon Postgres
- **code exists** = file/code inspected on disk, not live-tested
- **not verified** = attempted but authentication or permissions blocked it

## Classification Labels

- LIVE VERIFIED
- CODE EXISTS — NOT LIVE VERIFIED
- PARTIAL (some aspects verified, others not)
- MOCK/FAKE
- DISABLED HONESTLY
- MISSING
- BROKEN
- ACCESS MISSING
- NOT VERIFIED

## Available Live Verification Methods

| System | Method Available | Can Use? |
|--------|-----------------|----------|
| Neon/Postgres | Direct SQL query via `@neondatabase/serverless` | ✅ Yes — used 2026-07-23 |
| Cloudflare Worker | wrangler CLI + live HTTP | ✅ Yes — used 2026-07-23 |
| Cloudflare Queue | wrangler CLI (`wrangler queues list`) | ✅ Yes — used 2026-07-23 |
| Cloudflare R2 | wrangler CLI (`wrangler r2 bucket list`) | ❌ Token lacks R2 Read scope |
| Pinecone | Direct HTTP API to Pinecone REST | ✅ Yes — used 2026-07-23 |
| Redis/Upstash | `@upstash/redis` Node.js client | ✅ Yes — used 2026-07-23 |
| Clerk | Direct HTTP API to clerk.com | ✅ Yes — used 2026-07-23 |
| Live HTTP | curl to api.saqynrabt.com | ✅ Yes — used 2026-07-23 |

## What Was Live Verified (2026-07-23)

### Via direct HTTP (curl to api.saqynrabt.com)
- `GET /api/health` → 200 `{status:"healthy", checks:{database:"online", cache:"online"}}` ✅ LIVE VERIFIED
- `GET /api/wakeup` → 200 `{status:"warmed", schema:6}` ✅ LIVE VERIFIED
- `GET /api/public/check-invite?email=test@example.com` → 200 `{invited:false}` ✅ LIVE VERIFIED
- `GET /api/documents` → 401 `{error:"Unauthorized"}` ✅ Auth gate confirmed
- `GET /api/employees` → 401 `{error:"Unauthorized"}` ✅ Auth gate confirmed

### Via direct SQL (Neon Postgres)
- 15 tables exist, schema versions v1/v2/v4/v5/v6 applied ✅ LIVE VERIFIED
- `plan_key` column exists in `company_entitlements` ✅ LIVE VERIFIED
- Company exists: id=`a220326e-...`, plan_key='platform', trialed limits ✅ LIVE VERIFIED
- 1 admin employee, 0 documents, 0 chat history ✅ LIVE VERIFIED

### Via direct API (Pinecone REST)
- Index `saqyn-rag` exists, Ready, 1536d, cosine, serverless us-east-1 ✅ LIVE VERIFIED
- 0 vectors, 0 namespaces ✅ LIVE VERIFIED

### Via direct API (Upstash Redis)
- PING → PONG ✅ LIVE VERIFIED
- 0 keys stored ✅ LIVE VERIFIED

### Via direct API (Clerk)
- 3 users found, 1 with `public_metadata: {company_id, role: 'admin'}` ✅ LIVE VERIFIED
- CLERK_SECRET_KEY authenticates successfully ✅ LIVE VERIFIED

### Via wrangler CLI
- Queue `saqyn-doc-ingestion` exists with 1P+1C ✅ LIVE VERIFIED
- 13 Worker secrets deployed ✅ LIVE VERIFIED
- Worker previously deployed, 8183 KiB bundle ✅ LIVE VERIFIED
- R2 bucket list ❌ FAILED — token lacks Read scope

## What Is NOT Live Verified (Code Exists Only)

### RAG Verification Chain
Must verify end-to-end: upload → R2 object → queue message → queue consumer → parsing/chunking → embeddings → Pinecone upsert → namespace isolation → chat retrieval → answer from context.

**Status: CODE EXISTS — NOT LIVE VERIFIED.** No single step in the chain has been tested with real data. Pinecone has 0 vectors because no document has ever been uploaded in production.

### Plan Enforcement
- `requirePlanFeature()` middleware: code exists, deployed. Only tested with `platform` plan.
- `requirePlanFeature()` with `chatbot` or `voice` plans: **NOT TESTED.**
- Frontend `module-map.ts`: code exists, not live-tested.

**Status: CODE EXISTS — NOT LIVE VERIFIED (for non-platform plans).**

### Role-Based Access
- `requireRole('admin')`: code exists, deployed. Admin-only endpoints return 401 without auth.
- `requireRole('manager')`, `requireRole('employee')`, `requireRole('viewer')`: **NOT TESTED.**
- Role DB lookup in `verifyJWT`: code exists, deployed, NOT live-tested with a non-admin JWT.

**Status: CODE EXISTS — NOT LIVE VERIFIED (for non-admin roles).**

### Dashboard Pages (Authenticated)
- 401 gate confirmed on unprotected calls. This proves auth middleware is deployed.
- DOES NOT prove pages render correctly with real authenticated data.
- No valid Clerk JWT available for authenticated testing.

**Status: 401 gate confirmed — AUTHENTICATED BEHAVIOR NOT VERIFIED.**

### Admin Dashboard Pages
- Admin companies page: 100% hardcoded mock data — no API call exists.
- Admin incidents page: 2 hardcoded seed incidents — resolve is local-only, no PATCH to backend.
- Admin metrics page: client-side random number generation — no backend connection.
- Admin usage page: hardcoded values + SVG chart — no backend connection.

**Status: 100% MOCK/FAKE — NOT CONNECTED TO ANY BACKEND.**

## What Is BLOCKED

| Verification | Blocker | 
|-------------|---------|
| Authenticated dashboard rendering | No fresh valid Clerk JWT |
| Invite → signup → dashboard flow | No fresh valid Clerk JWT |
| RAG end-to-end test | No valid JWT + no document to upload |
| Plan enforcement with chatbot/voice | Need non-platform plans in DB |
| Multi-role test | Need manager/employee/viewer Clerk users |
| R2 bucket object listing | Cloudflare API token lacks R2 Read scope |
| Admin incidents endpoint | `security_incidents` + `incident_timeline` tables missing |

## Current Auth Status (2026-07-23)

- CLERK_SECRET_KEY set on Worker (verified via wrangler CLI) ✅
- JWT verification code exists and deployed ✅
- Valid JWT test: **NOT performed** (no fresh token available) ❌
- Expired token rejection: previously confirmed (2026-07-22) ✅
- company_id DB resolution: code exists, deployed ✅
- Role DB resolution: code exists, deployed, NOT live-tested with non-admin role ❌
