'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Check } from 'lucide-react';

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
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

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
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Billing & Invoice Ledger', ar: 'Ø¯ÙØªØ± Ø§Ù„ÙÙˆØ§ØªÙŠØ± ÙˆØ§Ù„Ø­Ø³Ø§Ø¨Ø§Øª' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Track tenant invoices, monthly subscription charges, and manual payments.', ar: 'Ù…ØªØ§Ø¨Ø¹Ø© ÙÙˆØ§ØªÙŠØ± Ø§Ù„Ø´Ø±ÙƒØ§ØªØŒ Ø§Ù„Ø§Ø´ØªØ±Ø§ÙƒØ§Øª Ø§Ù„Ø´Ù‡Ø±ÙŠØ©ØŒ ÙˆØ§Ù„Ù…Ø¯ÙÙˆØ¹Ø§Øª Ø§Ù„ÙŠØ¯ÙˆÙŠØ©.' })}</p>
      </div>

      {/* Invoices List */}
      <div className="bg-white border border-primary/10 rounded-xl shadow-sm overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-surface border-b border-primary/10 text-xs font-extrabold text-primary uppercase tracking-wider">
                <th className="px-6 py-4">{t({ en: 'Company', ar: 'Ø§Ù„Ø´Ø±ÙƒØ©' })}</th>
                <th className="px-6 py-4">{t({ en: 'Plan', ar: 'Ø§Ù„Ø¨Ø§Ù‚Ø©' })}</th>
                <th className="px-6 py-4">{t({ en: 'Monthly Fee', ar: 'Ø§Ù„Ø±Ø³ÙˆÙ… Ø§Ù„Ø´Ù‡Ø±ÙŠØ©' })}</th>
                <th className="px-6 py-4">{t({ en: 'Setup Fee', ar: 'Ø±Ø³ÙˆÙ… Ø§Ù„ØªØ£Ø³ÙŠØ³' })}</th>
                <th className="px-6 py-4">{t({ en: 'Total Paid', ar: 'Ø¥Ø¬Ù…Ø§Ù„ÙŠ Ø§Ù„Ù…Ø¯ÙÙˆØ¹' })}</th>
                <th className="px-6 py-4">{t({ en: 'Last Invoice Date', ar: 'ØªØ§Ø±ÙŠØ® Ø¢Ø®Ø± ÙØ§ØªÙˆØ±Ø©' })}</th>
                <th className="px-6 py-4">{t({ en: 'Status', ar: 'Ø§Ù„Ø­Ø§Ù„Ø©' })}</th>
                <th className="px-6 py-4 text-center">{t({ en: 'Actions', ar: 'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141F33]/10 text-xs font-semibold text-primary">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-primary transition-colors">
                  <td className="px-6 py-4 font-bold text-primary">{inv.company}</td>
                  <td className="px-6 py-4">{inv.plan}</td>
                  <td className="px-6 py-4 font-bold text-primary">{inv.monthlyFee} QAR</td>
                  <td className="px-6 py-4 text-primary">{inv.setupFee} QAR</td>
                  <td className="px-6 py-4 font-black text-accent">{inv.totalPaid} QAR</td>
                  <td className="px-6 py-4 text-primary/40 font-bold">{inv.lastInvoiceDate}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      inv.status === 'paid' ? 'bg-royal/10 text-royal border border-royal/20' : 'bg-surface text-accent'
                    }`}>
                      {inv.status === 'paid' ? t({ en: 'Paid', ar: 'Ù…Ø¯ÙÙˆØ¹' }) : t({ en: 'Unpaid', ar: 'ØºÙŠØ± Ù…Ø¯ÙÙˆØ¹' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inv.status === 'unpaid' ? (
                      <button
                        onClick={() => handleMarkPaid(inv.id)}
                        className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
                      >
                        {t({ en: 'Mark as Paid', ar: 'ØªØ­Ø¯ÙŠØ¯ ÙƒÙ…Ø¯ÙÙˆØ¹' })}
                      </button>
                    ) : (
                      <Check className="w-3 h-3 text-primary" />
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
