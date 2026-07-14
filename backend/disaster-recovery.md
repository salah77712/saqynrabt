# Disaster Recovery Plan — SAQYN RABT

This document outlines the standard operating procedures to restore services, databases, and hosted Workers in the event of an outage or structural corruption.

## 1. Database Restoration (Neon PostgreSQL)

Neon PostgreSQL performs daily automated snapshots. In case of data loss:

### Restoring from Neon Console
1. Navigate to your [Neon Console](https://console.neon.tech).
2. Select the active project `saqyn-rabt`.
3. Under the **Backups** tab, choose the latest stable snapshot.
4. Click **Restore to Branch** or **Restore in Place**.

### Manual Command-Line Restore
If you have a local SQL backup dump file:
```bash
pg_restore --no-owner --clean --no-privileges -h <NEON-HOST-URL> -U <USER> -d <DB-NAME> backup_file.dump
```

---

## 2. Platform Redeployment

### Backend Workers (Cloudflare)
To redeploy the workers, ensure your Environment secrets are loaded:
```powershell
# Load secrets
.opencode\load-env.ps1

# Build and deploy
cd backend
npx wrangler deploy
```

### Frontend Dashboard (Vercel)
To rebuild the Next.js frontend, push to GitHub or run:
```bash
vercel --prod
```

---

## 3. Environment Secrets Checklist

Ensure the following keys are populated in your Cloudflare/Vercel dashboard variables:
* `NEON_DATABASE_URL` — Connection string for PostgreSQL.
* `REDIS_URL` — Upstash Redis connection string.
* `OPENAI_API_KEY` — OpenAI token for RAG embeddings & chat.
* `CLERK_SECRET_KEY` — Clerk user management verification key.
* `STRIPE_SECRET_KEY` — Stripe payment endpoint integration key.
* `STRIPE_WEBHOOK_SECRET` — Stripe billing signature key.
* `EMAIL_API_KEY` — Resend transactional dispatch key.
