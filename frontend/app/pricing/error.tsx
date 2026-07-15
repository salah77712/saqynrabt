'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function PricingError({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => { console.error(error); }, [error]);

return (
<div className="min-h-screen bg-[#F8F9FB] flex flex-col">
<header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10 bg-[#F8F9FB] backdrop-blur-xl">
<div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
<div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141F33] text-sm font-semibold text-[#F8F9FB]">S</div>
<div className="ml-3">
<p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
<p className="text-[10px] uppercase tracking-[0.35em] text-[#141F33]">Connecting teams, automating workflows</p>
</div>
</div>
</header>
<main className="flex-1 flex items-center justify-center px-6 py-20">
<div className="text-center max-w-md">
<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F9FB]"><AlertTriangle className="w-6 h-6 text-[#141F33]" /></div>
<h1 className="text-2xl font-bold text-primary mb-2">Pricing information unavailable</h1>
<p className="text-[#141F33] mb-2">We couldn&apos;t load our pricing plans right now.</p>
<p className="text-sm text-[#141F33]/60 mb-8">Please try again or contact us for pricing details.</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#141F33] px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all">Try again</button>
<a href="/contact" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#141F33]/20 px-6 py-3 text-sm font-semibold text-[#141F33] hover:bg-[#F8F9FB] transition-all">Contact us</a>
</div>
</div>
</main>
</div>
);
}
