---
description: rules
---

 FULL CODEBASE "ZERO-GUESSING" SAFETY RULES (FRONTEND & BACKEND)
You are strictly forbidden from making assumptions about file locations, import paths, global variables, or database schemas. You must verify every single dependency using the exact source of truth before writing a single line of code.

🟦 Rule 1: The "Verify-Before-Write" Command (Strict Context)
The Problem: You often assume a file exists, replace 500 lines, and crash the app because the function didn't exist.

The Rule: Before modifying ANY .tsx, .ts, .css, or .json file, you must output the exact current state using cat [file_path] or check the specific lines using grep.

Execution: Do not write a single new line of code until you have confirmed the exact existing line/block you are modifying. If cat fails, abort the task and report the missing file.

🟦 Rule 2: The "Absolute Backend Bindings" Rule (Cloudflare Env)
The Problem: You often assume environment variables exist globally. In Cloudflare Workers, they do not; they only exist inside the env object passed to export default { fetch }.

The Rule: You must never use process.env.CLERK_SECRET_KEY, process.env.DATABASE_URL, etc., anywhere in backend/. You must access them via env.CLERK_SECRET_KEY, env.DATABASE_URL.

The Rule: You must never assume R2 BUCKET or INGESTION_QUEUE are instantiated globally. Always check backend/wrangler.toml to confirm the exact binding name (binding = "BUCKET"), and only access via env.BUCKET.

🟦 Rule 3: The "SQL Query Sanity" Rule (Neon Raw SQL)
The Problem: You use raw SQL (neon/serverless). You frequently assume the employees table has fields that were deleted 2 weeks ago, or use wrong column names.

The Rule: Before writing any SQL query (SELECT, INSERT, UPDATE), you must verify the column names in backend/src/handlers/public.ts (the migration runner) OR run a DESCRIBE employees; style check.

Execution: Do not write SQL based on memory. Use the file prisma/schema.prisma ONLY for frontend type validation; use the actual raw SQL migration scripts to verify the database schema.

🟦 Rule 4: The "AI Import Path" Rule (Relative File Paths)
The Problem: You frequently hallucinate import paths, like importing @/lib/utils when the correct path is ../../../lib/utils, causing mysterious module not found errors.

The Rule: Before adding a single import { ... } from '...' statement, check the folder depth (e.g., C:\Users\salah\saqyn-rabt\frontend\components\...\...\) and resolve the correct relative path or @/ alias path.

Execution: Do not guess. Count the ../ levels correctly based on the current file location.

🟦 Rule 5: The "No Recursive Overwrite" Rule (Tailwind CSS)
The Problem: You often rewrite tailwind.config.js, globals.css, or package.json entirely because you want to add 2 lines.

The Rule: You must output the current full file using cat, locate the exact line, and replace only that specific object/array key.

Example: Instead of rewriting tailwind.config.js from line 1 to 500, just show the diff: "Add card: '0 10px 40px...' to line 42."

Execution: If you cannot isolate the exact line to change, abort and ask the user for permission to view the file structure.

🟦 Rule 6: The "Pinecone & Redis" Rule (Upstash Bindings)
The Problem: You frequently assume redis or pinecone are globally accessible variables in the backend. In Cloudflare Workers, they are bound to env.REDIS and env.PINECONE_API_KEY.

The Rule: Always check backend/src/mcp/validate-env.ts or backend/index.ts for how redis and pinecone clients are instantiated.

Execution: Never assume a variable is available in the global scope. Look for the env. prefix used in the existing handler code.

🟦 Rule 7: The "BFF Proxy" Rule (Frontend to Backend Wiring)
The Problem: When you add a new frontend API call, you often create a new BFF route without reading the existing pattern.

The Rule: Before creating a new frontend/app/api/.../route.ts, you MUST read at least 1 existing successful BFF route (e.g., frontend/app/api/chat/route.ts) to replicate the exact safeGetToken() and fetch(env.NEXT_PUBLIC_API_URL) pattern.

Execution: Do not write random fetch logic. Copy-paste the successful verified pattern from the existing codebase.

🟦 Rule 8: The "One Commit, One Build" Rule (Strict Atomicity)
The Problem: You frequently batch 10 changes into 1 commit. When the build fails, it is impossible to tell which specific change broke the system.

The Rule: For every single functional file modification, run npm run build in the frontend/ directory.

Execution: If the build fails, do NOT attempt to fix the second file while the first is broken. Revert the first file (git restore), delete the commit, and report the exact TypeScript error to the user.

🟦 Rule 9: The "Frontend Design Token" Rule (No Arbitrary Values)
The Problem: You frequently invent arbitrary Tailwind classes like rounded-40px or shadow-soft because you didn't read the design system.

The Rule: Read frontend/tailwind.config.js before applying Tailwind classes. You are strictly confined to: rounded-xl, rounded-pill, shadow-card, shadow-glow, text-primary, text-accent, bg-primary, bg-accent.

Execution: If a class is not defined in the config, do not use it.

🟦 Rule 10: The "Signal & Log" Rule (Open Communication)
The Problem: You silently execute code and only show the final PR, hiding the mistakes you had to revert internally.

The Rule: If you hit an error (build fail, syntax error, merge conflict) and successfully revert/backtrack to solve it, you must explicitly report that error to the user. "I hit Error X, reverted to git stash, and adjusted my approach." This stops the user from being surprised.

🟦 Rule 11: The "Cross-Reference SQL Schema" Rule (Backend Data Models)
The Problem: You guess the names of columns (e.g., is_active vs status).

The Rule: Before writing any UPDATE or SELECT statement in the Worker, you must check the specific row in the backend/src/handlers/public.ts CREATE TABLE block to know the exact column name.

🟦 Rule 12: The "Ultimate Halting" Rule
The Problem: You keep generating code even when you are unsure.

The Rule: If you have less than 85% confidence that your proposed fix is accurate, halt the execution immediately. Do not output code. Tell the user: "I am not confident in the fix. Please provide the current file content or tell me which file to check."