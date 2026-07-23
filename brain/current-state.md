# SAQYN Rabt — Current State

**Last updated:** 2026-07-23 (home page honest redesign)
**Brain location:** `brain/` (repo root) — moved from `temp_files/brain/` 2026-07-23

## Live Verified (via CLI/API — direct HTTP, wrangler, or raw API calls)

- Health endpoint: `GET /api/health` returns 200 with `{status:"healthy", database:"online", cache:"online"}` ✅
- Wakeup endpoint: `GET /api/wakeup` returns 200 with `{schema:6}` ✅
- Public check-invite: `GET /api/public/check-invite?email=test@example.com` returns `{invited:false}` ✅
- Auth gate on protected endpoints: `GET /api/documents` and `GET /api/employees` both return 401 `{"error":"Unauthorized"}` — proves auth middleware is deployed and enforcing ❓ (see note below)
- Database schema (live SQL query): 15 tables exist, schema versions v1/v2/v4/v5/v6 applied, `company_entitlements.plan_key` column exists ✅
- Company data (live SQL query): Company exists (id=`a220326e-...`), 1 admin employee, plan_key='platform', trialed limits (max_questions=15, max_documents=1, voice_minutes=5) ✅
- Redis reachable (direct API): PONG confirmed, 0 keys stored ✅
- Pinecone index exists (direct HTTP API): `saqyn-rag` index, Ready, 1536d, cosine, 0 vectors, 0 namespaces ✅
- Cloudflare Queue exists (wrangler CLI): `saqyn-doc-ingestion` with 1 producer + 1 consumer ✅
- Worker deployed (wrangler CLI): Previously deployed, 8183 KiB bundle, R2 + Queue bindings configured ✅
- 13 Worker secrets deployed (wrangler CLI): All accounted for ✅
- Clerk users accessible (direct API call with CLERK_SECRET_KEY): 3 users found, 1 with `public_metadata: {company_id, role: 'admin'}` ✅

> **Note on 401 tests.** A 401 response proves the auth middleware is deployed and rejecting unauthenticated requests. It does NOT prove that authenticated requests succeed or return correct data. That requires a valid, non-expired Clerk session JWT.

## Code Exists / Partial — Not Fully Live Verified

- **RAG ingestion pipeline** — CODE EXISTS, NOT LIVE VERIFIED. Pinecone has 0 vectors. No end-to-end test has passed (upload→R2→queue→parse→chunk→embed→upsert→query).
- **requirePlanFeature() middleware** — CODE EXISTS, NOT FULLY LIVE VERIFIED. Tested only with platform plan. Non-platform plans (chatbot, voice) have NOT been tested.
- **requireRole() middleware** — CODE EXISTS, NOT FULLY LIVE VERIFIED. Tested only with admin role (via purge endpoint 403). Manager/employee/viewer roles have NOT been tested.
- **requireCompany() middleware** — CODE EXISTS. Confirmed via onboarding returning 200 with valid JWT.
- **Role DB lookup in verifyJWT** — CODE EXISTS. Not live-tested with a non-admin role.
- **Module map / LockedPage / DashboardSidebar / MobileBottomNav** — CODE EXISTS. Not live-tested.
- **Frontend dashboard pages** — CODE EXISTS. 401-only confirmed on unprotected calls. No valid JWT test to confirm real data rendering.
- **Invite → signup → dashboard flow** — CODE EXISTS (webhooks + onboarding). Not live-verified end-to-end.
- **Purge handler fix** — CODE EXISTS. `requireRole('admin')` added. `approvals` table reference removed. NOT DEPLOYED.
- **Voice handler (VAPI TTS)** — CODE EXISTS. Not live-tested.
- **Agent executor** — CODE EXISTS. Hardcoded mock data, not production-ready.
- **Agent tools** — CODE EXISTS. Mock data (vacation balance, booking, email).
- **Admin incidents handler** — CODE EXISTS. References `security_incidents` + `incident_timeline` tables which DO NOT EXIST in DB → will return 500.

## Website Design Audit (2026-07-23)

A comprehensive design audit of all 75+ pages on `saqynrabt.com` was completed via 10 parallel agents.

**Overall score: 5.6/10**

