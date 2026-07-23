# SAQYN RABT — Comprehensive Website Design Audit Report

**Auditor:** Senior Design Auditor (35 years experience)  
**Date:** 2026-07-23  
**Website:** https://saqynrabt.com  
**Total pages audited:** 75+
**Method:** Live page fetch + source code analysis per 10 parallel agents

---

## EXECUTIVE SUMMARY

| Category | Avg Score | Verdict |
|---|---|---|
| Public/Marketing Pages (12) | **5.4/10** | Competent template work. Zero brand identity. Heavy overclaims. |
| Auth Pages (4) | **8.5/10** | Strongest section. Custom-built, consistent, accessible. |
| Dashboard Pages (23) | **5.6/10** | Solid design system undermined by pervasive mock data. |
| Admin Pages (13) | **4.0/10** | 11/13 pages 100% fabricated data. Dangerous for a management tool. |
| Legal/Help/Dev (10) | **6.5/10** | Good legal writing. Missing pages. SEO issues. |
| **OVERALL** | **5.6/10** | **Competent craft, zero soul, dangerous overclaims.** |

---

## PART 1: DESIGN SYSTEM ASSESSMENT

### Typography: 8/10 ★ (Strongest asset)

Geist Sans + Geist Mono (Vercel typeface). Modern, technically excellent, variable font support, multiple weights preloaded. The type system alone carries the design above most competitors. The hierarchy is well-structured (`font-black` for headlines, `font-mono` for data, `tracking-widest` for labels).

**Deduction:** Geist is Vercel's font — 50,000+ Next.js sites use it. It fits but doesn't differentiate.

### Color System: 7/10

CSS-variable-driven theme with light/dark mode. No pure black, no neon, no oversaturated accents. Tokens follow a disciplined `--color-surface`, `--color-primary`, `--color-accent` pattern. Dark mode persists to localStorage with system preference fallback and no flash-of-wrong-theme.

**Deduction:** Conservative to the point of invisibility. The palette works but communicates nothing about the brand.

### Layout Philosophy: 5/10

Every marketing page follows the identical template: Centered hero → Feature card row (3 equal columns) → Pricing → FAQ. Zero asymmetry. Zero layout risk. Zero illustration or photography. Everything is text in boxes with `rounded-xl` borders. The 3-equal-card grid — the most generic SaaS pattern — appears on every single page.

### Component Quality: 6/10

shadcn/ui base components used consistently. `rounded-xl` cards, `shadow-sm` elevation, `min-h-[44px]` touch targets, backdrop-blur header, skip-to-content link. Technically solid. But no micro-interactions, no motion hierarchy, no tactile character. No spring physics, no perpetual micro-interactions, no staggered reveals.

### Anti-Pattern Compliance: 3/10

- ✅ No emojis on marketing pages (case studies use flag emojis ❌)
- ✅ No pure black
- ❌ AI cliché language: "Human-like Voice", "Intelligent Staff Hub", "AI-powered", "Seamless"
- ❌ The forced-Q naming ("Synthetiq") in a brand that already has a distinctive name
- ❌ 3-column equal card grids on every page
- ❌ Centered hero on every page
- ❌ Fake metrics and fabricated case studies
- ❌ "Real-time" badges on pages with mock data

---

## PART 2: PAGE-BY-PAGE SCORES

### A. Public / Marketing Pages (Score: 5.4/10)

