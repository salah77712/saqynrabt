'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-surface p-6">
          <div className="bg-surface rounded-2xl p-10 sm:p-12 max-w-md w-full text-center shadow-lg">
            <div className="text-5xl mb-4">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-primary mb-2">
              Something went wrong
            </h1>
            <p className="text-sm text-primary/60 mb-6 leading-relaxed">
              An unexpected error occurred. Our team has been notified.
            </p>
            <button
              onClick={reset}
              className="bg-primary text-surface rounded-xl px-8 py-3 text-sm font-bold min-h-[44px] transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
