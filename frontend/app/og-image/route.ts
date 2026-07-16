export const runtime = 'edge';

export async function GET() {
  const svg = `<svg aria-hidden="true" width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect width="1200" height="630" rx="40" fill="#141F33"/>\n  <rect x="60" y="60" width="1080" height="510" rx="32" fill="rgba(42,92,255,0.1)"/>\n  <text x="80" y="180" fill="#F8F9FB" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="700">SAQYN RABT</text>\n  <text x="80" y="260" fill="#2A5CFF" font-family="Inter, system-ui, sans-serif" font-size="36">AI Operations · Guest Queue · Staff Knowledge</text>\n  <text x="80" y="360" fill="#F8F9FB" font-family="Inter, system-ui, sans-serif" font-size="28">Secure automation for hospitality, clinics, and service teams.</text>\n</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

