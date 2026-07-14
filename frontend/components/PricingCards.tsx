'use client';

import React from 'react';
import Link from 'next/link';
import type { ProductTier } from '../lib/pricing-config';
import { CheckIcon } from './ui/Icons';

interface PricingCardsProps {
  tiers: ProductTier[];
  currency: 'USD' | 'QAR';
  locale: string;
}

function formatPrice(price: number | null, currency: 'USD' | 'QAR'): string {
  if (price === null) return '';
  if (currency === 'USD') return `$${price.toLocaleString()}`;
  return `${price.toLocaleString()} QAR`;
}

export function PricingCards({ tiers, currency, locale }: PricingCardsProps) {
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const isAr = locale === 'ar';

  const isCustom = (tier: ProductTier) =>
    tier.priceUSD === null && tier.priceQAR === null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tiers.map((tier, i) => {
        const price = currency === 'USD' ? tier.priceUSD : tier.priceQAR;
        const setup = currency === 'USD' ? tier.setupUSD : tier.setupQAR;
        const customLabel = t({
          en: currency === 'USD' ? 'Custom' : 'مخصص',
          ar: currency === 'USD' ? 'مخصص' : 'Custom',
        });

        return (
          <div
            key={tier.id}
            className={`relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm card-hover flex flex-col animate-slideUp ${isCustom(tier) ? 'opacity-90' : ''}`}
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {tier.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm">
                {t({ en: 'Popular', ar: 'الأكثر طلباً' })}
              </span>
            )}

            <h3 className="text-xl font-extrabold text-[#141F33]">
              {isAr ? tier.nameAr : tier.name}
            </h3>
            <p className="text-xs text-[#718096] font-medium mt-0.5 mb-4">
              {isAr ? tier.descriptionAr : tier.description}
            </p>

            {isCustom(tier) ? (
              <>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-[#141F33]">
                    {t({ en: 'Custom', ar: 'مخصص' })}
                  </span>
                </div>
                <p className="text-[#10B981] font-bold text-sm mb-5">
                  {t({ en: 'Custom setup fee', ar: 'رسوم إعداد مخصصة' })}
                </p>
              </>
            ) : (
              <>
                <div className="mb-1">
                  <span className="text-4xl font-extrabold text-[#141F33]">
                    {formatPrice(price, currency)}
                  </span>
                  <span className="text-[#718096] text-sm font-bold mr-1">
                    /{t({ en: 'mo', ar: 'شهر' })}
                  </span>
                </div>
                <p className="text-[#10B981] font-bold text-sm mb-5">
                  + {formatPrice(setup, currency)} {t({ en: 'setup fee', ar: 'رسوم إعداد' })}
                </p>
              </>
            )}

            <ul className="flex flex-col gap-2 mb-6 flex-1">
              {tier.features[locale as keyof typeof tier.features]?.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <span className="text-[#10B981]">
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                  </span>
                  {f}
                </li>
              )) || tier.features.en.map((f, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                  <span className="text-[#10B981]">
                    <CheckIcon className="w-4 h-4 text-emerald-500" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            {isCustom(tier) ? (
              <Link
                href="/contact"
                className="w-full border border-gray-200 bg-white text-[#141F33] py-3.5 rounded-xl font-bold text-sm transition-all min-h-[44px] hover:bg-gray-50 hover:scale-[1.02] hover:shadow-lg active:scale-95 text-center block"
              >
                {isAr ? tier.ctaAr : tier.cta}
              </Link>
            ) : (
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#141F33] text-white py-3.5 rounded-xl font-bold text-sm transition-all min-h-[44px] hover:scale-[1.02] hover:shadow-lg active:scale-95 text-center block"
              >
                {isAr ? tier.ctaAr : tier.cta}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PricingCards;
