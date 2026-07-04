export const runtime = 'edge';

export async function GET() {
  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <rect width="1200" height="630" rx="40" fill="#0D1B2D"/>\n  <rect x="60" y="60" width="1080" height="510" rx="32" fill="rgba(255,255,255,0.08)"/>\n  <text x="80" y="180" fill="#FFFFFF" font-family="Inter, system-ui, sans-serif" font-size="64" font-weight="700">SAQYN RABT</text>\n  <text x="80" y="260" fill="#A4C7F1" font-family="Inter, system-ui, sans-serif" font-size="36">AI Operations · Guest Queue · Staff Knowledge</text>\n  <text x="80" y="360" fill="#E2E8F0" font-family="Inter, system-ui, sans-serif" font-size="28">Secure automation for hospitality, clinics, and service teams.</text>\n</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml;charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
