# SAQYN RABT — Backend

Cloudflare Workers backend with PostgreSQL (Neon), Pinecone vector DB, Redis caching (Upstash), and R2 document storage.

## Directory Structure

```
backend/
├── index.ts              — Worker entry point
├── src/                  — Route handlers, middleware, utilities
├── tests/                — Integration tests
├── tsconfig.json
├── wrangler.toml
├── terraform/            — Cloudflare infrastructure (R2 buckets, Worker deployments)
├── migrations/           — SQL migration files
├── tools/                — Utility scripts
├── scripts/              — Audit, backup, and validation scripts
├── docs/                 — Architecture, compliance, design system docs
├── lib/                  — Shared resources (seed.sql)
├── disaster-recovery.md  — Service restoration procedures
└── security.md           — Penetration testing & audit guidelines
```

## Local Development

```bash
cd backend
npm install
npm run dev     # wrangler dev — http://localhost:8787
npm run deploy  # wrangler deploy
npm test        # integration tests
```

## Environment

Copy `.env.local.example` from root to `.env.local`, then:

```powershell
.opencode\load-env.ps1
```

## Database

Run `lib/seed.sql` against your Neon PostgreSQL console to initialize tables and sample data.
