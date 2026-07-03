'use client';

import { useState, useEffect } from 'react';

const industries = [
  { 
    id: 'default', 
    label: 'Every Business', 
    headline: 'Empower Every Team Member. Automate Every Guest Request.', 
    copy: 'The secure 24/7 AI front-desk and private staff knowledge hub for any industry. No missed calls. No repetitive questions.' 
  },
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
  { id: 'accounting', label: '📈 Accounting & Tax', headline: 'Empower Your Tax Advisors. Standardize Audit Management.', copy: 'Handle tax season refund status checks without a receptionist.' }
];

const GOLDMINE_INDUSTRIES = industries.filter(i => ['healthcare', 'hospitality', 'homeservices', 'realestate', 'automotive', 'food'].includes(i.id));
const OTHER_INDUSTRIES = industries.filter(i => ['towing', 'veterinary', 'plumbing', 'boutiquehotel', 'catering', 'dealership', 'construction', 'law', 'accounting'].includes(i.id));

const automationTiers = [
  {
    id: 'auto-starter',
    title: 'Starter',
    subtitle: 'For small front desks.',
    price: '1,499',
    setup: '1,999',
    popular: false,
    features: ['Basic call answering', '500 text requests/mo', '250 voice mins/mo', '1 department routing', 'Standard support'],
    cta: 'Get Automation'
  },
  {
    id: 'auto-growth',
    title: 'Growth',
    subtitle: 'For growing operations.',
    price: '2,499',
    setup: '3,499',
    popular: true,
    features: ['Advanced call answering', '2,000 text requests/mo', '700 voice mins/mo', '3 dept routing', 'Complaint routing', 'Weekly report'],
    cta: 'Get Automation'
  },
  {
    id: 'auto-pro',
    title: 'Professional',
    subtitle: 'For multi-department teams.',
    price: '4,499',
    setup: '5,999',
    popular: false,
    features: ['Advanced call answering', '5,000 text requests/mo', '1,500 voice mins/mo', '8 dept routing', 'Manager alerts', 'Priority support', '2 languages'],
    cta: 'Get Automation'
  }
];

const chatbotTiers = [
  {
    id: 'chat-starter',
    title: 'Starter',
    subtitle: 'Up to 50 employees.',
    price: '2,999',
    setup: '4,999',
    popular: false,
    features: ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
    cta: 'Get Chatbot'
  },
  {
    id: 'chat-growth',
    title: 'Growth',
    subtitle: 'Up to 150 employees.',
    price: '4,999',
    setup: '6,999',
    popular: true,
    features: ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
    cta: 'Get Chatbot'
  },
  {
    id: 'chat-enterprise',
    title: 'Enterprise',
    subtitle: '151+ employees.',
    price: 'Custom',
    setup: 'Custom',
    popular: false,
    features: ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
    cta: 'Contact Sales'
  }
];

