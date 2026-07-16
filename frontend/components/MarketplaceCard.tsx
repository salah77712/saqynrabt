'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface MarketplaceCardProps {
name: string;
desc: string;
developer: string;
}

export function MarketplaceCard({ name, desc, developer }: MarketplaceCardProps) {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [installed, setInstalled] = useState(false);

return (
<div className="bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#F8F9FB]/10 rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all">
<div className="space-y-2">
<span className="text-[9px] font-extrabold text-[#2A5CFF] uppercase tracking-wider">by {developer}</span>
<h3 className="text-base font-extrabold text-[#141F33] dark:text-[#F8F9FB]">{name}</h3>
<p className="text-xs text-[#141F33]/60 dark:text-[#F8F9FB]/60 font-semibold leading-relaxed">{desc}</p>
</div>

<div className="mt-6 pt-4 border-t border-[#141F33]/10 dark:border-[#F8F9FB]/10 flex items-center justify-between">
<span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
installed ? 'bg-[#F8F9FB] dark:bg-[#141F33] text-[#141F33] dark:text-[#F8F9FB]' : 'bg-[#F8F9FB] dark:bg-[#141F33] text-[#141F33]/70 dark:text-[#F8F9FB]/70'
}`}>
{installed ? 'Active' : 'Available'}
</span>

<button
onClick={() => setInstalled(!installed)}
className={`font-bold px-4 py-2 min-h-[44px] rounded-xl text-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
installed ? 'bg-[#F8F9FB] dark:bg-[#141F33] text-[#141F33] dark:text-[#F8F9FB]' : 'bg-[#141F33] text-[#F8F9FB]'
}`}
>
{installed ? 'Uninstall' : 'Install'}
</button>
</div>
</div>
);
}