| Page | Score | Highlights |
|------|-------|------------|
| `/` (Home) | **5.5** | Clean but anonymous. Generic centered hero. Zero visual distinctiveness. |
| `/features` | **6.1** | Well-structured but overclaims RAG, voice, dashboard integration. |
| `/how-it-works` | **5.9** | Text-only steps. No diagrams, no illustrations. Missed opportunity. |
| `/automation` | **5.9** | Live queue mock adds visual texture. Heavy voice overclaims. |
| `/chatbot` | **5.0** | **Worst offender.** Mock chat demo with fabricated answers. RAG claimed — Pinecone has 0 vectors. |
| `/pricing` | **6.0** | Clean cards. **CRITICAL: Live prices (2,999/4,999 QAR) don't match pricing-config.ts (1,499/2,499 QAR).** JSON-LD schema mislabels QAR as USD. CTAs correct → Calendly demo. |
| `/faq` | **7.0** | Clean accordion. Typo: "month-" should be "month-to-month". |
| `/book-demo` | **8.0** | **Strongest marketing page.** Focused, minimal, honest. 115-min typo on live page. |
| `/thank-you` | **7.0** | Clean. PartyPopper icon with bounce animation slightly casual for B2B. |
| `/about` | **4.0** | Wall of text. No team photos, no founders, no faces. Claims without proof. |
| `/contact` | **5.0** | Gmail contact (`saqynrabt@gmail.com`) for B2B SaaS. `/api/contact` route does not exist — form silently fails. |
| `/trust` | **3.0** | Claims ISO 27001 "In Progress" + SOC 2 with zero evidence. No certificates, no audit dates. |
| `/global` | **2.0** | **Worst page.** Claims 19 offices across 4 continents. Fabricated for a Qatar startup. Easily disproven. |
| `/industries` | **4.0** | Padded to 16 by splitting same verticals. Typos. Claims disconnected from reality. |
| `/case-studies` | **4.0** | **All 15 case studies are fabricated.** Every metric (60% fewer calls, 4.8 stars, 2× intake) is invented. No real company names. |
| `/marketplace` | **6.0** | Only 2 plugins (Slack, BambooHR). Honest but sparse. No SAP/Oracle claims. |
| `/changelog` | **7.0** | Clean timeline. Only 2 entries. v1.1.0 claims Stripe features that may not be verified. |

### B. Auth Pages (Score: 8.5/10) ★ Best section

| Page | Score | Highlights |
|------|-------|------------|
| `/sign-in` | **8.4** | Custom-built (not Clerk template). Clean card, 2FA inline, SSO with toast. |
| `/sign-up` | **8.1** | Password strength meter with animated progress bar. Live email validation. |
| `/forgot-password` | **8.7** | Minimal, focused. Security-best-practice vague success message. |
| `/onboarding` | **8.6** | 5-step wizard with localStorage persistence. Progress bar + percentage. Radio cards well-designed. |

**Strengths:** Dark mode + Arabic RTL in auth flows is rare at this quality. Custom Clerk integration with unified design system. Accessibility fundamentals (skip-to-content, aria-live, 44px touch targets, prefers-reduced-motion).  
**Weaknesses:** All 4 pages use same card-on-bg layout — "form factory" feeling. Sign-up form is long for single card. Error banner uses Tailwind default `bg-red-50` not brand token.

### C. Dashboard Pages (Score: 5.6/10)

| Page | Score | Highlights |
|------|-------|------------|
| `/dashboard` (main) | **8.0** | Clean metrics + onboarding steps. Trial guide dominates. |
| `/dashboard/chat` | **8.0** | Chat with knowledge gaps sidebar. Skeleton loading. Responsive. |
| `/dashboard/documents` | **7.0** | Upload zone + card grid + filters. Functional but basic. |
| `/dashboard/voice` | **5.0** | Feature gate. If env var not set, static disabled message. No call logs, no metrics. |
| `/dashboard/inbox` | **4.0** | 🔴 **Silent mock fallback.** `MOCK_MESSAGES` loads fake WhatsApp/email with Qatari phone numbers when API fails. "Last updated" timestamp even on mock data. |
| `/dashboard/workflows` | **5.0** | 🔴 **3 hardcoded nodes. No API. No persistence.** "Add" buttons update local state only. |
| `/dashboard/automation` | **6.0** | Live calls section + filters. Automation/workflows subpage has `mockNew` items. |
| `/dashboard/settings` | **5.0** | **Export logs generates fake CSV on API error.** |
| `/dashboard/settings/billing` | **4.0** | Stripe disabled. Static page about Qatari Law. "Manage Subscription" → generic Stripe homepage. |
| `/dashboard/settings/security` | **4.0** | MFA "Active" badge unverified. Reset password button does nothing. |
| `/dashboard/settings/api` | **8.0** | Functional CRUD. Good form design. |
| `/dashboard/settings/branding` | **8.0** | Clean. Unsaved changes modal. Keyboard shortcut. |
| `/dashboard/settings/integrations` | **4.0** | 3 hardcoded integrations (Slack, Teams, Zapier). Mock "Connected" badges. No SAP/Oracle. |
| `/dashboard/settings/webhooks` | **7.0** | Functional CRUD. Good. |
| `/dashboard/settings/team` | **0.0** | **404 — Does not exist.** |
| `/dashboard/profile` | **7.0** | Clerk + PATCH. Clean. |
| `/dashboard/approvals` | **5.0** | 🔴🔴 **Silent mock fallback with fake employees (Ahmed Al-Thani, Fatima Al-Harazi, John Doe).** Optimistic update on approve failure. |
| `/dashboard/hitl` | **2.0** | 🔴🔴🔴 **100% fake/hardcoded tasks. Zero API calls. Complete facade.** |
| `/dashboard/guardrails` | **4.0** | 🔴 **Toggles are local-only. Save shows success toast but does nothing.** |
| `/dashboard/analytics` | **6.0** | Real API call to usage-stats. Falls back to `MOCK_STATS` (fabricated MRR 189,450 QAR). Chart data hardcoded. |
| `/dashboard/reports` | **7.0** | **Only genuinely production-ready dashboard page.** Real API export with auth. |
| `/dashboard/ai-governance` | **4.0** | All values hardcoded. ISO 42001 badge decorative. No real pipeline. |

