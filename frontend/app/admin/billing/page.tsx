'use client';


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
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const invoices: InvoiceItem[] = [];

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Billing & Invoice Ledger', ar: 'دفتر الفواتير والحسابات' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Track tenant invoices, monthly subscription charges, and manual payments.', ar: 'متابعة فواتير الشركات، الاشتراكات الشهرية، والمدفوعات اليدوية.' })}</p>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No invoices yet — billing is managed manually during pilot phase.', ar: 'لا توجد فواتير بعد — تتم إدارة الفواتير يدويًا خلال المرحلة التجريبية.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Invoices will appear here once billing is activated.', ar: 'ستظهر الفواتير هنا بعد تفعيل نظام الفوترة.' })}</p>
      </div>

    </div>
  );
}
