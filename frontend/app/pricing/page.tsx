'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">
        
        {/* Pricing Header */}
        <div className="mb-16">
          <span className="inline-block bg-[#141F33]/5 border border-[#141F33]/15 text-[#141F33] text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {t({ en: 'SAQYN RABT PLANS', ar: 'خطط أسعارنا' })}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#141F33] tracking-tight leading-tight max-w-2xl mx-auto">
            {t({ en: 'Pick the product and plan that fits your business scale', ar: 'اختر المنتج والخطة التي تناسب حجم أعمالك' })}
          </h1>
          <p className="mt-4 text-xs md:text-sm text-[#141F33]/60 font-semibold max-w-xl mx-auto">
            {t({ en: 'Simple, monthly flat rates. No setup fees, no lock-in contracts, cancel anytime.', ar: 'أسعار شهرية ثابتة وبسيطة. لا توجد رسوم إعداد، ولا عقود إلزامية.' })}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left items-stretch">
          
          {/* Card 1: Voice Core */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-between">
            <div>
              <div className="pb-6 border-b border-[#141F33]/10">
                <h3 className="text-lg font-bold text-[#141F33]">Voice Core</h3>
                <p className="text-[10px] text-[#141F33]/50 font-bold uppercase tracking-wider mt-1">AI Voice Agent Deep Dive</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">$199</span>
                  <span className="text-xs text-[#141F33]/60 font-bold">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Call routing & forwarding 24/7</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>1,000 conversational minutes/mo</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Transcripts & CRM status logs</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Arabic & English standard speech</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold py-3.5 text-center rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-sm"
            >
              Get Started with Voice
            </Link>
          </div>

          {/* Card 2: Chatbot Core */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-between">
            <div>
              <div className="pb-6 border-b border-[#141F33]/10">
                <h3 className="text-lg font-bold text-[#141F33]">Chatbot Core</h3>
                <p className="text-[10px] text-[#141F33]/50 font-bold uppercase tracking-wider mt-1">RAG Knowledge Portal</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">$299</span>
                  <span className="text-xs text-[#141F33]/60 font-bold">/mo</span>
                </div>
              </div>

              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>RAG Vector index on policy files</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>SAP & Oracle secure read-only sync</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Unlimited internal Q&A requests</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Role-based file permission routing</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold py-3.5 text-center rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-sm"
            >
              Get Started with Chatbot
            </Link>
          </div>

          {/* Card 3: Enterprise Bundle (white bg, highlighted with a 2px Royal Blue ring and badge) */}
          <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 flex flex-col justify-between ring-2 ring-[#2A5CFF] relative">
            
            {/* Recommended Pill Badge */}
            <div className="absolute top-4 right-6 bg-[#2A5CFF] text-[#F8F9FB] text-[10px] font-bold rounded-full px-3 py-1 shadow-sm uppercase tracking-wider select-none">
              Recommended
            </div>

            <div>
              <div className="pb-6 border-b border-[#141F33]/10">
                <h3 className="text-lg font-bold text-[#141F33]">Complete Business AI</h3>
                <p className="text-[10px] text-[#141F33]/50 font-bold uppercase tracking-wider mt-1">Custom operations</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">Custom</span>
                  <span className="text-xs text-[#141F33]/60 font-bold">/quote</span>
                </div>
              </div>

              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>AI Voice Agent + RAG Chatbot Suite</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Custom ERP workflows & API access</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Dedicated cloud nodes & instances</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-[#141F33]/80">
                  <Check className="w-4 h-4 text-[#2A5CFF] shrink-0 mt-0.5" />
                  <span>Priority support SLA & custom training</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold py-3.5 text-center rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-sm"
            >
              Contact Enterprise Sales
            </Link>
          </div>

        </div>

        {/* Gulf Compliance Subtext banner */}
        <div className="bg-white border border-[#141F33]/10 rounded-[40px] p-6 shadow-sm mt-16 max-w-3xl mx-auto flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#2A5CFF]" />
          <span className="text-xs font-bold text-[#141F33]/60 uppercase tracking-wider">
            All prices are fixed monthly. Overages only activate upon request.
          </span>
        </div>

      </main>

      <Footer />
    </div>
  );
}
