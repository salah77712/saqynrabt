'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function SynthetiqWorkPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-12">
        
        {/* Hero wrapping div with 4px Deep Indigo border top */}
        <div className="border-t-4 border-[#1A3BCC] rounded-[40px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-8 lg:p-12 mb-16 border border-[#141F33]/10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A3BCC]/10 text-[#1A3BCC] text-[10px] font-bold uppercase tracking-wider mb-6">
              ● Synthetiq Work HR Bot
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Your Internal AI Expert. Connected to SAP, Oracle, and your HR Docs.
            </h1>
            <p className="mt-6 text-sm md:text-base text-[#141F33]/70 font-semibold leading-relaxed">
              Synthetiq Work is a secure RAG chatbot that connects directly to your databases. Answer employee FAQs regarding vacation quotas, manager designations, and HR policies instantly.
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
                Connect Database &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Feature Cards Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Card 1: Vacation & Leave Balance */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#1A3BCC]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#1A3BCC]" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Instant Vacation & Leave Balance</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Directly connected to your HR database. Employees instantly ask 'How much vacation do I have left?' and get a real-time balance from the nightly sync.
                </p>
              </div>
            </div>

            {/* Card 2: Role & Designation Lookup */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#1A3BCC]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#1A3BCC]" strokeWidth="1.75">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M7,16 c0,-3 10,-3 10,0" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Role & Designation Lookup</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Instantly identifies an employee's job title, department, and reporting manager based on the company database. No more manual org charts.
                </p>
              </div>
            </div>

            {/* Card 3: Work & Policy Q&A */}
            <div className="bg-white border border-[#141F33]/10 rounded-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.05)] p-0 overflow-hidden flex flex-col items-stretch">
              {/* Top 50% */}
              <div className="bg-[#1A3BCC]/5 border-b border-[#141F33]/10 flex items-center justify-center p-8 min-h-[160px]">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="stroke-[#1A3BCC]" strokeWidth="1.75">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              {/* Bottom 50% */}
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-[#141F33] mb-3">Work & Policy Q&A</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Employees ask any internal policy or work-related question. The AI reads uploaded SOPs and company handbooks to give instant, citation-backed answers.
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
