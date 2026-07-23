# SAQYN Rabt — Changelog

## 2026-07-23 — Audit Correction: Fixed Overclaims in Deep Report

### What was corrected

Previous report overclaimed several statuses. Correction applied to brain files + report.

### Overclaims fixed

1. **RAG labeled "verified"** → Corrected to **CODE EXISTS — NOT LIVE VERIFIED**
   - Evidence: Pinecone has 0 vectors. No end-to-end upload→R2→queue→Pinecone→chat test has ever passed.

2. **Plan enforcement labeled "fully live verified"** → Corrected to **CODE EXISTS / PARTIAL — NOT FULLY LIVE VERIFIED**
   - Evidence: Only tested with `platform` plan. `chatbot` and `voice` plans have NOT been tested.

3. **Role-based access labeled "fully live verified"** → Corrected to **CODE EXISTS / PARTIAL — NOT FULLY LIVE VERIFIED**
   - Evidence: Only tested with admin role. Manager/employee/viewer JWTs have NOT been tested.

4. **Dashboard pages labeled "working"** → Corrected to **CODE EXISTS — 401 gate confirmed, no authenticated test**
   - Evidence: 401 response only proves auth middleware is deployed. No valid JWT test has confirmed correct data rendering.

5. **Verification method labels** → Precise language: "live verified via CLI/API" or "live verified via curl/wrangler/direct SQL" — not "MCP verified" unless actual MCP tool was used.

### Files updated
- `brain/current-state.md`
- `brain/changelog.md` (this entry)
- `brain/next-tasks.md`
- `brain/live-verification.md`
- Deep report text (corrected in conversation)

## 2026-07-23 — Home Page Honest Redesign

### What was done
Rewrote `frontend/app/page.client.tsx` — the home page hero and all sections — to align with backend reality and senior design principles.

### Changes from old page
**Removed (overclaims/mock):**
- "Total Business Automation" generic headline → specific loop message
- Integration pill badges (SAP, Oracle, Salesforce, Slack, Jira, HubSpot) — none are connected
- Mock SVG chat diagram (fake chat Q&A for Work product) — fabricated UX
- Mock SVG network diagram (fake voice routing) — fabricated UX
- Scroll-down arrow SVG — banned anti-pattern
- Product toggle in hero (AI Voice Agent / Internal HR Chatbot) — confusing dual focus
- Dual CTAs "Start Voice AI" + "View Plans" → single primary CTA "Book a Demo"

**Added (honest, specific):**
- Honest headline: "Calls come in. AI captures it. Your team gets it." — describes the real product loop
- Early Access / Pilot badge — honest about product stage
- Abstract flow diagram SVG (Caller → AI Voice → Team) — concept illustration, not mock UI
- "Book a Free Demo" as primary CTA — all routes to Calendly, consistent with Stripe-disabled rule
- How It Works section — 3-step asymmetric layout (not 3 equal columns)
- Two Products section — asymmetric grid (3:2 split), Product 1 larger + accent card, Product 2 smaller
- Honest feature lists for both products that match verified code state
- Honest CTA section: "We are in pilot. Book a demo and we will set up your workspace."
- "No payment required. No commitment." trust signal

**Kept:**
- Header, Footer, useLocale, useScrollReveal
- Design system tokens (colors, typography, spacing)
- Dark mode support
- Multi-language (en/ar/fr/hi)
- Accessibility (focus-visible, touch targets)

### Files changed
- `frontend/app/page.client.tsx` — fully rewritten (from 203 lines → 335 lines)

### Verification
- Typecheck: ✅ PASSED (zero errors)
- No overclaims added
- All CTAs → demo/Calendly, no Stripe

## 2026-07-23 — Marketing Page Overclaim Fixes

### Pages fixed (5 pages)

