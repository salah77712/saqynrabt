'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';
import { FileText } from 'lucide-react';

export function ImportWizard() {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const [file, setFile] = useState<File | null>(null);
const [importing, setImporting] = useState(false);
const [success, setSuccess] = useState(false);
const [progress, setProgress] = useState(0);

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.files && e.target.files[0]) {
  setFile(e.target.files[0]);
}
};

const handleUpload = () => {
if (!file) return;
setImporting(true);
setProgress(10);

const interval = setInterval(() => {
setProgress((prev) => {
  if (prev >= 90) {
  clearInterval(interval);
  return 90;
  }
  return prev + 20;
});
}, 200);

// Simulate CSV parsing
setTimeout(() => {
clearInterval(interval);
setProgress(100);
setImporting(false);
setSuccess(true);
setFile(null);
}, 1500);
};

return (
<div className="bg-surface dark:bg-primary rounded-xl border border-primary/10 dark:border-surface/10 p-8 max-w-md w-full shadow-sm" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<h3 className="text-lg font-bold text-primary dark:text-surface mb-2">
{t('Bulk Import Operations', 'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø¯ÙØ¹Ø© ÙˆØ§Ø­Ø¯Ø©')}
</h3>
<p className="text-xs text-primary/60 dark:text-surface/60 mb-6 leading-relaxed">
{t(
'Upload a CSV file containing Employee name, email, and department to batch create member profiles.',
'Ù‚Ù… Ø¨ØªØ­Ù…ÙŠÙ„ Ù…Ù„Ù CSV ÙŠØ­ØªÙˆÙŠ Ø¹Ù„Ù‰ Ø§Ø³Ù… Ø§Ù„Ù…ÙˆØ¸Ù ÙˆØ§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ ÙˆØ§Ù„Ù‚Ø³Ù… Ù„Ø¥Ù†Ø´Ø§Ø¡ Ù…Ù„ÙØ§Øª ØªØ¹Ø±ÙŠÙ Ø§Ù„Ø£Ø¹Ø¶Ø§Ø¡ Ø¯ÙØ¹Ø© ÙˆØ§Ø­Ø¯Ø©.'
)}
</p>

{success ? (
<div className="bg-surface dark:bg-primary border border-accent/20 rounded-xl p-4 text-center mb-6">
<p className="text-sm font-bold text-accent">
{t('Import completed successfully!', 'ØªÙ… Ø§Ù„Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ø¨Ù†Ø¬Ø§Ø­!')}
</p>
<button
onClick={() => setSuccess(false)}
className="text-xs text-primary dark:text-surface underline font-bold mt-2"
>
{t('Import another file', 'Ø§Ø³ØªÙŠØ±Ø§Ø¯ Ù…Ù„Ù Ø¢Ø®Ø±')}
</button>
</div>
) : (
<div className="space-y-4">
<label className="flex flex-col items-center justify-center border-2 border-dashed border-primary/10 dark:border-surface/10 rounded-xl p-8 hover:bg-primary dark:hover:bg-accent cursor-pointer transition-all">
<FileText className="w-6 h-6 text-primary/60 dark:text-surface/60 mb-2" />
<span className="text-xs font-bold text-primary dark:text-surface">
{file ? file.name : t('Select CSV file', 'Ø§Ø®ØªØ± Ù…Ù„Ù CSV')}
</span>
<input
type="file"
accept=".csv"
onChange={handleFileChange}
className="hidden"
/>
</label>

{importing && (
<div className="w-full bg-surface dark:bg-primary rounded-full h-1.5 overflow-hidden border border-primary/10 dark:border-surface/10">
<div
className="bg-accent h-full transition-all duration-300"
style={{ width: `${progress}%` }}
/>
</div>
)}

<button
onClick={handleUpload}
disabled={!file || importing}
className="w-full bg-primary hover:bg-primary disabled:opacity-40 text-surface font-bold py-3 rounded-xl text-sm transition-all duration-300 min-h-[44px] hover:shadow-md hover:scale-[1.02] active:scale-95"
>
{importing ? t('Processing...', 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ù…Ø¹Ø§Ù„Ø¬Ø©...') : t('Upload and Process', 'ØªØ­Ù…ÙŠÙ„ ÙˆÙ…Ø¹Ø§Ù„Ø¬Ø©')}
</button>
</div>
)}

<a
href="#"
onClick={(e) => e.preventDefault()}
className="block text-center text-xs text-accent font-bold mt-4"
>
{t('Download CSV Template', 'ØªÙ†Ø²ÙŠÙ„ Ù†Ù…ÙˆØ°Ø¬ CSV')}
</a>
</div>
);
}
