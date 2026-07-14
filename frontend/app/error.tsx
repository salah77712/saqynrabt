'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-white flex items-center justify-center px-6" dir="auto">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4 leading-snug">
          <span lang="en">Something went wrong</span>
          <br />
          <span lang="ar" className="text-2xl font-semibold text-slate-600" dir="rtl">
            حدث خطأ غير متوقع
          </span>
        </h1>
        <p className="text-slate-500 mb-2 leading-relaxed" lang="en">
          We encountered an unexpected error. Our team has been notified. Please try again, or return to the homepage.
        </p>
        <p className="text-slate-400 mb-8 leading-relaxed text-sm" lang="ar" dir="rtl">
          حدث خطأ غير متوقع. تم إبلاغ فريقنا. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Try again / حاول مرة أخرى
          </button>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-primary hover:bg-slate-50 transition-all"
          >
            Back to Home / العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}
