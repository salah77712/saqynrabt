export const runtime = 'edge';

export async function GET() {
  const body = `User-agent: *
Allow: /

# Block admin and internal routes
Disallow: /admin
Disallow: /admin/*
Disallow: /portal/*
Disallow: /api/*
Disallow: /(auth)/*

# Block dashboard settings and voice (private app routes)
Disallow: /dashboard/settings
Disallow: /dashboard/voice

# Sitemap
Sitemap: https://saqynrabt.com/sitemap.xml

# Crawl-delay (respect server resources)
Crawl-delay: 1
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
