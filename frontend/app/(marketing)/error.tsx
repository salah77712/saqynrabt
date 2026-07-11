'use client';

import { useEffect } from 'react';
import { WarningIcon } from '../../components/ui/Icons';

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
              S
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary">SAQYN RABT</p>
              <p className="text-[10px] uppercase tracking-[0.35em] text-slate-500">Private AI operations</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <WarningIcon className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-3">Something went wrong</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            We encountered an error loading this page. Please try again.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
            >
              Try again
            </button>
            <a
              href="/"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all"
            >
              Back to Home
            </a>
          </div>
          {error.digest && (
            <p className="mt-6 text-xs text-slate-400 font-mono">Error ID: {error.digest}</p>
          )}
        </div>
      </div>
    </div>
  );
}
