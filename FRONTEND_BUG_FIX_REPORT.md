# Frontend Bug Fix Report

Date: 2026-07-23

## Summary
Fixed 16+ frontend bugs across 12 files covering 4 categories:
1. Auth token anti-pattern (`window.Clerk` → `useAuth().getToken()`)
2. Mock/hardcoded data fallbacks
3. Silent error handling (empty catch blocks)
4. URL mismatch (query param vs REST path)
5. Local toast instead of global toast

---

## Bug #1: `window.Clerk.session.getToken()` Anti-Pattern

**Files fixed:** 6

| File | Occurrences | Fix |
|------|-------------|-----|
| `admin/security/incidents/page.tsx` | 3 | Added `useAuth` import, `getToken()` from hook |
| `dashboard/privacy/page.tsx` | 2 | Added `useAuth` import, `getToken()` from hook |
| `dashboard/legal-accept/page.tsx` | 2 | Added `useAuth` import, `getToken()` from hook |
| `dashboard/team/page.tsx` | 2 | Added `useAuth` import, `getToken()` from hook |
| `dashboard/reports/page.tsx` | 1 | Added `useAuth` import, `getToken()` from hook |
| `components/CookieConsentBanner.tsx` | 1 | Safer `(window as any).Clerk` pattern (intentional — may render outside Clerk provider) |

**Why it's a bug:** `window.Clerk` is not guaranteed to be available, is not type-safe, and bypasses Clerk's React lifecycle. The proper pattern is `useAuth().getToken()` in client components.

---

## Bug #2: Mock/Hardcoded Data Fallbacks

**Files fixed:** 4

| File | Bug | Fix |
|------|-----|-----|
| `dashboard/analytics/page.tsx` | Silently fell back to `MOCK_STATS` (MRR: QAR 189,450, etc.) on API failure | Removed `MOCK_STATS`. Shows honest `EmptyState` with retry button |
| `dashboard/inbox/page.tsx` | Silently fell back to `MOCK_MESSAGES` (hardcoded fake conversations) on API failure | Removed `MOCK_MESSAGES`. Shows error message with retry button |
| `dashboard/approvals/page.tsx` | Fell back to 4 hardcoded mock employees on API failure and set fake `maxEmployees=3` | Removed mock fallback. Silently fails with last-updated timestamp preserved |
| `dashboard/approvals/page.tsx` | On approve API failure, silently simulated success (`setEmployees` fallback) | Now shows error toast: "Approval failed. Please try again." |

---

## Bug #3: Silent Error Handling (Empty Catch Blocks)

**Files fixed:** 3

| File | Bug | Fix |
|------|-----|-----|
| `dashboard/voice/page.tsx` | `catch {}` — polling failure was completely silent | Added `pollError` state, shown in UI as "Could not reach voice service. Retrying automatically..." |
| `dashboard/chat/page.tsx` | `catch {}` in `fetchGaps` — failure was silent | Added `console.warn` with error info |
| `dashboard/chat/page.tsx` | `handleRefresh` was a fake 800ms timeout instead of actually refreshing | Now calls `fetchGaps()` |

---

## Bug #4: API Keys DELETE URL Mismatch

**Files fixed:** 2

| File | Bug | Fix |
|------|-----|-----|
| `dashboard/settings/api/page.tsx` | Frontend sent `DELETE /api/api-keys?id=xxx` (query param) | Now sends `DELETE /api/api-keys/xxx` (REST path) |
| `api/api-keys/route.ts` | BFF read ID from `searchParams`, forwarded as query param to backend | Now reads from `pathname`, forwards as path param to backend |

**Why it's a bug:** Backend expects path param (`/api/api-keys/:id`), not query param. Without this fix, DELETE requests always fail with 404.

---

## Bug #5: Reports Page Uses Local Toast Instead of Global

**File fixed:** `dashboard/reports/page.tsx`

| Before | After |
|--------|-------|
| `useState<{message; type} \| null>(null)` for toast state | `useGlobalToast().addToast()` |
| Custom `<Toast>` component rendered at bottom | Removed — global toast handles rendering |
| `window.Clerk.session.getToken()` | `useAuth().getToken()` |

---

## Bug #6: Admin Integrations Hardcoded Demo Data

**File fixed:** `admin/integrations/page.tsx`

| Before | After |
|--------|-------|
| `useState('demo-link-token-123')` — hardcoded demo token | `useState('')` — empty by default, fetched from backend |

---

## Files Changed (14 total)

1. `frontend/app/admin/security/incidents/page.tsx`
2. `frontend/app/dashboard/privacy/page.tsx`
3. `frontend/app/dashboard/legal-accept/page.tsx`
4. `frontend/app/dashboard/team/page.tsx`
5. `frontend/app/dashboard/reports/page.tsx`
6. `frontend/components/CookieConsentBanner.tsx`
7. `frontend/app/dashboard/analytics/page.tsx`
8. `frontend/app/dashboard/inbox/page.tsx`
9. `frontend/app/dashboard/approvals/page.tsx`
10. `frontend/app/dashboard/voice/page.tsx`
11. `frontend/app/dashboard/chat/page.tsx`
12. `frontend/app/api/api-keys/route.ts`
13. `frontend/app/dashboard/settings/api/page.tsx`
14. `frontend/app/admin/integrations/page.tsx`

## Build Verification
- **Frontend typecheck:** ✅ PASSED (zero errors)
