'use client';

import React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function ChangelogPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const logs = [
    {
      version: 'v1.2.0',
      date: 'July 4, 2026',
      title: t({ en: 'Collapsible Sidebars & Limit Monitors', fr: 'Barres latérales repliables & Moniteurs de limites', ar: 'القوائم القابلة للطي ومراقبة حدود الاستهلاك', hi: 'बंधनेवाला साइडबार और सीमा मॉनिटर' }),
      changes: [
        t({ en: 'Implemented collapsible sidebar with icon-only hovers and tooltips.', fr: 'Implémentation d\'une barre latérale repliable avec survol d\'icônes uniquement et infobulles.', ar: 'تنفيذ شريط جانبي قابل للطي مع تلميحات للأيقونات.', hi: 'केवल आइकन होवर और टूलटिप्स के साथ बंधनेवाला साइडबार लागू किया गया।' }),
        t({ en: 'Added settings progress bars for metered text, voice, and RAG usage.', fr: 'Ajout de barres de progression des paramètres pour l\'utilisation du texte, de la voix et du RAG.', ar: 'إضافة أشرطة قياس الاستهلاك للنصوص، دقائق الصوت، وأسئلة الـ RAG.', hi: 'मीटर्ड टेक्स्ट, वॉयस और आरएजी उपयोग के लिए सेटिंग प्रोग्रेस बार जोड़े गए।' }),
        t({ en: 'Integrated employee approvals capacity blocks.', fr: 'Intégration de blocs de capacité pour les approbations des employés.', ar: 'دمج التحقق من السعة والحد الأقصى للموافقة على الموظفين.', hi: 'एकीकृत कर्मचारी अनुमोदन क्षमता ब्लॉक।' }),
      ],
    },
    {
      version: 'v1.1.0',
      date: 'June 29, 2026',
      title: t({ en: 'Stripe Webhooks & Overage Logs', fr: 'Webhooks Stripe & Journaux de dépassement', ar: 'مدفوعات Stripe وسجلات التجاوز', hi: 'स्ट्राइप वेबहुक्स और ओवरएज लॉग्स' }),
      changes: [
        t({ en: 'Configured automated Stripe Checkout triggers and billing callbacks.', fr: 'Configuration des déclencheurs Stripe Checkout automatisés et des rappels de facturation.', ar: 'تهيئة مدفوعات Stripe وبوابات التحقق التلقائي.', hi: 'स्वचालित स्ट्राइप चेकआउट ट्रिगर और बिलिंग कॉलबैक कॉन्फ़िगर किए गए।' }),
        t({ en: 'Added operational logs CSV exporters.', fr: 'Ajout d\'exportateurs CSV pour les journaux opérationnels.', ar: 'إضافة أدوات تصدير سجلات التشغيل بصيغة CSV.', hi: 'परिचालन लॉग सीएसवी निर्यातक जोड़े गए।' }),
      ],
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-3xl mx-auto py-24 px-6 w-full space-y-12 animate-fadeIn">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Platform Updates', fr: 'Mises à jour de la plateforme', ar: 'تحديثات المنصة', hi: 'प्लेटफ़ॉर्म अपडेट' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'System Changelog', fr: 'Journal des modifications du système', ar: 'سجل التغييرات وتحديثات النظام', hi: 'सिस्टम चेंजलॉग' })}
          </h1>
          <p className="text-xs font-semibold text-[#141F33] mt-2">
            {t({ en: 'Follow our development path as we roll out new B2B private AI features.', fr: 'Suivez notre parcours de développement alors que nous déployons de nouvelles fonctionnalités d\'IA privée B2B.', ar: 'تابع مسار التطوير الخاص بنا بينما نطلق ميزات الذكاء الاصطناعي الخاص بالشركات.', hi: 'हमारे विकास पथ का अनुसरण करें क्योंकि हम नई बी2बी निजी एआई सुविधाओं को पेश कर रहे हैं।' })}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="space-y-12 relative border-s border-[#141F33]/10 ps-6 md:ps-10">
          {logs.map((log, idx) => (
            <div key={idx} className="relative space-y-3">
              
              {/* Timeline Bullet */}
              <div className="absolute -inset-inline-start-[31px] md:-inset-inline-start-[47px] top-1.5 h-4 w-4 rounded-full bg-[#141F33] border-4 border-[#F8F9FB] shadow-sm" />

              <div className="flex items-center gap-4">
                <span className="text-[10px] font-extrabold uppercase bg-[#F8F9FB] text-[#2A5CFF] px-2.5 py-0.5 rounded-full border border-[#141F33]/10">
                  {log.version}
                </span>
                <span className="text-xs text-[#141F33] font-bold">{log.date}</span>
              </div>

              <h3 className="text-lg font-extrabold text-[#141F33]">{log.title}</h3>
              
              <ul className="list-disc pl-5 text-xs font-semibold text-[#141F33] space-y-2 leading-relaxed">
                {log.changes.map((change, cIdx) => (
                  <li key={cIdx}>{change}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
