'use client';

import React from 'react';
import type { PricingTier } from '../lib/pricing-config';

interface PricingCardsProps {
  tiers: PricingTier[];
  ctaLabel?: string;
  ctaHref?: string;
  popularLabel?: string;
}

export function PricingCards({ tiers, ctaLabel = 'Book a Demo →', ctaHref, popularLabel = 'Most popular' }: PricingCardsProps) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  return (
    <div className="flex flex-col gap-5">
      {tiers.map((tier) => (
        <div
          key={tier.id}
          className={`relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-all ${
            tier.popular ? 'border-primary/30 ring-1 ring-primary/20' : 'border-slate-200'
          }`}
        >
          {tier.popular && (
            <span className="absolute -top-3 left-6 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {popularLabel}
            </span>
          )}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-primary">{tier.name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{tier.description}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-extrabold text-primary">{tier.priceLabel}</div>
            </div>
          </div>
          <ul className="mt-4 flex flex-col gap-1.5">
            {tier.features.map((f) => (
              <li key={f.text} className="flex items-center gap-2 text-slate-600 text-sm">
                <span className={`font-bold ${f.included ? 'text-emerald-500' : 'text-slate-300'}`}>
                  {f.included ? '✓' : '—'}
                </span>
                {f.text}
              </li>
            ))}
          </ul>
          <a
            href={ctaHref || (tier.cta === 'Contact Sales' ? '/contact' : calendlyUrl)}
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
  );
}

export default PricingCards;