### D. Admin Pages (Score: 4.0/10) ★ Worst section

| Page | Score | Highlights |
|------|-------|------------|
| `/admin/companies` | **3.0** | CONFIRMED MOCK. 5 hardcoded companies (Al-Safa, Doha Clinical, etc.). Zero API calls. |
| `/admin/incidents` | **2.5** | CONFIRMED MOCK. 2 hardcoded incidents. Resolve is local-only. Backend queries non-existent DB tables. |
| `/admin/metrics` | **2.5** | CONFIRMED MOCK. `Math.random()` every 3s. Code comment: "Simulate real-time metrics fluctuates". |
| `/admin/usage` | **3.0** | CONFIRMED MOCK. Values hardcoded (184, 8,402, 3,892, 420). SVG chart is fixed bezier curve. |
| `/admin/audit` | **4.0** | CONFIRMED MOCK. 4 hardcoded audit logs. Best UI of mock pages but all fake. |
| `/admin/health` | **5.5** | PARTIALLY REAL. Calls `/api/health`. Fine. But backend incident queries reference non-existent tables. |
| `/admin/billing` | **3.5** | CONFIRMED MOCK. 3 hardcoded invoices. "Mark as Paid" modifies local state only. |
| `/admin/feature-flags` | **2.5** | CONFIRMED MOCK. 3 hardcoded flags. Zero persistence. Refresh = reset. |
| `/admin/client-success` | **3.5** | CONFIRMED MOCK. Scores (94, 78, 45) fabricated. "3 Accounts" badge hardcoded. |
| `/admin/integrations` | **5.5** | PARTIALLY REAL. Merge Link SDK works. But integrations start as mock "Connected". |
| `/dashboard/analytics` | **6.0** | PARTIALLY REAL. Real API call + MOCK_STATS fallback with fabricated MRR/ARR. |
| `/dashboard/reports` | **7.0** | REAL. Only production-ready page in entire admin suite. |
| `/dashboard/ai-governance` | **4.0** | MOCK. All hardcoded. |

### E. Legal / Help / Dev Pages (Score: 6.5/10)

| Page | Score | Highlights |
|------|-------|------------|
| `/privacy-policy` | **7.0** | Well-written. **🔴 Mentions Stripe as active payment processor — Stripe is disabled.** |
| `/terms-and-conditions` | **7.6** | Well-written. Section 3.1 bans prompt injection — smart. |
| `/cookie-policy` | **7.2** | Lists Redis server identifier as "strictly necessary cookie" — technically inaccurate. |
| `/security` | **0.0** | **404 — Does not exist.** Trust Center footer links to nowhere. |
| `/vulnerability-disclosure` | **0.0** | **404 — Does not exist.** |
| `/developers` | **6.4** | Claims JavaScript SDK + Python library. Neither found on npm/PyPI. No install commands. |
| `/developers/api-docs` | **5.6** | Documents only 2 endpoints. No auth flow, no error codes, no OpenAPI spec. "Swagger" link loops to same page. |
| `/help/getting-started` | **7.4** | Clean but no screenshots or UI mockups. Text-only. |
| `/help/automation` | **7.4** | Same as above. |
| `/help/chatbot` | **7.4** | Same as above. |

---

## PART 3: CRITICAL ISSUES BY SEVERITY

