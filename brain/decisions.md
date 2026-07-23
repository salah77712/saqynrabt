# SAQYN Rabt — Architecture Decisions

## 2026-07-22 — Clerk Metadata API PATCH Fix

Decision: Changed from POST /v1/users/{id} to PATCH /v1/users/{id}/metadata for setting public metadata.
Context: Clerk API 2026-05-12 removed metadata fields from user PATCH endpoint.
Why: Onboarding was silently failing — metadata (company_id, role) was never stored on Clerk user.
Impact: Onboarding now correctly sets Clerk metadata. Re-onboarding returns `{already_existed: true}`.

## 2026-07-22 — company_id DB Fallback

Decision: verifyJWT looks up company_id from employees table by clerk_user_id when payload lacks it.
Context: Standard Clerk session JWTs do not include public_metadata.company_id. The previous code relied on Clerk custom JWT templates or org claims.
Why: Users must be authenticated without requiring a custom JWT template on every request. Makes auth resilient to different Clerk session configurations.
Impact: All authenticated endpoints work with standard Clerk session tokens. Removes JWT template dependency.

## 2026-07-22 — Role DB Fallback

Decision: verifyJWT looks up role from employees table by clerk_user_id as source of truth.
Context: Clerk session JWTs carry only 'employee' fallback role. Admin role exists in DB but was not reflected in JWT.
Why: Admin purge endpoint (and any admin-only route) failed because JWT role defaulted to 'employee'.
Impact: Admin role from DB is now respected. Backend enforcement matches DB authority.

## 2026-07-22 — Plan-Based Access Control

Decision: Backend enforces plan features via requirePlanFeature() middleware, reading plan_key from company_entitlements.
Context: Previously no plan enforcement existed — all modules accessible regardless of plan.
Why: Differentiate chatbot/voice/platform plans with backend-level enforcement.
Impact: 24 routes gated by plan features. Platform plan (current default) has all features.

## 2026-07-22 — Document Knowledge Scope Not Implemented

Decision: Deferred. Documents table has no scope column, all uploads go to single namespace.
Context: Current architecture has zero separation between voice agent and internal chatbot documents.
Why: External voice agent could retrieve internal HR documents if RAG is added to voice pipeline without scoping.
Status: MISSING — requires DB migration, upload API changes, ingestion changes, frontend UI, and enforcement.
