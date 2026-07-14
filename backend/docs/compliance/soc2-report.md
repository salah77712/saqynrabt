# SOC2 Type II Audit Compliance Evidence Report — SAQYN RABT

This document compiles the evidence list matching information security policies.

## Scope of Evaluation
- Core Platform APIs (Cloudflare Workers)
- Database Storage Engine (Neon PostgreSQL)
- Multi-region R2 document cache

## Controls Evidence
- Access Control: Multi-factor authentication active via Clerk.
- Vulnerability management: Automated Snyk and Sonarcloud scans executed on every branch push.
- Telemetry & logging: System audits are stored in the database with 7-year immutable query boundaries.
