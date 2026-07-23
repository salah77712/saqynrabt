# SAQYN Rabt — Next Tasks

## Priority 0 — Invite → Signup Inheritance (DONE)

- [x] Webhook: use invite's role in Clerk metadata + employees INSERT
- [x] Onboarding: check company_members by email before new company creation
- [x] Invitation email: call sendInvitationEmail() after invite creation
- [ ] End-to-end live verification (blocked: no fresh valid Clerk JWT)

## Priority 1 — Auth Live Verification

- [ ] CLERK_SECRET_KEY set ✅
- [ ] Get fresh valid Clerk JWT (current active session)
- [ ] Verify /api/onboarding returns 200
- [ ] Verify /api/employees returns 200 (admin role) or 403 (permissions)
- [ ] Verify /api/chat returns proper response (not 500)

## Priority 0 — Security: Admin Purge Protection (DONE)

- [x] Route: add `requireRole('admin')` middleware to `/admin/purge`
- [x] Handler: remove non-existent `approvals` table reference
- [x] Created ADMIN_PURGE_SECURITY_VERIFICATION.md
- [ ] **Deploy the fix** to production Worker
- [ ] Verify deployed fix blocks unauthenticated requests with JWT-level 401 (not just handler-level 403)

## Priority 2 — Purge Mock Data

- [x] Fix purge handler: remove `approvals` reference (table doesn't exist) ✅
- [ ] Deploy purge handler fix
- [ ] Call purge endpoint (after deploy)
- [ ] Delete Clerk users via Clerk API

## Priority 3 — Invitation Email Quality

- [ ] Call sendInvitationEmail() ✅ (done in Task 1)
- [ ] Verify email delivery via Resend (EMAIL_API_KEY configured)
- [ ] Consider async email queue for reliability

## Priority 3 — Invitation Email Quality

- [ ] Call sendInvitationEmail() ✅ (done in Task 1)
- [ ] Verify email delivery via Resend (EMAIL_API_KEY configured)
- [ ] Consider async email queue for reliability

## Priority 4 — LockedPage + Plan/Role UX

- [ ] Add LockedPage wrapper to all dashboard pages
- [ ] Implement plan-gated locks for non-platform plans
- [ ] Implement role-gated locks for employee/viewer roles
- [ ] Direct URL protection test (backend 403 not frontend-only)

## Priority 5 — Team Page Cleanup

- [ ] Hide approve/suspend/invite actions for non-admin/manager roles
- [ ] Add plan/role awareness to team page

## Priority 6 — Permission Management UI

- [ ] Admin permission management page
- [ ] Role presets (admin/manager/employee/viewer)
- [ ] Permission checkboxes per resource:action
- [ ] Save permissions to DB + Clerk metadata
- [ ] BFF proxy routes

## Priority 7 — Knowledge Scope Separation

- [ ] DB migration: add knowledge_scope column
- [ ] Upload API: accept scope parameter
- [ ] Ingestion: multi-namespace upsert with scope
- [ ] Chat query: scope-filtered retrieval
- [ ] Voice query: scope-filtered retrieval (if RAG added)
- [ ] Frontend: scope selector on upload UI

## Priority 8 — Full Live Verification

- [ ] chatbot-only plan: verify feature_not_in_plan for voice/workflows
- [ ] voice plan: verify feature_not_in_plan for chat/documents
- [ ] platform plan: all modules accessible
- [ ] Employee access: limited modules as expected
- [ ] LockedPage component renders for locked modules
