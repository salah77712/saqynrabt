'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MessageSquare, FileText, Database, ShieldAlert } from 'lucide-react';

export default function AIChatbotPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      {/* -- Main Hero Container with 4px border top ----------- */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-8">
        
        <div className="border-t-4 border-accent rounded-xl bg-white shadow-card p-8 lg:p-12 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-wider mb-6">
              ? Internal RAG Chatbot Deep Dive
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#141F33] tracking-tight leading-tight">
              Your Internal AI Expert. Connected to SAP, Oracle, and your HR Docs.
            </h1>
            <p className="mt-6 text-sm md:text-base text-[#141F33]/70 font-semibold leading-relaxed">
              Equip your staff with a private, corporate-trained RAG assistant. Index your operations SOP binders, policy documents, and employee directories. Connect to live ERP schemas under full security constraints.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
              >
                View Chatbot Pricing
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
              >
                Request Custom Demo &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* -- Feature Grid ----------------------------------- */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#141F33]">
              Private Operations & Systems Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: RAG Knowledge */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white mb-6">
                  <FileText className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[#141F33] mb-3">Instant RAG Answers</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Uploads your HR policies and employee handbooks. Employees ask complex operational questions, and the AI resolves answers instantly.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-accent">
                <span>Vector Indexes</span>
                <span>Active</span>
              </div>
            </div>

            {/* Card 2: ERP Integrations (Network Diagram in top 50%) */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                {/* Monochromatic Network Diagram (Navy and Canvas only) */}
                <div className="bg-[#F8F9FB] rounded-[24px] border border-[#141F33]/10 p-3 mb-6 flex flex-col items-center justify-center min-h-[110px]">
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-1 bg-white border border-[#141F33]/10 rounded-full text-[8px] font-bold text-[#141F33]">SAP</div>
                    
                    <svg aria-hidden="true" width="40" height="20" viewBox="0 0 40 20" fill="none" className="stroke-[#141F33] stroke-[1.5]">
                      <path d="M0,10 H40" strokeDasharray="3,3" />
                      <circle cx="20" cy="10" r="3" fill="#141F33" />
                    </svg>

                    <div className="w-8 h-8 rounded-full bg-[#141F33] flex items-center justify-center text-white text-[8px] font-bold">RAG</div>

                    <svg aria-hidden="true" width="40" height="20" viewBox="0 0 40 20" fill="none" className="stroke-[#141F33] stroke-[1.5]">
                      <path d="M0,10 H40" strokeDasharray="3,3" />
                      <circle cx="20" cy="10" r="3" fill="#141F33" />
                    </svg>

                    <div className="px-2 py-1 bg-white border border-[#141F33]/10 rounded-full text-[8px] font-bold text-[#141F33]">Oracle</div>
                  </div>
                  <span className="text-[8px] font-bold text-[#141F33]/40 uppercase tracking-widest mt-3">Secure Read-Only Link</span>
                </div>

                <h3 className="text-base font-bold text-[#141F33] mb-3">SAP & Oracle Sync</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Read-only secure access to your live ERP data. Check inventory, fetch dispatch details, or answer operational logs with absolute accuracy.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-accent">
                <span>ERP Synced</span>
                <span>Active</span>
              </div>
            </div>

            {/* Card 3: HR & Work Q&A */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white mb-6">
                  <Database className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[#141F33] mb-3">HR & Operations</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Answers complex questions regarding payroll logs, annual leave balances, company regulations, and standard operational procedures instantly.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-accent">
                <span>Knowledgebase</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* -- Security & Sandboxing Details ------------------ */}
        <section className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card mb-12">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-6 h-6 text-[#141F33]" />
            <h2 className="text-lg font-bold text-[#141F33]">Data Privacy & Security Policies</h2>
          </div>
          <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed mb-6">
            SAQYN RABT indexes knowledge bases securely. Your data is isolated at the tenant level. We do not use corporate documents or ERP datasets to train public models. Role-based access ensures workers only query data they have clearances to see.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              Isolated Index Storage
            </div>
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              Role-Based Access (RBAC)
            </div>
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              SOC2 Type II Compliant
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

