export const runtime = 'edge';

export async function GET() {
  const body = `User-agent: *\nAllow: /\nSitemap: https://saqynrabt.com/sitemap.xml\n`;
  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
  });
}
