# SAQYN Rabt — Agent Rules

## Durable Rules

- Do not assume. Do not guess. Do not overclaim.
- Code exists does not mean feature works.
- Infrastructure exists does not mean pipeline works.
- Local test does not prove live production behavior.
- Local migration does not count. Migrations must be verified on live Neon/Postgres.
- Do not restore `dummy_company`.
- Do not restore seed/demo data as production.
- Do not re-add fallback company_id.
- Do not print secrets. Do not use secrets in URLs.
- Do not change Cloudflare secrets blindly.
- Empty response from a provider API means NOT VERIFIED, not success.
- Do not touch Stripe real billing; Stripe is out of scope for ~2 months.
- Pricing/payment CTAs must go to free demo booking, not checkout.
- Do not claim RAG works unless full pipeline (upload → R2 → queue → ingestion → Pinecone → chat answer) is live-tested.
- Do not claim voice automation works unless external call → transcript → intent → workflow → assignment → dashboard/audit is verified.
- Do not claim SAP/Oracle/ERP are connected unless live connector query is verified.
- Do not rely on frontend locking only; backend must enforce access.
- Do not doom-edit. Do not run broad cleanup.
- Do not deploy without approval.
- Do not commit without secret scan and brain update.
- Every meaningful edit must update the brain.

## Brain Protocol

1. Before any code edit, read brain files (product.md, current-state.md, agent-rules.md, access-control.md, knowledge-scope.md, live-verification.md, decisions.md, next-tasks.md, changelog.md).
2. Summarize understanding before changing files — product concept, current state, task, files likely to change, risks, brain files to update.
3. Confirm scope with user if in doubt.
4. After every meaningful edit, update brain before moving on.
