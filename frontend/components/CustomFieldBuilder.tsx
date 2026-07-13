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
    <div className="bg-white rounded-2xl border border-gray-200 p-6 max-w-md w-full shadow-sm" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <h3 className="text-lg font-bold text-navy mb-2">
        {t('Custom Form Fields', 'حقول مخصصة للنماذج')}
      </h3>
      <p className="text-xs text-muted mb-6 leading-relaxed">
        {t(
          'Customize metadata requirements for automation entries or staff logs.',
          'تخصيص متطلبات البيانات الإضافية لمدخلات الأتمتة أو سجلات الموظفين.'
        )}
      </p>

      {/* Field List */}
      <div className="space-y-2 mb-6">
        {fields.map((f) => (
          <div key={f.id} className="flex items-center justify-between border border-gray-100 bg-slate-50/50 rounded-xl px-4 py-3">
            <div>
              <p className="text-xs font-bold text-navy">{f.name}</p>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">{f.type}</p>
            </div>
            <button
              onClick={() => handleRemoveField(f.id)}
              className="text-xs text-red-500 hover:text-red-700 font-bold px-2 py-1"
            >
              {t('Delete', 'حذف')}
            </button>
          </div>
        ))}
      </div>

      {/* Add New Field form */}
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <input
          type="text"
          value={newFieldName}
          onChange={(e) => setNewFieldName(e.target.value)}
          placeholder={t('Field Label (e.g. Booking Code)', 'اسم الحقل (مثال: رمز الحجز)')}
          className="min-h-[44px] w-full rounded-xl border border-gray-200 bg-slate-50 px-4 text-xs font-semibold outline-none focus:bg-white"
        />
        <select
          value={newFieldType}
          onChange={(e) => setNewFieldType(e.target.value as CustomField['type'])}
          className="min-h-[44px] w-full rounded-xl border border-gray-200 bg-slate-50 px-4 text-xs font-semibold outline-none"
        >
          <option value="text">{t('Text Input', 'إدخال نصي')}</option>
          <option value="number">{t('Numeric Value', 'قيمة رقمية')}</option>
          <option value="boolean">{t('Toggle Switch', 'مفتاح تبديل ثنائي')}</option>
        </select>
        <button
          onClick={handleAddField}
          className="w-full bg-[#141F33] hover:opacity-95 text-white font-bold py-3.5 rounded-xl text-xs transition-all min-h-[44px]"
        >
          {t('Add Attribute', 'إضافة خاصية')}
        </button>
      </div>
    </div>
  );
}
