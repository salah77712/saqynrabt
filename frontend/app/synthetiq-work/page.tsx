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

function WorkFlowSVG() {
  return (
    <svg viewBox="0 0 1600 900" fill="none" xmlns="http://www.w3.org/2000/svg" className="min-w-[1200px] w-full" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <defs>
        <filter id="shadow-card">
          <feDropShadow dx="0" dy="8" stdDeviation="24" floodColor="#141F33" floodOpacity="0.06"/>
        </filter>
        <filter id="shadow-node">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#141F33" floodOpacity="0.04"/>
        </filter>
        <filter id="shadow-glow">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor="#1A3BCC" floodOpacity="0.2"/>
        </filter>
      </defs>
      <rect x="40" y="40" width="1520" height="820" rx="40" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" filter="url(#shadow-card)" />
      <rect x="40" y="40" width="1520" height="80" rx="40" fill="#FFFFFF" stroke="#141F33" strokeWidth="1.5" />
      <rect x="40" y="80" width="1520" height="40" fill="#FFFFFF" />
      <circle cx="70" cy="80" r="6" fill="#141F33" />
      <circle cx="88" cy="80" r="6" fill="#141F33" />
      <circle cx="106" cy="80" r="6" fill="#141F33" />
      <text x="800" y="88" textAnchor="middle" fill="#141F33" fontSize="20" fontWeight="800" letterSpacing="2">SYNTHETIQ WORK — EMPLOYEE Q&A FLOW</text>

      <rect x="120" y="160" width="320" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="140" cy="180" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="140" y="186" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">1</text>
      <text x="175" y="186" fill="#141F33" fontSize="18" fontWeight="800">Admin Uploads Policies</text>
      <text x="145" y="220" fill="#141F33" fontSize="14" fontWeight="500">HR admins upload handbooks,</text>
      <text x="145" y="242" fill="#141F33" fontSize="14" fontWeight="500">SOPs, and policy documents.</text>
      <text x="145" y="268" fill="#1A3BCC" fontSize="12" fontWeight="700">Source: Admin Dashboard</text>

      <path d="M 440 225 L 560 225" stroke="#141F33" strokeWidth="2.5" strokeDasharray="8,6" strokeLinecap="round" />
      <circle cx="550" cy="225" r="5" fill="#1A3BCC" />

      <rect x="570" y="160" width="320" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="590" cy="180" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="590" y="186" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">2</text>
      <text x="625" y="186" fill="#141F33" fontSize="18" fontWeight="800">System Syncs Data</text>
      <text x="595" y="220" fill="#141F33" fontSize="14" fontWeight="500">The system securely imports</text>
      <text x="595" y="242" fill="#141F33" fontSize="14" fontWeight="500">employee records and roles.</text>
      <text x="595" y="268" fill="#1A3BCC" fontSize="12" fontWeight="700">Action: Secure Import</text>

      <path d="M 890 225 L 1010 225" stroke="#141F33" strokeWidth="2.5" strokeDasharray="8,6" strokeLinecap="round" />
      <circle cx="1000" cy="225" r="5" fill="#1A3BCC" />

      <rect x="1020" y="160" width="320" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="1040" cy="180" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="1040" y="186" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">3</text>
      <text x="1075" y="186" fill="#141F33" fontSize="18" fontWeight="800">Employee Asks Question</text>
      <text x="1045" y="220" fill="#141F33" fontSize="14" fontWeight="500">An employee opens the chat</text>
      <text x="1045" y="242" fill="#141F33" fontSize="14" fontWeight="500">and asks about PTO or policy.</text>
      <text x="1045" y="268" fill="#1A3BCC" fontSize="12" fontWeight="700">Source: Chat Widget</text>

      <path d="M 800 290 L 800 340" stroke="#141F33" strokeWidth="2.5" />
      <circle cx="800" cy="340" r="6" fill="#1A3BCC" />

      <rect x="220" y="360" width="1160" height="130" rx="24" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" filter="url(#shadow-node)" />
      <circle cx="240" cy="380" r="18" fill="#FFFFFF" stroke="#141F33" strokeWidth="2.5" filter="url(#shadow-node)"/>
      <text x="240" y="386" textAnchor="middle" fill="#141F33" fontSize="16" fontWeight="800">4</text>
      <text x="275" y="386" fill="#141F33" fontSize="18" fontWeight="800">System Searches for the Answer</text>

      <rect x="420" y="415" width="160" height="50" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="500" y="445" textAnchor="middle" fill="#141F33" fontSize="14" fontWeight="600">Policy Documents</text>
      <rect x="620" y="415" width="160" height="50" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="700" y="445" textAnchor="middle" fill="#141F33" fontSize="14" fontWeight="600">Employee Records</text>
      <rect x="820" y="415" width="160" height="50" rx="14" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
      <text x="900" y="445" textAnchor="middle" fill="#141F33" fontSize="14" fontWeight="600">Company SOPs</text>
      <text x="1110" y="465" fill="#1A3BCC" fontSize="12" fontWeight="700">Action: Data Lookup</text>

      <path d="M 800 490 L 800 540" stroke="#141F33" strokeWidth="2.5" />
      <circle cx="800" cy="540" r="6" fill="#1A3BCC" />

      <rect x="220" y="560" width="1160" height="130" rx="24" fill="#FFFFFF" stroke="#1A3BCC" strokeWidth="3" filter="url(#shadow-glow)" />
      <circle cx="240" cy="580" r="18" fill="#FFFFFF" stroke="#1A3BCC" strokeWidth="2.5" filter="url(#shadow-glow)"/>
      <text x="240" y="586" textAnchor="middle" fill="#1A3BCC" fontSize="16" fontWeight="800">5</text>
      <text x="275" y="586" fill="#141F33" fontSize="18" fontWeight="800">Instant Answer Given &amp; Dashboard Updated</text>
      <text x="245" y="620" fill="#141F33" fontSize="14" fontWeight="500">The AI provides the employee with a precise, verified answer with citations.</text>
      <text x="245" y="642" fill="#141F33" fontSize="14" fontWeight="500">The system also logs the question, answer, and employee ID in the live dashboard.</text>
      <text x="245" y="670" fill="#1A3BCC" fontSize="12" fontWeight="700">Outcome: Employee satisfied · Request logged · Audit trail updated</text>

      <rect x="70" y="780" width="1460" height="50" rx="40" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" strokeDasharray="6,6" />
      <text x="800" y="810" textAnchor="middle" fill="#141F33" fontSize="14" fontWeight="700" letterSpacing="1.5">SECURE INFRASTRUCTURE · ENCRYPTED DATA · ROLE-BASED ACCESS · AUDIT LOGS</text>
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
          <span className="text-[10px] font-semibold text-[#141F33]/60 hidden sm:inline">{svc.name}</span>
        </div>
      ))}
    </div>
  );
}

