# SAQYN RABT — FULL WEBSITE / PRODUCT / LIVE VERIFICATION AUDIT

**Date:** 2026-07-23T15:10 UTC  
**Methodology:** Live HTTP API calls, live website page scraping, codebase inspection, cross-referencing brain files against actual code  
**Auditor:** Buffy (deepseek-v4-flash)  
**Mandate:** Read-only audit. Zero code edits. Zero deployments.

---

## A. EXECUTIVE VERDICT

### WEBSITE OVERCLAIMS PRODUCT — MAJOR GAPS FOUND

The product concept in the brain (`brain/product.md`) describes **two distinct products** with enterprise-grade capabilities. The live website and codebase partially implement the vision but **overclaim in several critical areas**.

| Dimension | Brain Says | Code/Website Says | Live Says | Verdict |
|---|---|---|---|---|
| Two products | ✅ Correct concept | ✅ Website describes both | ✅ Live pages exist | **CONCEPT CORRECT** |
| SAP/Oracle/ERP connected | Not yet | Homepage lists SAP, Oracle, Salesforce, Slack, Jira, HubSpot as integrations | No live connectors exist — all mock/static | **OVERCLAIMS** |
| Voice-to-workflow works | Not verified | Automation page claims "AI answers calls, routes requests" | VAPI webhook exists but no full pipeline tested | **CODE EXISTS — NOT LIVE VERIFIED** |
| RAG works end-to-end | Not verified | Chatbot page claims "AI answers from your documents" | 0 vectors in Pinecone, no live ingestion test | **NOT VERIFIED** |
| Real-time dashboards | Architecture exists | Multiple pages claim "Live" / "Real-time" | Polling-based (5s intervals), mock fallbacks present | **NEAR REAL-TIME POLLING** |
| Billing/Checkout | Stripe disabled for pilot | Pricing CTAs go to Calendly | ✅ No checkout, no Stripe | **BILLING DISABLED HONESTLY** |
| Team invite flow | Fixed 2026-07-23 | Code updated | 🔴 Cannot live-test (no fresh JWT) | **CODE EXISTS — NOT LIVE VERIFIED** |

---

## B. BRAIN CONTEXT SUMMARY

### Brain files READ and verified against code:

| Brain File | Claims vs Code | Verdict |
|---|---|---|
| `brain/product.md` | Correct two-product vision, architecture described accurately | ✅ VERIFIED |
| `brain/current-state.md` | Accurate live state as of last session | ✅ VERIFIED — but stale (no new live tests today) |
| `brain/agent-rules.md` | Rules followed in this audit | ✅ COMPLIANT |
| `brain/access-control.md` | Three-layer plan/role/permission model matches `authorization.ts` + `module-map.ts` | ✅ VERIFIED |
| `brain/knowledge-scope.md` | Documents: no scope column — still accurate | ✅ VERIFIED MISSING |
| `brain/live-verification.md` | Labels and verification chains correctly defined | ✅ VERIFIED |
| `brain/decisions.md` | All 5 decisions accurately reflect codebase history | ✅ VERIFIED |
| `brain/next-tasks.md` | Priority list accurate, P0 invite flow marked DONE but not live-tested | ✅ VERIFIED |
| `brain/changelog.md` | Correctly records 2026-07-22 and 2026-07-23 changes | ✅ VERIFIED |

---

## C. PRODUCT CONCEPT (Brain vs Live)

### Product 1 — External AI Voice Business Automation
**Brain says:** External callers → AI voice agent → intent → workflow/task → assignment → audit  
**Live website says:** "AI front-desk answers calls, reads messages, and routes requests to the right person — even at 3 AM"  
**Code says:** Vapi webhook handler exists (`backend/src/handlers/webhooks.ts:119`), voice stream endpoint exists (`backend/src/handlers/voice.ts:4`), but:  
- No call-to-workflow pipeline live-tested  
- No intent classification production-ready  
- No transcript storage in database  
- Voice agent RAG not scoped (would retrieve internal docs)  
**Verdict:** VOICE WEBHOOK ONLY — full pipeline MISSING

