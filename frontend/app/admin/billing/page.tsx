'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface InvoiceItem {
  id: string;
  company: string;
  plan: string;
  monthlyFee: number;
  setupFee: number;
  totalPaid: number;
  lastInvoiceDate: string;
  status: 'paid' | 'unpaid';
}

export default function AdminBillingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    { id: 'inv-101', company: 'Al-Safa Hospitality Group', plan: 'Enterprise Bundle', monthlyFee: 2999, setupFee: 9500, totalPaid: 12499, lastInvoiceDate: '2026-07-01', status: 'paid' },
    { id: 'inv-102', company: 'Doha Clinical Centre', plan: 'Starter Automation', monthlyFee: 899, setupFee: 2500, totalPaid: 2500, lastInvoiceDate: '2026-07-02', status: 'unpaid' },
    { id: 'inv-103', company: 'Gulf Transport Fleet', plan: 'Pro Automation', monthlyFee: 1499, setupFee: 5000, totalPaid: 6499, lastInvoiceDate: '2026-06-29', status: 'paid' },
  ]);

  const handleMarkPaid = (id: string) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id
          ? { ...inv, status: 'paid', totalPaid: inv.totalPaid + inv.monthlyFee }
          : inv
      )
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Billing & Invoice Ledger', ar: 'دفتر الفواتير والحسابات' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Track tenant invoices, monthly subscription charges, and manual payments.', ar: 'متابعة فواتير الشركات، الاشتراكات الشهرية، والمدفوعات اليدوية.' })}</p>
      </div>

      {/* Invoices List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                <th className="px-6 py-4">{t({ en: 'Company', ar: 'الشركة' })}</th>
                <th className="px-6 py-4">{t({ en: 'Plan', ar: 'الباقة' })}</th>
                <th className="px-6 py-4">{t({ en: 'Monthly Fee', ar: 'الرسوم الشهرية' })}</th>
                <th className="px-6 py-4">{t({ en: 'Setup Fee', ar: 'رسوم التأسيس' })}</th>
                <th className="px-6 py-4">{t({ en: 'Total Paid', ar: 'إجمالي المدفوع' })}</th>
                <th className="px-6 py-4">{t({ en: 'Last Invoice Date', ar: 'تاريخ آخر فاتورة' })}</th>
                <th className="px-6 py-4">{t({ en: 'Status', ar: 'الحالة' })}</th>
                <th className="px-6 py-4 text-center">{t({ en: 'Actions', ar: 'الإجراءات' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-slate-700">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#141F33]">{inv.company}</td>
                  <td className="px-6 py-4">{inv.plan}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.monthlyFee} QAR</td>
                  <td className="px-6 py-4 text-slate-500">{inv.setupFee} QAR</td>
                  <td className="px-6 py-4 font-black text-emerald-600">{inv.totalPaid} QAR</td>
                  <td className="px-6 py-4 text-slate-400 font-bold">{inv.lastInvoiceDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      inv.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {inv.status === 'paid' ? t({ en: 'Paid', ar: 'مدفوع' }) : t({ en: 'Unpaid', ar: 'غير مدفوع' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inv.status === 'unpaid' ? (
                      <button
                        onClick={() => handleMarkPaid(inv.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] min-h-[32px]"
                      >
                        {t({ en: 'Mark as Paid', ar: 'تحديد كمدفوع' })}
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold">✓</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
