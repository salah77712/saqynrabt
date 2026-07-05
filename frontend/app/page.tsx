'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLocale } from './providers';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import Link from 'next/link';

// Industry Data
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

// Pricing Data
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

export default function MarketingPage() {
  const [activeIndustry, setActiveIndustry] = useState('default');
  const [activeProduct, setActiveProduct] = useState<'automation' | 'chatbot'>('automation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanName, setSelectedPlanName] = useState('');
  const [isCustomModal, setIsCustomModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale } = useLocale();

  const t = (obj: { en: string; ar: string }) => locale === 'ar' ? obj.ar : obj.en;

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Chatbot-specific headlines/copies per industry (for toggle state)
  const chatbotIndustryHeadlines: Record<string, { en: string; ar: string }> = {
    default: {
      en: 'Empower Every Team Member with Private AI Knowledge.',
      ar: 'مكّن كل عضو في الفريق بمعرفة الذكاء الاصطناعي الخاصة.'
    },
    healthcare: {
      en: 'Empower Your Medical Staff. Access SOPs Instantly.',
      ar: 'مكّن طاقمك الطبي. احصل على إجراءات التشغيل فورًا.'
    },
    hospitality: {
      en: 'Empower Your Hospitality Staff. Standardize Hotel SOPs.',
      ar: 'مكّن موظفي الضيافة. وحد إجراءات تشغيل الفندق.'
    },
    homeservices: {
      en: 'Empower Your Service Crew. Access Safety Manuals 24/7.',
      ar: 'مكّن طاقم الخدمة. احصل على أدلة السلامة على مدار الساعة.'
    },
    realestate: {
      en: 'Empower Your Management Team. Access Property SOPs.',
      ar: 'مكّن فريق الإدارة. احصل على إجراءات تشغيل العقار.'
    },
    automotive: {
      en: 'Empower Your Mechanics. Access Diagnostic Standards.',
      ar: 'مكّن الفنيين لديك. احصل على معايير التشخيص.'
    },
    food: {
      en: 'Empower Your Kitchen & Staff. Standardize Hygiene Manuals.',
      ar: 'مكّن مطبخك وموظفيك. وحد أدلة النظافة.'
    }
  };

  const chatbotIndustryCopies: Record<string, { en: string; ar: string }> = {
    default: {
      en: 'A private RAG assistant trained on your HR, SOPs, and policies. Employees get fast, verified answers without generic AI drift.',
      ar: 'مساعد RAG خاص مدرب على الموارد البشرية وإجراءات التشغيل والسياسات. يحصل الموظفون على إجابات سريعة وموثوقة.'
    },
    healthcare: {
      en: 'Upload clinical SOPs, treatment protocols, and clinic guidelines. Nurses and staff get verified, non-generic answers instantly.',
      ar: 'قم بتحميل إجراءات التشغيل السريرية وبروتوكولات العلاج. يحصل طاقم التمريض على إجابات موثوقة على الفور.'
    },
    hospitality: {
      en: 'Train your private assistant on check-in policies, room configurations, and guest handle rules to onboard front desk staff faster.',
      ar: 'درب مساعدك الخاص على سياسات الدخول وتجهيز الغرف لتدريب موظفي الاستقبال بشكل أسرع.'
    },
    homeservices: {
      en: 'Make safety protocols, appliance manuals, and pricing calculators available to field technicians instantly on their phones.',
      ar: 'اجعل بروتوعولات السلامة وأدلة الأجهزة الحاسبة متاحة للفنيين في الميدان على هواتفهم فورًا.'
    },
    realestate: {
      en: 'Index building handbooks, vendor directories, and lease templates for on-site property managers and leasing coordinators.',
      ar: 'فهرس كتيبات المباني ودليل الموردين ونماذج الإيجار لمديري العقارات وموظفي التأجير.'
    },
    automotive: {
      en: 'Give mechanics instant access to manufacturer schematics, diagnostic procedures, and shop safety policies.',
      ar: 'امنح الفنيين وصولاً فوريًا إلى مخططات المصنّع وإجراءات التشخيص وسياسات السلامة.'
    },
    food: {
      en: 'Train floor staff on kitchen guidelines, food allergies policy, and dining room standards to ensure top hospitality.',
      ar: 'درب موظفي الخدمة على إرشادات المطبخ وسياسة الحساسية الغذائية لضمان أفضل خدمة.'
    }
  };

  const chatbotHeadline = chatbotIndustryHeadlines[activeIndustry] || chatbotIndustryHeadlines.default;
  const chatbotCopy = chatbotIndustryCopies[activeIndustry] || chatbotIndustryCopies.default;

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      <Header />

      {/* ── Hero Section (Section 3 & 4) ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28 bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column (The Pitch) */}
          <div className="flex flex-col items-start gap-6 lg:w-full">
            
            {/* Two-Product Toggle (Section 4) */}
            <div className="inline-flex rounded-full bg-white p-1 border border-gray-200/80 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveProduct('automation')}
                className={`min-h-[38px] rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
                  activeProduct === 'automation'
                    ? 'bg-[#141F33] text-white shadow-sm'
                    : 'bg-transparent text-[#718096] hover:text-[#141F33]'
                }`}
              >
                🤖 {t({ en: 'Automation', ar: 'الأتمتة' })}
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('chatbot')}
                className={`min-h-[38px] rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
                  activeProduct === 'chatbot'
                    ? 'bg-[#141F33] text-white shadow-sm'
                    : 'bg-transparent text-[#718096] hover:text-[#141F33]'
                }`}
              >
                🧠 {t({ en: 'Chatbot', ar: 'المساعد الذكي' })}
              </button>
            </div>

            {/* Dynamic H1 Headline */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#141F33] tracking-tight transition-all duration-300">
              {activeProduct === 'automation' ? currentIndustry.headline : t(chatbotHeadline)}
            </h1>

            {/* Subtext */}
            <p className="text-lg lg:text-xl text-[#718096] max-w-xl font-medium leading-relaxed transition-all duration-300">
              {activeProduct === 'automation' ? currentIndustry.copy : t(chatbotCopy)}
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-4 mt-2">
              <Link
                href={activeProduct === 'automation' ? '/automation' : '/chatbot'}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#141F33] px-8 py-4 font-bold text-white shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95"
              >
                {t({ en: 'Explore Product', ar: 'استكشف المنتج' })}
              </Link>
              <button
                type="button"
                onClick={openCustomModal}
                className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-white border border-[#141F33] px-8 py-4 font-bold text-[#141F33] transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-95"
              >
                {t({ en: 'Book a Demo', ar: 'احجز عرضًا' })}
              </button>
            </div>
          </div>



        </div>
      </section>

      {/* ── Industry Switcher & Social Proof (Section 5) ──────────────────── */}
      <section id="industries" className="bg-white border-y border-gray-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
          
          <p className="text-xs font-extrabold tracking-widest text-[#718096] uppercase mb-8 text-center">
            {t({ en: 'Engineered for Qatar & Middle East Operations — Select Your Industry', ar: 'مصمم خصيصًا للعمليات في قطر والشرق الأوسط - اختر قطاعك' })}
          </p>

          {/* 6 Top Industry Pills */}
          <div className="w-full flex flex-wrap justify-center gap-4 py-2">
            {GOLDMINE_INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind.id)}
                className={`min-h-[44px] px-6 py-3 rounded-full border text-sm font-semibold transition-all hover:scale-[1.05] hover:border-[#141F33] cursor-pointer ${
                  activeIndustry === ind.id
                    ? 'bg-[#141F33] text-white border-[#141F33] shadow-md'
                    : 'bg-white text-[#141F33] border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>

          {/* Other Industries Dropdown */}
          <div className="mt-6 w-full max-w-xs mx-auto">
            <select
              id="other-industries"
              value={OTHER_INDUSTRIES.some(i => i.id === activeIndustry) ? activeIndustry : ''}
              onChange={handleSelectChange}
              className="w-full min-h-[44px] bg-white border border-gray-200 rounded-xl px-4 py-2 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#141F33] transition-all appearance-none cursor-pointer text-center text-sm shadow-sm font-semibold"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234B5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: locale === 'ar' ? 'left 1rem center' : 'right 1rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
                paddingLeft: locale === 'ar' ? '2.5rem' : '1rem',
                paddingRight: locale === 'ar' ? '1rem' : '2.5rem',
              }}
            >
              <option value="">{t({ en: 'Other Industries…', ar: 'صناعات أخرى…' })}</option>
              {OTHER_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>{ind.label}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Headline Panel */}
          <div className="mt-12 text-center bg-[#F8F9FB] p-8 rounded-2xl border border-gray-100 max-w-3xl w-full">
            <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{currentIndustry.label}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#141F33] leading-tight mt-3">
              {currentIndustry.headline}
            </h2>
            <p className="text-[#718096] mt-4 text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {currentIndustry.copy}
            </p>
          </div>

          {/* Social Proof (Trust Boost) */}
          <div className="mt-16 pt-12 border-t border-gray-100 w-full flex flex-col items-center gap-6">
            <p className="text-xs font-extrabold tracking-widest text-[#718096] uppercase text-center">
              {t({ en: 'Trusted by front desks and teams in Qatar and across the Middle East', ar: 'موثوق به من قبل مكاتب الاستقبال والفرق في قطر وأنحاء الشرق الأوسط' })}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              
              {/* Hotel Icon SVG */}
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Hospitality Sector">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Hotels</span>
              </div>

              {/* Clinic/Medical SVG */}
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Healthcare Sector">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Clinics</span>
              </div>

              {/* Factory/Industry SVG */}
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Industrial Operations">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 7l5 4V7l5 4V7l6 5v9H3V7z" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Operations</span>
              </div>

              {/* Retail/Shop SVG */}
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Retail Outlets">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Retail</span>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Pricing Section (Section 6) ─────────────────────────────────── */}
      <section id="pricing" className="py-24 lg:py-32 bg-[#F8F9FB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] mb-4">
              {t({ en: 'Transparent pricing. No hidden costs.', ar: 'أسعار شفافة. بدون تكاليف خفية.' })}
            </h2>
            <p className="text-base lg:text-lg text-[#10B981] font-semibold tracking-wide uppercase">
              {t({ en: 'Auto-overage is OFF by default. You control your budget.', ar: 'خيار تجاوز الحد التلقائي مغلق افتراضيًا. أنت من يتحكم بميزانيتك.' })}
            </p>
          </div>

          {/* Pricing Layout (Two Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            
            {/* Left Column: Business Automation */}
            <div className="flex flex-col gap-8">
              
              <div className="border-b-2 border-[#2A5CFF]/30 pb-4 mb-2">
                <h3 className="text-lg font-extrabold text-[#141F33] tracking-wider uppercase flex items-center gap-3">
                  <span>🤖</span> {t({ en: 'BUSINESS AUTOMATION', ar: 'أتمتة الأعمال' })}
                </h3>
                <p className="text-xs text-[#718096] font-medium mt-1">
                  {t({ en: 'Handle incoming calls, bookings & guest complaints 24/7.', ar: 'إدارة المكالمات الواردة، الحجوزات وشكاوى النزلاء على مدار الساعة.' })}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {automationTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="relative bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-[#141F33] transition-all duration-300"
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold tracking-widest px-4 py-1 rounded-full uppercase">
                        {t({ en: 'POPULAR', ar: 'شائع' })}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-extrabold text-[#141F33]">{tier.title}</h4>
                        <p className="text-xs text-[#718096] font-medium mt-1">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div>
                          <span className="text-3xl font-extrabold text-[#141F33]">{tier.price}</span>
                          <span className="text-xs font-bold text-[#718096] ml-1">QAR/mo</span>
                        </div>
                        <p className="text-[#10B981] font-semibold text-xs mt-1">
                          + {tier.setup} QAR {t({ en: 'setup fee', ar: 'رسوم تأسيس' })}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-gray-100 pt-6">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                          <span className="text-[#10B981] font-bold">✓</span> {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => openPlanModal(`Automation - ${tier.title}`)}
                      className="mt-8 w-full bg-[#141F33] text-white py-4 rounded-xl font-bold text-sm hover:bg-opacity-95 transition-all duration-300 min-h-[44px]"
                    >
                      {t({ en: 'Book a Demo', ar: 'احجز عرضًا' })}
                    </button>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Internal Chatbot */}
            <div className="flex flex-col gap-8">

              <div className="border-b-2 border-[#10B981]/30 pb-4 mb-2">
                <h3 className="text-lg font-extrabold text-[#141F33] tracking-wider uppercase flex items-center gap-3">
                  <span>🧠</span> {t({ en: 'INTERNAL CHATBOT', ar: 'المساعد الذكي الداخلي' })}
                </h3>
                <p className="text-xs text-[#718096] font-medium mt-1">
                  {t({ en: 'Private RAG-powered assistant for HR, manuals, policies & SOPs.', ar: 'مساعد RAG خاص وموثوق لأدلة الموارد البشرية والسياسات وإجراءات التشغيل.' })}
                </p>
              </div>

              <div className="flex flex-col gap-6">
                {chatbotTiers.map((tier) => (
                  <div
                    key={tier.id}
                    className="relative bg-white border border-gray-200/80 rounded-2xl p-8 shadow-sm hover:shadow-md hover:scale-[1.02] hover:border-[#141F33] transition-all duration-300"
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold tracking-widest px-4 py-1 rounded-full uppercase">
                        {t({ en: 'POPULAR', ar: 'شائع' })}
                      </span>
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-xl font-extrabold text-[#141F33]">{tier.title}</h4>
                        <p className="text-xs text-[#718096] font-medium mt-1">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div>
                          {tier.price !== 'Custom' ? (
                            <>
                              <span className="text-3xl font-extrabold text-[#141F33]">{tier.price}</span>
                              <span className="text-xs font-bold text-[#718096] ml-1">QAR/mo</span>
                            </>
                          ) : (
                            <span className="text-2xl font-extrabold text-[#141F33]">{t({ en: 'Custom', ar: 'مخصص' })}</span>
                          )}
                        </div>
                        <p className="text-[#10B981] font-semibold text-xs mt-1">
                          {tier.setup !== 'Custom' ? `+ ${tier.setup} QAR ` + t({ en: 'setup fee', ar: 'رسوم تأسيس' }) : t({ en: 'Custom setup', ar: 'تأسيس مخصص' })}
                        </p>
                      </div>
                    </div>

                    <ul className="mt-6 flex flex-col gap-2.5 border-t border-gray-100 pt-6">
                      {(chatbotFeatures[tier.id] || []).map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-600">
                          <span className="text-[#10B981] font-bold">✓</span> {feature}
                        </li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() => openPlanModal(`Chatbot - ${tier.title}`)}
                      className="mt-8 w-full bg-[#141F33] text-white py-4 rounded-xl font-bold text-sm hover:bg-opacity-95 transition-all duration-300 min-h-[44px]"
                    >
                      {tier.cta === 'Contact Sales' ? t({ en: 'Contact Sales', ar: 'اتصل بالمبيعات' }) : t({ en: 'Book a Demo', ar: 'احجز عرضًا' })}
                    </button>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ── Custom Solution CTA Banner ────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-[#141F33] to-[#2A5CFF] py-20 px-6 text-white border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t({ en: 'Need a customized operational workflow?', ar: 'هل تحتاج إلى سير عمل تشغيلي مخصص بالكامل؟' })}
          </h2>
          <p className="text-blue-100 max-w-xl text-base font-medium leading-relaxed">
            {t({
              en: 'We design bespoke local AI pipelines for multi-location enterprises, integrating private systems, custom security policies, and custom voice nodes.',
              ar: 'نقوم بتصميم مسارات ذكاء اصطناعي محلية مخصصة للمؤسسات متعددة الفروع، مع دمج الأنظمة الخاصة وسياسات الأمان المخصصة.'
            })}
          </p>
          <button
            type="button"
            onClick={openCustomModal}
            className="mt-4 bg-white text-[#141F33] font-bold px-8 py-4 rounded-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 min-h-[44px] shadow-md"
          >
            {t({ en: 'Request a Custom Solution', ar: 'طلب حل مخصص' })}
          </button>
        </div>
      </section>

      <Footer />

      {/* ── Book a Demo Modal ───────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            
            <h3 className="text-xl font-extrabold text-[#141F33] mb-3">
              {isCustomModal ? t({ en: 'Request a Custom Demo', ar: 'طلب عرض مخصص' }) : `${t({ en: 'Configure Plan —', ar: 'تكوين الخطة —' })} ${selectedPlanName}`}
            </h3>
            
            <p className="text-sm font-semibold text-[#718096] mb-8 leading-relaxed">
              {isCustomModal
                ? t({
                    en: 'Tell us about your business operations. A 15-minute consultation is all we need to draw up a customized integration plan.',
                    ar: 'أخبرنا عن عمليات عملك. كل ما نحتاجه هو استشارة مدتها 15 دقيقة لوضع خطة تكامل مخصصة.'
                  })
                : t({
                    en: 'Book a 15-minute setup call with our technical team to allocate your private workspace and configure billing preferences.',
                    ar: 'احجز مكالمة إعداد مدتها 15 دقيقة مع فريقنا الفني لتخصيص مساحة العمل الخاصة بك وتكوين تفضيلات الفوترة.'
                  })}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center bg-[#141F33] text-white font-bold rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Confirm Call Time', ar: 'تأكيد وقت المكالمة' })}
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-gray-50 hover:bg-gray-100 text-[#141F33] font-bold rounded-xl border border-gray-200 transition-all hover:scale-[1.02] active:scale-95"
                style={{ minHeight: '48px' }}
              >
                {t({ en: 'Close', ar: 'إغلاق' })}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
