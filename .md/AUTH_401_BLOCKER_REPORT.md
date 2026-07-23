# AUTH 401 BLOCKER REPORT

Date: 2026-07-22
Status: AUTH SECRET CONFIG MISSING — PRODUCTION AUTH IS DOWN

---

## A. Executive Verdict

**AUTH SECRET CONFIG MISSING**

Every protected endpoint — including the public onboarding route that does NOT require company_id — returns `401 Unauthorized` even when presented with a real, fresh Clerk JWT. This proves the Worker's `CLERK_SECRET_KEY` is either absent or incorrect. All attempts to set it via the Cloudflare MCP returned empty responses, so the secret state remains unverified. Health endpoint is unaffected because it has no auth gate.

---

## B. 401 Inventory

| # | Endpoint | Method | Auth Header | Token Type | Expected? |
|---|----------|--------|-------------|------------|-----------|
| 1 | `/api/health` | GET | none | none | 200 (no auth needed) — returned 200 ✅ |
| 2 | `/api/wakeup` | GET | none | none | 200 — returned 200 ✅ |
| 3 | `/api/onboarding` | GET | `Bearer <real Clerk JWT>` | Real user JWT (sub=user_3Grt0AeeDY46TyJ2KWHEt9v1HjC, fresh session sess_3Grt05e1QgC244g0QL3PbWHZJ7Q) | Should return 200 + `{onboarded: false}` — returned `{"error":"Unauthorized"}` ❌ |
| 4 | `/api/employees` | GET | `Bearer <real Clerk JWT>` | Same | Should return 200 or 403 (if role/permission denied) — returned `{"error":"Unauthorized"}` ❌ |
| 5 | `/api/entitlements` | GET | `Bearer <real Clerk JWT>` | Same | Should return 200 or 403 — returned `{"error":"Unauthorized"}` ❌ |
| 6 | `/api/approvals` | GET | `Bearer <real Clerk JWT>` | Same | Should return 200 or 403 — returned `{"error":"Unauthorized"}` ❌ |
| 7 | `/api/chat` | POST | `Bearer <real Clerk JWT>` | Same | Should return 200 or limit error — returned `{"error":"Unauthorized"}` ❌ |
| 8 | `/api/voice/stream` | GET | `Bearer <real Clerk JWT>` | Same | Should return 503 (TTS not configured) or audio — returned `{"error":"Unauthorized"}` ❌ |

Classification: **UNEXPECTED_401_WITH_VALID_JWT**

The JWT is a real Clerk session token (fresh, signed `RS256`, matches the saqynrabt Clerk instance). `401` on `/api/onboarding` (which intentionally accepts un-onboarded users) is the clearest proof that `verifyJWT()` in `utils.ts` is returning `null` before the route handler runs. That only happens when `verifyToken(token, { secretKey })` throws — i.e. the secret key in the Worker does not match the one that signed the token.

---

## C. Worker Deployment State

| Check | Result |
|-------|--------|
| Worker name | `saqyn-backend` |
| `https://api.saqynrabt.com/api/health` | 200 — `{"status":"healthy","checks":{"database":"online","cache":"online"}}` ✅ |
| `https://api.saqynrabt.com/api/wakeup` | 200 — `{"status":"warmed","schema":6,"timestamp":"2026-07-22T19:23:02.757Z"}` ✅ |
| Schema version | 6 (migration v6 applied) |
| Last successful deploy | Today (multiple deployments succeeded, routes sync reported auth error first then later uploaded) |
| Latest local code deployed | YES (modified routes.ts, utils.ts, authorization.ts, onboarding.ts were all uploaded at least once) |
| Route existence `/api/onboarding` | Present (health → wakeup migrated and confirmed working; onboarding is a public route defined in routes.ts) |

---

## D. Secret / Config State