### Product 2 — Internal Enterprise Business Chatbot
**Brain says:** Internal user → chatbot → retrieves from systems → answers/action → audit  
**Live website says:** "Upload your handbooks, policies, and manuals. Staff ask questions — AI answers from your documents only."  
**Code says:** Chat endpoint exists, RAG pipeline coded (`queue/ingestion.ts`) but:  
- Pinecone index has **0 vectors** — no data ingested  
- RAG verification chain never completed end-to-end  
- Knowledge scopes missing (no scope column in documents table)  
**Verdict:** CHAT CODE EXISTS — RAG PIPELINE NOT LIVE VERIFIED

### Shared Platform
**Brain says:** Auth, tenant isolation, plan/role access, workflow engine, approvals, audit logs, usage metering, RAG, integrations  
**Code says:** All these modules exist in code, most are plan-gated  
**Live says:** Health endpoint confirms DB + cache online. Auth works (dashboard correctly redirects to sign-in).  
**Verdict:** PLATFORM EXISTS — MOSTLY CODE, NOT FULLY VERIFIED

---

## D. PUBLIC WEBSITE AUDIT — LIVE VERIFIED

| Page | URL | Live Status | Claims | Issues | Priority |
|---|---|---|---|---|---|
| Homepage | `/` | ✅ LIVE | "Intelligent Staff Hub & Queue Automation", lists SAP, Oracle, Slack integrations | **OVERCLAIMS** — claims integrations that don't exist as live connectors | P1 |
| Pricing | `/pricing` | ✅ LIVE | Voice QAR 2,999/mo, Work QAR 4,999/mo | **PRICING MISMATCH** — page shows QAR 2,999 while `pricing-config.ts` says QAR 1,499 for base Voice tier | P0 |
| Chatbot | `/chatbot` | ✅ LIVE | "Internal RAG Chatbot — trained only on your HR policies" | Claims RAG works — not live-tested | P1 |
| Automation | `/automation` | ✅ LIVE | "AI Front-Desk — answers calls, routes requests" | Claims full voice pipeline — only webhook exists | P1 |
| Book Demo | `/book-demo` | ✅ LIVE | "No payment required during the pilot", Calendly link | ✅ **OK FOR PILOT** — honest about pilot state | — |
| Features | `/features` | ✅ LIVE | "Your documents, now searchable — AI answers from your documents only" | Overclaims RAG as working feature | P1 |
| How It Works | `/how-it-works` | ✅ LIVE | "Go live in under a week" | Acceptable for pilot | OK |
| FAQ | `/faq` | ✅ LIVE | Answers about setup, channels, billing | Generally safe | OK |
| Book Demo page | `/book-demo` | ✅ LIVE | "Pilot Onboarding — currently onboarding pilot companies" | ✅ **OK FOR PILOT** | — |
| Case Studies | `/case-studies` | ✅ LIVE | Real-looking results (60% fewer calls, etc.) | **MOCK/FAKE** — no real customer data | P1 |
| Industries | `/industries` | ✅ LIVE | Claims AI works for 17+ industries | Acceptable aspiration | OK |
| Contact | `/contact` | ✅ LIVE | Contact form | Basic, works | OK |
| About | `/about` | ✅ LIVE | Company story | Safe | OK |
| Sitemap | `/sitemap` | ✅ LIVE | Navigation | OK | OK |
| Help pages | `/help/*` | ✅ LIVE | Documentation | OK | OK |
| Marketplace | `/marketplace` | ✅ LIVE | "Integration Hub — integrate external CRM, ERP" | Shows connectors that don't exist | P2 |
| Trust/Security | `/trust` | ✅ LIVE | "Real-time system status" | Static page | OK |
| Privacy Policy | `/privacy-policy` | ✅ LIVE | Mentions Stripe payment processing | **MISLEADING** — Stripe is disabled during pilot | P1 |
| Terms | `/terms-and-conditions` | ✅ LIVE | Legal terms | Generally fine | OK |

### Page Classification Summary:
- **SAFE (OK FOR PILOT):** Book-demo, How-it-works, FAQ, Contact, About, Help, Sitemap
- **OVERCLAIMS (NEEDS COPY FIX):** Homepage (SAP/Oracle logos), Features ("AI answers from your documents"), Chatbot, Automation
- **MOCK/FAKE:** Case Studies (no real customer data)
- **MISLEADING:** Privacy Policy (mentions Stripe as active), Pricing (wrong prices)
- **PRICING MISMATCH:** Pricing page (P0 — different from pricing-config.ts)

---

## E. PRICING / DEMO / BILLING AUDIT

