# SAQYN RABT — Unified Queue & Staff Knowledge Hub

![CI](https://github.com/salah77712/saqynrabt/actions/workflows/ci.yml/badge.svg)
![Auto PR](https://github.com/salah77712/saqynrabt/actions/workflows/auto-pr.yml/badge.svg)
![Auto Merge](https://github.com/salah77712/saqynrabt/actions/workflows/auto-merge-passing.yml/badge.svg)
![Dependabot](https://github.com/salah77712/saqynrabt/actions/workflows/auto-merge.yml/badge.svg)
![Cleanup](https://github.com/salah77712/saqynrabt/actions/workflows/cleanup.yml/badge.svg)

A secure, tenant-isolated, RAG-enabled SaaS platform for hospitality, clinic, and industrial operations. Combines a Staff Knowledge Hub (chat interface) and a Guest & Client Queue (automated router) with optional Voice AI Integration (Vapi).

## Structure

```
saqyn-rabt/
├── frontend/        — Next.js 15 dashboard (Vercel), mobile (Expo), desktop (Electron), e2e tests
├── backend/         — Cloudflare Workers API, Terraform, DB migrations, scripts, docs, lib
├── .github/         — CI/CD workflows
├── .wrangler/       — Wrangler cache
└── AGENTS.md        — AI agent rules
```

## Quick Start

```bash
npm run install:all
npm run dev:frontend   # http://localhost:3000
npm run dev:backend    # http://localhost:8787
```

See `backend/README.md` and `frontend/README.md` for detailed documentation.
