'use client';

import { useState, useEffect } from 'react';

interface IndustryContent {
  headline: string;
  subheading: string;
  icon: string;
  tag: string;
  mockupTitle: string;
  mockupItems: Array<{ label: string; value: string; status?: string }>;
}

const INDUSTRIES: Record<string, IndustryContent> = {
  '🏥 Healthcare': {
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
  '🏨 Hospitality': {
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
  '🔧 Home Services': {
    tag: 'Residential & Commercial Home Services',
    icon: '🔧',
    headline: 'Streamline Home Maintenance. Coordinate Service Teams.',
    subheading: 'Empower field technicians, plumbers, and electricians with instant access to client history, service checklists, and dispatch tickets on site.',
    mockupTitle: 'Service Dispatch Log',
    mockupItems: [
      { label: 'Job #1024', value: 'AC Compressor Replacement - West Bay', status: 'Approved' },
      { label: 'Technician B', value: 'En-route to villa electrical inspection', status: 'In Progress' },
      { label: 'Client Approvals', value: 'Estimate signed for water pump repair', status: 'Completed' }
    ]
  },
  '🏢 Real Estate': {
    tag: 'Property Management & Real Estate Brokerage',
    icon: '🏢',
    headline: 'Unify Property Management. Coordinate Leasing & Sales.',
    subheading: 'Keep agents, tenants, and maintenance crews in sync. Instantly index property manuals, lease contracts, and repair request queues.',
    mockupTitle: 'Property Services Hub',
    mockupItems: [
      { label: 'Tower A - 1204', value: 'Balcony door lock maintenance request', status: 'In Progress' },
      { label: 'Prospect Tenant', value: 'Viewing schedule - Pearl Apartment', status: 'Pending' },
      { label: 'Lease Renewal', value: 'Tenant lease signed - Lusail commercial', status: 'Approved' }
    ]
  },
  '🚗 Automotive': {
    tag: 'Industrial & Auto Repair Services',
    icon: '🚗',
    headline: 'Accelerate Automotive Services. Standardize Repair SOPs.',
    subheading: 'Connect service advisers and technicians to manufacturer repair procedures, parts availability records, and bay schedule queues.',
    mockupTitle: 'Service Bay Diagnostics',
    mockupItems: [
      { label: 'Bay 3 - Land Cruiser', value: 'Transmission oil diagnostics', status: 'In Progress' },
      { label: 'Parts Inventory', value: 'Brake pads replacement SKU match', status: 'Ready' },
      { label: 'Adviser Log', value: 'Customer service card sign-off', status: 'Approved' }
    ]
  },
  '🍽️ Food & Beverage': {
    tag: 'Restaurants, Kitchens & Catering Operations',
    icon: '🍽️',
    headline: 'Streamline Restaurant Operations. Coordinate Kitchen Staff.',
    subheading: 'Align front-of-house staff, kitchen teams, and delivery couriers. Safely manage food safety regulations, ingredient checklists, and service pipelines.',
    mockupTitle: 'Kitchen Display Queue',
    mockupItems: [
      { label: 'Table 4', value: 'Steak medium rare & seafood platter prep', status: 'In Progress' },
      { label: 'Catering Event', value: 'VIP buffet setup - West Bay 8:00 PM', status: 'Pending' },
      { label: 'Inventory Audit', value: 'Fresh seafood delivery log approved', status: 'Completed' }
    ]
  },
  'Towing & Roadside': {
    tag: 'Emergency Towing & Roadside Assistance',
    icon: '🚨',
    headline: 'Optimize Towing Operations. Dispatch Fleet Rapidly.',
    subheading: 'Ensure roadside dispatchers and drivers are aligned. Track emergency rescue logs, route allocations, and tow truck availability in real time.',
    mockupTitle: 'Emergency Dispatch Queue',
    mockupItems: [
      { label: 'Driver 3', value: 'Lusail Expressway flat tire rescue', status: 'Active' },
      { label: 'Flatbed Tow', value: 'Accident recovery vehicle transport', status: 'Pending' },
      { label: 'Billing Queue', value: 'Insurance tow payout verification', status: 'Approved' }
    ]
  },
  'Veterinary': {
    tag: 'Veterinary Clinics & Animal Hospitals',
    icon: '🐈',
    headline: 'Coordinate Vet Operations. Enhance Animal Care.',
    subheading: 'Help veterinary staff log patient entries, medical logs, vaccination records, and consult pipelines safely.',
    mockupTitle: 'Pet Patient Reception',
    mockupItems: [
      { label: 'Bella (Cat)', value: 'Annual booster & check-up - Room 2', status: 'Active' },
      { label: 'Diagnostics', value: 'Blood panel results index match', status: 'Ready' },
      { label: 'Prescription', value: 'Refill approval for chronic care meds', status: 'Completed' }
    ]
  },
  'Plumbing & HVAC': {
    tag: 'Plumbing & HVAC Contracting Services',
    icon: '💧',
    headline: 'Standardize HVAC & Plumbing Services. Track Dispatch.',
    subheading: 'Connect technicians in the field with system layout sheets, parts numbers, and pipe maintenance procedures.',
    mockupTitle: 'Technician Job Queue',
    mockupItems: [
      { label: 'HVAC Unit 4', value: 'Lusail Residence cooling system service', status: 'In Progress' },
      { label: 'Leak Repair', value: 'Main line valve check - Al Waab', status: 'Approved' },
      { label: 'Parts Order', value: 'AC filter replacements dispatch', status: 'Pending' }
    ]
  },
  'Boutique Hotels': {
    tag: 'Premium Boutique Hotels & Resorts',
    icon: '🛎️',
    headline: 'Personalize Guest Services. Align Boutique Staff.',
    subheading: 'Manage personalized guest profiles, housekeeping request cards, and custom excursions with micro-second responsiveness.',
    mockupTitle: 'VIP Concierge Queue',
    mockupItems: [
      { label: 'Villa 12', value: 'Private beach dinner setup requested', status: 'Approved' },
      { label: 'Suite 203', value: 'Pillow menu choice delivery', status: 'In Progress' },
      { label: 'Guest Request', value: 'Late check-out request approved', status: 'Completed' }
    ]
  },
  'Restaurants & Catering': {
    tag: 'Fine Dining & Event Catering Services',
    icon: '🍷',
    headline: 'Coordinate Event Catering. Manage Kitchen Logistics.',
    subheading: 'Simplify scale-up banquet prep, staffing list validation, and allergen documentation logs for event hosts and catering crews.',
    mockupTitle: 'Banqueting Coordinator',
    mockupItems: [
      { label: 'Banquet Hall 2', value: 'Wedding dinner dessert course dispatch', status: 'Active' },
      { label: 'Supplier Log', value: 'Cold chain temperature log validation', status: 'Verified' },
      { label: 'Menu Selection', value: 'Allergen-free meal card assignment', status: 'Completed' }
    ]
  },
  'Auto Dealerships': {
    tag: 'Automotive Dealerships & Showrooms',
    icon: '🏁',
    headline: 'Optimize Showroom Operations. Align Sales & Service.',
    subheading: 'Connect showroom sales staff, test-drive booking queues, and vehicle prep teams to streamline inventory turnaround times.',
    mockupTitle: 'Showroom Deal Pipeline',
    mockupItems: [
      { label: 'Customer Lead', value: 'Lusail VIP Test Drive - Patrol V8', status: 'Active' },
      { label: 'Vehicle Prep', value: 'PDI check-off for Lusail delivery', status: 'In Progress' },
      { label: 'Finance Review', value: 'Commercial bank lease package sign-off', status: 'Approved' }
    ]
  },
  'Construction & Contracting': {
    tag: 'Construction & Civil Engineering Projects',
    icon: '🏗️',
    headline: 'Unify Site Operations. Manage Contractor SOPs.',
    subheading: 'Align site managers, contractors, and safety engineers. Track PPE checklists, concrete testing logs, and work permits.',
    mockupTitle: 'Site Work Permit Queue',
    mockupItems: [
      { label: 'Lusail Site', value: 'Piling work permit approval', status: 'Approved' },
      { label: 'Safety Officer', value: 'Tower Crane 3 daily log inspection', status: 'In Progress' },
      { label: 'Material Log', value: 'Steel reinforcement delivery checklist', status: 'Completed' }
    ]
  },
  'Law Firms': {
    tag: 'Legal & Advocacy Practices',
    icon: '⚖️',
    headline: 'Unify Case Files. Streamline Client Document Audits.',
    subheading: 'Connect associates, paralegals, and administrative teams to case timelines, corporate filings, and client billing files.',
    mockupTitle: 'Case Document Queue',
    mockupItems: [
      { label: 'Case #2026-X', value: 'Commercial contract review dispatch', status: 'Active' },
      { label: 'Court Filing', value: 'Lusail Court submission verification', status: 'Verified' },
      { label: 'Billing Audit', value: 'Retainer log card approval', status: 'Completed' }
    ]
  },
  'Accounting & Tax': {
    tag: 'Accounting, Tax Advisory & Audit Practices',
    icon: '📈',
    headline: 'Standardize Audit Procedures. Manage Client Tax Queues.',
    subheading: 'Align audit teams and tax planners. Easily index regulatory compliance codes, client asset records, and tax return filing dates.',
    mockupTitle: 'Tax Audit Pipeline',
    mockupItems: [
      { label: 'Client A', value: 'Q1 corporate tax filing preparation', status: 'In Progress' },
      { label: 'Audit Log', value: 'Asset ledger validation completed', status: 'Ready' },
      { label: 'VAT Return', value: 'VAT filing submission verification', status: 'Approved' }
    ]
  }
};

const GOLDMINE_INDUSTRIES = [
  '🏥 Healthcare',
  '🏨 Hospitality',
  '🔧 Home Services',
  '🏢 Real Estate',
  '🚗 Automotive',
  '🍽️ Food & Beverage'
];

const OTHER_INDUSTRIES = [
  'Towing & Roadside',
  'Veterinary',
  'Plumbing & HVAC',
  'Boutique Hotels',
  'Restaurants & Catering',
  'Auto Dealerships',
  'Construction & Contracting',
  'Law Firms',
  'Accounting & Tax'
];

export default function MarketingPage() {
  const [activeIndustry, setActiveIndustry] = useState<string>('🏥 Healthcare');
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

  const currentContent = INDUSTRIES[activeIndustry] || INDUSTRIES['🏥 Healthcare'];

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

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-32 text-center flex flex-col items-center">
        
        {/* Industry Switcher (Rule 4, 15 industries) */}
        <div className="w-full flex flex-col items-center mb-8">
          {/* Goldmine Pills horizontal scroll */}
          <div className="w-full max-w-3xl overflow-x-auto flex flex-nowrap justify-start md:justify-center gap-3 py-2 scrollbar-none">
            {GOLDMINE_INDUSTRIES.map((industry) => (
              <button
                key={industry}
                onClick={() => setActiveIndustry(industry)}
                className={`min-h-[44px] px-5 py-2.5 rounded-full border-2 font-medium transition-all text-sm whitespace-nowrap cursor-pointer ${
                  activeIndustry === industry 
                    ? 'border-[#1A365D] bg-[#1A365D] text-white' 
                    : 'border-gray-300 bg-white text-[#1A365D] hover:border-[#1A365D]'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>

          {/* Styled Other Industries Select Dropdown */}
          <div className="mt-4 w-full max-w-xs mx-auto relative">
            <label htmlFor="other-industries" className="sr-only">Other Industries</label>
            <select
              id="other-industries"
              value={OTHER_INDUSTRIES.includes(activeIndustry) ? activeIndustry : ''}
              onChange={handleSelectChange}
              className="w-full bg-white border border-gray-300 rounded-full px-6 py-3 text-sm text-[#1A365D] font-medium outline-none focus:border-[#1A365D] min-h-[44px] transition-all appearance-none cursor-pointer text-center"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%231A365D' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 1.25rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Other Industries...</option>
              {OTHER_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        <span className="text-xs font-bold tracking-widest text-[#10B981] uppercase mb-3">
          {currentContent.tag}
        </span>
        
        {/* H1 Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#1A365D] leading-tight max-w-3xl">
          {currentContent.headline}
        </h1>

        {/* Dynamic Subtext Pain Point */}
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

      {/* Front Desk Dispatch Queue Section */}
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
                  item.status === 'Approved' || item.status === 'Completed' || item.status === 'Verified' || item.status === 'Ready'
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

      {/* Pricing Section */}
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
                  
                  {/* Setup Fee */}
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
                  
                  {/* Setup Fee */}
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
