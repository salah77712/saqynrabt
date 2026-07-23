# Dashboard Plan + Role + UX Access Control Audit

**Date:** 2026-07-23
**Scope:** Full-stack audit of plan-based, role-based, and UX-level access controls
**Auditor:** AI Agent (deepseek-v4-flash-free)

---

## Executive Summary

The backend authorization layer is solid — every route in `routes.ts` is gated with `requireCompany()`, `requirePlanFeature()`, and `requirePermission()`/`requireRole()` middleware. The `verifyJWT` utility properly hydrates `company_id` and `role` from the DB into the JWT context.

The **frontend UX layer has critical gaps**: no page-level access control exists on any dashboard page. The `LockedPage` component exists but is unused. The layout only filters navigation items from the sidebar/bottom-nav — it does NOT prevent direct URL access to restricted pages.

The team invite flow is **incomplete**: invitation emails are never sent (function defined but uncalled), and invited users who sign up create a new company instead of joining the existing one.

Admin/module pages for inbox, audit_logs, call_dashboard, and admin_panel exist in module-map.ts but have **no actual page files** — would return 404.

---

## Layer 1: Database Schema ✅

| Entity | Key Columns | Status |
|---|---|---|
| `company_entitlements` | `plan_key` (chatbot/voice/platform) | ✅ Deployed v6 |
| `employees` | `role` (admin/manager/employee/viewer), `is_active` | ✅ Deployed |
| `company_members` | `role` (admin/employee), `status` (pending/active/suspended/deleted) | ✅ Deployed |
| `permissions` column | Does not exist in any table | Not needed — role-based via PLAN_FEATURES + ROLE_PERMISSIONS |

No issues found. Schema supports the full access model.

---

## Layer 2: Backend Authorization ✅

### Middleware (`backend/src/security/authorization.ts`)
All four middleware functions exist and are deployed:

| Middleware | Function | Status |
|---|---|---|
| `requireCompany()` | Rejects if no `jwt.company_id` | ✅ |
| `requirePlanFeature(feature)` | Checks `company_entitlements.plan_key` against `PLAN_FEATURES` map | ✅ |
| `requirePermission(permission)` | Checks role from JWT against `ROLE_PERMISSIONS` | ✅ |
| `requireRole(roles)` | Checks `jwt.role` is in allowed array | ✅ |

### Routes (`backend/src/routes.ts`)
All 24+ routes carry proper middleware. No unprotected endpoints discovered.

### verifyJWT (`backend/src/utils.ts`)
- Extracts `sub` from JWT
- Falls back to DB: queries `employees` table by `clerk_user_id` for `company_id` and `role`
- Populates `jwt.company_id`, `jwt.role`, `jwt.sub`, `jwt.email`

**Result: Backend is properly gated. No bypass possible without a valid Clerk JWT.**

---

## Layer 3: Frontend Nav/Layout Filtering ⚠️

### `layout.tsx`
- Reads `plan_key` from `EntitlementsContext`
- Reads `userRole` from Clerk `user.publicMetadata.role` or employee data
- Calls `getModuleVisibility()` to filter `navModules`
- Passes `navModules` to `DashboardSidebar` + `MobileBottomNav`

**Result: Nav hides locked/plan-restricted items but does NOT prevent rendering page content.**

### `module-map.ts`

**PLAN_FEATURES:**
| Plan | Features |
|---|---|
| `chatbot` | chatbot, documents, profile |
| `voice` | voice_automation, workflows, call_dashboard, profile |
| `platform` | ALL features |

**ROLE_PERMISSIONS:**
| Role | Can Access |
|---|---|
| admin | Everything (all crud ops) |
| manager | chatbot:read, workflows:read/update, team:read, profile:read/update, approvals:read/update |
| employee | chatbot:read, workflows:read, profile:read/update |
| viewer | chatbot:read, documents:read, profile:read/update |

**Key module visibility rules:**
- `overview`: admin only (managerVisible:false, employeeVisible:false)
- `documents`: admin only
- `voice_agent`: admin only
- `call_dashboard`: admin only
- `team`: admin + manager
- `approvals`: admin + manager
- `settings` + all sub-settings: admin only
- `profile`: all roles
- `chatbot`: all roles
- `workflows`: all roles

