---
description: 
---

# SAQYN RABT - THE 36 ABSOLUTE MECHANICAL RULES
*These rules are binding. Do not assume, guess, or deviate.*

## RULE 1: Mobile Touch Targets (Hard Limit)
- All buttons and interactive elements MUST have a minimum height of `44px`.
- Hero headlines MUST be `40px` on mobile and scale to `56px` on desktop.
- Body text MUST never drop below `16px`.
- Do not use `rem` units if they fall below these pixel limits.

## RULE 2: Zero-Bloat Asset Budget
- Every image file converted to `.webp` and compressed to under `100KB`.
- All icons MUST be locally hosted `.svg` files (1.5px stroke) from Phosphor Icons. 
- Do NOT import FontAwesome, Material Icons, or external icon CDNs.
- Do NOT import `GSAP`, `Three.js`, or `Framer Motion`. Use native `transition: all 0.2s ease`.

## RULE 3: Humanized Copywriting
- BAN the following words from the dashboard UI: `AI`, `Chatbot`, `SaaS`, `Automation`, `RAG`, `LLM`.
- Swap them with exact replacements: Sidebar `Automation` -> `Guest & Client Queue`. Sidebar `Chatbot` -> `Staff Knowledge Hub`. Empty state -> `All clear. No pending requests.`

## RULE 4: The Industry Mirror Homepage
- The `/(marketing)` page MUST have exactly 3 pill-shaped toggle buttons: `[🏨 Hotel]`, `[🏥 Clinic]`, `[🔧 Workshop]`.
- Clicking them MUST use React `useState` to swap the DOM text, headlines, and hero images WITHOUT a page reload. Do NOT create separate `/hotel` or `/clinic` routes.

## RULE 5: "Book a Demo" CTA
- The primary Navbar and Hero button MUST contain the text: `Book a 15-Min Demo`.
- Do NOT use `Get Started`, `Sign Up`, or `Try for Free`.
- The button MUST be an `<a>` tag linking directly to an external Calendly URL.

## RULE 6: JWT Tenant Isolation
- Every Cloudflare Worker MUST extract `company_id` from the Clerk JWT.
- STRICT CHECK: `if (jwt.company_id !== request.body.company_id) return new Response('Forbidden', { status: 403 })`.
- Never trust the frontend to pass the correct ID.

## RULE 7: Strict Production CORS
- Every Worker response MUST add headers: 
  `Access-Control-Allow-Origin: https://saqynrabt.com`.
- Do NOT use `*` in production.

## RULE 8: Prompt Injection Defense
- Trim all user inputs to a hard limit of `1,000` characters.
- Run a regex check: `/(ignore all (previous|prior) instructions|system|developer)/gi`.
- If matched, do NOT pass to OpenAI. Return a generic 400 error.

## RULE 9: Git Secrets Hygiene
- The root `.gitignore` MUST contain: `node_modules`, `.env`, `.env.local`, `.env.production`, `.wrangler`, `.next`, `.DS_Store`.
- Do NOT write code that assumes `.env` files are committed to GitHub.

## RULE 10: NeonDB Serverless Driver
- Workers MUST import `@neondatabase/serverless`.
- Use `const sql = neon(process.env.DATABASE_URL)`.
- Do NOT import `pg` or `Client` (this kills the free 20-connection limit).

## RULE 11: Clerk Webhook Sync
- The `/workers/webhook.ts` MUST listen for `user.created`.
- Insert rows into `company_members` with `status='pending'`.
- Admin dashboard MUST have a "Approve" button to set `status='active'`.

## RULE 12: Observability Request IDs
- Generate `const requestId = crypto.randomUUID()` at the start of every Worker execution.
- Log errors with this `requestId`, and pass it in the response headers: `X-Request-ID`.

## RULE 13: The "Busy Lock" Concurrency Guard
- If NeonDB concurrent connections reach `15`, return HTTP `503` with `{ error: 'Busy' }` and headers `Retry-After: 2`. 
- Do NOT let connections exceed 15 to preserve the free tier's 20-connection cap.