**1. /features** — Fixed 3 overclaiming feature card descriptions:
- Card 1: Removed "even at 3am" voice claim → "AI voice captures caller requests and creates trackable workflows"
- Card 2: Removed "the AI answers from your documents only" → "the AI helps find answers from your documents"
- Card 4: Removed "real time" and "Track calls, messages" → "Monitor workflows and activity from one dashboard"
- Fixed mojibake in all non-English translations

**2. /chatbot** — Fixed the worst overclaim page:
- Replaced mock chat demo (fabricated Q&A bubbles) with honest 3-step How It Works section
- Removed "RAG-powered AI trained on your HR policies" from hero → "A private AI assistant"
- Fixed capability cards: "learns instantly" → "queued for indexing", "finds the exact answer" → "searches to find relevant answers"
- Pricing subtitle: "private RAG setup" → "document upload"

**3. /automation** — Fixed voice/automation overclaims:
- "Live Queue" → "Example Queue Flow" with honest disclaimer, removed "Live" badge
- Softened "AI Call Handling", "Complaint Routing", "Booking Capture", "Live Transcripts"
- Pricing subtitle softened

**4. /how-it-works** — Fixed step overclaims and removed fake data:
- Removed "Global by Design" section (fabricated 6-city offices)
- Removed flagIcons and globalItems data objects
- Replaced with honest "Our Approach" section (4 cards: Remote-First, Multilingual, Partner Ecosystem, Hands-On)
- Steps 2/4/5: softened language about knowledge base, transcripts, go-live readiness

**5. /contact** — Fixed mojibake and contact info:
- Changed saqynrabt@gmail.com → hello@saqynrabt.com
- Changed "Global Operations" → "Qatar (Remote-First Team)"
- Fixed all mojibake Arabic/encoding issues in labels and text
- Demo Request form now redirects to Calendly (was posting to dead /api/contact)

**6. /about** — Fixed AI-sounding copy:
- Replaced 3 verbose paragraphs with honest, direct company description
- Changed trust badges to reflect reality (Qatar-Based, B2B SaaS, Pilot Phase, Remote-First)
- Removed overclaims about "voice pipelines tuned for dialects", "SLAs reflect real-world uptime"

### Files changed
- `frontend/app/features/page.client.tsx`
- `frontend/app/(marketing)/chatbot/page.client.tsx`
- `frontend/app/(marketing)/automation/page.client.tsx`
- `frontend/app/how-it-works/page.client.tsx`
- `frontend/app/contact/page.client.tsx`
- `frontend/app/about/page.client.tsx`
- `frontend/components/Footer.tsx` (email change)

### Verification
- Typecheck: ✅ PASSED (zero errors)
- No new overclaims introduced
- All CTAs → demo/Calendly

## 2026-07-23 — Remaining Pages Fixed

### Pages fixed (5 more pages + 2 legal)

**7. /global** — Removed fabricated presence in 20+ cities across 5 continents:
- Replaced "Global Headquarters. Serving the World." → "Qatar-Based. Building for the World."
- Removed 5 fake regions (Europe, Asia, Africa, Americas) and fake flag SVGs
- Replaced with 3 honest regions: Qatar (HQ), MENA (remote coverage), Global (remote team)
- Removed overclaim: "serving clients from Canada to Brazil", "GDPR-compliant data hosting"
- Changed stats from "16+ Industries / 4 Continents / 3 Data Regions" to reality

**8. /industries** — Fixed mojibake in ALL non-English translations:
- Completely rewrote corrupted FR and HI translations (were binary garbage)
- Fixed corrupted AR text with clean Arabic
- Fixed English typos: "au digital door codes" → "get digital door codes", "Au retainer" → "Answer retainer"
- Softened hero: removed "16 Industries Worldwide" → "Built for Front-Desk Operations Across Industries"
- Removed all corrupted hi/fr keys from hero section

