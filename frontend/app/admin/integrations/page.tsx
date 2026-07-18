'use client';

import * as React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useMergeLink } from '@mergeapi/react-merge-link';

interface IntegrationItem {
  name: string;
  type: string;
  status: 'Active' | 'Inactive';
  lastSynced: string;
}

export default function AdminIntegrationsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [integrations, setIntegrations] = React.useState<IntegrationItem[]>([
    { name: 'BambooHR', type: 'HRIS', status: 'Active', lastSynced: '2026-07-15 02:00' },
    { name: 'SAP SuccessFactors', type: 'ERP', status: 'Active', lastSynced: '2026-07-15 02:00' },
  ]);

  const [linkToken, setLinkToken] = React.useState<string>('demo-link-token-123');
  const [syncStatus, setSyncStatus] = React.useState<string>('Connected');
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = React.useState<string>('');

  // Fetch link token from backend on mount (or use fallback)
  React.useEffect(() => {
    fetch('/api/saas/integrations/create-merge-link', { method: 'POST' })
      .then((r) => r.json())
      .then((data) => {
        if (data.linkToken) setLinkToken(data.linkToken);
      })
      .catch(() => {});
  }, []);

  // Merge Link Hook Initialization
  const { open, isReady } = useMergeLink({
    linkToken,
    onSuccess: async (publicToken, metadata) => {
      setSyncStatus('Syncing...');
      try {
        const meta = metadata as any;
        const response = await fetch('/api/saas/integrations/create-merge-link', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicToken, providerName: meta?.integration?.name || 'Merge Provider' }),
        });
        if (response.ok) {
          setSyncStatus('Synced');
          setIntegrations((prev) => [
            ...prev,
            { name: meta?.integration?.name || 'New Merge Link', type: 'HRIS', status: 'Active', lastSynced: 'Just now' },
          ]);
        } else {
          setSyncStatus('Failed');
        }
      } catch {
        setSyncStatus('Failed');
      }
    },
  });

  // Manual CSV Upload Drag and Drop Handler
  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/saas/integrations/csv-upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setUploadMessage(`Success: Imported ${data.count || 0} employees.`);
        setIntegrations((prev) => [
          ...prev,
          { name: `CSV Upload (${file.name})`, type: 'Manual', status: 'Active', lastSynced: 'Just now' },
        ]);
      } else {
        const err = await response.json();
        setUploadMessage(`Error: ${err.message || 'Upload failed'}`);
      }
    } catch {
      setUploadMessage('Error: Connection error.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 lg:px-8">
        
        {/* Main Workspace Frame */}
        <div className="bg-[#F8F9FB] rounded-xl border border-primary/10 p-8 shadow-card">
          
          <div className="border-b border-primary/10 pb-6 mb-8">
            <h1 className="text-2xl font-extrabold text-primary">Connect your HR Database to Saqyn Rabt.</h1>
            <p className="text-xs text-primary/60 font-semibold mt-2">
              Sync employee records, job roles, and PTO leave structures securely via Merge Link or manual CSV uploads.
            </p>
          </div>

          {/* Current Integrations List */}
          <div className="mb-10">
            <h2 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">Active Integrations</h2>
            <div className="space-y-4">
              {integrations.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-surface border border-primary/5 rounded-xl">
                  <div>
                    <p className="text-sm font-bold text-primary">{item.name}</p>
                    <p className="text-[10px] text-primary/50 font-bold uppercase tracking-wider mt-0.5">{item.type} Integration</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold">
                      ● {item.status}
                    </span>
                    <p className="text-[9px] text-primary/40 font-semibold mt-1">Last Synced: {item.lastSynced}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Trigger Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-primary/10">
            
            {/* Left Block: Merge Connection Link */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-primary">Automated Unified API Sync</h3>
                <p className="text-xs text-primary/60 font-semibold mt-2 leading-relaxed">
                  Integrate instantly with BambooHR, Workday, SAP SuccessFactors, or Oracle HRIS using the secure Merge Link portal.
                </p>
              </div>
              
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  disabled={!isReady}
                  onClick={() => open()}
                  className="rounded-full bg-accent hover:bg-accent/90 text-white py-2.5 px-6 text-xs font-bold transition-all min-h-[44px]"
                >
                  Connect New System
                </button>
                <span className="text-[10px] text-primary/50 font-bold uppercase">Status: {syncStatus}</span>
              </div>
            </div>

            {/* Right Block: Manual CSV Fallback Drag and Drop */}
            <div>
              <h3 className="text-sm font-bold text-primary mb-3">Manual CSV Upload Fallback</h3>
              <div className="relative border-2 border-dashed border-primary/10 rounded-xl p-6 text-center hover:bg-surface transition-colors">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <svg aria-hidden="true" className="w-8 h-8 mx-auto text-primary/40 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-xs font-extrabold text-primary/70 uppercase tracking-wider">Drag and drop file here</p>
                <p className="text-[10px] text-primary/40 mt-1 font-semibold">Only .csv files supported</p>
              </div>
              
              {uploadMessage && (
                <p className="text-[10px] font-bold text-accent mt-3 uppercase tracking-wider text-center">{uploadMessage}</p>
              )}
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
