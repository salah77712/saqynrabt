# SAQYN RABT — AI Agent Design Brain
> **READ THIS FIRST** before generating, editing, or auditing any frontend code. This document is the single source of truth for all visual decisions.

---

## 1. THE 3-COLOR RULE (ZERO TOLERANCE)

The entire frontend uses **exactly 3 colors** following the 60-30-10 principle. Any other color is a violation.

| Token | Role | Hex | Tailwind alias | 60-30-10 % |
|-------|------|-----|---------------|-----------|
| **Surface** | Background | `#F8F9FB` | `bg-[#F8F9FB]`, `text-[#F8F9FB]` | **60%** |
| **Navy** | Primary | `#141F33` | `bg-[#141F33]`, `text-[#141F33]` | **30%** |
| **Royal** | Accent | `#2A5CFF` | `bg-[#2A5CFF]`, `text-[#2A5CFF]` | **10%** |

### Approved aliases (hardcoded in tailwind.config.js)
```
primary: "#141F33"   → use as bg-primary, text-primary
accent:  "#2A5CFF"   → use as bg-accent, text-accent
surface: "#F8F9FB"   → use as bg-surface
navy:    "#141F33"   → use as bg-navy, text-navy, border-navy
royal:   "#2A5CFF"   → use as bg-royal, text-royal, border-royal, ring-royal
muted:   "#718096"   → DEPRECATED — replace with text-[#141F33]/60
```

### 60-30-10 mapping cheat sheet
- **60% Surface** — page/card backgrounds, input fields, secondary containers
- **30% Navy** — headings, body text, borders, primary buttons, sidebar
- **10% Royal** — links, CTAs, focus rings, active states, badges

### FORBIDDEN (any usage = violation)
```
white / #FFFFFF / bg-white / text-white
slate-* / gray-* (as actual colors — the remapped scale is OK)
emerald-* / amber-* / red-* / blue-* / indigo-* / green-*
violet-* / purple-* / rose-* / teal-* / orange-* / cyan-*
#718096 / #1A202C / #1E2E4A / #4A5568 / #f1f5f9
#10B981 / #16a34a / #d97706 / #EF4444
bg-primary/10 → OK (opacity variant of Navy)
```

### Dark mode (CSS class `.dark`)
```
--background:    #141F33   (Navy becomes page bg)
--foreground:    #F8F9FB   (Surface becomes text)
--primary:       #2A5CFF   (Royal becomes primary in dark)
--primary-foreground: #F8F9FB
--card:          #141F33
--muted:         #141F33
--muted-foreground: rgba(20,31,51,0.5)
--border:        rgba(20,31,51,0.2)
--ring:          #2A5CFF
```

---

## 2. TYPOGRAPHY

| Element | Classes | Color | Notes |
|---------|---------|-------|-------|
| Hero heading | `text-5xl md:text-6xl font-extrabold leading-tight` | `text-[#141F33]` | Marketing only |
| Section heading | `text-2xl md:text-3xl font-bold` | `text-[#141F33]` | |
| Card title | `text-base font-bold` | `text-[#141F33]` | |
| Body text | `text-sm md:text-base` | `text-[#141F33]` | Slightly lighter = add `/60` or `/40` |
| Helper/secondary | `text-xs text-[11px]` | `text-[#141F33]/60` | |
| Eyebrow label | `text-[10px] font-bold uppercase tracking-[0.2em]` | `text-[#141F33]/60` | |
| Dashboard label | `text-[11px] font-semibold uppercase tracking-[0.35em]` | `text-[#141F33]` | |
| Price numbers | `text-2xl md:text-4xl font-extrabold` | `text-[#141F33]` | |
| Error heading | `text-2xl font-bold` | `text-[#141F33]` | |
| Monospace | `font-mono text-[10px]` | `text-[#141F33]` | Error digest, code |

**Font:** `font-sans` → `var(--font-geist-sans)`, `system-ui`, `sans-serif`
**Font mono:** `font-mono` → `var(--font-geist-mono)`, `monospace`

---

## 3. ANIMATION SYSTEM

### Tailwind animation classes (defined in tailwind.config.js)
```
animate-fadeIn        → fadeIn 0.3s ease-out forwards
animate-fadeOut       → fadeOut 0.2s ease-in forwards
animate-slideUp       → slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards
animate-slideDown     → slideDown 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards
animate-slideDownExit → slideDownExit 0.2s ease-in forwards
animate-scaleIn       → scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards
animate-shimmer       → shimmer 2s linear infinite
animate-pulse-soft    → pulseSoft 2s cubic-bezier(0.4,0,0.6,1) infinite
animate-float         → float 3s ease-in-out infinite
animate-spring-in     → springIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards
animate-rainbow       → rainbow var(--speed,2s) infinite linear
```

