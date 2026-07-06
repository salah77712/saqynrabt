import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SAQYN RABT | AI Staff Hub & Guest Queue Automation',
  description: "Explore SAQYN RABT's AI-powered automation and private RAG chatbot solutions for hospitality, healthcare, and service teams across Qatar and the Middle East.",
  openGraph: {
    title: 'SAQYN RABT | AI Staff Hub & Guest Queue Automation',
    description: 'Secure AI-powered automation for guest intake, staff knowledge, and business operations.',
    url: 'https://saqynrabt.com',
    siteName: 'SAQYN RABT',
    type: 'website',
    images: [{ url: 'https://saqynrabt.com/og-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAQYN RABT | AI Staff Hub & Guest Queue Automation',
    description: 'Secure AI-powered automation for guest intake, staff knowledge, and business operations.',
    images: ['https://saqynrabt.com/og-image'],
  },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
