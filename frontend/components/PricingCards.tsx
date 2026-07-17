'use client';

import React from 'react';
import Link from 'next/link';
import type { ProductTier } from '../lib/pricing-config';
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shadcn/card';
import { cn } from '@/lib/utils';

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
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
{tiers.map((tier, i) => {
const price = currency === 'USD' ? tier.priceUSD : tier.priceQAR;
const setup = currency === 'USD' ? tier.setupUSD : tier.setupQAR;
const isPopular = tier.popular;

return (
<Card
key={tier.id}
className={cn(
'relative flex flex-col animate-slideUp transition-all duration-300 hover:shadow-xl hover:-translate-y-1 !overflow-visible',
isCustom(tier) && 'opacity-90',
isPopular && 'ring-2 ring-[#2A5CFF] shadow-lg scale-[1.02] z-10'
)}
style={{ animationDelay: `${i * 0.1}s` }}
>
{isPopular && (
<span className="absolute -top-3 start-1/2 -translate-x-1/2 bg-accent text-surface text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm z-10">
{t({ en: 'Popular', ar: 'Ø§Ù„Ø£ÙƒØ«Ø± Ø·Ù„Ø¨Ø§Ù‹' })}
</span>
)}

<CardHeader className="text-center border-b border-primary/10 dark:border-surface/10 pb-4">
<CardTitle className="text-xl font-extrabold text-primary dark:text-surface">
{isAr ? tier.nameAr : tier.name}
</CardTitle>
<p className="text-xs text-primary/60 dark:text-surface/60 font-medium mt-0.5">
{isAr ? tier.descriptionAr : tier.description}
</p>
</CardHeader>

<CardContent className="flex-1">
<div className="text-center mb-5">
{isCustom(tier) ? (
<div className="text-4xl font-extrabold text-primary dark:text-surface">
{t({ en: 'Custom', ar: 'Ù…Ø®ØµØµ' })}
</div>
) : (
<>
<div className="text-4xl font-extrabold text-primary dark:text-surface">
{formatPrice(price, currency)}
<span className="text-primary/60 dark:text-surface/60 text-sm font-bold me-1">
/{t({ en: 'mo', ar: 'Ø´Ù‡Ø±' })}
</span>
</div>
<p className="text-accent font-bold text-sm mt-1">
+ {formatPrice(setup, currency)} {t({ en: 'setup fee', ar: 'Ø±Ø³ÙˆÙ… Ø¥Ø¹Ø¯Ø§Ø¯' })}
</p>
</>
)}
</div>

<ul className="flex flex-col gap-3">
{(tier.features[locale as keyof typeof tier.features] || tier.features.en).map((f, idx) => (
<li key={idx} className="flex items-center gap-4 text-primary/70 dark:text-surface/70 text-sm font-medium">
<span className="text-accent shrink-0">
<Check className="w-4 h-4 text-accent" />
</span>
{f}
</li>
))}
</ul>
</CardContent>

<CardFooter className="px-0 pb-0 pt-4 flex-col">
{isCustom(tier) ? (
<Link
href="/contact"
className="w-full border border-primary/10 dark:border-surface/10 bg-surface dark:bg-primary text-primary dark:text-surface py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:bg-primary dark:hover:bg-accent hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
>
{isAr ? tier.ctaAr : tier.cta}
</Link>
) : isPopular ? (
<a
href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
target="_blank"
rel="noopener noreferrer"
className="w-full bg-accent hover:bg-primary dark:hover:bg-accent text-white py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
>
{isAr ? tier.ctaAr : tier.cta}
</a>
) : (
<a
href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
target="_blank"
rel="noopener noreferrer"
className="w-full bg-primary text-surface py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
>
{isAr ? tier.ctaAr : tier.cta}
</a>
)}
</CardFooter>
</Card>
);
})}
</div>
);
}

export default PricingCards;
