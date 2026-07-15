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
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center px-6" dir="auto">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#141F33]">
          <AlertTriangle className="w-6 h-6 text-[#141F33]" />
        </div>
        <h1 className="text-3xl font-bold text-[#141F33] mb-4 leading-snug">
          <span lang="en">Something went wrong</span>
          <br />
          <span lang="ar" className="text-2xl font-semibold text-[#141F33]/70" dir="rtl">
            حدث خطأ غير متوقع
          </span>
        </h1>
        <p className="text-[#141F33]/60 mb-3 leading-relaxed" lang="en">
          We encountered an unexpected error. Our team has been notified. Please try again, or return to the homepage.
        </p>
        <p className="text-[#141F33]/40 mb-8 leading-relaxed text-sm" lang="ar" dir="rtl">
          حدث خطأ غير متوقع. تم إبلاغ فريقنا. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#141F33] px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all"
          >
            Try again / حاول مرة أخرى
          </button>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(20,31,51,0.1)] px-6 py-3 text-sm font-semibold text-[#141F33] hover:bg-[#141F33] transition-all"
          >
            Back to Home / العودة للرئيسية
          </a>
        </div>
      </div>
    </div>
  );
}