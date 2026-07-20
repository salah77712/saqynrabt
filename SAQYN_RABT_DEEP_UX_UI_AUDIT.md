# SAQYN RABT — Complete UX/UI/Product/Design System Audit

> **Auditor:** Senior Product Designer & Design Systems Architect  
> **Date:** July 2026  
> **Scope:** Full frontend codebase — 84 pages, 77 components, 34 API routes, 4 layouts, 2 design token files  
> **Methodology:** Codebase inspection, component analysis, page-by-page review, design token audit

---

## Table of Contents

1. [Full Page Inventory](#1-full-page-inventory)
2. [Architecture & Framework Analysis](#2-architecture--framework-analysis)
3. [Design Token Audit](#3-design-token-audit)
4. [Layout System Analysis](#4-layout-system-analysis)
5. [Global Design System Problems](#5-global-design-system-problems)
6. [Page-by-Page Audit](#6-page-by-page-audit)
7. [Component Inventory & Duplicates](#7-component-inventory--duplicates)
8. [Accessibility Issues](#8-accessibility-issues)
9. [Responsive Issues](#9-responsive-issues)
10. [Technical Debt](#10-technical-debt)
11. [Recommended Design System](#11-recommended-design-system)
12. [Recommended Information Architecture](#12-recommended-information-architecture)
13. [Redesign Priority Roadmap](#13-redesign-priority-roadmap)
14. [Pages to Delete or Merge](#14-pages-to-delete-or-merge)
15. [Implementation Plan](#15-implementation-plan)

---

## 1. Full Page Inventory

### Marketing / Public Pages (25 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/` | Home / Marketing Hero | Primary marketing landing page | Keep | High |
| `/about` | About Us | Company info | Keep | Low |
| `/features` | Features Overview | Product features listing | Keep | Medium |
| `/pricing` | Pricing Plans | Pricing tiers | Keep | High |
| `/faq` | FAQ | Frequently asked questions | Keep | Low |
| `/how-it-works` | How It Works | Product explanation | Keep | Medium |
| `/contact` | Contact | Contact form | Keep | Low |
| `/industries` | Industries | Industry verticals | Keep | Low |
| `/marketplace` | Marketplace | Integration marketplace | Keep | Low |
| `/changelog` | Changelog | Release notes | Keep | Low |
| `/case-studies` | Case Studies | Customer stories | Keep | Low |
| `/case-studies/[slug]` | Case Study Detail | Individual case study | Keep | Low |
| `/thank-you` | Thank You | Post-signup/conversion | Keep | Low |
| `/ai-chatbot` | AI Chatbot (standalone) | Chatbot marketing page | **Merge** | Low |
| `/synthetiq-voice` | Synthetiq Voice | Voice AI marketing | **Merge** | Low |
| `/synthetiq-work` | Synthetiq Work | Workflow AI marketing | **Merge** | Low |
| `/voice-agent` | Voice Agent | Voice agent marketing | **Merge** | Low |
| `/cookie-policy` | Cookie Policy | Legal | Keep | Low |
| `/privacy-policy` | Privacy Policy | Legal | Keep | Low |
| `/terms-and-conditions` | Terms & Conditions | Legal | Keep | Low |
| `/global` | Global Page (unclear purpose) | Unknown | **Delete/Review** | Low |
| `/sitemap` | Sitemap | SEO | Keep | Low |
| `/portal/privacy` | Portal Privacy | Privacy for guest portal | Keep | Low |

### Marketing Grouped Routes (sub-routes under `(marketing)/`)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/chatbot` | Chatbot (marketing) | Chatbot feature page | Keep | Low |
| `/automation` | Automation (marketing) | Automation feature page | Keep | Low |
| `/trust` | Trust & Security | Trust page | Keep | Low |
| `/legal/terms` | Terms (MDX) | Legal | Keep | Low |
| `/legal/privacy` | Privacy (MDX) | Legal | Keep | Low |
| `/legal/security` | Security (MDX) | Legal | Keep | Low |
| `/legal/nda` | NDA | Legal | Keep | Low |
| `/legal/dpa` | DPA | Legal | Keep | Low |
| `/legal/vulnerability-disclosure` | Vulnerability Disclosure | Legal | Keep | Low |

### Developer Pages (4 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/developers` | Developers Hub | API docs landing | Keep | Low |
| `/developers/api-docs` | API Documentation | API reference | Keep | Low |
| `/developers/cli` | CLI Tools | CLI reference | Keep | Low |
| `/developers/plugins` | Plugins | Plugin docs | Keep | Low |

### Help Pages (4 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/help/getting-started` | Getting Started | Help docs | Keep | Low |
| `/help/chatbot` | Chatbot Help | Help docs | Keep | Low |
| `/help/automation` | Automation Help | Help docs | Keep | Low |
| `/help/billing` | Billing Help | Help docs | Keep | Low |

### Authentication Pages (4 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/sign-in` | Sign In | Login | Keep | Critical |
| `/sign-up` | Sign Up | Registration | Keep | Critical |
| `/forgot-password` | Forgot Password | Password reset | Keep | High |
| `/onboarding` | Onboarding | Post-signup setup | Keep | High |

### Dashboard Pages (21 routes + subpages)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/dashboard` | Dashboard Overview | Main dashboard | **Redesign** | Critical |
| `/dashboard/analytics` | Analytics | Usage analytics | **Redesign** | High |
| `/dashboard/reports` | Reports | Report exports | **Simplify** | Medium |
| `/dashboard/inbox` | Inbox | Omnichannel inbox | **Redesign** | High |
| `/dashboard/chat` | Staff Knowledge Chat | Core AI chat | **Redesign** | Critical |
| `/dashboard/voice` | Voice Calls | Voice AI status | **Simplify** | Medium |
| `/dashboard/documents` | Document Library | Document management | **Redesign** | Critical |
| `/dashboard/workflows` | Workflow Builder | Automation workflows | **Simplify** | Low |
| `/dashboard/automation` | Automation Center | Queue/automation | **Redesign** | Critical |
| `/dashboard/automation/workflows` | Automation Workflows | Nested workflows | **Simplify** | Low |
| `/dashboard/approvals` | Approvals | Employee approvals | **Merge** into Team | Medium |
| `/dashboard/guardrails` | AI Guardrails | Safety filters | **Keep** | Medium |
| `/dashboard/ai-governance` | AI Governance | Model oversight | **Keep** | Low |
| `/dashboard/hitl` | Human-in-the-Loop | Review queue | **Keep** | Medium |
| `/dashboard/privacy` | Privacy | Data privacy controls | **Keep** | Low |
| `/dashboard/legal-accept` | Legal Acceptance | Legal consent | **Keep** | Low |
| `/dashboard/team` | Team Management | People management | **Redesign** | Critical |
| `/dashboard/team/pending` | Pending Invites | Sub-page | **Merge** into Team | Low |
| `/dashboard/team/employees` | Employee List | Sub-page | **Merge** into Team | Low |

### Dashboard Settings Pages (12 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/dashboard/settings` | Settings Hub | Tab container | **Redesign** | High |
| `/dashboard/settings/billing` | Billing | Subscription info | **Merge** | Medium |
| `/dashboard/settings/api` | API Keys | Developer credentials | **Keep** | Medium |
| `/dashboard/settings/security` | Security | MFA, password | **Keep** | High |
| `/dashboard/settings/sso` | SSO | Single sign-on | **Delete** (shell) | Low |
| `/dashboard/settings/roles` | Roles | Permission roles | **Keep** | Medium |
| `/dashboard/settings/integrations` | Integrations | Third-party integrations | **Keep** | Medium |
| `/dashboard/settings/webhooks` | Webhooks | Outgoing webhooks | **Keep** | Low |
| `/dashboard/settings/prompts` | Prompt Management | AI prompts | **Keep** | Low |
| `/dashboard/settings/branding` | Branding | White-label | **Keep** | Low |
| `/dashboard/settings/reports` | Report Settings | Report config | **Delete** (duplicate) | Low |
| `/dashboard/settings/ab-tests` | A/B Tests | Experimentation | **Delete** (shell) | Low |

### Admin Pages (12 routes)

| Route | Page Name | Purpose | Status | Priority |
|-------|-----------|---------|--------|----------|
| `/admin/audit` | Audit Logs | Security audit | **Redesign** | High |
| `/admin/billing` | Billing Admin | Platform billing | **Simplify** | Low |
| `/admin/clients` | Client Management | Tenant management | **Simplify** | Medium |
| `/admin/client-success` | Client Success | CS dashboard | **Simplify** | Low |
| `/admin/companies` | Companies | Company listing | **Simplify** | Medium |
| `/admin/feature-flags` | Feature Flags | Toggle management | **Keep** | Medium |
| `/admin/health` | System Health | System status | **Keep** | Medium |
| `/admin/incidents` | Incidents | Incident tracking | **Merge** | Medium |
| `/admin/integrations` | Admin Integrations | Platform integrations | **Keep** | Low |
| `/admin/metrics` | Platform Metrics | Global metrics | **Merge** with Usage | Medium |
| `/admin/security/incidents` | Security Incidents | Security events | **Merge** | Medium |
| `/admin/usage` | Usage Analytics | Tenant usage | **Keep** | High |

---

## 2. Architecture & Framework Analysis

### Stack
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Auth:** Clerk (`@clerk/nextjs@^7.5.20`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Base UI:** Base UI React (`@base-ui/react@^1.6.0`)
- **Animation:** Framer Motion (`framer-motion@^12.42.2`)
- **Icons:** Lucide React
- **Data:** TanStack Query v5
- **Charts:** Recharts
- **Font:** Geist (Sans + Mono)
- **Forms:** Native HTML (no form library)
- **State:** React Context (3 providers)
- **Build:** PostCSS + Autoprefixer

### Key Observations
1. **CSS is Unstable** — Tailwind v4 uses `@import "tailwindcss"` instead of the legacy `@tailwind` directives. The `globals.css` uses the new `@theme` block for tokens. However, the `tailwind.config.js` still exists and defines the same tokens via CSS variables. This creates **two sources of truth** for design tokens.

2. **Internationalization is Ad-Hoc** — Every page manually imports `useLocale` from providers and uses inline `t()` helpers. There are `messages/en.json` files but **they are not used anywhere**. Translation is done via inline object lookups (`obj[locale] || obj.en || ''`), creating massive duplication.

3. **No Form Library** — Forms use raw HTML inputs with manual validation. The invite form, guardrails form, and API key form all use different patterns. Error handling is inconsistent.

4. **Component Duplication** — `Badge` exists in both `components/shadcn/badge.tsx` and `components/ui/Badge.tsx`. `ui/Badge.tsx` is the one actually used. `shadcn/badge.tsx` is dead code.

5. **Loading/Error Pattern is Inconsistent** — Some pages use `Skeleton`, some use `LoadingSpinner`, some have inline `animate-pulse` divs. Error states vary from `EmptyState` component to inline JSX to raw text.

6. **Mock Data is Everywhere** — Pages like `inbox`, `approvals`, `hitl`, `guardrails`, `admin/audit`, `admin/metrics`, `admin/usage` all contain hardcoded mock data with fallbacks when API calls fail. This is OK for development but makes it hard to tell what's real vs placeholder.

---

## 3. Design Token Audit

### Current State

The project has design tokens defined in **two places** that partially overlap:

**`globals.css`** (via `@theme` block):
- Colors: `--color-background`, `--color-foreground`, `--color-primary`, `--color-surface`, `--color-accent`, `--color-muted`, `--color-border`, `--color-success`, `--color-warning`, `--color-danger`, `--color-info`
- Radius: `--radius: 0.75rem`
- Shadows: `--shadow-geo`, `--shadow-geo-hover`, `--shadow-glow`, `--shadow-glow-strong`, `--shadow-elevation-low`, `--shadow-elevation-mid`, `--shadow-elevation-high`
- Spacing: `--section-gap-sm`, `--section-gap-md`, `--section-gap-lg`, `--spacing-pill`
- Typography: `--fs-xs` through `--fs-6xl`

**`tailwind.config.js`**:
- Maps CSS variables to Tailwind utility classes
- Defines custom keyframes and animations

### Problems

| Problem | Evidence | Impact |
|---------|----------|--------|
| Two source of truth | `globals.css` defines tokens, `tailwind.config.js` duplicates them | Confusion, drift |
| Body type is too small | `--fs-base: 0.875rem` (14px) | Unreadable for staff |
| Too many font sizes | 10 size steps from `0.625rem` to `3.75rem` | Complexity without clarity |
| Shadow names are unclear | `geo`, `geo-hover`, `glow`, `glow-strong` | What do these mean? |
| No elevation scale | Shadows mixed between elevation and glow concepts | No systematic hierarchy |
| Border radius is single | Only `--radius` (12px) defined | Cannot do sharp or pillvariants |
| Color names are semantic but incomplete | No `--color-error`, `--color-on-surface`, etc. | Missing tokens |
| No spacing scale | Only `section-gap` and `pill` spacing | Pages use arbitrary p-4, p-6, p-8 |
| Dark mode colors differ | Accent changes from `#2A5CFF` to `#4CC9F0` | Brand confusion in dark mode |
| Glass effects in CSS | `.glass`, `.glass-dark`, `.glow-accent` utility classes | Decorative, not B2B |

### Specific Inconsistencies Found

| File | Line | Issue |
|------|------|-------|
| `dashboard/layout.tsx` | 133 | `bg-black/60` — hardcoded color, no token |
| `dashboard/layout.tsx` | 153 | `border border-primary/10` — uses border utility + opacity |
| `admin/audit/page.tsx` | 166 | `divide-[#141F33]/10` — raw hex color |
| `admin/audit/page.tsx` | 137 | `shadow-card` — undefined class |
| `dashboard/analytics/page.tsx` | 141 | `contentStyle={{ borderRadius: 12 }}` — inline style |
| `dashboard/team/page.tsx` | 146 | Same button class for both Make Admin and Demote |
| `components/dashboard/DashboardSidebar.tsx` | 79-80 | `border-s-4 border-accent` — hardcoded border width |
| `components/shadcn/button.tsx` | 11 | `bg-gradient-to-b from-accent to-primary` — gradient buttons |
| `app/globals.css` | 4-14 | `@theme` block with no spacing or opacity scale |

---

## 4. Layout System Analysis

### Current Layouts

| Layout | File | Pattern | Problems |
|--------|------|---------|----------|
| Root Layout | `app/layout.tsx` | Wraps everything, adds fonts, providers, toast, keyboard shortcuts, offline banner, cookie consent, page transitions | Overloaded with features, heavy wrapper |
| Marketing Layout | `app/(marketing)/layout.tsx` | Empty wrapper, just sets metadata | Could have shared nav/footer |
| Dashboard Layout | `app/dashboard/layout.tsx` | Sidebar + DesktopHeader + MobileHeader + MobileBottomNav + content area | Mixed concerns, fetches data, complex state |
| Admin Layout | `app/admin/layout.tsx` | Same pattern as dashboard but simpler | Duplicate sidebar code from dashboard |

### Problems

1. **Dashboard Layout is too complex** — It fetches employee data, manages sidebar state, handles role-based routing, checks email verification, and manages swipe handlers. This should be split into smaller concerns.

2. **Sidebar code is duplicated** — `DashboardSidebar.tsx` and `admin/layout.tsx` both implement a sidebar with nearly identical patterns. Both use `UserButton`, render menu items, handle RTL.

3. **Max-width constraint** — `max-w-6xl mx-auto` on all content pages artificially constrains content on wide screens. Analytics dashboards and data tables benefit from full-width layouts.

4. **No consistent app shell** — Each page manages its own padding (`p-4 md:p-8 lg:p-8`), spacing, and structure independently. Some pages wrap in `<main id="main-content">`, others don't.

5. **Mobile bottom nav is always rendered** — `MobileBottomNav` is always present in the dashboard layout, even on desktop. It's hidden via CSS rather than conditionally rendered.

6. **Scroll containers** — The main content area uses `overflow-y-auto` with `p-4 md:p-8 lg:p-8` which means scrollbar position varies between mobile and desktop.

---

## 5. Global Design System Problems

### 5.1 Visual Design

| # | Problem | Severity | Examples |
|---|---------|----------|----------|
| 1 | Inconsistent border styles | High | `border-primary/10`, `border-[hex]/10`, `ring-1 ring-primary/10`, `border-surface`, no border |
| 2 | Too many card variants | High | `Card component (ring-1)`, `div with border`, `div with shadow`, `div with both` |
| 3 | Gradient buttons | Medium | `button.tsx` uses gradient, all other buttons use flat colors |
| 4 | Unnecessary animations | Medium | `hover:scale-[1.02]` on every button, `animate-fadeIn` on every page, `animate-pulse` on status dots |
| 5 | Glass effects in dashboard | Medium | `bg-surface/95 backdrop-blur-xl` on sidebar, `bg-black/60 backdrop-blur-sm` on overlay |
| 6 | Shadow inconsistency | High | `shadow-sm`, `shadow-xl`, `shadow-card`, `shadow-geo`, `shadow-elevation-mid` all used in same context |
| 7 | Radius inconsistency | Medium | `rounded-xl` (12px everywhere), `rounded-2xl` (16px in card component), `rounded-lg` in some spots |
| 8 | Color overload | Medium | Text uses `text-primary`, `text-navy`, `text-royal`, `text-accent` interchangeably |
| 9 | No visual hierarchy for data | High | All text is similar weight and size, difficult to scan metrics |

### 5.2 Typography

| # | Problem | Severity | Examples |
|---|---------|----------|----------|
| 1 | Body text too small (14px / 0.875rem) | Critical | All pages use `text-xs` (12px) as primary content |
| 2 | Labels at 10px everywhere | High | `text-[10px]` on descriptions, labels, secondary text |
| 3 | Overuse of uppercase | Medium | Labels, descriptions, badges all uppercase with `tracking-wider` |
| 4 | Font weight inconsistency | High | Mix of `font-bold`, `font-extrabold`, `font-semibold`, `font-medium` |
| 5 | No responsive text scale | Medium | `text-xs md:text-sm` pattern is inconsistent |
| 6 | Tight line height on body | Medium | `leading-relaxed` on 12px text at 1.625 creates readability issues |

### 5.3 Component Inconsistencies

| # | Problem | Severity |
|---|---------|----------|
| 1 | Two Badge components | High — `shadcn/badge.tsx` and `ui/Badge.tsx` |
| 2 | Two tooltip implementations | Medium — `ui/Tooltip.tsx` exists but isn't used consistently |
| 3 | Toast from library vs inline | Medium — `GlobalToast` + `Toast` component + manual `useGlobalToast` |
| 4 | Button variant naming | High — `variant="default"` does gradient, no solid option |
| 5 | Card component not used consistently | High — Most pages build their own card divs |
| 6 | No shared table component | High — Each page with a table builds its own HTML |
| 7 | No shared page header component | High — Every page has inline `<h1>` + `<p>` structure |
| 8 | No shared status badge component | High — Statuses rendered as raw spans, Badge variants, inline colored divs |

---

## 6. Page-by-Page Audit

### Marketing Home (`/`)

**Problems:**
- UX: Heavy hero section with gradient text, decorative blur orbs, and floating elements. This is a consumer marketing pattern, not enterprise.
- UI: Uses `text-gradient` and `shimmer-text` classes. Overly decorative for a B2B SaaS product.
- Copy: Too generic. "Secure AI-powered automation" doesn't differentiate.
- Layout: Full-page hero with limited information density. Too much whitespace.
- Responsiveness: Decorative elements (`top-10 start-12 w-24 h-24` floating squares) break on mobile.

**Recommendation:** Keep, but simplify. Remove blurred orbs, gradient text, and floating decorative elements. Focus on concrete value proposition for hotels/clinics. Use clean typography and real screenshots.

---

### Dashboard Overview (`/dashboard`)

**Problems:**
- UX: **Critical problem.** The page is dominated by trial/freemium content (wizard checklist, trial balance card) that takes up the entire first viewport. A paying customer would be confused by "Illusion Balance" and trial wizards.
- UI: Layout is a mix of cards with different styles: `rounded-xl bg-primary text-surface shadow-xl` for the trial card, `rounded-xl bg-surface border border-primary/10 shadow-sm` for the checklist. No visual consistency.
- Typography: `text-[10px]` everywhere — labels, descriptions, even important content like "Questions Answered Today".
- Copy: "Illusion Balance" is unclear. The trial wizard text is verbose and overwhelming.
- Primary action: Unclear. The user has multiple CTAs in the trial card, plus the Quick Actions section, plus the metric cards.
- Information density: Too many competing sections: page title, trial badge, trial card, trial checklist, metrics, quick actions, usage cards.

**Recommendation:** Split into two views: (1) Normal dashboard without trial content, (2) Trial onboarding wizard as a separate experience. Remove "Illusion Balance" concept. Reorganize metrics into a proper 4-column metric grid. Make the primary action obvious.

---

### Staff Knowledge Chat (`/dashboard/chat`)

**Problems:**
- UX: Chat is inside a Card component (`p-0 h-[500px] xl:h-[650px]`). This fixed height is problematic — it clips content and the card-within-card pattern is wrong.
- UI: Knowledge gaps panel is completely hidden on mobile (only accessible via icon button). On desktop it's in a separate column, visually disconnected from the chat flow.
- Interaction: `h-[500px]` means users must scroll inside a nested container. Chat should be full-height or flex-fill.
- Copy: The welcome message is very long. First message should be shorter and more helpful.
- Empty state: The welcome message is rendered as a system message that's filtered out. There's no true empty state.
- The knowledge gaps modal "Upload Document" button navigates nowhere specific.

**Recommendation:** Full-height layout, not card-inside-card. Integrate knowledge gaps into the chat flow (inline suggestions, not a side panel). Make the input bar sticky at the bottom. Reduce welcome message length.

---

### Document Library (`/dashboard/documents`)

**Problems:**
- UX: No proper file table/list. Only a card grid (`DocumentGrid`). No sort options, no date columns, no size info.
- Upload area: Takes 50% of the viewport. While visually prominent, it's too large for regular use. Should be a compact button.
- Delete confirmation: Uses a shadcn Dialog which is good, but the dialog styling is inconsistent (inline `rounded-xl p-8`).
- Search: Placed at the top right, which is fine, but search only checks document name. No full-text search across document content.
- Empty state: `EmptyDocumentsState` is used when no documents exist after filtering. Good pattern.

**Recommendation:** Add a proper table view (name, date uploaded, pages, status). Keep the card grid as an alternative view. Make upload a compact button + drag-and-drop zone. Add document preview. Show indexing status for each document.

---

### Automation Center (`/dashboard/automation`)

**Problems:**
- UX: The "Live Customer Calls" section and "filtered requests" section are disconnected. The page feels like two separate features merged.
- UI: `AutomationFilters` component exists but has no search icon visible. Filter chips are inconsistent with other pages.
- Data: Active calls are shown with raw transcript slices which may contain sensitive customer data.
- Empty state: Two different empty state components: `EmptyAutomationState` and `EmptyState`. The empty state for no requests shows "No pending requests. Everything's running smoothly." which is helpful.
- Mobile: Uses separate card-based layout on mobile vs `AutomationQueue` table on desktop. This pattern of duplicating HTML for mobile/desktop is fragile.

**Recommendation:** Separate "Live Calls" from "Queue/Requests" into distinct sections or tabs. Add proper call detail view. Remove raw transcript preview from list view.

---

### Inbox (`/dashboard/inbox`)

**Problems:**
- UX: **Mock data only.** No real API integration feeds this page. Messages are hardcoded.
- UI: The filter chips are styled inconsistently with other pages (different padding, hover effects).
- Layout: `p-8` on the inbox card is excessive for message content. Messages get lost in whitespace.
- The page refreshes every 15 seconds but there's no data source.
- The `lastUpdated` timestamp shows but is meaningless with mock data.

**Recommendation:** Either implement real WhatsApp/SMS/Email integration or remove the page. When real, redesign as a proper inbox with message threads, not a flat list.

---

### Team Management (`/dashboard/team`)

**Problems:**
- UX: Duplicates "Approvals" page. Both `/dashboard/team` and `/dashboard/approvals` manage employee approval flows.
- UI: `TeamTable` is a custom component but it's not used consistently. Mobile uses inline card rendering.
- Invite modal: Basic but works. However, there's no role selection during invite.
- Search: The search input uses raw HTML (not the `Input` component) with `focus:ring-2 focus:ring-accent`.
- Button labels: "Make Admin" / "Demote" use the same styling — should have visual distinction for destructive actions.

**Recommendation:** Merge with `/dashboard/approvals`. Add role selection to invite flow. Use proper destructive button styling for revoke/suspend actions. Add batch actions (select multiple pending invites and approve all).

---

### Settings Hub (`/dashboard/settings`)

**Problems:**
- UX: The tab pattern embeds full pages as tab content (`<SecuritySettingsPage />` and `<IntegrationsSettingsPage />`). These pages have their own `<h1>` and layout which is hidden with CSS `[&_h1]:hidden`. This is a major anti-pattern.
- UI: The settings tabs are basic buttons, not connected to URL state. Refreshing the page resets to default tab.
- Content: "Overage Protection" is a single checkbox on a full Settings page. This content could be a single settings row, not an entire page section.
- Navigation: The tab UI disappears on mobile, replaced by a `<select>` dropdown. This is functional but inconsistent with desktop UX.

**Recommendation:** Settings should use a sidebar navigation (not tabs) for better scalability. Each section should be a separate URL: `/dashboard/settings/general`, `/dashboard/settings/billing`, etc. Merge the embedded subpages properly. Avoid hiding page content with CSS.

---

### Admin Console (`/admin/*`)

**Problems:**
- UX: 12 admin pages but most contain only mock data and basic table views. The admin panel lacks real operational utility.
- UI: Admin sidebar has only 4 menu items but there are 12 page directories. Many pages are unreachable via navigation.
- The "Staff Console" page header is static text, not dynamic based on sub-route.
- `admin/layout.tsx` duplicates dashboard sidebar code (UserButton, menu items, RTL handling).

**Recommendation:** Reduce to 4-5 useful admin pages. Create a unified admin dashboard instead of individual pages. Use the same sidebar component as the dashboard with different menu items.

---

### AI Governance (`/dashboard/ai-governance`)

**Problems:**
- UX: All data is hardcoded. This is a static info page with no interactivity.
- UI: The three cards show "Model Inventory", "Decisions Audit", and "Bias Evaluation" but none of them do anything. The "ISO 42001 Standard" badge implies compliance but there's no evidence.
- The page has no actions, no refresh, no real data. It's a marketing claim displayed inside the product.

**Recommendation:** Either connect to real data (model versions, audit counts, fairness metrics) or remove/hide from navigation until implemented. Marketing claims inside the product dashboard erode trust.

---

### Guardrails (`/dashboard/guardrails`)

**Problems:**
- UX: The toggle form looks OK but `handleSave` just shows a toast without actually saving. The knowledge gaps section is a duplicate of the one in the chat page.
- UI: Toggle switches are built from scratch (not using a Switch component from shadcn/ui or base-ui). The custom toggle has `sr-only peer` pattern.
- "Last updated" timestamp shows but the data never changes because it's polling an API that returns nothing.

**Recommendation:** Connect to real backend endpoints. Use a proper Switch component. Remove duplicate knowledge-gaps section (chat page already shows this).

---

### Workflow Builder (`/dashboard/workflows`)

**Problems:**
- UX: This is a static visualization of hardcoded nodes. There is no drag-and-drop, no editing, no real workflow logic.
- UI: Cards with `border-royal/35 border-2` use an undefined color `royal`. The arrow connectors use `rotate-90 md:rotate-0` which breaks on mobile.
- The page is essentially a mockup of a workflow builder, not a functional feature.

**Recommendation:** Delete or mark as "Coming Soon". A non-functional workflow builder is worse than no builder.

---

### Analytics (`/dashboard/analytics`)

**Problems:**
- UX: The metrics shown (MRR, ARR, active companies) are **platform-wide sales metrics**, not dashboard analytics relevant to a single tenant. A hotel manager doesn't care about MRR.
- UI: Charts use static mock data (`[{ hour: '0h', value: 40 }]`). The chart styling overrides Tooltip and axis styles inconsistently.
- The "Active Nodes" badge is placed in the header but doesn't mean anything in context.
- The page title says "Analytics" but shows billing/MRR metrics. This page doesn't serve the intended audience.

**Recommendation:** Redesign to show tenant-level analytics: message volume over time, popular topics, knowledge gaps trending, employee adoption rates, response accuracy metrics.

---

### Voice (`/dashboard/voice`)

**Problems:**
- UX: Shows a status indicator (connected/disconnected) with an icon. There's no interactivity — no call controls, no call history, no configuration.
- Hidden behind a feature flag: `NEXT_PUBLIC_VOICE_AI_ACTIVATED`. If disabled, shows a "Voice Calls Not Enabled" message which is a dead end.
- Polling every 5 seconds is aggressive for a page that shows no real-time data.

**Recommendation:** Add call management capabilities: recent calls, call details, transcript view, configuration options. Remove the 5-second poll. Only show the page when voice is enabled.

---

### Reports (`/dashboard/reports`)

**Problems:**
- UX: Three identical cards with different export options. The cards show PDF, CSV, and Excel but all call the same `/api/export-logs` endpoint with different format params.
- The "Executive Audit PDF" vs "Chat History CSV" vs "Usage Ledger Excel" distinction is unclear — what's the difference?
- No preview of what will be exported. No date range picker.

**Recommendation:** Simplify to a single export page with format picker, date range selector, and data type selector. Remove the three-card pattern which is just decorative.

---

### HITL Review Queue (`/dashboard/hitl`)

**Problems:**
- UX: Mock data only. The claim/resolve workflow is demonstrated but not functional.
- UI: The task status badge uses different colors for `claimed` vs `pending` but there's no legend.
- The empty state says "Nothing needs review right now" but there's no way to know if that means the system is working or just has no data.

**Recommendation:** Connect to real AI confidence-scoring data. Add task detail view. Show confidence scores and AI reasoning alongside each task.

---

### Authentication Pages

**Problems:**
- UX: Uses Clerk's pre-built components (`<SignIn />`, `<SignUp />`), which is fine functionally but the styling is inconsistent with the app. Clerk's default UI has different spacing, fonts, and colors.
- `opencode.json` and `AGENTS.md` mention `@clerk/nextjs@6.39.5` but `package.json` has `^7.5.20`. This should be synchronized.
- The `forgot-password` page exists but there's no link to it from the sign-in page.

**Recommendation:** Customize Clerk components to match the app's design system. Add explicit link between sign-in and forgot-password. Keep Clerk for auth handling but style consistently.

---

## 7. Component Inventory & Duplicates

### Duplicated Components

| Component | File 1 | File 2 | Action |
|-----------|--------|--------|--------|
| Badge | `components/shadcn/badge.tsx` | `components/ui/Badge.tsx` | Delete `shadcn/badge.tsx` (unused) |
| Tooltip | `components/ui/Tooltip.tsx` | — | Only one file, but barely used |
| Toast | `components/GlobalToast.tsx` | `components/ui/Toast.tsx` | Merge into one |
| Input | `components/ui/Input.tsx` | Inline `<input>` elements | Use Input component everywhere |
| Skeleton | `components/ui/Skeleton.tsx` | Inline `animate-pulse` divs | Use Skeleton component everywhere |
| Empty State | `components/ui/EmptyState.tsx` | Inline empty state divs | Use EmptyState component everywhere |
| Card | `components/shadcn/card.tsx` | Inline `div` cards | Use Card component everywhere |

### Missing Components

| Component | Needed For | Priority |
|-----------|------------|----------|
| `PageHeader` | Every page needs consistent title + description + actions | Critical |
| `DataTable` | Admin audit, team, approvals, documents | Critical |
| `FilterBar` | Inbox, automation, documents, analytics | High |
| `SearchInput` | Team, documents, audit, settings | High |
| `StatusBadge` | Status indicators across all pages | High |
| `MetricGrid` | Dashboard overview, analytics | High |
| `ActivityTimeline` | Dashboard activity, audit logs | Medium |
| `DetailDrawer` | Guest/customer detail view | Medium |
| `FormField` | All forms (invite, API key, guardrails) | High |
| `LoadingState` | Consistent loading UI | Critical |
| `ErrorState` | Consistent error UI | Critical |
| `EmptyState` (improved) | Consistent empty states | Critical |
| `ConfirmDialog` | Delete confirmations, destructive actions | High |
| `FileDropZone` | Document upload | Medium |
| `AvatarGroup` | Team page, multi-user contexts | Low |
| `Breadcrumbs` | Deeper navigation hierarchy | Low |
| `CommandMenu` | Power users, quick actions | Low |

---

## 8. Accessibility Issues

### Critical

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | Color contrast ratio unknown | All pages — `text-primary/60` on `bg-surface` (#F8F9FB + #718096 at 60% opacity) | Test and ensure 4.5:1 minimum |
| 2 | Text too small to read | All body text at `text-xs` (12px) and `text-[10px]` | Minimum 16px for body |
| 3 | No skip-to-main on dashboard pages | `dashboard/layout.tsx` doesn't wrap `<main id="main-content">` | Add skip link |
| 4 | Keyboard navigation gaps | Some interactive elements use `div` with `onClick` but no `tabIndex` or `role` | Add proper roles and keyboard handlers |
| 5 | Focus indicators inconsistent | Some elements use `focus:ring-2 focus:ring-accent`, others use `focus-visible` | Standardize focus styling |

### High

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 6 | Touch targets too small on mobile | Filter chips, option buttons at `py-1 px-3` | Minimum 44x44px touch targets |
| 7 | Labels not associated with inputs | Some forms use placeholder as only label | Add explicit labels |
| 8 | Color-only status indicators | Green/red status badges without text distinction | Add icon or text alongside color |
| 9 | Icon-only buttons without labels | Chat page gap sheet trigger, mobile menu | Add `aria-label` |
| 10 | `sr-only` skip link but no tab navigation | Root layout has skip link but some pages lack main landmark | Add `<main>` with id consistently |

### Medium

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 11 | Dynamic content updates without announcements | Chat messages, automation queue | Add `aria-live` regions |
| 12 | `prefers-reduced-motion` respected but limited | globals.css has `@media (prefers-reduced-motion: reduce)` but animation-heavy pages | Audit all animations |
| 13 | Table headers missing `scope` attribute | Some inline tables | Add `scope="col"` |
| 14 | Form errors not programmatically linked | Invite form uses `aria-describedby` but other forms don't | Consistent error announcements |
| 15 | Loading states not announced by screen readers | Inline `animate-pulse` divs | Add `role="status"` and `aria-busy` |

---

## 9. Responsive Issues

| # | Issue | Location | Fix |
|---|-------|----------|-----|
| 1 | Page padding too large on mobile | `p-8` on most pages (2rem on 360px screen) | Use responsive padding `p-4 md:p-6 lg:p-8` |
| 2 | Tables overflow without horizontal scroll | Team, approvals, admin audit | Add `overflow-x-auto` containers |
| 3 | Sidebar takes full width on mobile | `w-64` sidebar + `-translate-x-full` | This is acceptable but opening animation could be faster |
| 4 | Card grids don't stack well | 4-column grids become 2-column then 1-column | Current pattern `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` is correct |
| 5 | Chat page fixed height | `h-[500px] xl:h-[650px]` on desktop | Use `min-h-screen` or `dvh` units |
| 6 | Settings page mobile dropdown | Tabs become `<select>` dropdown | Acceptable but loses visual context |
| 7 | Mobile bottom nav always rendered | Even on desktop, `MobileBottomNav` renders (hidden via CSS) | Conditionally render |
| 8 | Filter chips wrap poorly | `flex gap-3` without wrapping | Add `flex-wrap` |
| 9 | Inbox messages use fixed padding | `p-8` on message items is too much for mobile | Reduce padding |

---

## 10. Technical Debt

| # | Debt | File/Area | Fix |
|---|------|-----------|-----|
| 1 | Two Tailwind config sources | `globals.css` + `tailwind.config.js` | Consolidate into `globals.css` only (Tailwind v4) |
| 2 | Inline translation system | Every page has `t = (obj) => obj[locale]` | Use actual i18n library (next-intl, react-i18next) |
| 3 | Mock data fallbacks | `inbox`, `hitl`, `admin/*`, `guardrails`, `analytics` | Remove or flag mock data in config |
| 4 | CSS dead code | `.glass`, `.glass-dark`, `.glow-accent`, `.text-gradient`, `.shimmer-text`, `animate-float`, `animate-rainbow` | Remove B2B-unused classes |
| 5 | Unused shadcn components | `shadcn/badge.tsx` | Delete |
| 6 | Hardcoded hex colors | `[#141F33]`, `[#2A5CFF]`, `royal` (undefined) | Replace with CSS variable references |
| 7 | Duplicate menu item arrays | `dashboard/layout.tsx` (lines 42-48) and `DashboardSidebar.tsx` | Single source of truth |
| 8 | URL-unaware tab state | Settings tabs reset on page refresh | Use URL search params or sub-routes |
| 9 | Inline styles on interactive elements | `contentStyle={{ borderRadius: 12 }}` in analytics charts | Use CSS classes |
| 10 | `window.Clerk` direct access | Various files use `(window as any).Clerk` | Use `useAuth()` hook |
| 11 | Magic numbers in CSS | `h-[500px]`, `w-72`, `[1.4fr_0.6fr]` grid templates | Use semantic values |
| 12 | Uneven loading state coverage | Some pages have Skeletons, some have spinners, some have nothing | Standardize |

---

## 11. Recommended Design System

### 11.1 Design Principles

1. **Clarity Above Decoration** — Every pixel serves a purpose. Remove decorative gradients, glass effects, and animations that don't aid understanding.
2. **One Primary Action Per Page** — Every page has one thing the user should do. That thing is visually prominent. Everything else is secondary.
3. **Operational Speed Over Visual Novelty** — Design for tired receptionists and busy managers. Fast scanning, clear hierarchies, predictable patterns.
4. **AI Assists, Doesn't Distract** — AI features are labeled clearly, confidence scores are shown, and users always know when they're talking to AI vs human.
5. **Trust Through Consistency** — Same component looks the same everywhere. Same spacing everywhere. Same patterns everywhere.
6. **Accessibility Is Not Optional** — 16px minimum body text, 4.5:1 contrast, keyboard navigation, screen reader support.
7. **Data Density Done Right** — Information-rich but not overwhelming. Use proper tables, clear metric cards, and meaningful data visualization.

### 11.2 Visual Language

#### Colors
```
Primary:    #1A1D29   (dark navy, replaces #141F33 with slightly warmer tone)
Surface:    #FFFFFF   (white)
Background: #F5F6F8   (light gray, replaces #F8F9FB)
Accent:     #2563EB   (blue-600, standard, replaces custom #2A5CFF)
Success:    #059669   (emerald-600)
Warning:    #D97706   (amber-600)
Danger:     #DC2626   (red-600)
Info:       #0284C7   (sky-600)

Dark mode:
Primary:    #F8FAFC
Surface:    #1E293B
Background: #0F172A
Accent:     #60A5FA
```

#### Typography Scale
```
--fs-body: 1rem      (16px)  — body text
--fs-sm:   0.875rem  (14px)  — labels, secondary text
--fs-xs:   0.75rem   (12px)  — captions, metadata (NOT for body)
--fs-lg:   1.125rem  (18px)  — large body
--fs-xl:   1.25rem   (20px)  — sub-headings
--fs-2xl:  1.5rem    (24px)  — page titles
--fs-3xl:  1.875rem  (30px)  — hero titles
```

#### Spacing
```
--space-1:  0.25rem   (4px)
--space-2:  0.5rem    (8px)
--space-3:  0.75rem   (12px)
--space-4:  1rem      (16px)
--space-6:  1.5rem    (24px)
--space-8:  2rem      (32px)
--space-12: 3rem      (48px)
--space-16: 4rem      (64px)
```

#### Border Radius
```
--radius-sm:  0.375rem  (6px)   — inputs, badges
--radius-md:  0.5rem    (8px)   — cards, buttons  
--radius-lg:  0.75rem   (12px)  — modals, containers
--radius-xl:  1rem      (16px)  — large modals
```

#### Elevation (Shadows)
```
--shadow-1: 0px 1px 2px rgba(26, 29, 41, 0.06)
--shadow-2: 0px 2px 8px rgba(26, 29, 41, 0.08)
--shadow-3: 0px 8px 24px rgba(26, 29, 41, 0.10)
--shadow-4: 0px 16px 48px rgba(26, 29, 41, 0.12)
```

#### Animation
Only 3 animation types, all respecting `prefers-reduced-motion`:
- `fade-in` (200ms) — for modals, sheets
- `slide-up` (200ms) — for toasts, notifications
- None for hover states (use opacity/color transitions only)

### 11.3 Layout Patterns

Every page follows:
```
+--------------------------------------------+
| PageHeader                                  |
|   <title line>                              |
|   <description line>                        |
|   <actions (optional)>                      |
+--------------------------------------------+
| ContentArea                                 |
|   [Loading State | Error State | Empty     |
|    State | Actual Content]                  |
+--------------------------------------------+
```

#### Master Layouts

1. **Auth Layout** — Centered card, minimal, no sidebar
2. **Dashboard Layout** — Sidebar + Topbar + Content. Sidebar is always visible on desktop, drawer on mobile.
3. **Table/List Layout** — PageHeader + FilterBar + SearchBar + DataTable + Pagination
4. **Detail Page Layout** — PageHeader + Back button + Metadata + Detail content
5. **Settings Layout** — Minimal sidebar (settings nav) + Content area
6. **Chat Layout** — Full-height, sidebar hidden, message list + input bar
7. **Analytics Layout** — PageHeader + MetricGrid + Charts (full width)
8. **Empty/Error Layout** — Centered state illustration + message + action

---

## 12. Recommended Information Architecture

### Unified Dashboard Navigation

```
SAQYN RABT
├── Dashboard              ← Overview, key metrics, recent activity
├── Queue                  ← Guest intake, automation queue, live calls
│   ├── Live Queue
│   ├── Automation
│   └── Workflows
├── Knowledge Hub          ← Documents, AI chat
│   ├── Chat
│   └── Documents
├── Guests / Customers     ← Guest management, history
├── Team                   ← People, roles, approvals, invites
├── AI Agents              ← AI configuration, guardrails, governance
│   ├── Guardrails
│   ├── AI Governance
│   └── HITL Review
├── Analytics              ← Usage, reports, insights
│   ├── Usage Analytics
│   └── Reports
├── Logs                   ← Audit trail, activity
├── Integrations           ← API keys, webhooks, third-party
└── Settings               ← General, billing, security, team
    ├── General
    ├── Billing
    ├── Security
    ├── API Keys
    └── Integrations
```

### Page Consolidation

| Current | Proposed | Reason |
|---------|----------|--------|
| `/dashboard/approvals` | Merge into `/team` | Same thing |
| `/dashboard/team/pending` | Merge into `/team` | Sub-filter |
| `/dashboard/team/employees` | Merge into `/team` | Sub-filter |
| `/dashboard/inbox` | Merge into `/queue` | Same workflow |
| `/dashboard/voice` | Merge into `/queue` | Part of automation |
| `/dashboard/workflows` | Merge into `/queue` | Workflow builder |
| `/dashboard/automation` | Merge into `/queue` | Queue management |
| `/dashboard/reports` | Merge into `/analytics` | Same reporting |
| `/dashboard/ai-governance` | Merge into `/settings` | Config, not daily |
| `/dashboard/guardrails` | Merge into `/settings` | Config, not daily |
| `/dashboard/privacy` | Merge into `/settings` | Config |
| `/dashboard/legal-accept` | Merge into `/settings` | One-time action |
| `/dashboard/settings/billing` | Merge into `/settings/` | Already settings |
| `/dashboard/settings/api` | Merge into `/settings/` | Already settings |
| 6 `(marketing)/legal/*` | Keep but consolidate | Legal docs |
| `/synthetiq-voice` | Delete (redirect to features) | Duplicate |
| `/synthetiq-work` | Delete (redirect to features) | Duplicate |
| `/voice-agent` | Delete (redirect to features) | Duplicate |
| `/ai-chatbot` | Delete (redirect to features) | Duplicate |
| `/admin/security/incidents` | Merge into `/admin/incidents` | Duplicate |
| `/admin/metrics` | Merge into `/admin/usage` | Duplicate |

---

## 13. Redesign Priority Roadmap

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Establish design system and component library

1. Consolidate CSS variables into single `globals.css` (remove `tailwind.config.js` overlap)
2. Set body text to 16px minimum
3. Remove decorative CSS classes (glass, glow, gradient text, rainbow, float, spring-in)
4. Rebuild core components:
   - `PageHeader` (consistent title + description + actions)
   - `DataTable` (sort, paginate, select, responsive)
   - `MetricCard` (label, value, trend)
   - `StatusBadge` (all status variants)
   - `EmptyState` (improved with illustration slot)
   - `LoadingState` (consistent skeleton)
   - `ErrorState` (retry pattern)
   - `ConfirmDialog` (destructive action confirmation)
5. Create unified Button (remove gradient default, add solid default)

### Phase 2: Core Redesign (Weeks 3-4)

**Goal:** Redesign the most-used pages

1. **Dashboard Overview** — Remove trial wizard, clean metrics, proper layout
2. **Dashboard Layout + Sidebar** — Updated navigation, proper mobile
3. **Chat** — Full-height layout, proper message design, integrated gaps
4. **Documents** — Table view + grid view, proper upload
5. **Team** — Merged with approvals, role management, proper invite flow
6. **Automation/Queue** — Proper queue layout, live call detail

### Phase 3: Secondary Pages (Weeks 5-6)

**Goal:** Consistent experience across all pages

1. **Settings** — URL-based sections, proper sidebar nav
2. **Analytics** — Tenant-relevant metrics, real data
3. **Admin Console** — Reduce to 4-5 pages, unified layout
4. **Guardrails** — Real toggle functionality
5. **HITL** — Real data from confidence scoring
6. **Inbox** — Real integration or remove from nav

### Phase 4: Polish (Weeks 7-8)

**Goal:** Accessibility, consistency, performance

1. Full accessibility audit and fixes
2. Keyboard navigation pass
3. Screen reader testing
4. Mobile optimization pass
5. Animation audit (reduce, simplify)
6. Remove all mock data fallbacks or flag them
7. Implement i18n properly (not inline objects)

---

## 14. Pages to Delete or Merge

### Delete (shell pages with no value)

| Page | Reason |
|------|--------|
| `/dashboard/settings/sso` | Empty shell |
| `/dashboard/settings/ab-tests` | Empty shell |
| `/dashboard/settings/reports` | Duplicate of `/dashboard/reports` |
| `/synthetiq-voice` | Duplicate of `/features` |
| `/synthetiq-work` | Duplicate of `/features` |
| `/voice-agent` | Duplicate of `/features` |
| `/ai-chatbot` | Duplicate of `/features` |

### Merge

| Pages | Into | Reason |
|-------|------|--------|
| `/dashboard/approvals` + `/dashboard/team` | `/team` | Same workflow |
| `/dashboard/team/pending` + `/dashboard/team` | `/team?tab=pending` | Sub-filter |
| `/dashboard/team/employees` + `/dashboard/team` | `/team` | Already on same page |
| `/dashboard/inbox` + `/dashboard/automation` | `/queue` | Queue management |
| `/dashboard/voice` + `/dashboard/automation` | `/queue` | Call management |
| `/dashboard/workflows` + `/dashboard/automation` | `/queue` | Workflow config |
| `/dashboard/reports` + `/dashboard/analytics` | `/analytics` | Reporting |
| `/dashboard/ai-governance` + `/dashboard/settings` | `/settings` | Configuration |
| `/dashboard/guardrails` + `/dashboard/settings` | `/settings` | Configuration |
| `/dashboard/privacy` + `/dashboard/settings` | `/settings` | Configuration |
| `/admin/metrics` + `/admin/usage` | `/admin/usage` | Duplicate analytics |
| `/admin/security/incidents` + `/admin/incidents` | `/admin/incidents` | Same type |
| 4 separate `(marketing)/legal/*` MDX | Single `/legal` with tabs | Consolidate |

---

## 15. Implementation Plan

### Files to Create

```
components/
├── ui2/                        (new design system directory)
│   ├── PageHeader.tsx          — Every page header
│   ├── DataTable.tsx           — Sortable, paginated, responsive table
│   ├── MetricCard.tsx          — Dashboard metric display
│   ├── StatusBadge.tsx         — Unified status component
│   ├── ConfirmDialog.tsx       — Destructive action confirmation
│   ├── SearchInput.tsx         — Consistent search input
│   ├── FilterBar.tsx           — Filter chips/buttons
│   └── Layout.tsx              — Unified app shell
```

### Files to Edit

```
High priority:
├── app/globals.css             — Consolidate design tokens, remove decorative CSS
├── app/dashboard/layout.tsx    — Simplify, extract logic
├── components/shadcn/button.tsx — Remove gradient default
├── components/shadcn/card.tsx  — Simplify, consistent with rest of app
├── components/dashboard/DashboardSidebar.tsx — Redesign
├── components/dashboard/DashboardMobileHeader.tsx — Redesign
├── components/dashboard/MobileBottomNav.tsx — Conditionally render

Medium priority:
├── app/dashboard/page.tsx      — Redesign (remove trial wizard from main view)
├── app/dashboard/chat/page.tsx — Full-height layout
├── app/dashboard/documents/page.tsx — Add table view
├── app/dashboard/team/page.tsx — Merge approvals
├── app/dashboard/automation/page.tsx — Redesign queue
├── app/dashboard/analytics/page.tsx — Real analytics
├── app/dashboard/settings/page.tsx — URL-based sections
├── app/admin/layout.tsx        — Share sidebar component with dashboard
```

### Files to Delete

```
components/shadcn/badge.tsx     (unused — ui/Badge.tsx is the one used)
app/dashboard/settings/sso/page.tsx
app/dashboard/settings/ab-tests/page.tsx
app/dashboard/settings/reports/page.tsx
app/synthetiq-voice/ (entire directory)
app/synthetiq-work/ (entire directory)
app/voice-agent/ (entire directory)
app/ai-chatbot/ (entire directory)
```

### CSS/Tailwind Changes

1. Remove `tailwind.config.js` — use only `globals.css` `@theme` block
2. Set `--fs-base: 1rem` (16px)
3. Remove `.glass`, `.glass-dark`, `.glow-accent`, `.text-gradient`, `.shimmer-text` classes
4. Remove `animate-float`, `animate-rainbow`, `animate-spring-in` keyframes
5. Remove `shadow-geo`, `shadow-geo-hover`, `shadow-glow`, `shadow-glow-strong`
6. Add semantic shadow scale: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
7. Add spacing scale: `--space-1` through `--space-16`
8. Ensure all components reference CSS variables, never raw hex

### Testing Checklist

After each change, verify:
- [ ] Page renders without errors
- [ ] Loading state appears and resolves
- [ ] Empty state appears when no data
- [ ] Error state appears on API failure with retry
- [ ] All interactive elements have focus states
- [ ] All interactive elements are keyboard-accessible
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Touch targets are minimum 44x44px on mobile
- [ ] Text does not overflow containers
- [ ] Tables scroll horizontally on mobile
- [ ] Dark mode renders correctly
- [ ] RTL layout works correctly
- [ ] No `console.warn` or errors in dev tools

### Risk Areas

1. **CSS consolidation** — Removing `tailwind.config.js` while `components.json` references it could break shadcn CLI
2. **Button redesign** — Gradient-to-solid change affects every button in the app
3. **Layout changes** — Sidebar redesign affects all dashboard pages
4. **Token changes** — Any color token change is visually disruptive; test against all pages
5. **Page deletion** — Ensure no imports or links reference deleted pages

### Order of Work

```
Week 1:  CSS tokens → Design system components → Delete unused files
Week 2:  Button + Card + Badge → Layout shell → Sidebar
Week 3:  Dashboard → Chat → Documents
Week 4:  Team → Approvals → Queue
Week 5:  Settings → Analytics → Admin
Week 6:  Guardrails → HITL → Inbox → Voice
Week 7:  Accessibility → Mobile → Animation reduction
Week 8:  Testing → Bug fixes → Final polish
```

---

## Appendix: Current CSS Variable Reference

For reference during migration, here are all current CSS variables and their proposed replacements:

| Current | New | Rationale |
|---------|-----|-----------|
| `--color-background: #F8F9FB` | `--color-bg: #F5F6F8` | Slightly warmer, higher contrast |
| `--color-foreground: #141F33` | `--color-fg: #1A1D29` | Warmer dark tone |
| `--color-primary: #141F33` | Remove (duplicate of foreground) | Confusion with "primary" button |
| `--color-surface: #FFFFFF` | `--color-surface: #FFFFFF` | Keep |
| `--color-accent: #2A5CFF` | `--color-accent: #2563EB` | Standard blue-600 |
| `--color-accent-foreground` | Remove | Unnecessary |
| `--color-primary-foreground` | Remove | Unnecessary |
| `--color-muted: #718096` | `--color-muted-fg: #718096` | Clarify purpose |
| `--color-muted-foreground: #A0AEC0` | Remove | Unnecessary |
| `--color-border` | `--color-border` | Keep, ensure consistent |
| `--color-success: #10B981` | `--color-success: #059669` | Slightly deeper |
| `--color-warning: #F59E0B` | `--color-warning: #D97706` | Slightly deeper |
| `--color-danger: #EF4444` | `--color-danger: #DC2626` | Slightly deeper |
| `--color-info: #3B82F6` | `--color-info: #0284C7` | More distinct |
| `--radius: 0.75rem` | `--radius-md: 0.5rem` | Smaller default |
| `--shadow-geo` | Remove | No semantic value |
| `--shadow-glow` | Remove | Decorative |
| `--shadow-elevation-low` | `--shadow-1` | Standard naming |
| `--shadow-elevation-mid` | `--shadow-2` | Standard naming |
| `--shadow-elevation-high` | `--shadow-3` | Standard naming |
| `--fs-xs: 0.625rem` | `--fs-caption: 0.75rem` | 10px → 12px minimum |
| `--fs-sm: 0.75rem` | `--fs-label: 0.875rem` | 12px → 14px |
| `--fs-base: 0.875rem` | `--fs-body: 1rem` | 14px → 16px |
| `--fs-lg: 1rem` | `--fs-lg: 1.125rem` | Shift scale up |
| `--section-gap-*` | Use standard spacing scale | Simplify |
| `--spacing-pill` | Use `rounded-full` | Already available |