---

## Layer 4: Frontend Page Access 🔴 CRITICAL

**No page in `frontend/app/dashboard/` uses the `LockedPage` component.** Every page renders its full content regardless of plan or role.

| Page | Module Key | Has LockedPage? | Risk |
|---|---|---|---|
| `/dashboard` (overview) | overview | ❌ | Admin-only data visible to all roles |
| `/dashboard/chat` | chatbot | ❌ | Should be visible to all — OK |
| `/dashboard/documents` | documents | ❌ | Employee/viewer can access (backend blocks writes) |
| `/dashboard/voice` | voice_agent | ❌ | Only checks env var, not plan/role |
| `/dashboard/workflows` | workflows | ❌ | All roles see full UI |
| `/dashboard/team` | team | ❌ | Employee can access — has Approve/Suspend/Invite buttons |
| `/dashboard/approvals` | approvals | ❌ | No plan/role gate |
| `/dashboard/profile` | profile | ❌ | Should be visible to all — OK |
| `/dashboard/analytics` | usage | ❌ | Has mock data fallback |
| `/dashboard/reports` | reports | ❌ | Has download/export functionality |
| `/dashboard/settings` | settings | ❌ | Admin-only data visible to all |
| `/dashboard/settings/roles` | (sub) | ❌ | Hardcoded local state, no API |
| `/dashboard/settings/billing` | billing_status | ❌ | Static info page — low risk |
| `/dashboard/settings/security` | (sub) | ❌ | Static info |
| `/dashboard/settings/branding` | (sub) | ❌ | Company branding form |
| `/dashboard/settings/prompts` | (sub) | ❌ | System prompt editor |
| `/dashboard/settings/webhooks` | (sub) | ❌ | Webhook CRUD |
| `/dashboard/settings/api` | (sub) | ❌ | API key generation |
| `/dashboard/settings/integrations` | (sub) | ❌ | Integration cards |

**Non-existent pages (404):**
- `/dashboard/inbox` — defined in module-map, no page
- `/dashboard/admin` — defined in module-map, no page
- `/dashboard/calls` — call_dashboard defined, no page
- `/dashboard/audit` — audit_logs defined, no page

**Mitigating Factor:** Backend enforces authorization on all API calls. A user who navigates to a restricted page sees an empty UI or get 401/403 on API calls, but they still see the full page chrome and potentially confusing error states.

---

## Layer 5: Team Invite & Inheritance 🟡 FIXED 2026-07-23

### Invite Flow (`handlePostApproval` action: 'invite')
| Step | Status |
|---|---|
| Insert `company_members` with `status:'pending'`, `role:'employee'` | ✅ |
| Fetch inviter name for email | ✅ |
| Fetch company name for email | ✅ |
| Log audit event | ✅ |
| **Send invitation email** | ✅ **FIXED — `sendInvitationEmail()` now called after invite creation** |
| Return `{ success, companyName, inviterName }` to frontend | ✅ |

### Signup Flow (`handlePostOnboarding`) — FIXED
| Step | Status |
|---|---|
| Check `employees` table by `clerk_user_id` | ✅ |
| **Check `company_members` table by email** | ✅ **FIXED — joins existing company if invite found** |
| Inherit `company_id` from invite | ✅ |
| Inherit `role` from invite | ✅ |
| Insert into `employees` with inherited role | ✅ |
| Update `company_members` clerk_user_id | ✅ |
| Update Clerk public_metadata with inherited company_id + role | ✅ |
| Create new company (no invite case) | ✅ unchanged |
| Set `plan_key: 'platform'` (new company only) | ✅ unchanged |

### Clerk Webhook (`handleClerkWebhook`) — FIXED
| Step | Status |
|---|---|
| Read `role` from `company_members` invite | ✅ **FIXED — was hardcoded to 'employee'** |
| Pass invite's role to Clerk metadata update | ✅ |
| Pass invite's role to employees INSERT/UPDATE | ✅ |
| Link `clerk_user_id` in company_members | ✅ |

### Approval Flow (`handlePostApproval` action: 'approve')
| Step | Status |
|---|---|
| Update `company_members` status to 'active' | ✅ |
| Update `employees` is_active to TRUE | ✅ |
| Log audit | ✅ |

