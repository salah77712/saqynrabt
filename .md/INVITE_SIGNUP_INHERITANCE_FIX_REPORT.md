# Invite + Signup Inheritance Fix Report

**Date:** 2026-07-23
**Status:** DEPLOYED (code live on `api.saqynrabt.com`)
**Verification:** ACCESS MISSING — no valid Clerk JWT available for end-to-end test

---

## Files Changed

| File | Change |
|---|---|
| `backend/src/handlers/webhooks.ts` | Read `role` from `company_members` invite; use it in Clerk metadata + employees INSERT/UPDATE |
| `backend/src/handlers/onboarding.ts` | Check `company_members` by email before creating new company; inherit `company_id` + `role` from invite |
| `backend/src/handlers/approvals.ts` | Call `sendInvitationEmail()` after creating invite record (was defined but never called) |

---

## What Was Fixed

### 1. Clerk Webhook — Role Inheritance (`webhooks.ts`)
**Before**: Webhook always hardcoded `role: 'employee'` in Clerk metadata update and `employees` INSERT. Invite's role was ignored.
**After**: Webhook reads `role` from `company_members` (`member.role || 'employee'`) and passes it to:
- Clerk public metadata update (`PATCH /v1/users/{id}/metadata`)
- `employees` INSERT/UPDATE statement

### 2. Onboarding — Company Inheritance (`onboarding.ts`)
**Before**: `handlePostOnboarding` only checked `employees` table by `clerk_user_id`. If not found, created a brand new company — invited users created separate companies instead of joining the inviting company.
**After**: Before creating a new company, onboarding checks `company_members` by `email`. If a pending invite is found:
- Inherits `company_id` and `role` from the invite
- Creates `employees` row with inherited values
- Links `clerk_user_id` in `company_members`
- Updates Clerk public metadata with inherited `company_id` and `role`
- Skips company, company_entitlements, and usage_ledger creation

### 3. Invitation Email — Actually Sent (`approvals.ts`)
**Before**: `sendInvitationEmail()` function defined at line 224 but never called in the `action === 'invite'` handler.
**After**: `sendInvitationEmail(request.env, email, name, inviterName, companyName, 'employee')` is called fire-and-forget after the invite record is created.

---

## Desired Flow (After Fix)

1. Admin invites `sara@company.com` → `company_members` row created with `company_id`, `role: 'employee'`, `status: 'pending'`
2. Invitation email sent to `sara@company.com` with sign-up link
3. Sara signs up via Clerk → Clerk fires `user.created` webhook → handled by `handleClerkWebhook`:
   - Reads invite from `company_members` by email
   - Uses invite's `role` (not hardcoded 'employee')
   - Updates Clerk metadata with `company_id` + `role`
   - Creates `employees` row with inherited `role`
4. If webhook fires before Sara hits onboarding: `handlePostOnboarding` finds existing employee → returns `{already_existed: true}`
5. If onboarding fires before webhook: `handlePostOnboarding` checks `company_members` by email → inherits company + role → creates employee + updates metadata directly
6. `verifyJWT` reads `role` and `company_id` from `employees` table → JWT context has correct values
7. Dashboard renders with inherited company plan + role

---

## Verification Status

| Check | Status |
|---|---|
| Code deployed | ✅ Live on `api.saqynrabt.com` |
| Health endpoint | ✅ `200` |
| `/api/public/check-invite` | ✅ `200` |
| No dummy_company fallback | ✅ Confirmed not present |
| No client-controlled company_id | ✅ Confirmed not present |
| End-to-end invite → signup → dashboard | 🔴 ACCESS MISSING — requires valid Clerk JWT |
| Email delivery test | 🔴 Not tested (EMAIL_API_KEY is configured in `.env.local`) |

## Manual Test Steps (requires active Clerk session)

1. **Create an invite**: Admin with valid JWT calls `POST /api/approvals` with `{"action":"invite","name":"Test User","email":"test@example.com"}`
2. **Verify company_members row**: `SELECT * FROM company_members WHERE email = 'test@example.com'` — should show `company_id`, `role: 'employee'`, `status: 'pending'`
3. **Sign up as invitee**: Use Clerk sign-up with same email (`test@example.com`)
4. **Verify webhook**: Check employees table — should have `company_id` from invite, `role: 'employee'`
5. **Check Clerk metadata**: GET `https://api.clerk.com/v1/users/{userId}` — `public_metadata.company_id` and `public_metadata.role` should match invite
6. **Verify onboarding**: `GET /api/onboarding` with invitee's JWT — should return `{onboarded: true, company: {id: <invited_company_id>, ...}}`
7. **Verify dashboard access**: Call any plan-gated endpoint — should resolve against inherited company's `plan_key`

---

## Remaining Work After Task 1

1. **Task 2**: Fix invitation email correctness (already partially done — email is now sent)
2. **Task 3**: LockedPage + plan/role locked UX
3. **Task 4**: Team page cleanup/fix