### Section scores
| Section | Score | Verdict |
|---------|-------|---------|
| Auth pages (4) | **8.5** | Strongest. Custom Clerk, accessible, bilingual. |
| Legal/Help/Dev (10) | **6.5** | Good legal writing. Missing pages, SEO issues. |
| Dashboard pages (23) | **5.6** | Solid design, pervasive mock data rot. |
| Marketing pages (17) | **5.4** | Competent template. Zero identity. Heavy overclaims. |
| Admin pages (13) | **4.0** | 11/13 pages 100% fabricated data. |

### Critical findings
1. **Pricing mismatch (LIVE vs repo)** — Live page still shows old hardcoded prices (2,999/4,999 QAR) despite code fix. Deployment mismatch.
2. **JSON-LD schema wrong** — QAR 1,499 labeled as USD on all pages.
3. **All 15 case studies fabricated** — No real customers exist. Metrics invented.
4. **Stripe mentioned as active** in privacy/cookie policies — Stripe IS disabled per project rules.
5. **19 global offices claimed** — Fabricated presence.
6. **ISO 27001/SOC 2 claimed without evidence** — No certificates or dates.
7. **Security + vulnerability pages 404** — Trust Center links to nowhere.
8. **RAG marketed as live** (Pinecone has 0 vectors) + **Voice marketed as operational** (partial only).
9. **11/13 admin pages are mock data facades** — including feature flags with zero persistence, `Math.random()` metrics.
10. **HITL complete facade** + **Approvals silent mock fallback** + **Guardrails Save does nothing** + **Export fabricates CSV**.

### Strengths
Auth pages (custom-built, accessible, Arabic RTL), Geist typography, dark mode implementation, multi-language support, accessibility fundamentals.

See `WEBSITE_DESIGN_AUDIT_REPORT.md` for full detail.

## Recently Fixed

- **Home page honest redesign** — 2026-07-23: Rewrote `page.client.tsx` to remove overclaims (SAP/Oracle logos, mock SVGs, generic headline, scroll arrow) and replace with honest product loop messaging, pilot badge, abstract flow diagram, asymmetric How It Works + Two Products sections, and demo-only CTAs. Typecheck passed.
- **Pricing page code fixed** — `page.client.tsx` uses `pricing-config.ts` as source of truth. No hardcoded prices. Verified 2026-07-23. **Live deployment still shows old prices — needs deploy.**
- **Frontend bug fixes (14 files)** — `window.Clerk` → `useAuth().getToken()` in 7 files, mock data fallbacks removed in 4 files, empty catch blocks fixed in 3 files, API keys DELETE URL mismatch fixed, reports page local→global toast, admin integrations hardcoded demo token removed

## Missing / Not Verified

- Knowledge scope separation in documents (no scope column, single Pinecone namespace)
- Admin permission management UI
- Non-platform plan enforcement test (chatbot plan + voice plan)
- Multi-role access test (manager, employee, viewer JWTs)
- Direct URL protection test (frontend + backend with different JWTs)
- Security incidents tables: `security_incidents` and `incident_timeline` DO NOT EXIST
- `/api/admin/companies` endpoint — DOES NOT EXIST in route table
- Admin companies page (100% hardcoded mock data — no API calls)
- Admin incidents page (hardcoded seed data — resolve is local-only)
- Admin metrics page (simulated random data — not from backend)
- Admin usage page (hardcoded values — not from backend)
- HITL dashboard page (100% fake/hardcoded tasks)
- Workflows dashboard page (100% fake/hardcoded nodes)
- Approvals page (silent mock fallback on API error — hides failures)
- Guardrails settings (toggles are local-only, Save does nothing)
- Settings export logs (generates fake CSV on API error)
- Document delete URL mismatch (frontend sends `?id=`, backend expects `/documents/:id` path param)
- SAP/Oracle/ERP connectors
- Stripe integration (stubs return null — billing disabled during pilot)
- Clerk user management via MCP (not available)
- R2 bucket object listing (token lacks R2 Read scope)

## Blockers

1. **No valid Clerk JWT available for authenticated testing** — existing test sessions expired. Need a fresh active session token to test any authenticated flow end-to-end.
2. **R2 bucket list scope missing** — Cloudflare API token needs `R2 Read` scope added to list bucket objects.
3. **Missing DB tables** — `security_incidents` and `incident_timeline` must be created for admin incidents to work.
4. **Missing backend endpoint** — `/api/admin/companies` route does not exist in `routes.ts`.
