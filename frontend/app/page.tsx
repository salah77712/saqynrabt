'use client';

import { useState, useEffect } from 'react';

// Industry configurations for the state swapper (Rule 4)
interface IndustryContent {
  headline: string;
  subheading: string;
  icon: string;
  tag: string;
  mockupTitle: string;
  mockupItems: Array<{ label: string; value: string; status?: string }>;
}

const INDUSTRIES: Record<'hotel' | 'clinic' | 'workshop', IndustryContent> = {
  hotel: {
    tag: 'Hospitality & Luxury Hotels',
    icon: '🏨',
    headline: 'Empower Your Hospitality Staff. Coordinate Guest Services.',
    subheading: 'A secure guest queue manager and staff hub. Let your front-office, housekeeping, and concierge teams retrieve venue SOPs and manage service requests in seconds.',
    mockupTitle: 'Front Desk Dispatch Queue',
    mockupItems: [
      { label: 'Room 402', value: 'Late Check-out Request (2:00 PM)', status: 'Approved' },
      { label: 'Housekeeping', value: 'Extra linens requested for Suite 1005', status: 'In Progress' },
      { label: 'Concierge Service', value: 'Airport shuttle booking confirmation', status: 'Pending' }
    ]
  },
  clinic: {
    tag: 'Healthcare & Patient Clinics',
    icon: '🏥',
    headline: 'Optimize Clinical Workflows. Support Care Teams.',
    subheading: 'Connect clinical staff and administrative teams to patient intake rules, insurance policies, and consult queues. Maintain strict compliance with Qatar health standards.',
    mockupTitle: 'Patient Reception Queue',
    mockupItems: [
      { label: 'Ahmad Al-Thani', value: 'Consultation - Room 12 (Dr. Khan)', status: 'Active' },
      { label: 'Insurance Verify', value: 'QLM Approval Request #9921', status: 'Verified' },
      { label: 'Nurse Station 3', value: 'Vaccination records index update', status: 'Completed' }
    ]
  },
  workshop: {
    tag: 'Industrial & Service Workshops',
    icon: '🔧',
    headline: 'Accelerate Mechanics. Standardize Maintenance.',
    subheading: 'Align mechanics and service advisers. Instantly index manufacturer repair procedures, parts catalog lookups, and vehicle dispatch logs.',
    mockupTitle: 'Service Bay Diagnostics',
    mockupItems: [
      { label: 'Bay 3 - Land Cruiser', value: 'Transmission oil diagnostics', status: 'In Progress' },
      { label: 'Parts Inventory', value: 'Brake pads replacement SKU match', status: 'Ready' },
      { label: 'Adviser Log', value: 'Customer service card sign-off', status: 'Approved' }
    ]
  }
};

