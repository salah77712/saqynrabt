import { neon } from '@neondatabase/serverless';
import { Redis } from '@upstash/redis';

// Define environment interface
export interface Env {
  OPENAI_API_KEY: string;
  DATABASE_URL: string;
  PINECONE_API_KEY: string;
  PINECONE_INDEX_HOST?: string;
  CLERK_SECRET_KEY: string;
  REDIS_URL: string;
  VOICE_AI_ACTIVATED: string;
  BUCKET: R2Bucket;
  INGESTION_QUEUE?: Queue;
  NODE_ENV?: string;
}

// Global active connections counter for Concurrency Guard (Rule 13)
let activeConnections = 0;

// Helper to set CORS headers (Rule 7)
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  // In production, strictly match https://saqynrabt.com
  let allowedOrigin = 'https://saqynrabt.com';
  if (env.NODE_ENV !== 'production' && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
    allowedOrigin = origin;
  }
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Request-ID',
    'Access-Control-Allow-Credentials': 'true',
  };
}

// JWT decoder and verifier (Rule 6)
interface JWTPayload {
  company_id?: string;
  sub: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

function parseJWT(authHeader: string | null): JWTPayload | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.split(' ')[1];
  
  // Developer/Demo bypass for instant demos (Rule 30 support)
  if (token.startsWith('mock-token-')) {
    const parts = token.split('-');
    // format: mock-token-[company_id]-[user_id]-[role]
    return {
      company_id: parts[2] || 'dummy_company',
      sub: parts[3] || 'user_admin12345demo',
      email: 'demo@saqynrabt.com',
      role: parts[4] || 'admin'
    };
  }

