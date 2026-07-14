'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function TermsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">S</div>
          <div className="ml-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Connecting teams, automating workflows</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"><AlertTriangle className="w-8 h-8 text-red-500" /></div>
        <h1 className="text-2xl font-bold text-primary mb-2">Terms & conditions unavailable</h1>
        <p className="text-slate-500 mb-2">We couldn&apos;t load the terms and conditions.</p>
        <p className="text-sm text-slate-400 mb-8">Please try again or contact us for a copy.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all">Try again</button>
          <a href="/" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all">Back to Home</a>
        </div>
      </main>
    </div>
  );
}
