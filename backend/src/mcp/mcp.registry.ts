export const MCP_REGISTRY: Record<string, { type: string; active: boolean }> = {
  neon: { type: 'database', active: true },
  pinecone: { type: 'vector', active: true },
  clerk: { type: 'auth', active: true },
  upstash: { type: 'cache', active: true },
  vapi: { type: 'voice', active: true },
  r2: { type: 'storage', active: true },
  email: { type: 'email', active: true },
};
