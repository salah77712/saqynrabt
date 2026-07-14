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
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: '#F8F9FB',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              background: '#F8F9FB',
              borderRadius: '16px',
              padding: '48px',
              maxWidth: '480px',
              width: '100%',
              textAlign: 'center',
              boxShadow: '0 4px 24px rgba(20,31,51,0.08)',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              <AlertTriangle className="w-6 h-6 text-[#141F33]" />
            </div>
            <h1
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#141F33',
                marginBottom: '8px',
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(20,31,51,0.6)',
                marginBottom: '24px',
                lineHeight: 1.5,
              }}
            >
              An unexpected error occurred. Our team has been notified.
            </p>
            <button
              onClick={reset}
              style={{
                background: '#141F33',
                color: '#F8F9FB',
                border: 'none',
                borderRadius: '12px',
                padding: '12px 32px',
                fontSize: '14px',
                fontWeight: 700,
                cursor: 'pointer',
                minHeight: '44px',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}