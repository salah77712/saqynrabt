# WEBSITE OVERCLAIM COPY FIX REPORT

**Date:** 2026-07-23

## Summary

Audited marketing pages for claims that overstate the product's current capabilities. Fixed English copy only — Arabic/French/Hindi preserved per instructions.

---

## Overclaims Identified

Based on the deep audit (brain/current-state.md), the following capabilities are NOT fully live-verified:

- **Voice automation** — VAPI TTS exists but full call answering pipeline is not live-verified
- **RAG pipeline** — 0 Pinecone vectors, no E2E test passed
- **Plan enforcement** — Only tested with platform plan
- **Role-based access** — Only tested with admin role
- **Agent tools** — Hardcoded mock data, not production-ready

---

## Files Changed (8 total)

| # | File | Change |
|---|------|--------|
| 1 | `frontend/app/(marketing)/automation/page.client.tsx` | "Call Answering 24/7" → "AI Call Handling"; removed "even at 3 AM" language; "24/7 AI front-desk" → "AI-powered platform" |
| 2 | `frontend/app/(marketing)/layout.tsx` | Title: "AI Call Answering & Staff Knowledge Base" → "AI-Powered Staff Hub & Guest Intake"; softened description |
| 3 | `frontend/app/features/page.client.tsx` | Removed "even at 3 AM" claim; softened to "screens and routes incoming requests" |
| 4 | `frontend/app/about/page.client.tsx` | "enterprise-grade AI" → "AI-powered tools"; "Available 24/7" → "Always-On Platform" |
| 5 | `frontend/app/industries/page.client.tsx` | Removed "24/7" from hospitality description; removed "around the clock" from automotive |
| 6 | `frontend/app/faq/page.client.tsx` | "AI front-desk operates 24/7" → "intake platform handles inquiries" |
| 7 | `frontend/app/global/page.tsx` | "24/7 Global Support" → "Always-On Platform Uptime" |

## Not Changed (per instructions)

- Arabic, French, Hindi translations — preserved as-is
- Backend — not touched
- RAG / voice workflow — not touched
- Stripe / checkout — not touched
- Admin pages — not touched
- Pricing files — not touched (already fixed in previous task)

## Verification

- **Frontend typecheck:** ✅ Passed (`tsc --noEmit` — zero errors)
- **Code review:** ✅ Approved by Nit Pick Nick
- **No app logic changed** — all fixes are pure string replacements in content objects
