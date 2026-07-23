# SAQYN RABT — Complete Design Element Catalog

> Generated from full codebase audit across all pages, components, hooks, and styles.
> **85 page.tsx files** · **60+ components** · **14 hooks** · **9 lib files**

---

## 1. PAGE ARCHITECTURE (85 Pages)

### Marketing & Public (19 pages)
| Route | Page | Loading | Error | Key Component |
|-------|------|---------|-------|---------------|
| `/` | page.tsx | loading.tsx | error.tsx | Header, Footer, IndustrySwitcher |
| `/features` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/pricing` | page.tsx | loading.tsx | error.tsx | Header, Footer, PricingCards |
| `/how-it-works` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/about` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/contact` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/industries` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/marketplace` | page.tsx | — | — | Header, Footer, MarketplaceCard |
| `/faq` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/automation` (marketing) | page.tsx | — | — | Header, Footer, PricingCards |
| `/chatbot` (marketing) | page.tsx | — | — | Header, Footer, PricingCards |
| `/trust` (marketing) | page.tsx | — | — | Header, Footer |
| `/case-studies` | page.tsx | loading.tsx | error.tsx | Header, Footer |
| `/case-studies/[slug]` | page.tsx | — | — | Header, Footer |

### Legal & Policy (12 pages)
| Route | Page | Loading | Error | Key Component |
|-------|------|---------|-------|---------------|
| `/privacy-policy` | page.tsx | loading.tsx | error.tsx | LegalPage |
| `/terms-and-conditions` | page.tsx | loading.tsx | error.tsx | LegalPage |
| `/cookie-policy` | page.tsx | loading.tsx | error.tsx | MinimalPage |
| `/legal/vulnerability-disclosure` | page.tsx | — | — | LegalPage + MDX |
| `/legal/terms` | page.tsx | — | — | LegalPage + MDX |
| `/legal/privacy` | page.tsx | — | — | LegalPage + MDX |
| `/legal/security` | page.tsx | — | — | LegalPage + MDX |
| `/legal/dpa` | page.tsx | — | — | LegalPage + MDX |
| `/legal/nda` | page.tsx | — | — | LegalPage + MDX |
| `/portal/privacy` | page.tsx | — | — | Header, Footer, useGlobalToast |
| `/thank-you` | page.tsx | — | — | Header, Footer |
| `/changelog` | page.tsx | — | — | Header, Footer |
| `/sitemap` | page.tsx | — | — | Header, Footer |

### Auth (4 pages)
| Route | Loading | Error |
|-------|---------|-------|
| `/sign-in/[[...sign-in]]` | — | — |
| `/sign-up/[[...sign-up]]` | — | — |
| `/forgot-password` | — | — |
| `/onboarding` | — | — |

### Developers & Help (8 pages)
| Route | Key Component |
|-------|---------------|
| `/developers` | Header, Footer |
| `/developers/api-docs` | Header, Footer |
| `/developers/cli` | Header, Footer |
| `/developers/plugins` | Header, Footer |
| `/help/getting-started` | Header, Footer (sidebar nav) |
| `/help/chatbot` | Header, Footer (sidebar nav) |
| `/help/billing` | Header, Footer (sidebar nav) |
| `/help/automation` | Header, Footer (sidebar nav) |

