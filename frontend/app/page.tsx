'use client';

import { useState } from 'react';
import { useLocale } from './providers';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Link from 'next/link';

export default function MarketingPage() {
  const [activeProduct, setActiveProduct] = useState<'voice' | 'work'>('voice');
  const { locale } = useLocale();

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative pt-20 md:pt-28 pb-16 flex-1 flex flex-col justify-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 flex flex-col items-center text-center gap-16 w-full relative">
          
          {/* Floating Tilted Cards (Hidden on mobile) */}
          <div className="absolute top-10 left-12 w-24 h-24 bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] transform rotate-[15deg] hidden lg:block pointer-events-none" />
          <div className="absolute top-10 right-12 w-24 h-24 bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] transform -rotate-[15deg] hidden lg:block pointer-events-none" />
          
          {/* Headline and Subtext Block */}
          <div className="flex flex-col items-center gap-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Total Business Automation. Human-like Voice & Internal AI.
            </h1>
            
            {/* Interactive Product Toggle */}
            <div className="inline-flex rounded-full bg-[#F8F9FB] p-1 border border-[#141F33]/10">
              <button
                type="button"
                onClick={() => setActiveProduct('voice')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                  activeProduct === 'voice'
                    ? 'bg-[#141F33] text-[#F8F9FB]'
                    : 'bg-transparent text-[#141F33]'
                }`}
              >
                AI Voice Agent
              </button>
              <button
                type="button"
                onClick={() => setActiveProduct('work')}
                className={`rounded-full px-6 py-2.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                  activeProduct === 'work'
                    ? 'bg-[#141F33] text-[#F8F9FB]'
                    : 'bg-transparent text-[#141F33]'
                }`}
              >
                Internal HR Chatbot
              </button>
            </div>

            {/* Dynamic Subheadline */}
            <p className="text-base md:text-lg text-[#141F33]/70 font-semibold leading-relaxed max-w-2xl min-h-[56px]">
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

            {/* Dynamic CTA buttons & Arrow */}
            <div className="relative w-full flex flex-col items-center mt-2">
              <div className="flex gap-4">
                <Link
                  href={activeProduct === 'voice' ? '/synthetiq-voice' : '/synthetiq-work'}
                  className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-8 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
                >
                  {activeProduct === 'voice' ? t({ en: 'Start Voice AI', ar: 'بدء الذكاء الصوتي' }) : t({ en: 'Start Employee AI', ar: 'بدء ذكاء الموظف' })}
                </Link>
                <Link
                  href="/pricing"
                  className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-8 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
                >
                  {t({ en: 'View Plans', ar: 'عرض الخطط' })}
                </Link>
              </div>

              {/* Curved Arrow below CTA, pointing down to dynamic preview */}
              <div className="mt-8">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="stroke-[#141F33]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20,5 Q30,20 20,35 M12,28 L20,35 L28,28" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── Dynamic Preview Mockup Container ──────────────── */}
          <div className="w-full max-w-xl">
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 flex items-center justify-center min-h-[280px]">
              
              {activeProduct === 'voice' ? (
                /* Dynamic Voice SVG Mockup (Navy & Canvas only) */
                <svg width="340" height="200" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Central Node - Robot Head */}
                  <rect x="130" y="70" width="80" height="60" rx="12" fill="#F8F9FB" stroke="#141F33" strokeWidth="2.5" />
                  <circle cx="155" cy="95" r="4" fill="#141F33" />
                  <circle cx="185" cy="95" r="4" fill="#141F33" />
                  <path d="M150,115 H190" stroke="#141F33" strokeWidth="2" strokeLinecap="round" />
                  <text x="170" y="60" textAnchor="middle" fill="#141F33" fontSize="9" fontWeight="800" letterSpacing="1">VOICE AI</text>

                  {/* Connected boxes */}
                  {/* IVR Node */}
                  <g>
                    <rect x="10" y="20" width="85" height="36" rx="8" fill="#F8F9FB" stroke="#141F33" strokeWidth="2" />
                    <text x="52" y="42" textAnchor="middle" fill="#141F33" fontSize="9" fontWeight="bold">IVR Menu</text>
                    <path d="M95,38 L130,80" stroke="#141F33" strokeWidth="2" strokeDasharray="3,3" />
                  </g>

                  {/* Call Routing Node */}
                  <g>
                    <rect x="10" y="144" width="85" height="36" rx="8" fill="#F8F9FB" stroke="#141F33" strokeWidth="2" />
                    <text x="52" y="166" textAnchor="middle" fill="#141F33" fontSize="9" fontWeight="bold">Call Routing</text>
                    <path d="M95,162 L130,120" stroke="#141F33" strokeWidth="2" strokeDasharray="3,3" />
                  </g>

                  {/* Escalation Node */}
                  <g>
                    <rect x="245" y="82" width="85" height="36" rx="8" fill="#F8F9FB" stroke="#141F33" strokeWidth="2" />
                    <text x="287" y="104" textAnchor="middle" fill="#141F33" fontSize="9" fontWeight="bold">Escalation</text>
                    <path d="M210,100 H245" stroke="#141F33" strokeWidth="2" strokeDasharray="3,3" />
                  </g>
                </svg>
              ) : (
                /* Dynamic Work Chat Mockup SVG (Navy & Canvas only) */
                <svg width="340" height="200" viewBox="0 0 340 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Chat Container Header */}
                  <rect x="20" y="10" width="300" height="180" rx="20" fill="#F8F9FB" stroke="#141F33" strokeWidth="2.5" />
                  <line x1="20" y1="42" x2="320" y2="42" stroke="#141F33" strokeWidth="2" />
                  <circle cx="40" cy="26" r="4" fill="#141F33" />
                  <circle cx="54" cy="26" r="4" fill="#141F33" />
                  
                  {/* User Message Bubble */}
                  <rect x="150" y="56" width="150" height="36" rx="14" fill="#141F33" />
                  <text x="164" y="77" fill="#F8F9FB" fontSize="9" fontWeight="bold">How much PTO do I have?</text>

                  {/* Assistant Avatar */}
                  <circle cx="46" cy="126" r="14" fill="#141F33" />
                  <path d="M42,122 L46,126 L50,122" stroke="#F8F9FB" strokeWidth="1.5" />

                  {/* Assistant Message Bubble */}
                  <rect x="70" y="108" width="180" height="60" rx="14" fill="#FFFFFF" stroke="#141F33" strokeWidth="2" />
                  <text x="82" y="130" fill="#141F33" fontSize="9" fontWeight="bold">You have 15 days remaining.</text>
                  
                  {/* Micro Calendar inside response */}
                  <rect x="82" y="140" width="22" height="18" rx="3" fill="#F8F9FB" stroke="#141F33" strokeWidth="1.5" />
                  <path d="M93,143 V146" stroke="#141F33" strokeWidth="1" />
                  <path d="M93,151 L95,153 L98,149" stroke="#141F33" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="110" y="152" fill="#141F33" fontSize="8" fontWeight="800">Checked: Sync</text>
                </svg>
              )}

            </div>
          </div>

          {/* ── Trust Row ──────────────────────────────────── */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <p className="text-[10px] font-extrabold tracking-widest text-[#141F33]/40 uppercase">
              Direct HR & Call Stack Integrations
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['SAP', 'Oracle', 'Salesforce', 'Slack', 'Jira', 'HubSpot'].map((logo, i) => (
                <div key={i} className="bg-white rounded-full border border-[#141F33]/10 px-6 py-2 text-xs font-bold tracking-wider shadow-sm select-none">
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
