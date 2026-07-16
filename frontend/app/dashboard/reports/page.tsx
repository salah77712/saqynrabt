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
setToast({ message: t({ en: 'File downloaded successfully.', ar: 'تم تنزيل الملف بنجاح.' }), type: 'success' });
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
<h1 className="text-2xl font-black text-[#141F33] dark:text-[#F8F9FB]">{t({en: 'Reports', ar: 'تقارير التحليلات المخصصة'})}</h1>
<p className="text-xs text-[#141F33] font-bold">{t({en: 'Download logs, usage stats, and chat transcripts.', ar: 'تجميع سجلات العمليات وإحصائيات المستخدمين وتتبعات المعرفة.'})}</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Card className="flex flex-col justify-between">
<div>
<h3 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-base">{t({en: 'Executive Audit PDF', ar: 'تقرير التدقيق التنفيذي PDF'})}</h3>
<p className="text-xs text-[#141F33] mt-3 leading-relaxed">
{t({en: 'Generate a formal operations PDF including current workspace metrics and redacting PII details.', ar: 'إنشاء PDF رسمي للعمليات يتضمن مقاييس مساحة العمل الحالية مع إخفاء تفاصيل المعلومات الشخصية.'})}
</p>
</div>
<Button variant="default" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('PDF')}>
{loading === 'PDF' ? t({en: 'Exporting...', ar: 'جارٍ التصدير...'}) : t({en: 'Export PDF Report', ar: 'تصدير تقرير PDF'})}
</Button>
</Card>

<Card className="flex flex-col justify-between">
<div>
<h3 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-base">{t({en: 'Chat History CSV', ar: 'سجل المحادثات CSV'})}</h3>
<p className="text-xs text-[#141F33] mt-3 leading-relaxed">
{t({en: 'Export RAG assistant transcripts to CSV formats for offline review.', ar: 'تصدير نصوص مساعد RAG الشاملة بتنسيق CSV مناسب للمراجعة المحلية.'})}
</p>
</div>
<Button variant="outline" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('CSV')}>
{loading === 'CSV' ? t({en: 'Exporting...', ar: 'جارٍ التصدير...'}) : t({en: 'Export CSV Database', ar: 'تصدير قاعدة البيانات CSV'})}
</Button>
</Card>

<Card className="flex flex-col justify-between">
<div>
<h3 className="font-bold text-[#141F33] dark:text-[#F8F9FB] text-base">{t({en: 'Usage Ledger Excel', ar: 'دفتر الاستخدام Excel'})}</h3>
<p className="text-xs text-[#141F33] mt-3 leading-relaxed">
{t({en: 'Download monthly allocation files detailing voice minute calls and document uploads.', ar: 'تنزيل ملفات التخصيص الشهرية التي توضح دقائق المكالمات الصوتية ورفع المستندات.'})}
</p>
</div>
<Button variant="outline" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" disabled={loading !== null} onClick={() => handleExport('EXCEL')}>
{loading === 'EXCEL' ? t({en: 'Exporting...', ar: 'جارٍ التصدير...'}) : t({en: 'Export Excel Sheet', ar: 'تصدير ورقة Excel'})}
</Button>
</Card>
</div>

{toast && (
<Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
)}
</main>
);
}