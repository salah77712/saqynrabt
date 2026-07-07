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
- **Commit:** `09f503375ac827935ff1816736b9b83d31ccf730` — Fully working production code, including document upload, soft deletion, cascading Pinecone/R2 cleanups, aligned Neon database schema, fixed Next.js BFF proxy routes, and the custom Dashboard navigation button in Clerk's UserButton.
- **Do not revert changes before this commit.** This is the verified perfect production state.
- **Strict Rule:** Absolutely no more code modifications are permitted without explicit user instruction.

### Verification required after any change:
```bash
cd frontend; npm run build
```
Production builds MUST compile with zero errors.
