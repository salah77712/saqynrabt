'use client';

import { useEffect } from 'react';

export default function DashboardError({
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
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <span className="text-3xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold text-primary mb-3">Dashboard error</h2>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Something went wrong loading this section. Your data is safe.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Try again
          </button>
          <a
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all"
          >
            Back to Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