### Dashboard (30+ pages)
| Route | Loading | Error | Key Components |
|-------|---------|-------|----------------|
| `/dashboard` | loading.tsx | error.tsx | OverviewMetrics, QuickActions, UsageCard |
| `/dashboard/analytics` | — | — | Card, Badge |
| `/dashboard/reports` | — | — | Card, Button, Toast |
| `/dashboard/inbox` | — | — | — |
| `/dashboard/chat` | loading.tsx | error.tsx | Button, Card, Dialog, Input, Badge, Skeleton, PullToRefresh |
| `/dashboard/documents` | loading.tsx | error.tsx | Card, Dialog, Button, Input, Skeleton, DocumentGrid |
| `/dashboard/approvals` | loading.tsx | error.tsx | — |
| `/dashboard/automation` | loading.tsx | error.tsx | Card, Badge, AutomationQueue, AutomationFilters, PullToRefresh |
| `/dashboard/automation/workflows` | — | — | — |
| `/dashboard/workflows` | — | — | Card, Button, Badge |
| `/dashboard/voice` | loading.tsx | error.tsx | — |
| `/dashboard/team` | — | — | Card, Button, Dialog, Input, Badge, Skeleton, TeamTable |
| `/dashboard/team/pending` | — | — | (re-exports team page) |
| `/dashboard/team/employees` | — | — | (re-exports team page) |
| `/dashboard/ai-governance` | — | — | Card, Badge |
| `/dashboard/guardrails` | — | — | — |
| `/dashboard/hitl` | — | — | — |
| `/dashboard/privacy` | — | — | Card, Button |
| `/dashboard/legal-accept` | — | — | — |
| `/dashboard/settings` | — | — | Card, Button, SettingsTabs, ProgressBar, SkeletonCard |
| `/dashboard/settings/billing` | — | — | Card, Button |
| `/dashboard/settings/security` | — | — | Card, Button, Badge |
| `/dashboard/settings/sso` | — | — | Card, Button, Input, Badge, Toast |
| `/dashboard/settings/api` | — | — | useGlobalToast |
| `/dashboard/settings/roles` | — | — | — |
| `/dashboard/settings/webhooks` | — | — | — |
| `/dashboard/settings/integrations` | — | — | Card, Button, Badge |
| `/dashboard/settings/branding` | — | — | UnsavedChangesModal, useGlobalToast |
| `/dashboard/settings/prompts` | — | — | UnsavedChangesModal, useGlobalToast |
| `/dashboard/settings/reports` | — | — | — |
| `/dashboard/settings/ab-tests` | — | — | useGlobalToast |

### Admin (11 pages)
| Route | Key Components/Patterns |
|-------|------------------------|
| `/admin/usage` | Inline SVG bar chart |
| `/admin/companies` | useGlobalToast, table with pagination |
| `/admin/clients` | — |
| `/admin/billing` | Check icon from lucide-react |
| `/admin/metrics` | Live-updating metrics via setInterval |
| `/admin/audit` | Search input |
| `/admin/incidents` | — |
| `/admin/security/incidents` | 7 custom inline SVG icons, form, accordion |
| `/admin/client-success` | Card, Badge, HealthScore |
| `/admin/feature-flags` | Custom CSS toggle switches |
| `/admin/health` | — |

### Global (1 page)
| Route | Loading | Error |
|-------|---------|-------|
| `/global` | loading.tsx | error.tsx |

### Core Layout & System Files
- `layout.tsx` — Root layout (Geist fonts, AnalyticsGate, ToastProvider, GlobalStatusBar, Providers, CookieConsentBanner)
- `loading.tsx` — Root loading skeleton
- `error.tsx` — Root error boundary
- `not-found.tsx` — 404 page
- `providers.tsx` — QueryClient, Clerk, Language, Entitlements providers
- `analytics-gate.tsx` — Consent-gated Cloudflare Insights
- `(marketing)/layout.tsx` — Metadata wrapper
- `dashboard/layout.tsx` — Dashboard shell (sidebar, headers, mobile nav, feedback, verification gate)
- `admin/layout.tsx` — Admin shell (sidebar, loading spinner, access denied)

---

## 2. ICON CATALOG (All lucide-react icons across codebase)

