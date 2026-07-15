'use client';

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLocale } from './providers';
import Link from 'next/link';
import { MessageSquare, Zap, Check } from 'lucide-react';

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
  const [activeProduct, setActiveProduct] = useState<'voice' | 'chatbot'>('voice');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { locale } = useLocale();

  const { ref: testimonialsRef, isVisible: testimonialsVisible } = useScrollReveal<HTMLDivElement>();
  const { ref: suiteRef, isVisible: suiteVisible } = useScrollReveal<HTMLDivElement>();

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  const openCustomModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-[#F8F9FB]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      
      <Header />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="bg-[#F8F9FB] pt-20 md:pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center gap-16">
          
          {/* Hero Content Stack */}
          <div className="flex flex-col items-center text-center gap-8 max-w-3xl relative">
            {/* Spotlight Background Glow */}
            <div className="absolute inset-0 w-full h-full pointer-events-none -z-10" style={{ background: "radial-gradient(circle at 50% 50%, rgba(42, 92, 255, 0.08) 0%, transparent 70%)" }} />
            
            {/* Floating Rotated Cards */}
            <div className="absolute -top-12 -left-16 w-24 h-24 bg-white border border-[#141F33]/5 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] transform rotate-[15deg] hidden lg:block pointer-events-none" />
            <div className="absolute -top-12 -right-16 w-24 h-24 bg-white border border-[#141F33]/5 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] transform -rotate-[15deg] hidden lg:block pointer-events-none" />
            
            {/* H1 Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] text-[#141F33] tracking-tight">
              Total Business Automation. Human-like Voice & Internal AI.
            </h1>

            {/* Dynamic Product Toggle */}
            <div className="inline-flex rounded-full bg-[#141F33]/5 p-1 border border-[#141F33]/10 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveProduct('voice')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                  activeProduct === 'voice'
                    ? 'bg-[#141F33] text-[#F8F9FB] shadow-sm'
                    : 'bg-transparent text-[#141F33]'
                }`}
              >
                AI Voice Agent
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('chatbot')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                  activeProduct === 'chatbot'
                    ? 'bg-[#141F33] text-[#F8F9FB] shadow-sm'
                    : 'bg-transparent text-[#141F33]'
                }`}
              >
                Internal RAG Chatbot
              </button>
            </div>

            {/* Dynamic Subtext */}
            <p className="text-base md:text-lg text-[#141F33]/70 max-w-2xl font-medium leading-relaxed min-h-[56px]">
              {activeProduct === 'voice' ? (
                t({
                  en: "Connect your phone lines and your databases to our voice-first AI. Answer inbound calls, schedule appointments, and capture operations 24/7.",
                  ar: "قم بتوصيل خطوط الهاتف وقواعد البيانات الخاصة بك بالذكاء الاصطناعي الصوتي. الرد على المكالمات وجدولة المواعيد 24/7."
                })
              ) : (
                t({
                  en: "Connect your ERP/SAP databases to our secure internal assistant. Empower your team to query HR policies, vacation status, and SOP guides instantly.",
                  ar: "قم بتوصيل قواعد بيانات ERP/SAP بالمساعد الداخلي الآمن. تمكين فريقك من الاستعلام عن سياسات الموارد البشرية وإجراءات التشغيل."
                })
              )}
            </p>

            {/* Dynamic CTA Row */}
            <div className="relative w-full flex justify-center">
              <svg className="absolute -top-8 left-[65%] w-16 h-8 text-[#2A5CFF] opacity-75 hidden lg:block" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10,10 Q50,40 90,20" />
                <path d="M80,15 L90,20 L85,30" />
              </svg>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={activeProduct === 'voice' ? '/voice-agent' : '/ai-chatbot'}
                  className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
                >
                  {activeProduct === 'voice' ? t({ en: 'Explore Voice AI', ar: 'استكشف الذكاء الصوتي' }) : t({ en: 'Explore Chatbot AI', ar: 'استكشف المساعد الذكي' })}
                </Link>
                <button
                  type="button"
                  onClick={openCustomModal}
                  className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px]"
                >
                  {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
                </button>
              </div>
            </div>

          </div>

          {/* Dynamic Preview Container (Navy/Canvas Monochromatic SVG elements) */}
          <div className="w-full max-w-2xl">
            <div className="relative bg-white rounded-[40px] border border-[#141F33]/10 shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 overflow-hidden min-h-[300px] flex flex-col justify-between">
              
              {/* Header bar of preview */}
              <div className="flex items-center justify-between pb-4 border-b border-[#141F33]/10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#141F33]/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#141F33]/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#141F33]/20" />
                </div>
                <span className="text-[10px] font-bold text-[#141F33]/50 uppercase tracking-widest">
                  {activeProduct === 'voice' ? 'Voice Agent Workflow' : 'Internal RAG Portal'}
                </span>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#141F33]/5 text-[#141F33] text-[9px] font-bold border border-[#141F33]/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#141F33] animate-pulse" />
                  ACTIVE MOCKUP
                </div>
              </div>

              {/* Dynamic Preview Screen */}
              <div className="flex-1 py-6 flex items-center justify-center">
                {activeProduct === 'voice' ? (
                  /* Phone call workflow dashboard mockup (Navy and Canvas only) */
                  <div className="w-full max-w-md flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4 items-center">
                      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[20px] p-3 text-center">
                        <p className="text-[9px] font-bold text-[#141F33]/40 uppercase tracking-wider">Inbound Call</p>
                        <p className="text-xs font-bold text-[#141F33] mt-1">User Dialed</p>
                      </div>
                      
                      <div className="flex justify-center">
                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="stroke-[#141F33]">
                          <path d="M0,10 L32,10 M26,4 L32,10 L26,16" strokeWidth="2" strokeDasharray="3,3" />
                        </svg>
                      </div>

                      <div className="bg-[#141F33] border border-[#141F33] rounded-[20px] p-3 text-center">
                        <p className="text-[9px] font-bold text-[#F8F9FB]/40 uppercase tracking-wider">Voice AI Node</p>
                        <p className="text-xs font-bold text-[#F8F9FB] mt-1">SOP Answer</p>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <svg width="20" height="40" viewBox="0 0 20 40" fill="none" className="stroke-[#141F33]">
                        <path d="M10,0 L10,32 M4,26 L10,32 L16,26" strokeWidth="2" strokeDasharray="3,3" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[20px] p-3 text-left">
                        <p className="text-[9px] font-bold text-[#141F33]/40 uppercase tracking-wider">Route Trigger</p>
                        <p className="text-xs font-bold text-[#141F33] mt-0.5">Booking Database Sync</p>
                      </div>
                      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[20px] p-3 text-left">
                        <p className="text-[9px] font-bold text-[#141F33]/40 uppercase tracking-wider">Escalate Trigger</p>
                        <p className="text-xs font-bold text-[#141F33] mt-0.5">Agent Ring Group</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Chat window with HR question (Navy and Canvas only) */
                  <div className="w-full max-w-md flex flex-col gap-4">
                    <div className="self-end bg-[#141F33] text-[#F8F9FB] text-xs font-semibold px-4 py-2.5 rounded-[20px] max-w-[85%]">
                      How do I submit my Q3 expense report in Oracle ERP?
                    </div>
                    
                    <div className="self-start bg-[#F8F9FB] border border-[#141F33]/10 text-[#141F33] text-xs font-semibold px-4 py-2.5 rounded-[20px] max-w-[90%] flex gap-3">
                      <span className="text-xs shrink-0 select-none">AI:</span>
                      <div>
                        To submit your Q3 expenses, navigate to <strong>Oracle Expense module</strong>, create a new Expense Claim, select code <strong>Q3-OPS</strong>, and attach invoices.
                        <div className="mt-2 text-[9px] font-bold text-[#141F33]/40 uppercase tracking-wider border-t border-[#141F33]/15 pt-2">
                          Source: ERP-Oracle-Guide.pdf
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom tag of mockup */}
              <div className="border-t border-[#141F33]/10 pt-3 text-center">
                <span className="text-[10px] text-[#141F33]/40 font-bold uppercase tracking-wider">
                  Interactive Live Dashboard Simulator
                </span>
              </div>

            </div>
          </div>

          {/* ── Trust Integration Logos Row ─────────────────── */}
          <div className="w-full max-w-3xl flex flex-col items-center gap-4">
            <p className="text-[10px] font-extrabold tracking-widest text-[#141F33]/40 uppercase text-center">
              Direct Secure ERP & Communication Integrations
            </p>
            <div className="bg-white rounded-full px-6 py-3 border border-[#141F33]/10 shadow-sm flex flex-wrap justify-center items-center gap-6 md:gap-8">
              {['SAP', 'Oracle', 'Salesforce', 'Slack', 'Jira', 'HubSpot'].map((logo, i) => (
                <div key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F9FB] border border-[#141F33]/5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#141F33]/20" />
                  <span className="text-[10px] font-bold text-[#141F33]/60 uppercase tracking-wider">{logo}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── Suite Exploration cards ──────────────────────── */}
      <section ref={suiteRef} className={`py-20 bg-[#F8F9FB] border-t border-[#141F33]/10 animate-reveal ${suiteVisible ? 'revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="text-center mb-16">
            <p className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase mb-3">
              Solution Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33]">
              Enterprise Intelligent System Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2A5CFF]/15 flex items-center justify-center text-[#2A5CFF] mb-6">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#141F33] mb-3">Voice Automation</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed mb-6">
                  Autonomously pick up every phone call, run scheduling tasks, identify custom caller context, and route emergencies.
                </p>
              </div>
              <Link href="/voice-agent" className="text-xs font-bold text-[#2A5CFF] hover:underline flex items-center gap-1">
                Explore Voice Agent Deep Dive &rarr;
              </Link>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#1A3BCC]/15 flex items-center justify-center text-[#1A3BCC] mb-6">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#141F33] mb-3">Internal Knowledge</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed mb-6">
                  Index internal HR files, SOP binders, and contract databases. Provide employees with immediate, context-verified solutions.
                </p>
              </div>
              <Link href="/ai-chatbot" className="text-xs font-bold text-[#1A3BCC] hover:underline flex items-center gap-1">
                Explore RAG Chatbot Deep Dive &rarr;
              </Link>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#141F33]/10 flex items-center justify-center text-[#141F33] mb-6 font-bold text-sm">
                  $
                </div>
                <h3 className="text-lg font-bold text-[#141F33] mb-3">Transparent Plans</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed mb-6">
                  Simple pricing based on usage limits. No setups or locking commitments. Choose what works best for your workflow scale.
                </p>
              </div>
              <Link href="/pricing" className="text-xs font-bold text-[#141F33] hover:underline flex items-center gap-1">
                View Pricing Grid &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section ref={testimonialsRef} className={`py-20 bg-[#F8F9FB] border-t border-[#141F33]/10 animate-reveal ${testimonialsVisible ? 'revealed' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#141F33]">
              What Operations Leaders Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((tItem, i) => (
              <div key={i} className="bg-white border border-[#141F33]/10 rounded-[40px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
                <p className="text-xs text-[#141F33] font-medium italic leading-relaxed mb-6">
                  &ldquo;{t(tItem.quote)}&rdquo;
                </p>
                <div className="border-t border-[#141F33]/10 pt-4">
                  <p className="text-xs font-bold text-[#141F33]">{t(tItem.name)}</p>
                  <p className="text-[10px] text-[#141F33]/50 font-bold uppercase tracking-wider mt-0.5">{t(tItem.org)}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── Custom banner CTA ────────────────────────────── */}
      <section className="py-16 bg-[#141F33] text-[#F8F9FB] text-center">
        <div className="max-w-3xl mx-auto px-6 flex flex-col items-center gap-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Need Custom Integrations?
          </h2>
          <p className="text-xs text-[#F8F9FB]/70 font-semibold leading-relaxed max-w-xl">
            We provide specialized integrations with bespoke ERP schemas, custom SSO, and dedicated phone trunks for large organizations. Let's speak.
          </p>
          <button
            type="button"
            onClick={openCustomModal}
            className="bg-[#F8F9FB] hover:bg-[#F8F9FB]/90 text-[#141F33] text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px]"
          >
            Request Custom Consultation
          </button>
        </div>
      </section>

      <Footer />

      {/* ── Request consultation modal ─────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-[#141F33]/40 backdrop-blur-sm">
          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] max-w-md w-full p-8 shadow-2xl relative" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <h3 className="text-lg font-bold text-[#141F33] mb-2">
              {t({ en: 'Request a consultation', ar: 'طلب استشارة' })}
            </h3>
            <p className="text-xs text-[#141F33]/70 font-semibold mb-6 leading-relaxed">
              {t({
                en: 'Tell us about your operations. A 15-minute call is all we need to draw up a customized setup plan.',
                ar: 'أخبرنا عن عملياتك. مكالمة مدتها 15 دقيقة هي كل ما نحتاجه لوضع خطة إعداد مخصصة.'
              })}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold py-3 text-center rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center"
              >
                {t({ en: 'Book Consultation Call', ar: 'حجز مكالمة استشارية' })}
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold py-3 rounded-full transition-all duration-200 min-h-[44px]"
              >
                {t({ en: 'Cancel', ar: 'إلغاء' })}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