### CSS utility classes (defined in globals.css)
```
.animate-fadeIn           → opacity 0→1
.animate-fadeOut          → opacity 1→0
.animate-slideUp          → translateY(16px)→0 + fade
.animate-slideDown        → translateY(-8px)→0 + fade
.animate-scaleIn          → scale(0.95)→1 + fade
.animate-fadeOut          → opacity 1→0
.animate-slideDownExit    → translateY(0)→8px + fade out
.animate-reveal           → scroll-triggered fade+slide (opacity:0 →1, translateY 24→0)
.animate-reveal-left      → scroll-triggered fade+slide (translateX -24→0)
.animate-reveal-right     → scroll-triggered fade+slide (translateX 24→0)
.animate-stagger > *      → cascaded fade+slide for lists (nth-child delays 80ms each)
.animate-stagger.revealed → triggers all children
.btn-hover-lift           → translateY(-2px) on hover, scale(0.98) on active
.float-slow               → float 4s ease-in-out infinite
.float-medium             → float 3s ease-in-out infinite
.card-hover               → transition + hover:shadow-md hover:scale-[1.02] hover:border-[#141F33]
.card-premium             → glass card (bg surface/80, blur16px, border, shadow)
.search-backdrop          → backdrop-filter: blur(12px) saturate(180%)
.btn-primary              → full definition below
.btn-secondary            → full definition below
.btn-ghost                → full definition below
```

### Stagger delay pattern
```css
.animate-stagger.revealed > *:nth-child(1) { transition-delay: 0ms; }
.animate-stagger.revealed > *:nth-child(2) { transition-delay: 80ms; }
.animate-stagger.revealed > *:nth-child(3) { transition-delay: 160ms; }
/* ... up to :nth-child(8) at 560ms */
```

### Keyframes reference
```
fadeIn:      opacity 0→1
fadeOut:     opacity 1→0
slideUp:     opacity 0→1, translateY 16px→0
slideDown:   opacity 0→1, translateY -8px→0
slideDownExit: opacity 1→0, translateY 0→8px
scaleIn:     opacity 0→1, scale 0.95→1
springIn:    opacity 0→1, scale 0.95→1 (spring curve)
shimmer:     background-position -200%→200%
pulseSoft:   opacity 1→0.7→1
float:       translateY 0→-6px→0
rainbow:     background-position 0→200%
fadeIn @ 0.3s
slideUp @ 0.4s cubic-bezier(0.34,1.56,0.64,1)
springIn @ 0.5s cubic-bezier(0.34,1.56,0.64,1)
reveal @ 0.7s cubic-bezier(0.22,1,0.36,1)
animotion-shineSweep: background-position 200%→-200%
animotion-glowPulseBtn: box-shadow pulse 5px→18px→5px rgba(42,92,255,0.35→0.65)
shineSweep: skewX(-20deg) translateX(-150%)→250%
```

---

## 4. BUTTON SYSTEM

### CSS classes (globals.css) — USE THESE, not Tailwind defaults

#### `.btn-primary`
```
bg-[#141F33] text-[#F8F9FB]
border: 1px solid rgba(20,31,51,0.1)
border-top-color: rgba(248,249,251,0.15)
box-shadow: 0 1px 2px rgba(0,0,0,0.05), 0 4px 12px rgba(20,31,51,0.05),
            inset 0 1px 0 rgba(248,249,251,0.1)
border-radius: 12px
padding: 0.75rem 1.5rem
font-weight: 700
min-height: 44px
transition: all 0.4s cubic-bezier(0.16,1,0.3,1)
::after → shine sweep animation
:hover → translateY(-1px) scale(1.01), royal glow shadow
:active → translateY(0.5px) scale(0.98)
```

#### `.btn-secondary`
```
bg-[#F8F9FB] text-[#141F33]
border: 1px solid rgba(20,31,51,0.1)
border-radius: 12px
padding: 0.75rem 1.5rem
font-weight: 700
box-shadow: 0 1px 2px rgba(0,0,0,0.02)
:hover → translateY(-1px), border-color rgba(20,31,51,0.1)
:active → translateY(0.5px) scale(0.98)
::after → navy shine sweep (dimmed)
```