**9. /case-studies** — Rewrote all 15 fabricated case studies:
- Removed specific real-sounding metrics ("60% fewer calls", "4.8 Star guest satisfaction", "40% revenue increase")
- Changed from "Real Results from Real Businesses" → "Example Use Cases"
- Added "Example Scenario — Pilot Phase" badge to all entries
- Replaced specific claims with honest, general descriptions of potential use
- Updated AR translations to match

**10. /privacy-policy** — Fixed Stripe and email references:
- saqynrabt@gmail.com → hello@saqynrabt.com (all 3 occurrences)
- Stripe payment processing noted as disabled: "Self-serve payments are currently disabled"

**11. /cookie-policy** — Fixed Stripe references:
- Removed "payment processing (via Stripe)" from Strictly Necessary cookies section
- Added note: "Self-serve payment processing is currently disabled and no payment cookies are set"
- Updated AR translation to match

**12. /about** — ([fixed in prior batch] AI-sounding copy replaced)

**13. /contact** — ([fixed in prior batch] mojibake + Gmail)

### Note on /trust page
No `frontend/app/trust/` directory exists. No trust page to fix.

## 2026-07-23 — Marketing Page Overclaim Fixes

### What was done

Ran 10 parallel agents to audit all 75+ live pages of saqynrabt.com. Each agent fetched pages from the live website, analyzed design against 7 criteria (atmosphere, color, typography, layout, components, anti-patterns, content honesty), and scored 1-10. Results compiled into `WEBSITE_DESIGN_AUDIT_REPORT.md`.

### Overall score: 5.6/10

### Section scores
- Marketing pages (17): **5.4/10** — Competent template, zero brand identity, heavy overclaims
- Auth pages (4): **8.5/10** ★ — Custom Clerk, strong accessibility, Arabic RTL
- Dashboard pages (23): **5.6/10** — Solid design system, pervasive mock data
- Admin pages (13): **4.0/10** — 11/13 pages 100% fabricated data
- Legal/Help/Dev (10): **6.5/10** — Good legal writing, missing pages, SEO issues

### Critical findings
1. **Pricing mismatch confirmed** — live page 2,999/4,999 QAR ≠ pricing-config.ts 1,499/2,499 QAR (also noted in pricing fix entry)
2. **JSON-LD schema wrong** — QAR 1,499 labeled as USD on all pages
3. **Fake case studies** — all 15 case studies fabricated with metrics, no real customers
4. **Stripe mentioned as active** in privacy/cookie policies — Stripe IS disabled
5. **Global offices fabricated** — 19 offices across 4 continents claimed
6. **ISO 27001/SOC 2 claimed without evidence** — no certificates, audit dates, registrar
7. **Security + vulnerability pages 404** — Trust Center links to nowhere
8. **RAG marketed as live** — Pinecone has 0 vectors
9. **Voice marketed as operational** — partial only, not end-to-end verified
10. **Admin suite is a facade** — 11/13 pages 100% mock data
11. **HITL is complete facade** — zero API calls, hardcoded tasks
12. **Approvals silently lies** — mock fallback + optimistic update on failure
13. **Guardrails Save does nothing** — success toast with zero API calls
14. **Export logs fabricates CSV** — fake data on API error
15. **Gmail contact** for B2B SaaS instead of branded domain
16. **No team page** — no founders or employee faces

### Strengths identified
- Auth pages: best section (8.5/10) — custom-built, accessible, bilingual
- Typography: Geist Sans + Mono elevates every page
- Dark mode: flawless implementation
- Accessibility: skip-to-content, ARIA, touch targets
- Multi-language: Arabic, French, Hindi with RTL
- `/dashboard/reports`: the only production-ready authenticated page

### Files created
- `WEBSITE_DESIGN_AUDIT_REPORT.md` — comprehensive 75+ page audit

### Brain files updated
- `brain/changelog.md` (this entry)
- `brain/current-state.md`
- `brain/next-tasks.md`

## 2026-07-23 — Frontend Bug Fixes

### What was done

