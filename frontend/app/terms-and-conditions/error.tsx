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
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-[rgba(20,31,51,0.1)] bg-[#F8F9FB] backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141F33] text-sm font-semibold text-[#F8F9FB]">S</div>
          <div className="ml-3">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#141F33]">SAQYN RABT</p>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#141F33]/50">Connecting teams, automating workflows</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-20 lg:px-8 w-full text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#141F33]">
          <AlertTriangle className="w-8 h-8 text-[#141F33]" />
        </div>
        <h1 className="text-2xl font-bold text-[#141F33] mb-2">Terms & conditions unavailable</h1>
        <p className="text-[#141F33]/60 mb-2">We couldn&apos;t load the terms and conditions.</p>
        <p className="text-sm text-[#141F33]/40 mb-8">Please try again or contact us for a copy.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#141F33] px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(20,31,51,0.1)] px-6 py-3 text-sm font-semibold text-[#141F33] hover:bg-[#141F33] transition-all"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}