'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from './providers';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Link from 'next/link';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default function MarketingPage() {
  const [activeProduct, setActiveProduct] = useState<'voice' | 'work'>('voice');
  const { locale } = useLocale();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.01);

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section ref={heroRef} className="relative pt-20 md:pt-28 pb-16 flex-1 flex flex-col justify-center overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center gap-16 w-full relative">

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute -top-40 -start-40 w-96 h-96 rounded-full bg-accent/3 blur-3xl transition-all duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute -bottom-40 -end-40 w-96 h-96 rounded-full bg-accent/3 blur-3xl transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100' : 'opacity-0'}`} />
          </div>

          <div className="absolute top-10 start-12 w-24 h-24 bg-surface border border-primary/10 rounded-xl shadow-elevation-low transform rotate-[15deg] hidden lg:block pointer-events-none" />
          <div className="absolute top-10 end-12 w-24 h-24 bg-surface border border-primary/10 rounded-xl shadow-elevation-low transform -rotate-[15deg] hidden lg:block pointer-events-none" />

          <div className={`flex flex-col items-center gap-8 max-w-3xl transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-gradient shimmer-text">
              Total Business Automation. Human-like Voice & Internal AI.
            </h1>

            <div className="inline-flex rounded-full bg-surface p-1 border border-primary/10 shadow-elevation-low">
              <button
                type="button"
                onClick={() => setActiveProduct('voice')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[44px] ${
                  activeProduct === 'voice'
                    ? 'bg-primary text-surface shadow-sm'
                    : 'bg-transparent text-primary hover:bg-primary/5'
                }`}
              >
                AI Voice Agent
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('work')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[44px] ${
                  activeProduct === 'work'
                    ? 'bg-primary text-surface shadow-sm'
                    : 'bg-transparent text-primary hover:bg-primary/5'
                }`}
              >
                Internal HR Chatbot
              </button>
            </div>

            <p className="text-base md:text-lg text-primary/70 font-semibold leading-relaxed max-w-2xl min-h-[56px] transition-all duration-500">
              {activeProduct === 'voice' ? (
                t({
                  en: "Synthetiq Voice answers incoming business calls with human-like voice, logs routing paths, and escalates to live teams natively.",
                  ar: "يجيب وكيل الهاتف الصوتي Synthetiq Voice على المكالمات الواردة بصوت بشري، ويوجه المسارات، ويصعد إلى الفرق الحية."
                })
              ) : (
                t({
                  en: "Synthetiq Work connects to your HR and ERP systems to securely resolve employee vacation balance requests and policy documentation queries.",
                  ar: "يتصل برنامج Synthetiq Work بأنظمة الموارد البشرية لتسهيل الاستعلام عن إجازات الموظفين ومستندات السياسة بأمان."
                })
              )}
            </p>

            <div className="relative w-full flex flex-col items-center mt-2">
              <div className="flex gap-4">
                <Link
                  href={activeProduct === 'voice' ? '/synthetiq-voice' : '/synthetiq-work'}
                  className="bg-primary hover:bg-primary/90 text-surface text-xs font-bold px-8 py-3 rounded-full transition-all duration-300 min-h-[44px] flex items-center shadow-elevation-mid hover:shadow-elevation-high hover:scale-[1.02] active:scale-95"
                >
                  {activeProduct === 'voice' ? t({ en: 'Start Voice AI', ar: 'بدء الذكاء الصوتي' }) : t({ en: 'Start Employee AI', ar: 'بدء ذكاء الموظف' })}
                </Link>
                <Link
                  href="/pricing"
                  className="bg-transparent border border-primary/15 text-primary hover:bg-primary/5 text-xs font-bold px-8 py-3 rounded-full transition-all duration-300 min-h-[44px] flex items-center hover:scale-[1.02] active:scale-95"
                >
                  {t({ en: 'View Plans', ar: 'عرض الخطط' })}
                </Link>
              </div>

              <div className="mt-8 animate-float">
                <svg aria-hidden="true" width="40" height="40" viewBox="0 0 40 40" fill="none" className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20,5 Q30,20 20,35 M12,28 L20,35 L28,28" />
                </svg>
              </div>
            </div>
          </div>

          <div className={`w-full max-w-xl transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-surface border border-primary/10 rounded-xl shadow-elevation-mid p-8 flex items-center justify-center min-h-[280px] card-hover">

              {activeProduct === 'voice' ? (
                <svg aria-hidden="true" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-md mx-auto text-primary">
                  <defs>
                    <filter id="shadow-geo" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="currentColor" floodOpacity="0.06" />
                    </filter>
                  </defs>
                  <line x1="340" y1="160" x2="280" y2="150" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                  <circle cx="340" cy="160" r="4" fill="currentColor" />
                  <line x1="340" y1="260" x2="280" y2="270" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                  <circle cx="340" cy="260" r="4" fill="currentColor" />
                  <line x1="460" y1="210" x2="520" y2="210" stroke="currentColor" strokeWidth="2" strokeDasharray="6,6" />
                  <circle cx="460" cy="210" r="4" fill="currentColor" />
                  <rect x="300" y="170" width="200" height="80" rx="40" fill="var(--color-surface)" stroke="currentColor" strokeWidth="3" filter="url(#shadow-geo)" />
                  <circle cx="365" cy="210" r="8" fill="currentColor" />
                  <circle cx="435" cy="210" r="8" fill="currentColor" />
                  <line x1="375" y1="230" x2="425" y2="230" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  <text x="400" y="145" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="700" letterSpacing="1" className="uppercase">VOICE AI</text>
                  <g filter="url(#shadow-geo)">
                    <rect x="180" y="130" width="100" height="40" rx="20" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
                    <text x="230" y="155" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">IVR Menu</text>
                  </g>
                  <g filter="url(#shadow-geo)">
                    <rect x="180" y="250" width="100" height="40" rx="20" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
                    <text x="230" y="275" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">Call Routing</text>
                  </g>
                  <g filter="url(#shadow-geo)">
                    <rect x="520" y="190" width="100" height="40" rx="20" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
                    <text x="570" y="215" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="600">Escalation</text>
                  </g>
                </svg>
              ) : (
                <svg aria-hidden="true" viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-md mx-auto text-primary">
                  <defs>
                    <filter id="shadow-geo" x="-10%" y="-10%" width="130%" height="130%">
                      <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="currentColor" floodOpacity="0.06" />
                    </filter>
                  </defs>
                  <rect x="250" y="100" width="300" height="220" rx="24" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" filter="url(#shadow-geo)" />
                  <path d="M250 124 Q250 100 274 100 L526 100 Q550 100 550 124" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
                  <line x1="250" y1="124" x2="550" y2="124" stroke="currentColor" strokeWidth="2" />
                  <circle cx="275" cy="112" r="5" fill="currentColor" />
                  <circle cx="292" cy="112" r="5" fill="currentColor" />
                  <circle cx="309" cy="112" r="5" fill="currentColor" />
                  <rect x="430" y="145" width="160" height="36" rx="18" fill="currentColor" filter="url(#shadow-geo)" />
                  <text x="510" y="168" textAnchor="middle" fill="var(--color-primary-foreground)" fontSize="12" fontWeight="600">How much PTO do I have?</text>
                  <circle cx="280" cy="230" r="16" fill="currentColor" filter="url(#shadow-geo)" />
                  <path d="M275 235 L280 240 L289 231" stroke="var(--color-primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <rect x="302" y="210" width="160" height="80" rx="20" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" filter="url(#shadow-geo)" />
                  <text x="315" y="235" fill="currentColor" fontSize="11" fontWeight="500">You have 15 days</text>
                  <text x="315" y="252" fill="currentColor" fontSize="11" fontWeight="500">remaining.</text>
                  <rect x="315" y="264" width="14" height="14" rx="3" fill="currentColor" />
                  <path d="M317 270 L319 273 L326 266" stroke="var(--color-primary-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  <text x="335" y="276" fill="currentColor" fontSize="9" fontWeight="600" className="uppercase">Checked: Sync</text>
                </svg>
              )}

            </div>
          </div>

          <div className={`flex flex-col items-center gap-4 mt-6 transition-all duration-700 delay-500 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] font-extrabold tracking-widest text-primary/40 uppercase">
              Direct HR & Call Stack Integrations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['SAP', 'Oracle', 'Salesforce', 'Slack', 'Jira', 'HubSpot'].map((logo, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-full border border-primary/10 px-6 py-2 text-xs font-bold tracking-wider shadow-elevation-low select-none card-hover"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