export default function MarketingPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<'hotel' | 'clinic' | 'workshop'>('hotel');
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

  const currentContent = INDUSTRIES[selectedIndustry];

  return (
    <div className="bg-dark-900 text-slate-100 min-h-screen relative overflow-hidden flex flex-col font-sans">
      {/* Background gradients for premium glassmorphism aesthetic */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-950/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="border-b border-dark-700 backdrop-blur-md sticky top-0 z-40 bg-dark-900/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-500 rounded flex items-center justify-center font-bold text-dark-900 text-lg">
              SR
            </div>
            <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              SAQYN RABT
            </span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-brand-400 transition-colors">Plans</a>
            <a href="/dashboard" className="hover:text-brand-400 transition-colors">Dashboard Demo</a>
          </nav>

          <a 
            href={calendlyUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center px-5 bg-brand-500 hover:bg-brand-600 text-dark-900 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] text-sm md:text-base cursor-pointer"
            style={{ minHeight: '44px' }}
          >
            Book a 15-Min Demo
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 flex-grow">
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Industry State Swapper Pills (Rule 4) */}
          <div className="flex bg-dark-800 p-1.5 rounded-full border border-dark-700 mb-8 self-start">
            {(['hotel', 'clinic', 'workshop'] as const).map((ind) => (
              <button
                key={ind}
                onClick={() => setSelectedIndustry(ind)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize flex items-center gap-2 ${
                  selectedIndustry === ind
                    ? 'bg-brand-500 text-dark-900 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={{ minHeight: '44px' }}
              >
                <span>{INDUSTRIES[ind].icon}</span>
                {ind}
              </button>
            ))}
          </div>

          <span className="text-xs font-bold tracking-widest text-brand-400 uppercase mb-3">
            {currentContent.tag}
          </span>
          
          {/* Headline (Rule 1: mobile 40px, desktop 56px) */}
          <h1 className="text-4xl lg:text-[56px] leading-[1.1] font-bold text-white mb-6">
            {currentContent.headline}
          </h1>

          <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed">
            {currentContent.subheading}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 bg-brand-500 hover:bg-brand-600 text-dark-900 font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:scale-[1.02]"
              style={{ minHeight: '44px' }}
            >
              Book a 15-Min Demo
            </a>
            <a
              href="/dashboard"
              className="flex items-center justify-center px-8 border border-dark-700 hover:border-slate-500 rounded-lg font-semibold transition-colors"
              style={{ minHeight: '44px' }}
            >
              Launch Demo Dashboard
            </a>
          </div>
        </div>

        {/* Dynamic Mockup Card Layout (No external image bloat - Rule 2) */}
        <div className="lg:col-span-5 w-full relative">
          <div className="absolute inset-0 bg-brand-500/10 rounded-2xl blur-3xl pointer-events-none" />
          <div className="bg-dark-800 border border-dark-700 rounded-2xl p-6 shadow-2xl relative">
            
            {/* Window bar */}
            <div className="flex items-center justify-between border-b border-dark-700 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-slate-500 font-medium font-mono">saqynrabt.com/dispatcher</span>
            </div>

            {/* Interactive Mock Content */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-300">{currentContent.mockupTitle}</h3>
                <span className="px-2 py-0.5 text-[10px] bg-brand-950 text-brand-400 font-mono font-bold rounded border border-brand-500/20">
                  Live Sync
                </span>
              </div>

              {currentContent.mockupItems.map((item, index) => (
                <div key={index} className="bg-dark-900/60 border border-dark-700 p-4 rounded-lg flex items-center justify-between hover:border-brand-500/30 transition-colors">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.label}</span>
                    <span className="text-sm font-medium text-slate-200">{item.value}</span>
                  </div>
                  <span className={`px-2.5 py-1 text-xs rounded-full font-semibold ${
                    item.status === 'Approved' || item.status === 'Completed' || item.status === 'Verified'
                      ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/20'
                      : item.status === 'In Progress' || item.status === 'Active'
                      ? 'bg-blue-950/80 text-blue-400 border border-blue-500/20'
                      : 'bg-amber-950/80 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}

              {/* Bottom empty state representation */}
              <div className="border border-dashed border-dark-700 p-3 rounded-lg text-center text-xs text-slate-500 mt-2">
                All clear. No pending requests.
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section (Rule 15 / 16 / 18) */}
      <section id="pricing" className="border-t border-dark-700 bg-dark-900/50 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Clear Qatar-Centric Pricing</h2>
            <p className="text-slate-400">
              No hidden fees. Select the plan configured to your organization scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1: Starter */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <h3 className="text-lg font-bold text-slate-300">Starter</h3>
                <p className="text-xs text-slate-500 mt-1">For organizations with 1-50 employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-white">1,799 QAR</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                  
                  {/* Setup Fee (Rule 16: Separate bold line right beneath) */}
                  <div className="mt-2 text-sm text-brand-400 font-bold">
                    + 3,999 QAR setup fee
                  </div>
                </div>
                <ul className="text-slate-400 text-sm space-y-3 border-t border-dark-700 pt-6">
                  <li className="flex items-center gap-2">✓ Up to 50 active employees</li>
                  <li className="flex items-center gap-2">✓ 5 uploaded training documents</li>
                  <li className="flex items-center gap-2">✓ 1,000 monthly inquiries</li>
                  <li className="flex items-center gap-2">✓ 1 department routing lock</li>
                </ul>
              </div>
              <button
                onClick={() => openPlanModal('Starter')}
                className="mt-8 w-full bg-dark-700 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Select Plan
              </button>
            </div>

            {/* Card 2: Growth */}
            <div className="bg-dark-800 border-2 border-brand-500/30 rounded-xl p-8 flex flex-col justify-between relative shadow-[0_4px_30px_rgba(34,197,94,0.05)] hover:border-brand-500 transition-colors">
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-brand-500 text-dark-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-100">Growth</h3>
                <p className="text-xs text-slate-500 mt-1">For organizations with 51-150 employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-white">3,499 QAR</span>
                  <span className="text-slate-500 text-sm">/mo</span>
                  
                  {/* Setup Fee (Rule 16: Separate bold line right beneath) */}
                  <div className="mt-2 text-sm text-brand-400 font-bold">
                    + 5,999 QAR setup fee
                  </div>
                </div>
                <ul className="text-slate-400 text-sm space-y-3 border-t border-dark-700 pt-6">
                  <li className="flex items-center gap-2">✓ Up to 150 active employees</li>
                  <li className="flex items-center gap-2">✓ 15 uploaded training documents</li>
                  <li className="flex items-center gap-2">✓ 5,000 monthly inquiries</li>
                  <li className="flex items-center gap-2">✓ 5 department routing lock</li>
                </ul>
              </div>
              <button
                onClick={() => openPlanModal('Growth')}
                className="mt-8 w-full bg-brand-500 hover:bg-brand-600 text-dark-900 font-bold rounded-lg transition-all"
                style={{ minHeight: '44px' }}
              >
                Select Plan
              </button>
            </div>

            {/* Card 3: Enterprise */}
            <div className="bg-dark-800 border border-dark-700 rounded-xl p-8 flex flex-col justify-between hover:border-slate-500 transition-colors">
              <div>
                <h3 className="text-lg font-bold text-slate-300">Enterprise</h3>
                <p className="text-xs text-slate-500 mt-1">For organizations with 151+ employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-white">Custom Pricing</span>
                  <div className="mt-2 text-sm text-slate-500 font-semibold">
                    Tailored setup fee configuration
                  </div>
                </div>
                <ul className="text-slate-400 text-sm space-y-3 border-t border-dark-700 pt-6">
                  <li className="flex items-center gap-2">✓ Unlimited employees</li>
                  <li className="flex items-center gap-2">✓ Custom documents quota</li>
                  <li className="flex items-center gap-2">✓ Unlimited queries & audits</li>
                  <li className="flex items-center gap-2">✓ Dedicated account manager</li>
                </ul>
              </div>
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full flex items-center justify-center bg-dark-700 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Contact Sales
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-900 py-8 relative z-10 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} SAQYN RABT. All rights reserved. Deployed via Vercel & Cloudflare.</p>
      </footer>

      {/* Center Sales-Led Modal (Rule 18) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-dark-900/80 backdrop-blur-sm">
          <div className="bg-dark-800 border border-dark-700 rounded-xl max-w-md w-full p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-2">Configure Plan - {selectedPlanName}</h3>
            
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Book a 15-minute setup call with our team to configure your knowledge base.
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-brand-500 hover:bg-brand-600 text-dark-900 font-bold rounded-lg transition-colors"
                style={{ minHeight: '44px' }}
              >
                Book a Demo
              </a>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-dark-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-colors"
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
