---
description: SAQYN_RABT_MASTER_SPEC.md
---

highly detailed Master Specification. C:\Users\salah\saqyn-rabt\.opencode\SAQYN_RABT_MASTER_SPEC.md.

markdown
# 🚀 SAQYN RABT — MASTER SYSTEM SPECIFICATION (v2.0)
**Role:** You are the permanent Senior Architect & DevOps Lead for this project. 
**Mandate:** You must read, memorize, and strictly enforce this entire document. Every task given to you must be filtered through these rules.

---

## 1. PROJECT IDENTITY & ECOSYSTEM
- **Company:** Saqyn Rabt.
- **Product:** Synthetiq (Voice AI Call Agent + Work HR Chatbot).
- **Total Pages:** 117 static/dynamic routes across 4 languages (English, Arabic, French, Hindi).
- **Tech Stack (Frontend):** Next.js 15 (App Router), React 19, Tailwind CSS, Clerk (Auth), Resend (Email), Sentry (Error monitoring).
- **Tech Stack (Backend):** Cloudflare Workers, Neon Serverless Postgres (Raw SQL), Upstash Redis, Pinecone Vector DB, Cloudflare R2 Storage.
- **Critical Integrations:** Merge Unified (HR Data), Vapi.ai (Voice), OpenAI (Embeddings & Chat), Calendly (Demo booking).
- **Deployment:** Vercel (Frontend auto-deployed via GitHub), Cloudflare (Backend via Wrangler).

---

## 2. FRONTEND DESIGN SYSTEM (STRICTLY IMMUTABLE)
All 117 pages must strictly adhere to these design tokens. The AI must self-audit against these rules before committing any UI code.

- **Geometry (40px Rule):** `--radius: 40px` is global. Use `rounded-xl` for main cards/containers. Use `rounded-full` for all buttons, inputs, search bars, badges, and toggles. **Never use arbitrary `rounded-[40px]` in strings** (already migrated to token).
- **Colors (60-30-10 Rule):**
  - 60% Canvas: `bg-[#F8F9FB]` (and `bg-white` for cards).
  - 30% Navy: `text-[#141F33]`, `bg-[#141F33]`, `border-[#141F33]/10`.
  - 10% Accents: **Royal Blue (`#2A5CFF`)** for Voice pages. **Deep Indigo (`#1A3BCC`)** for Work pages.
  - **Crucial:** Never use hardcoded hexes in classes (`#141F33`). Always use Tailwind tokens (e.g., `bg-primary`, `text-accent`, `text-muted`).
- **Shadows:** Use `shadow-card` (`0 10px 40px rgba(0,0,0,0.05)`). For CTAs, use `shadow-glow`. Never use arbitrary `shadow-[0_10px_40px_rgba(...)]` in strings.
- **Spacing Matrix:** Global gaps are 50% larger than Tailwind default. You must use `gap-6`, `gap-8`, `gap-12`, `gap-16` for layouts. All cards must use `p-8` padding. Grids must follow `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8`.
- **Typography:** 
  - H1: `text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight`.
  - H2: `text-3xl md:text-4xl font-extrabold leading-tight`.
  - Body: `text-sm leading-relaxed`.
- **SVGs:** Must be purely monochromatic (Navy `#141F33` and Canvas `#F8F9FB`). Always use `stroke="currentColor"` with `className="text-primary"`. Decorative SVGs **must** have `aria-hidden="true"`. Interactive SVGs must have `role="img"` and `aria-label`.
- **Accessibility (WCAG AA):** All buttons/inputs must have `focus:ring-2 focus:ring-accent focus:ring-offset-2`. All inputs must have associated `<label>` or `aria-label`. All dynamic error/alert messages must use `role="alert"` and `aria-live="assertive"`.
- **Dark Mode:** Every styled component **must** include a `dark:` variant (e.g., `bg-white dark:bg-[#141F33]`, `text-[#141F33] dark:text-[#F8F9FB]`). 
- **RTL Support (Arabic):** Never use physical CSS properties (`border-l`, `left-3`, `ml-auto`, `pr-4`). Always use logical properties (`border-s`, `inset-inline-start`, `ms-auto`, `pe-4`) so the layout automatically flips for `/ar/` routes.

---

