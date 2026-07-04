import { Ai } from '@cloudflare/ai';

export interface ChunkResult {
  id: string;
  document_id: string;
  content: string;
  metadata: any;
  score: number;
}

/**
 * Reciprocal Rank Fusion (RRF) Reranking algorithm
 * Combines two ranked lists (vector results & keyword full-text results)
 */
export function reciprocalRankFusion(
  vectorResults: ChunkResult[],
  textResults: ChunkResult[],
  k = 60
): ChunkResult[] {
  const scores: Record<string, { chunk: ChunkResult; score: number }> = {};

  const addScores = (results: ChunkResult[]) => {
    results.forEach((chunk, rank) => {
      const id = chunk.id;
      if (!scores[id]) {
        scores[id] = { chunk, score: 0 };
      }
      scores[id].score += 1 / (rank + 1 + k);
    });
  };

  addScores(vectorResults);
  addScores(textResults);

  return Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .map(item => ({
      ...item.chunk,
      score: item.score
    }));
}

/**
 * Performs reranking using Cloudflare Workers AI Cross-Encoder (BGE Reranker)
 */
export async function rerankWithCrossEncoder(
  env: any,
  query: string,
  chunks: ChunkResult[]
): Promise<ChunkResult | null> {
  if (!chunks || chunks.length === 0) return null;

  try {
    const ai = new Ai(env.AI);
    const inputs = chunks.map(c => ({
      text: c.content,
      source: query
    }));

    // Call Cloudflare Workers AI BGE Reranker large model
    const response: any = await ai.run('@cf/baai/bge-reranker-large', {
      requests: inputs
    });

    if (Array.isArray(response)) {
      const scored = chunks.map((c, i) => ({
        ...c,
        score: response[i]?.score ?? 0
      }));

      // Sort and return the highest scoring chunk
      return scored.sort((a, b) => b.score - a.score)[0];
    }
  } catch (err) {
    console.warn('Cross-Encoder reranking failed, falling back to top hybrid result:', err);
  }

  // Fallback to highest hybrid score
  return chunks[0] || null;
}
