import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ToastProvider } from '../lib/toast';
import { GlobalToast } from '../components/GlobalToast';
import { GlobalStatusBar } from '../components/GlobalStatusBar';

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
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ToastProvider>
          <GlobalStatusBar />
          <Providers>
            {children}
          </Providers>
          <GlobalToast />
        </ToastProvider>
      </body>
    </html>
  );
}
