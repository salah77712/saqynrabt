# Token Rotation Required

**Affected token:** Cloudflare API Token beginning with `cfut_LRh6`

**Files where found:**
- `.env.local:59`  (gitignored, not committed)
- `CLEANUP_REPORT.md:139` (untracked, now redacted)

**Discovery date:** 2026-07-21

## Action required (human owner)

1. Revoke the token `cfut_LRh6****` in the **Cloudflare Dashboard** → API Tokens.
2. Issue a new Cloudflare API token with **only the minimum scopes needed** (Workers deploy, Queues, KV).
3. Update the value of `CLOUDFLARE_API_TOKEN` in `.env.local` with the new token.

## Why

This token was incidentally logged during a deployment debugging session. Although the files are gitignored/untracked and never pushed to the remote, the token could have been exposed through:
- Screen-sharing or copy-paste during the active session
- CI logs if the token had been committed
- Shell history or tool persistence

Rotating it is a low-effort precaution that eliminates the risk entirely.
