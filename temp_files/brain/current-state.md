# SAQYN Rabt — Current State

## Verified Live

- Health endpoint: LIVE VERIFIED — both /api/health and /api/wakeup return 200
- Database schema: LIVE VERIFIED — 15 tables, schema v6, plan_key column present
- Company data: LIVE VERIFIED — company_entitlements row exists, plan_key='platform', 1 employee (admin)
- CLERK_SECRET_KEY: CODE EXISTS — set via `wrangler secret put`, confirmed by `✨ Success!`
- JWT verification: PARTIAL — worked once with a fresh token (onboarding returned 200), expired tokens correctly rejected
- Onboarding: CODE EXISTS — returns onboarded status, re-onboarding returns {already_existed:true}
- Migration v6: LIVE VERIFIED — plan_key column exists in company_entitlements

## Code Exists — Not Live Verified

- requirePlanFeature() middleware — code deployed, not live-tested with non-platform plan
- requireCompany() middleware — code deployed, confirmed by onboarding returning 200
- Role DB lookup in verifyJWT — code deployed, not live-tested with admin role
- Module map (frontend/lib/module-map.ts) — code exists, not live-tested
- LockedPage component — code exists, not live-tested
- Profile page — code exists, not live-tested
- DashboardSidebar navModules prop — code exists, not live-tested
- MobileBottomNav navModules prop — code exists, not live-tested
- purge handler — code exists, failed on incorrect table names, not live-tested

## Missing / Not Verified

- Knowledge scope separation in documents (no scope column, single namespace)
- Admin permission management UI
- RAG verification chain (upload → queue → ingestion → Pinecone → chat)
- Voice automation pipeline
- Non-platform plan enforcement test
- Employee role restrictions test
- Direct URL protection test (frontend + backend)
- SAP/Oracle/ERP connectors
- Stripe integration (out of scope)
- Clerk user management via MCP (not available)
- Invite → signup → dashboard end-to-end flow (needs fresh valid Clerk JWT)

## Blockers

1. **No valid Clerk JWT available for testing** — user's test session `sess_3Grt05e1QgC244g0QL3PbWHZJ7Q` tokens are expired. Need fresh active session.
2. **Purge handler needs table name fix** — references `approvals` table which does not exist in production.

## Blocker 2: RESOLVED

2. ~~**Purge handler needs table name fix** — references `approvals` table which does not exist in production.~~ ✅ **FIXED** — removed non-existent `approvals` table reference. Also added `requireRole('admin')` middleware to route.

## Files Changed (not committed)

Modified: backend/src/handlers/webhooks.ts, handlers/onboarding.ts, handlers/approvals.ts, **backend/src/routes.ts**, **backend/src/handlers/purge.ts**
Created: INVITE_SIGNUP_INHERITANCE_FIX_REPORT.md, ADMIN_PURGE_SECURITY_VERIFICATION.md, FULL_WEBSITE_CURRENT_CONTEXT_AND_VERIFICATION_AUDIT.md