| Icon | Size(s) | Color(s) | Pages/Components |
|------|---------|----------|------------------|
| `Zap` | w-4, w-5, w-6, w-8 | `#2A5CFF`, `#141F33` | Landing, features, pricing, dashboard, sidebar, UsageCard |
| `MessageSquare` | w-4, w-5, w-6 | `#2A5CFF`, `#141F33` | Landing, features, pricing, dashboard, sidebar, chat |
| `Mail` | w-4, w-5, w-10 | `#141F33`, primary | Landing, sign-up, contact, EmailVerificationGate |
| `Check` | w-2.5, w-3, w-4, w-5 | `#2A5CFF` | Landing, pricing, trust, case-studies, admin/billing, dashboard |
| `AlertTriangle` | w-4, w-6, w-8, w-10 | `#141F33` | All error.tsx, UnsavedChangesModal, EmptyState, dashboard |
| `ArrowRight` | w-3, w-4, w-6 | `#2A5CFF`, `#141F33` | Trust, sitemap, workflows, dashboard CTAs |
| `ArrowLeft` | w-4 | `#141F33` | Legal pages (via LegalPage), sitemap, case-studies |
| `Wrench` | w-5, w-6, w-8 | `#141F33`, `#2A5CFF` | Features, industries, case-studies |
| `BarChart3` | w-5, w-6, w-8 | `#141F33`, `#2A5CFF` | Features, industries, sidebar, analytics |
| `Building2` | w-5, w-8 | `#141F33` | Industries, admin sidebar |
| `HeartPulse` | w-6, w-8 | `#141F33` | Industries, case-studies |
| `Car` | w-6, w-8 | `#141F33` | Industries, case-studies |
| `Utensils` | w-6, w-8 | `#141F33` | Industries, case-studies |
| `ShoppingBag` | w-6, w-8 | `#141F33` | Industries, case-studies |
| `Globe` | w-5, w-8 | `#141F33` | How-it-works, automation, global |
| `Clock` | w-5, w-8 | `#141F33` | How-it-works, automation |
| `DollarSign` | w-5, w-8 | `#141F33` | How-it-works, industries, admin sidebar |
| `Package` | w-5, w-8 | `#141F33` | How-it-works |
| `MapPin` | w-3, w-5 | primary, `#141F33` | Contact, case-studies |
| `Phone` | w-5, w-10, w-12 | primary, `#141F33` | Contact, voice (dashboard) |
| `Shield` | w-5 | `#141F33` | Trust, admin sidebar |
| `FileText` | w-5, w-6, w-8 | `#141F33`, `#2A5CFF` | Chatbot, onboarding, trust, sidebar, EmptyState |
| `Search` | w-5 | `#141F33` | Chatbot |
| `Lock` | w-5, w-6 | `#141F33` | Chatbot, trust, sign-up |
| `Users` | w-5, w-8 | `#141F33` | Chatbot, dashboard, sidebar, EmptyState |
| `Home` | w-5, w-6 | `#141F33` | Case-studies, sidebar |
| `Settings` | w-5 | `#141F33` | Sidebar |
| `Code` | w-5 | `#141F33` | Developers |
| `Terminal` | w-5 | `#141F33` | Developers |
| `Radio` | w-5 | `#141F33` | Developers |
| `Folder` | w-8, w-10 | `#141F33` | Documents (dashboard) |
| `Ambulance` | w-5, w-8 | `#141F33` | Automation, industries |
| `ClipboardList` | w-5 | `#141F33` | Automation, chat (dashboard) |
| `PartyPopper` | w-12 | `#2A5CFF` | Thank-you |
| `Flag` | w-8 | `#141F33` | Industries |
| `Construction` | w-8 | `#141F33` | Industries |
| `Scale` | w-8 | `#141F33` | Industries |
| `Bell` | w-8 | `#141F33` | Industries |
| `Briefcase` | w-5, w-6 | `#141F33` | Case-studies, sign-up |
| `Hotel` | w-6 | `#141F33` | Case-studies |
| `Activity` | w-6 | `#141F33` | Case-studies |
| `Truck` | w-6 | `#141F33` | Case-studies |
| `GraduationCap` | w-6 | `#141F33` | Case-studies |
| `Database` | w-6 | `#141F33` | Case-studies |
| `Smile` | w-6 | `#141F33` | Case-studies |
| `Compass` | w-6 | `#141F33` | Case-studies |
| `Dumbbell` | w-6 | `#141F33` | Case-studies |
| `ChevronLeft` | w-5 | `#141F33` | Case-studies |
| `ChevronRight` | w-5 | `#141F33` | Case-studies |
| `Handshake` | w-5 | `#141F33` | Trust |
| `BadgeCheck` | w-5 | `#141F33` | Trust |
| `Download` | w-4 | `#141F33` | Trust |
| `TrendingUp` | w-3.5 | `#2A5CFF` | Analytics (dashboard) |
| `X` | w-4 | inherited | Chat, Toast, FeedbackWidget |
| `Ban` | w-10 | `#141F33` | Admin layout |
| `Menu` | w-5 | inherited | Admin sidebar |

### Inline SVG Icons (Custom, not lucide-react)
- **Star** (5-point, rating, `w-4 h-4 text-[#2A5CFF]`) — Landing testimonials
- **Social proof brand icons** (Building, Plus, Factory, Home — `h-8 w-8 text-[#141F33]`, grayscale) — Landing
- **Flag icons** (Middle East, Europe — `w-8 h-8 text-[#141F33]`) — Global page
- **Chevron down** (accordion toggle — `w-4 h-4`, rotate-180 on open) — FAQ, automation, chatbot
- **Hamburger menu** (3-line, 20×20) — Header
- **Close X** (18×18) — Header
- **Dashboard icon** (16×16, 4-rect) — Header UserButton
- **Social icons** (Instagram, Facebook, X, Threads, TikTok, LinkedIn, YouTube — `w-3.5 h-3.5`) — Footer
- **Logo SVG** (120×32) — Footer
- **Shield** (14×14) — Footer Trust Center
- **DownloadSvg** (20×20) — Dashboard privacy
- **TrashSvg** (20×20) — Dashboard privacy
- **AlertTriangleSvg** (16×16) — Dashboard privacy, legal-accept, billing (settings)
- **CheckCircleSvg** (16×16, 48×48) — Dashboard privacy, legal-accept
- **LoaderSvg** (16×16, 24×24, with `animate-spin`) — Dashboard privacy, legal-accept
- **ShieldSvg** (20×20, 24×24, 32×32) — Billing settings, security incidents, legal-accept
- **PlusSvg** (16×16) — Security incidents
- **ChevronDownSvg / ChevronUpSvg** (16×16) — Security incidents
- **SearchSvg** (16×16) — Security incidents
- **Plus-circle, Monitor, Plus-square, Check-square** (16×16, `text-[#141F33]`) — Sitemap
- **Loading spinner** (pure CSS: `border-4 border-[#141F33]/10 border-t-[#141F33]`) — Multiple pages

