# SAQYN Rabt — Access Control

## Three Layers

1. Company plan
2. User role
3. Admin-granted permissions

## Company Plans

### chatbot plan
Allows: chatbot, documents, knowledge base, team management, admin settings, usage dashboard
Locks: voice automation, workflows, call dashboard

### voice plan
Allows: voice automation, workflows, call dashboard, team management, admin settings, usage dashboard
Locks: chatbot, documents, knowledge base

### platform plan
Allows: all modules

## Roles

- owner/admin
- manager
- employee/team member
- viewer

## Dashboard UX

### Owner/admin
- Full dashboard navigation
- Locked modules visible with lock icon + "Book a free demo call" CTA
- Can invite team and grant permissions
- Cannot grant modules outside company plan

### Manager
- Modules allowed by plan + role permissions
- No automatic billing/global admin/owner settings access

### Employee/team member
- Default: Chatbot, My Workflows / My Tasks, Profile edit
- More only if admin grants and plan allows

## Backend Enforcement

Source of truth. Direct API denied if plan/role does not allow.

Expected errors:
- `feature_not_in_plan` (403)
- `insufficient_role` (403)
- `onboarding_required` (403)

## Middleware

- `verifyJWT` — verifies Clerk token, enriches with company_id and role from DB
- `requireCompany()` — checks company_id on JWT
- `requirePlanFeature(feature)` — checks company plan_key from company_entitlements
- `requirePermission(resource, action)` — checks JWT permissions array
- `requireRole(...roles)` — checks JWT role
