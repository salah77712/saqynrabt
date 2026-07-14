import { MCP_REGISTRY } from './mcp.registry';

export function validateEnvironment(env: Record<string, any>) {
  const required = [
    'OPENAI_API_KEY',
    'DATABASE_URL',
    'PINECONE_API_KEY',
    'PINECONE_INDEX_NAME',
    'PINECONE_INDEX_HOST',
    'CLERK_SECRET_KEY',
    'CLERK_PUBLISHABLE_KEY',
    'VAPI_API_KEY',
    'VAPI_WEBHOOK_SECRET',
    'R2_ACCESS_KEY',
    'R2_SECRET_KEY',
    'R2_BUCKET_NAME',
    'REDIS_URL',
    'EMAIL_API_KEY',
    'INGESTION_QUEUE',
  ];

  const missing: string[] = [];
  for (const key of required) {
    if (!env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.error(`Missing environment variables: ${missing.join(', ')}`);
    throw new Error(`Missing critical environment variables: ${missing.join(', ')}`);
  }

  const mcpStatus: string[] = [];
  for (const [name, config] of Object.entries(MCP_REGISTRY)) {
    const active = config.active !== false;
    mcpStatus.push(`${name}: ${active ? 'configured' : 'disabled'}`);
  }

  console.log('MCP Provider Status:');
  mcpStatus.forEach((line) => console.log(`  - ${line}`));
  console.log('All critical backend environment variables are present.');
}

export const MCP_REGISTRY = {
  neon: { type: 'database', active: true },
  pinecone: { type: 'vector', active: true },
  clerk: { type: 'auth', active: true },
  upstash: { type: 'cache', active: true },
  vapi: { type: 'voice', active: true },
  r2: { type: 'storage', active: true },
  email: { type: 'email', active: true },
};