---

## 3. SHADCN COMPONENTS

| Component | File | Variants | Usage Pages |
|-----------|------|----------|-------------|
| `Button` | `components/shadcn/button.tsx` | default, outline, secondary, ghost, destructive, link | settings, billing, security, sso, integrations, documents, workflows, chat, team, reports, privacy |
| `Badge` | `components/shadcn/badge.tsx` | default, secondary, destructive, outline, ghost, link | — (globbing shows `Badge` from `ui/Badge` is preferred) |
| `Card` | `components/shadcn/card.tsx` | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction | settings, billing, security, sso, integrations, documents, automation, workflows, team, ai-governance, reports, analytics, client-success, chat, privacy |
| `Dialog` | `components/shadcn/dialog.tsx` | Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription | documents (delete confirmation), chat (gap resolution), team (invite) |
| `Breadcrumb` | `components/shadcn/breadcrumb.tsx` | — | — (import available, no usage detected in pages) |

### shadcn Button Styles Per Variant
```
default  → bg-[#141F33] text-[#F8F9FB] hover:bg-[#141F33]/80
outline  → border-[#141F33]/10 bg-[#F8F9FB] text-[#141F33]
secondary→ bg-[#2A5CFF]/10 text-[#2A5CFF]
ghost    → hover:bg-[#F8F9FB] hover:text-[#141F33]
destructive→ bg-[#141F33]/10 text-[#141F33] hover:bg-[#141F33]/20
link     → text-[#141F33] underline-offset-4 hover:underline
```

---

## 4. CUSTOM UI PRIMITIVES (`components/ui/`)

