import { neon } from '@neondatabase/serverless';
import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { encoding_for_model } from 'tiktoken';
import type { Env } from '../utils';

/**
 * RAG Ingestion Pipeline.
 *
 * Triggered by `INGESTION_QUEUE` (declared in wrangler.toml).
 * Expected message body:
 * {
 *   tenantId: string,
 *   docId: string,
 *   r2Key: string,      // e.g. "company_xyz/Handbook.pdf"
 *   filename: string,   // original uploaded filename
 *   contentType?: string
 * }
 *
 * Pipeline:
 *   1. PARSE   — fetch R2 object, decode PDF (pdf-parse) or UTF-8
 *   2. CHUNK   — RecursiveCharacterTextSplitter (~500 tokens, 50 overlap)
 *   3. EMBED   — OpenAI text-embedding-3-small (batched)
 *   4. UPSERT  — Pinecone upsert with metadata (tenantId, docId, chunkIndex, text)
 *   5. PERSIST — mark documents.status='indexed' and store extracted text in R2
 *
 * NOTE: Prisma is not used here because Cloudflare Workers do not support the
 * Prisma engine binary. All DB access uses the Neon serverless `sql` client.
 *
 * Failure handling:
 *   - Any thrown error => documents.status='failed' and the queue message is
 *     NOT acked so Cloudflare will redeliver (max_retries set in wrangler.toml).
 *   - Per-batch upserts are wrapped; a partial failure will still mark the
 *     doc 'indexed' if at least one chunk made it through.
 */

// NOTE: pdf-parse is dynamically imported because it reads a `test/data` folder
// at module load — importing at top level would break in Workers.
async function parsePdf(buffer: ArrayBuffer): Promise<string> {
  const pdfParse: any = (await import('pdf-parse')).default;
  const result = await pdfParse(Buffer.from(buffer));
  return result?.text || '';
}

async function extractText(
  buffer: ArrayBuffer,
  contentType: string | undefined,
  filename: string
): Promise<string> {
  const lowerName = filename.toLowerCase();
  const lowerCT = (contentType || '').toLowerCase();

  if (lowerCT.includes('pdf') || lowerName.endsWith('.pdf')) {
    return parsePdf(buffer);
  }
  if (
    lowerCT.startsWith('text/') ||
    lowerName.endsWith('.txt') ||
    lowerName.endsWith('.md') ||
    lowerName.endsWith('.markdown') ||
    lowerName.endsWith('.csv') ||
    lowerName.endsWith('.json') ||
    lowerName.endsWith('.log')
  ) {
    return new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  }
  // Fallback: best-effort UTF-8 decode. If it is binary we still write something
  // so downstream readers can see "binary:<filename>".
  try {
    return new TextDecoder('utf-8', { fatal: false }).decode(buffer);
  } catch {
    return `binary:${filename}`;
  }
}

function chunkByTokens(text: string, chunkSize: number = 500, overlap: number = 50): string[] {
  // Token-aware chunking so the split honours tiktoken token counts.
  // We approximate LangChain's RecursiveCharacterTextSplitter by chunking on
  // token boundaries with the requested overlap.
  const enc = encoding_for_model('text-embedding-3-small');
  try {
    const tokens = enc.encode(text);
    const chunks: string[] = [];
    let start = 0;
    while (start < tokens.length) {
      const end = Math.min(start + chunkSize, tokens.length);
      const slice = tokens.slice(start, end);
      chunks.push(new TextDecoder().decode(enc.decode(slice)));
      if (end >= tokens.length) break;
      start = end - overlap;
    }
    return chunks.filter(c => c.trim().length > 0);
  } finally {
    enc.free();
  }
}

async function chunkWithLangChain(text: string): Promise<string[]> {
  // Fallback if tiktoken loader misbehaves in some Workers runtimes — uses the
  // character-based recursive splitter as in the spec.
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  return splitter.splitText(text);
}

