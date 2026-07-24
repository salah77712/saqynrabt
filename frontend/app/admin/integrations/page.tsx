'use client';

import * as React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

interface IntegrationItem {
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  lastSynced: string;
}

export default function AdminIntegrationsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [integrations] = React.useState<IntegrationItem[]>([]);

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 lg:px-8">
        
        {/* Main Workspace Frame */}
        <div className="bg-background rounded-xl border border-primary/10 p-8 shadow-card">
          
          <div className="border-b border-primary/10 pb-6 mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-primary">Connect your HR Database to Saqyn Rabt.</h1>
            <p className="text-xs text-primary/60 font-semibold mt-2">
              Sync employee records, job roles, and PTO leave structures securely via Merge Link or manual CSV uploads.
            </p>
          </div>

          {/* Empty State */}
          <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
            <p className="text-sm font-bold text-primary/60">{t({ en: 'No integrations configured yet.', ar: 'لا توجد تكاملات مكونة بعد.' })}</p>
            <p className="text-xs text-primary/40 mt-2">{t({ en: 'Integrations will appear here once configured during pilot phase.', ar: 'ستظهر التكاملات هنا بعد التكوين خلال المرحلة التجريبية.' })}</p>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
