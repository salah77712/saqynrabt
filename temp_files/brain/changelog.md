# SAQYN Rabt — Changelog

## 2026-07-22 — Onboarding & Auth Fix

### Changes
- Fixed Clerk metadata API call: POST → PATCH on /v1/users/{id}/metadata
- Added idempotent re-onboarding (returns {already_existed: true})
- verifyJWT: added company_id lookup from employees table by clerk_user_id
- verifyJWT: added role lookup from employees table by clerk_user_id
- verifyJWT: removed duplicate neon() initialization
- Migration v6: added plan_key column to company_entitlements (default 'platform')
- Created requirePlanFeature() and requireCompany() middleware
- Created PLAN_FEATURES map (chatbot/voice/platform)
- Updated 24 routes with plan feature gates
- Created LockedPage component for locked modules
- Created module-map.ts central config
- Created dashboard profile page
- Rewrote DashboardSidebar to accept navModules prop
- Rewrote MobileBottomNav to consume navModules prop
- Deleted stale DashboardLayoutClient.tsx

### Live State
- CLERK_SECRET_KEY set on Worker ✅
- JWT verification works with valid tokens ✅
- Expired tokens correctly rejected ✅
- Migrations v6 applied ✅
- All routes plan-gated in code
- Onboarding returns correct status
- Health endpoints functional

## 2026-07-23 — Invite + Signup Inheritance Fix

### Changes
- **webhooks.ts**: Read `role` from `company_members` invite (was hardcoded to 'employee'); pass invite's role to Clerk metadata update and employees INSERT/UPDATE
- **onboarding.ts**: Before creating new company, check `company_members` by email for pending invite; if found, inherit `company_id` + `role`, skip company creation
- **approvals.ts**: Call `sendInvitationEmail()` after creating invite record (was defined but never called)
- Created `INVITE_SIGNUP_INHERITANCE_FIX_REPORT.md`

### Live State
- All three handlers deployed to `api.saqynrabt.com`
- Health/wakeup endpoints functional
- `GET /api/public/check-invite` working

### Not Verified
- End-to-end invite → signup → dashboard flow (needs fresh valid Clerk JWT)
- Email delivery via Resend (EMAIL_API_KEY configured but not tested)
- Full live verification (needs fresh valid JWT)
- Plan enforcement (needs non-platform plan in DB)
- Role-based access (needs multi-role test users)
- Knowledge scope separation (not implemented)
- Permission management UI (not implemented)
- Voice automation pipeline (not integrated)
- RAG verification chain (not verified end-to-end)

## 2026-07-23 — Admin Purge Security Fix

### Changes
- **routes.ts**: Added `requireRole('admin')` middleware to `/admin/purge` route (was unprotected at middleware level)
- **purge.ts**: Removed reference to non-existent `approvals` table; added comment explaining skip
- Created `ADMIN_PURGE_SECURITY_VERIFICATION.md` — live verification report
- Created `FULL_WEBSITE_CURRENT_CONTEXT_AND_VERIFICATION_AUDIT.md` — full website audit

### Live Verification
- `/api/admin/purge` handler checked via live HTTP: 403 returned without `X-Admin-Secret` ✅
- Handler-level `X-Admin-Secret` protection confirmed working ✅
- Middleware `requireRole('admin')` needs deploy to activate ✅
- TypeScript typecheck passes with zero errors ✅

### Not Verified
- Fix not deployed (per user instruction — deploy separately)
- Admin secret rotation not performed
