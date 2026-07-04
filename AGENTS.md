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