## RULE 14: Redis Live-Data Caching
- Before querying `get_employee_balance`, check `const cached = await redis.get(employee:${id})`.
- If found, return it instantly. If not, query SQL, then store in Redis with `TTL=3600` seconds.

## RULE 15: Employee-Based Pricing Tiers
- Render exactly 3 pricing cards:
  1. `Starter (1-50): 1,799 QAR/mo + 3,999 QAR setup`.
  2. `Growth (51-150): 3,499 QAR/mo + 5,999 QAR setup`.
  3. `Enterprise (151+): Contact Sales`.

## RULE 16: Mandatory Setup Fee Display
- The `3,999 QAR` and `5,999 QAR` setup fees MUST be displayed as a separate, bold line item right beneath the monthly price.

## RULE 17: Auto-Overage Checkbox (Off by default)
- In `Settings/Billing`, place an UNCHECKED checkbox: `"I approve automatic billing overages"`.
- The DB column `auto_overage_enabled` MUST default to `false`.

## RULE 18: Skip Stripe / Sales-Led Modal
- DO NOT integrate Stripe Checkout.
- When a user clicks `Select Plan`, trigger a centered modal: `"Book a 15-minute setup call with our team to configure your knowledge base."`
- Modal buttons: `[Book a Demo]` (Calendly link) and `[Close]`.

## RULE 19: Hallucination Shield System Prompt
- The exact OpenAI System Prompt must be: `"Answer ONLY using the provided context block. If the context lacks the answer, respond exactly with: 'I could not find the answer in your company's knowledge base.' Do not add external knowledge."`

## RULE 20: RAG Vector Chunking Math
- Use `RecursiveCharacterTextSplitter` with `chunk_size: 1024` and `overlap: 50`.
- This halve the Pinecone vector usage (450 vectors per PDF vs 900).

## RULE 21: Agentic Live Data Tool
- The AI MUST define a tool named `get_employee_balance`.
- When triggered, run `SELECT vacation_balance FROM employee_profiles WHERE clerk_user_id = $1 AND company_id = $2`.
- Use exact user IDs from the JWT. Do not use vector search for this.

## RULE 22: The 429 Hard Stop
- Order of execution: `JWT Check -> Check Usage Ledger`.
- If limit exceeded AND `auto_overage_enabled` is false, return HTTP `429` with `{ error: "LIMIT_REACHED" }` immediately.
- Do NOT initialize Pinecone or OpenAI if this fails.

## RULE 23: Streaming Responses
- Use `streamText` from Vercel AI SDK to stream tokens to the `useChat` hook.
- Do NOT wait for OpenAI to finish generating the full text.

## RULE 24: Ingestion Pipeline Filters
- Reject any PDF upload over `10MB`.
- Drop the file into R2, then push the job to a Cloudflare Queue to process asynchronously.

## RULE 25: Database-Driven Feature Gates
- NEVER hardcode UI limits.
- Fetch the entire `company_entitlements` table on dashboard load and store in a global Context hook.

## RULE 26: API 403 Access Locks
- On every backend Automation route, check `SELECT limit_value FROM company_entitlements`.
- If `limit_value == 0`, return HTTP `403 Forbidden` immediately.

## RULE 27: Dynamic Dropdowns
- Department Dropdown renders exactly `dept_limit` options based on the `company_entitlements` value.

## RULE 28: Employee / Document Hard Caps
- When clicking "Approve" on an employee, check `active_count`.
- If `active_count >= max_employees`, disable the button and show tooltip: `"Plan limit reached. Upgrade to add more team members."`
- Do the same hard cap for document uploads.

## RULE 29: Unified API Endpoints
- Workers MUST handle `POST /api/chat` and `POST /api/automation`.
- Both routes MUST use the exact same middleware for JWT checking and `usage_ledger` billing.

## RULE 30: Seed Data for Instant Demos
- Create `/lib/seed.sql`.
- It MUST insert `dummy_company`, 1 `pending` user, and 3 rows into `chatbot_chunks` with dummy embeddings.
- This ensures the bot works immediately on first login.