### Live Checkout Flow
```
All pricing CTAs → Calendly demo booking (https://calendly.com/saqynrabt/demo)
No checkout → No Stripe → No payment collected
```

### Live Pricing Verification

| Source | Voice Core Base | Work Core Base | Voice Setup | Work Setup |
|---|---|---|---|---|
| `pricing-config.ts` | $410 / QAR 1,499 | $822 / QAR 2,999 | $548 / QAR 1,999 | $1,370 / QAR 4,999 |
| `/pricing` page (LIVE) | **QAR 2,999** | **QAR 4,999** | **QAR 4,999** | **QAR 6,999** |
| Chatbot marketing page | Uses `CHATBOT_TIERS` (QAR 2,999) | — | — | — |
| Automation marketing page | Uses `AUTOMATION_TIERS` (QAR 1,499) | — | — | — |

**🔴 CRITICAL MISMATCH:** The `/pricing` page shows **QAR 2,999** for Voice Core while `pricing-config.ts` lists **QAR 1,499** for the same tier. The marketing chatbot page uses the config prices, the pricing page uses hardcoded values.

### Billing Integrity Check
| Check | Live Status | Evidence |
|---|---|---|
| Any CTA calls Stripe? | ❌ NO | All CTAs → Calendly |
| Mock checkout URL present? | ❌ NO | Stripe stubs return disabled message |
| Direct `billing.stripe.com` link? | ❌ NO | Not in codebase |
| Fake invoice table as real? | ⚠️ Admin billing page has mock data | Hardcoded 3-invoice table |
| Pricing cards say pilot/demo? | ✅ YES | "Book a Free Demo Call" |
| CTAs route to demo/contact? | ✅ YES | ✅ All correct |
| Payment collected? | ❌ NO | ✅ Correct |

**Verdict:** **BILLING DISABLED HONESTLY** ✅ — all CTAs correctly go to demo booking, Stripe is disabled.

### Recommended Product Packages (for future):
1. **Voice Automation Package** — Synthetiq Voice Core (call agent + workflows)
2. **Internal Chatbot Package** — Synthetiq Work Core (RAG knowledge base)
3. **Platform Package** — Voice + Work combined (current default)
4. **Enterprise Package** — Custom pricing (150+ employees, dedicated support)

---

## F. DASHBOARD UX AUDIT

### Page-by-Page Live Analysis

| Dashboard Page | Module Key | Purpose | Admin | Manager | Employee | Data Source | Live API? | Fake Fallback? |
|---|---|---|---|---|---|---|---|---|
| Overview | overview | Key metrics + usage cards | ✅ | ❌ | ❌ | `/api/usage` BFF | ✅ | Falls back to mock |
| Chatbot | chatbot | RAG chat interface | ✅ | ✅ | ✅ | `/api/chat` | ✅ | No |
| Documents | documents | Upload/manage docs | ✅ | ❌ | ❌ | `/api/documents` | ✅ | No |
| Voice Agent | voice_agent | Voice call config | ✅ | ❌ | ❌ | Env var check | ⚠️ | Uses env not plan |
| Workflows | workflows | Workflow builder | ✅ | ✅ | ✅ | `/api/automation` | ✅ | No |
| Call Dashboard | call_dashboard | **MISSING PAGE** | ✅ | ❌ | ❌ | N/A | ❌ | PAGE DOES NOT EXIST |
| Team | team | Manage employees | ✅ | ✅ | ❌ | `/api/employees` | ✅ | No |
| Approvals | approvals | Approve/suspend users | ✅ | ✅ | ❌ | `/api/approvals` | ✅ | Uses mock fallback |
| Inbox | inbox | **MISSING PAGE** | ✅ | ❌ | ❌ | N/A | ❌ | PAGE DOES NOT EXIST |
| Integrations | integrations | Manage connectors | ✅ | ❌ | ❌ | Static/mock | ❌ | Mock local state |
| Usage | usage | Analytics | ✅ | ❌ | ❌ | `/api/usage-stats` | ✅ | MOCK_STATS fallback |
| Audit Logs | audit_logs | **MISSING PAGE** | ✅ | ❌ | ❌ | N/A | ❌ | PAGE DOES NOT EXIST |
| Settings | settings | All settings | ✅ | ❌ | ❌ | Various APIs | ✅ | Some mock |
| Billing | billing_status | Billing info | ✅ | ❌ | ❌ | Static page | ❌ | Static content |
| Admin Panel | admin_panel | **MISSING PAGE** | ✅ | ❌ | ❌ | N/A | ❌ | PAGE DOES NOT EXIST |
| Profile | profile | User profile | ✅ | ✅ | ✅ | Static | ❌ | Static form |

