'use client';


import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Badge } from '../../../components/ui/Badge';

export default function AIGovernancePage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

return (
  <div className="p-8 space-y-6 animate-fadeIn">
<div className="flex justify-between items-center mb-6">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({en: 'Model Oversight', ar: 'حوكمة الذكاء الاصطناعي والشفافية'})}</h1>
<p className="text-xs text-primary font-bold">{t({en: 'Track model performance, audit decisions, and check for bias.', ar: 'تتبع توافق الامتثال وتدقيق النماذج ومقاييس عدالة الأنابيب.'})}</p>
</div>
<Badge variant="success">{t({en: 'ISO 42001 Standard', ar: 'معيار ISO 42001'})}</Badge>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Model Inventory', ar: 'جرد النماذج'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'RAG Prompt Model', ar: 'نموذج استعلام RAG'})}</span>
<span className="font-bold">gpt-4o-mini v1.2</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Vector Embeddings', ar: 'التضمينات المتجهة'})}</span>
<span className="font-bold">text-embedding-3-small</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Last Fine-Tuning', ar: 'آخر ضبط دقيق'})}</span>
<span className="font-bold">2026-07-01</span>
</li>
</ul>
</Card>

<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Decisions Audit', ar: 'تدقيق القرارات'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Decisions Logged (90d)', ar: 'القرارات المسجلة (90 يوم)'})}</span>
<span className="font-bold">12,400</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Safety Policy Matches', ar: 'مطابقات سياسة السلامة'})}</span>
<span className="font-bold text-accent">{t({en: 'All Passed', ar: 'جميعها ناجحة'})}</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Average Confidence', ar: 'متوسط الثقة'})}</span>
<span className="font-bold">0.96 / 1.0</span>
</li>
</ul>
</Card>

<Card className="p-8">
<h3 className="font-bold text-navy dark:text-surface text-sm mb-2">{t({en: 'Bias Evaluation', ar: 'تقييم التحيز'})}</h3>
<ul className="space-y-2 text-xs">
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Fairness Score', ar: 'تصنيف العدالة'})}</span>
<span className="font-bold text-accent">99.8%</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-1">
<span className="text-primary">{t({en: 'Gender Balance', ar: 'التكافؤ بين الجنسين'})}</span>
<span className="font-bold">{t({en: 'Neutral', ar: '1.0 (محايد)'})}</span>
</li>
<li className="flex justify-between">
<span className="text-primary">{t({en: 'Age Balance', ar: 'ثبات العمر'})}</span>
<span className="font-bold">{t({en: 'Neutral', ar: '1.0 (محايد)'})}</span>
</li>
</ul>
</Card>
</div>
  </div>
);
}