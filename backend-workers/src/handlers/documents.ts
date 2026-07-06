import { neon } from '@neondatabase/serverless';
import type { RequestWithContext } from '../utils';
import { corsHeaders, logAudit, chunkText, generateEmbedding } from '../utils';

export async function handleGetDocuments(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const sql = neon(env.DATABASE_URL);
    const documents = await sql`
      SELECT id, filename, content_type, size_bytes, uploaded_at, status
      FROM documents
      WHERE company_id = ${company_id}
      ORDER BY uploaded_at DESC
    `;
    return new Response(JSON.stringify({ documents: documents || [] }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message, documents: [] }), { status: 500, headers });
  }
}

export async function handleUploadDocument(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;
  const userId = jwt.sub;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) {
      return new Response(JSON.stringify({ error: 'File is required' }), { status: 400, headers });
    }

    const sql = neon(env.DATABASE_URL);
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    const fileContent = new TextDecoder().decode(fileBuffer);

    const docResult = await sql`
      INSERT INTO documents (company_id, filename, content_type, size_bytes, content, status)
      VALUES (${company_id}, ${file.name}, ${file.type}, ${fileBuffer.byteLength}, ${fileContent}, 'processing')
      RETURNING id, filename, content_type, size_bytes, uploaded_at, status
    `;
    const docId = docResult[0].id;
    await logAudit(env, company_id!, userId, 'upload_document', { filename: file.name, size: fileBuffer.byteLength, docId });

    if (env.OPENAI_API_KEY && env.PINECONE_INDEX_HOST?.trim()) {
      request.ctx?.waitUntil((async () => {
        try {
          const chunks = chunkText(fileContent);
          for (let i = 0; i < chunks.length; i++) {
            const vector = await generateEmbedding(chunks[i], env.OPENAI_API_KEY!);
            await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/upsert`, {
              method: 'POST',
              headers: { 'Api-Key': env.PINECONE_API_KEY, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                vectors: [{
                  id: `doc-${docId}-chunk-${i}`,
                  values: vector,
                  metadata: { docId, companyId: company_id, filename: file.name, text: chunks[i], chunkIndex: i }
                }]
              }),
            });
          }
          await sql`UPDATE documents SET status = 'indexed' WHERE id = ${docId}`;
        } catch (err) {
          console.error(`Background indexing failed for doc ${docId}:`, err);
          await sql`UPDATE documents SET status = 'failed' WHERE id = ${docId}`;
        }
      })());
    } else {
      await sql`UPDATE documents SET status = 'completed' WHERE id = ${docId}`;
    }

    return new Response(JSON.stringify({ document: docResult[0] }), { status: 201, headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}

export async function handleDeleteDocument(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }
  const company_id = jwt.company_id;

  try {
    const url = new URL(request.url);
    const segments = url.pathname.split('/').filter(Boolean);
    const docId = segments[segments.length - 1];
    if (!docId) {
      return new Response(JSON.stringify({ error: 'Document ID is required' }), { status: 400, headers });
    }

    const sql = neon(env.DATABASE_URL);
    await sql`DELETE FROM documents WHERE id = ${docId} AND company_id = ${company_id}`;
    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}

export async function handleIngest(request: RequestWithContext): Promise<Response> {
  const headers = corsHeaders(request, request.env);
  headers['Content-Type'] = 'application/json';
  const env = request.env;
  const jwt = request.jwt;
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  try {
    const body: any = await request.json();
    const { text, source } = body;
    if (!text) {
      return new Response(JSON.stringify({ error: 'text is required' }), { status: 400, headers });
    }
    if (!env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), { status: 503, headers });
    }

    const chunks = chunkText(text);
    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const vector = await generateEmbedding(chunks[i], env.OPENAI_API_KEY);
      vectors.push({
        id: `ingest-${Date.now()}-${i}`,
        values: vector,
        metadata: { text: chunks[i], source: source || 'api', chunkIndex: i, timestamp: new Date().toISOString() },
      });
    }

    if (vectors.length > 0 && env.PINECONE_INDEX_HOST?.trim()) {
      await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/upsert`, {
        method: 'POST',
        headers: { 'Api-Key': env.PINECONE_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ vectors }),
      });
    }

    return new Response(JSON.stringify({ success: true, chunks_processed: chunks.length }), { headers });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}