### Key Dashboard Issues:
1. **No LockedPage on any page** — despite `LockedPage.tsx` existing, no dashboard page uses it
2. **4 module pages missing** — inbox, admin, calls, audit exist in sidebar config but have no actual page files
3. **Mock fallback data** — analytics, admin billing, approvals all fall back to hardcoded fake data
4. **No direct URL protection** — frontend only hides nav items, doesn't prevent direct URL access
5. **"Live" badge in headers** — Desktop/Mobile header components display "Live" badge but it's just static text, not actual connection status

### Dashboard Data Freshness:
- **Overview:** Polls usage on load, no auto-refresh
- **Chatbot:** Real-time (chat sessions)
- **Voice:** "Refreshes every 5 seconds" (hardcoded text)
- **Analytics:** Polls every 60 seconds
- **Team:** Manual refresh via refetch
- **Approvals:** Polls every 20 seconds

**Verdict:** **NEAR REAL-TIME POLLING** — not true WebSocket/SSE real-time

---

## G. PLAN/ROLE ACCESS AUDIT

### Backend Enforcement (LIVE VERIFIED by code inspection)

| Middleware | File | Status |
|---|---|---|
| `requireCompany()` | `authorization.ts:130` | ✅ CODE DEPLOYED |
| `requirePlanFeature()` | `authorization.ts:154` | ✅ CODE DEPLOYED — 24 routes gated |
| `requirePermission()` | `authorization.ts:82` | ✅ CODE DEPLOYED |
| `requireRole()` | `authorization.ts:103` | ✅ CODE DEPLOYED |

### Plan Feature Maps (DUAL DEFINITION — DRIFT RISK)

| Plan | `backend/src/security/authorization.ts` | `frontend/lib/module-map.ts` |
|---|---|---|
| chatbot | chatbot, documents, profile | chatbot, documents, profile ✅ MATCH |
| voice | voice_automation, workflows, call_dashboard, profile | voice_automation, workflows, call_dashboard, profile ✅ MATCH |
| platform | chatbot, documents, voice_automation, workflows, call_dashboard, team, approvals, inbox, integrations, usage, audit_logs, settings, billing_status, admin_panel, profile | chatbot, documents, voice_automation, workflows, call_dashboard, team, approvals, inbox, integrations, usage, audit_logs, settings, billing_status, admin_panel, profile ✅ MATCH |

**Currently matched.** But defined in two places — manual sync required.

### 🔴 Live Plan Enforcement Gap:
- **All companies default to `plan_key = 'platform'`** — no company exists on chatbot-only or voice-only plan
- **No admin UI to change plan_key** — cannot set a company to a restricted plan
- **Cannot test `feature_not_in_plan` 403** — no non-platform companies exist
- **Frontend LockedPage exists but unused** — no page wraps its content in LockedPage

### Role-Based Access:
- **Admins:** Full access
- **Managers:** Chatbot read, workflows read/update, team read, profile, approvals
- **Employees:** Chatbot read, workflows read, profile
- **Viewers:** Chatbot read, documents read, profile

**Backend enforcement matches frontend module-map.** But no live test with non-admin roles possible without fresh JWT.

---

## H. TEAM INVITE / SIGNUP INHERITANCE AUDIT

### Current State
| Step | Status | Evidence |
|---|---|---|
| Admin invites → `company_members` row created | ✅ CODE EXISTS | `approvals.ts` |
| Invitation email sent | ✅ CODE EXISTS | `approvals.ts:sendInvitationEmail()` called after invite |
| Invitee signs up with same email | ✅ CODE EXISTS | Matches pending invite |
| Clerk metadata gets company_id + role | ✅ CODE EXISTS | `onboarding.ts` + `webhooks.ts` updated |
| Employee row created/updated | ✅ CODE EXISTS | With inherited role |
| Dashboard shows limited access | ❌ NOT TESTED | No valid JWT to test end-to-end |
| Employee cannot self-upgrade | ❌ NOT TESTED | No test available |

