import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Providers } from './providers';
import { ToastProvider } from '../lib/toast';
import { GlobalToast } from '../components/GlobalToast';
import { GlobalStatusBar } from '../components/GlobalStatusBar';
import { CookieConsentBanner } from '../components/CookieConsentBanner';
import { AnalyticsGate } from './analytics-gate';

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
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
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
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <AnalyticsGate />
        <ToastProvider>
          <GlobalStatusBar />
          <Providers>
            {children}
          </Providers>
          <GlobalToast />
          <CookieConsentBanner />
        </ToastProvider>
      </body>
    </html>
  );
}
