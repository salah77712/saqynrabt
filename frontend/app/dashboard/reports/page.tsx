'use client';

import React, { useState, useCallback } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Toast } from '../../../components/ui/Toast';

type Format = 'PDF' | 'CSV' | 'EXCEL';

export default function ReportsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
const [loading, setLoading] = useState<Format | null>(null);

const handleExport = useCallback(async (format: Format) => {
setLoading(format);
setToast(null);

try {
const token = await window.Clerk?.session?.getToken();
const res = await fetch(`/api/export-logs?format=${format?.toLowerCase()}`, {
method: 'GET',
headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});

const contentType = res.headers.get('content-type') || '';

if (contentType.includes('application/json')) {
const data = await res.json();
if (!res.ok) throw new Error(data.message || 'Export failed');
setToast({ message: data.message, type: 'success' });
} else {
const blob = await res.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `report.${format?.toLowerCase() === 'excel' ? 'xlsx' : format?.toLowerCase()}`;
document.body.appendChild(a);
a.click();
a.remove();
URL.revokeObjectURL(url);
setToast({ message: t({ en: 'File downloaded successfully.', ar: 'ØªÙ… ØªÙ†Ø²ÙŠÙ„ Ø§Ù„Ù…Ù„Ù Ø¨Ù†Ø¬Ø§Ø­.' }), type: 'success' });
}
} catch (err: unknown) {
const message = err instanceof Error ? err.message : 'Export failed';
setToast({ message, type: 'error' });
} finally {
setLoading(null);
}
}, [t]);

return (
<main id="main-content" className="p-8 space-y-6 animate-fadeIn">
<div className="mb-6">
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({en: 'Reports', ar: 'ØªÙ‚Ø§Ø±ÙŠØ± Ø§Ù„ØªØ­Ù„ÙŠÙ„Ø§Øª Ø§Ù„Ù…Ø®ØµØµØ©'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Download logs, usage stats, and chat transcripts.', ar: 'ØªØ¬Ù…ÙŠØ¹ Ø³Ø¬Ù„Ø§Øª Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª ÙˆØ¥Ø­ØµØ§Ø¦ÙŠØ§Øª Ø§Ù„Ù…Ø³ØªØ®Ø¯Ù…ÙŠÙ† ÙˆØªØªØ¨Ø¹Ø§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ©.'})}</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Card className="flex flex-col justify-between p-8">
<div>
<h3 className="text-sm font-bold text-primary dark:text-surface">{t({en: 'Executive Audit PDF', ar: 'ØªÙ‚Ø±ÙŠØ± Ø§Ù„ØªØ¯Ù‚ÙŠÙ‚ Ø§Ù„ØªÙ†ÙÙŠØ°ÙŠ PDF'})}</h3>
<p className="text-xs text-primary mt-3 leading-relaxed">
{t({en: 'Generate a formal operations PDF including current workspace metrics and redacting PII details.', ar: 'Ø¥Ù†Ø´Ø§Ø¡ PDF Ø±Ø³Ù…ÙŠ Ù„Ù„Ø¹Ù…Ù„ÙŠØ§Øª ÙŠØªØ¶Ù…Ù† Ù…Ù‚Ø§ÙŠÙŠØ³ Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„ Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ù…Ø¹ Ø¥Ø®ÙØ§Ø¡ ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ù…Ø¹Ù„ÙˆÙ…Ø§Øª Ø§Ù„Ø´Ø®ØµÙŠØ©.'})}
</p>
</div>
<Button variant="primary" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('PDF')}>
{loading === 'PDF' ? t({en: 'Exporting...', ar: 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØµØ¯ÙŠØ±...'}) : t({en: 'Export PDF Report', ar: 'ØªØµØ¯ÙŠØ± ØªÙ‚Ø±ÙŠØ± PDF'})}
</Button>
</Card>

<Card className="flex flex-col justify-between p-8">
<div>
<h3 className="text-sm font-bold text-primary dark:text-surface">{t({en: 'Chat History CSV', ar: 'Ø³Ø¬Ù„ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø§Øª CSV'})}</h3>
<p className="text-xs text-primary mt-3 leading-relaxed">
{t({en: 'Export RAG assistant transcripts to CSV formats for offline review.', ar: 'ØªØµØ¯ÙŠØ± Ù†ØµÙˆØµ Ù…Ø³Ø§Ø¹Ø¯ RAG Ø§Ù„Ø´Ø§Ù…Ù„Ø© Ø¨ØªÙ†Ø³ÙŠÙ‚ CSV Ù…Ù†Ø§Ø³Ø¨ Ù„Ù„Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„Ù…Ø­Ù„ÙŠØ©.'})}
</p>
</div>
<Button variant="ghost" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('CSV')}>
{loading === 'CSV' ? t({en: 'Exporting...', ar: 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØµØ¯ÙŠØ±...'}) : t({en: 'Export CSV Database', ar: 'ØªØµØ¯ÙŠØ± Ù‚Ø§Ø¹Ø¯Ø© Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª CSV'})}
</Button>
</Card>

<Card className="flex flex-col justify-between p-8">
<div>
<h3 className="text-sm font-bold text-primary dark:text-surface">{t({en: 'Usage Ledger Excel', ar: 'Ø¯ÙØªØ± Ø§Ù„Ø§Ø³ØªØ®Ø¯Ø§Ù… Excel'})}</h3>
<p className="text-xs text-primary mt-3 leading-relaxed">
{t({en: 'Download monthly allocation files detailing voice minute calls and document uploads.', ar: 'ØªÙ†Ø²ÙŠÙ„ Ù…Ù„ÙØ§Øª Ø§Ù„ØªØ®ØµÙŠØµ Ø§Ù„Ø´Ù‡Ø±ÙŠØ© Ø§Ù„ØªÙŠ ØªÙˆØ¶Ø­ Ø¯Ù‚Ø§Ø¦Ù‚ Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„ØµÙˆØªÙŠØ© ÙˆØ±ÙØ¹ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª.'})}
</p>
</div>
<Button variant="ghost" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('EXCEL')}>
{loading === 'EXCEL' ? t({en: 'Exporting...', ar: 'Ø¬Ø§Ø±Ù Ø§Ù„ØªØµØ¯ÙŠØ±...'}) : t({en: 'Export Excel Sheet', ar: 'ØªØµØ¯ÙŠØ± ÙˆØ±Ù‚Ø© Excel'})}
</Button>
</Card>
</div>

{toast && (
<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
)}
</main>
);
}