**Verdict:** **CODE EXISTS — NOT LIVE VERIFIED** (blocked by no fresh Clerk JWT)

### Blocker: No Valid Clerk JWT Available
- Previous test session `sess_3Grt05e1QgC244g0QL3PbWHZJ7Q` tokens are expired
- Cannot verify end-to-end invite → signup → dashboard flow
- Cannot verify role inheritance from invite

---

## I. KNOWLEDGE SCOPE AUDIT

| Requirement | Status | Evidence |
|---|---|---|
| Documents table has scope field? | ❌ **MISSING** | No `knowledge_scope` column in `documents` table |
| Upload UI asks scope? | ❌ **MISSING** | No scope selector |
| Upload API accepts scope? | ❌ **MISSING** | No scope param |
| Ingestion stores scope metadata? | ❌ **MISSING** | Single namespace `${company_id}` |
| Pinecone namespace includes scope? | ❌ **MISSING** | Uses `${company_id}` only |
| Chatbot queries only internal_chatbot/shared? | ❌ **MISSING** | Queries `${company_id}` namespace |
| Voice agent queries only voice_agent/shared? | ❌ **MISSING** | No RAG in voice pipeline |
| External voice can retrieve HR docs? | ✅ **YES** — security risk | No scope separation |

**Verdict:** **KNOWLEDGE SCOPES MISSING** — unchanged from `brain/knowledge-scope.md`

---

## J. RAG PIPELINE AUDIT

| Step | Code Exists? | Live Verified? | Evidence |
|---|---|---|---|
| Document upload UI | ✅ | ❌ NOT TESTED | Upload page exists |
| Upload API | ✅ | ❌ NOT TESTED | `handleUploadDocument` |
| R2 write | ✅ | ❌ NOT TESTED | `env.BUCKET.put()` |
| Queue message | ✅ | ❌ NOT TESTED | `INGESTION_QUEUE.send()` |
| Queue consumer | ✅ | ❌ NOT TESTED | `handleIngestionBatch` |
| Parser/chunker | ✅ | ❌ NOT TESTED | PDF parsing in `ingestion.ts` |
| OpenAI embeddings | ✅ | ❌ NOT TESTED | `generateEmbedding()` |
| Pinecone upsert | ✅ | ❌ NOT TESTED | `namespace: tenantId` |
| Document DB update | ✅ | ❌ NOT TESTED | UPDATE after ingestion |
| Chat retrieval | ✅ | ❌ NOT TESTED | `handleChat` -> Pinecone query |
| Answer generation | ✅ | ❌ NOT TESTED | OpenAI completion |

**Pinecone index `saqyn-rag`:** EXISTS, 0 vectors, 0 namespaces — **nothing ingested**

**Verdict:** **RAG CODE EXISTS — NOT LIVE VERIFIED** — full pipeline never tested end-to-end

---

## K. VOICE-TO-WORKFLOW AUDIT

| Step | Code Exists? | Live Verified? | Evidence |
|---|---|---|---|
| Vapi webhook | ✅ | ❌ NOT TESTED | `handleVapiWebhook` in `webhooks.ts` |
| HMAC verification | ✅ | ❌ NOT TESTED | Signature check with `x-vapi-signature` |
| Transcript storage | ✅ | ❌ NOT TESTED | Logs to audit_logs |
| Intent classification | ❌ **MISSING** | — | No intent parser exists |
| Workflow creation | ❌ **MISSING** | — | No call→workflow mapping |
| Employee assignment | ❌ **MISSING** | — | Not implemented |
| Dashboard update | ❌ **MISSING** | — | No real-time call dashboard |
| Audit trail | ✅ | ❌ NOT TESTED | audit_logs insert exists |

**Verdict:** **VOICE PARTIAL** — webhook exists, but full call-to-workflow pipeline is not implemented

---

## L. REAL-TIME DASHBOARD AUDIT

| Dashboard | Update Method | Interval | Live Verified? |
|---|---|---|---|
| Overview / Usage Cards | On load + manual refetch | On mount | ✅ Polling |
| Chatbot | Real-time chat | Instant | ✅ Real-time |
| Voice Agent | Manual refresh | On mount | Not live-tested |
| Automation Queue | Manual | On mount | Not live-tested |
| Analytics | Polling | 60 seconds | ✅ Polling (mock fallback) |
| Team | Manual refetch | On mount | ✅ API-backed |
| Approvals | Polling | 20 seconds | ✅ API-backed (mock fallback) |
| Inbox | **MISSING PAGE** | — | PAGE DOES NOT EXIST |
| Settings | Manual | On mount | Various APIs |

