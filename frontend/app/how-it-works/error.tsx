'use client';

import { useEffect } from 'react';

export default function HowItWorksError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">S</div>
          <div className="ml-3"><p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p><p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Private AI operations</p></div>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-3xl">⚠️</div>
          <h1 className="text-2xl font-bold text-primary mb-2">How it works unavailable</h1>
          <p className="text-slate-500 mb-8">We couldn&apos;t load this page. Please try again.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all">Try again</button>
            <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
}