### 🟢 All Layer 5 findings resolved. End-to-end test blocked by no fresh Clerk JWT.

---

## Layer 6: Billing & Plan Management ⚠️

| Aspect | Status |
|---|---|
| Plan selection during onboarding | ❌ — Always sets `plan_key: 'platform'` |
| Stripe checkout integration | ❌ — Not implemented |
| Stripe webhook handler | ❌ — Not implemented |
| Plan change mechanism | ❌ — `plan_key` never updated after onboarding |
| Cancel subscription UI | ❌ — Static page, button has no effect |
| Overage settings | ⚠️ — Toggle exists, posts to `/api/overage-settings` but no actual payment processing |
| `billing_status` module in module-map | ✅ — Defined, gated behind `platform` plan |
| Billing page URL accessibility | ❌ — No page-level gate, static info visible to all roles |

### Risk
Currently all companies are on `plan_key: 'platform'` with unlimited features. Once Stripe is integrated, plan enforcement will rely on the backend `requirePlanFeature` middleware which checks the DB `plan_key` — this is correct. But frontend will need LockedPage integration to avoid confusion.

---

## Layer 7: Admin Capabilities ⚠️

| Capability | Status |
|---|---|
| `handlePatchEmployee` role promotion | ✅ — Max 2 admins enforced |
| `handlePostApproval` suspend action | ✅ |
| Role management frontend (`settings/roles`) | ❌ — Local state only, no API persistence |
| Admin dashboard page | ❌ — `/dashboard/admin` doesn't exist |
| Usage stats/analytics frontend | ❌ — Uses mock data as fallback |
| Audit log export | ✅ — CSV export via `/api/export-logs` |

---

## Risk Summary

| Priority | Layer | Issue |
|---|---|---|
| 🔴 P0 | Team Invite | Invitation emails never sent |
| 🔴 P0 | Team Invite | Invited users create new companies on signup |
| 🔴 P1 | Frontend Pages | No LockedPage protection on any page |
| 🔴 P1 | Frontend Pages | team/approvals pages show admin actions to all roles |
| 🟡 P2 | Frontend Modules | 4 module pages missing (inbox, admin, calls, audit) |
| 🟡 P2 | Settings | Roles page has no API persistence |
| 🟡 P3 | Plan Mgmt | No Stripe/plan-change flow |
| 🟢 P3 | Purge Handler | References non-existent `approvals` table |
| 🟢 P3 | Voice Page | Uses env var instead of plan_key for gating |

---

## Fix Status

| Priority | Layer | Issue | Status |
|---|---|---|---|
| 🔴 P0 | Team Invite | Invitation emails never sent | ✅ FIXED 2026-07-23 |
| 🔴 P0 | Team Invite | Invited users create new companies on signup | ✅ FIXED 2026-07-23 |
| 🔴 P1 | Frontend Pages | No LockedPage protection on any page | ❌ Not started |
| 🔴 P1 | Frontend Pages | team/approvals pages show admin actions to all roles | ❌ Not started |
| 🟡 P2 | Frontend Modules | 4 module pages missing (inbox, admin, calls, audit) | ❌ Not started |
| 🟡 P2 | Settings | Roles page has no API persistence | ❌ Not started |
| 🟡 P3 | Plan Mgmt | No Stripe/plan-change flow | ❌ Not started (out of scope) |
| 🟢 P3 | Purge Handler | References non-existent `approvals` table | ❌ Not started |
| 🟢 P3 | Voice Page | Uses env var instead of plan_key for gating | ❌ Not started |

## Remaining Fix Order

1. ✅ Signup inheritance + invitation email (Task 1 complete)
2. **Add LockedPage to all dashboard pages** — Wrap each page component with `LockedPage` using the module's `planFeature` and `requiredPermission`
3. **Fix team page** — Hide action UI for non-admin/manager roles
4. **Create missing module pages** — Add basic placeholder pages for inbox, admin, calls, audit
5. **Switch voice page to plan_key** — Replace `NEXT_PUBLIC_VOICE_AI_ACTIVATED` env var check with `useEntitlements` plan_key check
6. **Fix purge handler** — Remove `approvals` table reference
