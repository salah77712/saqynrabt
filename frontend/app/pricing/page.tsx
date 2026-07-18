'use client';

import { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  // State management for automated sync toggles
  const [voiceSync, setVoiceSync] = useState<boolean>(false);
  const [workSync, setWorkSync] = useState<boolean>(false);

  // State management for employee sizes
  const [voiceEmployees, setVoiceEmployees] = useState<number>(50);
  const [workEmployees, setWorkEmployees] = useState<number>(50);

  // Calculated prices
  const baseVoicePrice = 2999;
  const baseWorkPrice = 4999;

  const currentVoicePrice = baseVoicePrice + (voiceSync ? 999 : 0);
  const currentWorkPrice = baseWorkPrice + (workSync ? 1999 : 0);

  // Check if checkout is disabled due to overage (>150 employees and Automated Sync active)
  const isVoiceDisabled = voiceSync && voiceEmployees > 150;
  const isWorkDisabled = workSync && workEmployees > 150;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 text-center">
        
        {/* Pricing Header */}
        <div className="mb-16">
          <span className="inline-block bg-primary/5 border border-primary/15 text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Transparent Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight max-w-2xl mx-auto">
            Pick the Synthetiq engine that fits your business scale
          </h1>
          <p className="mt-4 text-xs md:text-sm text-primary/60 font-semibold max-w-xl mx-auto">
            Simple monthly flat rates. Setup fees apply for direct hotline trunk provisioning and DB mapping.
          </p>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left items-stretch">
          
          {/* Card 1: Synthetiq Voice Core */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl shadow-card p-8 flex flex-col justify-between relative">
            <div>
              <div className="pb-6 border-b border-primary/10">
                <h3 className="text-xl font-bold text-primary">Synthetiq Voice Core</h3>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">AI Call Agent</p>
                
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{currentVoicePrice.toLocaleString()} QAR</span>
                  <span className="text-xs text-primary/60 font-bold">/mo</span>
                </div>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">+ 4,999 QAR setup fee</p>
              </div>

              {/* Sync Add-On Toggle */}
              <div className="mt-6 p-4 bg-surface rounded-xl border border-primary/5">
                <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2.5">Want to automate data sync?</p>
                <div className="flex bg-primary/5 p-0.5 rounded-full border border-primary/10">
                  <button
                    type="button"
                    onClick={() => setVoiceSync(false)}
                    className={`flex-1 rounded-full py-1 text-[10px] font-bold transition-all duration-200 ${
                      !voiceSync ? 'bg-primary text-surface' : 'text-primary'
                    }`}
                  >
                    Manual CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => setVoiceSync(true)}
                    className={`flex-1 rounded-full py-1 text-[10px] font-bold transition-all duration-200 ${
                      voiceSync ? 'bg-primary text-surface' : 'text-primary'
                    }`}
                  >
                    API Sync (+999)
                  </button>
                </div>
              </div>

              {/* Employee Limit Input Validator */}
              <div className="mt-4 flex flex-col gap-1">
                <label htmlFor="voice-employee-count" className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Number of employees</label>
                <input
                  id="voice-employee-count"
                  type="number"
                  min="1"
                  value={voiceEmployees}
                  onChange={(e) => setVoiceEmployees(Number(e.target.value))}
                  className="max-w-[80px] bg-surface border border-primary/10 rounded-full px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#2A5CFF]"
                />
              </div>

              {/* Features List */}
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>24/7 AI Call Answering & Synthesizer</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Workflow & Department Routing</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Smart Tone-based Escalation Loop</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={isVoiceDisabled}
              className={`w-full py-3.5 text-xs font-bold text-surface rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                isVoiceDisabled
                  ? 'bg-primary opacity-50 pointer-events-none'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isVoiceDisabled ? 'Contact Saqyn Rabt for Enterprise quote' : 'Get Started with Voice'}
            </button>
          </div>

          {/* Card 2: Synthetiq Work Core */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl shadow-card p-8 flex flex-col justify-between relative">
            <div>
              <div className="pb-6 border-b border-primary/10">
                <h3 className="text-xl font-bold text-primary">Synthetiq Work Core</h3>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">HR & Policy Chatbot</p>
                
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{currentWorkPrice.toLocaleString()} QAR</span>
                  <span className="text-xs text-primary/60 font-bold">/mo</span>
                </div>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">+ 6,999 QAR setup fee</p>
              </div>

              {/* Sync Add-On Toggle */}
              <div className="mt-6 p-4 bg-surface rounded-xl border border-primary/5">
                <p className="text-[10px] font-extrabold text-primary uppercase tracking-wider mb-2.5">Want to automate data sync?</p>
                <div className="flex bg-primary/5 p-0.5 rounded-full border border-primary/10">
                  <button
                    type="button"
                    onClick={() => setWorkSync(false)}
                    className={`flex-1 rounded-full py-1 text-[10px] font-bold transition-all duration-200 ${
                      !workSync ? 'bg-primary text-surface' : 'text-primary'
                    }`}
                  >
                    Manual CSV
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkSync(true)}
                    className={`flex-1 rounded-full py-1 text-[10px] font-bold transition-all duration-200 ${
                      workSync ? 'bg-primary text-surface' : 'text-primary'
                    }`}
                  >
                    API Sync (+1,999)
                  </button>
                </div>
              </div>

              {/* Employee Limit Input Validator */}
              <div className="mt-4 flex flex-col gap-1">
                <label htmlFor="work-employee-count" className="text-[10px] font-extrabold text-primary uppercase tracking-wider">Number of employees</label>
                <input
                  id="work-employee-count"
                  type="number"
                  min="1"
                  value={workEmployees}
                  onChange={(e) => setWorkEmployees(Number(e.target.value))}
                  className="max-w-[80px] bg-surface border border-primary/10 rounded-full px-3 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#2A5CFF]"
                />
              </div>

              {/* Features List */}
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Real-time PTO & Leave Balances Sync</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Role & Designation Org Directory</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Unlimited Handbook & Policy RAG Q&A</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              disabled={isWorkDisabled}
              className={`w-full py-3.5 text-xs font-bold text-surface rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center ${
                isWorkDisabled
                  ? 'bg-primary opacity-50 pointer-events-none'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isWorkDisabled ? 'Contact Saqyn Rabt for Enterprise quote' : 'Get Started with Work'}
            </button>
          </div>

          {/* Card 3: Saqyn Rabt Enterprise Bundle */}
          <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl shadow-card p-8 flex flex-col justify-between ring-2 ring-[#2A5CFF] relative">
            {/* Absolute Recommended badge */}
            <div className="absolute top-4 end-6 bg-accent text-surface rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider select-none shadow-sm">
              Recommended
            </div>

            <div>
              <div className="pb-6 border-b border-primary/10">
                <h3 className="text-xl font-bold text-primary">Saqyn Rabt Enterprise</h3>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">Full Automation Suite</p>
                
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">Custom Quote</span>
                </div>
                <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-1">Enterprise scale integrations</p>
              </div>

              {/* Employee Limit Disclaimer */}
              <div className="mt-6 p-4 bg-surface rounded-xl border border-primary/5">
                <p className="text-[10px] font-semibold text-primary/70 leading-relaxed">
                  Required for database scale operations with more than 150 active employees.
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 my-8">
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Synthetiq Voice + Synthetiq Work</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Dedicated Integration Success Manager</span>
                </li>
                <li className="flex items-start gap-3 text-xs font-semibold text-primary/80">
                  <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span>Bespoke Database & SSO Custom Link</span>
                </li>
              </ul>
            </div>

            <Link
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-surface text-xs font-bold py-3.5 text-center rounded-full transition-all duration-200 min-h-[44px] flex items-center justify-center shadow-sm"
            >
              Contact Enterprise Sales
            </Link>
          </div>

        </div>

        {/* Bottom Employee Size Limit Notice */}
        <div className="bg-[#F8F9FB] border border-primary/10 rounded-xl p-6 shadow-sm mt-16 max-w-3xl mx-auto flex items-center justify-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span className="text-xs font-bold text-primary/60 uppercase tracking-wider">
            Work plan covers up to 150 employees. For 150+ employees, please contact us for an Enterprise quote.
          </span>
        </div>

      </main>

      <Footer />
    </div>
  );
}
