'use client';


import { useLocale } from '@/app/providers';

export default function ChangelogPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const logs = [
    {
      version: 'v1.2.0',
      date: 'July 4, 2026',
      title: t({ en: 'Collapsible Sidebars & Limit Monitors', ar: 'القوائم القابلة للطي ومراقبة حدود الاستهلاك' }),
      changes: [
        t({ en: 'Implemented collapsible sidebar with icon-only hovers and tooltips.', ar: 'تنفيذ شريط جانبي قابل للطي مع تلميحات للأيقونات.' }),
        t({ en: 'Added settings progress bars for metered text, voice, and RAG usage.', ar: 'إضافة أشرطة قياس الاستهلاك للنصوص، دقائق الصوت، وأسئلة الـ RAG.' }),
        t({ en: 'Integrated employee approvals capacity blocks.', ar: 'دمج التحقق من السعة والحد الأقصى للموافقة على الموظفين.' }),
      ],
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      <main className="flex-1 max-w-3xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Platform Updates', ar: 'تحديثات المنصة' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'System Changelog', ar: 'سجل التغييرات وتحديثات النظام' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Follow our development path as we roll out new B2B private AI features.', fr: 'Suivez notre parcours de dÃ©veloppement alors que nous dÃ©ployons de nouvelles fonctionnalitÃ©s d\'IA privÃ©e B2B.', ar: 'تابع مسار التطوير الخاص بنا بينما نطلق ميزات الذكاء الاصطناعي الخاص بالشركات.', hi: 'à¤¹à¤®à¤¾à¤°à¥ à¤µà¤¿à¤à¤¾à¤¸ à¤ªà¤¥ à¤à¤¾ à¤à¤¨à¥à¤¸à¤°à¤£ à¤à¤°à¥à¤ à¤à¥à¤¯à¥à¤à¤à¤¿ à¤¹à¤® à¤¨à¤ à¤¬à¥2à¤¬à¥ à¤¨à¤¿à¤à¥ à¤à¤à¤ à¤¸à¥à¤µà¤¿à¤§à¤¾à¤à¤ à¤à¥ à¤ªà¥à¤¶ à¤à¤° à¤°à¤¹à¥ à¤¹à¥à¤à¥¤' })}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-12 relative border-s border-primary/10 ps-6 md:ps-10">
          {logs.map((log, idx) => (
            <div key={idx} className="relative space-y-3">
              
              {/* Timeline Bullet */}
              <div className="absolute -inset-inline-start-[31px] md:-inset-inline-start-[47px] top-1.5 h-4 w-4 rounded-full bg-primary border-4 border-surface shadow-sm" />

              <div className="flex items-center gap-4">
                <span className="text-xs font-extrabold uppercase bg-surface text-accent px-2.5 py-0.5 rounded-full border border-primary/10">
                  {log.version}
                </span>
                <span className="text-xs text-primary font-bold">{log.date}</span>
              </div>

              <h3 className="text-lg font-extrabold text-primary">{log.title}</h3>
              
              <ul className="list-disc ps-5 text-xs font-semibold text-primary space-y-2 leading-relaxed">
                {log.changes.map((change, cIdx) => (
                  <li key={cIdx}>{change}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </main>

    </div>
  );
}