Fixed 16+ frontend bugs across 14 files in 5 categories:

**Bug #1 — `window.Clerk` anti-pattern (7 files):**
- Replaced `window.Clerk.session.getToken()` with `useAuth().getToken()` in `admin/security/incidents`, `dashboard/privacy`, `dashboard/legal-accept`, `dashboard/team`, `dashboard/reports`, and `CookieConsentBanner`
- All files were already `'use client'` and could use the proper React hook

**Bug #2 — Mock data fallbacks removed (4 files):**
- `analytics/page.tsx`: Removed `MOCK_STATS` (QAR 189,450 MRR, 114 active companies — all fake). Shows honest `EmptyState` on API failure
- `inbox/page.tsx`: Removed `MOCK_MESSAGES` (hardcoded fake conversations). Shows error with retry button
- `approvals/page.tsx`: Removed mock employee fallback on API error. Shows error toast instead of silently simulating success

**Bug #3 — Empty catch blocks fixed (3 files):**
- `voice/page.tsx`: Added `pollError` state surfaced in UI as "Could not reach voice service"
- `chat/page.tsx`: Added `console.warn` with error info; `handleRefresh` now actually refreshes (was fake 800ms timeout)

**Bug #4 — API keys DELETE URL mismatch (2 files):**
- Frontend: Changed `DELETE /api/api-keys?id=xxx` → `DELETE /api/api-keys/xxx` (proper REST path)
- BFF: DELETE handler reads ID from `pathname` instead of `searchParams`

**Bug #5 — Reports page uses local toast instead of global:**
- Replaced local `useState<... | null>` toast + custom `<Toast>` component with `useGlobalToast().addToast()`

**Bug #6 — Admin integrations hardcoded demo data:**
- Removed `'demo-link-token-123'` default — starts empty, fetched from backend

### Files changed
- 14 files across dashboard, admin, components, and API routes
- `FRONTEND_BUG_FIX_REPORT.md` — created

### Verification
- Frontend typecheck: ✅ PASSED (zero errors)

## 2026-07-23 — Pricing Consistency Fix

### What was done

- Discovered `frontend/app/pricing/page.client.tsx` had **hardcoded prices** (Voice: 2,999 QAR, Work: 4,999 QAR) that did not match `frontend/lib/pricing-config.ts` (Voice Starter 1,499 / Growth 2,499 / Pro 4,499 QAR, Chatbot Starter 2,999 / Growth 4,999 QAR)
- Rewrote the pricing page to use `PricingCards` component with `AUTOMATION_TIERS` and `CHATBOT_TIERS` from `pricing-config.ts` as source of truth
- Added product tab switcher (Voice Automation / Staff Knowledge Hub)
- Removed interactive employee count and API sync widgets (tied to old pricing model)
- All CTAs verified: Calendly/demo only — no Stripe/checkout URLs

### Files changed
- `frontend/app/pricing/page.client.tsx` — rewritten
- `PRICING_CONSISTENCY_FIX_REPORT.md` — created

### Verification
- Frontend typecheck: ✅ PASSED
- Code review: ✅ Approved
- No app code outside pricing touched

## 2026-07-23 — Brain Relocation to Root `brain/`

### What was done

- Created root `brain/` directory (repo root) as permanent project brain home
- Copied all 9 brain files from `temp_files/brain/` → `brain/`
- Verified all 9 checksums match (SHA256) and `diff -r` returns zero differences
- Updated `.gitignore`: removed `brain/` from ignore list (commented out); `temp_files/` remains ignored
- Deleted `temp_files/brain/` (user-approved option B)
- Created `BRAIN_LOCATION_NORMALIZATION_REPORT.md` documenting the full process

### Location change
- **Old:** `temp_files/brain/` (temporary/nested — risk of deletion by future cleanup)
- **New:** `brain/` (durable repo-root location — obvious and stable)

