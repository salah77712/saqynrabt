'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface IndustryContent {
  headline: string;
  subheading: string;
  icon: string;
  tag: string;
  mockupTitle: string;
  mockupItems: Array<{ label: string; value: string; status?: string }>;
}

const INDUSTRIES: Record<'🏨 Hotel' | '🏥 Clinic' | '🔧 Workshop', IndustryContent> = {
  '🏨 Hotel': {
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
  '🏥 Clinic': {
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
  '🔧 Workshop': {
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
  const [activeIndustry, setActiveIndustry] = useState<'🏨 Hotel' | '🏥 Clinic' | '🔧 Workshop'>('🏨 Hotel');
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

  const currentContent = INDUSTRIES[activeIndustry];

  return (
    <div className="bg-[#ffffff] text-[#111111] min-h-screen relative flex flex-col font-sans pt-20">
      {/* A. The Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#1A365D] font-bold text-xl tracking-wider">
              SAQYN RABT
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-[#1A365D] transition-colors">Features</a>
            <a href="#pricing" className="hover:text-[#1A365D] transition-colors">Plans</a>
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

      {/* B. The Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
        
        {/* C. The Industry Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {(['🏨 Hotel', '🏥 Clinic', '🔧 Workshop'] as const).map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`min-h-[44px] px-6 py-3 rounded-full border-2 font-medium transition-all ${
                activeIndustry === industry 
                  ? 'border-[#1A365D] bg-[#1A365D] text-white' 
                  : 'border-gray-300 bg-white text-[#1A365D] hover:border-[#1A365D]'
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase mb-3">
          {currentContent.tag}
        </span>
        
        {/* H1 Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#1A365D] leading-tight max-w-3xl">
          {currentContent.headline}
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mt-4 leading-relaxed">
          {currentContent.subheading}
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

      {/* E. Front Desk Dispatch Queue Section */}
      <section id="features" className="max-w-3xl mx-auto px-6 py-12 w-full">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
            <h3 className="text-lg font-bold text-[#1A365D]">{currentContent.mockupTitle}</h3>
            <span className="px-3 py-1 text-xs bg-emerald-50 text-emerald-700 font-semibold rounded-full border border-emerald-200">
              Live Mockup
            </span>
          </div>

          <div className="flex flex-col">
            {currentContent.mockupItems.map((item, index) => (
              <div key={index} className="border-b border-gray-100 py-4 flex items-center justify-between last:border-b-0 hover:bg-gray-50/50 px-2 rounded-lg transition-colors">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{item.label}</span>
                  <span className="text-sm font-medium text-gray-800">{item.value}</span>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
                  item.status === 'Approved' || item.status === 'Completed' || item.status === 'Verified'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : item.status === 'In Progress' || item.status === 'Active'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Pricing Section */}
      <section id="pricing" className="border-t border-gray-100 bg-gray-50/40 py-24 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-4">Clear Qatar-Centric Pricing</h2>
            <p className="text-gray-600">
              No hidden fees. Select the plan configured to your organization scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            
            {/* Card 1: Starter */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#1A365D] transition-colors shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Starter</h3>
                <p className="text-xs text-gray-500 mt-1">For organizations with 1-50 employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-[#1A365D]">1,799 QAR</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                  
                  {/* Setup Fee (Rule 16: Separate bold line right beneath) */}
                  <div className="mt-2 text-sm text-[#10B981] font-bold">
                    + 3,999 QAR setup fee
                  </div>
                </div>
                <ul className="text-gray-600 text-sm space-y-3 border-t border-gray-100 pt-6">
                  <li className="flex items-center gap-2">✓ Up to 50 active employees</li>
                  <li className="flex items-center gap-2">✓ 5 uploaded training documents</li>
                  <li className="flex items-center gap-2">✓ 1,000 monthly inquiries</li>
                  <li className="flex items-center gap-2">✓ 1 department routing lock</li>
                </ul>
              </div>
              <button
                onClick={() => openPlanModal('Starter')}
                className="mt-8 w-full bg-gray-100 hover:bg-[#1A365D] hover:text-white text-[#1A365D] font-semibold rounded-full transition-all"
                style={{ minHeight: '44px' }}
              >
                Select Plan
              </button>
            </div>

            {/* Card 2: Growth */}
            <div className="bg-white border-2 border-[#1A365D] rounded-xl p-6 flex flex-col justify-between relative shadow-md hover:shadow-lg transition-all">
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#10B981] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Growth</h3>
                <p className="text-xs text-gray-500 mt-1">For organizations with 51-150 employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-[#1A365D]">3,499 QAR</span>
                  <span className="text-gray-500 text-sm">/mo</span>
                  
                  {/* Setup Fee (Rule 16: Separate bold line right beneath) */}
                  <div className="mt-2 text-sm text-[#10B981] font-bold">
                    + 5,999 QAR setup fee
                  </div>
                </div>
                <ul className="text-gray-600 text-sm space-y-3 border-t border-gray-100 pt-6">
                  <li className="flex items-center gap-2">✓ Up to 150 active employees</li>
                  <li className="flex items-center gap-2">✓ 15 uploaded training documents</li>
                  <li className="flex items-center gap-2">✓ 5,000 monthly inquiries</li>
                  <li className="flex items-center gap-2">✓ 5 department routing lock</li>
                </ul>
              </div>
              <button
                onClick={() => openPlanModal('Growth')}
                className="mt-8 w-full bg-[#1A365D] text-white font-bold rounded-full hover:opacity-95 transition-all"
                style={{ minHeight: '44px' }}
              >
                Select Plan
              </button>
            </div>

            {/* Card 3: Enterprise */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between hover:border-[#1A365D] transition-colors shadow-sm">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Enterprise</h3>
                <p className="text-xs text-gray-500 mt-1">For organizations with 151+ employees</p>
                <div className="my-6">
                  <span className="text-3xl font-bold text-[#1A365D]">Custom Pricing</span>
                  <div className="mt-2 text-sm text-gray-500 font-semibold">
                    Tailored setup fee configuration
                  </div>
                </div>
                <ul className="text-gray-600 text-sm space-y-3 border-t border-gray-100 pt-6">
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
                className="mt-8 w-full flex items-center justify-center bg-gray-100 hover:bg-[#1A365D] hover:text-white text-[#1A365D] font-semibold rounded-full transition-all"
                style={{ minHeight: '44px' }}
              >
                Contact Sales
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-xs text-gray-400 mt-auto">
        <p>&copy; {new Date().getFullYear()} SAQYN RABT. All rights reserved. Deployed via Vercel & Cloudflare.</p>
      </footer>

      {/* Center Sales-Led Modal (Rule 18) */}
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