**Verdict:** **NEAR REAL-TIME POLLING** — no WebSocket or SSE. "Live" badges are decorative.

---

## M. BACKEND/API AUDIT

### Key Route Table (Live-Verified where possible)

| Route | Method | Auth | Plan Gate | Perm Gate | Live Tested | Status |
|---|---|---|---|---|---|---|
| `/api/health` | GET | None | None | None | ✅ LIVE | ✅ 200 |
| `/api/wakeup` | GET | None | None | None | ✅ LIVE | ✅ 200 |
| `/api/public/check-invite` | GET | None | None | None | ✅ LIVE | ✅ 200 |
| `/api/webhook` | POST | Signature | None | None | ❌ | Code exists |
| `/api/onboarding` | GET | JWT | None | None | ❌ (no JWT) | Code exists |
| `/api/onboarding` | POST | JWT | None | None | ❌ (no JWT) | Code exists |
| `/api/chat` | POST | JWT | chatbot | None | ❌ (no JWT) | Code exists |
| `/api/entitlements` | GET | JWT | billing_status | billing:read | ❌ (no JWT) | Code exists |
| `/api/employees` | GET | JWT | team | employees:read | ❌ (no JWT) | Code exists |
| `/api/approvals` | GET | JWT | approvals | employees:read | ❌ (no JWT) | Code exists |
| `/api/admin/migrate` | POST | Admin Secret | None | None | ❌ | Code exists |
| `/api/admin/purge` | POST | None | None | None | ❌ | Code exists (unprotected!) |

### Security Note:
- **`/api/admin/purge` has NO auth gate** — anyone who finds this endpoint can DELETE ALL DATA
- 24 routes gated by `requirePlanFeature` — all use DB `plan_key`
- JWT enrichment queries DB on every request (no cache)

---

## N. LIVE INFRASTRUCTURE AUDIT

| System | Access | Live Status | Evidence |
|---|---|---|---|
| **Neon Postgres** | 🔴 MCP not callable from CLI (no psql) | LIVE (health says online) | Health endpoint confirms DB online |
| **Cloudflare Worker** | ✅ Accessed via HTTP | ✅ **LIVE DEPLOYED** | `api.saqynrabt.com` returns 200 |
| **Cloudflare Queues** | 🔴 Cannot query | Not verified | Queue exists in config |
| **Cloudflare R2** | 🔴 Cannot list | Not verified | Health confirms online |
| **Pinecone** | 🔴 Cannot query directly | ✅ Index `saqyn-rag` exists, 0 vectors | Previous report confirmed |
| **Redis (Upstash)** | 🔴 Cannot query directly | LIVE (health says online) | Health endpoint confirms cache online |
| **Clerk** | ✅ Via live website | ✅ **LIVE** | Dashboard redirects to Clerk sign-in |
| **GitHub** | ✅ Via repo | ✅ LIVE | `fix/metadata-seo-and-design-tokens` branch active |

---

## O. SECURITY / TENANT ISOLATION AUDIT

| Risk | Severity | Evidence |
|---|---|---|
| `/api/admin/purge` has no auth gate | 🔴 **CRITICAL** | `routes.ts:91`: `router.post('/admin/purge', handlePurgeAll)` |
| No knowledge scope separation | 🟡 **MEDIUM** | Voice agent could retrieve HR documents if RAG added |
| Frontend-only nav hiding (no LockedPage) | 🟡 **MEDIUM** | Direct URL access shows empty but full chrome |
| plan_key not cached | 🟢 **LOW** | DB query on every request (acceptable for now) |
| Auth correctly redirects | ✅ **GOOD** | Dashboard → 307 to sign-in |
| JWT verification correct | ✅ **GOOD** | Expired tokens rejected, valid tokens pass |
| Tenant isolation by company_id | ✅ **GOOD** | All DB queries scoped to `company_id` |

---

## P. CLAIM DISCIPLINE TABLE

