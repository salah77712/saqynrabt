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
<span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2A5CFF] text-[#F8F9FB] text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm z-10">
{t({ en: 'Popular', ar: 'الأكثر طلباً' })}
</span>
)}

<CardHeader className="text-center border-b border-[#141F33]/10 dark:border-[#F8F9FB]/10 pb-4">
<CardTitle className="text-xl font-extrabold text-[#141F33] dark:text-[#F8F9FB]">
{isAr ? tier.nameAr : tier.name}
</CardTitle>
<p className="text-xs text-[#141F33]/60 dark:text-[#F8F9FB]/60 font-medium mt-0.5">
{isAr ? tier.descriptionAr : tier.description}
</p>
</CardHeader>

<CardContent className="flex-1">
<div className="text-center mb-5">
{isCustom(tier) ? (
<div className="text-4xl font-extrabold text-[#141F33] dark:text-[#F8F9FB]">
{t({ en: 'Custom', ar: 'مخصص' })}
</div>
) : (
<>
<div className="text-4xl font-extrabold text-[#141F33] dark:text-[#F8F9FB]">
{formatPrice(price, currency)}
<span className="text-[#141F33]/60 dark:text-[#F8F9FB]/60 text-sm font-bold mr-1">
/{t({ en: 'mo', ar: 'شهر' })}
</span>
</div>
<p className="text-[#2A5CFF] font-bold text-sm mt-1">
+ {formatPrice(setup, currency)} {t({ en: 'setup fee', ar: 'رسوم إعداد' })}
</p>
</>
)}
</div>

<ul className="flex flex-col gap-3">
{(tier.features[locale as keyof typeof tier.features] || tier.features.en).map((f, idx) => (
<li key={idx} className="flex items-center gap-4 text-[#141F33]/70 dark:text-[#F8F9FB]/70 text-sm font-medium">
<span className="text-[#2A5CFF] shrink-0">
<Check className="w-4 h-4 text-[#2A5CFF]" />
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
className="w-full border border-[#141F33]/10 dark:border-[#F8F9FB]/10 bg-[#F8F9FB] dark:bg-[#141F33] text-[#141F33] dark:text-[#F8F9FB] py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:bg-[#141F33] dark:hover:bg-[#2A5CFF] hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
>
{isAr ? tier.ctaAr : tier.cta}
</Link>
) : isPopular ? (
<a
href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
target="_blank"
rel="noopener noreferrer"
className="w-full bg-[#2A5CFF] hover:bg-[#141F33] dark:hover:bg-[#2A5CFF] text-white py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
>
{isAr ? tier.ctaAr : tier.cta}
</a>
) : (
<a
href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
target="_blank"
rel="noopener noreferrer"
className="w-full bg-[#141F33] text-[#F8F9FB] py-3 rounded-xl text-xs font-bold transition-all duration-300 min-h-[44px] hover:scale-[1.02] hover:shadow-md active:scale-95 text-center block"
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
