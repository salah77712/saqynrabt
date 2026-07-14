'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function SettingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error(error); }, [error]);

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50"><AlertTriangle className="w-6 h-6 text-red-500" /></div>
        <h2 className="text-2xl font-bold text-primary mb-2">Settings didn't load</h2>
        <p className="text-slate-500 mb-2">Your settings page had a hiccup.</p>
        <p className="text-sm text-slate-400 mb-8">Your preferences are saved. Try again to view them.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all">Try again</button>
          <a href="/dashboard" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all">Back to Dashboard</a>
        </div>
      </div>
    </div>
  );
}
