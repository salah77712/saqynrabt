'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Toast } from '../../../components/ui/Toast';

export default function ReportsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerExport = (format: string) => {
    setToastMessage(t({en: `Generating custom audit report in ${format} format...`, ar: `جارٍ إنشاء تقرير التدقيق المخصص بتنسيق ${format}...`}));

    setTimeout(() => {
      setToastMessage(t({en: 'Report compiled successfully. Download started.', ar: 'تم تجميع التقرير بنجاح. بدأ التنزيل.'}));
    }, 1500);
  };

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#141F33] dark:text-white">{t({en: 'Custom Analytics Reports', ar: 'تقارير التحليلات المخصصة'})}</h1>
        <p className="text-xs text-slate-500 font-bold">{t({en: 'Compile operations logs, user stats, and RAG knowledge traces.', ar: 'تجميع سجلات العمليات وإحصائيات المستخدمين وتتبعات المعرفة.'})}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">{t({en: 'Executive Audit PDF', ar: 'تقرير التدقيق التنفيذي PDF'})}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {t({en: 'Generate a formal operations PDF including current workspace metrics and redacting PII details.', ar: 'إنشاء PDF رسمي للعمليات يتضمن مقاييس مساحة العمل الحالية مع إخفاء تفاصيل المعلومات الشخصية.'})}
            </p>
          </div>
          <Button variant="primary" className="mt-6 w-full" onClick={() => triggerExport('PDF')}>
            {t({en: 'Export PDF Report', ar: 'تصدير تقرير PDF'})}
          </Button>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">{t({en: 'Chat History CSV', ar: 'سجل المحادثات CSV'})}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {t({en: 'Export comprehensive RAG assistant transcripts to CSV formats suitable for local spreadsheet review.', ar: 'تصدير نصوص مساعد RAG الشاملة بتنسيق CSV مناسب للمراجعة المحلية.'})}
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full" onClick={() => triggerExport('CSV')}>
            {t({en: 'Export CSV Database', ar: 'تصدير قاعدة البيانات CSV'})}
          </Button>
        </Card>

        <Card className="flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-navy dark:text-white text-base">{t({en: 'Usage Ledger Excel', ar: 'دفتر الاستخدام Excel'})}</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              {t({en: 'Download monthly allocation files detailing voice minute calls and document uploads.', ar: 'تنزيل ملفات التخصيص الشهرية التي توضح دقائق المكالمات الصوتية ورفع المستندات.'})}
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full" onClick={() => triggerExport('EXCEL')}>
            {t({en: 'Export Excel Sheet', ar: 'تصدير ورقة Excel'})}
          </Button>
        </Card>
      </div>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </main>
  );
}