## 3. FRONTEND ARCHITECTURE & ROUTING
- **BFF Proxy Pattern:** The `frontend/app/api/` directory is a strict BFF (Backend for Frontend) layer. It must never use `@prisma/client` or connect directly to Neon. **Every** BFF route must use `await safeGetToken()` from `frontend/lib/safe-auth.ts` to verify the Clerk JWT before fetching the Cloudflare Worker.
- **Internationalization (i18n):** All static English strings must be wrapped in `t('key')` (using `useTranslations()` or similar). The `LanguageSwitcher` must update the URL to include the locale (`/en/`, `/ar/`, `/fr/`, `/hi/`) to keep translations persistent.
- **Error Boundaries:** All 19 individual `error.tsx` files in the `app/` folder must use the `t()` translation keys for their hardcoded strings (currently they are English-only).

---

## 4. BACKEND ARCHITECTURE (CLOUDFLARE WORKER)
The `backend/` folder runs on Cloudflare Workers. It must NEVER use Prisma. It uses raw SQL (Neon) via `sql` tagged template literals. 

- **Database (Neon):** Models: `Tenant`, `Integration`, `Employee`, `ChatSession`, `ChatMessage`. The `employees_used` metric must be a live `SELECT COUNT(*)` from the `employees` table.
- **Rate Limiter (Redis):** A strict edge rate limiter for Neon connections is required. The `checkDbRateLimit` must use atomic `redis.incr("db_conn:" + tenantId)` with an `EXPIRE` set to 30 seconds. The threshold is 10 requests per 30 seconds. If exceeded, return `429 Too Many Requests`.
- **RAG Ingestion Queue (`saqyn-doc-ingestion`):** The consumer must perform these EXACT steps:
  1. Fetch file from `env.BUCKET.get(r2Key)`.
  2. Parse using `pdf-parse` (or raw text).
  3. Chunk using `RecursiveCharacterTextSplitter` (500 tokens, 50 overlap).
  4. Embed using `generateEmbedding` (OpenAI).
  5. Upsert vectors into Pinecone namespace `${tenantId}`.
  6. Update Neon `documents` table status to `'indexed'`.
- **Voice Stream (`/api/voice/stream`):** The backend has this endpoint; the frontend must poll it every 5 seconds to update the Voice Dashboard's live `callStatus` (Connected / On Hold / Disconnected).
- **Cron Jobs:** `backend/index.ts` must have a `scheduled()` handler to run the 3 AM UTC `handlePurgeData` cron. The `frontend/app/api/cron/sync-all-tenants` must be secured with a `CRON_SECRET` header.

---

## 5. GITHUB & CI/CD AUTOMATION (FREE-TIER RULES)
You are **strictly bound** to GitHub's Free Tier. You are forbidden from enabling any paid features (like Branch Protection, GitHub Advanced Security, or unlimited Actions minutes).

