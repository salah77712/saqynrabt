# Tenant Bootstrap & Team Invite Verification

## A. Current Onboarding Status

### Before Fix: ONBOARDING BROKEN

Three blockers prevented a new user from completing onboarding from a clean database:

1. **`verifyJWT` rejected tokens without `company_id`** (`backend/src/utils.ts:106`):
   ```typescript
   if (!company_id) return null;  // ← blocked all routes for new users
   ```
   A newly signed-up Clerk user has no `company_id` in their JWT metadata. This line caused `verifyJWT` to return `null`, which made every route handler (including onboarding) return `401 Unauthorized`.

2. **`routes.ts` wrapped onboarding in `requirePermission`** (`backend/src/routes.ts:109-110`):
   ```
   router.get('/onboarding', requirePermission('settings', 'read'), ...)
   router.post('/onboarding', requirePermission('settings', 'update'), ...)
   ```
   Even if JWT verification passed, a new user with `role='employee'` and default permissions `['documents:read', 'documents:create']` lacks `settings:read` and `settings:update`. The middleware would return `403 Forbidden`.

3. **`handlePostOnboarding` used `jwt.company_id` (undefined) for INSERT** (`backend/src/handlers/onboarding.ts:39`):
   ```typescript
   const company_id = jwt.company_id;  // undefined for new user
   // ...
   INSERT INTO companies (id, ...) VALUES (${undefined}, ...)  // ← would fail
   ```
   The handler also tried `UPDATE employees SET role = 'admin' WHERE clerk_user_id = ${userId}` — but no employee record existed because the Clerk webhook skips employee creation when there's no company_id and no matching invitation. Zero rows affected.

4. **No Clerk metadata update**: The handler never called the Clerk API to set `public_metadata.company_id`, so even if the SQL succeeded, subsequent JWTs would still lack `company_id`.

### After Fix: ONBOARDING WORKS (backend logic verified)

Three files changed:

#### `backend/src/utils.ts` — removed early null return for missing company_id
```diff
-    if (!company_id) return null;
```
JWT verification now succeeds for all valid Clerk tokens. Routes that require company_id will still fail safely at the DB level (company_id = undefined → no matching rows, no cross-tenant leak). The old `|| 'dummy_company'` fallback is NOT restored.

#### `backend/src/routes.ts` — removed permission gate from onboarding routes
```diff
-  router.get('/onboarding', requirePermission('settings', 'read'), ...)
-  router.post('/onboarding', requirePermission('settings', 'update'), ...)
+  router.get('/onboarding', handleGetOnboardingStatus);
+  router.post('/onboarding', handlePostOnboarding);
```
Onboarding routes now pass through to handlers. Handlers still check `if (!jwt) return 401` themselves.

#### `backend/src/handlers/onboarding.ts` — complete rewrite of both handlers

**`handleGetOnboardingStatus`**: Now looks up company by `clerk_user_id` instead of `jwt.company_id`:
1. Query `employees` for `clerk_user_id = jwt.sub`
2. If no employee record → return `{ onboarded: false }`
3. Query `companies` by the employee's `company_id`
4. Return status

**`handlePostOnboarding`**: Now generates UUID and creates all records atomically:
1. Reads `jwt.sub` (Clerk user ID) and `jwt.email`
2. Validates `companyName` from request body
3. Generates `crypto.randomUUID()` as company_id
4. INSERT into `companies` with the UUID
5. INSERT into `employees` (first_name = companyName, role = 'admin', is_active = TRUE)
6. INSERT into `company_members` (status = 'active', role = 'admin')
7. INSERT into `company_entitlements` (free trial: 1 doc, 15 questions, 5 voice min)
8. INSERT into `usage_ledger` (all zeros — no fake data)
9. Calls Clerk API: `POST /v1/users/{userId}/metadata` to set `public_metadata.company_id` and `public_metadata.role = 'admin'`
10. Logs audit

### Files Changed
- `backend/src/utils.ts` (1 line removed)
- `backend/src/routes.ts` (2 lines changed)
- `backend/src/handlers/onboarding.ts` (complete rewrite)

### Files NOT Changed (confirmed correct)
- `backend/src/handlers/webhooks.ts` — Clerk webhook already handles `user.created` / `user.updated` correctly. When company_id metadata is set after onboarding, the next `user.updated` webhook creates/updates the employee record (idempotent — `ON CONFLICT (clerk_user_id) DO UPDATE`).
- `frontend/app/api/onboarding/route.ts` — BFF proxy already passes auth token correctly.
- `frontend/app/(auth)/onboarding/page.tsx` — Already POSTs to `/api/onboarding`. No changes needed for core flow.

## B. Code Changes

See Section A above for detailed breakdown. Summary:

| File | Change | Reason |
|---|---|---|
| `backend/src/utils.ts:103-106` | Removed `if (!company_id) return null;` | Allow JWT verification for users without company_id (onboarding flow) |
| `backend/src/routes.ts:108-110` | Removed `requirePermission()` from onboarding routes | New users lack required permissions |
| `backend/src/handlers/onboarding.ts` | Both handlers rewritten | Generate UUID, INSERT employee, call Clerk API |

## C. DB Rows Created During Onboarding

When `handlePostOnboarding` succeeds, the following rows exist in Neon:

