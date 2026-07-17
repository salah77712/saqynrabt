'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';

interface CustomField {
id: string;
name: string;
type: 'text' | 'number' | 'boolean';
}

export function CustomFieldBuilder() {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const [fields, setFields] = useState<CustomField[]>([
{ id: '1', name: 'Customer ID', type: 'text' },
{ id: '2', name: 'Order Number', type: 'number' },
]);

const [newFieldName, setNewFieldName] = useState('');
const [newFieldType, setNewFieldType] = useState<CustomField['type']>('text');

const handleAddField = () => {
if (!newFieldName.trim()) return;
const newField: CustomField = {
  id: Date.now().toString(),
  name: newFieldName.trim(),
  type: newFieldType,
};
setFields((prev) => [...prev, newField]);
setNewFieldName('');
};

const handleRemoveField = (id: string) => {
setFields((prev) => prev.filter((f) => f.id !== id));
};

return (
<div className="bg-[#F8F9FB] dark:bg-[#141F33] rounded-xl border border-[#141F33]/10 dark:border-[#F8F9FB]/10 p-8 max-w-md w-full shadow-sm" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<h3 className="text-lg font-bold text-[#141F33] dark:text-[#F8F9FB] mb-2">
{t('Custom Form Fields', 'حقول مخصصة للنماذج')}
</h3>
<p className="text-xs text-[#141F33]/60 dark:text-[#F8F9FB]/60 mb-6 leading-relaxed">
{t(
'Customize metadata requirements for automation entries or staff logs.',
'تخصيص متطلبات البيانات الإضافية لمدخلات الأتمتة أو سجلات الموظفين.'
)}
</p>

{/* Field List */}
<div className="space-y-2 mb-6">
{fields.map((f) => (
<div key={f.id} className="flex items-center justify-between border border-[#141F33]/10 dark:border-[#F8F9FB]/10 bg-[#F8F9FB] dark:bg-[#141F33] rounded-xl px-4 py-3">
<div>
<p className="text-xs font-semibold text-[#141F33] dark:text-[#F8F9FB]">{f.name}</p>
<p className="text-[10px] text-[#141F33]/60 dark:text-[#F8F9FB]/60 uppercase font-semibold tracking-wider">{f.type}</p>
</div>
<button
        onClick={() => handleRemoveField(f.id)}
        className="text-xs font-bold px-3 py-1.5 rounded-xl min-h-[44px] min-w-[44px] flex items-center justify-center text-[#141F33] dark:text-[#F8F9FB] hover:text-[#141F33]/70 dark:hover:text-[#F8F9FB]/70 transition-all duration-300"
      >
{t('Delete', 'حذف')}
</button>
</div>
))}
</div>

{/* Add New Field form */}
<div className="space-y-3 pt-4 border-t border-[#141F33]/10 dark:border-[#F8F9FB]/10">
<input
type="text"
value={newFieldName}
onChange={(e) => setNewFieldName(e.target.value)}
placeholder={t('Field Label (e.g. Booking Code)', 'اسم الحقل (مثال: رمز الحجز)')}
className="min-h-[44px] w-full rounded-xl border border-[#141F33]/10 dark:border-[#F8F9FB]/10 bg-[#F8F9FB] dark:bg-[#141F33] px-4 text-xs font-semibold outline-none focus:bg-white dark:focus:bg-[#141F33] focus:border-[#141F33] dark:focus:border-[#F8F9FB] text-[#141F33] dark:text-[#F8F9FB]"
/>
<select
                  value={newFieldType}
                  onChange={(e) => setNewFieldType(e.target.value as CustomField['type'])}
                  aria-label={t('Field type', 'نوع الحقل')}
                  className="min-h-[44px] w-full rounded-xl border border-[#141F33]/10 dark:border-[#F8F9FB]/10 bg-[#F8F9FB] dark:bg-[#141F33] px-4 text-xs font-semibold outline-none text-[#141F33] dark:text-[#F8F9FB]"
                >
<option value="text">{t('Text Input', 'إدخال نصي')}</option>
<option value="number">{t('Numeric Value', 'قيمة رقمية')}</option>
<option value="boolean">{t('Toggle Switch', 'مفتاح تبديل ثنائي')}</option>
</select>
<button
onClick={handleAddField}
className="w-full bg-[#141F33] hover:opacity-95 text-[#F8F9FB] font-bold py-3 rounded-xl text-xs transition-all min-h-[44px]"
>
{t('Add Attribute', 'إضافة خاصية')}
</button>
</div>
</div>
);
}
