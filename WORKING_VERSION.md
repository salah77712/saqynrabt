# SAQYN Rabt Working Version — Pre-Pilot Cleanup Baseline

## 1. Commit Purpose

This commit is a **pre-pilot cleanup baseline**. It is not paid-production ready. It is not RAG-verified yet. It is intended to preserve the current cleaned state before further deletion/refactor work.

## 2. Verified Working State

- Worker health endpoint verified (200)
- Auth 401 on protected endpoints verified
- Demo/seed data removed (0 rows across all 14 tables)
- Stripe billing disabled for pilot (mock checkout URL)
- Pricing CTAs route to Calendly demo booking
- `/book-demo` page created
- Arabic mojibake fixed:
  - 6 in-scope files fixed
  - 60 out-of-scope ENCODING_ONLY files kept
  - 5 mixed-state files reverted to HEAD (need manual targeted pass)
- Pinecone host corrected to HTTPS host
- Schema v4 migration applied (`documents` columns: `chunk_count`, `extracted_r2_key`, `indexed_at`)
- `_schema_version` includes v4 (2026-07-21)
- TypeScript typecheck passes (zero errors)

## 3. Not Verified / Not Ready

- **RAG not verified end-to-end** — 0 Pinecone vectors before live ingestion test
- Document upload → R2 → queue → Pinecone → chat test still required
- Real Stripe billing out of scope for ~2 months
- 5 mixed-state Arabic files need manual targeted pass (no whole-file W1252 round-trip)
- Admin incidents/companies may still be disabled or incomplete
- Security token (`cfut_LRh6****`) still exposed in `.env.local` and reports — needs rotation

## 4. Do Not Claim Yet

- Do not claim "production ready"
- Do not claim "paid client ready"
- Do not claim "AI trained on your documents" until RAG test passes
- Do not claim billing works

## 5. Next Planned Cleanup

- Review and delete unnecessary README/audit/fake/mock/dead files in a separate commit
- Do not do that deletion in this commit
- Use review-first deletion plan before removing files

## 6. Date

2026-07-21
