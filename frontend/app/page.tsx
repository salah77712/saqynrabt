'use client';

import { useState, useEffect } from 'react';

// ─── Industry Data ────────────────────────────────────────────────────────────
const industries = [
  { id: 'default', label: 'Every Business', headline: 'Empower Every Team Member. Automate Every Guest Request.', copy: 'The secure 24/7 AI front-desk and private staff knowledge hub for any industry. No missed calls. No repetitive questions.' },
  { id: 'healthcare', label: '🏥 Healthcare', headline: 'Empower Your Medical Staff. Automate Patient Intake.', copy: 'Reduce front-desk workload by automating patient bookings and triaging emergencies.' },
  { id: 'hospitality', label: '🏨 Hospitality', headline: 'Empower Your Hospitality Staff. Coordinate Guest Services.', copy: 'Never miss a booking inquiry. Handle late check-ins automatically.' },
  { id: 'homeservices', label: '🔧 Home Services', headline: 'Empower Your Service Crew. Capture Every Emergency Call.', copy: 'Capture urgent calls 24/7 and dispatch technicians to the job instantly.' },
  { id: 'realestate', label: '🏢 Real Estate', headline: 'Empower Your Management Team. Streamline Maintenance.', copy: 'Route urgent tenant maintenance requests straight to your on-site crew.' },
  { id: 'automotive', label: '🚗 Automotive', headline: 'Empower Your Mechanics. Automate Repair Quotes.', copy: 'Handle quote inquiries instantly so your mechanics can focus on fixing cars.' },
  { id: 'food', label: '🍽️ Food & Beverage', headline: 'Empower Your Front-of-House. Book Reservations 24/7.', copy: 'Automate table reservations and takeout orders during peak rush hours.' },
  { id: 'towing', label: '🚨 Towing & Roadside', headline: 'Empower Your Fleet Operators. Coordinate Emergency Roadside Rescue.', copy: 'Capture stranded drivers, get GPS data, and dispatch trucks rapidly.' },
  { id: 'veterinary', label: '🐈 Veterinary', headline: 'Empower Your Veterinary Staff. Triage Pet Emergencies.', copy: 'Triage emergency pet visits and route to the nurse instantly.' },
  { id: 'plumbing', label: '💧 Plumbing & HVAC', headline: 'Empower Your Field Plumbers. Streamline Repair Dispatches.', copy: 'Stop losing money from missed after-hours repair calls.' },
  { id: 'boutiquehotel', label: '🛎️ Boutique Hotels', headline: 'Empower Your Boutique Staff. Automate Guest Key Codes.', copy: 'Let guests auto-assign digital door codes at midnight.' },
  { id: 'catering', label: '🍷 Restaurants & Catering', headline: 'Empower Your Catering Crew. Standardize Large Event Bookings.', copy: 'Quote and book catering orders with no phone tag.' },
  { id: 'dealership', label: '🏁 Auto Dealerships', headline: 'Empower Your Sales Team. Automate Vehicle Inventory Inquiries.', copy: 'Answer real-time inventory questions about used cars.' },
  { id: 'construction', label: '🏗️ Construction & Contracting', headline: 'Empower Your Construction Crew. Streamline Site Work Permits.', copy: 'Keep subcontractors updated on material delivery times.' },
  { id: 'law', label: '⚖️ Law Firms', headline: 'Empower Your Case Associates. Streamline Client Intake Audits.', copy: 'Auto-answer retainer fee and intake form questions.' },
  { id: 'accounting', label: '📈 Accounting & Tax', headline: 'Empower Your Tax Advisors. Standardize Audit Management.', copy: 'Handle tax season refund status checks without a receptionist.' },
];

const GOLDMINE_INDUSTRIES = industries.filter(i =>
  ['healthcare', 'hospitality', 'homeservices', 'realestate', 'automotive', 'food'].includes(i.id)
);
const OTHER_INDUSTRIES = industries.filter(i =>
  ['towing', 'veterinary', 'plumbing', 'boutiquehotel', 'catering', 'dealership', 'construction', 'law', 'accounting'].includes(i.id)
);

