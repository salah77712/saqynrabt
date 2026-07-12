import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAQYN RABT | AI Call Answering & Staff Knowledge Base',
  description: "SAQYN RABT handles your incoming calls, bookings, and staff questions — so your team can focus on what matters. Built in Doha, trusted across the Middle East.",
  openGraph: {
    title: 'SAQYN RABT | AI Call Answering & Staff Knowledge Base',
    description: 'Handle calls, bookings, and staff questions automatically. Built in Qatar.',
    url: 'https://saqynrabt.com',
    siteName: 'SAQYN RABT',
    type: 'website',
    images: [{ url: 'https://saqynrabt.com/og-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAQYN RABT | AI Call Answering & Staff Knowledge Base',
    description: 'Handle calls, bookings, and staff questions automatically. Built in Qatar.',
    images: ['https://saqynrabt.com/og-image'],
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
