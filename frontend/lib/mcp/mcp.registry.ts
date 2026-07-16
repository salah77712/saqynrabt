export const MCP_REGISTRY = {
  neon: {
    type: 'database',
    url: process.env.DATABASE_URL,
    active: true
  },
  pinecone: {
    type: 'vector',
    apiKey: process.env.PINECONE_API_KEY,
    index: process.env.PINECONE_INDEX_NAME,
    host: process.env.PINECONE_INDEX_HOST,
    active: true
  },
  clerk: {
    type: 'auth',
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    active: true
  },
  upstash: {
    type: 'cache',
    url: process.env.REDIS_URL,
    token: process.env.REDIS_URL?.split(':')?.slice(2)?.join(':')?.split('@')?.[0] || undefined,
    active: true
  },
  vapi: {
    type: 'voice',
    apiKey: process.env.VAPI_API_KEY,
    webhookSecret: process.env.VAPI_WEBHOOK_SECRET,
    active: true
  },
  r2: {
    type: 'storage',
    accessKey: process.env.R2_ACCESS_KEY,
    secretKey: process.env.R2_SECRET_KEY,
    bucket: process.env.R2_BUCKET_NAME,
    active: true
  },
  email: {
    type: 'email',
    apiKey: process.env.EMAIL_API_KEY,
    active: true
  }
};
