import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SAQYN RABT | Staff Hub & Guest Queue Automation',
  description: "The secure, high-performance RAG-based staff knowledge hub and guest queue manager engineered for Qatar's leading hotels, clinics, and workshops.",
  keywords: ['hospitality staff hub', 'clinic queue automation', 'RAG database', 'Qatar B2B SaaS'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark-900 text-slate-100 antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
