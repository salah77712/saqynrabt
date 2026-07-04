'use client';

import { useState } from 'react';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const categories = [
  {
    title: 'Getting Started',
    questions: [
      { q: 'How long does setup take?', a: 'Most clients are live within 5–7 business days after the onboarding call. The setup fee covers our team configuring your routing, voice scripts, and dashboard integrations.' },
      { q: 'Do I need technical skills?', a: 'No. Our team handles all configuration. You only need to attend a 1-hour training session with your staff.' },
      { q: 'What do I need to provide?', a: 'Your phone number, department list, SOP documents (for the chatbot), and any existing FAQ materials. We handle the rest.' },
      { q: 'Can I try before committing?', a: 'Yes. Book a demo and we\'ll show you a live workspace configured for your industry.' },
    ],
  },
  {
    title: 'Features & Usage',
    questions: [
      { q: 'What channels does it support?', a: 'Phone calls, WhatsApp, SMS, web chat widget, and contact forms — all from one dashboard.' },
      { q: 'What languages does it support?', a: 'Arabic and English out of the box, with additional languages available on custom plans.' },
      { q: 'Can it integrate with my existing tools?', a: 'Yes. We support CRM integrations, calendar sync, and custom API hooks on our Professional and Enterprise plans.' },
      { q: 'What counts as a text request?', a: 'Any inbound message through your website chat, WhatsApp, contact form, or SMS. Each customer message = 1 request.' },
    ],
  },
  {
    title: 'Data & Security',
    questions: [
      { q: 'Is my company data private?', a: 'Absolutely. Your documents are stored in an isolated, encrypted knowledge base. The AI model is never trained on your data.' },
      { q: 'Where is my data stored?', a: 'You can choose your data region: Middle East, Europe, or United States. We are compliant with local regulations.' },
      { q: 'Do you record calls?', a: 'Live transcripts are logged on your dashboard for audit. You control retention policies.' },
    ],
  },
  {
    title: 'Global Service',
    questions: [
      { q: 'Are you only for Qatar?', a: 'No. We are headquartered in Doha, Qatar, but we serve clients across the Middle East, Asia, Europe, Africa, and the Americas.' },
      { q: 'What currencies do you support?', a: 'We invoice in QAR, USD, EUR, and GBP. No hidden conversion fees.' },
      { q: 'Do you support multiple time zones?', a: 'Yes. Your AI front-desk operates 24/7 and handles inquiries from any time zone automatically.' },
    ],
  },
  {
    title: 'Billing & Plans',
    questions: [
      { q: 'Can I change my plan later?', a: 'Yes. Upgrade at any time mid-cycle. Downgrades take effect at the next billing date.' },
      { q: 'What happens if I exceed my limits?', a: 'Only if you enable overages. By default, the system stops at your plan limit so you never get surprise bills.' },
      { q: 'Is there a contract?', a: 'All plans are month-to-month with no long-term contract. Enterprise plans may have annual terms.' },
    ],
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          FAQ
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Everything you need to know about SAQYN RABT — from setup to global deployment.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {categories.map((cat) => (
          <div key={cat.title} className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-slate-200">{cat.title}</h2>
            <div className="space-y-3">
              {cat.questions.map((item, idx) => {
                const globalIdx = `${cat.title}-${idx}`;
                const isOpen = openIndex === idx;
                return (
                  <div key={globalIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-primary hover:bg-slate-50 transition-all"
                    >
                      <span>{item.q}</span>
                      <span className={`text-lg transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4 text-slate-500 text-sm leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
