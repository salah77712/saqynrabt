import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAQYN RABT | AI-Powered Staff Hub & Guest Intake',
  description: "SAQYN RABT helps teams manage incoming requests, staff knowledge, and daily operations — so your team can focus on what matters. Built for global operations.",
  openGraph: {
    title: 'SAQYN RABT | AI-Powered Staff Hub & Guest Intake',
    description: 'Streamline guest intake, staff knowledge, and daily operations with AI-powered tools.',
    url: 'https://saqynrabt.com',
    siteName: 'SAQYN RABT',
    type: 'website',
    images: [{ url: 'https://saqynrabt.com/og-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAQYN RABT | AI-Powered Staff Hub & Guest Intake',
    description: 'Streamline guest intake, staff knowledge, and daily operations with AI-powered tools.',
    images: ['https://saqynrabt.com/og-image'],
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
