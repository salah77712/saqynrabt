# SAQYN RABT — PRE-CLEANUP BACKUP EXPORT
**Timestamp:** 2025-07-20T00:00:00Z  
**Source:** All tables queried via Postgres MCP (read-only)  
**Purpose:** Backup before deletion of seed/demo data

---

## Database State Snapshot

### Table Row Counts
| Table | Count |
|-------|-------|
| _schema_version | 2 |
| audit_logs | 26 |
| automations | 0 |
| chat_history | 0 |
| chatbot_chunks | 0 |
| companies | 1 |
| company_entitlements | 2 |
| company_members | 4 |
| documents | 1 |
| employee_profiles | 2 |
| employees | 0 |
| feedback | 0 |
| knowledge_gaps | 0 |
| notifications | 0 |
| usage_ledger | 1 |

---

### companies (1 row)
```sql
SELECT * FROM companies;
```
```
id: dummy_company
name: Al Safa Business Hub
auto_overage_enabled: false
created_at: 2026-07-04T06:58:55.456Z
CLASSIFICATION: DEMO/SEED
```

---

### company_entitlements (2 rows)
```sql
SELECT * FROM company_entitlements;
```
```
Row 1:
  company_id: test_co
  max_employees: 50
  max_documents: 5
  max_questions: 1000
  dept_limit: 3
  automation_texts_limit: 300
  voice_minutes_limit: 250
  auto_overage_enabled: false
  CLASSIFICATION: DEMO/ORPHAN

Row 2:
  company_id: dummy_company
  CLASSIFICATION: DEMO/SEED
```

---

### company_members (4 rows)
```sql
SELECT * FROM company_members;
```
```
Row 1:
  id: 3
  company_id: test_co
  clerk_user_id: test_user_1
  email: test@saqynrabt.com
  name: Test User
  status: pending
  role: admin
  created_at: 2026-07-04T09:22:12.563Z
  CLASSIFICATION: DEMO

Row 2:
  id: 2
  company_id: dummy_company
  clerk_user_id: user_admin12345demo
  email: admin@alsafa.qa
  name: Salah Al-Qahtani
  status: suspended
  role: admin
  created_at: 2026-07-04T06:58:56.183Z
  CLASSIFICATION: DEMO

Row 3:
  id: 1
  company_id: dummy_company
  clerk_user_id: user_2Pnd12345demo
  email: pending.employee@alsafa.qa
  name: Tariq Mahmood
  status: suspended
  role: employee
  created_at: 2026-07-04T06:58:55.999Z
  CLASSIFICATION: DEMO

Row 4:
  id: 10
  company_id: dummy_company
  clerk_user_id: null
  email: alimuddinnnn10@gmail.com
  name: alim
  status: pending
  role: employee
  created_at: 2026-07-07T17:29:35.648Z
  CLASSIFICATION: DEMO
```

---

### employee_profiles (2 rows)
```sql
SELECT * FROM employee_profiles;
```
```
Row 1:
  clerk_user_id: user_admin12345demo
  company_id: dummy_company
  name: Salah Al-Qahtani
  department: Operations
  vacation_balance: 28
  updated_at: 2026-07-04T06:58:56.360Z
  CLASSIFICATION: DEMO

Row 2:
  clerk_user_id: user_2Pnd12345demo
  company_id: dummy_company
  name: Tariq Mahmood
  department: Operations
  vacation_balance: 30
  updated_at: 2026-07-04T09:23:39.569Z
  CLASSIFICATION: DEMO
```

---

### usage_ledger (1 row)
```sql
SELECT * FROM usage_ledger;
```
```
company_id: dummy_company
questions_count: 15
questions_used: 15
voice_minutes_used: 0
automation_texts_used: 8
CLASSIFICATION: DEMO
```

---

### audit_logs (26 rows)
```sql
SELECT * FROM audit_logs;
-- Company_id: ALL dummy_company
-- Actions: view_automations, approve_employee, suspend_employee, invite_employee
-- All from node user_agent or test IPs
-- All dated 2026-07-04 through 2026-07-08
CLASSIFICATION: DEMO
```

---

### documents (1 row)
```sql
SELECT * FROM documents;
```
```
id: doc_dummy_01
company_id: dummy_company
name: Al_Safa_HR_SOP_2026.pdf
status: deleted (already soft-deleted)
r2_key: dummy_company/doc_dummy_01.pdf
created_at: 2026-07-04T06:58:56.540Z
CLASSIFICATION: DEMO (already soft-deleted, row can be purged)
```

---

### employees (0 rows)
```
EMPTY — no data to delete
```

---

## Infrastructure State

### Pinecone
```
Index: saqyn-rag
Status: Ready
Dimension: 1536
Vectors: 0
Namespaces: 0
R2 bucket: saqyn-documents (referenced in code)
R2 objects: 0
```

### Cloudflare Workers
```
Deployed Workers: (empty list)
Worker expected: saqyn-backend
Status: NOT FOUND in account
```

### Cloudflare Queues
```
Queues: (empty list)
Queue expected: saqyn-doc-ingestion
Status: NOT FOUND
```

### Redis
```
Keys: (empty)
```

---

## Codescan Targets to Inspect
- backend/src/utils.ts — dummy_company fallback
- backend/src/handlers/chat.ts — Pinecone namespace
- backend/src/stripe/index.ts — webhook bypass
- backend/src/queue/ingestion.ts — R2/RAG pipeline
- backend/wrangler.toml — declared but missing Queue
- frontend/lib/mcp/mcp.registry.ts — secrets in bundle
- All frontend pages with hardcoded arrays or demo data

---

## Deletion Candidate Summary

| Item | System | Classification | Safe to Delete? |
|------|--------|---------------|----------------|
| companies row | Postgres | DEMO/SEED | YES |
| company_entitlements (2 rows) | Postgres | DEMO/SEED + ORPHAN | YES |
| company_members (4 rows) | Postgres | DEMO | YES |
| employee_profiles (2 rows) | Postgres | DEMO | YES |
| usage_ledger (1 row) | Postgres | DEMO | YES |
| audit_logs (26 rows) | Postgres | DEMO | YES |
| documents (1 row, already deleted) | Postgres | DEMO | YES |
| dummy_company references in code | Codebase | NEEDS FIX | Code change |
| Stripe webhook bypass | Codebase | DANGEROUS | Code change |
| Client-controlled X-Tenant-Id | Codebase | DANGEROUS | Code change |

---

## Pre-Approval Notes
1. `companies` table will be empty after cleanup — this is correct for a pre-launch product
2. `company_entitlements` will be empty
3. All 14 tables remain intact (no schema changes)
4. R2 has 0 objects — nothing to delete there
5. Pinecone has 0 vectors — nothing to delete there
6. Worker and Queue infrastructure are not deployed — no deletion needed
7. Code changes will be submitted as code diffs for review after live data cleanup
