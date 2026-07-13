'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export default function AIGovernancePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">{t({en: 'Model Oversight', ar: 'حوكمة الذكاء الاصطناعي والشفافية'})}</h1>
          <p className="text-xs text-slate-500 font-bold">{t({en: 'Track model performance, audit decisions, and check for bias.', ar: 'تتبع توافق الامتثال وتدقيق النماذج ومقاييس عدالة الأنابيب.'})}</p>
        </div>
        <Badge variant="success">{t({en: 'ISO 42001 Standard', ar: 'معيار ISO 42001'})}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">{t({en: 'Model Inventory', ar: 'جرد النماذج'})}</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'RAG Prompt Model', ar: 'نموذج استعلام RAG'})}</span>
              <span className="font-bold">gpt-4o-mini v1.2</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'Vector Embeddings', ar: 'التضمينات المتجهة'})}</span>
              <span className="font-bold">text-embedding-3-small</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">{t({en: 'Last Fine-Tuning', ar: 'آخر ضبط دقيق'})}</span>
              <span className="font-bold">2026-07-01</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">{t({en: 'Decisions Audit', ar: 'تدقيق القرارات'})}</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'Decisions Logged (90d)', ar: 'القرارات المسجلة (90 يوم)'})}</span>
              <span className="font-bold">12,400</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'Safety Policy Matches', ar: 'مطابقات سياسة السلامة'})}</span>
              <span className="font-bold text-emerald-500">{t({en: 'All Passed', ar: 'جميعها ناجحة'})}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">{t({en: 'Average Confidence', ar: 'متوسط الثقة'})}</span>
              <span className="font-bold">0.96 / 1.0</span>
            </li>
          </ul>
        </Card>

        <Card>
          <h3 className="font-bold text-navy dark:text-white text-sm mb-2">{t({en: 'Bias Evaluation', ar: 'تقييم التحيز'})}</h3>
          <ul className="space-y-2 text-xs">
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'Fairness Score', ar: 'تصنيف العدالة'})}</span>
              <span className="font-bold text-emerald-500">99.8%</span>
            </li>
            <li className="flex justify-between border-b border-gray-100 pb-1">
              <span className="text-slate-500">{t({en: 'Gender Balance', ar: 'التكافؤ بين الجنسين'})}</span>
              <span className="font-bold">{t({en: 'Neutral', ar: '1.0 (محايد)'})}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-slate-500">{t({en: 'Age Balance', ar: 'ثبات العمر'})}</span>
              <span className="font-bold">{t({en: 'Neutral', ar: '1.0 (محايد)'})}</span>
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
