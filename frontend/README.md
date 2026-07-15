# SAQYN RABT — Frontend

Next.js 15 dashboard deployed to Vercel, with companion mobile (Expo) and desktop (Electron) applications.

## Directory Structure

```
frontend/
├── app/                  — Next.js App Router pages & API routes
├── components/           — Shared UI components
├── hooks/                — Custom React hooks
├── lib/                  — Client utilities and config
├── styles/               — Tailwind CSS and globals
├── types/                — TypeScript type definitions
├── public/               — Static assets
├── desktop/              — Electron desktop app
├── mobile/               — Expo React Native app
├── e2e/                  — Playwright end-to-end tests
├── proxy.ts              — Clerk middleware
├── next.config.ts
└── MOBILE_QA.md          — Mobile quality assurance guide
```

## Local Development

```bash
cd frontend
npm install
npm run dev    # http://localhost:3000
npm run build  # next build
```

## Mobile & Desktop

- **Mobile (Expo):** `cd frontend/mobile && npm start`
- **Desktop (Electron):** `cd frontend/desktop && npm start`
- **E2E Tests:** `cd frontend/e2e && npx playwright test`

## Merge.dev Integration Setup
1. Create a Merge.dev account and navigate to your dashboard settings.
2. Retrieve your **Secret API Key** (`MERGE_API_KEY`) and **Public Key** (`NEXT_PUBLIC_MERGE_PUBLIC_KEY`) from the API Keys tab.
3. Configure your redirect URIs in the Merge Dashboard under the Link Configuration options, mapping them to `/admin/integrations`.
4. Copy the key values into your local `.env.local` config file.