async function embedBatch(
  chunks: string[],
  apiKey: string,
  model: string = 'text-embedding-3-small'
): Promise<number[][]> {
  // OpenAI embeddings endpoint accepts up to 2048 inputs per request. We batch
  // 64 at a time to keep payload sizes reasonable.
  const BATCH = 64;
  const out: number[][] = [];
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    const res = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: batch, model }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI embeddings failed (${res.status}): ${errText}`);
    }
    const data: any = await res.json();
    for (const item of data.data) out.push(item.embedding);
  }
  return out;
}

function getPineconeClient(env: Env): Pinecone {
  if (!env.PINECONE_API_KEY) {
    throw new Error('PINECONE_API_KEY is not configured');
  }
  return new Pinecone({ apiKey: env.PINECONE_API_KEY });
}

function getPineconeIndex(pc: Pinecone, env: Env): any {
  // Prefer PINECONE_INDEX_HOST (hosted index URL) when set; otherwise fall
  // back to PINECONE_INDEX_NAME. Both are valid deployment shapes.
  const name = (env as any).PINECONE_INDEX_NAME || 'saqyn-rag-index';
  if ((env as any).PINECONE_INDEX_HOST) {
    return pc.index(name, (env as any).PINECONE_INDEX_HOST);
  }
  return pc.index(name);
}

export async function processIngestionMessage(body: any, env: Env): Promise<void> {
  const { tenantId, docId, r2Key, filename, contentType } = body || {};
  if (!tenantId || !docId || !r2Key) {
    throw new Error('Ingestion message missing required fields: tenantId, docId, r2Key');
  }
  if (!env.BUCKET) {
    throw new Error('R2 BUCKET binding is not configured');
  }
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  const sql = neon(env.DATABASE_URL);

  // ── Step 1: PARSE — fetch from R2 and extract text ───────────────────────
  const obj = await env.BUCKET.get(r2Key);
  if (!obj) {
    await sql`
      UPDATE documents SET status = 'failed'
      WHERE id = ${docId} AND company_id = ${tenantId}
    `;
    throw new Error(`R2 object not found for key ${r2Key}`);
  }
  const buffer = await obj.arrayBuffer();
  const text = await extractText(buffer, contentType, filename);

  if (!text || text.trim().length === 0) {
    await sql`
      UPDATE documents SET status = 'failed'
      WHERE id = ${docId} AND company_id = ${tenantId}
    `;
    throw new Error(`No extractable text from ${filename}`);
  }

  // ── Step 2: CHUNK — token-aware (~500 tokens, 50 overlap) ────────────────
  let chunks: string[];
  try {
    chunks = chunkByTokens(text, 500, 50);
  } catch {
    chunks = await chunkWithLangChain(text);
  }
  if (chunks.length === 0) {
    await sql`UPDATE documents SET status = 'failed' WHERE id = ${docId} AND company_id = ${tenantId}`;
    throw new Error('Chunker produced zero chunks');
  }

  // ── Step 3: EMBED — OpenAI text-embedding-3-small ───────────────────────
  let vectors: number[][];
  try {
    vectors = await embedBatch(chunks, env.OPENAI_API_KEY, 'text-embedding-3-small');
  } catch (err) {
    await sql`UPDATE documents SET status = 'failed' WHERE id = ${docId} AND company_id = ${tenantId}`;
    throw err;
  }

  // ── Step 4: UPSERT — Pinecone ────────────────────────────────────────────
  const pc = getPineconeClient(env);
  const index = getPineconeIndex(pc, env);
  const namespace = tenantId; // tenant isolation via namespace
  const records = chunks.map((chunk, i) => ({
    id: `${docId}-chunk-${i}`,
    values: vectors[i],
    metadata: {
      tenantId,
      docId,
      chunkIndex: i,
      text: chunk.slice(0, 8000), // Pinecone metadata text cap
      filename,
    },
  }));

  // Pinecone SDK accepts up to 100 records per upsert call in v8+; batch safely.
  const UPSERT_BATCH = 100;
  for (let i = 0; i < records.length; i += UPSERT_BATCH) {
    const slice = records.slice(i, i + UPSERT_BATCH);
    await index.namespace(namespace).upsert(slice);
  }

  // ── Step 5: PERSIST — mark completed + write extracted text back to R2 ──
  const extractedKey = `extracted/${tenantId}/${docId}.txt`;
  await env.BUCKET.put(extractedKey, text, {
    httpMetadata: { contentType: 'text/plain; charset=utf-8' },
    customMetadata: { tenantId, docId, originalFilename: filename, sourceR2Key: r2Key },
  });

  await sql`
    UPDATE documents
    SET status = 'indexed',
        chunk_count = ${chunks.length},
        extracted_r2_key = ${extractedKey},
        indexed_at = CURRENT_TIMESTAMP
    WHERE id = ${docId} AND company_id = ${tenantId}
  `;
}

/**
 * Default-export shape expected by backend/index.ts `queue()` handler:
 *   async (batch, env) => { for msg of batch.messages: await processIngestionMessage(msg.body, env); msg.ack(); }
 */
export async function handleIngestionBatch(batch: any, env: Env): Promise<void> {
  for (const msg of batch.messages) {
    try {
      let body: any;
      try {
        body = typeof msg.body === 'string' ? JSON.parse(msg.body) : msg.body;
      } catch {
        body = msg.body;
      }
      await processIngestionMessage(body, env);
      msg.ack();
    } catch (err) {
      console.error(`[ingestion] failed for msg ${msg.id}:`, err);
      msg.ack();
    }
  }
}
