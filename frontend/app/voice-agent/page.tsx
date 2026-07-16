'use client';

import * as React from 'react';
import Link from 'next/link';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Phone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function VoiceAgentPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      {/* ── Main Hero Container with 4px border top ─────────── */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:px-8">
        
        <div className="border-t-4 border-[#2A5CFF] rounded-xl bg-white shadow-card p-8 lg:p-12 mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2A5CFF]/10 text-[#2A5CFF] text-[10px] font-bold uppercase tracking-wider mb-6">
              ● AI Voice Agent Deep Dive
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#141F33] tracking-tight leading-tight">
              Never Miss a Call Again. AI that speaks, routes, and escalates.
            </h1>
            <p className="mt-6 text-sm md:text-base text-[#141F33]/70 font-semibold leading-relaxed">
              Connect your company's phone trunks and hotline numbers directly to SAQYN RABT. Our human-like voice synthesizer interacts with guests, identifies intent, schedules calendar items, and handles escalations.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pricing"
                className="bg-[#141F33] hover:bg-[#141F33]/90 text-[#F8F9FB] text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center shadow-sm"
              >
                View Voice Pricing
              </Link>
              <Link
                href="/contact"
                className="bg-transparent border border-[#141F33]/15 text-[#141F33] hover:bg-[#141F33]/5 text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 min-h-[44px] flex items-center"
              >
                Request Voice Sandbox Access &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* ── Feature Grid ─────────────────────────────────── */}
        <section className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-[#141F33]">
              Core Capabilities & Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1: Smart Answering */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2A5CFF] flex items-center justify-center text-white mb-6">
                  <Phone className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[#141F33] mb-3">Natural Voice AI</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Handles inbound calls with human-like tone, natural inflections, and zero latency. Speaks both Arabic and English natively.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#2A5CFF]">
                <span>24/7 Operations</span>
                <span>Active</span>
              </div>
            </div>

            {/* Card 2: Workflow Routing */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2A5CFF] flex items-center justify-center text-white mb-6">
                  <Zap className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[#141F33] mb-3">Intelligent Routing</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Instantly routes calls to the right department or logs service tickets in your CRM or ERP system automatically.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#2A5CFF]">
                <span>CRM & ERP Sync</span>
                <span>Active</span>
              </div>
            </div>

            {/* Card 3: Escalation */}
            <div className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#2A5CFF] flex items-center justify-center text-white mb-6">
                  <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-[#141F33] mb-3">Smart Human Escalation</h3>
                <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">
                  Detects frustrated caller tones or complex workflows and instantly transfers to a live human agent with call transcripts.
                </p>
              </div>
              <div className="border-t border-[#141F33]/10 mt-6 pt-4 flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#2A5CFF]">
                <span>Tone Analytics</span>
                <span>Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Technical Overview ───────────────────────────── */}
        <section className="bg-white border border-[#141F33]/10 rounded-xl p-8 shadow-card mb-12">
          <h2 className="text-lg font-bold text-[#141F33] mb-4">Security & Latency Standards</h2>
          <p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed mb-6">
            All calls are routed securely through regional telecom nodes. Audio encryption is enforced end-to-end, compliant with local operations regulations. Under 150ms speech-to-speech response latency ensures smooth conversation.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              SIP Trunking Supported
            </div>
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              End-to-End TLS Encryption
            </div>
            <div className="bg-[#F8F9FB] rounded-full px-4 py-2 border border-[#141F33]/10 text-[10px] font-bold text-[#141F33]/60 uppercase">
              GDPR & HIPAA Compliant Logs
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