// ─── Pricing Data ─────────────────────────────────────────────────────────────
const automationTiers = [
  { id: 'auto-starter', title: 'Starter', subtitle: 'For small front desks.', price: '1,499', setup: '1,999', popular: false, features: ['Basic call answering', '500 text requests/mo', '250 voice mins/mo', '1 department routing', 'Standard support'] },
  { id: 'auto-growth',  title: 'Growth',  subtitle: 'For growing operations.', price: '2,499', setup: '3,499', popular: true,  features: ['Advanced call answering', '2,000 text requests/mo', '700 voice mins/mo', '3 dept routing', 'Complaint routing', 'Weekly report'] },
  { id: 'auto-pro',    title: 'Professional', subtitle: 'For multi-department teams.', price: '4,499', setup: '5,999', popular: false, features: ['Advanced call answering', '5,000 text requests/mo', '1,500 voice mins/mo', '8 dept routing', 'Manager alerts', 'Priority support', '2 languages'] },
];

const chatbotTiers = [
  { id: 'chat-starter',     title: 'Starter',    subtitle: 'Up to 50 employees.',   price: '2,999',  setup: '4,999', popular: false, cta: 'Get Chatbot' },
  { id: 'chat-growth',      title: 'Growth',     subtitle: 'Up to 150 employees.',  price: '4,999',  setup: '6,999', popular: true,  cta: 'Get Chatbot' },
  { id: 'chat-enterprise',  title: 'Enterprise', subtitle: '151+ employees.',        price: 'Custom', setup: 'Custom', popular: false, cta: 'Contact Sales' },
];

const chatbotFeatures: Record<string, string[]> = {
  'chat-starter':    ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
  'chat-growth':     ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
  'chat-enterprise': ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
};

