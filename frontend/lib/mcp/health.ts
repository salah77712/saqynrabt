import { MCP_REGISTRY } from './mcp.registry';
import { neon } from '@neondatabase/serverless';
import { Pinecone } from '@pinecone-database/pinecone';
import { Redis } from '@upstash/redis';

export async function checkMCPHealth() {
  const status: Record<string, 'online' | 'offline' | 'error'> = {};

  try {
    const sql = neon(MCP_REGISTRY.neon.url!);
    await sql`SELECT 1`;
    status.neon = 'online';
  } catch { status.neon = 'offline'; }

  try {
    const pc = new Pinecone({ apiKey: MCP_REGISTRY.pinecone.apiKey! });
    await pc.describeIndex(MCP_REGISTRY.pinecone.index!);
    status.pinecone = 'online';
  } catch { status.pinecone = 'offline'; }

  try {
    const redis = new Redis({ url: MCP_REGISTRY.upstash.url! });
    await redis.ping();
    status.upstash = 'online';
  } catch { status.upstash = 'offline'; }

  return status;
}
