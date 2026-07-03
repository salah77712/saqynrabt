# SAQYN RABT - Unified Queue & Staff Knowledge Hub

SAQYN RABT is a secure, tenant-isolated, RAG-enabled SaaS platform engineered for hospitality, clinic, and industrial operations. It combines a **Staff Knowledge Hub** (chat interface) and a **Guest & Client Queue** (automated router) with optional **Voice AI Integration** (Vapi).

---

## Architectural Footprint

```
                     ┌──────────────────────────────┐
                     │      Clerk Authentication    │
                     └──────────────┬───────────────┘
                                    │
                                    ▼
┌───────────────────────┐    API Calls   ┌──────────────────────────────┐
│  Next.js 15 Frontend  ├───────────────>│  Cloudflare Workers Backend  │
│  (Deployed to Vercel) │                │  (Deployed via Wrangler)     │
└───────────────────────┘                └──────────────┬───────────────┘
                                                        │
                      ┌─────────────────────────────────┼───────────────────────────────┐
                      │                                 │                               │
                      ▼                                 ▼                               ▼
        ┌───────────────────────────┐    ┌───────────────────────────┐    ┌───────────────────────────┐
        │       Neon serverless     │    │      Cloudflare R2        │    │       Upstash Redis       │
        │      (PostgreSQL DB)      │    │  (SOP PDFs & Chat Logs)   │    │  (Balance Query Caching)  │
        └───────────────────────────┘    └───────────────────────────┘    └───────────────────────────┘
```

---

## Setup & Local Development

### 1. Prerequisite Installations
Ensure Node.js is installed. Run the workspace helper script to download dependencies across all folders:
```bash
npm run install:all
```

### 2. Database Schema Initialization
Use the standalone script [`/lib/seed.sql`](file:///c:/Users/salah/saqyn-rabt/lib/seed.sql) on your Neon PostgreSQL console to set up all tables and seed sample vector entries.

### 3. Setup Local Environments
Copy the templates into place:
- **Root workspace**: Copy [`.env.local.example`](file:///c:/Users/salah/saqyn-rabt/.env.local.example) to `.env.local`.
- **Frontend client**: Copy [`frontend/.env.local`](file:///c:/Users/salah/saqyn-rabt/frontend/.env.local) as local configuration.

### 4. Running the Dev Servers
From the root workspace directory, run:
- **Frontend (Next.js)**: `npm run dev:frontend` (Hosts on [http://localhost:3000](http://localhost:3000))
- **Backend (Cloudflare Workers)**: `npm run dev:backend` (Hosts on [http://localhost:8787](http://localhost:8787))

---

## Voice AI Integration (Vapi)

Voice AI capabilities are guarded via a **financial dead-switch**. When active, the system connects calls through Vapi and streams real-time transcriptions to the dispatcher dashboard.

### 1. Enable Configuration
Ensure the following variables are defined in your environments:
- **Root `.env.local`**:
  ```env
  VOICE_AI_ACTIVATED="true"
  VAPI_API_KEY="your_vapi_private_key_here"
  ```
- **Wrangler `backend-workers/wrangler.toml`**:
  ```toml
  [vars]
  VOICE_AI_ACTIVATED = "true"
  VAPI_API_KEY = "your_vapi_private_key_here"
  ```
- **Frontend `frontend/.env.local`**:
  ```env
  NEXT_PUBLIC_VOICE_AI_ACTIVATED=true
  ```

### 2. Configure Vapi Webhooks
To receive live transcription events, call status updates, and audio summaries:
1. Log into your [Vapi Dashboard](https://app.vapi.ai/).
2. Navigate to **User Settings** -> **Webhooks**.
3. Point your Webhook URL to your worker endpoint:
   `https://<your-worker-subdomain>.workers.dev/api/vapi-webhook`
4. Vapi will automatically post call data frames which are processed securely.
