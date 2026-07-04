'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

export function ImportWizard() {
  const { locale } = useLocale();
  const t = (en: string, ar: string) => (locale === 'ar' ? ar : en);

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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-sm" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h3 className="text-lg font-bold text-navy mb-2">
        {t('Bulk Import Operations', 'استيراد البيانات دفعة واحدة')}
      </h3>
      <p className="text-xs text-muted mb-6 leading-relaxed">
        {t(
          'Upload a CSV file containing Employee name, email, and department to batch create member profiles.',
          'قم بتحميل ملف CSV يحتوي على اسم الموظف والبريد الإلكتروني والقسم لإنشاء ملفات تعريف الأعضاء دفعة واحدة.'
        )}
      </p>

      {success ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center mb-6">
          <p className="text-sm font-bold text-emerald-800">
            {t('Import completed successfully!', 'تم الاستيراد بنجاح!')}
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-[#141F33] underline font-bold mt-2"
          >
            {t('Import another file', 'استيراد ملف آخر')}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl p-8 hover:bg-gray-50/50 cursor-pointer transition-all">
            <span className="text-2xl mb-2">📄</span>
            <span className="text-xs font-bold text-navy">
              {file ? file.name : t('Select CSV file', 'اختر ملف CSV')}
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {importing && (
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-royal h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || importing}
            className="w-full bg-navy hover:bg-navy/90 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all"
          >
            {importing ? t('Processing...', 'جاري المعالجة...') : t('Upload and Process', 'تحميل ومعالجة')}
          </button>
        </div>
      )}

      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="block text-center text-xs text-royal font-bold mt-4"
      >
        {t('Download CSV Template', 'تنزيل نموذج CSV')}
      </a>
    </div>
  );
}
