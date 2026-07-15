'use client';

import React from 'react';
import { useLocale } from '../app/providers';
import { Header } from './Header';
import { Footer } from './Footer';

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

type Localized = Record<string, string>;

export default function MinimalPage({
eyebrow,
title,
description,
sections,
cta,
jsonLd,
}: {
eyebrow?: Localized;
title: Localized;
description?: Localized;
sections?: { title: Localized; body: Localized }[];
cta?: { label: Localized; href: string };
jsonLd?: any;
}) {
const { locale } = useLocale();
const t = (obj?: Localized) => (obj ? (obj[locale] || obj.en || '') : '');

return (
<div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen bg-[#F8F9FB] text-[#141F33]">
<Header />
<main className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
{eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#141F33]">{t(eyebrow)}</p>}
<h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">{t(title)}</h1>
{description && <p className="mt-6 text-lg leading-8 text-[#141F33]/70">{t(description)}</p>}

{sections && (
<div className="mt-10 space-y-8">
{sections.map((s, i) => (
<section key={i}>
<h2 className="text-2xl font-semibold text-[#141F33]">{t(s.title)}</h2>
<p className="mt-3 text-[#141F33]/70">{t(s.body)}</p>
</section>
))}
</div>
)}

{cta && (
<div className="mt-10">
<a href={cta.href} className="inline-flex rounded-xl bg-[#141F33] px-6 py-3 text-xs font-bold text-[#F8F9FB] min-h-[44px] items-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95">
{t(cta.label)}
</a>
</div>
)}
</main>

<Footer />

{jsonLd && (
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
)}
</div>
);
}