#### `.btn-ghost`
```
bg-transparent text-[#141F33]
border-radius: 12px
padding: 0.5rem 1.25rem
font-size: 0.875rem font-weight: 700
:hover → bg-[#F8F9FB] translateY(-0.5px)
:active → translateY(0)
```

### shadcn Button component (components/shadcn/button.tsx)
```
variant="default"  → bg-[#141F33] text-[#F8F9FB] hover:bg-[#141F33]/80
variant="outline"  → btn-secondary + border-[#141F33]/10 bg-[#F8F9FB]
variant="secondary" → btn-secondary bg-[#2A5CFF]/10 text-[#2A5CFF]
variant="ghost"    → hover:bg-[#F8F9FB] hover:text-[#141F33]
variant="destructive" → bg-[#141F33]/10 text-[#141F33] hover:bg-[#141F33]/20
variant="link"     → text-[#141F33] underline-offset-4 hover:underline
```
Import: `<Button variant="default|outline|secondary|ghost|destructive|link" size="default|xs|sm|lg|icon|icon-xs|icon-sm|icon-lg">`

### shadcn Badge component (components/shadcn/badge.tsx)
```
variant="default"   → bg-[#141F33] text-[#F8F9FB]
variant="secondary" → bg-[#2A5CFF]/10 text-[#2A5CFF]
variant="destructive"→ bg-[#141F33]/10 text-[#141F33]
variant="outline"   → border-[#141F33]/10 text-[#141F33]
variant="ghost"     → hover:bg-[#F8F9FB] hover:text-[#141F33]
variant="link"      → text-[#141F33] underline-offset-4
```
Import: `<Badge variant="default|secondary|destructive|outline|ghost|link">`

---

## 5. ICON LIBRARY

**All icons come from `lucide-react` v1.24.0. Never add new icon libraries.**

### Icons used across the codebase (import from 'lucide-react')
| Icon | Context |
|------|---------|
| `AlertTriangle` | Error states, warnings, incidents |
| `ArrowLeft` | Back navigation, prev step |
| `ArrowRight` | Next step, forward nav |
| `ArrowDown` | Expand/collapse, download |
| `Ban` | Blocked, denied |
| `BarChart3` | Analytics, metrics, usage stats |
| `BadgeCheck` | Verified, confirmed |
| `Bell` | Notifications |
| `Briefcase` | Business/workspace |
| `Building2` | Company, client |
| `Car` | Automotive industry |
| `Check` | Success, completed, verified |
| `ClipboardList` | Tasks, approvals |
| `Clock` | Time, history |
| `Code` | Developers/API |
| `Construction` | Construction industry |
| `DollarSign` | Billing, pricing |
| `Download` | Export, download |
| `FileText` | Documents, SOPs |
| `Flag` | Incidents, flags |
| `Folder` | Documents folder |
| `Globe` | Language, global |
| `Handshake` | Agreements, contracts |
| `HeartPulse` | Healthcare industry |
| `Home` | Dashboard home |
| `Info` | Info tooltip |
| `Lock` | Privacy, security |
| `Mail` | Email, invitations |
| `MapPin` | Location, address |
| `Menu` | Mobile menu hamburger |
| `MessageSquare` | Chat, chatbot |
| `Package` | Products, features |
| `PartyPopper` | Success celebration |
| `Phone` | Voice, calls, contact |
| `Radio` | Live/active status |
| `Scale` | Law industry |
| `Search` | Search, RAG, knowledge |
| `Settings` | Settings page |
| `Shield` | Security, compliance |
| `ShoppingBag` | Retail industry |
| `Star` | Rating, favorites |
| `Terminal` | CLI, developers |
| `Trash2` | Delete, remove |
| `TrendingUp` | Growth, metrics |
| `Users` | Team, employees |
| `Utensils` | Food industry |
| `Wrench` | Automation, tools |
| `X` | Close, cancel, dismiss |
| `Zap` | Automation, workflows, power |

### Icon styling rules
```
Default: w-5 h-5 (size 20px)
Small:   w-4 h-4 (size 16px) — in badges, inline
Large:   w-6 h-6 (size 24px) — in empty states, hero icons
Color:   Inherit from parent text color (currentColor)
         OR explicit: text-[#141F33], text-[#2A5CFF], text-[#F8F9FB]
Stroke:  strokeWidth={2} for default, strokeWidth={1.5} for icons
```

---

## 6. SHADCN/UI COMPONENT LIBRARY

