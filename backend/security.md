# Security & Penetration Testing Guidelines — SAQYN RABT

This document outlines the guidelines to verify safety, perform package audits, and secure endpoints on every release cycle.

## 1. Package Dependency Audits

Ensure all JavaScript dependencies in `frontend` and `backend` are checked for vulnerabilities:
```bash
# Frontend Audits
cd frontend
npm audit

# Backend Audits
cd backend
npm audit
```

For advanced security scans, use Snyk CLI:
```bash
snyk test
```

## 2. API Penetration Testing

Perform regular dynamic application security testing (DAST) against endpoints using tools like OWASP ZAP. Ensure that:
* Clerk authorization headers are validated on every request.
* Outgoing webhook URLs are validated before being registered to prevent SSRF.
* SQL queries inside `backend/index.ts` utilize tagged template literals (`sql` helper) to prevent SQL Injection.
* User inputs are escaped before rendering in chatbot bubbles to avoid XSS.

## 3. Web Application Firewall (WAF) Configurations

WAF rules must be configured in your Cloudflare dashboard:
* **Managed Rules**: Enable the OWASP Core Ruleset.
* **Bot Fight Mode**: Enable bot mitigation to prevent scrapers and denial-of-service attempts.
* **Rate Limits**: Apply rules limiting single IP requests to 60 requests per minute on `/api/*` endpoints.