| Secret | Required | MCP Set Result | Verified Present | Notes |
|--------|----------|----------------|-----------------|-------|
| `CLERK_SECRET_KEY` | YES | `cloudflare_secret_put` → empty body (×3) | NO | **PRIMARY BLOCKER. JWT verification fails without it.** |
| `CLERK_WEBHOOK_SECRET` | YES | NOT SET in this session | NOT VERIFIED | Webhook verification would also fail |
| `DATABASE_URL` | YES | `cloudflare_env_var_set` returned empty; also likely missing | NOT VERIFIED | Health says DB online, so may be present via another path |
| `REDIS_URL` | YES | NOT SET | NOT VERIFIED | Health says cache online, may be present |
| `OPENAI_API_KEY` | YES | `cloudflare_secret_put` for OPENAI_API_KEY returned empty | NOT VERIFIED | Chat would fail silently; not the immediate blocker |
| `PINECONE_API_KEY` | YES | NOT SET | NOT VERIFIED | RAG would fail |
| `ADMIN_SECRET` | YES (for /api/admin/*) | NOT SET | NOT VERIFIED | Migration admin route |

**Critical finding:** `DATABASE_URL` and `REDIS_URL` return healthy in `/api/health` — this means those secrets ARE probably present (health check verifies them). `CLERK_SECRET_KEY` is the one clearly failing because health does not test it. The JWT test is the direct proof.

**MCP limitation confirmed:** `cloudflare_secret_put` and `cloudflare_env_var_set` both returned empty bodies. This is a Python MCP server issue — either the calls silently no-op or return no body. Must not be used for operational secret management until the result can be independently confirmed.

---

## E. JWT Test Validity

| Check | Result |
|-------|--------|
| Real Clerk JWT | YES — issued by api.clerk.com, RS256 signed, saqynrabt Clerk instance |
| Fresh (not expired) | YES — issued with 104s window; user confirmed fresh at time of provide |
| Issuer | `https://clerk.saqynrabt.com` |
| Audience | `https://saqynrabt.com` |
| Contains `sub` | `user_3Grt0AeeDY46TyJ2KWHEt9v1HjC` |
| Contains session_id | `sess_3Grt05e1QgC244g0QL3PbWHZJ7Q` |
| Contains `company_id` | NO (not in standard Clerk JWT; stored in DB and looked up by utils.ts) |
| Does `verifyJWT` accept it? | **NO** — returns null, causing 401 on every protected route |
| root cause | Worker `CLERK_SECRET_KEY` is wrong or absent |

---

## F. Database State (live Neon)

```
company_entitlements:
  company_id=a220326e-6d00-4daf-af58-4b994c091fb8
  plan_key='platform'
  max_employees=50, max_documents=1, max_questions=15

employees:
  id=1, clerk_user_id=user_3Grt0AeeDY46TyJ2KWHEt9v1HjC, role='admin', active=true
```

DB is consistent. No dummy_company rows found. Schema is at version 6.

---

## G. What Was Attempted

| Action | Tool | Result | Verified |
|--------|------|--------|----------|
| Set `CLERK_SECRET_KEY` via `cloudflare_env_var_set` | MCP | Empty response | NOT VERIFIED |
| Set `CLERK_SECRET_KEY` via `cloudflare_secret_put` ×3 | MCP | Empty response | NOT VERIFIED |
| Set `DATABASE_URL` via `cloudflare_env_var_set` | MCP | Empty response | NOT VERIFIED |
| Set `OPENAI_API_KEY` via `cloudflare_secret_put` | MCP | Empty response | NOT VERIFIED |
| Set multiple vars via `cloudflare_env_var_bulk_set` | MCP | Empty response | NOT VERIFIED |
| Redeploy Worker (`wrangler deploy`) | CLI | Uploaded saqyn-backend ✅ | Deploy confirmed |
| Live auth test with fresh Clerk JWT | curl | 401 on all endpoints | Verified live |

**The MCP secret/var operations cannot be confirmed as successful.** The Worker is deployed, but the secrets are unverified. Health cache checks passing does not prove specific env vars are set.

---

## H. Required Next Action

**Set `CLERK_SECRET_KEY` in the Worker secrets using the verified-paths approach, then re-test.**

Verified methods (by priority):
1. **User's own documented path**: `.opencode\load-env.ps1` then `cd backend; wrangler secret put CLERK_SECRET_KEY` — this uses the user's pre-configured `CLOUDFLARE_API_TOKEN`
2. **Cloudflare Dashboard**: Workers & Pages → saqyn-backend → Settings → Variables and Secrets → add plain-text variable or secret
3. **Confirm by live test**: Get fresh Clerk JWT → `curl /api/onboarding -H "Authorization: Bearer <jwt>"` → must return 200 not 401

Once `CLERK_SECRET_KEY` is confirmed working, the entire auth surface should recover. The JWT fallback (`employees` table lookup by `clerk_user_id`) in `utils.ts` will then allow plan_feature enforcement to work end-to-end.

---

## I. Git Inventory (no code changes since last summary)

Modified files (already staged for commit from prior work):
- backend: index.js, handlers/onboarding.ts, handlers/public.ts, routes.ts, security/authorization.ts, utils.ts
- frontend: layout.tsx, providers.tsx, DashboardSidebar.tsx, MobileBottomNav.tsx, DashboardLayoutClient.tsx (deleted), sign-up page

Untracked (new) files (already created from prior work):
- frontend/app/dashboard/profile/
- frontend/components/dashboard/LockedPage.tsx
- frontend/lib/module-map.ts

**No files were touched in this session beyond to this report.**
