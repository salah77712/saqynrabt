export const runtime = 'edge';

const baseUrl = 'https://saqynrabt.com';

/** All public routes with their priority and change frequency */
const routes: { path: string; priority: string; changefreq: string }[] = [
  // Marketing pages (high priority)
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/features', priority: '0.9', changefreq: 'weekly' },
  { path: '/industries', priority: '0.9', changefreq: 'weekly' },
  { path: '/how-it-works', priority: '0.9', changefreq: 'monthly' },
  { path: '/pricing', priority: '0.9', changefreq: 'weekly' },
  { path: '/faq', priority: '0.8', changefreq: 'monthly' },
  { path: '/about', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { path: '/global', priority: '0.7', changefreq: 'monthly' },
  { path: '/changelog', priority: '0.6', changefreq: 'weekly' },
  { path: '/marketplace', priority: '0.7', changefreq: 'monthly' },

  // Product pages
  { path: '/automation', priority: '0.8', changefreq: 'monthly' },
  { path: '/chatbot', priority: '0.8', changefreq: 'monthly' },

  // Help center
  { path: '/help/getting-started', priority: '0.7', changefreq: 'monthly' },
  { path: '/help/automation', priority: '0.6', changefreq: 'monthly' },
  { path: '/help/chatbot', priority: '0.6', changefreq: 'monthly' },
  { path: '/help/billing', priority: '0.6', changefreq: 'monthly' },

  // Developer
  { path: '/developers', priority: '0.7', changefreq: 'monthly' },
  { path: '/developers/api-docs', priority: '0.7', changefreq: 'monthly' },
  { path: '/developers/plugins', priority: '0.6', changefreq: 'monthly' },
  { path: '/developers/cli', priority: '0.6', changefreq: 'monthly' },

// Legal
{ path: '/privacy-policy', priority: '0.4', changefreq: 'yearly' },
{ path: '/terms-and-conditions', priority: '0.4', changefreq: 'yearly' },
{ path: '/cookie-policy', priority: '0.4', changefreq: 'yearly' },

// Product
{ path: '/synthetiq-voice', priority: '0.8', changefreq: 'monthly' },
{ path: '/synthetiq-work', priority: '0.8', changefreq: 'monthly' },
{ path: '/voice-agent', priority: '0.8', changefreq: 'monthly' },
{ path: '/thank-you', priority: '0.5', changefreq: 'monthly' },
{ path: '/sitemap', priority: '0.3', changefreq: 'weekly' },

// Marketing extensions
{ path: '/trust', priority: '0.7', changefreq: 'monthly' },

// Portal
{ path: '/portal/privacy', priority: '0.4', changefreq: 'monthly' },

// Legal
{ path: '/vulnerability-disclosure', priority: '0.4', changefreq: 'yearly' },
{ path: '/terms', priority: '0.4', changefreq: 'yearly' },
{ path: '/security', priority: '0.4', changefreq: 'yearly' },
{ path: '/privacy', priority: '0.4', changefreq: 'yearly' },
{ path: '/nda', priority: '0.4', changefreq: 'yearly' },
{ path: '/dpa', priority: '0.4', changefreq: 'yearly' },
];

export async function GET() {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) =>
      `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml;charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
