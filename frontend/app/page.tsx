'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLocale } from './providers';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import Link from 'next/link';
import { MessageSquare, Zap, Mail, Check } from 'lucide-react';
import { RainbowButton } from '../components/shadcn/rainbow-button';

const industries = [
  { id: 'default', label: 'Every Business', headline: 'Catch every call. Support every team member.', copy: 'The secure 24/7 AI front-desk and private staff knowledge hub for any industry. No missed calls. No repetitive questions.' },
  { id: 'healthcare', label: 'Healthcare', headline: 'More time with patients, less time on the phone.', copy: 'Reduce front-desk workload by automating patient bookings and triaging emergencies.' },
  { id: 'hospitality', label: 'Hospitality', headline: 'Check-ins, check-outs, room service — handled.', copy: 'Never miss a booking inquiry. Handle late check-ins automatically.' },
  { id: 'homeservices', label: 'Home Services', headline: 'Every emergency call captured. Every technician dispatched.', copy: 'Capture urgent calls 24/7 and dispatch technicians to the job instantly.' },
  { id: 'realestate', label: 'Real Estate', headline: 'Maintenance requests routed before the tenant hangs up.', copy: 'Route urgent tenant maintenance requests straight to your on-site crew.' },
  { id: 'automotive', label: 'Automotive', headline: 'Repair quotes answered while your crew keeps working.', copy: 'Handle quote inquiries instantly so your mechanics can focus on fixing cars.' },
  { id: 'food', label: 'Food & Beverage', headline: 'Reservations and takeout handled — even at full capacity.', copy: 'Automate table reservations and takeout orders during peak rush hours.' },
  { id: 'towing', label: 'Towing & Roadside', headline: 'Stranded drivers connected to your fleet in seconds.', copy: 'Capture stranded drivers, get GPS data, and dispatch trucks rapidly.' },
  { id: 'veterinary', label: 'Veterinary', headline: 'Pet emergencies triaged the moment the phone rings.', copy: 'Triage emergency pet visits and route to the nurse instantly.' },
  { id: 'plumbing', label: 'Plumbing & HVAC', headline: 'After-hours calls turned into booked jobs — automatically.', copy: 'Stop losing money from missed after-hours repair calls.' },
  { id: 'boutiquehotel', label: 'Boutique Hotels', headline: 'Midnight check-ins. Digital keys. Zero staff needed.', copy: 'Let guests auto-assign digital door codes at midnight.' },
  { id: 'catering', label: 'Restaurants & Catering', headline: 'Event quotes and bookings, minus the phone tag.', copy: 'Quote and book catering orders with no phone tag.' },
  { id: 'dealership', label: 'Auto Dealerships', headline: 'Inventory questions answered on the first ring.', copy: 'Answer real-time inventory questions about used cars.' },
  { id: 'construction', label: 'Construction & Contracting', headline: 'Permits, materials, crew dispatch — from one call.', copy: 'Keep subcontractors updated on material delivery times.' },
  { id: 'law', label: 'Law Firms', headline: 'Retainer questions and case updates, handled instantly.', copy: 'Auto-answer retainer fee and intake form questions.' },
  { id: 'accounting', label: 'Accounting & Tax', headline: 'Tax season status checks, automated.', copy: 'Handle tax season refund status checks without a receptionist.' },
];

const GOLDMINE_INDUSTRIES = industries.filter(i =>
  ['healthcare', 'hospitality', 'homeservices', 'realestate', 'automotive', 'food'].includes(i.id)
);
const OTHER_INDUSTRIES = industries.filter(i =>
  ['towing', 'veterinary', 'plumbing', 'boutiquehotel', 'catering', 'dealership', 'construction', 'law', 'accounting'].includes(i.id)
);