## RULE 31: NeonDB Pre-Warming on Homepage
- Marketing homepage `useEffect` MUST fire a silent `fetch('/api/wakeup')` which executes `SELECT 1`.
- Prevents the 5-second NeonDB cold-start delay on the demo dash.

## RULE 32: Voice AI Financial Lock
- Read `process.env.VOICE_AI_ACTIVATED`.
- The entire Voice Dashboard route MUST render `null` unless this is strictly set to `"true"`.
- Do not initialize Vapi webhooks until this is flipped.

## RULE 33: Future Voice Transcript Streaming
- When Voice is active, use WebSockets or SSE to push `call.transcript` webhooks from Vapi to the frontend in real-time for live dashboard updates.

## RULE 34: Vector Budget Preservation
- Strictly enforce `chunk_size: 1024` from Rule 20. 
- This mathematically caps free-tier usage at ~90 clients (3 PDFs each) without exceeding Pinecone's 100,000 vector free limit.

## RULE 35: 6GB Laptop System Constraint
- Generate **ONLY** Node.js / TypeScript projects.
- Do NOT generate `requirements.txt`, `Dockerfile`, or `pyproject.toml`.
- Local command dependencies must be strictly `npm` or `npx`.

## RULE 36: Employee Approval Dashboard UI
- Admin Dashboard MUST have a `Pending Approvals` panel.
- It must list employees with `status='pending'`.
- Must include an "Approve" button that sends a `PATCH` to update `status='active'`.                                                  ## RULE 37: Cascading Document Cleanup (Data Privacy)
- When a client deletes a document from the `Chatbot Documents` dashboard, the Worker MUST execute a two-step cleanup.
- Step 1: Query Pinecone with `metadata.document_id = deleted_doc_id` and delete all corresponding vectors.
- Step 2: Delete the source file from the Cloudflare R2 bucket.
- Step 3: Update the `documents` table in NeonDB to `status='deleted'`.
- Strict Rule: Do NOT leave orphaned vectors in Pinecone if a business removes their SOPs.

## RULE 38: Human-Friendly 429 Error UI
- When the frontend receives a `429 LIMIT_REACHED` error from the Worker, it MUST NOT display raw JSON or a technical error code.
- The Chat interface must grey out the input box and render a fixed, centered banner at the top of the chat window: *"Your team has reached the monthly question limit. To keep the conversation going, please click 'Upgrade Plan'."*
- This banner MUST include an `[Upgrade Plan]` button that triggers the exact Sales-Led Pricing Modal defined in Rule 18. 

## RULE 39: Environment Variable Sanity Check
- The Cloudflare Worker MUST implement a strict startup validation.
- On the very first API call, check that `process.env.OPENAI_API_KEY`, `process.env.DATABASE_URL`, `process.env.PINECONE_API_KEY`, and `process.env.CLERK_SECRET_KEY` exist and are non-empty strings.
- If ANY of these are missing, the Worker MUST log a `CRITICAL_MISSING_ENV` error and immediately return HTTP `500` with the message *"System configuration error. Please contact admin."*
- Do NOT let the RAG pipeline execute if these keys are missing, as this will cause obscure API crashes.

## RULE 40: Knowledge Gap Logging & Feedback
- If OpenAI returns the exact string `"I could not find the answer in your company's knowledge base."` (as per Rule 19), the Worker MUST trigger a secondary logging function.
- This function must insert a row into a new NeonDB table: `knowledge_gaps (id, company_id, user_id, question_text, timestamp)`.
- The Admin Dashboard's `Knowledge Hub` settings MUST display a `[Review Unknown Questions]` button, which renders a list of these logged unanswered questions to the owner. This shows the client exactly what documents they need to upload next.

## RULE 41: Admin Usage & Export Audit
- The Dashboard `Settings` tab MUST contain a read-only `Usage & Audit` pane.
- This pane must display a clean breakdown of: `Total Questions This Month`, `Remaining Questions`, and `Active Employees`.
- Include a button labeled `[Export Chat Logs to CSV]`.
- This button MUST trigger a Cloudflare Worker route that generates a `.csv` file with columns: `Date, Employee Name, Question, AI Answer`, pulling the data directly from the `.ndjson` log files stored in Cloudflare R2.    