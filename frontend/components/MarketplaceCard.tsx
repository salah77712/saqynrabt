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
<div className="bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all">
<div className="space-y-2">
<span className="text-[9px] font-extrabold text-accent uppercase tracking-wider">by {developer}</span>
<h3 className="text-base font-extrabold text-primary dark:text-surface">{name}</h3>
<p className="text-xs text-primary/60 dark:text-surface/60 font-semibold leading-relaxed">{desc}</p>
</div>

<div className="mt-6 pt-4 border-t border-primary/10 dark:border-surface/10 flex items-center justify-between">
<span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
installed ? 'bg-surface dark:bg-primary text-primary dark:text-surface' : 'bg-surface dark:bg-primary text-primary/70 dark:text-surface/70'
}`}>
{installed ? 'Active' : 'Available'}
</span>

<button
onClick={() => setInstalled(!installed)}
className={`font-bold px-4 py-2 min-h-[44px] rounded-xl text-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md ${
installed ? 'bg-surface dark:bg-primary text-primary dark:text-surface' : 'bg-primary text-surface'
}`}
>
{installed ? 'Uninstall' : 'Install'}
</button>
</div>
</div>
);
}
