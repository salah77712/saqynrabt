# Security Incident Response Plan — SAQYN RABT

This document registers standard protocols to resolve critical security occurrences and database compromises.

## Phases of Incident Response

### 1. Detection & Identification
- Monitor Cloudflare WAF analytics for anomaly spikes.
- Flag failed sign-in thresholds.

### 2. Containment
- Revoke compromised developer API key hashes.
- Suspend compromised client companies access statuses.

### 3. Recovery
- Restore NeonDB tables from daily R2 backups using `scripts/restore-backup.sh`.
- Re-run security testings via `scripts/pen-test.sh`.
