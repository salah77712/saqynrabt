export const runtime = 'edge';

const baseUrl = 'https://saqynrabt.com';
const paths = [
  '/',
  '/automation',
  '/chatbot',
  '/features',
  '/industries',
  '/how-it-works',
  '/pricing',
  '/faq',
  '/global',
  '/case-studies',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-and-conditions',
  '/cookie-policy',
  '/dashboard',
  '/dashboard/approvals',
  '/dashboard/automation',
  '/dashboard/chat',
  '/dashboard/documents',
  '/dashboard/settings',
  '/dashboard/voice',
];

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map(
      (path) =>
        `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${path === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
    )
    .join('\n')}\n</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml;charset=utf-8',
    },
  });
}