### Files updated
- `.gitignore` — un-ignored `brain/`, kept `temp_files/` ignored
- `BRAIN_LOCATION_NORMALIZATION_REPORT.md` — created
- `brain/current-state.md`, `brain/changelog.md`, `brain/next-tasks.md`, `brain/live-verification.md` — corrected with honest statuses

### Post-deletion verified
- `temp_files/brain/` GONE ✅
- `brain/` exists with all 9 files ✅
- `brain/` not gitignored ✅
- `temp_files/` other contents preserved ✅
- No app code changed ✅

## 2026-07-23 — Admin Purge Security Fix

### Changes
- **routes.ts**: Added `requireRole('admin')` middleware to `/admin/purge` route (was unprotected at middleware level)
- **purge.ts**: Removed reference to non-existent `approvals` table; added comment explaining skip
- Created `ADMIN_PURGE_SECURITY_VERIFICATION.md` — live verification report
- Created `FULL_WEBSITE_CURRENT_CONTEXT_AND_VERIFICATION_AUDIT.md` — full website audit

### Live Verification (via CLI/API)
- `/api/admin/purge` handler checked via live HTTP: 403 returned without `X-Admin-Secret` ✅
- Handler-level `X-Admin-Secret` protection confirmed working ✅
- Middleware `requireRole('admin')` needs deploy to activate ✅
- TypeScript typecheck passes with zero errors ✅

### Not Verified
- Fix not deployed (per user instruction — deploy separately)
- Admin secret rotation not performed

## 2026-07-23 — Invite + Signup Inheritance Fix

### Changes
- **webhooks.ts**: Read `role` from `company_members` invite (was hardcoded to 'employee'); pass invite's role to Clerk metadata update and employees INSERT/UPDATE
- **onboarding.ts**: Before creating new company, check `company_members` by email for pending invite; if found, inherit `company_id` + `role`, skip company creation
- **approvals.ts**: Call `sendInvitationEmail()` after creating invite record (was defined but never called)
- Created `INVITE_SIGNUP_INHERITANCE_FIX_REPORT.md`

### Live State
- All three handlers deployed to `api.saqynrabt.com`
- Health/wakeup endpoints functional
- `GET /api/public/check-invite` working

### Not Verified
- End-to-end invite → signup → dashboard flow (needs fresh valid Clerk JWT)
- Email delivery via Resend (EMAIL_API_KEY configured but not tested)
- Full live verification (needs fresh valid JWT)
- Plan enforcement (needs non-platform plan in DB)
- Role-based access (needs multi-role test users)
- Knowledge scope separation (not implemented)
- Permission management UI (not implemented)
- Voice automation pipeline (not integrated)
- RAG verification chain (not verified end-to-end)

## 2026-07-22 — Onboarding & Auth Fix

### Changes
- Fixed Clerk metadata API call: POST → PATCH on /v1/users/{id}/metadata
- Added idempotent re-onboarding (returns {already_existed: true})
- verifyJWT: added company_id lookup from employees table by clerk_user_id
- verifyJWT: added role lookup from employees table by clerk_user_id
- verifyJWT: removed duplicate neon() initialization
- Migration v6: added plan_key column to company_entitlements (default 'platform')
- Created requirePlanFeature() and requireCompany() middleware
- Created PLAN_FEATURES map (chatbot/voice/platform)
- Updated 24 routes with plan feature gates
- Created LockedPage component for locked modules
- Created module-map.ts central config
- Created dashboard profile page
- Rewrote DashboardSidebar to accept navModules prop
- Rewrote MobileBottomNav to consume navModules prop
- Deleted stale DashboardLayoutClient.tsx

### Live State
- CLERK_SECRET_KEY set on Worker ✅
- JWT verification works with valid tokens ✅
- Expired tokens correctly rejected ✅
- Migrations v6 applied ✅
- All routes plan-gated in code
- Onboarding returns correct status
- Health endpoints functional
