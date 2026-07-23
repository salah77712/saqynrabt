# BRAIN LOCATION NORMALIZATION REPORT

**Date:** 2026-07-23

## Summary

The project brain (source-of-truth documentation) was moved from `temp_files/brain/` (temporary/nested location) to `brain/` (durable repo-root location) to ensure it is obvious, stable, and不会被 future agents or cleanup scripts ignore.

---

## Old Location

- **Path:** `temp_files/brain/`
- **Git status:** Files were tracked but the directory was gitignored (`brain/` and `temp_files/` both in `.gitignore`)
- **Risk:** `temp_files` prefix sounds transient; future cleanup might delete it

## New Location

- **Path:** `brain/`
- **Git status:** Not ignored; untracked and ready to stage
- **Rationale:** Repo-root `brain/` is the standard location for project brain files across AI-assisted development

## Files Copied (9 total)

| # | File | Checksum Match? |
|---|------|-----------------|
| 1 | `product.md` | ✅ SHA256 identical |
| 2 | `current-state.md` | ✅ SHA256 identical |
| 3 | `agent-rules.md` | ✅ SHA256 identical |
| 4 | `access-control.md` | ✅ SHA256 identical |
| 5 | `knowledge-scope.md` | ✅ SHA256 identical |
| 6 | `live-verification.md` | ✅ SHA256 identical |
| 7 | `decisions.md` | ✅ SHA256 identical |
| 8 | `next-tasks.md` | ✅ SHA256 identical |
| 9 | `changelog.md` | ✅ SHA256 identical |

All 9 files verified identical via `diff -r` and SHA256 checksums.

## Gitignore Status

| Path | Before | After |
|------|--------|-------|
| `temp_files/` | Ignored (`temp_files/` in `.gitignore`) | Still ignored ✅ |
| `brain/` | Ignored (`brain/` in `.gitignore`) | **NOT ignored** ✅ |

### Verification

```bash
$ git check-ignore -v brain/current-state.md
# No output → NOT IGNORED ✅
```

## Tracking Status

- `brain/` files are currently **untracked** (`git status --short` shows `?? brain/...`)
- They are ready to stage with `git add brain/`
- `temp_files/brain/` files remain modified in working tree (`.gitignore` was updated after they were tracked)

## Duplicate Risk

- ~~`temp_files/brain/` still exists~~ → **RESOLVED: Deleted 2026-07-23** ✅
- `brain/` (root) is now the sole source of truth
- **Risk assessment:** NONE — no duplicate exists

## `.gitignore` Change

**File:** `.gitignore`
**Change:** Removed `brain/` from the gitignore block. Added a comment line `# brain/ is the project source of truth — must be tracked` and commented out the old rule.
**Before:**
```
temp_files/
.agents/
.gemini/
brain/
```
**After:**
```
temp_files/
.agents/
.gemini/
# brain/ is the project source of truth — must be tracked
#brain/
```
**Note:** The old rule is commented out (not deleted) so it's visible in history. When the line is committed, `brain/` will no longer be ignored.

---

*End of report.*
