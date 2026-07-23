# PRICING CONSISTENCY FIX REPORT

**Date:** 2026-07-23

## Summary

Fixed a pricing mismatch on the `/pricing` page where hardcoded prices in `page.client.tsx` did not match the source-of-truth `pricing-config.ts`.

---

## Source of Truth

- **File:** `frontend/lib/pricing-config.ts`
- **Tiers defined:**
  - `AUTOMATION_TIERS` (Voice Automation): Starter, Growth, Professional
  - `CHATBOT_TIERS` (Staff Knowledge Hub): Starter, Growth, Enterprise

## What Was Wrong

The `/pricing` page (`frontend/app/pricing/page.client.tsx`) had **completely hardcoded** prices that did not match `pricing-config.ts`:

| Product | Old Hardcoded Price | pricing-config.ts Value |
|---------|-------------------|------------------------|
| Voice (Synthetiq Voice Core) | 2,999 QAR/mo + 4,999 QAR setup | Starter 1,499 / Growth 2,499 / Pro 4,499 QAR/mo + setup fees |
| Work (Synthetiq Work Core) | 4,999 QAR/mo + 6,999 QAR setup | Starter 2,999 / Growth 4,999 / Enterprise custom QAR/mo + setup fees |

The old page also had an interactive pricing calculator (employee count + API sync toggle) that calculated dynamic prices unrelated to the config.

## What Was Changed

**File modified:** `frontend/app/pricing/page.client.tsx`

1. Removed all hardcoded price values
2. Replaced with product tab switcher (Voice / Staff Knowledge Hub)
3. Each tab renders the `PricingCards` component with the corresponding tiers from `pricing-config.ts`
4. Enterprise Bundle section preserved as a separate callout with `/contact` CTA
5. All CTAs now route to:
   - `NEXT_PUBLIC_CALENDLY_URL` (or `https://calendly.com/saqynrabt/demo` as fallback) — for all non-enterprise tiers
   - `/contact` — for Enterprise/custom tiers
6. Removed interactive employee count and API sync widgets (were tied to old pricing model only)

## CTAs Verified

| Tier | CTA Target | Stripe? |
|------|-----------|---------|
| Non-enterprise tiers | `NEXT_PUBLIC_CALENDLY_URL` / Calendly | ❌ No |
| Enterprise / Custom | `/contact` | ❌ No |
| Book a Demo button | `NEXT_PUBLIC_CALENDLY_URL` / Calendly | ❌ No |

No Stripe URLs (`checkout.stripe.com`, `billing.stripe.com`, or mock checkout URLs) found anywhere in the pricing page.

## Verification

- **Frontend typecheck:** ✅ Passed (`npx tsc --noEmit` — zero errors)
- **Code review:** ✅ Approved

## Files Changed

- `frontend/app/pricing/page.client.tsx` — rewritten to use `pricing-config.ts` as source of truth

## Out of Scope (Not Modified)

- `backend/` — not touched
- `frontend/lib/pricing-config.ts` — source of truth, already correct
- `frontend/components/PricingCards.tsx` — already correct, now actually used
- Arabic translations — preserved via existing `ar` arrays in `pricing-config.ts`
- Features page — no pricing displayed there
- Marketing/industries pages — out of scope
- Admin pages — out of scope
- Stripe implementation — out of scope
- RAG / voice workflow — not touched
