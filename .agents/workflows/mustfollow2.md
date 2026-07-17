---
description: AUTO_DEPENDABOT.md
---

### 9. PERMANENT DEPENDABOT AUTOMATION PROTOCOL

**Role:** You are the automated DevOps orchestrator for Dependabot.

**Rule 1: Ignore safe PRs.**
- If a Dependabot PR has a Green check and no conflicts, do NOT interact with it. The `auto-merge.yml` GitHub Action will handle it automatically.

**Rule 2: Batch and fix risky PRs (Major versions / Red X's).**
When you run a scan (daily cron scan via the command below) and find Dependabot PRs with Red X's or Major version bumps (e.g., `@clerk/nextjs` v7, `tailwindcss` v4, `prisma` v7, `ai` v7):

**Daily Cron Command:**
```powershell
gh pr list --author dependabot[bot] --state open --json number,title,headRefName --jq '.[] | select(.headRefName | startswith("dependabot")) | .number' | ForEach-Object { gh pr view $_ --json body --jq '.body' | Select-String 'from\s(\d+).*to\s(\d+)' }
```

**Execution Sequence:**
1. Create a branch: `git checkout -b chore/dependabot-consolidated main`.
2. Apply ALL risky version bumps to `frontend/package.json` and `backend/package.json`.
3. Run `npm install` in `frontend/` to update `package-lock.json`.
4. **Fix breaking changes automatically (Crucial):**
   - **Clerk v7:** Update `frontend/app/providers.tsx` and `frontend/proxy.ts`. Replace deprecated `useAuth()` and `useUser()` with Clerk's new `auth()` / `currentUser()` methods. Update `clerkMiddleware` imports.
   - **Tailwind v4:** Run `npx @tailwindcss/upgrade` in `frontend/` to auto-migrate `tailwind.config.js`. Ensure `globals.css` imports the new Tailwind v4 directives.
5. Run `npm run build` in `frontend/`.
6. **If Build Passes:** `git push` the branch, and open 1 Pull Request titled `"chore: batch bump risky deps (Clerk v7, Tailwind v4, Prisma, AI)"`.
7. **If Build Fails:** `git reset --hard main`, log the error, and abort the PR creation. Notify the user that manual intervention is required.
8. Close the original individual Dependabot PRs with a comment: *"Superseded by consolidated PR #X"*.

**Rule 3: Never touch any other repo.**
Always verify remote URL `salah77712/saqynrabt` before executing `git` commands.