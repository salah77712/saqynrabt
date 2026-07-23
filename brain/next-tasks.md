# SAQYN Rabt — Next Tasks

**Last updated:** 2026-07-23 (home page redesign complete)

## Legend
- `[x]` = DONE / CODE EXISTS
- `[ ]` = PENDING
- `(blocked: ...)` = blocked by external dependency

---

## Priority 0 — Audit Correction (DONE)

- [x] Fix overclaims in deep report: RAG not "verified", plan/role not "fully verified"
- [x] Correct brain files with precise status labels
- [x] Separate "live verified via CLI/API" from "code exists — not live verified"
- [x] Relocate brain from `temp_files/brain/` to root `brain/`
- [x] Delete old `temp_files/brain/` copy
- [x] Update `.gitignore` to not ignore `brain/`

---

## Priority 0 — Website Design Audit (DONE)

- [x] Ran 10 parallel agents auditing all 75+ live pages of saqynrabt.com
- [x] Scored each page on atmosphere, color, typography, layout, components, anti-patterns, content honesty
- [x] Compiled into WEBSITE_DESIGN_AUDIT_REPORT.md
- [x] Updated brain files

## Priority 0 — Website Content Honesty Fixes (NEXT — from audit findings)

### P0 — Legal/Compliance (must fix)
- [ ] Remove/re-label 15 fabricated case studies or mark as "example scenarios"
- [ ] Fix Stripe references in privacy policy and cookie policy to match disabled state
- [ ] Remove global offices page or reduce to honest presence
- [ ] Remove ISO 27001/SOC 2 claims or add verifiable evidence
- [ ] Create `/security` and `/vulnerability-disclosure` pages

### P0 — Deployment Sync
- [ ] Deploy pricing fix to live (code uses config, live still shows old prices)
- [ ] Fix JSON-LD schema currency (QAR labeled as USD)
- [ ] Deploy and verify fix on live

### P1 — Marketing Overclaim Fixes
- [ ] Soften RAG claims on /features, /chatbot (Pinecone has 0 vectors)
- [ ] Soften voice claims on /features, /automation (partial only)
- [ ] Fix /api/contact route (form silently fails)
- [ ] Replace Gmail contact with branded email
- [ ] Fix /book-demo "115-minute" typo
- [ ] Fix /industries typos
- [ ] Fix /faq "month-" typo
- [ ] Add missing page titles to 7 pages

### P1 — Dashboard Mock Data Kill
- [ ] Remove MOCK_MESSAGES fallback from /dashboard/inbox
- [ ] Remove hardcoded nodes from /dashboard/workflows (show honest empty state)
- [ ] Remove mockNew from /dashboard/automation/workflows
- [ ] Remove MOCK_STATS fallback from /dashboard/analytics
- [ ] Remove MOCK_KNOWLEDGE_GAPS from /dashboard/guardrails
- [ ] Remove mock employee fallback from /dashboard/approvals
- [ ] Replace /dashboard/hitl with honest "Coming soon" state (100% facade)
- [ ] Remove fake CSV generation from settings export logs
- [ ] Fix guardrails Save to either call API or remove button

### P2 — Admin Pages (all mock, need full rebuild)
- [ ] Admin companies page — connect to real API or add honest empty state
- [ ] Admin incidents page — connect to real API or add honest state
- [ ] Admin metrics page — connect to real backend
- [ ] Admin usage page — connect to real backend
- [ ] Admin audit page — connect to real backend
- [ ] Admin billing page — connect to real backend or disable honestly
- [ ] Admin feature-flags — implement persistence or remove
- [ ] Admin client-success — connect to real backend or remove

### P3 — Design Improvements
- [ ] Create team/about page with actual founders
- [ ] Add screenshots to help pages
- [ ] Fix legal page dark mode (prose classes missing dark: variants)
- [ ] Add "Still have questions?" CTA to FAQ bottom
- [ ] Add next-step guidance to thank-you page

---

## Priority 1 — Missing DB Tables

- [ ] Create `security_incidents` table in Neon (live migration or manual SQL)
- [ ] Create `incident_timeline` table in Neon
- [ ] Verify tables exist via SQL query

---

## Priority 2 — Missing Backend Endpoint

- [ ] Create `/api/admin/companies` route + handler in `backend/src/routes.ts`
- [ ] Connect admin companies frontend to real API (remove mock data)

---

## Priority 3 — Admin Dashboard Fixes

- [ ] Admin incidents page: replace hardcoded data with real API calls + PATCH for resolve
- [ ] Admin metrics page: connect to real backend metrics
- [ ] Admin usage page: connect to real usage-stats API
- [ ] HITL page: either connect to real API or add "Coming soon" honest state
- [ ] Workflows page: either connect to real API or add "Coming soon" honest state
- [ ] Approvals page: remove silent mock fallback, show honest empty/error state

---

## Priority 4 — Frontend Bugs

- [ ] Document delete URL mismatch: fix frontend to use path param `/documents/:id` not `?id=`
- [ ] Guardrails: implement save-to-API or remove Save button
- [ ] Settings export logs: remove fake CSV fallback, show honest error

---

## Priority 5 — Auth Live Verification (blocked: no fresh Clerk JWT)

- [ ] Get fresh valid Clerk JWT (current active session)
- [ ] Verify `/api/onboarding` returns 200 with company data
- [ ] Verify `/api/employees` returns 200 (admin role) or 403 (non-admin)
- [ ] Verify `/api/chat` returns proper response (not 500)
- [ ] Verify `/api/documents` returns document list (or empty [])

---

## Priority 6 — Plan Enforcement Live Tests (blocked: need non-platform plans in DB)

- [ ] Create a company with `plan_key = 'chatbot'`
- [ ] Test: chatbot plan blocks voice/workflow APIs → expect `feature_not_in_plan`
- [ ] Create a company with `plan_key = 'voice'`
- [ ] Test: voice plan blocks chatbot/document APIs → expect `feature_not_in_plan`
- [ ] Verify platform plan allows all modules

---

## Priority 7 — Role-Based Access Live Tests (blocked: need multi-role test users)

- [ ] Create test users with roles: manager, employee, viewer
- [ ] Test: employee cannot access team/settings pages → expect 403
- [ ] Test: manager can access approvals but not admin panel
- [ ] Test: viewer can only read chatbot + documents + profile

---

## Priority 8 — RAG End-to-End Verification (blocked: need valid JWT)

- [ ] Upload a document via authenticated POST `/api/documents`
- [ ] Verify R2 object created (wrangler CLI or API)
- [ ] Verify queue message produced
- [ ] Verify ingestion consumer processes it
- [ ] Verify Pinecone vectors created
- [ ] Verify chat query returns context from the uploaded document

---

## Priority 9 — Knowledge Scope Separation

- [ ] DB migration: add `knowledge_scope VARCHAR(50)` column to documents
- [ ] Upload API: accept scope parameter
- [ ] Ingestion: multi-namespace upsert with scope
- [ ] Chat query: scope-filtered retrieval
- [ ] Voice query: scope-filtered retrieval (if RAG added)
- [ ] Frontend: scope selector on upload UI

---

## Priority 10 — Deploy Pending Fixes

- [ ] Deploy purge handler fix (requireRole('admin') + remove approvals table reference)
- [ ] Deploy any other pending code changes
- [ ] Verify deployed fixes work in production
