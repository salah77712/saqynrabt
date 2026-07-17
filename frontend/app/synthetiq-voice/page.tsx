'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const MCP_SERVICES = [
  { name: 'Postgres', key: 'neon', color: '#336791' },
  { name: 'Redis', key: 'upstash', color: '#DC382D' },
  { name: 'Pinecone', key: 'pinecone', color: '#F6821F' },
  { name: 'Cloudflare', key: 'cloudflare', color: '#F38020' },
  { name: 'Clerk', key: 'clerk', color: '#6C47FF' },
  { name: 'Fetch', key: 'fetch', color: '#141F33' },
] as const;

function CallFlowSVG() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[1200px] w-full" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <defs>
        <filter id="shadow-card">
          <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#141F33" floodOpacity="0.06"/>
        </filter>
        <filter id="shadow-node">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#141F33" floodOpacity="0.04"/>
        </filter>
        <filter id="shadow-glow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#2A5CFF" floodOpacity="0.2"/>
        </filter>
      </defs>

      <rect x="40" y="40" width="1520" height="820" rx="40" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" filter="url(#shadow-card)" />

      <rect x="40" y="40" width="1520" height="80" rx="40" fill="#FFFFFF" stroke="#141F33" strokeWidth="1.5" />
      <rect x="40" y="80" width="1520" height="40" fill="#FFFFFF" />
      <circle cx="70" cy="80" r="6" fill="#141F33" />
      <circle cx="88" cy="80" r="6" fill="#141F33" />
      <circle cx="106" cy="80" r="6" fill="#141F33" />
      <text x="800" y="88" textAnchor="middle" fill="#141F33" fontSize="20" fontWeight="800" letterSpacing="2">SYNTHETIQ VOICE — CALL TO RESOLUTION FLOW</text>

      <rect x="120" y="160" width="280" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="140" cy="180" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="140" y="186" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">1</text>
      <text x="175" y="186" fill="#141F33" fontSize="18" fontWeight="800">Customer Calls In</text>
      <text x="145" y="220" fill="#141F33" fontSize="14" fontWeight="500">An external customer dials</text>
      <text x="145" y="242" fill="#141F33" fontSize="14" fontWeight="500">your business phone number.</text>
      <text x="145" y="268" fill="#2A5CFF" fontSize="12" fontWeight="700">Action: Call Answered</text>

      <path d="M 400 225 L 520 225" stroke="#141F33" strokeWidth="2.5" strokeDasharray="8,6" strokeLinecap="round" />
      <circle cx="510" cy="225" r="5" fill="#2A5CFF" />

      <rect x="530" y="160" width="280" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="550" cy="180" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="550" y="186" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">2</text>
      <text x="585" y="186" fill="#141F33" fontSize="18" fontWeight="800">AI Listens &amp; Processes</text>
      <text x="555" y="220" fill="#141F33" fontSize="14" fontWeight="500">The AI converts speech to text</text>
      <text x="555" y="242" fill="#141F33" fontSize="14" fontWeight="500">and understands the request.</text>
      <text x="555" y="268" fill="#2A5CFF" fontSize="12" fontWeight="700">Action: Speech-to-Text</text>

      <path d="M 810 225 L 930 225" stroke="#141F33" strokeWidth="2.5" strokeDasharray="8,6" strokeLinecap="round" />
      <circle cx="920" cy="225" r="5" fill="#2A5CFF" />

      <rect x="940" y="160" width="280" height="130" rx="24" fill="#FFFFFF" stroke="#2A5CFF" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="960" cy="180" r="18" fill="#FFFFFF" stroke="#2A5CFF" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="960" y="186" textAnchor="middle" fill="#2A5CFF" fontSize="16" fontWeight="800">3</text>
      <text x="995" y="186" fill="#141F33" fontSize="18" fontWeight="800">AI Decides Best Action</text>
      <text x="965" y="220" fill="#141F33" fontSize="14" fontWeight="500">The system evaluates the</text>
      <text x="965" y="242" fill="#141F33" fontSize="14" fontWeight="500">request and chooses the path.</text>
      <text x="965" y="268" fill="#2A5CFF" fontSize="12" fontWeight="700">Core: Decision Engine</text>

      <path d="M 1080 290 L 1080 320 L 800 320 L 800 350" stroke="#141F33" strokeWidth="2.5" fill="none" />
      <circle cx="1080" cy="290" r="5" fill="#2A5CFF" />

      <rect x="530" y="360" width="540" height="140" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="550" cy="380" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="550" y="386" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">4</text>
      <text x="585" y="386" fill="#141F33" fontSize="18" fontWeight="800">Route to Correct Department</text>
      <text x="555" y="420" fill="#141F33" fontSize="14" fontWeight="500">Based on the customer's needs, the AI</text>
      <text x="555" y="442" fill="#141F33" fontSize="14" fontWeight="500">automatically transfers the call to:</text>

      <rect x="600" y="460" width="110" height="28" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="655" y="480" textAnchor="middle" fill="#141F33" fontSize="13" fontWeight="600">Sales Team</text>
      <rect x="740" y="460" width="110" height="28" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="795" y="480" textAnchor="middle" fill="#141F33" fontSize="13" fontWeight="600">Support Desk</text>
      <rect x="880" y="460" width="110" height="28" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="935" y="480" textAnchor="middle" fill="#141F33" fontSize="13" fontWeight="600">Billing Team</text>

      <path d="M 800 500 L 800 530" stroke="#141F33" strokeWidth="2.5" />
      <circle cx="800" cy="530" r="5" fill="#2A5CFF" />

      <rect x="530" y="540" width="540" height="100" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="550" cy="560" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="550" y="566" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">5</text>
      <text x="585" y="566" fill="#141F33" fontSize="18" fontWeight="800">Problem Solved</text>
      <text x="555" y="600" fill="#141F33" fontSize="14" fontWeight="500">The customer gets the right help, the issue is resolved,</text>
      <text x="555" y="618" fill="#141F33" fontSize="14" fontWeight="500">and the call ends with a satisfied outcome.</text>

      <path d="M 800 640 L 800 670" stroke="#2A5CFF" strokeWidth="3" />
      <circle cx="800" cy="670" r="6" fill="#2A5CFF" />

      <rect x="530" y="680" width="540" height="100" rx="24" fill="#FFFFFF" stroke="#2A5CFF" strokeWidth="3" filter="url(#shadow-glow)" />
      <circle cx="550" cy="700" r="18" fill="#FFFFFF" stroke="#2A5CFF" strokeWidth="2.5" filter="url(#shadow-glow)"/>
      <text x="550" y="706" textAnchor="middle" fill="#2A5CFF" fontSize="16" fontWeight="800">6</text>
      <text x="585" y="706" fill="#141F33" fontSize="18" fontWeight="800">Live Dashboard Updated</text>
      <text x="555" y="740" fill="#141F33" fontSize="14" fontWeight="500">Call logs, duration, routing path, and outcome are</text>
      <text x="555" y="758" fill="#141F33" fontSize="14" fontWeight="500">automatically recorded in the real-time dashboard.</text>

      <rect x="70" y="780" width="1460" height="50" rx="40" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" strokeDasharray="6,6" />
      <text x="800" y="810" textAnchor="middle" fill="#141F33" fontSize="14" fontWeight="700" letterSpacing="1.5">SECURE INFRASTRUCTURE · ENCRYPTED AUDIO · ENTERPRISE AUTHENTICATION</text>
    </svg>
  );
}

