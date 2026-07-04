'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';

const automationTiers = [
  {
    title: 'Starter',
    subtitle: 'For small front desks.',
    price: '1,499',
    setup: '1,999',
    popular: false,
    features: ['Basic call answering', '500 text requests/mo', '250 voice mins/mo', '1 department routing', 'Standard support'],
  },
  {
    title: 'Growth',
    subtitle: 'For growing operations.',
    price: '2,499',
    setup: '3,499',
    popular: true,
    features: ['Advanced call answering', '2,000 text requests/mo', '700 voice mins/mo', '3 dept routing', 'Complaint routing', 'Weekly report'],
  },
  {
    title: 'Professional',
    subtitle: 'For multi-department teams.',
    price: '4,499',
    setup: '5,999',
    popular: false,
    features: ['Advanced call answering', '5,000 text requests/mo', '1,500 voice mins/mo', '8 dept routing', 'Manager alerts', 'Priority support', '2 languages'],
  },
];

const chatbotTiers = [
  {
    title: 'Starter',
    subtitle: 'Up to 50 employees.',
    price: '2,999',
    setup: '4,999',
    popular: false,
    cta: 'Get Started',
    features: ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
  },
  {
    title: 'Growth',
    subtitle: 'Up to 150 employees.',
    price: '4,999',
    setup: '6,999',
    popular: true,
    cta: 'Get Started',
    features: ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
  },
  {
    title: 'Enterprise',
    subtitle: '151+ employees.',
    price: null,
    setup: null,
    popular: false,
    cta: 'Contact Sales',
    features: ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
  },
];

export default function PricingPage() {
  const [selected, setSelected] = useState<'monthly' | 'annual'>('monthly');
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <MarketingHeader />

      <section className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
            Transparent Pricing for Every Business
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Two products. Six tiers. No bundles, no hidden fees.
          </p>
          <div className="mt-8 inline-flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setSelected('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selected === 'monthly' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setSelected('annual')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                selected === 'annual' ? 'bg-primary text-white shadow-sm' : 'text-slate-600 hover:text-primary'
              }`}
            >
              Annual <span className="text-emerald-500 font-bold">-20%</span>
            </button>
          </div>
        </div>
      </section>

      <div className="bg-emerald-50 border-y border-emerald-200 py-4 px-6 text-center">
        <p className="text-emerald-700 font-semibold text-sm">
          ✅ No surprise bills. Fixed monthly price + one-time setup. Overages only if you enable them.
        </p>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-blue-600">
                <span className="text-2xl">📞</span>
                <div>
                  <h2 className="text-xl font-extrabold text-primary">Business Automation</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Handle calls, bookings & complaints 24/7.</p>
                </div>
                <Link href="/automation" className="ml-auto text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">
                  Learn more →
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                {automationTiers.map((tier) => (
                  <div
                    key={tier.title}
                    className={`relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
                      tier.popular ? 'border-primary/30 ring-1 ring-primary/20' : 'border-slate-200'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most popular
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-primary">{tier.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-extrabold text-primary">{tier.price}<span className="text-slate-400 text-xs ml-1 font-medium">QAR/mo</span></div>
                        <p className="text-emerald-600 text-xs font-medium mt-0.5">+ {tier.setup} QAR setup</p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                          <span className="text-emerald-500 font-bold">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 w-full bg-primary text-white py-3 rounded-lg font-medium hover:opacity-90 transition-all text-sm text-center block"
                    >
                      Book a Demo →
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-emerald-500">
                <span className="text-2xl">🧠</span>
                <div>
                  <h2 className="text-xl font-extrabold text-primary">Internal Company Chatbot</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Private RAG assistant for employees, SOPs, and HR.</p>
                </div>
                <Link href="/chatbot" className="ml-auto text-xs text-emerald-600 font-semibold hover:underline whitespace-nowrap">
                  Learn more →
                </Link>
              </div>
              <div className="flex flex-col gap-5">
                {chatbotTiers.map((tier) => (
                  <div
                    key={tier.title}
                    className={`relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
                      tier.popular ? 'border-emerald-300 ring-1 ring-emerald-200' : 'border-slate-200'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most popular
                      </span>
                    )}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-primary">{tier.title}</h3>
                        <p className="text-xs text-slate-400 mt-0.5">{tier.subtitle}</p>
                      </div>
                      <div className="text-right">
                        {tier.price ? (
                          <div className="text-2xl font-extrabold text-primary">{tier.price}<span className="text-slate-400 text-xs ml-1 font-medium">QAR/mo</span></div>
                        ) : (
                          <div className="text-2xl font-extrabold text-primary">Custom</div>
                        )}
                        <p className="text-emerald-600 text-xs font-medium mt-0.5">
                          {tier.setup ? `+ ${tier.setup} QAR setup` : 'Custom setup'}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-col gap-1.5">
                      {tier.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-slate-600 text-sm">
                          <span className="text-emerald-500 font-bold">✓</span>{f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={tier.cta === 'Contact Sales' ? '/contact' : calendlyUrl}
                      target={tier.cta === 'Contact Sales' ? undefined : '_blank'}
                      rel={tier.cta === 'Contact Sales' ? undefined : 'noopener noreferrer'}
                      className={`mt-5 w-full py-3 rounded-lg font-medium transition-all text-sm text-center block ${
                        tier.cta === 'Contact Sales'
                          ? 'bg-slate-100 text-primary hover:bg-slate-200'
                          : 'bg-primary text-white hover:opacity-90'
                      }`}
                    >
                      {tier.cta} →
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Need a custom plan?</h2>
          <p className="text-slate-500 mb-8">
            Enterprise pricing, dedicated infrastructure, custom SLAs, and tailored onboarding for larger teams.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Contact Sales
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
