---
description: part 2 
---

## Rule 25: Database-Driven Feature Gates
- **Law:** NEVER hardcode UI limits. Fetch `company_entitlements` on load into a React Context hook.
- **Detailed Engineering Description:** If you hardcode `max_employees=50` in the UI, you have to redeploy the entire codebase to change it. By reading from `company_entitlements`, you simply update the DB row for a client, they refresh their page, and the UI magically unlocks more features. Zero downtime, zero redeploys.

## Rule 26: API 403 Access Locks
- **Law:** On every backend route, check `SELECT limit_value FROM company_entitlements`. If `0`, return HTTP `403 Forbidden`.
- **Detailed Engineering Description:** A hacker could reverse-engineer your frontend, find the hidden API route, and fire it manually. This SQL check on the backend acts as the final guardrail. Even if the UI is hidden, the API physically rejects the request, guaranteeing your business logic cannot be stolen.

## Rule 27: Dynamic Dropdowns
- **Law:** Department Dropdown renders exactly `dept_limit` options based on DB value.
- **Detailed Engineering Description:** If a Starter client has 1 department, showing 10 dropdown options makes them feel restricted. Showing exactly 1 option makes the software feel tailored to their current plan, gently nudging them to upgrade to see more options.

## Rule 28: Employee / Document Hard Caps
- **Law:** Before `Approve`, check `active_count >= max_employees`. If so, disable button with tooltip: `"Plan limit reached."`
- **Detailed Engineering Description:** This UI blocker prevents the client from physically pressing the button and expecting a success. The tooltip is crucial because it educates them on *why* the button is dead, triggering the psychological urge to click the "Upgrade" modal you built in Rule 18.

## Rule 29: Unified API Endpoints
- **Law:** Workers handle `POST /api/chat` and `POST /api/automation` sharing the same middleware.
- **Detailed Engineering Description:** By sharing the exact same JWT and usage ledger middleware, you protect your architecture from code duplication. If a security patch is needed, you update one file, and both the "Staff Hub" and "Guest Queue" receive the protection instantly.

## Rule 30: Seed Data for Instant Demos
- **Law:** Create `/lib/seed.sql`. Insert `dummy_company`, 1 `pending` user, 3 rows into `chatbot_chunks` with dummy embeddings.
- **Detailed Engineering Description:** When you open the dashboard for a live demo client, the UI is usually empty. This looks like a broken product. The seed data guarantees that the moment you type "What is your policy?", the bot answers immediately. This secures the sale on the video call without you having to manually upload 10 PDFs first.

## Rule 31: NeonDB Pre-Warming
- **Law:** Homepage `useEffect` fires silent `fetch('/api/wakeup')` executing `SELECT 1`.
- **Detailed Engineering Description:** NeonDB "sleeps" after 5 minutes of inactivity. If a client opens your dashboard after a coffee break, the first query takes 5 seconds to cold-start, killing their enthusiasm. This silent ping keeps the database warm for the exact moment they click the dashboard link.

## Rule 32: Voice AI Financial Lock
- **Law:** Read `process.env.VOICE_AI_ACTIVATED`. Entire Voice Dashboard renders `null` unless strictly `"true"`.
- **Detailed Engineering Description:** You are not paying for Vapi until Client 15. This environment variable is an absolute dead-switch. Even if a user tries to type the voice dashboard URL manually, the whole route returns `null`, physically preventing the app from initializing Vapi's paid webhooks.

## Rule 33: Future Voice Transcript Streaming
- **Law:** When Voice is active, use WebSockets or SSE to push `call.transcript` webhooks live to the UI.
- **Detailed Engineering Description:** When the AI eventually answers a guest's phone call, the hotel manager wants to see *what* the bot just said. Server-Sent Events (SSE) establishes a persistent connection that streams the JSON transcript to the dashboard immediately, creating a feeling of a living, breathing virtual front desk.

## Rule 34: Vector Budget Preservation
- **Law:** Strictly enforce `chunk_size: 1024` from Rule 20.
- **Detailed Engineering Description:** This mathematically caps free-tier usage at ~90 clients (3 PDFs each) without exceeding Pinecone's 100,000 vector free limit. The moment you hit Client 91, you upgrade to $50/mo. You do not pay $50/mo for Client 1-90.

## Rule 35: 6GB Laptop System Constraint
- **Law:** Generate ONLY Node.js / TypeScript. NO `requirements.txt`, `Dockerfile`, or `pyproject.toml`.
- **Detailed Engineering Description:** Your 6GB RAM cannot handle Python, Conda, or heavy ML libraries. The AI must generate purely lightweight Next.js and Node.js code. `npm install` is the only dependency command allowed, which uses at most 500MB of your RAM.

## Rule 36: Employee Approval Dashboard UI
- **Law:** Admin Dashboard MUST have a `Pending Approvals` panel. Must include an `Approve` button that sends a `PATCH` to `status='active'`.
- **Detailed Engineering Description:** This is the final door to the knowledge base. The panel pulls from `company_members WHERE status='pending'`. The `Approve` button emits a PATCH request to your Cloudflare Worker, which updates the database. Once done, the employee's frontend refreshes and instantly unlocks the chat interface.

## Rule 37: Cascading Document Cleanup
- **Law:** When a client deletes a document, delete Pinecone vectors, delete R2 file, and set `documents` table to `status='deleted'`.
- **Detailed Engineering Description:** If a hotel owner removes their 2024 SOP, you must physically remove it to maintain data privacy. Three-tier cleanup is mandatory to prevent sensitive data from leaking via stale Pinecone indexes.

## Rule 38: Human-Friendly 429 Error UI
- **Law:** On `429 LIMIT_REACHED`, grey out the input box and render a top banner: `"Your team has reached the monthly question limit. Click Upgrade Plan."`
- **Detailed Engineering Description:** A raw 429 JSON error ruins the user experience and looks like an app bug. This custom UI gently informs the user that they have simply consumed their allocation, preventing support tickets and urging them to upgrade.

## Rule 39: Environment Variable Sanity Check
- **Law:** On first Worker API call, check `process.env.OPENAI_API_KEY`, `DATABASE_URL`, `PINECONE_API_KEY`, `CLERK_SECRET_KEY` exist. If missing, return HTTP `500` with `System configuration error`.
- **Detailed Engineering Description:** If you accidentally forget to paste a key in your `.env.local` file, the Worker will fail silently with a cryptic error, costing you hours of debugging. This hard 500 error immediately alerts you to the missing key in your logs.

## Rule 40: Knowledge Gap Logging
- **Law:** If OpenAI returns `"I could not find the answer..."`, insert into `knowledge_gaps` table. Dashboard displays a `[Review Unknown Questions]` button.
- **Detailed Engineering Description:** This is a sales tool disguised as a feature. When the bot fails, the system logs the unanswered question. You show this to the hotel owner so they realize *"My staff are asking about this new policy, I better upload that new PDF."* It forces them to maintain their subscription.

## Rule 41: Admin Usage & Export Audit
- **Law:** `Settings` tab contains Usage breakdown `Total Questions`, `Remaining`, `Active Employees`. Include `[Export Chat Logs to CSV]` button hitting a Worker route that generates `.csv` files from R2 log archives.
- **Detailed Engineering Description:** Enterprise clients (Rule 15) demand compliance audit trails. This button allows the hotel owner to download a full CSV of all chat logs for their own internal HR records, making your software compliant with their internal legal rules.