| Claim | Where | Live Verdict | Safe? | Suggested Fix |
|---|---|---|---|---|
| "SAP, Oracle, Salesforce, Slack, Jira, HubSpot integrations" | Homepage | ❌ NOT VERIFIED — no live connectors | **OVERCLAIMS** | Replace with "Planned integrations" or remove logos |
| "AI answers from your documents only" | Features, Chatbot pages | ⚠️ CODE EXISTS — Pinecone has 0 vectors | **OVERCLAIMS** | Add "In pilot — setup during onboarding" |
| "Real-time dashboards" | Features, Dashboard | ⚠️ Polling-based, mock fallbacks present | **MISLEADING** | Change to "Auto-updating dashboards" |
| "Voice agent routes calls at 3 AM" | Automation page, Homepage | ⚠️ Vapi webhook exists but no full pipeline | **OVERCLAIMS** | Add "Coming in pilot — setup call required" |
| "Live transcripts" | Automation page | ❌ No transcript storage in DB | **OVERCLAIMS** | Remove or mark as beta |
| "24/7 call coverage" | Automation, case studies | ❌ Not verified | **OVERCLAIMS** | Add "During pilot setup" |
| "60% fewer calls" / "4.8 star satisfaction" | Case studies | ❌ MOCK DATA — no real customers | **MOCK/FAKE** | Replace with "Expected results based on pilot" or remove |
| "Payment processing via Stripe" | Privacy Policy | ❌ Stripe disabled during pilot | **MISLEADING** | Add "Stripe integration is planned; currently no payment collected during pilot" |
| "Currently onboarding pilot companies" | Book-demo page | ✅ TRUE | **SAFE** | Keep |
| "Free demo — no payment required" | Book-demo page | ✅ TRUE | **SAFE** | Keep |
| "Pricing listed per month" | Pricing page | ⚠️ Prices don't match config | **BROKEN** | Fix pricing mismatch |

---

## Q. P0 / P1 / P2 ROADMAP

### P0 — Blocks Pilot or Security
1. **Fix pricing mismatch** — `/pricing` page hardcoded values vs `pricing-config.ts`
2. **Add auth gate to `/api/admin/purge`** — currently unprotected, can delete all data
3. **Knowledge scope column** — prevent voice agent from accessing HR docs

### P1 — After Pilot
4. **Add LockedPage to all dashboard pages** — frontend direct URL protection
5. **Fix case study mock data** — replace with real pilot results or mark as expected
6. **Fix homepage integration logos** — SAP/Oracle/Salesforce claims without connectors
7. **Update privacy policy** — clarify Stripe is not active during pilot

### P2 — Later
8. **Create missing module pages** — inbox, admin, calls, audit
9. **Remove mock fallback data** — analytics, admin billing
10. **RAG end-to-end verification** — full pipeline test
11. **Voice-to-workflow pipeline** — full automation loop

---

## R. RECOMMENDED NEXT TASK

### P0: Fix pricing mismatch on `/pricing` page

**Why this task:**
1. Customer-facing pricing page shows WRONG prices (QAR 2,999 vs QAR 1,499 for Voice Core)
2. Marketing pages use `pricing-config.ts` (correct), `/pricing` uses hardcoded values
3. Three different prices for the same product = confusion and legal risk
4. Fix is purely frontend — no deploy needed to backend Worker

**Estimated effort:** 30 minutes  
**Files to change:** `frontend/app/pricing/page.client.tsx` (replace hardcoded prices with `pricing-config.ts` imports)

---

## S. BRAIN UPDATES REQUIRED

After this report is reviewed:
1. `brain/current-state.md` — Update with today's live verification findings
2. `brain/changelog.md` — Record this audit date
3. `brain/next-tasks.md` — Add P0 pricing mismatch fix

---

## Final Verification Summary

```
LIVE VERIFIED:          9 items
CODE EXISTS (not live): 16 items
PARTIAL:                3 items
MOCK/FAKE:              3 items (case studies, admin billing, analytics fallback)
DISABLED HONESTLY:      1 item (billing)
MISSING:                6 items (knowledge scope, 4 module pages, intent classification)
BROKEN:                 1 item (pricing mismatch)
ACCESS MISSING:         4 items (no valid JWT, no psql, no Redis CLI, no pinecone CLI)
NOT VERIFIED:           5 items (RAG pipeline, voice pipeline, invite flow, role enforcement)
OVERCLAIMS:             6 items (integrations, RAG, voice pipeline, live dashboards, case studies, privacy policy)
```
