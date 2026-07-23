# Saqyn Rabt - Agent Instructions

## MCP Servers Available

This project has the following MCP servers configured in `opencode.json`:

### Databases & Storage
- **postgres** — Neon PostgreSQL database. Use for querying the database (read-only queries). Reference: `use postgres`
- **redis** — Upstash Redis for live balance caching. Use for cache operations. Reference: `use redis`
- **pinecone** — Pinecone vector DB for RAG. Use for index management and vector queries. Reference: `use pinecone`
- **cloudflare** — Cloudflare R2 storage & Workers. Requires `npx wrangler login` first. Reference: `use cloudflare`

### Authentication
- **clerk** — Clerk user management & documentation. Use for auth-related questions. Reference: `use clerk`

### Utilities
- **fetch** — Web content fetching. Use for reading URLs, converting to markdown. Reference: `use fetch`

## Environment Variables
All secrets are in `.env.local`. Run `.opencode\load-env.ps1` instead of `opencode` directly to automatically load `.env.local` into the environment on startup. This ensures all MCP servers can access the required credentials.

```powershell
.opencode\load-env.ps1
```

## 🛡 PRODUCTION CODE GUARD — DO NOT MODIFY UNLESS EXPLICITLY REQUESTED

This repository contains **production code deployed to saqynrabt.com**. AI coding agents MUST follow these rules:

### DO NOT MODIFY these patterns without explicit user instruction:
1. **BFF Proxy Routes** (`frontend/app/api/*/route.ts`) — All 21 routes use the `safeGetToken()` pattern from `frontend/lib/safe-auth.ts`. They proxy to the backend worker at `NEXT_PUBLIC_API_URL`. Do not change this proxy logic.
2. **Clerk Auth Utility** (`frontend/lib/safe-auth.ts`) — Uses static `import { auth } from "@clerk/nextjs/server"` with error handling. Do not revert to dynamic import.
3. **Middleware** (`frontend/proxy.ts`) — Clerk middleware for route protection. Do not change the public route list.
4. **Next.js Config** (`frontend/next.config.ts`) — CSP headers and Sentry wrapper are production-tuned.
5. **Package Versions** — `@clerk/nextjs@6.39.5` is pinned for Next.js 16 compatibility. Do not downgrade.

### Before making ANY changes to these files, ask the user explicitly:
- `frontend/app/api/*/route.ts`
- `frontend/lib/safe-auth.ts`
- `frontend/proxy.ts`
- `frontend/next.config.ts`
- `frontend/package.json`
- `frontend/app/layout.tsx`
- `frontend/app/providers.tsx`

## ✅ VERIFIED WORKING COMMIT
- **Commit:** `e14700dbd50129c1922d4ad7166285d87c57d2d5` — Fully working production code, including document upload, soft deletion, cascading Pinecone/R2 cleanups, aligned Neon database schema, fixed Next.js BFF proxy routes, custom Dashboard navigation button in Clerk's UserButton, the merged workspace directory list, and automated Resend invitation emails.
- **Do not revert changes before this commit.** This is the verified perfect production state.
- **Strict Rule:** Absolutely no more code modifications are permitted without explicit user instruction.

### Verification required after any change:
```bash
cd frontend; npm run build
```
Production builds MUST compile with zero errors.

## 📊 Monitoring — https://github.com/salah77712/saqynrabt/actions

All workflow runs are visible in real-time on the GitHub Actions tab. Status badges are shown at the top of `README.md`. GitHub sends **email notifications** for any failed workflow by default — no extra setup needed.

| What to Watch | Where |
|---|---|
| All workflow runs | `https://github.com/salah77712/saqynrabt/actions` |
| Live status badges | `README.md` (top) |
| Failure alerts | GitHub email (automatic) |

## 🤖 GitHub Automation — Fully Automatic (READ ONLY)

The entire GitHub lifecycle is automated. **Do NOT manually create PRs, merge, or delete branches.** The workflows handle everything:

### Workflows (`.github/workflows/`)

| Workflow | Trigger | What It Does |
|---|---|---|
| `ci.yml` | Push/PR to `main` affecting `frontend/` | Runs `npm run typecheck` + `npm run build` |
| `auto-pr.yml` | Push to any non-main branch (except `dependabot/*`) | Creates a PR to `main` with changelog and auto-label |
| `auto-merge-passing.yml` | PR labeled `auto-pr` or self-reviewed with passing CI | Squash-merges the PR automatically |
| `auto-merge.yml` | Dependabot opens a PR | Approves + squash-merges dependency updates |
| `cleanup.yml` | PR is merged/closed | Deletes the source branch |
| `deploy.yml` | (Pre-existing) | Deploys to Vercel |

### The Automated Cycle

1. **Push code** to any branch → `auto-pr.yml` creates a PR
2. **CI runs** on the PR → `ci.yml` validates typecheck + build
3. **CI passes** → `auto-merge-passing.yml` squash-merges to `main`
4. **PR merges** → `cleanup.yml` deletes the branch
5. **Dependencies** → `dependabot.yml` opens weekly update PRs → `auto-merge.yml` approves + merges

### Pre-commit Hook
`npm run typecheck` runs automatically before every local `git commit` (via `package.json` scripts).

### GitHub MCP Server
Configured in `opencode.json` — uses `GITHUB_PERSONAL_ACCESS_TOKEN` from `.env.local`. AI agents can use it for GitHub operations, but the automated workflows should handle most cases.

### What This Means for AI Agents
- **Never** manually create a PR — the workflow does it on push
- **Never** manually merge — the workflow does it when CI passes
- **Never** delete branches — the cleanup workflow handles it
- **Do** push code to feature branches and let automation run
- **Do** let Dependabot handle dependency bumps