const testimonials = [
  { 
    quote: {
      en: 'Setup took one call. We went from 12 missed calls a day to zero in 48 hours.',
      ar: 'استغرق الإعداد مكالمة واحدة. انتقلنا من 12 مكالمة فائتة يومياً إلى صفر في غضون 48 ساعة.'
    },
    name: { en: 'Operations Director', ar: 'مدير العمليات' },
    org: { en: 'Boutique Hotel Group', ar: 'مجموعة الفنادق الفاخرة' }
  },
  { 
    quote: {
      en: 'Our HR team used to spend 3 hours a day answering the same policy questions. Now the chatbot handles it all.',
      ar: 'كان فريق الموارد البشرية لدينا يقضي 3 ساعات يومياً في الإجابة على نفس الأسئلة المتعلقة بالسياسات. الآن يتولى المساعد الذكي كل شيء.'
    },
    name: { en: 'HR Manager', ar: 'مدير الموارد البشرية' },
    org: { en: 'Al Wakra Medical Group', ar: 'مجموعة الوكرة الطبية' }
  },
  { 
    quote: {
      en: 'The ROI was immediate. Guest complaints used to sit for hours — now they are routed in seconds.',
      ar: 'كان العائد على الاستثمار فورياً. كانت شكاوى الضيوف تنتظر لساعات — الآن يتم توجيهها في ثوانٍ.'
    },
    name: { en: 'General Manager', ar: 'المدير العام' },
    org: { en: 'West Bay Hospitality', ar: 'شركة الخليج الغربي للضيافة' }
  },
];