// ─── Showcase Cards ───────────────────────────────────────────────────────────
const showcaseCards = [
  {
    icon: '📞',
    title: 'Call & Booking Automation',
    desc: 'AI answers every call and inbound message 24/7. It captures bookings, routes complaints to the right department, and logs live transcripts on your dashboard — zero human effort required.',
    link: '/automation',
    linkLabel: 'Explore Automation →',
    accent: 'border-t-4 border-t-blue-600',
  },
  {
    icon: '💬',
    title: 'Internal RAG Chatbot',
    desc: 'Upload your HR handbook, SOPs, and policy docs. Employees get instant, accurate answers pulled directly from your documents — not generic AI guesses.',
    link: '/chatbot',
    linkLabel: 'Explore Chatbot →',
    accent: 'border-t-4 border-t-emerald-500',
  },
  {
    icon: '🔧',
    title: 'Customizable Workflows',
    desc: 'Multi-location businesses, enterprise CRM integrations, custom routing trees, and bespoke knowledge bases — our team builds exactly what you need.',
    link: '#custom',
    linkLabel: 'Request Custom Demo →',
    accent: 'border-t-4 border-t-violet-500',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function MarketingPage() {
  const [activeIndustry, setActiveIndustry] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');
  const [isCustomModal, setIsCustomModal] = useState(false);

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiBase}/api/wakeup`, { method: 'GET' })
      .then(res => res.json())
      .then(data => console.log('Database pre-warmed:', data))
      .catch(err => console.warn('Pre-warming ping bypassed:', err.message));
  }, []);

  const openPlanModal = (planName: string) => {
    setSelectedPlanName(planName);
    setIsCustomModal(false);
    setIsModalOpen(true);
  };

  const openCustomModal = () => {
    setSelectedPlanName('Custom Solution');
    setIsCustomModal(true);
    setIsModalOpen(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) setActiveIndustry(e.target.value);
  };

  const currentIndustry = industries.find(i => i.id === activeIndustry) || industries[0];

  return (
    <div className="bg-white text-[#111111] min-h-screen flex flex-col font-sans">

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <span className="text-[#1A365D] font-bold text-xl tracking-wider">SAQYN RABT</span>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="/automation" className="hover:text-[#1A365D] transition-colors">Automation</a>
            <a href="/chatbot" className="hover:text-[#1A365D] transition-colors">Chatbot</a>
            <a href="#showcase" className="hover:text-[#1A365D] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#1A365D] transition-colors">Pricing</a>
            <a href="/dashboard" className="hover:text-[#1A365D] transition-colors">Dashboard Demo</a>
          </nav>

          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#1A365D] text-white px-6 py-3 rounded-full min-h-[44px] font-medium hover:opacity-90 transition-all text-sm"
          >
            Book a 15-Min Demo
          </a>
        </div>
      </header>

      {/* ── Split Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">

          {/* Left — Automation */}
          <div className="bg-[#1A365D] text-white px-10 py-16 flex flex-col justify-center">
            <span className="text-5xl mb-4">📞</span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Automate Every Customer Interaction.
            </h1>
            <p className="text-blue-100 text-base leading-relaxed mb-8 max-w-sm">
              Never miss a call, booking, or complaint. Our AI handles your front-desk 24/7, routing requests to the right team automatically.
            </p>
            <a
              href="/automation"
              className="self-start bg-white text-[#1A365D] font-bold px-7 py-3 rounded-lg hover:bg-blue-50 transition-all"
            >
              Explore Automation →
            </a>
          </div>

          {/* Right — Chatbot */}
          <div className="bg-slate-50 text-[#1A365D] px-10 py-16 flex flex-col justify-center border-l border-gray-100">
            <span className="text-5xl mb-4">🧠</span>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
              Empower Your Team with Private AI Knowledge.
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-sm">
              A RAG-powered assistant trained on your HR, SOPs, and policies. Employees get instant answers, never generic chatbots.
            </p>
            <a
              href="/chatbot"
              className="self-start bg-[#1A365D] text-white font-bold px-7 py-3 rounded-lg hover:opacity-90 transition-all"
            >
              Explore Chatbot →
            </a>
          </div>
        </div>
      </section>

      {/* ── Industry Switcher ──────────────────────────────────────────────── */}
      <section className="bg-white border-t border-gray-100 py-14">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">
            Built for 15+ industries — select yours
          </p>

          {/* Goldmine Pills */}
          <div className="w-full overflow-x-auto flex flex-nowrap justify-start md:justify-center gap-3 py-1 [&::-webkit-scrollbar]:hidden">
            {GOLDMINE_INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`min-h-[40px] px-5 py-2 rounded-full border-2 font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeIndustry === industry.id
                    ? 'bg-[#1A365D] text-white border-[#1A365D]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#1A365D]'
                }`}
              >
                {industry.label}
              </button>
            ))}
          </div>

          {/* Other Industries Dropdown */}
          <div className="mt-4 w-full max-w-xs mx-auto">
            <select
              id="other-industries"
              value={OTHER_INDUSTRIES.some(i => i.id === activeIndustry) ? activeIndustry : ''}
              onChange={handleSelectChange}
              className="w-full min-h-[40px] bg-white border border-gray-200 rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1A365D] transition-all appearance-none cursor-pointer text-center text-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234B5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2.5rem',
              }}
            >
              <option value="">Other Industries…</option>
              {OTHER_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>{ind.label}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Headline */}
          <div className="mt-8 text-center">
            <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">{currentIndustry.label}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A365D] leading-tight mt-2 max-w-2xl mx-auto">
              {currentIndustry.headline}
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              {currentIndustry.copy}
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust & Custom Banner ──────────────────────────────────────────── */}
      <section id="custom" className="bg-gradient-to-r from-[#1A365D] to-blue-700 py-14 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Need a fully customized automation solution?
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto text-base leading-relaxed mb-8">
            We build tailored AI workflows for enterprises, multi-location businesses, and unique operational needs — from complex routing to specialized knowledge bases.
          </p>
          <button
            onClick={openCustomModal}
            className="bg-white text-[#1A365D] font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-all"
          >
            Request a Custom Demo
          </button>
        </div>
      </section>


      {/* ── No Surprise Bills Banner ───────────────────────────────────────── */}
      <div className="bg-emerald-50 border-y border-emerald-100 py-5 px-6 text-center">
        <p className="text-emerald-700 font-semibold text-sm">
          ✅ No surprise bills. Every plan has a fixed monthly price and a one-time setup fee. Overages only if you enable them.
        </p>
      </div>

      {/* ── Pricing ────────────────────────────────────────────────────────── */}
      <section id="pricing" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-3">Transparent Pricing for Every Business</h2>
            <p className="text-gray-500">Two products. Six tiers. No bundles. No confusion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* ── Automation Column ── */}
            <div>
              <div className="flex items-center gap-3 mb-7 pb-4 border-b-2 border-blue-600">
                <span className="text-2xl">📞</span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1A365D]">Business Automation</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Handle calls, bookings & complaints 24/7.</p>
                </div>
                <a href="/automation" className="ml-auto text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">Full details →</a>
              </div>
              <div className="flex flex-col gap-4">
                {automationTiers.map((tier) => (
                  <div key={tier.id} className="relative bg-white border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200">
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">⭐ Popular</span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-[#1A365D]">{tier.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div>
                          <span className="text-2xl font-extrabold text-[#1A365D]">{tier.price}</span>
                          <span className="text-gray-400 text-xs ml-1">QAR/mo</span>
                        </div>
                        <p className="text-green-600 text-xs font-medium mt-0.5">+ {tier.setup} QAR setup</p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-xs">
                          <span className="text-green-500 font-bold">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/automation"
                      className="mt-5 w-full bg-[#1A365D] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all text-sm text-center block"
                    >
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Chatbot Column ── */}
            <div>
              <div className="flex items-center gap-3 mb-7 pb-4 border-b-2 border-emerald-500">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-xl font-extrabold text-[#1A365D]">Internal Company Chatbot</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Private RAG assistant for employees, SOPs, and HR.</p>
                </div>
                <a href="/chatbot" className="ml-auto text-xs text-emerald-600 font-semibold hover:underline whitespace-nowrap">Full details →</a>
              </div>
              <div className="flex flex-col gap-4">
                {chatbotTiers.map((tier) => (
                  <div key={tier.id} className="relative bg-white border border-emerald-100 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200">
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">⭐ Popular</span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-lg font-bold text-[#1A365D]">{tier.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        {tier.price !== 'Custom' ? (
                          <div>
                            <span className="text-2xl font-extrabold text-[#1A365D]">{tier.price}</span>
                            <span className="text-gray-400 text-xs ml-1">QAR/mo</span>
                          </div>
                        ) : (
                          <span className="text-2xl font-extrabold text-[#1A365D]">Custom</span>
                        )}
                        <p className="text-green-600 text-xs font-medium mt-0.5">
                          {tier.setup !== 'Custom' ? `+ ${tier.setup} QAR setup` : 'Custom setup'}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {chatbotFeatures[tier.id]?.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-600 text-xs">
                          <span className="text-green-500 font-bold">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/chatbot"
                      className={`mt-5 w-full py-3 rounded-lg font-medium transition-all text-sm text-center block ${
                        tier.cta === 'Contact Sales'
                          ? 'bg-gray-100 text-[#1A365D] hover:bg-gray-200'
                          : 'bg-[#1A365D] text-white hover:opacity-90'
                      }`}
                    >
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 bg-white py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span className="text-[#1A365D] font-bold text-base tracking-wide">SAQYN RABT</span>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            <a href="/automation" className="hover:text-[#1A365D] transition-colors">Automation</a>
            <a href="/chatbot" className="hover:text-[#1A365D] transition-colors">Chatbot</a>
            <a href="#custom" className="hover:text-[#1A365D] transition-colors">Custom Solutions</a>
            <a href="/dashboard" className="hover:text-[#1A365D] transition-colors">Dashboard Demo</a>
            <a href="#" className="hover:text-[#1A365D] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1A365D] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1A365D] transition-colors">About</a>
          </nav>
          <span>&copy; {new Date().getFullYear()} SAQYN RABT. All rights reserved.</span>
        </div>
      </footer>

      {/* ── Book a Demo Modal ───────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold text-[#1A365D] mb-2">
              {isCustomModal ? 'Request a Custom Demo' : `Configure Plan — ${selectedPlanName}`}
            </h3>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              {isCustomModal
                ? 'Tell us about your business and we\'ll build a tailored proposal. A 15-minute call is all it takes to get started.'
                : 'Book a 15-minute setup call with our team to configure your custom workspace.'}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#1A365D] text-white font-bold rounded-full transition-colors"
                style={{ minHeight: '44px' }}
              >
                Book a Demo
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
                style={{ minHeight: '44px' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