export default function MarketingPage() {
  const [activeIndustry, setActiveIndustry] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');

  // Get Calendly link from environment variable or fallback (Rule 5)
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  // NeonDB Pre-warming on Homepage (Rule 31)
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    fetch(`${apiBase}/api/wakeup`, { method: 'GET' })
      .then(res => res.json())
      .then(data => console.log('Database pre-warmed:', data))
      .catch(err => console.warn('Pre-warming ping bypassed:', err.message));
  }, []);

  const openPlanModal = (planName: string) => {
    setSelectedPlanName(planName);
    setIsModalOpen(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) {
      setActiveIndustry(e.target.value);
    }
  };

  const currentLabel = industries.find(i => i.id === activeIndustry)?.label || industries[0].label;

  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen relative flex flex-col font-sans pt-20">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#1A365D] font-bold text-xl tracking-wider">
              SAQYN RABT
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="/automation" className="hover:text-[#1A365D] transition-colors">Automation</a>
            <a href="/chatbot" className="hover:text-[#1A365D] transition-colors">Chatbot</a>
            <a href="#pricing" className="hover:text-[#1A365D] transition-colors">Pricing</a>
            <a href="/dashboard" className="hover:text-[#1A365D] transition-colors">Dashboard Demo</a>
          </nav>

          <a 
            href={calendlyUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-[#1A365D] text-white px-6 py-3 rounded-full min-h-[44px] font-medium hover:opacity-90 transition-all text-sm cursor-pointer"
          >
            Book a 15-Min Demo
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
        
        {/* Industry Switcher (Rule 4, 15 industries) */}
        <div className="w-full flex flex-col items-center mb-8">
          {/* Goldmine Pills horizontal scroll */}
          <div className="w-full max-w-3xl overflow-x-auto flex flex-nowrap justify-start md:justify-center gap-3 py-2 scrollbar-hide [&::-webkit-scrollbar]:hidden">
            {GOLDMINE_INDUSTRIES.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`min-h-[44px] px-6 py-3 rounded-full border-2 font-medium text-sm transition-all whitespace-nowrap cursor-pointer ${
                  activeIndustry === industry.id 
                    ? 'bg-[#1A365D] text-white border-[#1A365D]' 
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#1A365D]'
                }`}
              >
                {industry.label}
              </button>
            ))}
          </div>

          {/* Styled Other Industries Select Dropdown */}
          <div className="mt-4 w-full max-w-xs mx-auto relative">
            <label htmlFor="other-industries" className="sr-only">Other Industries</label>
            <select
              id="other-industries"
              value={OTHER_INDUSTRIES.some(i => i.id === activeIndustry) ? activeIndustry : ''}
              onChange={handleSelectChange}
              className="w-full min-h-[44px] bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1A365D] transition-all appearance-none cursor-pointer text-center"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234B5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Other Industries...</option>
              {OTHER_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase mb-3">
          {currentLabel}
        </span>
        
        {/* Dynamic H1 Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#1A365D] leading-tight max-w-3xl">
          {industries.find(i => i.id === activeIndustry)?.headline}
        </h1>

        {/* Dynamic Subtext Pain Point */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4 leading-relaxed">
          {industries.find(i => i.id === activeIndustry)?.copy}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-[#1A365D] text-white px-8 py-3.5 rounded-full min-h-[44px] font-medium hover:opacity-90 transition-all"
          >
            Book a 15-Min Demo
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center border-2 border-gray-300 hover:border-[#1A365D] text-[#1A365D] px-8 py-3.5 rounded-full min-h-[44px] font-medium transition-all"
          >
            Launch Demo Dashboard
          </a>
        </div>
      </section>

      {/* Front Desk Dispatch Queue Section */}
      <section id="features" className="max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <h3 className="text-lg font-bold text-[#1A365D]">Queue Dispatch Activity</h3>
            <span className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200">
              Live Mockup
            </span>
          </div>

          <div className="flex flex-col">
            <div className="border-b border-gray-100 py-4 flex items-center justify-between hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Dispatched Task</span>
                <span className="text-sm font-medium text-gray-800">Late Check-out Request (2:00 PM)</span>
              </div>
              <span className="px-3 py-1 text-xs rounded-full font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Approved
              </span>
            </div>
            <div className="border-b border-gray-100 py-4 flex items-center justify-between hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Operation Station</span>
                <span className="text-sm font-medium text-gray-800">Extra linens requested for Suite 1005</span>
              </div>
              <span className="px-3 py-1 text-xs rounded-full font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                In Progress
              </span>
            </div>
            <div className="py-4 flex items-center justify-between hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Concierge Portal</span>
                <span className="text-sm font-medium text-gray-800">Airport shuttle booking confirmation</span>
              </div>
              <span className="px-3 py-1 text-xs rounded-full font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Pending
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="border-t border-gray-100 bg-white py-24 w-full">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-[#1A365D] mb-4">Transparent Pricing for Every Business</h2>
            <p className="text-gray-500 text-lg">Two distinct products. No bundles. No confusion. Pick exactly what your operation needs.</p>
          </div>

          {/* 2-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* === COLUMN 1: Business Automation === */}
            <div className="bg-slate-50 rounded-xl p-6">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">📞</span>
                  <h3 className="text-2xl font-extrabold text-[#1A365D]">Automation</h3>
                </div>
                <p className="text-sm text-gray-500">Handle customer calls, bookings &amp; complaints 24/7.</p>
              </div>

              <div className="flex flex-col gap-4">
                {automationTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Popular Badge */}
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        ⭐ Popular
                      </span>
                    )}

                    <h4 className="text-xl font-bold text-[#1A365D]">{tier.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{tier.subtitle}</p>

                    <div className="mt-2">
                      {tier.price !== 'Custom' ? (
                        <>
                          <span className="text-4xl font-extrabold text-[#1A365D]">{tier.price}</span>
                          <span className="text-gray-400 text-sm ml-1">QAR / mo</span>
                        </>
                      ) : (
                        <span className="text-4xl font-extrabold text-[#1A365D]">Custom</span>
                      )}
                      <p className="text-green-600 font-medium text-sm mt-1">+ {tier.setup} QAR setup fee</p>
                    </div>

                    <ul className="mt-4 flex flex-col gap-2">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                          <span className="text-green-500 font-bold text-base leading-none">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <a
                      href="/automation"
                      className="mt-6 w-full bg-[#1A365D] text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all text-center block"
                    >
                      Learn More →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* === COLUMN 2: Internal Company Chatbot === */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-2xl font-extrabold text-[#1A365D]">Company Chatbot</h3>
                </div>
                <p className="text-sm text-gray-500">Private RAG assistant for your employees, SOPs, and HR.</p>
              </div>

              <div className="flex flex-col gap-4">
                {chatbotTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {/* Popular Badge */}
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        ⭐ Popular
                      </span>
                    )}

                    <h4 className="text-xl font-bold text-[#1A365D]">{tier.title}</h4>
                    <p className="text-xs text-gray-400 mt-0.5">{tier.subtitle}</p>

                    <div className="mt-2">
                      {tier.price !== 'Custom' ? (
                        <>
                          <span className="text-4xl font-extrabold text-[#1A365D]">{tier.price}</span>
                          <span className="text-gray-400 text-sm ml-1">QAR / mo</span>
                        </>
                      ) : (
                        <span className="text-4xl font-extrabold text-[#1A365D]">Custom</span>
                      )}
                      <p className="text-green-600 font-medium text-sm mt-1">
                        {tier.setup !== 'Custom' ? `+ ${tier.setup} QAR setup fee` : 'Custom setup fee'}
                      </p>
                    </div>

                    <ul className="mt-4 flex flex-col gap-2">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                          <span className="text-green-500 font-bold text-base leading-none">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Enterprise gets a lighter CTA */}
                    <a
                      href="/chatbot"
                      className={`mt-6 w-full py-3 rounded-lg font-medium transition-all text-center block ${
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

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400 mt-auto">
        <p>&copy; {new Date().getFullYear()} SAQYN RABT. All rights reserved.</p>
      </footer>

      {/* Center Sales-Led Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-xl max-w-md w-full p-6 shadow-xl relative">
            <h3 className="text-lg font-bold text-[#1A365D] mb-2">Configure Plan - {selectedPlanName}</h3>
            
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your custom workspace.
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
