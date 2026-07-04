# Design System: SAQYN RABT

## 1. Visual Theme & Atmosphere

Authoritative, premium, and tech-forward with a dual-brand identity. Marketing surfaces use a crisp white-and-navy palette with generous whitespace — projecting trust and enterprise readiness. Dashboard surfaces shift to a dark-slate theme with a vibrant cyan accent, communicating power-user tooling and real-time operations. The overall feel is polished but restrained: no gradients-for-effect, no decorative flourishes that lack purpose.

Every page exists in three states: the **main page** (fully loaded content), the **loading skeleton** (pulsing placeholder shapes that mirror the final layout), and the **error boundary** (centered alert with icon, explanation, and recovery actions).

---

## 2. Complete Route Map — All 16 Pages

| # | Route | Type | Main Page | Loading Skeleton | Error Boundary |
|---|-------|------|-----------|-----------------|----------------|
| 1 | `/` | Landing | Split hero + industry pills + trust banner + pricing grid + footer | Spinner on blank bg | ⚠️ icon + "Something went wrong" + Try again / Home |
| 2 | `/automation` | Marketing | Hero + feature cards + pricing + FAQ + modal | Header skeleton + hero placeholder + feature card skeleton | ⚠️ + "Unable to load this page" + Try again / Home |
| 3 | `/chatbot` | Marketing | Hero + capability cards + chat mockup + pricing + FAQ + modal | Header skeleton + hero placeholder + chat bubble skeleton | ⚠️ + "Chatbot page unavailable" + Try again / Home |
| 4 | `/pricing` | Marketing | Hero + monthly/annual toggle + two-column pricing grid | Header skeleton + pricing card skeleton grid | ⚠️ + "Pricing information unavailable" + Try again / Contact |
| 5 | `/about` | Legal | Eyebrow + title + description + sections + CTA | Header skeleton + text block skeleton | ⚠️ + "About page unavailable" + Try again / Home |
| 6 | `/contact` | Legal | Eyebrow + title + description + info cards | Header skeleton + card skeleton grid | ⚠️ + "Contact page unavailable" + "Email us directly" fallback |
| 7 | `/privacy-policy` | Legal | Eyebrow + title + description + policy sections | Header skeleton + paragraph skeleton | ⚠️ + "Privacy policy unavailable" + Try again / Home |
| 8 | `/terms-and-conditions` | Legal | Eyebrow + title + description + TOS sections | Header skeleton + paragraph skeleton | ⚠️ + "Terms & conditions unavailable" + Try again / Home |
| 9 | `/cookie-policy` | Legal | Eyebrow + title + description + cookie sections | Header skeleton + paragraph skeleton | ⚠️ + "Cookie policy unavailable" + Try again / Home |
| 10 | `/dashboard` | Dashboard | Gradient banner + KPI cards + activity feed + quick actions | Banner skeleton + metric card skeleton + activity skeleton | ⚠️ + "Dashboard error" + "Your data is safe" + Try again / Back |
| 11 | `/dashboard/chat` | Dashboard | Chat message list + input bar | Alternating chat bubble skeleton | ⚠️ + "Chat unavailable" + "History is safe" + Try again / Back |
| 12 | `/dashboard/documents` | Dashboard | Document grid cards + upload button | Document card skeleton grid | ⚠️ + "Documents unavailable" + "Your files are safe" + Try again / Back |
| 13 | `/dashboard/settings` | Dashboard | Settings section with toggle rows | Toggle row skeleton list | ⚠️ + "Settings unavailable" + "Config is safe" + Try again / Back |
| 14 | `/dashboard/automation` | Dashboard | Queue items + status badges | Queue card skeleton grid | ⚠️ + "Queue unavailable" + "Requests queued safely" + Try again / Back |
| 15 | `/dashboard/voice` | Dashboard | KPI cards + call log table | Metric skeleton + call row skeleton | ⚠️ + "Voice dispatch unavailable" + "Active calls unaffected" + Try again / Back |
| 16 | `/dashboard/approvals` | Dashboard | Approval list with approve/deny buttons | Approval row skeleton list | ⚠️ + "Approvals unavailable" + "Pending requests queued" + Try again / Back |

---

## 3. Page State Architecture

### Main Page (`page.tsx`)
Every route has a dedicated `page.tsx` that renders the full content with real data.

### Loading Skeleton (`loading.tsx`)
Every route has a custom skeleton that mirrors the page's layout structure using `animate-pulse` on `bg-slate-200`/`bg-slate-100` placeholder blocks. Skeletons are unique per page type:

- **Landing & Marketing pages:** Include the MarketingHeader skeleton (logo + nav + CTA placeholders), hero section skeleton (pill badge + heading + subheading + CTA buttons), and content section skeletons (feature cards, pricing cards, chat bubbles).
- **Legal pages (about, contact, privacy, terms, cookie):** Include the MarketingHeader skeleton, then a `max-w-4xl` centered content area with eyebrow + title + paragraph skeleton blocks matching the section count.
- **Dashboard overview:** Banner card skeleton (gradient bar with text placeholders) + KPI metric card skeleton grid (3 columns) + activity/quick-actions skeleton.
- **Dashboard chat:** Alternating left/right message bubbles in varying widths + input bar skeleton at bottom.
- **Dashboard documents:** Card grid skeleton (2-3 columns) with icon + title + metadata placeholders.
- **Dashboard settings:** Toggle row skeleton list with label + description + toggle placeholders.
- **Dashboard queue:** KPI skeleton + feature card skeleton grid (2 columns).
- **Dashboard voice:** KPI skeleton grid (3 columns) + call log table skeleton with avatar + name + status placeholders.
- **Dashboard approvals:** Approval row skeleton list with avatar + name + approve/deny button placeholders.

### Error Boundary (`error.tsx`)
Every route is wrapped in a `'use client'` error boundary with a consistent structure:

1. **Page chrome preserved** — Marketing pages keep the header with logo. Dashboard pages keep the sidebar (inherited from dashboard layout). The error replaces only the content area.
2. **Error UI pattern:**
   - Red-tinted circle with ⚠️ icon (`h-16 w-16 rounded-full bg-red-50 text-3xl`)
   - Page-specific heading (e.g. "Chat unavailable", "Pricing information unavailable")
   - Calm explanation sentence (e.g. "Your conversation history is safe")
   - Fallback instruction when relevant (e.g. "Email us directly at hello@saqynrabt.com")
   - Two action buttons: **Try again** (primary, calls `reset()`) + **Back to Home/Dashboard** (secondary outline)
   - Optional: error `digest` ID shown in muted monospace for support

---

## 4. Color Palette & Roles

### Marketing & Public Surfaces

| Descriptive Name | Hex | Role |
|---|---|---|
| Deep Navy Authority | `#1A365D` | Primary buttons, headings, hero backgrounds, link hovers |
| Crisp White | `#FFFFFF` | Page backgrounds, card surfaces |
| Warm Off-White | `#F8FBFF` | Hero section gradient base, subtle section alternation |
| Slate Mist | `#F1F5F9` | Alternating section backgrounds, hover states |
| Quiet Graphite | `#6B7280` | Body text, secondary labels |
| Charcoal Text | `#111827` | Primary body text on white (Tailwind slate-900) |
| Success Emerald | `#10B981` | "Popular" badges, checkmarks, positive indicators |
| Skeleton Base | `#E2E8F0` | Loading placeholder background (slate-200) |
| Skeleton Light | `#F1F5F9` | Loading secondary placeholder (slate-100) |

### Dashboard & Internal Surfaces

| Descriptive Name | Hex | Role |
|---|---|---|
| Near-Black Slate | `#0F172A` | Sidebar background (slate-950) |
| Midnight Card | `#1E293B` | Card surfaces in dashboard |
| Soft Background | `#F8FAFC` | Dashboard page background (slate-50) |
| Cyan Accent | `#4CC9F0` | Active nav links, key interactive elements |
| Darker Cyan Hover | `#2CB3D6` | Hover state for cyan accent elements |
| Light Border | `#E2E8F0` | Card borders, dividers |

### Shared States

| Descriptive Name | Hex | Role |
|---|---|---|
| Alert Amber | `#F59E0B` | Warning banners, sandbox mode indicators |
| Error Red Text | `#EF4444` | Error icon container |
| Error Red BG | `#FEF2F2` | Error icon circle background (red-50) |
| Success Green | `#22C55E` | Online status, success confirmations |

---

## 5. Typography Rules

- **Font Stack:** `Inter` (sans-serif) — loaded via Tailwind, renders geometric and highly legible at all sizes.
- **Hero Headings:** Large (`text-5xl`/`text-6xl`), bold (`font-bold`), tight leading (`leading-tight`). Uses Deep Navy (`#1A365D`).
- **Section Headings:** `text-2xl` or `text-3xl`, `font-bold` or `font-semibold`. Same navy color.
- **Body Text:** `text-base` or `text-sm`, `text-slate-500` or `text-slate-600`. Relaxed leading (`leading-7` or `leading-8`).
- **Eyebrow/Section Labels:** `text-xs` or `text-[10px]`, bold, `uppercase`, wide letter-spacing (`tracking-[0.25em]` to `tracking-[0.35em]`). Used as section introducers.
- **Dashboard Labels:** `text-[11px]`, `font-semibold`, `uppercase`, `tracking-[0.35em]` — consistent with the "utility" feel.
- **Pricing Numbers:** `font-extrabold`, large scale (`text-2xl` to `text-4xl`), navy color.
- **Error Headings:** `text-2xl` or `text-3xl`, `font-bold`, centered, navy color.
- **Error Body:** `text-slate-500` explanation + `text-sm text-slate-400` fallback instruction.