All shadcn components are in `frontend/components/shadcn/`. They use `@base-ui/react` primitives + `class-variance-authority` (CVA) for variants.

### Components available
| File | Component | Variants |
|------|-----------|---------|
| `button.tsx` | `<Button>` | default, outline, secondary, ghost, destructive, link |
| `badge.tsx` | `<Badge>` | default, secondary, destructive, outline, ghost, link |
| `card.tsx` | `<Card>` | — (container) |
| `dialog.tsx` | `<Dialog>` | — (modal overlay) |
| `breadcrumb.tsx` | `<Breadcrumb>` | — (nav) |

### Custom UI primitives (components/ui/)
| File | Component | Purpose |
|------|-----------|---------|
| `Tooltip.tsx` | `<Tooltip>` | Hover text popover |
| `Toast.tsx` | `<Toast>` | Slide-in alert (success/error/info) |
| `Skeleton.tsx` | `<Skeleton>` | Loading placeholder shapes |
| `ProgressBar.tsx` | `<ProgressBar>` | ARIA-tracked progress |
| `LoadingSpinner.tsx` | `<LoadingSpinner>` | Spinning ring (border-t-[#2A5CFF]) |
| `Input.tsx` | `<Input>` | Form text input |
| `EmptyState.tsx` | `<EmptyState>` | No-data placeholder with icon |
| `Badge.tsx` | `<Badge>` | Status tag (navy/royal/custom) |
| `Avatar.tsx` | `<Avatar>` | User initials circle |

---

## 7. TAILWIND CUSTOM CONFIGURATION

### Colors (tailwind.config.js — the remapped scale)
All Tailwind color utilities are remapped to the 3-token system:
- `slate-*` / `gray-*` / `zinc-*` / `neutral-*` / `stone-*` → Surface/Navy variants
- `blue-*` / `indigo-*` / `violet-*` / `purple-*` / `pink-*` / `rose-*` / `emerald-*` / `green-*` / `teal-*` / `cyan-*` / `sky-*` / `lime-*` → Royal/Navy variants
- `amber-*` / `yellow-*` / `orange-*` → Navy/Surface variants
- `red-*` → partial (50/100 = slate, 500/600/800 = actual red — only use red-500 for legacy, map to #141F33)

### Animations (tailwind.config.js)
Available as `animate-*` classes:
```
animate-fade-in    animate-fade-out
animate-slide-up   animate-slide-down   animate-slide-down-exit
animate-shimmer    animate-pulse-soft   animate-float
animate-spring-in  animate-rainbow
```

### Fonts
```
font-sans → var(--font-geist-sans), system-ui, sans-serif
font-mono → var(--font-geist-mono), monospace
```

---

## 8. LAYOUT PATTERNS

### Marketing page
- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Vertical rhythm: `py-14`, `py-16`, `py-20`
- Grid: 2-col split hero, 3-col pricing, 3-col KPI

### Dashboard page
- Sidebar: fixed `w-64` desktop, collapsible
- Content: `p-4 md:p-6 lg:p-8`, `max-w-7xl mx-auto`
- Mobile bottom nav: `h-16 + safe-area-inset-bottom`

### Card containers
- Marketing card: `bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl shadow-sm`
- Dashboard card: `bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl shadow-sm`
- Premium card: `.card-premium` class (glass morphism)
- Error container: centered `max-w-md`

### Form inputs
```
bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2
focus:ring-2 focus:ring-[#2A5CFF]/20 focus:border-[#2A5CFF]
min-h-[44px] (accessibility)
```

### Focus rings
```
Global:  *:focus-visible → outline: 2px solid #2A5CFF, outline-offset: 2px
Input:   focus:ring-2 focus:ring-[#2A5CFF]/20
Button:  focus-visible:border-[#2A5CFF] focus-visible:ring-[#2A5CFF]/50
```

---

## 9. A11Y & RESPONSIVE

- `min-height: 44px` on ALL interactive elements (a, button, input, select, textarea)
- `dir` attribute flips between `ltr` and `rtl` based on locale
- `prefers-reduced-motion` → all animations set to `0.01ms !important`
- `::selection` → `background: #141F33; color: #F8F9FB`
- Scrollbar: `width: 6px`, thumb `rgba(20,31,51,0.2)`, hover `rgba(20,31,51,0.3)`

---

## 10. ROUTE ARCHITECTURE

### Every route has 3 files
```
route/page.tsx      → Main content
route/loading.tsx   → Skeleton (animate-pulse, bg-[#141F33]/10 shapes)
route/error.tsx     → Error boundary (⚠️ icon + heading + Try again + Back)
```

### Route tree (key paths)
```
app/page.tsx                          → Landing/marketing
app/(marketing)/                      → /automation, /chatbot, /trust, /legal/*
app/dashboard/page.tsx                → Dashboard overview
app/dashboard/layout.tsx              → Dashboard shell (sidebar + headers)
app/dashboard/settings/*              → SSO, webhooks, billing, branding, etc.
app/dashboard/workflows/page.tsx      → Workflow canvas
app/dashboard/hitl/page.tsx          → Human-in-the-loop queue
app/dashboard/approvals/*            → Approval flows
app/pricing/page.tsx                 → Pricing tiers
app/thank-you/page.tsx               → Post-signup thank you
app/portal/privacy/page.tsx          → Privacy portal
app/admin/*                          → Admin dashboards (metrics, health, clients, etc.)
app/(auth)/                          → /sign-in, /sign-up, /forgot-password, /onboarding
app/(marketing)/legal/*              → NDA, DPA, privacy, terms, security, etc.
components/                           → Top-level shared components
components/dashboard/*                → Dashboard-specific components
components/Header/*                   → Marketing header + nav
components/Footer/*                   → Footer columns + social
components/ui/*                       → Custom primitives
components/shadcn/*                   → shadcn Button, Badge, Card, Dialog, Breadcrumb
```

---

## 11. AVAILABLE MCP SERVERS

| Server | Command | Purpose |
|--------|---------|---------|
| **postgres** | `node .opencode/postgres-wrapper.cjs` | Neon PostgreSQL queries (read-only) |
| **pinecone** | `node .opencode/pinecone-wrapper.cjs` | Pinecone vector DB (RAG index) |
| **redis** | `node .opencode/redis-wrapper.cjs` | Upstash Redis cache (live balance) |
| **cloudflare** | `npx -y @cloudflare/mcp-server-cloudflare run <id>` | R2 storage, Workers, D1, KV, Queues, Durable Objects |
| **clerk** | `https://mcp.clerk.com/mcp` | Clerk auth docs + SDK snippets |
| **fetch** | `npx -y mcp-fetch-server` | Web content fetching (URLs → markdown) |

### Clerk MCP resources available
| URI | What it returns |
|-----|-----------------|
| `clerk://sdk/use-auth` | useAuth hook snippet |
| `clerk://sdk/use-user` | useUser hook snippet |
| `clerk://sdk/use-organization` | useOrganization hook |
| `clerk://sdk/use-sign-in` | useSignIn hook (custom sign-in) |
| `clerk://sdk/use-sign-up` | useSignUp hook (custom sign-up) |
| `clerk://sdk/b2b-saas-setup` | B2B SaaS organizations guide |
| `clerk://sdk/user-button` | UserButton component |
| `clerk://sdk/organization-switcher` | OrganizationSwitcher |
| `clerk://quickstarts/nextjs-app-router` | Next.js 15 quickstart |
| `clerk://sdk/server-auth-nextjs` | Server-side auth patterns |

---

## 12. DESIGN TOKENS SUMMARY

```
COLORS:
  Navy    #141F33  (primary, text, borders, dark bg)
  Royal   #2A5CFF  (accent, links, focus, CTAs)
  Surface #F8F9FB  (background, cards, inputs)
  Dark    #07111F  (dark mode page bg)
  Dark2   #0D1B2D  (dark mode card bg)
  Border  rgba(20,31,51,0.1)  (all borders)

RADIUS:
  --radius: 0.75rem  (12px)
  Cards: border-radius: 24px (card-premium), 16-20px (standard)
  Buttons: border-radius: 12px

SHADOWS:
  0 1px 2px rgba(20,31,51,0.05)           (base)
  0 4px 12px rgba(20,31,51,0.05)          (card)
  0 12px 24px rgba(42,92,255,0.18)        (btn-primary hover glow)
  0 20px 40px rgba(42,92,255,0.08)        (card-premium hover)
  inset 0 1px 0 rgba(248,249,251,0.1)    (btn highlight)

TRANSITIONS:
  Fast:   0.2s  ease
  Normal: 0.3s  cubic-bezier(0.16,1,0.3,1)
  Smooth: 0.4s  cubic-bezier(0.16,1,0.3,1)
  Spring: 0.5s  cubic-bezier(0.34,1.56,0.64,1)

FOCUS:  2px solid #2A5CFF, offset 2px, radius 4px
MIN-H:  44px on all interactive elements
```

---

## 13. SHADCN THEME TOKENS (globals.css :root)

```css
:root {
  --background:        #F8F9FB;
  --foreground:        #141F33;
  --card:              #F8F9FB;
  --card-foreground:   #141F33;
  --primary:           #141F33;
  --primary-foreground:#F8F9FB;
  --secondary:         #F8F9FB;
  --secondary-foreground: #141F33;
  --muted:             #F8F9FB;
  --muted-foreground:  #141F33;
  --accent:            #2A5CFF;
  --accent-foreground: #F8F9FB;
  --destructive:       #141F33;
  --destructive-foreground: #F8F9FB;
  --border:            #F8F9FB;
  --input:             #F8F9FB;
  --ring:              #2A5CFF;
  --radius:            0.75rem;
  --popover:           #F8F9FB;
  --popover-foreground:#141F33;
}
.dark { /* inverted */ }
```

---

## 14. CRITICAL RULES FOR AI AGENTS

1. **NEVER introduce a 4th color.** If you need status colors (success/error/warning), use Navy/Royal with opacity variants or text labels.
   - Error → `text-[#141F33]` on `bg-[#141F33]/5` border
   - Success → `text-[#2A5CFF]` on `bg-[#2A5CFF]/10` border
   - Warning → `text-[#2A5CFF]` on `bg-[#F8F9FB]` border

2. **Never use `bg-white`, `text-white`, `white/80`, `slate-*`, `gray-*` as actual colors.** Use `bg-[#F8F9FB]`, `text-[#F8F9FB]`, `bg-[#141F33]/10` etc.

3. **Never use `from-primary to-slate-900`** — write `from-[#141F33] to-[#141F33]` explicitly.

4. **Dark mode** — always provide `dark:` variants: `dark:bg-[#141F33]`, `dark:text-[#F8F9FB]`, `dark:border-[#141F33]/30`.

5. **Buttons** — always use `.btn-primary`, `.btn-secondary`, or `.btn-ghost` classes, or `<Button variant="...">` from shadcn. Never invent button styles.

6. **Inputs** — always `bg-[#F8F9FB] border border-[#141F33]/10 focus:ring-[#2A5CFF]/20`.

7. **Icons** — only from `lucide-react`. Size `w-5 h-5` default, `w-4 h-4` small. Stroke `strokeWidth={2}`.

8. **Loading skeletons** — use `bg-[#141F33]/10` with `animate-pulse`. Never use `bg-slate-200`.

9. **Cards** — `bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl shadow-sm` minimum.

10. **Spacing rhythm** — sections: `py-14` / `py-16` / `py-20`. Horizontal: `px-4 sm:px-6 lg:px-8`.

11. **Border radius** — 12px for buttons/inputs, 16-20px for cards, 24px for premium cards.

12. **RTL** — when `locale === 'ar'`, set `dir="rtl"` on root div.

13. **Selection** — always `selection:bg-[#141F33] selection:text-[#F8F9FB]`.

14. **Accessibility** — `min-h-[44px]` on all clickable elements. `focus-visible` outlines. `aria-label` on icon-only buttons.

---

## 15. QUICK REFERENCE: "WHAT CLASS DO I USE?"

| Need | Use this |
|------|----------|
| Page background | `bg-[#F8F9FB]` |
| Card background | `bg-[#F8F9FB]` |
| Primary text | `text-[#141F33]` |
| Secondary text | `text-[#141F33]/60` |
| Headings | `text-[#141F33] font-bold` |
| Links | `text-[#2A5CFF] hover:underline` |
| Primary button | `btn-primary` |
| Secondary button | `btn-secondary` |
| Ghost button | `btn-ghost` |
| Border | `border border-[#141F33]/10` |
| Input field | `bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl` |
| Focus ring | `focus:ring-2 focus:ring-[#2A5CFF]/20` |
| Error state | `text-[#141F33] bg-[#141F33]/5 border-[#141F33]/10` |
| Success state | `text-[#2A5CFF] bg-[#2A5CFF]/10 border-[#2A5CFF]/10` |
| Skeleton | `bg-[#141F33]/10 rounded animate-pulse` |
| Fade in | `animate-fadeIn` |
| Slide up | `animate-slideUp` |
| Stagger list | `animate-stagger` + `revealed` on parent |
| Hover lift | `.btn-hover-lift` |
| Glass card | `.card-premium` |
| Shadow on hover | `.card-hover` |
