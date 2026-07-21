'use client';

import { useEffect } from 'react';
import { AlertTriangle, Bug } from 'lucide-react';

export default function Error({
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
    <div className="min-h-screen bg-surface flex items-center justify-center px-6" dir="auto">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
          <AlertTriangle className="w-6 h-6 text-surface" />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-primary mb-4 leading-snug">
          <span lang="en">Something went wrong</span>
          <br />
          <span lang="ar" className="text-2xl font-semibold text-primary/70" dir="rtl">
            حدث خطأ غير متوقع
          </span>
        </h1>
        <p className="text-primary/60 mb-3 leading-relaxed" lang="en">
          We encountered an unexpected error. Our team has been notified. Please try again, or return to the homepage.
        </p>
        <p className="text-primary/40 mb-8 leading-relaxed text-sm" lang="ar" dir="rtl">
          حدث خطأ غير متوقع. تم إبلاغ فريقنا. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-surface hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
          >
            Try again / حاول مرة أخرى
          </button>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(20,31,51,0.1)] px-6 py-3 text-sm font-semibold text-primary hover:bg-primary transition-all"
          >
            Back to Home / العودة للرئيسية
          </a>
          <button
            onClick={() => {
              const body = error?.digest
                ? `Error digest: ${error.digest}\n\n${error.message || ''}`
                : error?.message || 'Unknown error';
              window.location.href = `mailto:support@saqynrabt.com?subject=Bug%20Report&body=${encodeURIComponent(body)}`;
            }}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[rgba(20,31,51,0.1)] px-6 py-3 text-sm font-semibold text-primary hover:bg-primary transition-all"
          >
            <Bug className="w-4 h-4" />
            Report this issue / ابلاغ عن مشكلة
          </button>
        </div>
      </div>
    </div>
  );
}