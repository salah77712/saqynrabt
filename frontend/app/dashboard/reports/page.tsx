'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Toast } from '../../../components/ui/Toast';

export default function ReportsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerExport = (format: string) => {
    setToastMessage(`Generating custom audit report in ${format} format...`);
    
    // Simulate R2 File Export API call
    setTimeout(() => {
      setToastMessage(`Report compiled successfully. Download started.`);
    }, 1500);
  };

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Custom Analytics Reports</h1>
        <p className="text-xs text-slate-500 font-bold">Compile operations logs, user stats, and RAG knowledge traces.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">Executive Audit PDF</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Generate a formal operations PDF including current workspace metrics and redacting PII details.
            </p>
          </div>
          <Button variant="primary" className="mt-6 w-full" onClick={() => triggerExport('PDF')}>
            Export PDF Report
          </Button>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">Chat History CSV</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Export comprehensive RAG assistant transcripts to CSV formats suitable for local spreadsheet review.
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full" onClick={() => triggerExport('CSV')}>
            Export CSV Database
          </Button>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">Usage Ledger Excel</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Download monthly allocation files detailing voice minute calls and document uploads.
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full" onClick={() => triggerExport('EXCEL')}>
            Export Excel Sheet
          </Button>
        </Card>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}