export default function MarketingPage() {
  const [activeIndustry, setActiveIndustry] = useState('default');
  const [activeProduct, setActiveProduct] = useState<'automation' | 'chatbot'>('automation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale } = useLocale();

  const { ref: industryRef, isVisible: industryVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: testimonialRef, isVisible: testimonialVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: pricingRef, isVisible: pricingVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>();

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openCustomModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value) setActiveIndustry(e.target.value);
  };

  const currentIndustry = industries.find(i => i.id === activeIndustry) || industries[0];

  const chatbotIndustryHeadlines: Record<string, { en: string; ar: string }> = {
    default: { en: 'Every company policy, answered instantly.', ar: 'سياسة كل شركة، يتم الرد عليها فوراً.' },
    healthcare: { en: 'Clinical SOPs and protocols at your staff\'s fingertips.', ar: 'إجراءات التشغيل السريرية في متناول يد موظفيك.' },
    hospitality: { en: 'Hotel policies, room configs, guest rules — ask and get.', ar: 'سياسات الفندق وتجهيزات الغرف وقواعد النزلاء.' },
    homeservices: { en: 'Safety manuals and pricing guides on every phone.', ar: 'أدلة السلامة وأدلة الأسعار على كل هاتف.' },
    realestate: { en: 'Building handbooks and lease templates, always searchable.', ar: 'كتيبات المباني ونماذج الإيجار، قابلة للبحث دائماً.' },
    automotive: { en: 'Diagnostic standards and shop policies, instantly.', ar: 'معايير التشخيص وسياسات الورشة، فوراً.' },
    food: { en: 'Kitchen guidelines and allergy policies, always current.', ar: 'إرشادات المطبخ وسياسات الحساسية، محدثة دائماً.' }
  };

  const chatbotIndustryCopies: Record<string, { en: string; ar: string }> = {
    default: { en: 'A private RAG assistant trained on your HR, SOPs, and policies. Employees get fast, verified answers without generic AI drift.', ar: 'مساعد RAG خاص مدرب على الموارد البشرية وإجراءات التشغيل والسياسات.' },
    healthcare: { en: 'Upload clinical SOPs, treatment protocols, and clinic guidelines. Nurses and staff get verified, non-generic answers instantly.', ar: 'قم بتحميل إجراءات التشغيل السريرية وبروتوكولات العلاج.' },
    hospitality: { en: 'Train your private assistant on check-in policies, room configurations, and guest handle rules to onboard front desk staff faster.', ar: 'درب مساعدك الخاص على سياسات الدخول وتجهيز الغرف.' },
    homeservices: { en: 'Make safety protocols, appliance manuals, and pricing calculators available to field technicians instantly on their phones.', ar: 'اجعل بروتوكولات السلامة وأدلة الأجهزة متاحة للفنيين.' },
    realestate: { en: 'Index building handbooks, vendor directories, and lease templates for on-site property managers and leasing coordinators.', ar: 'فهرس كتيبات المباني ودليل الموردين ونماذج الإيجار.' },
    automotive: { en: 'Give mechanics instant access to manufacturer schematics, diagnostic procedures, and shop safety policies.', ar: 'امنح الفنيين وصولاً فوريًا إلى مخططات المصنّع وإجراءات التشخيص.' },
    food: { en: 'Train floor staff on kitchen guidelines, food allergies policy, and dining room standards to ensure top hospitality.', ar: 'درب موظفي الخدمة على إرشادات المطبخ وسياسة الحساسية الغذائية.' }
  };

  const chatbotHeadline = chatbotIndustryHeadlines[activeIndustry] || chatbotIndustryHeadlines.default;
  const chatbotCopy = chatbotIndustryCopies[activeIndustry] || chatbotIndustryCopies.default;

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-[#F8F9FB]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      <Header />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)] pt-20 md:pt-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column */}
          <div className="flex flex-col items-start gap-6 lg:w-1/2">
            
            {/* Two-Product Toggle */}
            <div className="inline-flex rounded-full bg-[#F8F9FB] p-1 border border-[#141F33]/10 shadow-sm animate-fadeIn">
              <button
                type="button"
                onClick={() => setActiveProduct('automation')}
                className={`min-h-[44px] rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
activeProduct === 'automation'
? 'bg-[#141F33] text-[#F8F9FB] shadow-sm'
: 'bg-transparent text-[#141F33] hover:text-[#141F33]'
                }`}
              >
                <Zap className="w-5 h-5 text-[#2A5CFF] inline mr-1" aria-hidden="true" /> {t({ en: 'Automation', ar: 'الأتمتة' })}
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('chatbot')}
                className={`min-h-[44px] rounded-full px-6 py-1.5 text-sm font-semibold transition-all ${
activeProduct === 'chatbot'
? 'bg-[#141F33] text-[#F8F9FB] shadow-sm'
: 'bg-transparent text-[#141F33] hover:text-[#141F33]'
                }`}
              >
                <MessageSquare className="w-5 h-5 text-[#2A5CFF] inline mr-1" aria-hidden="true" /> {t({ en: 'Chatbot', ar: 'المساعد الذكي' })}
              </button>
            </div>

            {/* Dynamic H1 */}
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#141F33] tracking-tight transition-all duration-500 animate-slideUp" style={{ animationDelay: '0.1s' }}>
              {activeProduct === 'automation' ? currentIndustry.headline : t(chatbotHeadline)}
            </h1>

            {/* Subtext */}
            <p className="text-lg lg:text-xl text-[#141F33] max-w-xl font-medium leading-relaxed transition-all duration-500 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              {activeProduct === 'automation' ? currentIndustry.copy : t(chatbotCopy)}
            </p>

            {/* CTA Row */}
            <div className="flex flex-wrap gap-4 mt-2 animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <RainbowButton asChild>
                <Link
                  href={activeProduct === 'automation' ? '/automation' : '/chatbot'}
                  className="px-8 py-4 text-base font-bold"
                >
                  {t({ en: 'Explore Product', ar: 'استكشف المنتج' })}
                </Link>
              </RainbowButton>
              <button
                type="button"
                onClick={openCustomModal}
                className="btn-secondary"
              >
                {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
              </button>
            </div>
          </div>

          {/* Right Column — Dashboard Preview */}
          <div className="lg:w-1/2 w-full animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#141F33]/10 to-[#F8F9FB]/30 rounded-3xl blur-2xl opacity-70" />
              <div className="relative bg-[#F8F9FB] rounded-2xl border border-[#141F33]/10 shadow-xl p-5 overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#141F33]/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#141F33]/10" />
                    <div className="w-3 h-3 rounded-full bg-[#141F33]/10" />
                    <div className="w-3 h-3 rounded-full bg-[#141F33]/10" />
                  </div>
                  <span className="text-[10px] font-bold text-[#141F33] uppercase tracking-wider">
                    {activeProduct === 'automation' ? t({ en: 'Live Queue', ar: 'قائمة مباشرة' }) : t({ en: 'Company Assistant', ar: 'مساعد الشركة' })}
                  </span>
                  <span className="text-[10px] bg-[#2A5CFF]/10 text-[#2A5CFF] font-bold px-2 py-0.5 rounded-full border border-[#2A5CFF]/20">
                    ● {t({ en: 'Live', ar: 'مباشر' })}
                  </span>
                </div>

                {activeProduct === 'automation' ? (
                  <div className="space-y-2 mt-3">
                    {[
{ label: 'Incoming Call — Room 204', dept: 'Housekeeping', status: 'Routed', color: 'text-[#2A5CFF]' },
{ label: 'WhatsApp — Late checkout', dept: 'Front Desk', status: 'Approved', color: 'text-[#2A5CFF]' },
                      { label: 'SMS — Airport transfer', dept: 'Concierge', status: 'Captured', color: 'text-[#141F33]' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 bg-[#F8F9FB] rounded-xl">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-[#141F33]/10 flex items-center justify-center text-[10px] font-bold text-[#141F33] shrink-0">
                            {i === 0 ? <Zap className="w-4 h-4 text-[#2A5CFF]" aria-hidden="true" /> : i === 1 ? <MessageSquare className="w-4 h-4 text-[#2A5CFF]" aria-hidden="true" /> : <Mail className="w-4 h-4 text-[#141F33]" aria-hidden="true" />}
                          </div>
                          <p className="text-xs font-semibold text-[#141F33] truncate">{item.label}</p>
                        </div>
                        <span className={`text-[10px] font-bold shrink-0 ml-2 ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
                    <div className="pt-2 text-center">
                      <span className="text-[10px] text-[#141F33] font-medium">
                        {t({ en: '3 active requests', ar: '3 طلبات نشطة' })}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2 mt-3">
                    <div className="self-end bg-[#141F33] text-[#F8F9FB] text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[85%]">
                      How many vacation days do I have left?
                    </div>
                    <div className="self-start bg-[#F8F9FB] text-[#141F33] text-xs px-3 py-2 rounded-2xl rounded-bl-sm max-w-[90%]">
                      You have <strong>14 days</strong> remaining this cycle.
                    </div>
                    <div className="self-end bg-[#141F33] text-[#F8F9FB] text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-[85%]">
                      What&apos;s the SOP for maintenance?
                    </div>
                    <div className="pt-1 text-center">
                      <span className="text-[10px] text-[#141F33] font-medium">
                        {t({ en: 'Sourced from your documents', ar: 'مأخوذ من مستنداتك' })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Industry Switcher & Social Proof ──────────────── */}
      <section ref={industryRef} id="industries" className={`bg-gradient-to-b from-[#F8F9FB] via-[#F8F9FB] to-[#F8F9FB] py-16 lg:py-24 animate-reveal ${industryVisible ? 'revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center">
          
          <p className="text-xs font-extrabold tracking-widest text-[#141F33] uppercase mb-8 text-center animate-fadeIn">
            {t({ en: 'Engineered for Global Operations — Select Your Industry', ar: 'مصمم خصيصًا للعمليات العالمية - اختر قطاعك' })}
          </p>

          {/* 6 Top Industry Pills */}
          <div className="w-full flex flex-wrap justify-center gap-4 py-2 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            {GOLDMINE_INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveIndustry(ind.id)}
                className={`min-h-[44px] px-6 py-3 rounded-full border text-sm font-semibold transition-all duration-300 hover:shadow-md hover:scale-[1.05] hover:border-[#141F33] active:scale-95 cursor-pointer ${
                  activeIndustry === ind.id
                    ? 'bg-[#141F33] text-[#F8F9FB] border-[#141F33] shadow-md'
                    : 'bg-[#F8F9FB] text-[#141F33] border-[#141F33] shadow-sm hover:shadow-md'
                }`}
              >
                {ind.label}
              </button>
            ))}
          </div>

          {/* Other Industries Dropdown */}
          <div className="mt-6 w-full max-w-xs mx-auto animate-fadeIn" style={{ animationDelay: '0.15s' }}>
            <select
              id="other-industries"
              value={OTHER_INDUSTRIES.some(i => i.id === activeIndustry) ? activeIndustry : ''}
              onChange={handleSelectChange}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-[#141F33] focus:outline-none focus:ring-2 focus:ring-[#141F33] transition-all appearance-none cursor-pointer text-center text-sm shadow-sm font-semibold"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%234B5563' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: locale === 'ar' ? 'left 1rem center' : 'right 1rem center',
                backgroundSize: '1.25rem',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <option value="">{t({ en: 'Other Industries…', ar: 'صناعات أخرى…' })}</option>
              {OTHER_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id}>{ind.label}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Headline Panel */}
          <div className="mt-12 text-center bg-[#F8F9FB] p-8 rounded-2xl border border-[#141F33]/10 max-w-3xl w-full animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{currentIndustry.label}</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#141F33] leading-tight mt-3">
              {currentIndustry.headline}
            </h2>
            <p className="text-[#141F33] mt-4 text-sm leading-relaxed max-w-xl mx-auto font-medium">
              {currentIndustry.copy}
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-12 border-t border-[#141F33]/10 w-full flex flex-col items-center gap-6 animate-fadeIn">
            <p className="text-xs font-extrabold tracking-widest text-[#141F33] uppercase text-center">
              {t({ en: 'Trusted by front desks and teams worldwide', ar: 'موثوق به من قبل مكاتب الاستقبال والفرق في جميع أنحاء العالم' })}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Hospitality Sector">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Hotels</span>
              </div>
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Healthcare Sector">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Clinics</span>
              </div>
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Industrial Operations">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 21h18M3 7l5 4V7l5 4V7l6 5v9H3V7z" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Operations</span>
              </div>
              <div className="flex items-center gap-2 opacity-40 grayscale hover:opacity-75 transition-opacity" title="Retail Outlets">
                <svg className="h-8 w-8 text-[#141F33]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                <span className="text-xs font-bold text-[#141F33] tracking-wider uppercase">Retail</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Testimonials Section ─────────────────────────── */}
      <section ref={testimonialRef} className={`bg-[#F8F9FB] py-20 lg:py-28 animate-reveal ${testimonialVisible ? 'revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase mb-3">
              {t({ en: 'Testimonials', ar: 'شهادات العملاء' })}
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33]">
              {t({ en: 'Trusted by Operations Teams Worldwide', ar: 'موثوق به من قبل فرق العمليات حول العالم' })}
            </h2>
          </div>
          <div className={`flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none animate-stagger ${testimonialVisible ? 'revealed' : ''}`}>
            {testimonials.map((item, i) => (
              <div
                key={i}
                className="min-w-[300px] md:min-w-[380px] snap-start bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-8 shadow-sm card-hover"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-[#2A5CFF]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#141F33] leading-relaxed mb-6">&ldquo;{t(item.quote)}&rdquo;</p>
                <div className="border-t border-[#141F33]/10 pt-4">
                  <p className="text-sm font-extrabold text-[#141F33]">{t(item.name)}</p>
                  <p className="text-xs font-medium text-[#141F33]">{t(item.org)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Deep-Dive CTA ─────────────────────────── */}
      <section ref={pricingRef} className={`py-24 lg:py-32 bg-[#F8F9FB] animate-reveal ${pricingVisible ? 'revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] mb-4">
              {t({ en: 'Explore our full product suite.', ar: 'استكشف مجموعة منتجاتنا الكاملة.' })}
            </h2>
            <p className="text-base lg:text-lg text-[#141F33] font-medium max-w-2xl mx-auto">
              {t({ en: 'Two powerful AI solutions designed for your business operations.', ar: 'حلّان ذكيان قويان مصممان لعمليات عملك.' })}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Automation Card */}
            <div className="relative p-8 card-premium group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A5CFF]/5 rounded-bl-[100px] rounded-tr-3xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#2A5CFF]/10 rounded-xl flex items-center justify-center mb-5">
                  <Zap className="w-6 h-6 text-[#2A5CFF]" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'Business Automation', ar: 'أتمتة الأعمال' })}
                </h3>
                <p className="text-sm text-[#141F33] font-medium leading-relaxed mb-6">
                  {t({ en: 'Your 24/7 AI front-desk that handles incoming calls, WhatsApp messages, SMS, and web chat — routes every request to the right department automatically.', ar: 'مكتب استقبال ذكاء اصطناعي 24/7 يتعامل مع المكالمات الواردة وواتساب والرسائل النصية والدردشة الإلكترونية — يوجه كل طلب إلى القسم المناسب تلقائياً.' })}
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    { en: 'Call answering & routing 24/7', ar: 'الرد على المكالمات والتوجيه 24/7' },
                    { en: 'WhatsApp, SMS & web chat parsing', ar: 'تحليل واتساب والرسائل النصية والدردشة' },
                    { en: 'Booking & complaint management', ar: 'إدارة الحجوزات والشكاوى' },
                    { en: 'Multi-language (Arabic & English)', ar: 'متعدد اللغات (العربية والإنجليزية)' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-[#141F33]">
                      <Check className="w-5 h-5 text-[#2A5CFF] shrink-0" aria-hidden="true" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/automation"
                  className="btn-primary w-full py-4"
                >
                  {t({ en: 'Explore Automation →', ar: 'استكشف الأتمتة ←' })}
                </Link>
              </div>
            </div>

            {/* Chatbot Card */}
            <div className="relative p-8 card-premium group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2A5CFF]/5 rounded-bl-[100px] rounded-tr-3xl" />
              <div className="relative">
                <div className="w-12 h-12 bg-[#2A5CFF]/10 rounded-xl flex items-center justify-center mb-5">
                  <MessageSquare className="w-6 h-6 text-[#2A5CFF]" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'Internal Chatbot', ar: 'المساعد الذكي الداخلي' })}
                </h3>
                <p className="text-sm text-[#141F33] font-medium leading-relaxed mb-6">
                  {t({ en: 'A private RAG-powered AI trained on your HR policies, SOPs, and onboarding documents. Your team gets instant, verified answers.', ar: 'ذكاء اصطناعي خاص بتقنية RAG مدرب على سياسات الموارد البشرية وإجراءات التشغيل ومستندات التوظيف. فريقك يحصل على إجابات فورية وموثوقة.' })}
                </p>
                <ul className="space-y-2 mb-8">
                  {[
                    { en: 'Private RAG on your documents', ar: 'RAG خاص على مستنداتك' },
                    { en: 'HR, SOP & policy Q&A', ar: 'أسئلة وأجوبة الموارد البشرية والسياسات' },
                    { en: 'Employee role-based access', ar: 'وصول قائم على أدوار الموظفين' },
                    { en: 'Knowledge gap tracking', ar: 'تتبع الفجوات المعرفية' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-[#141F33]">
                      <Check className="w-5 h-5 text-[#2A5CFF] shrink-0" aria-hidden="true" />
                      {t(item)}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/chatbot"
                  className="btn-primary w-full py-4"
                >
                  {t({ en: 'Explore Chatbot →', ar: 'استكشف المساعد الذكي ←' })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Custom Solution CTA Banner ────────────────────── */}
      <section ref={ctaRef} className={`bg-gradient-to-r from-[#141F33] to-[#2A5CFF] py-20 px-6 text-[#F8F9FB] border-t border-[#141F33]/20 animate-reveal ${ctaVisible ? 'revealed' : ''}`}>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {t({ en: 'Need something more tailored?', ar: 'هل تحتاج إلى شيء أكثر تخصيصاً؟' })}
          </h2>
          <p className="text-[#F8F9FB] max-w-xl text-base font-medium leading-relaxed">
            {t({
              en: 'We build custom AI workflows for multi-location teams with unique security or integration needs. Tell us what you need.',
              ar: 'نبني مسارات ذكاء اصطناعي مخصصة للفرق متعددة الفروع ذات احتياجات الأمان أو التكامل الفريدة. أخبرنا بما تحتاجه.'
            })}
          </p>
          <button
            type="button"
            onClick={openCustomModal}
            className="btn-primary"
          >
            {t({ en: 'Request a Custom Solution', ar: 'طلب حل مخصص' })}
          </button>
        </div>
      </section>

      <Footer />

      {/* ── Modal ─────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#141F33]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl max-w-md w-full p-8 shadow-2xl relative animate-scaleIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            
            <h3 className="text-xl font-extrabold text-[#141F33] mb-3">
              {t({ en: 'Request a consultation', ar: 'طلب استشارة' })}
            </h3>
            
            <p className="text-sm font-semibold text-[#141F33] mb-8 leading-relaxed">
              {t({
                en: 'Tell us about your business operations. A 15-minute consultation is all we need to draw up a customized integration plan.',
                ar: 'أخبرنا عن عمليات عملك. كل ما نحتاجه هو استشارة مدتها 15 دقيقة.'
              })}
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                {t({ en: 'Pick a time', ar: 'اختر وقتاً' })}
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-ghost text-sm"
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
