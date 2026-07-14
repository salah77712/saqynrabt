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
    const rows = await sql`
      SELECT id, name, filename, content_type, size_bytes, created_at, uploaded_at, status
      FROM documents
      WHERE company_id = ${company_id} AND status != 'deleted'
      ORDER BY created_at DESC
    `;
    
    const documents = (rows || []).map((doc: any) => ({
      id: doc.id,
      name: doc.filename || doc.name,
      filename: doc.filename || doc.name,
      content_type: doc.content_type,
      size_bytes: doc.size_bytes || 0,
      size: doc.size_bytes ? `${(doc.size_bytes / 1024).toFixed(1)} KB` : '0 KB',
      uploaded_at: doc.uploaded_at || doc.created_at,
      created_at: doc.created_at,
      status: doc.status === 'active' || doc.status === 'indexed' || doc.status === 'completed' ? 'ready' : (doc.status === 'failed' ? 'failed' : 'processing')
    }));

    return new Response(JSON.stringify({ documents }), { headers });
  } catch (err: any) {
    console.error("GET documents failed:", err);
    return new Response(JSON.stringify({ error: 'Internal server error', documents: [] }), { status: 500, headers });
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

    // Limit check (Rule 28/38)
    const [entitlements] = await sql`
      SELECT max_documents FROM company_entitlements WHERE company_id = ${company_id}
    `;
    const maxDocs = entitlements?.max_documents ?? 5;
    const [activeDocs] = await sql`
      SELECT COUNT(*)::int as doc_count 
      FROM documents 
      WHERE company_id = ${company_id} AND status != 'deleted'
    `;
    const activeDocsCount = activeDocs?.doc_count ?? 0;
    if (activeDocsCount >= maxDocs) {
      return new Response(JSON.stringify({ error: 'LIMIT_REACHED', message: 'Plan limit reached. Upgrade to add more documents.' }), { status: 403, headers });
    }

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    const fileContent = new TextDecoder().decode(fileBuffer);

    const docId = `doc_${crypto.randomUUID().substring(0, 8)}`;
    const fileKey = `${company_id}/${file.name}`;

    // Upload source file to R2 bucket if BUCKET is configured
    if (env.BUCKET) {
      await env.BUCKET.put(fileKey, fileBuffer, {
        customMetadata: {
          company_id: company_id || '',
          name: file.name
        }
      });
    }

    const docResult = await sql`
      INSERT INTO documents (id, company_id, name, filename, content_type, size_bytes, content, r2_key, status, uploaded_by)
      VALUES (${docId}, ${company_id}, ${file.name}, ${file.name}, ${file.type}, ${fileBuffer.byteLength}, ${fileContent}, ${fileKey}, 'processing', ${userId})
      RETURNING id, name, filename, content_type, size_bytes, uploaded_at, status
    `;
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

    // Map response for the frontend
    const createdDoc = docResult[0];
    const formattedDoc = {
      id: createdDoc.id,
      name: createdDoc.filename || createdDoc.name,
      filename: createdDoc.filename || createdDoc.name,
      content_type: createdDoc.content_type,
      size_bytes: createdDoc.size_bytes || 0,
      size: createdDoc.size_bytes ? `${(createdDoc.size_bytes / 1024).toFixed(1)} KB` : '0 KB',
      uploaded_at: createdDoc.uploaded_at,
      status: createdDoc.status === 'active' || createdDoc.status === 'indexed' || createdDoc.status === 'completed' ? 'ready' : (createdDoc.status === 'failed' ? 'failed' : 'processing')
    };

    return new Response(JSON.stringify({ document: formattedDoc }), { status: 201, headers });
  } catch (err: any) {
    console.error("Upload documents failed:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
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
    const [doc] = await sql`
      SELECT r2_key FROM documents 
      WHERE id = ${docId} AND company_id = ${company_id} AND status != 'deleted'
    `;
    if (!doc) {
      return new Response(JSON.stringify({ error: 'Document not found' }), { status: 404, headers });
    }

    // Cascading Document Cleanup (Rule 37)
    // 1. Delete vectors from Pinecone if host is set
    if (env.PINECONE_INDEX_HOST && env.PINECONE_API_KEY) {
      try {
        await fetch(`https://${env.PINECONE_INDEX_HOST}/vectors/delete`, {
          method: 'POST',
          headers: {
            'Api-Key': env.PINECONE_API_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter: { docId: docId },
            namespace: company_id,
          }),
        });
      } catch (err) {
        console.error("Failed to delete vectors from Pinecone:", err);
      }
    }

    // 2. Delete DB reference chunks
    await sql`
      DELETE FROM chatbot_chunks WHERE document_id = ${docId} AND company_id = ${company_id}
    `;

    // 3. Delete source file from R2
    if (env.BUCKET && doc.r2_key) {
      try {
        await env.BUCKET.delete(doc.r2_key);
      } catch (err) {
        console.error("Failed to delete file from R2:", err);
      }
    }

    // 4. Soft delete document in DB
    await sql`
      UPDATE documents 
      SET status = 'deleted' 
      WHERE id = ${docId} AND company_id = ${company_id}
    `;

    return new Response(JSON.stringify({ success: true }), { headers });
  } catch (err: any) {
    console.error("Delete document failed:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
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
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