| Component | Purpose | Variants |
|-----------|---------|----------|
| `Tooltip` | Hover text popover | — |
| `Toast` | Slide-in alert | success, error, info (5s auto-dismiss) |
| `Skeleton` | Loading placeholder | text, circular, rectangular, card, table-row, metric-card |
| `SkeletonCard` | Card skeleton | — |
| `SkeletonMetricGrid` | 4-column metric skeleton | — |
| `SkeletonTable` | Table skeleton | configurable rows |
| `ProgressBar` | ARIA-tracked progress | — |
| `LoadingSpinner` | Spinning ring | border-t-[#2A5CFF] |
| `Input` | Form text input | — |
| `EmptyState` | No-data placeholder | AlertTriangle, FileText, BellOff, Users icons |
| `EmptyStateWithRetry` | Error state with retry | — |
| `EmptyDocumentsState` | Empty documents state | — |
| `EmptyAutomationState` | Empty automation state | — |
| `EmptyTeamState` | Empty team state | — |
| `Badge` | Status tag | primary, secondary, success, danger, warning |
| `Avatar` | User initials circle | — |

---

## 5. CUSTOM APPLICATION COMPONENTS

### Marketing (`components/`)
| Component | Key Features |
|-----------|--------------|
| `Header` | Sticky, backdrop-blur-xl, scroll hide/show, mobile drawer, Clerk UserButton, LanguageSwitcher |
| `Header/Logo` | Logo SVG |
| `Header/NavLinks` | Nav with active indicator |
| `Header/MobileMenu` | Slide-in drawer |
| `Footer` | Trust bar, newsletter, 3-column links, social icons, status indicator |
| `Footer/FooterColumn` | Link column |
| `Footer/SocialLinks` | 7 social icon buttons |
| `MarketingHeader` | — |
| `PricingCards` | Card, CardContent, CardFooter, CardHeader, CardTitle, Check icon, animate-slideUp stagger, popular tier badge |
| `IndustrySwitcher` | Pill buttons + select dropdown |
| `MarketplaceCard` | Plugin marketplace card |
| `CookieConsentBanner` | Consent banner |
| `LanguageSwitcher` | Locale switcher |
| `LegalPage` | Header + ArrowLeft back-link + Tailwind prose + Footer |
| `MinimalPage` | Header + localized sections + Footer |
| `SearchOverlay` | Search overlay |
| `DarkModeToggle` | Theme toggle |

### Dashboard (`components/dashboard/`)
| Component | Purpose |
|-----------|---------|
| `DashboardSidebar` | Collapsible sidebar with nav items, badge counts, collapse toggle, UserButton footer |
| `DashboardDesktopHeader` | Sticky desktop header with LanguageSwitcher, DarkModeToggle, Live badge |
| `DashboardMobileHeader` | Sticky mobile header with hamburger, Live badge |
| `BottomNav` | 5-tab mobile bottom navigation |
| `OverviewMetrics` | 4-column metric card grid |
| `QuickActions` | 2×2 / 4-column action grid |
| `UsageCard` | Card with icon header + ProgressBar |
| `RecentActivity` | Activity feed |
| `TeamTable` | Team member table |
| `SettingsTabs` | Pill-style tab bar |
| `DocumentGrid` | Document card grid |
| `ChatInterface` | Chat message list + input |
| `AutomationQueue` | Desktop automation table |
| `AutomationFilters` | Filter + search bar |
| `EmailVerificationGate` | Full-screen email verification |
| `DashboardMobileHeader` | Mobile header |

### Feature Components (`components/`)
| Component | Purpose |
|-----------|---------|
| `WorkflowBuilder` | Workflow canvas |
| `GuardrailsDashboard` | Guardrails config |
| `HITLQueue` | Human-in-the-loop queue |
| `HealthScore` | Circular score indicator |
| `OrgChart` | Org chart |
| `QBRReport` | QBR report |
| `CSATWidget` | CSAT rating widget |
| `CustomFieldBuilder` | Custom field builder |
| `ImportWizard` | Import wizard |
| `NotificationCenter` | Notifications |
| `FeedbackWidget` | FAB + slide-up feedback card |
| `GlobalStatusBar` | Global status bar |
| `GlobalToast` | Global toast container |
| `SearchOverlay` | Search overlay |
| `PullToRefresh` | Pull-to-refresh wrapper |
| `MobileBottomNav` | Mobile bottom nav |
| `ResponsiveTable` | Responsive table |
| `Helper Components` | AnomalyAlert, Breadcrumbs, CookieConsentBanner, DarkModeToggle, GuidedTour, HelpTooltip, KeyboardShortcutsModal, OnboardingChecklist, OnboardingTour, RatingButton, etc. |

### Settings (`components/settings/`)
| Component | Purpose |
|-----------|---------|
| `UnsavedChangesModal` | Portal modal with AlertTriangle, Stay/Leave buttons |

### AgentChat (`components/AgentChat/`)
| Component | Purpose |
|-----------|---------|
| `AgentToolDisplay` | Agent tool display |

### Onboarding (`components/Onboarding/`)
| Component | Purpose |
|-----------|---------|
| `AdaptiveTour` | Adaptive tour |

---

## 6. ANIMATION SYSTEM

### Tailwind Custom Animations (from `tailwind.config.js`)
| Class | Keyframe | Duration | Easing |
|-------|----------|----------|--------|
| `animate-fade-in` | fadeIn (opacity 0→1) | 0.3s | ease-out |
| `animate-fade-out` | fadeOut (opacity 1→0) | 0.2s | ease-in |
| `animate-slide-up` | slideUp (translateY 12px→0 + fade) | 0.4s | ease-out |
| `animate-slide-down` | slideDown (translateY -8px→0 + fade) | 0.3s | ease-out |
| `animate-slide-down-exit` | slideDownExit (translateY 0→8px + fade out) | 0.2s | ease-in |
| `animate-shimmer` | shimmer (bg-position -200%→200%) | 2s | linear infinite |
| `animate-pulse-soft` | pulseSoft (opacity 1→0.7→1) | 2s | cubic-bezier |
| `animate-float` | float (translateY 0→-6px→0) | 3s | ease-in-out infinite |
| `animate-spring-in` | springIn (scale 0.95→1 + fade) | 0.5s | spring cubic-bezier |
| `animate-rainbow` | rainbow (bg-position 0→200%) | var(--speed, 2s) | linear infinite |

### CSS Utility Classes (from `globals.css`)
| Class | Effect |
|-------|--------|
| `.animate-fadeIn` | opacity 0→1 |
| `.animate-fadeOut` | opacity 1→0 |
| `.animate-slideUp` | translateY(16px)→0 + fade |
| `.animate-slideDown` | translateY(-8px)→0 + fade |
| `.animate-scaleIn` | scale(0.95)→1 + fade |
| `.animate-slideDownExit` | translateY(0)→8px + fade out |
| `.animate-reveal` | scroll-triggered fade+slide (Y 24→0) |
| `.animate-reveal-left` | scroll-triggered (X -24→0) |
| `.animate-reveal-right` | scroll-triggered (X 24→0) |
| `.animate-stagger > *` | cascaded fade+slide for lists (nth-child delays 80ms each) |
| `.btn-hover-lift` | translateY(-2px) on hover, scale(0.98) on active |
| `.float-slow` | float 4s ease-in-out infinite |
| `.float-medium` | float 3s ease-in-out infinite |
| `.card-hover` | transition + hover shadow-md + hover scale-[1.02] + hover border |
| `.card-premium` | glass card (bg surface/80, blur16px, border, shadow) |
| `.search-backdrop` | backdrop-filter blur(12px) saturate(180%) |
| `.btn-primary` | Full navy primary button with shine sweep |
| `.btn-secondary` | Light outline button |
| `.btn-ghost` | Transparent button |

### Actual Animation Classes Used Across Pages
| Class | Usage Count | Where |
|-------|-------------|-------|
| `animate-fadeIn` | ~40+ | Most pages, modals, cards, page containers |
| `animate-slideUp` | ~15 | Landing hero, feature cards, FAQ items, pricing cards |
| `animate-slideDown` | ~5 | FAQ accordion open |
| `animate-scaleIn` | ~5 | Modal content |
| `animate-pulse` | ~50+ | All skeletons, Live badge dots, trial badges |
| `animate-spin` | ~12 | Loading spinners, upload, pull-to-refresh |
| `animate-bounce` | ~3 | Chat loading dots (3 dots staggered) |
| `animate-float` | ~1 | Decorative (notebook hero) |
| `animate-stagger` | ~3 | Testimonials, feature grids |
| `animate-reveal` | ~4 | Landing sections |
| `animate-[shineSweep]` | ~1 | Case study card sweep |

### Transition Patterns
| Pattern | Usage |
|---------|-------|
| `transition-all duration-300` | Standard hover/state transitions |
| `transition-all duration-500 ease-out` | ProgressBar |
| `transition-all duration-700` | Card slider |
| `transition-colors` | Link/row hovers |
| `transition-opacity` | Tooltips |
| `transition-transform duration-300` | Sidebar collapse, header hide |
| `hover:scale-[1.01]` | Card hover (subtle) |
| `hover:scale-[1.02]` | Card hover (more) |
| `hover:scale-[1.05]` | Bar hover, pill hover |
| `active:scale-95` | Button press feedback |
| `hover:-translate-y-1` | Card lift |
| `group-hover:scale-110` | Icon scale inside card |
| `hover:shadow-md` | Card elevation |

---

## 7. CSS UTILITY PATTERNS (Design Tokens)

### Color Tokens (hardcoded — never use Tailwind color names)
```
Page background: bg-[#F8F9FB]
Card background: bg-[#F8F9FB]
Primary text:    text-[#141F33]
Accent text:     text-[#2A5CFF]
Muted text:      text-[#141F33]/60
Light text:      text-[#F8F9FB]
Border:          border-[#141F33]/10
Icon container:  bg-[#141F33]/5
Skeleton:        bg-[#141F33]/10
```

### Typography Scale
```
Page title:    text-3xl font-extrabold
Page heading:  text-2xl font-black/ font-extrabold
Section title: text-xl font-extrabold
Card title:    text-sm font-bold
Body text:     text-xs font-semibold
Fine print:    text-[10px] font-bold / font-extrabold
Micro label:   text-[8px] font-extrabold
Eyebrow:       text-[10px] font-extrabold uppercase tracking-widest
Dashboard nav: text-[11px] font-semibold uppercase tracking-[0.35em]
Code/mono:     font-mono text-xs font-bold
```

### Border Radius Scale
```
rounded-lg:    8px  — small controls
rounded-xl:    12px — cards, inputs, buttons (primary radius)
rounded-2xl:   16px — outer containers, large cards
rounded-3xl:   24px — premium cards, loading section containers
rounded-full:  pills, badges, avatars, error buttons, toggles
```

### Shadow Scale
```
shadow-sm:     default card shadow (0 1px 2px rgba(20,31,51,0.05))
shadow-md:     hover state, primary buttons
shadow-lg:     premium cards
shadow-xl:     dialogs, modals
shadow-2xl:    toasts
```

### Layout Patterns
```
Page max-width:  max-w-7xl (1280px) — marketing
                 max-w-4xl / max-w-5xl — content pages
                 max-w-xl / max-w-2xl — dashboard settings forms
                 max-w-md — auth cards
Horizontal pad:  px-4 sm:px-6 lg:px-8
Vertical rhythm: py-14 / py-16 / py-20 (sections)
                 space-y-6 md:space-y-8 (pages)
Card grid:       sm:grid-cols-2 lg:grid-cols-3 gap-6
Metric grid:     sm:grid-cols-2 lg:grid-cols-4 gap-6
Dashboard card:  bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm
```

---

## 8. BUTTON SYSTEM

### CSS Classes (from `globals.css`)
| Class | Background | Text | Border | Hover |
|-------|-----------|------|--------|-------|
| `.btn-primary` | `#141F33` | `#F8F9FB` | `rgba(20,31,51,0.1)` | translateY(-1px) scale(1.01), royal glow |
| `.btn-secondary` | `#F8F9FB` | `#141F33` | `rgba(20,31,51,0.1)` | translateY(-1px) |
| `.btn-ghost` | transparent | `#141F33` | none | bg-[#F8F9FB] translateY(-0.5px) |

### Inline Button Patterns (most common usage)
```
Primary dark:  bg-[#141F33] text-[#F8F9FB] font-bold py-4 rounded-xl text-xs
               min-h-[44px] hover:opacity-95 transition-all

Outline:       bg-[#F8F9FB] border border-[#141F33]/10 text-[#141F33] font-bold
               py-4 rounded-xl text-xs min-h-[44px] hover:bg-[#141F33]/5

Primary link:  inline-flex min-h-[44px] rounded-xl bg-[#141F33] text-[#F8F9FB]
               font-bold text-xs px-8 py-3 shadow-md

Ghost:         text-xs font-bold text-[#141F33] hover:underline
               min-h-[44px] flex items-center

Error Try Again: rounded-full bg-[#141F33] px-6 py-3 text-sm font-semibold
                  text-[#F8F9FB] hover:opacity-90 min-h-[44px]

Error Back:      rounded-full border border-[#141F33]/10 px-6 py-3 text-sm
                  font-semibold text-[#141F33] hover:bg-[#141F33]/5 min-h-[44px]
```

---

## 9. DESIGN PATTERNS

### Page State Architecture (85 pages, 3-file pattern)
1. **Main page** (`page.tsx`) — Full content with real data
2. **Loading skeleton** (`loading.tsx`) — `animate-pulse` blocks mirroring layout
3. **Error boundary** (`error.tsx`) — `AlertTriangle` + heading + description + Try again/Back buttons

### Shared Patterns
| Pattern | Description |
|---------|-------------|
| **Card-as-container** | `bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm` |
| **List-with-dividers** | `divide-y divide-[#141F33]/10` with `first:pt-0 last:pb-0` |
| **Data table** | `bg-[#F8F9FB] border rounded-2xl shadow-sm overflow-x-auto` + hover rows |
| **Status badge** | `text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full` |
| **Page header + subtitle** | `text-xl font-extrabold` + `text-xs font-medium` |
| **Error boundary** | `h-16 w-16 rounded-full bg-[#F8F9FB]` + `AlertTriangle` + heading + 2 buttons |
| **Modal dialog** | shadcn Dialog or custom with backdrop-blur, animate-scaleIn |
| **Toggle switch** | `sr-only peer` checkbox + styled `w-9 h-5 rounded-full` pill |
| **Filter chips** | Toggle button row with active/inactive states |
| **Hero section** | Eyebrow badge + h1 + subtitle + CTAs |
| **Feature card grid** | Icon in container + title + description |
| **Pricing cards** | Toggle (monthly/annual), popular tier badge, feature checklist |
| **FAQ accordion** | Expandable items with chevron rotate |
| **Step wizard** | Progress bar, step indicator, form sections |
| **Sidebar nav** | Active state with border-l or bg highlight |
| **Chat bubbles** | User (navy, right) / AI (cream, left) |
| **Auth card** | Centered `max-w-md`, social login, email/password form |
| **Section separator** | `border-t border-[#141F33]/10 pt-6` |

---

## 10. HUOKS (`hooks/`)

| Hook | Purpose |
|------|---------|
| `useTheme` | Theme state |
| `useMediaQuery` | Responsive breakpoint matching |
| `useSwipe` | Touch swipe gesture detection |
| `usePullToRefresh` | Pull-to-refresh gesture |
| `useScrollReveal` | Scroll-triggered reveal animations |
| `useReducedMotion` | prefers-reduced-motion media query |
| `useDelayedUnmount` | Delayed unmount with animation |
| `useKeyboardShortcut` | Keyboard shortcut binding (Ctrl+S) |
| `useUnsavedChanges` | Dirty tracking + navigation guard |
| `useUsage` | Usage data query |
| `usePendingApprovals` | Pending approvals query |
| `useDocuments` | Documents query |
| `useChatHistory` | Chat history query |
| `useAutomationRequests` | Automation requests query |

---

## 11. LIBRARIES USED

| Package | Purpose |
|---------|---------|
| `next` (v15) | Framework |
| `react` (v19) | UI library |
| `@clerk/nextjs` (v6.39.5) | Authentication |
| `lucide-react` (v1.24.0) | **Only icon library** |
| `@base-ui/react` | shadcn primitives |
| `class-variance-authority` | shadcn variant management |
| `tailwindcss` | CSS framework |
| `geist` (font) | Geist Sans + Mono fonts |
| `@sentry/nextjs` | Error tracking |
| `@tanstack/react-query` | Data fetching |
| `next-intl` | Internationalization (locales: en, fr, ar, hi) |

---

## 12. COLOR PALETTE (3-Color Rule: 60-30-10)

| Token | Hex | Role | 60-30-10 |
|-------|-----|------|----------|
| **Surface** | `#F8F9FB` | Background, cards, inputs | **60%** |
| **Navy** | `#141F33` | Text, headings, borders, dark buttons, sidebar | **30%** |
| **Royal** | `#2A5CFF` | Accent, links, CTAs, focus rings, badges, active states | **10%** |

### Opacity Variants (only acceptable additional colors)
```
/5   — bg-[#141F33]/5   — icon containers, subtle backgrounds
/10  — border-[#141F33]/10 — all borders, skeleton backgrounds
/20  — subtle decorative dots, code block text
/30  — active state overlays
/40  — muted icons
/60  — secondary text, muted text
/70  — descriptions
/80  — header background transparency
```

### Red (legacy — used only in error page icon circles)
```
red-50:   #FFF5F5 — error icon circle bg
red-100:  #FED7D7
red-500:  #EF4444 — error icon color
red-600:  #DC2626
red-800:  #991B1B
```

---

## 13. COMPONENT USAGE FREQUENCY (shadcn + custom UI)

| Component | Pages Using | Category |
|-----------|-------------|----------|
| `Header` | 25+ | Marketing |
| `Footer` | 25+ | Marketing |
| `Card` (shadcn) | 12 | shadcn |
| `Button` (shadcn) | 10 | shadcn |
| `Badge` (custom UI) | 8 | UI primitive |
| `Skeleton` (custom) | 7 | UI primitive |
| `EmptyState` (custom) | 5 | UI primitive |
| `useGlobalToast` | 6 | Toast system |
| `Dialog` (shadcn) | 3 | shadcn |
| `Input` (custom) | 3 | UI primitive |
| `Toast` (custom) | 2 | UI primitive |
| `UnsavedChangesModal` | 2 | Settings |
| `PricingCards` | 3 | Feature |
| `ProgressBar` | 2 | UI primitive |
| `SettingsTabs` | 1 | Dashboard |
| `HealthScore` | 1 | Feature |

---

## 14. KEY ARCHITECTURAL FACTS

- **All icons**: Only from `lucide-react` package (never add new icon libraries)
- **No external icon libraries**: No Heroicons, Tabler, Bootstrap icons
- **No CSS-in-JS**: All styling via Tailwind CSS utility classes
- **3-file pattern**: Every major route has `page.tsx` + `loading.tsx` + `error.tsx`
- **Dark mode**: Via `class` strategy with `.dark` CSS class
- **RTL support**: `dir={locale === 'ar' ? 'rtl' : 'ltr'}` on root divs
- **Touch targets**: `min-h-[44px]` on ALL interactive elements (WCAG)
- **i18n**: 4 locales (en, fr, ar, hi) via `useLocale()` context hook
- **Responsive breakpoints**: `sm:` (640px), `md:` (768px), `lg:` (1024px)