### 🔴🔴🔴 P0 — Legal & Compliance Risks

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| 1 | **Fake case studies with fabricated metrics** | `/case-studies` | 15 detailed case studies with specific metrics (60% fewer calls, 4.8 stars, 2× intake). No real customers exist. This is deceptive marketing — potential regulatory and liability risk. |
| 2 | **Fake global offices** | `/global` | 19 offices across 4 continents claimed. For a startup, this is misrepresentation. |
| 3 | **Stripe mentioned as active payment processor** | `/privacy-policy`, `/cookie-policy` | Privacy policy states "We process payments through Stripe" (present tense). Cookie policy lists Stripe cookies as "Strictly Necessary." Stripe IS DISABLED per project brain. Factually inaccurate legal documents. |
| 4 | **ISO 27001 / SOC 2 claimed without evidence** | `/trust`, footer | "ISO 27001 In Progress" + "SOC 2" with no certificates, no audit dates, no registrar. If a prospect verifies, this destroys trust. |
| 5 | **Security pages 404** | `/security`, `/vulnerability-disclosure` | Trust Center promotes security posture. These pages don't exist. |

### 🔴🔴 P1 — Business-Impacting Issues

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| 6 | **Pricing mismatch: live ≠ repo config** | `/pricing` | Live page shows Synthetiq Voice Core at 2,999 QAR and Synthetiq Work Core at 4,999 QAR. `pricing-config.ts` has Voice Starter at 1,499 QAR and Chatbot Starter at 2,499 QAR. Tier names don't exist in config. **The live deployment runs different code than the repo.** |
| 7 | **JSON-LD schema mislabels currency** | All pages | `price: "1499", priceCurrency: "USD"` embedded in all pages. No tier costs 1499 USD. This is Voice Starter's QAR price labeled as USD. |
| 8 | **Contact form silently fails** | `/contact` | POST to `/api/contact` — this route does not exist in the codebase. Form shows success but nothing happens. |
| 9 | **AI cliché copy across all marketing** | All marketing pages | "Human-like Voice", "Intelligent Staff Hub", "AI-powered", "automation." Says nothing unique about the product. |
| 10 | **Branded email not used** | `/contact` | `saqynrabt@gmail.com` for a B2B SaaS. Should be `hello@saqynrabt.com`. |

### 🔴 P2 — Product Credibility Issues

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| 11 | **RAG marketed as live — Pinecone has 0 vectors** | `/features`, `/chatbot` | "Upload your handbooks... AI answers from your documents." Pipeline never end-to-end tested. |
| 12 | **Voice automation marketed as operational** | `/features`, `/automation` | "AI answers every incoming call, even at 3 AM." Voice is partial — webhook only, agent tools are hardcoded mock data. |
| 13 | **SAP/Oracle claim not found (good)** | `/marketplace`, `/integrations` | Marketplace only lists Slack + BambooHR. No false SAP/Oracle claims on these pages. Homepage integration row may show logos but is generic. |
| 14 | **Dashboard mock data rot across 11+ pages** | See Part 2 Dashboard | Every admin page + 6 dashboard pages show fabricated data as real. Users believe they see real organizational data. |
| 15 | **Feature flags with zero persistence** | `/admin/feature-flags` | 3 toggles update local state only. Refresh = reset. Catastrophic if used as real feature flag system. |
| 16 | **HITL page is complete facade** | `/dashboard/hitl` | 100% fake, zero API calls. Two hardcoded tasks. "Claim" and "Resolve" update local state only. |
| 17 | **Approvals silently lies to users** | `/dashboard/approvals` | On API failure, loads fake employees (Ahmed Al-Thani, Fatima Al-Harazi, John Doe). Optimistic update on failure. User sees fake approvals as successful. |
| 18 | **Export logs silently fabricates data** | `/dashboard/settings` | On API error, generates hardcoded fake CSV with "Salah, Test question, Test answer." |
| 19 | **Guardrails Save does nothing** | `/dashboard/guardrails` | `handleSave` shows success toast, zero API calls. |
| 20 | **Missing Team settings page** | `/dashboard/settings/team` | 404. Does not exist. |

### 🟡 P3 — Design & UX Issues

| # | Issue | Where | Detail |
|---|-------|-------|--------|
| 21 | **No team page / no founder faces** | `/about` | Biggest trust gap. B2B SaaS without a team page is unusual. |
| 22 | **Missing page titles (SEO)** | 7 pages | Privacy, Terms, Developers, Help pages all use default layout title. |
| 23 | **Legal page dark mode risk** | All legal pages | `prose prose-slate` without `dark:` variants. May be illegible in dark mode. |
| 24 | **Help pages text-only** | 3 help pages | No screenshots, no annotated UI, no dashboard links. Increases support tickets. |
| 25 | **115-minute typo on book-demo** | `/book-demo` | Source says "15-minute intro call." Live shows "115-minute." Deployment mismatch. |
| 26 | **Industries typos** | `/industries` | "au digital door codes" (assign), "Au retainer fee" (Answer). |
| 27 | **Voice page is feature gate** | `/dashboard/voice` | Static "Voice Calls Not Enabled" message if env var not set. No configuration path. |
| 28 | **FAQ typo** | `/faq` | "month-" should be "month-to-month". |
| 29 | **FAQ answers hidden from crawlers** | `/faq` | Accordion initial state closed — search engines may not index answers. |