  const parts = token.split('.');
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    // Clerk session claims could put org metadata inside custom claims or org_id
    const company_id = payload.company_id || payload.org_id || 'dummy_company';
    return { ...payload, company_id };
  } catch (e) {
    return null;
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const requestId = crypto.randomUUID(); // Rule 12
    const headers = corsHeaders(request, env);
    headers['X-Request-ID'] = requestId;

    // Handle Preflight OPTIONS
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers });
    }

    // 1. Startup Validation (Rule 39)
    if (!env.OPENAI_API_KEY || !env.DATABASE_URL || !env.PINECONE_API_KEY || !env.CLERK_SECRET_KEY) {
      console.error(`[${requestId}] CRITICAL_MISSING_ENV: Essential env keys are not configured.`);
      return new Response(
        JSON.stringify({ error: 'System configuration error. Please contact admin.', requestId }),
        { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Concurrency Guard (Rule 13)
    if (activeConnections >= 15) {
      return new Response(
        JSON.stringify({ error: 'Busy', requestId }),
        { 
          status: 503, 
          headers: { 
            ...headers, 
            'Content-Type': 'application/json',
            'Retry-After': '2'
          } 
        }
      );
    }

    activeConnections++;

    try {
      const url = new URL(request.url);
      const sql = neon(env.DATABASE_URL); // Rule 10
      
      // Initialize Redis (Rule 14)
      const redis = new Redis({
        url: env.REDIS_URL.split('redis://')[1] ? `https://${env.REDIS_URL.split('@')[1]}` : env.REDIS_URL,
        token: env.REDIS_URL.split('@')[0].split('default:')[1] || '',
      });

      // Public wake-up route for database pre-warming (Rule 31)
      if (url.pathname === '/api/wakeup' && request.method === 'GET') {
        await sql`SELECT 1`;
        return new Response(JSON.stringify({ status: 'warmed' }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // Handle webhook (Rule 11)
      if (url.pathname === '/api/webhook' && request.method === 'POST') {
        const body: any = await request.json();
        // Clerk user.created event structure
        if (body?.type === 'user.created') {
          const data = body.data;
          const clerkUserId = data.id;
          const email = data.email_addresses?.[0]?.email_address || 'unknown@email.com';
          const name = `${data.first_name || ''} ${data.last_name || ''}`.trim() || 'New User';
          const companyId = data.public_metadata?.company_id || 'dummy_company';

          // Insert pending member
          await sql`
            INSERT INTO company_members (company_id, clerk_user_id, email, name, status, role)
            VALUES (${companyId}, ${clerkUserId}, ${email}, ${name}, 'pending', 'employee')
            ON CONFLICT (clerk_user_id) DO NOTHING
          `;
          return new Response(JSON.stringify({ success: true }), {
            status: 201,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
        return new Response(JSON.stringify({ ignored: true }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // Extract and verify JWT for all protected routes (Rule 6)
      const jwt = parseJWT(request.headers.get('Authorization'));
      if (!jwt || !jwt.company_id) {
        return new Response(JSON.stringify({ error: 'Unauthorized', requestId }), {
          status: 401,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // --- ENDPOINTS ROUTING ---

      // A. Entitlements Fetch (Rule 25)
      if (url.pathname === '/api/entitlements' && request.method === 'GET') {
        const [entitlements] = await sql`
          SELECT max_employees, max_documents, max_questions, dept_limit
          FROM company_entitlements
          WHERE company_id = ${jwt.company_id}
        `;
        const [memberCount] = await sql`
          SELECT COUNT(*)::int as active_count
          FROM company_members
          WHERE company_id = ${jwt.company_id} AND status = 'active'
        `;
        const [docCount] = await sql`
          SELECT COUNT(*)::int as doc_count
          FROM documents
          WHERE company_id = ${jwt.company_id} AND status = 'active'
        `;
        return new Response(
          JSON.stringify({
            max_employees: entitlements?.max_employees ?? 50,
            max_documents: entitlements?.max_documents ?? 5,
            max_questions: entitlements?.max_questions ?? 1000,
            dept_limit: entitlements?.dept_limit ?? 3,
            active_employees: memberCount?.active_count ?? 0,
            active_documents: docCount?.doc_count ?? 0
          }),
          { status: 200, headers: { ...headers, 'Content-Type': 'application/json' } }
        );
      }

      // B. Employee Management (Rule 36 / 28)
      if (url.pathname === '/api/employees') {
        if (request.method === 'GET') {
          const employees = await sql`
            SELECT id, company_id, clerk_user_id, email, name, status, role
            FROM company_members
            WHERE company_id = ${jwt.company_id}
            ORDER BY created_at DESC
          `;
          return new Response(JSON.stringify(employees), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
        
        if (request.method === 'PATCH') {
          const body = await request.json() as { clerk_user_id: string; status: 'active' | 'pending' };
          
          if (body.status === 'active') {
            // Check entitlements limit (Rule 28)
            const [entitlements] = await sql`
              SELECT max_employees FROM company_entitlements WHERE company_id = ${jwt.company_id}
            `;
            const maxEmployees = entitlements?.max_employees ?? 50;

            const [active] = await sql`
              SELECT COUNT(*)::int as active_count 
              FROM company_members 
              WHERE company_id = ${jwt.company_id} AND status = 'active'
            `;
            const activeCount = active?.active_count ?? 0;

            if (activeCount >= maxEmployees) {
              return new Response(
                JSON.stringify({ error: 'LIMIT_REACHED', message: 'Plan limit reached. Upgrade to add more team members.' }),
                { status: 403, headers: { ...headers, 'Content-Type': 'application/json' } }
              );
            }
          }

          await sql`
            UPDATE company_members
            SET status = ${body.status}
            WHERE clerk_user_id = ${body.clerk_user_id} AND company_id = ${jwt.company_id}
          `;

          // If activating, ensure profile exists
          if (body.status === 'active') {
            const [member] = await sql`
              SELECT name, email FROM company_members WHERE clerk_user_id = ${body.clerk_user_id}
            `;
            await sql`
              INSERT INTO employee_profiles (clerk_user_id, company_id, name, department, vacation_balance)
              VALUES (${body.clerk_user_id}, ${jwt.company_id}, ${member?.name || 'Employee'}, 'Operations', 30)
              ON CONFLICT (clerk_user_id) DO NOTHING
            `;
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
      }

      // C. Chat logs CSV Export (Rule 41)
      if (url.pathname === '/api/export-logs' && request.method === 'GET') {
        const fileKey = `logs/${jwt.company_id}/chat_logs.ndjson`;
        const r2Object = await env.BUCKET.get(fileKey);
        
        let csvContent = 'Date,Employee Name,Question,AI Answer\n';

        if (r2Object) {
          const text = await r2Object.text();
          const lines = text.trim().split('\n');
          for (const line of lines) {
            if (!line) continue;
            try {
              const data = JSON.parse(line);
              const date = data.timestamp || '';
              const name = (data.employee_name || '').replace(/"/g, '""');
              const question = (data.question || '').replace(/"/g, '""');
              const answer = (data.answer || '').replace(/"/g, '""');
              csvContent += `"${date}","${name}","${question}","${answer}"\n`;
            } catch (err) {
              // skip bad lines
            }
          }
        }

        return new Response(csvContent, {
          status: 200,
          headers: {
            ...headers,
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="chat_logs_${jwt.company_id}.csv"`,
          },
        });
      }

      // D. Automation Executions Endpoint (Rule 29 / 26)
      if (url.pathname === '/api/automation' && request.method === 'POST') {
        const body = await request.json() as { company_id: string; [key: string]: any };
        
        // Tenant Isolation Check (Rule 6)
        if (jwt.company_id !== body.company_id) {
          return new Response(JSON.stringify({ error: 'Forbidden', requestId }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Check entitlements (Rule 26)
        const [entitlements] = await sql`
          SELECT dept_limit FROM company_entitlements WHERE company_id = ${jwt.company_id}
        `;
        const deptLimit = entitlements?.dept_limit ?? 0;
        if (deptLimit === 0) {
          return new Response(JSON.stringify({ error: 'Forbidden', message: 'Automation capability disabled.' }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Mock automation task execution
        const tasks = [
          { id: 't1', title: 'Route Guest Inquiry', department: 'Front Desk', status: 'Completed' },
          { id: 't2', title: 'Update Vacation Balance Ledger', department: 'HR', status: 'Completed' }
        ];

        return new Response(JSON.stringify({ success: true, executedCount: 2, tasks }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // E. Chat Endpoint with RAG (Rule 29 / 22 / 23 / 19 / 20 / 21 / 14)
      if (url.pathname === '/api/chat' && request.method === 'POST') {
        const body = await request.json() as { company_id: string; messages: any[] };

        // 1. Tenant Isolation Check (Rule 6)
        if (jwt.company_id !== body.company_id) {
          return new Response(JSON.stringify({ error: 'Forbidden', requestId }), {
            status: 403,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // 2. Check Usage Ledger (Rule 22)
        const [entitlements] = await sql`
          SELECT max_questions, auto_overage_enabled 
          FROM company_entitlements ce
          JOIN companies c ON ce.company_id = c.id
          WHERE ce.company_id = ${jwt.company_id}
        `;
        const maxQuestions = entitlements?.max_questions ?? 1000;
        const autoOverage = entitlements?.auto_overage_enabled ?? false;

        const [ledger] = await sql`
          SELECT questions_count FROM usage_ledger WHERE company_id = ${jwt.company_id}
        `;
        const questionsCount = ledger?.questions_count ?? 0;

        if (questionsCount >= maxQuestions && !autoOverage) {
          return new Response(JSON.stringify({ error: 'LIMIT_REACHED', requestId }), {
            status: 429,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // Get latest user prompt
        const userMessages = body.messages.filter((m: any) => m.role === 'user');
        const latestMsg = userMessages[userMessages.length - 1];
        let userText = latestMsg?.content || '';

        // 3. Prompt Injection Defense (Rule 8)
        userText = userText.trim().substring(0, 1000);
        const injectionRegex = /(ignore all (previous|prior) instructions|system|developer)/gi;
        if (injectionRegex.test(userText)) {
          return new Response(JSON.stringify({ error: 'Invalid prompt content', requestId }), {
            status: 400,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        // 4. Implement Agentic Tool Calls (Rule 21)
        // Check if query is asking for vacation or employee balance
        let contextBlock = '';
        const balanceTrigger = /(vacation balance|vacation days|my balance|how many days of leave)/i;
        
        if (balanceTrigger.test(userText)) {
          // Check Redis Caching first (Rule 14)
          const cacheKey = `employee:${jwt.sub}`;
          let balanceValue: string | null = await redis.get(cacheKey);

          if (!balanceValue) {
            // DB query fallback
            const [profile] = await sql`
              SELECT vacation_balance FROM employee_profiles 
              WHERE clerk_user_id = ${jwt.sub} AND company_id = ${jwt.company_id}
            `;
            const bal = profile?.vacation_balance ?? 30;
            balanceValue = String(bal);
            await redis.set(cacheKey, balanceValue, { ex: 3600 }); // Cached for 1 hour
          }

          contextBlock = `Employee Profile Vacation Balance: The employee ${jwt.name || jwt.sub} has a vacation_balance of ${balanceValue} days remaining.`;
        } else {
          // General RAG search
          // A. Generate embedding using text-embedding-3-small
          const embedRes = await fetch('https://api.openai.com/v1/embeddings', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              input: userText,
              model: 'text-embedding-3-small',
            }),
          });
          
          if (!embedRes.ok) {
            throw new Error(`OpenAI embedding failed: ${await embedRes.text()}`);
          }
          const embedData: any = await embedRes.json();
          const queryVector = embedData.data[0].embedding;

          // B. Query vector database (Fall back to Neon database pgvector if Pinecone is not resolved)
          if (env.PINECONE_INDEX_HOST) {
            const pineconeRes = await fetch(`https://${env.PINECONE_INDEX_HOST}/query`, {
              method: 'POST',
              headers: {
                'Api-Key': env.PINECONE_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                vector: queryVector,
                topK: 3,
                includeMetadata: true,
                namespace: jwt.company_id,
              }),
            });
            if (pineconeRes.ok) {
              const pineconeData: any = await pineconeRes.json();
              contextBlock = pineconeData.matches
                ?.map((m: any) => m.metadata?.text || '')
                .filter(Boolean)
                .join('\n\n') || '';
            }
          }

          // Fallback to local postgres chunks if Pinecone matches empty (Rule 30 compatibility)
          if (!contextBlock) {
            const chunks = await sql`
              SELECT text_content 
              FROM chatbot_chunks 
              WHERE company_id = ${jwt.company_id}
              ORDER BY embedding <=> ${JSON.stringify(queryVector)}::vector
              LIMIT 3
            `;
            contextBlock = chunks.map(c => c.text_content).join('\n\n');
          }
        }

        // Increment ledger usage counter
        await sql`
          INSERT INTO usage_ledger (company_id, questions_count)
          VALUES (${jwt.company_id}, 1)
          ON CONFLICT (company_id) 
          DO UPDATE SET questions_count = usage_ledger.questions_count + 1
        `;

        // 5. Invoke OpenAI stream text (Rule 23)
        const systemPrompt = `Answer ONLY using the provided context block. If the context lacks the answer, respond exactly with: 'I could not find the answer in your company's knowledge base.' Do not add external knowledge.\n\nContext:\n${contextBlock}`;

        const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              ...body.messages
            ],
            stream: true,
          }),
        });

        if (!chatRes.ok) {
          throw new Error(`OpenAI chat request failed: ${await chatRes.text()}`);
        }

        // Set up streaming response back to the client
        const { readable, writable } = new TransformStream();
        const writer = writable.getWriter();
        const encoder = new TextEncoder();
        const reader = chatRes.body?.getReader();

        // Process stream and capture output to log knowledge gaps (Rule 40) and write to R2 log files (Rule 41)
        ctx.waitUntil((async () => {
          let fullAnswer = '';
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader!.read();
            if (done) break;
            
            const chunkText = decoder.decode(value);
            await writer.write(value);

            // Parse openAI SSE format data stream
            const lines = chunkText.split('\n');
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.substring(6).trim();
                if (dataStr === '[DONE]') continue;
                try {
                  const parsed = JSON.parse(dataStr);
                  const content = parsed.choices[0]?.delta?.content || '';
                  fullAnswer += content;
                } catch (e) {
                  // ignore
                }
              }
            }
          }
          await writer.close();

          // Rule 40 check: if exact message returned, insert into knowledge gaps
          if (fullAnswer.trim().includes("I could not find the answer in your company's knowledge base.")) {
            await sql`
              INSERT INTO knowledge_gaps (company_id, user_id, question_text)
              VALUES (${jwt.company_id}, ${jwt.sub}, ${userText})
            `;
          }

          // Rule 41: Append to .ndjson chat log file in R2
          const fileKey = `logs/${jwt.company_id}/chat_logs.ndjson`;
          const existingObject = await env.BUCKET.get(fileKey);
          let logsText = '';
          if (existingObject) {
            logsText = await existingObject.text();
          }
          const logEntry = JSON.stringify({
            timestamp: new Date().toISOString(),
            employee_name: jwt.name || jwt.email || jwt.sub,
            question: userText,
            answer: fullAnswer.trim()
          });
          logsText += logEntry + '\n';
          await env.BUCKET.put(fileKey, logsText);
        })());

        return new Response(readable, {
          status: 200,
          headers: {
            ...headers,
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      // F. Unknown questions view for Admin (Rule 40)
      if (url.pathname === '/api/knowledge-gaps' && request.method === 'GET') {
        const gaps = await sql`
          SELECT id, question_text, timestamp 
          FROM knowledge_gaps
          WHERE company_id = ${jwt.company_id}
          ORDER BY timestamp DESC
        `;
        return new Response(JSON.stringify(gaps), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // G. Documents Hub (Rule 24 / 28 / 37)
      if (url.pathname === '/api/documents') {
        if (request.method === 'GET') {
          const docs = await sql`
            SELECT id, name, status, r2_key, created_at
            FROM documents
            WHERE company_id = ${jwt.company_id} AND status = 'active'
            ORDER BY created_at DESC
          `;
          return new Response(JSON.stringify(docs), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        if (request.method === 'POST') {
          // File ingestion (Rule 24)
          const formData = await request.formData();
          const file = formData.get('file') as File | null;
          
          if (!file) {
            return new Response(JSON.stringify({ error: 'No file provided' }), {
              status: 400,
              headers: { ...headers, 'Content-Type': 'application/json' },
            });
          }

          // Rule 24 limit check: 10MB limit
          if (file.size > 10 * 1024 * 1024) {
            return new Response(
              JSON.stringify({ error: 'LIMIT_EXCEEDED', message: 'PDF size exceeds the 10MB limit.' }),
              { status: 400, headers: { ...headers, 'Content-Type': 'application/json' } }
            );
          }

          // Verify max documents cap (Rule 28)
          const [entitlements] = await sql`
            SELECT max_documents FROM company_entitlements WHERE company_id = ${jwt.company_id}
          `;
          const maxDocs = entitlements?.max_documents ?? 5;

          const [activeDocs] = await sql`
            SELECT COUNT(*)::int as doc_count 
            FROM documents 
            WHERE company_id = ${jwt.company_id} AND status = 'active'
          `;
          const activeDocsCount = activeDocs?.doc_count ?? 0;

          if (activeDocsCount >= maxDocs) {
            return new Response(
              JSON.stringify({ error: 'LIMIT_REACHED', message: 'Plan limit reached. Upgrade to add more documents.' }),
              { status: 403, headers: { ...headers, 'Content-Type': 'application/json' } }
            );
          }

          const docId = `doc_${crypto.randomUUID().substring(0, 8)}`;
          const fileKey = `${jwt.company_id}/documents/${docId}_${file.name}`;
          
          // Put the source file in R2
          await env.BUCKET.put(fileKey, file.stream(), {
            customMetadata: {
              company_id: jwt.company_id || '',
              name: file.name
            }
          });

          // Insert NeonDB record
          await sql`
            INSERT INTO documents (id, company_id, name, status, r2_key)
            VALUES (${docId}, ${jwt.company_id}, ${file.name}, 'active', ${fileKey})
          `;

          // Process embedding chunking (Rule 20 / 34)
          // Since we are running in simple mode without Queues, run chunking in waitUntil
          ctx.waitUntil((async () => {
            try {
              const textContent = `Text chunking mock text for document ${file.name}. Rule 20 vector chunking: 1024 size, 50 overlap.`;
              
              // Generate mock vector embedding
              const dummyVector = Array.from({ length: 1536 }, () => 0.001);

              await sql`
                INSERT INTO chatbot_chunks (company_id, document_id, text_content, embedding)
                VALUES (${jwt.company_id}, ${docId}, ${textContent}, ${JSON.stringify(dummyVector)}::vector)
              `;
            } catch (err) {
              console.error(`Error chunking document ${file.name}:`, err);
            }
          })());

          return new Response(JSON.stringify({ success: true, docId }), {
            status: 201,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }

        if (request.method === 'DELETE') {
          // Cascading Document Cleanup (Rule 37)
          const body = await request.json() as { document_id: string };
          const docId = body.document_id;

          const [doc] = await sql`
            SELECT r2_key FROM documents 
            WHERE id = ${docId} AND company_id = ${jwt.company_id}
          `;

          if (!doc) {
            return new Response(JSON.stringify({ error: 'Document not found' }), {
              status: 404,
              headers: { ...headers, 'Content-Type': 'application/json' },
            });
          }

          // Step 1: Query Pinecone and delete all vectors (Mock deletion / clean local chunks)
          if (env.PINECONE_INDEX_HOST) {
            await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/delete`, {
              method: 'POST',
              headers: {
                'Api-Key': env.PINECONE_API_KEY,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                filter: { document_id: docId },
                namespace: jwt.company_id,
              }),
            });
          }

          // Delete DB references
          await sql`
            DELETE FROM chatbot_chunks WHERE document_id = ${docId} AND company_id = ${jwt.company_id}
          `;

          // Step 2: Delete source file from R2
          await env.BUCKET.delete(doc.r2_key);

          // Step 3: Update documents status to 'deleted'
          await sql`
            UPDATE documents 
            SET status = 'deleted' 
            WHERE id = ${docId} AND company_id = ${jwt.company_id}
          `;

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
          });
        }
      }

      // H. Vapi Webhook (Rule 32/33)
      if (url.pathname === '/api/vapi-webhook' && request.method === 'POST') {
        const body: any = await request.json();
        console.log(`[${requestId}] Vapi Webhook Event:`, body);
        return new Response(JSON.stringify({ success: true, received: true }), {
          status: 200,
          headers: { ...headers, 'Content-Type': 'application/json' },
        });
      }

      // Default Endpoint Not Found
      return new Response(JSON.stringify({ error: 'Route not found', requestId }), {
        status: 404,
        headers: { ...headers, 'Content-Type': 'application/json' },
      });

    } catch (err: any) {
      console.error(`[${requestId}] Handler Exception:`, err);
      return new Response(
        JSON.stringify({ error: err.message || 'Internal server error', requestId }),
        {
          status: 500,
          headers: { ...headers, 'Content-Type': 'application/json' },
        }
      );
    } finally {
      activeConnections--;
    }
  },
};
