# SAQYN Rabt — Product Concept

## Product 1 — External AI Voice Business Automation

For all industries. External callers — customers, guests, patients, tenants, suppliers, leads, vendors, students/parents — call a business. A human-like AI voice agent answers, understands the request, collects details, and creates a workflow/task for the company's internal team.

Core loop:
External caller → AI voice agent → intent/details collected → workflow/task created → assigned to employee/team → status tracked → audit log → optional follow-up

NOT HR-only. NOT only employee management. NOT only a chatbot.

## Product 2 — Internal Enterprise Business Chatbot

For internal company users — employees, managers, admins, operations, finance, HR, support. Chatbot connected to company systems and knowledge sources (SAP, Oracle, ERP, CRM, HR systems, databases, PDFs, forms, SOPs, policies, internal tools).

Core loop:
Internal user → chatbot → retrieves from system/document/form/data → answers or performs controlled action → optionally creates workflow → audit log

NOT only a PDF chatbot.

## Shared Platform

Shared platform includes: auth, tenant isolation, company/team/workforce management, plan and role access, workflow engine, approvals, audit logs, usage metering, RAG/document ingestion, integrations/connectors, live dashboards, admin settings.

## Architecture

- **Frontend**: Next.js 16, Clerk auth, bilingual (en/ar), Tailwind CSS, shadcn/ui
- **Backend**: Cloudflare Worker (itty-router), Neon PostgreSQL, Pinecone vector DB, Upstash Redis
- **Storage**: Cloudflare R2 (documents, extracted text, PDFs)
- **Queue**: Cloudflare Queues (doc ingestion)
- **Auth**: Clerk (sessions, JWT, webhooks), custom verifyJWT middleware
- **Voice**: VAPI (TTS/voice agent, planned but not fully integrated)