---

## PART 4: STRENGTHS (What Works)

1. **Auth pages (8.5/10)** — Custom-built Clerk integration with dark mode + Arabic RTL + accessibility. Best-in-class auth UX for a startup.

2. **Typography system** — Geist Sans + Mono is objectively excellent. The type system elevates every page it touches.

3. **Dark mode implementation** — LocalStorage-persisted with system preference fallback, no flash-of-wrong-theme. Flawless.

4. **Accessibility fundamentals** — Skip-to-content, `aria-live`, 44px touch targets, `prefers-reduced-motion`, `focus-visible` outlines. Rare for a startup.

5. **Design system consistency** — CSS variable tokens, consistent radii, consistent shadow system, shared component library. The visual language is coherent even when the data is fake.

6. **Multi-language support** — Arabic, French, Hindi with RTL switching. Genuine differentiator for the Qatar market.

7. **Responsive foundations** — `viewport-fit=cover`, safe-area-insets, responsive grids, clamp() typography. Mobile-ready foundation.

8. **`/dashboard/reports`** — The only production-ready authenticated page. Real API calls, proper auth, loading states, error handling.

9. **`/dashboard/settings/branding`** and **`/settings/api`** — Well-designed, functional CRUD pages.

---

## PART 5: THE SENIOR DESIGNER VERDICT

This is a tale of two codebases.

The **design system** is built by someone who knows modern frontend development: CSS variables, Geist typography, dark mode without flash, proper touch targets, responsive grids, i18n with RTL. These are non-trivial achievements. The auth flow is genuinely impressive — custom Clerk with an integrated design system, Arabic support, and password strength meters is well above startup average.

But the **marketing and dashboard content** was written and designed by someone who has never sold enterprise software.

**The pricing mismatch is the single most dangerous issue.** The live site serves prices that don't exist in the repo. This means either:
1. The deployment pipeline is broken (stale build)
2. Someone manually patched the live deployment
3. The repo config was changed without commit

Any of these is bad. Fix the deployment/repo sync immediately.

**The fake data is not a demo problem; it's a trust problem.** When a prospect signs up and sees hardcoded companies, fabricated revenue numbers (QAR 189,450 MRR), fake team members (Ahmed, Fatima, Sara), and a "real-time" dashboard that runs on `Math.random()`, they will not think "this is a demo." They will think "this product is fake." Some will laugh. Some will leave. Some may write about it.

**The case studies are a compliance risk.** Publishing 15 detailed case studies with specific metrics and zero real customers is not "aspirational marketing." It is fiction presented as fact. In regulated industries (which SAQYN RABT targets — healthcare, finance, real estate), this can have legal consequences.

**The brand identity is absent.** A distinctive name like "SAQYN RABT" paired with the most generic SaaS template on the market creates a cognitive dissonance. The design says "we are like everyone else." The name says "we are different." The name is right.

**The global offices page is the clearest signal of overreach.** 19 offices across 4 continents for what appears to be a 1-3 person Qatar startup. This will be the first thing a skeptical prospect verifies and the first thing that destroys credibility.

**Recommended immediate actions:**
1. Fix pricing sync between repo and live deployment
2. Remove or label case studies as "example scenarios"
3. Fix Stripe references in legal documents
4. Remove global offices page or reduce to honest presence
5. Add `/security` and `/vulnerability-disclosure` pages
6. Create team page with actual founders
7. Change contact email from Gmail to branded domain
8. Kill the mock data fallbacks — show honest empty states

The codebase has **real engineering talent** behind it. The gap is between technical competence and product honesty. Excellent craft does not excuse fabricated content. The fix is not to build more — it's to stop pretending, remove the lies, and let the actual product speak.

---

## PART 6: SCORE SUMMARY

| Section | Pages | Avg Score |
|---------|-------|-----------|
| Marketing Pages | 17 | 5.4 |
| Auth Pages | 4 | **8.5** |
| Dashboard Pages | 23 | 5.6 |
| Admin Pages | 13 | **4.0** |
| Legal/Help/Dev | 10 | 6.5 |
| **TOTAL** | **75+** | **5.6/10** |
