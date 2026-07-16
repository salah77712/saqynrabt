import { checkMCPHealth } from '../../../lib/mcp/health';

export async function GET() {
  try {
    const dbStatus = await checkMCPHealth();

    const services: Record<string, boolean | null> = {
      neon: dbStatus.neon === 'online',
      pinecone: dbStatus.pinecone === 'online',
      upstash: dbStatus.upstash === 'online',
      cloudflare: typeof process.env.R2_ACCESS_KEY !== 'undefined',
      clerk: typeof process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'undefined',
      fetch: true,
    };

    const allOnline = Object.values(services).every(v => v === true);

    return Response.json({ services, overall: allOnline ? 'healthy' : 'degraded' });
  } catch (err) {
    console.error('Health check failed:', err);
    return Response.json({ error: 'Health check failed' }, { status: 500 });
  }
}
