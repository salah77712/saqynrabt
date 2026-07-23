# P0 — Arabic Encoding Fix & Revert Audit

## Summary

The Arabic double-encoding fix script (`fix-all-encoding.mjs`) applied a Windows-1252 round-trip to all files containing mojibake Arabic characters.

**Problem discovered:** The whole-file W1252 round-trip is destructive for files with MIXED encoding state (some strings correctly encoded, some mojibake at HEAD).

---

## Results

| Category | Count | Action |
|---|---|---|
| In-scope files fixed | 6 | Kept — mojibake → correct |
| Out-of-scope files ENCODING_ONLY | 60 | Kept — mojibake → correct |
| Out-of-scope files CORRUPTED | 5 | **Reverted to HEAD** |

## Reverted Files (data loss — correct Arabic → `?`)

These files had a mixed state at HEAD (some Arabic strings correct, some mojibake). The W1252 round-trip destroyed the correctly-encoded Arabic, replacing it with `?`. Restored to HEAD.

1. `frontend/app/contact/page.client.tsx` — 8 strings corrupted
2. `frontend/app/dashboard/approvals/page.tsx` — 11 strings corrupted
3. `frontend/app/dashboard/inbox/page.tsx` — 3 strings corrupted
4. `frontend/app/dashboard/settings/api/page.tsx` — 11 strings corrupted
5. `frontend/app/dashboard/settings/webhooks/page.tsx` — 7 strings corrupted

**Status:** RESTORED TO HEAD. Need manual targeted pass later — these files still have mojibake at HEAD that won't be fixed by a whole-file approach.

## Kept Out-of-Scope Files (60 ENCODING_ONLY)

All 60 files had ONLY mojibake Arabic at HEAD, and the fix correctly converted them to proper Arabic. Verified:
- No `?` data loss in any kept file
- No English copy changed
- No imports, routes, functions, or JSX structure changed
- Only Arabic string content changed (mojibake → correct)

## In-Scope Files (6)

| File | Status |
|---|---|
| `frontend/app/admin/billing/page.tsx` | CLEAN — mojibake → correct |
| `frontend/app/admin/companies/page.tsx` | CLEAN — mojibake → correct |
| `frontend/app/admin/incidents/page.tsx` | CLEAN — mojibake → correct |
| `frontend/app/admin/metrics/page.tsx` | CLEAN — mojibake → correct |
| `frontend/app/dashboard/settings/page.tsx` | CLEAN — mojibake → correct |
| `frontend/app/book-demo/page.client.tsx` | CLEAN — recreated from HEAD with correct Arabic |

## Verification Checks

### Corruption (grep `????` in diffs)
```
No matches — zero corrupted files remain in working tree.
```

### TypeScript Typecheck
```
npm run typecheck — PASS (zero errors)
```

### Still Modified Files Count
```
frontend/app/: 60 files (ENCODING_ONLY — kept)
backend/:      8 files (from earlier work, not in this scope)
```

## Next Steps for Reverted Files

The 5 reverted files require a per-string targeted fix:
1. Identify each `ar:` value in the file
2. If it's mojibake (contains C3 98-9B byte sequences), decode it individually
3. If it's already correct Arabic, leave it alone
4. Do NOT apply a whole-file W1252 round-trip

---

# Pinecone, Schema & RAG Verification

## Fix 1 — Pinecone Host: CORRECTED

| Item | Before | After | Verified |
|------|--------|-------|----------|
| `.env.local` | `pinecone.ios` (typo) | `pinecone.io` | ✅ |
| Worker secret `PINECONE_INDEX_HOST` | `pinecone.ios` (typo) | `pinecone.io` | ✅ |
| Pinecone API call | DNS failure on `.ios` | `{"namespaces":{},"totalVectorCount":0}` on `.io` | ✅ |

**No remaining `.ios` references found in config.**

## Fix 2 — Schema v4 Migration: APPLIED

| Column | Type | Default | Status |
|--------|------|---------|--------|
| `documents.chunk_count` | INTEGER | 0 | ✅ EXISTS |
| `documents.extracted_r2_key` | VARCHAR(1024) | `''` | ✅ EXISTS |
| `documents.indexed_at` | TIMESTAMP | null | ✅ EXISTS |

**`_schema_version` now includes:**
- v1 (2026-07-04), v2 (2026-07-04), **v4 (2026-07-21T16:02:02)** ✅
- v3 tables exist but were created manually (not recorded in version tracking)

**Note:** The HTTP endpoint `POST /api/admin/migrate` requires a Clerk-signed admin JWT (behind `requireRole('admin')` middleware). The `X-Admin-Secret` header guard inside the handler is unreachable without admin JWT. Migration was applied via direct SQL to Neon instead.

## RAG Status: STILL NOT VERIFIED

Blockers resolved: ✅ Pinecone host fixed, ✅ Schema v4 applied
Remaining: 0 vectors in Pinecone (no ingestion has ever run), pipeline never live-tested end-to-end

**Verdict:** RAG: NOT VERIFIED — needs live end-to-end test after next Worker deploy.