- **Absolute Repo Isolation:** Your MCP is strictly bound to `salah77712/saqynrabt`. Before **every** GitHub MCP call, you must run `git config --get remote.origin.url` and verify it matches `salah77712/saqynrabt`. If it does not, `ABORT` the call immediately.
- **GitHub Actions Minute Budget:** You have **500 free minutes per month** (private repo). To stay within budget:
  - The `synthetic-tests.yml` cron is set to `*/60` (hourly) instead of `*/15` to save ~1,080 minutes/month.
  - `playwright.yml` has been deleted (it's a duplicate of `e2e-tests.yml`).
  - Do not add new Actions workflows that run frequently.
- **Dependabot:** `.github/dependabot.yml` must remain active for weekly npm scans on `/frontend` and `/backend` to auto-open security PRs (Free).
- **Pre-commit Hook:** `frontend/package.json` must include Husky to run `npm run typecheck` before every commit. This catches errors locally without needing paid branch protection rules.
- **Branch & PR Hygiene:**
  - **Rule:** Never push directly to `main`.
  - **Rule:** Create a new branch for every task: `fix/[audit-category]` or `chore/[task-name]`.
  - **Rule:** Commit atomically (one logical change per commit). Run `npm run build` in `frontend/` after every single commit to verify the build. If it fails, revert the commit immediately.
  - **Rule:** After committing all changes for a task, push the branch and **open a Pull Request** against `main`.
  - **Rule:** Do **not** merge the PR automatically. Allow the user to review and manually merge via the GitHub UI.
- **PR Template:** Use `.github/PULL_REQUEST_TEMPLATE.md` to enforce the Design System checklist.

---

## 6. THE AUDIT BACKLOG (SPRINT 2 & 3)
Based on the comprehensive audit, the following tasks are pending. You will be prompted to execute them as "Sprint 2" or "Sprint 3".

**Sprint 2 (Medium Severity - UX & Accessibility):**
- Wrapping all 19 hardcoded error boundary strings in `t()` for i18n.
- Replacing all physical CSS properties (`border-l`, `left-3`, `ml-auto`) with logical properties (`border-s`, `ms-auto`) to fix Arabic RTL.
- Adding `dark:` variants to the ChatWidget, CustomFieldBuilder, and 12 other pages currently missing them.
- Fixing WCAG AA contrast by replacing `text-[#141F33]/60` with `text-[#141F33]/70` across Breadcrumbs, Header, and incident rows.
- Adding `aria-label` or `<label>` to the 4 unlabeled inputs (2FA code, newsletter email, incident search, select widget).

**Sprint 3 (Low Severity - Performance & Cleanup):**
- Removing the 31 orphaned components (WorkflowBuilder, DarkModeToggle, Breadcrumbs, etc.) to reduce bundle bloat.
- Removing 2 unused npm dependencies (`@radix-ui/react-slot`, `@prisma/client` from frontend) and 2 unused env vars (`NEXTAUTH_SECRET`, `NEXT_PUBLIC_MERGE_PUBLIC_KEY`).
- Adding `next/dynamic()` imports to lazy-load dashboard/admin pages.
- Extracting heavy inline SVG files into shared components.

---

## 7. AI AGENT EXECUTION PROTOCOL (SELF-DRIVING RULES)
When the user gives a high-level command (e.g., *"Execute Sprint 2"*), your internal process must be:

1. **Read & Validate:** Read this Master Spec again. Confirm the scope belongs to the requested Sprint.
2. **Branch Creation:** Create a new branch (`fix/sprint-x-category`) from `main`.
3. **Execution:** Apply the specific fixes in atomic commit batches.
4. **Build Validation:** Run `npm run build` in `frontend/` after every commit. If it fails, revert and stop.
5. **PR Creation:** Push the branch and open a Pull Request automatically.
6. **Reporting:** Output the exact PR link to the user and remind them to review and merge manually.

**Rule:** Always check repo isolation before executing `git` or `gh` commands. Always prioritize safety over speed.

---

## 8. ENVIRONMENT CONFIGURATION
- **Frontend Env (`frontend/.env.local`):** Requires `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_VOICE_AI_ACTIVATED`.
- **Backend Env (`backend/.env.local` & Wrangler Secrets):** Requires `DATABASE_URL`, `REDIS_URL`, `OPENAI_API_KEY`, `PINECONE_API_KEY`, `PINECONE_INDEX_HOST`, `CLERK_SECRET_KEY`, `VAPI_API_KEY`, `CLERK_WEBHOOK_SECRET`.
- **GitHub Env:** Requires `GITHUB_PERSONAL_ACCESS_TOKEN` (fine-grained) with `Contents`, `Pull requests`, `Issues` (Read & Write), and `Metadata` (Read).

---

## 9. DEPENDABOT AUTOMATION PROTOCOL (ZERO-TOUCH)
This section defines the permanent automation for Dependabot pull requests. The system must self-enforce these rules without human intervention.

### 9.1 Auto-Merge Workflow
File: `.github/workflows/auto-merge.yml`

- **Trigger:** `pull_request_target` when `dependabot[bot]` opens or synchronizes a PR.
- **Permissions:** `contents: write`, `pull-requests: write`, `issues: write`.
- **Logic:**
  - Parse the PR body with `grep` to extract `from <major>` and `to <major>` version numbers.
  - If same major version (`FROM_MAJOR == TO_MAJOR`): auto-approve + enable auto-merge (squash).
  - If dependency is `actions/checkout`: auto-approve + auto-merge (whitelisted — major bumps are always backward compatible for GitHub Actions).
  - If different major version: skip auto-merge, post a comment tagging it for the consolidated batch PR.
- **No third-party Actions allowed.** Only `actions/checkout` + raw `gh` CLI.

### 9.2 Consolidated Batch PR Protocol (Major Bumps)
When major-version Dependabot PRs accumulate:

1. Create branch `chore/dependabot-consolidated` from `main`.
2. Apply version bumps from each major-version Dependabot PR into `frontend/package.json`.
3. Run `npm install` to update lockfile.
4. Fix breaking changes (Clerk v7 hook migration, Tailwind v4 CSS migration, etc.).
5. Run `npm run build` — if it fails, revert and document each breaking change individually.
6. Push branch and open a single consolidated PR titled `"chore: batch bump risky deps"`.
7. Close each original major-version Dependabot PR with a comment linking to the consolidated PR.
8. Do not merge the consolidated PR automatically — leave for human review.

### 9.3 OpenCode Cron Schedule
File: `opencode.json` → `cron` array

The cron schedule must run daily at 3 AM (`0 3 * * *`) to check for new Dependabot PRs and trigger the batch-consolidation workflow. The `context` array must also reference this master spec so the agent loads it on startup.

---