---

## 6. Component Stylings

### Buttons

| Variant | Shape | Background | Text | Border | Hover |
|---|---|---|---|---|---|
| Primary | Pill (`rounded-full`) | Deep Navy `#1A365D` | White | None | `hover:opacity-90` |
| Secondary | Pill (`rounded-full`) | Transparent | Deep Navy | `border-slate-300` | `hover:bg-slate-50` |
| Ghost (Dashboard) | `rounded-lg` | `bg-slate-100` | Deep Navy | None | `hover:bg-slate-200` |

All buttons enforce `min-height: 44px` for touch accessibility.

### Cards & Containers

- **Marketing Cards:** White background, `border border-slate-200`, `rounded-xl`, `shadow-sm`, `hover:shadow-md`.
- **Hero Cards:** Deep Navy background with white text, `rounded-3xl`, dramatic shadow.
- **Dashboard Cards:** White background, `border border-slate-200`, `rounded-2xl`, `shadow-sm`.
- **Dashboard Banner Card:** Gradient background (`from-primary to-slate-900`), `rounded-3xl`, white text.
- **Error Container:** Centered, `max-w-md`, white background.

### Loading Skeletons

- **Base pattern:** `bg-slate-200 rounded animate-pulse` for primary blocks, `bg-slate-100` for secondary.
- **Hero skeletons:** `rounded-full` for pill badges, `rounded-lg` for headings, `rounded` for subtext.
- **Card skeletons:** Same border-radius as real cards, matching height proportions.
- **Chat bubbles:** Alternating alignment (left/right), varying widths (40%-85%), `rounded-2xl`.
- **Avatar skeletons:** Circular (`rounded-full`), matching the real avatar size.

### Error UI Component

- **Icon container:** `mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl`
- **Text stack:** Heading (`text-2xl font-bold text-primary mb-2`) → Explanation (`text-slate-500 mb-2`) → Fallback (`text-sm text-slate-400 mb-8`)
- **Action row:** `flex flex-col sm:flex-row gap-3 justify-center` with primary (Try again) + secondary (Back) buttons

---

## 7. Layout Principles

- **Marketing Page Width:** `max-w-7xl` (1280px) for full-width sections, `max-w-4xl` or `max-w-5xl` for content-focused sections.
- **Horizontal Padding:** `px-4 sm:px-6 lg:px-8` consistently.
- **Vertical Rhythm:** Sections are `py-14`, `py-16`, or `py-20` — generous breathing room.
- **Grid System:** Two-column grids for split hero and product features. Three-column grids for pricing tiers and KPI metrics.
- **Dashboard Layout:** Fixed sidebar on desktop (`md:w-72`), stacked on mobile. Content area scrolls independently.
- **Error Layout:** Vertically and horizontally centered within the available content area. 404/500 fill the full viewport.
- **Loading Layout:** Skeletons mirror the exact layout structure of the main page — same padding, same grid, same border-radius.

---

## 8. Key Interaction Patterns

- **Pricing Selection:** Two-column grid (Automation / Chatbot) with tier cards. "Most popular" badge on recommended tier. Monthly/Annual toggle with -20% discount.
- **Industry Switcher:** Pill-shaped buttons for top industries + dropdown for the rest. Dynamically updates headline + description.
- **Dashboard Mock Mode:** Amber warning bar across top + "Sandbox" badge in sidebar. Links to settings to configure.
- **Language Switching:** Persistent `locale` in localStorage. Entire UI flips `dir` direction (LTR/RTL). All content in English and Arabic via `useLocale()` context.
- **Error Recovery:** "Try again" calls `reset()` which re-renders the page component. "Back to Home/Dashboard" navigates to a known-good route via `<a>` tag (full page navigation, avoids error boundary).

---

## 9. Accessibility & Responsive Strategy

- **Breakpoints:** `sm:` (640px) tablet adjustments, `md:` (768px) desktop layout switches, `lg:` (1024px) larger screens.
- **Touch Targets:** `min-height: 44px` enforced globally on all interactive elements including buttons, links, inputs, selects, textareas.
- **RTL:** `dir` attribute toggled at root div level based on locale. All margins/paddings use logical properties.
- **Selection Color:** Custom `::selection` with Deep Navy background and white text.
- **Error ID:** Error digest shown in `text-xs text-slate-400 font-mono` for support diagnostics.
- **Reduced Motion:** Skeleton animations use `animate-pulse` which respects `prefers-reduced-motion`.
