'use client';

import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const steps = [
  { step: '01', title: 'Book a Discovery Call', desc: 'Schedule a 15-minute call with our team. We learn about your operations, pain points, and goals.' },
  { step: '02', title: 'We Configure Your Workspace', desc: 'Our team sets up your department routing rules, voice scripts, knowledge base, and integrations. No effort required from you.' },
  { step: '03', title: 'Team Training (1 Hour)', desc: 'We walk your team through the dashboard, answer questions, and ensure everyone is comfortable with the system.' },
  { step: '04', title: 'Go Live', desc: 'Within 5–7 business days, your AI front-desk is operational. We monitor the first 48 hours to catch any edge cases.' },
  { step: '05', title: 'Ongoing Optimization', desc: 'We review transcripts, update your knowledge base, and refine routing rules monthly. Your system gets smarter over time.' },
];

const global = [
  { flag: '🌍', title: 'Global Reach', desc: 'Headquartered in Doha, Qatar — serving clients across the Middle East, Asia, Europe, Africa, and the Americas.' },
  { flag: '🕐', title: '24/7 Across Time Zones', desc: 'Your AI front-desk never sleeps. Handle inquiries from any time zone without hiring night staff.' },
  { flag: '🌐', title: 'Multi-Language by Default', desc: 'Arabic, English, and more — your AI speaks your customers\' language, wherever they are.' },
  { flag: '💰', title: 'Multi-Currency Billing', desc: 'Invoiced in QAR, USD, EUR, or GBP. No hidden conversion fees.' },
  { flag: '📦', title: 'Data Residency Options', desc: 'Choose your data region: Middle East, Europe, or United States. Compliance-ready for local regulations.' },
];

export default function HowItWorksPage() {
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          How It Works
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          From First Call to Live Operations in 5 Days
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          Simple setup, minimal training, immediate impact — anywhere in the world.
        </p>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-8">
            {steps.map((s) => (
              <div key={s.step} className="flex items-start gap-6 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-1">{s.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">Global by Design</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {global.map((g) => (
              <div key={g.title} className="border border-slate-200 rounded-2xl p-6 shadow-sm">
                <span className="text-3xl mb-3 block">{g.flag}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{g.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Start Your Journey Today</h2>
          <p className="text-blue-100 mb-8">From Doha to the world — let&apos;s build your AI operations.</p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-white text-primary px-6 py-3 text-sm font-semibold hover:bg-blue-50 transition-all"
          >
            Book a Demo
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