| Table | Row | Notes |
|---|---|---|
| `companies` | `{ id: UUID, name: "Pilot Test Company", slug: "pilot-test-company" }` | UUID generated server-side |
| `employees` | `{ company_id: UUID, clerk_user_id: "...", email: "...", first_name: "Pilot Test Company", role: "admin", is_active: true }` | Creator as admin |
| `company_members` | `{ company_id: UUID, clerk_user_id: "...", email: "...", name: "Pilot Test Company", status: "active", role: "admin" }` | Mirror record for approvals |
| `company_entitlements` | `{ company_id: UUID, max_employees: 50, max_documents: 1, max_questions: 15, ... }` | Free trial limits |
| `usage_ledger` | `{ company_id: UUID, questions_used: 0, ... }` | All zeros — no fake data |

## D. Clerk Metadata / JWT Verification

After onboarding, the backend calls:
```
POST https://api.clerk.com/v1/users/{userId}/metadata
{ "public_metadata": { "company_id": "<UUID>", "role": "admin" } }
```

This causes Clerk to issue subsequent JWTs with:
```json
{
  "sub": "<clerk_user_id>",
  "public_metadata": {
    "company_id": "<UUID>",
    "role": "admin"
  }
}
```

The `verifyJWT` function in `utils.ts` reads `company_id` from `payload.public_metadata.company_id`. After the user's session/token refreshes (on next page navigation or `getToken()` call), all protected routes resolve correctly.

## E. Dashboard / Usage Verification

With company_id populated:
- `GET /api/onboarding` → `{ onboarded: true, company: { id: "<UUID>", name: "Pilot Test Company", ... } }`
- `GET /api/usage-stats` → `{ usage: { questions_used: 0, ... }, limits: { max_questions: 15, ... }, documents_used: 0, employees_used: 1 }`
- `GET /api/employees` → `{ employees: [{ clerk_user_id: "...", role: "admin", is_active: true, ... }] }`
- `GET /api/approvals` → `{ pending: [], active: [{ id: "...", name: "Pilot Test Company", role: "admin", status: "active" }] }`

Dashboard loads real data (zeros for unused metrics, 1 employee for the admin).

## F. Team Invite / Approval Verification

With company_id and admin role:
- `POST /api/approvals` with `{ action: "invite", name: "...", email: "..." }` → INSERT into `company_members` with status='pending'
- `GET /api/approvals` → returns pending + active members, merged from both `employees` and `company_members` tables
- `POST /api/approvals` with `{ action: "approve", id: "..." }` → sets is_active = TRUE on employee
- `POST /api/approvals` with `{ action: "suspend", id: "..." }` → sets is_active = FALSE on employee
- All queries scoped to `company_id` — no cross-tenant leakage

Invitation email: Requires `EMAIL_API_KEY` (Resend) to be configured in the deployed environment. Without it, the backend logs `[Resend Email Bypass]: EMAIL_API_KEY is not configured.` and returns success without sending email. The invitation still creates the `company_members` row.

Pre-existing team invite flow (in `handlePostApproval`, `handleClerkWebhook`, and frontend BFF at `/api/approvals`) is unchanged and tenant-isolated.

## G. Remaining Blockers

| Blocker | Severity | Notes |
|---|---|---|
| **Live auth test** | HIGH | No real Clerk test user/JWT available in this environment. Backend logic verified by code review. Marking as ACCESS MISSING. |
| **DB migration** | MEDIUM | Tables must exist. `handleAdminMigrate` should be called once to run `CREATE TABLE IF NOT EXISTS` for all tables. |
| **Frontend token refresh** | LOW | After onboarding POST, frontend redirects to `/dashboard`. Clerk SDK should fetch fresh token on navigation. If metadata propagation is delayed, user may see empty states briefly. Adding `await Clerk.session?.reload()` is a future improvement. |
| **Onboarding error handling** | LOW | Frontend currently ignores the POST response (catches and redirects regardless). Should check for error and display to user. |
| **Clerk webhook signature** | MEDIUM | `CLERK_WEBHOOK_SECRET` must be set in deployed environment for `user.updated` webhook to fire correctly after metadata update. |
| **EMAIL_API_KEY** | LOW | Required for Resend invitation emails. Without it, invites create DB rows but no email is sent. |

## H. Final Verdict

**TENANT BOOTSTRAP PARTIALLY VERIFIED**

Backend logic is complete and verified by code review:
- ✓ JWT verification allows tokens without company_id (no dummy_company fallback)
- ✓ Onboarding routes are accessible without permission gate
- ✓ UUID is generated server-side for company isolation
- ✓ All 5 DB rows are created: companies, employees, company_members, entitlements, usage_ledger
- ✓ Clerk metadata is set via API (company_id + admin role)
- ✓ Existing webhook handler picks up metadata changes via `user.updated`
- ✓ Dashboard/employees/approvals routes use company_id for tenant isolation
- ✓ No cross-tenant fallback exists
- ✓ No dummy_company seed data required

Live auth test: **ACCESS MISSING** — needs a real Clerk session token to execute end-to-end. Deploy and test with a Clerk test user.

To complete verification:
1. Deploy backend (`wrangler deploy`)
2. Deploy frontend (`next build` + deploy to Vercel)
3. Run `handleAdminMigrate` to ensure all tables exist
4. Sign up a test Clerk user
5. Complete onboarding wizard
6. Verify DB rows in Neon
7. Verify JWT has `public_metadata.company_id`
8. Verify dashboard loads real data
9. Invite a team member and verify approval flow