function MCPStatusDots() {
  const [statuses, setStatuses] = React.useState<Record<string, boolean | null>>({});

  React.useEffect(() => {
    async function check() {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        if (data?.services) {
          setStatuses(data.services);
        }
      } catch {
        setStatuses({});
      }
    }
    check();
    const interval = setInterval(check, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2.5">
      {MCP_SERVICES.map((svc) => (
        <div key={svc.key} className="flex items-center gap-1" title={svc.name}>
          <span
            className="w-2 h-2 rounded-full inline-block transition-colors duration-500"
style={{
        backgroundColor: statuses[svc.key] === true ? 'rgb(34,197,94)' : statuses[svc.key] === false ? 'rgb(239,68,68)' : 'rgb(209,213,219)',
      }}
          />
          <span className="text-[10px] font-semibold text-primary/60 hidden sm:inline">{svc.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function SynthetiqVoicePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-12">
        
        {/* Hero wrapping div with 4px Royal Blue border top */}
        <div className="border-t-4 border-accent rounded-xl bg-white shadow-card p-8 lg:p-12 mb-16 border border-primary/10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider mb-6">
              ● Synthetiq Voice Call Agent
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Never Miss a Call Again. AI that speaks, routes, and escalates.
            </h1>
            <p className="mt-6 text-sm md:text-base text-primary/70 font-semibold leading-relaxed">
              Synthetiq Voice answers inbound company calls with a natural, conversational human voice. Setup custom IVR flows and integrate with CRM databases in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="bg-primary hover:bg-primary/90 text-surface text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
              >
                View Plans & Pricing
              </Link>
              <Link
                href="/admin/integrations"
                className="bg-transparent border border-primary/15 text-primary hover:bg-primary/5 text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
              >
                Configure Hotline &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Natural Voice AI */}
            <div className="bg-white border border-primary/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-primary/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg aria-hidden="true" width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-primary mb-3">Natural Voice AI</h3>
                <p className="text-xs text-primary/60 font-semibold leading-relaxed">
                  Handles inbound calls with human-like tone, natural accents, and absolute zero delay. Speaks Arabic and English natively.
                </p>
              </div>
            </div>

            {/* Card 2: Intelligent Routing */}
            <div className="bg-white border border-primary/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-primary/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg aria-hidden="true" width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <rect x="9" y="1" width="6" height="4" rx="1" />
                  <rect x="1" y="18" width="6" height="5" rx="1" />
                  <rect x="17" y="18" width="6" height="5" rx="1" />
                  <path d="M12,5 V13 H4 V18 M12,13 H20 V18" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-primary mb-3">Intelligent Routing</h3>
                <p className="text-xs text-primary/60 font-semibold leading-relaxed">
                  Instantly routes calls to the right department or logs service tickets in your CRM or ERP system automatically.
                </p>
              </div>
            </div>

            {/* Card 3: Smart Human Escalation */}
            <div className="bg-white border border-primary/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-primary/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg aria-hidden="true" width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <circle cx="12" cy="5" r="1" />
                  <path d="M9,22 L11,15 V11 H13 V15 L15,22 M12,8 V10" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-primary mb-3">Smart Human Escalation</h3>
                <p className="text-xs text-primary/60 font-semibold leading-relaxed">
                  Detects frustrated tones and instantly transfers the call to a live agent along with the generated context transcript.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Resolution Flow — SVG Diagram with Live MCP Status */}
        <section className="mb-16">
          <div className="bg-white border border-primary/10 rounded-xl shadow-card p-8 lg:p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-primary">Call to Resolution Flow</h2>
              <div className="flex items-center gap-3">
                <MCPStatusDots />
              </div>
            </div>
            <div className="w-full overflow-auto">
              <CallFlowSVG />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
