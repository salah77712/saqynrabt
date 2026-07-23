# SAQYN Rabt — Knowledge Scope Separation

## Requirement

SAQYN Rabt must have separate knowledge/document spaces for Product 1 (voice agent) and Product 2 (internal chatbot).

## Document Scopes

- `voice_agent` — for external AI voice agent conversations
- `internal_chatbot` — for internal employee chatbot (default)
- `shared` — usable by both

Only owner/admin can mark a document as `voice_agent` or `shared`.

## Retrieval Rules

- Voice agent retrieves only: voice_agent, shared
- Internal chatbot retrieves only: internal_chatbot, shared
- External voice agent must NEVER retrieve internal-chatbot-only documents

## Current State

**KNOWLEDGE SCOPES MISSING** — audit completed 2026-07-22.

- Documents table: NO scope/knowledge_scope column
- Upload API: Does not accept scope
- Ingestion: Upserts to single Pinecone namespace `${company_id}` (no scope separation)
- Chat queries: Single namespace `${company_id}`, no scope filter
- Voice handler: No RAG retrieval (VAPI only)
- Voice agent CAN currently retrieve internal HR docs if RAG is added without scoping

## Required Implementation

- DB migration: Add `knowledge_scope VARCHAR(50) DEFAULT 'internal_chatbot'` to documents
- Upload API: Accept scope param (admin-only for voice_agent/shared)
- Ingestion: Use `${company_id}:${scope}` Pinecone namespace, embed scope in metadata
- Chat query: Filter by internal_chatbot + shared
- Voice query: Filter by voice_agent + shared
- Upload UI: Scope selector (admin sees all, employee sees internal_chatbot only)
