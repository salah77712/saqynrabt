'use client';

import Link from 'next/link';
import { MarketingHeader } from '../../components/MarketingHeader';
import { Footer } from '../../components/Footer';
import { PricingCards } from '../../components/PricingCards';
import { PRICING_TIERS } from '../../lib/pricing-config';

export default function PricingPage() {
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
            Three tiers. Unlimited potential. No hidden fees.
          </p>
        </div>
      </section>

      <div className="bg-emerald-50 border-y border-emerald-200 py-4 px-6 text-center">
        <p className="text-emerald-700 font-semibold text-sm">
          ✅ No surprise bills. Fixed monthly price. Overages only if you enable them.
        </p>
      </div>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b-2 border-blue-600">
            <span className="text-2xl">📞</span>
            <div>
              <h2 className="text-xl font-extrabold text-primary">Platform Pricing</h2>
              <p className="text-xs text-slate-400 mt-0.5">Call automation, chatbot RAG, and team management.</p>
            </div>
            <Link href="/features" className="ml-auto text-xs text-blue-600 font-semibold hover:underline whitespace-nowrap">
              View features →
            </Link>
          </div>
          <PricingCards tiers={PRICING_TIERS} />
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
