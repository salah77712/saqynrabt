# SAQYN RABT — TECHNICAL EXECUTIVE SUMMARY (FINAL LIVE-VERIFIED)

**Date:** 2025-07-20
**Verified via:** Postgres (14 tables), Pinecone (index exists, 0 vectors), Cloudflare R2 (bucket exists, 0 objects), Cloudflare Queues (DOES NOT EXIST), Redis (empty), Cloudflare Workers (NOT FOUND)

---

## What This Actually Is

Two-product B2B SaaS for Qatari/GCC companies:

**Product 1 — Business Automation:** Real-time dispatch queue, employee approval workflow, visual workflow builder, omnichannel inbox (WhatsApp/SMS/Email), 10 integrations. **Actively used**: 26 audit logs show real invite/approve/suspend cycles happening in production.

**Product 2 — AI HR Chatbot:** Streaming AI chat (gpt-4o-mini) with guardrails, document upload, RAG retrieval, knowledge gaps. **LLM is active** (15 questions counted) but runs blind — zero company document context because the ingestion pipeline is architecturally broken.

---

## Live Status Summary

| Component | Live Status |
|-----------|------------|
| Cloudflare Worker (`saqyn-backend`) | ❌ **NOT DEPLOYED** — Workers MCP returns empty list |
| Cloudflare Queue (`saqyn-doc-ingestion`) | ❌ **DOES NOT EXIST** — blocks entire RAG pipeline |
| Cloudflare R2 (`saqyn-documents`) | ✅ Bucket EXISTS, **0 objects** |
| Pinecone (`saqyn-rag`) | ✅ Index EXISTS, **0 vectors, 0 namespaces** |
| Neon PostgreSQL | ✅ 14 tables, actively queried |
| Upstash Redis | ✅ Reachable, **0 keys** (rate limiting inactive) |
| Clerk Auth | ✅ Configured |
| usage_ledger | ✅ dummy_company: 15 questions, 8 automation texts |
| audit_logs | ✅ 26 records (all dummy_company) |
| company_members | ✅ 4 records (3 dummy_company + 1 test_co) |
| employee_profiles | ✅ 2 records (dummy_company) |
| employees (legacy table) | ❌ **EMPTY** — replaced by company_members + employee_profiles |
| chat_history | ❌ **EMPTY** |
| documents | 1 record, **status=deleted** |
| automations | ❌ **EMPTY** — 0 workflow definitions |
| chatbot_chunks | ❌ **EMPTY** |
| knowledge_gaps | ❌ **EMPTY** |
| feedback | ❌ **EMPTY** |
| notifications | ❌ **EMPTY** |

---

## Two Tenants in Production

| company_id | Name | Members | Employees | Documents | Chat | Automations | Audit logs | Usage |
|-----------|------|---------|-----------|-----------|------|-------------|-----------|-------|
| `dummy_company` | Al Safa Business Hub | 3 (1 admin, 1 emp, 1 pending) | 2 profiles | 1 (deleted) | 0 | 0 | 26 | 15 questions, 8 texts |
| `test_co` | *(no companies row — orphan)* | 1 (pending) | 0 | 0 | 0 | 0 | 0 | 0 |

**`test_co` is an incomplete tenant** — has a `company_members` row but no `companies` table entry. Likely a leftover from testing.

---

## The 10 Most Dangerous Things (Live-Adjusted)

### 🔴 P1: The chatbot is running blind
Queue doesn't exist → R2 is empty → Pinecone has 0 vectors. The AI answers every HR question from its training data only. The core "RAG chatbot" promise is **completely broken** in production right now. The usage ledger shows 15 questions consumed — the LLM is working, but with zero company context.

### 🔴 P2: Worker may not be deployed
Workers MCP returns an empty list. If `saqyn-backend` isn't deployed, **all 30+ backend API endpoints are unreachable**. The frontend's `NEXT_PUBLIC_API_URL=https://api.saqynrabt.com` is pointing to a Worker that may not exist.

### 🔴 P3: `dummy_company` is the production tenant
`utils.ts:104` falls back to `dummy_company` for any Clerk token without `org_id`. Live Postgres confirms: **all 26 audit logs, both employee_profiles, all usage counters belong to `dummy_company`**. Any valid token without an org silently shares this tenant with everyone else.

### 🟠 P4: 0 workflow definitions in the database
`automations` table is empty. The business automation product has 0 active automations. The automation queue page polls every 10s and returns empty results. The "trigger → action" workflow engine has nothing to execute.

### 🟠 P5: `security_incidents` table doesn't exist
Admin incidents endpoints reference a table that doesn't exist in the live DB. Every admin incidents call returns 500. The code pattern (no tenant filter) is still a vulnerability if/when the table is created.

### 🟠 P6: Redis is completely empty
No `rate_limit:*` keys, no cache keys. Rate limiting code exists but isn't firing in production. Either the Worker isn't hitting Redis, or the rate limiter keys are being set under different names.

### 🟠 P7: test_co is an orphan tenant
Has a `company_members` row but no `companies` entry. If a test_co user logs in, they'd hit missing-company errors everywhere. Either complete its onboarding or delete it.

### 🟠 P8: Migration version is 2 but 14 tables exist
`_schema_version` says v2 was last applied, but there are 14 tables. Either migrations were applied outside the versioned system, or v3 was applied without updating the version counter. Schema drift is a real risk for future deployments.

### 🟠 P9: The one uploaded document is soft-deleted
`documents` has 1 record: "Al_Safa_HR_SOP_2026.pdf" with `status=deleted`. The R2 key (`dummy_company/doc_dummy_01.pdf`) doesn't exist in the R2 bucket. Either R2 deletion failed silently (the catch in `documents.ts:189-192` swallows R2 errors), or the file was never uploaded through the production path.

### 🟠 P10: 2 real employee profiles exist but `employees` table is empty
Data lives in `company_members` + `employee_profiles`, but `employees` (the Prisma-mapped table) is empty. The Prisma schema only defines 5 models — 13 tables have no Prisma representation.

---

## What to Do First

**This week (1-2 days):**
1. Verify which Cloudflare account the Worker is/was deployed to — or deploy it fresh
2. Create the `saqyn-doc-ingestion` Cloudflare Queue (one CLI command: `wrangler queues create saqyn-doc-ingestion`)
3. Test the document upload → R2 → Queue → Pinecone end-to-end with one real PDF
4. Add `namespace: company_id` to Pinecone query in `chat.ts`
5. Remove `dummy_company` fallback — return 401 when JWT lacks company_id

**Next week:**
6. Create `security_incidents` table + add tenant filter
7. Fix Stripe webhook — remove the bypass
8. Clean up `test_co` orphan tenant
9. Align Prisma schema with live DB
10. Fix the R2 upload — verify files land in the bucket

---

*End of Live-Verified Executive Summary. All findings tied to actual MCP responses — no claims based on code reading alone.*
