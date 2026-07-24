'use client';


import { useLocale } from '@/app/providers';
import { MarketplaceCard } from '@/components/MarketplaceCard';

export default function GlobalMarketplacePage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

    const plugins = [
    { 
      name: t({ en: 'Slack Sync', ar: 'مزامنة سلاك' }), 
      desc: t({ en: 'Dispatches chat messages and summaries to custom Slack channel targets.', ar: 'يرسل رسائل المحادثة والملخصات إلى قنوات سلاك المخصصة.' }), 
      developer: t({ en: 'SAQYN core', ar: 'نواة ساكن' }) 
    },
    { 
      name: t({ en: 'BambooHR Connector', ar: 'رابط BambooHR' }), 
      desc: t({ en: 'Automatically syncs employee lists and leaves balances to active company tables.', ar: 'يحدث تلقائياً قوائم الموظفين وأرصدة الإجازات لجداول الشركة النشطة.' }), 
      developer: t({ en: 'SAQYN core', ar: 'نواة ساكن' }) 
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans animate-fadeIn">
      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Integration Hub', ar: 'مركز التكاملات البرمجية' })}</span>
          <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'SAQYN Marketplace Extensions', ar: 'متجر إضافات SAQYN' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Integrate external CRM, ERP, and chat channels into your active workspace.', ar: 'ربط أنظمة CRM و ERP وقنوات المحادثة الخارجية بمساحة عملك.' })}
          </p>
        </div>

        {/* Plugin Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {plugins.map((p, idx) => (
            <MarketplaceCard key={idx} name={p.name} desc={p.desc} developer={p.developer} />
          ))}
        </div>
      </main>

    </div>
  );
}