export default function SynthetiqWorkPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-12">
        
        {/* Hero wrapping div with 4px Deep Indigo border top */}
        <div className="border-t-4 border-[#1A3BCC] rounded-xl bg-white shadow-card p-8 lg:p-12 mb-16 border border-[#141F33]/10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3BCC]/10 text-[#1A3BCC] text-[10px] font-bold uppercase tracking-wider mb-6">
              ● Synthetiq Work HR Bot
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Your Internal AI Expert. Connected to SAP, Oracle, and your HR Docs.
            </h1>
            <p className="mt-6 text-sm md:text-base text-[#141F33]/70 font-semibold leading-relaxed">
              Synthetiq Work is a secure RAG chatbot that connects directly to your databases. Answer employee FAQs regarding vacation quotas, manager designations, and HR policies instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
              >
                View Plans & Pricing
              </Link>
              <Link
                href="/admin/integrations"
                className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
              >
                Connect Database &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Vacation & Leave Balance */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Instant Vacation & Leave Balance</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Directly connected to your HR database. Employees instantly ask 'How much vacation do I have left?' and get a real-time balance from the nightly sync.
                </p>
              </div>
            </div>

            {/* Card 2: Role & Designation Lookup */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7,16 c0,-3 10,-3 10,0" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Role & Designation Lookup</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Instantly identifies an employee's job title, department, and reporting manager based on the company database. No more manual org charts.
                </p>
              </div>
            </div>

            {/* Card 3: Work & Policy Q&A */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl shadow-card p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-accent/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-accent" strokeWidth="1.75">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Work & Policy Q&A</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Employees ask any internal policy or work-related question. The AI reads uploaded SOPs and company handbooks to give instant, citation-backed answers.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Employee Q&A Flow — SVG Diagram with Live MCP Status */}
        <section className="mb-16">
          <div className="bg-white border border-[#141F33]/10 rounded-xl shadow-card p-8 lg:p-10 overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-extrabold text-[#141F33]">Employee Q&A to Resolution Flow</h2>
              <div className="flex items-center gap-3">
                <MCPStatusDots />
              </div>
            </div>
            <div className="w-full overflow-auto">
              <WorkFlowSVG />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
