import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Providers } from './providers';
import { ToastProvider } from '../lib/toast';
import { GlobalToast } from '../components/GlobalToast';
import { KeyboardShortcutsBar } from '../components/KeyboardShortcutsBar';
import { OfflineBanner } from '../components/OfflineBanner';
import { PageTransitionWrapper } from '../components/PageTransitionWrapper';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { AnalyticsGate } from './analytics-gate';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'SAQYN RABT | Staff Hub & Guest Queue Automation',
  description: "The secure, high-performance RAG-based staff knowledge hub and guest queue manager engineered for leading hotels, clinics, and workshops worldwide.",
  metadataBase: new URL('https://saqynrabt.com'),
  keywords: ['hospitality staff hub', 'clinic queue automation', 'RAG database', 'B2B SaaS', 'AI front desk', 'private chatbot', 'global operations'],
  openGraph: {
    title: 'SAQYN RABT | Staff Hub & Guest Queue Automation',
    description: "Secure AI-powered automation for guest intake, staff knowledge, and business operations.",
    url: 'https://saqynrabt.com',
    siteName: 'SAQYN RABT',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://saqynrabt.com/og-image', width: 1200, height: 630, alt: 'SAQYN RABT social preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAQYN RABT | Staff Hub & Guest Queue Automation',
    description: "Secure AI-powered automation for guest intake, staff knowledge, and business operations.",
    images: ['https://saqynrabt.com/og-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://saqynrabt.com',
    languages: {
      'en': 'https://saqynrabt.com',
      'ar': 'https://saqynrabt.com/ar',
      'fr': 'https://saqynrabt.com/fr',
      'hi': 'https://saqynrabt.com/hi',
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('saqyn-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var l=localStorage.getItem('saqyn-locale')||'en';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'SAQYN RABT',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web & Mobile',
              description: 'Secure AI-powered automation for guest intake, staff knowledge, and business operations.',
              url: 'https://saqynrabt.com',
  offers: {
        '@type': 'Offer',
        price: '1499',
        priceCurrency: 'QAR',
      },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
          Skip to content
        </a>
        <AnalyticsGate />
        <ToastProvider>
          <OfflineBanner />
          <KeyboardShortcutsBar />
          <Providers>
            <main id="main-content" tabIndex={-1}>
              <PageTransitionWrapper>
                {children}
              </PageTransitionWrapper>
            </main>
          </Providers>
          <GlobalToast />
          <CookieConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
