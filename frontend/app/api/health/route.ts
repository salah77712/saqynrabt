import { checkMCPHealth } from '../../../lib/mcp/health';

export async function GET() {
  try {
    const status = await checkMCPHealth();
    return Response.json({ mcp: status, overall: Object.values(status).every(v => v === 'online') ? 'healthy' : 'degraded' });
  } catch (err) {
    console.error('Health check failed:', err);
    return Response.json({ error: 'Health check failed' }, { status: 500 });
  }
}
