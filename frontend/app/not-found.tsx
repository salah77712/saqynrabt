'use client';

import { MarketingHeader } from '../components/MarketingHeader';
import { Footer } from '../components/Footer';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col font-sans">
      <MarketingHeader />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-md">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <p className="text-slate-600 text-lg mb-8">Page not found</p>
          <a
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition-all"
          >
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
