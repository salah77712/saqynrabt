'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function SynthetiqVoicePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-12">
        
        {/* Hero wrapping div with 4px Royal Blue border top */}
        <div className="border-t-4 border-[#2A5CFF] rounded-[40px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 lg:p-12 mb-16 border border-[#141F33]/10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A5CFF]/10 text-[#2A5CFF] text-[10px] font-bold uppercase tracking-wider mb-6">
              ● Synthetiq Voice Call Agent
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Never Miss a Call Again. AI that speaks, routes, and escalates.
            </h1>
            <p className="mt-6 text-sm md:text-base text-[#141F33]/70 font-semibold leading-relaxed">
              Synthetiq Voice answers inbound company calls with a natural, conversational human voice. Setup custom IVR flows and integrate with CRM databases in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
              >
                View Plans & Pricing
              </Link>
              <Link
                href="/admin/integrations"
                className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
              >
                Configure Hotline &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Natural Voice AI */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#2A5CFF]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="1.75">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Natural Voice AI</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Handles inbound calls with human-like tone, natural accents, and absolute zero delay. Speaks Arabic and English natively.
                </p>
              </div>
            </div>

            {/* Card 2: Intelligent Routing */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#2A5CFF]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="1.75">
                  <rect x="9" y="1" width="6" height="4" rx="1" />
                  <rect x="1" y="18" width="6" height="5" rx="1" />
                  <rect x="17" y="18" width="6" height="5" rx="1" />
                  <path d="M12,5 V13 H4 V18 M12,13 H20 V18" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Intelligent Routing</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Instantly routes calls to the right department or logs service tickets in your CRM or ERP system automatically.
                </p>
              </div>
            </div>

            {/* Card 3: Smart Human Escalation */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#2A5CFF]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#2A5CFF]" strokeWidth="1.75">
                  <circle cx="12" cy="5" r="1" />
                  <path d="M9,22 L11,15 V11 H13 V15 L15,22 M12,8 V10" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Smart Human Escalation</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Detects frustrated tones and instantly transfers the call to a live agent along with the generated context transcript.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
