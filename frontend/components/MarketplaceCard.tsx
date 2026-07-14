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
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all">
<div className="space-y-2">
<span className="text-[9px] font-extrabold text-[#2A5CFF] uppercase tracking-wider">by {developer}</span>
<h3 className="text-base font-extrabold text-[#141F33]">{name}</h3>
<p className="text-xs text-[#141F33]/60 font-semibold leading-relaxed">{desc}</p>
</div>

<div className="mt-6 pt-4 border-t border-[#141F33]/10 flex items-center justify-between">
<span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
installed ? 'bg-[#F8F9FB] text-[#141F33]' : 'bg-[#F8F9FB] text-[#141F33]/70'
}`}>
{installed ? 'Active' : 'Available'}
</span>

<button
onClick={() => setInstalled(!installed)}
className={`font-bold px-4 py-2 rounded-xl text-xs transition-all hover:scale-[1.01] hover:shadow-md ${
installed ? 'bg-[#F8F9FB] text-[#141F33]' : 'bg-[#141F33] text-[#F8F9FB]'
}`}
>
{installed ? 'Uninstall' : 'Install'}
</button>
</div>
</div>
);
}
