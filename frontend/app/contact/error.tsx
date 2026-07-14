'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ContactError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[#141F33]/10/80 bg-[#F8F9FB]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-[#F8F9FB]">S</div>
          <div className="ml-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#141F33]">Private AI operations</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#141F33]/5"><AlertTriangle className="w-6 h-6 text-[#141F33]" /></div>
        <h1 className="text-2xl font-bold text-primary mb-2">Contact page unavailable</h1>
        <p className="text-[#141F33] mb-2">We couldn&apos;t load the contact form.</p>
        <p className="text-sm text-[#141F33]/40 mb-8">Please email us directly at saqynrabt@gmail.com while we fix this.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all">Try again</button>
          <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#141F33]/20 px-6 py-3 text-sm font-semibold text-primary hover:bg-[#F8F9FB] transition-all">Back to Home</a>
        </div>
      </main>
    </div>
  );
}
