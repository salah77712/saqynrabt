'use client';

import React from 'react';
import { useLocale } from '../providers';
import Link from 'next/link';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Code, Terminal, Radio } from 'lucide-react';

export default function DevelopersLandingPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 text-center space-y-8 animate-fadeIn">
        
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Developer Platform', fr: 'Plateforme pour développeurs', ar: 'منصة المطورين', hi: 'डेवलपर प्लेटफ़ॉर्म' })}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#141F33] leading-tight tracking-tight mt-3">
            {t({ en: 'Build Custom AI Operations Pipelines', fr: 'Construire des pipelines d\'opérations d\'IA personnalisés', ar: 'بناء مسارات عمل مخصصة للذكاء الاصطناعي', hi: 'कस्टम एआई ऑपरेशंस पाइपलाइन बनाएं' })}
          </h1>
          <p className="text-sm font-semibold text-[#141F33] mt-4 leading-relaxed max-w-2xl mx-auto">
            {t({ en: 'Integrate SAQYN RABT into your active ERP, CRM, and Property Management Systems (PMS). Read API guidelines and SDK references.', fr: 'Intégrez SAQYN RABT dans vos systèmes ERP, CRM et de gestion immobilière (PMS) actifs. Lisez les directives de l\'API et les références SDK.', ar: 'قم بدمج SAQYN RABT مع أنظمة ERP و CRM و PMS الخاصة بشركتك. اقرأ إرشادات واجهة البرمجة ومراجع الـ SDK.', hi: 'SAQYN RABT को अपने सक्रिय ईआरपी, सीआरएम और संपत्ति प्रबंधन प्रणाली (पीएमएस) में एकीकृत करें। एपीआई दिशानिर्देश और एसडीके संदर्भ पढ़ें।' })}
          </p>
        </div>

        <div className="flex gap-8 justify-center">
          <Link
            href="/developers/api-docs"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#141F33] px-8 py-3 text-xs font-bold text-[#F8F9FB] shadow-md hover:opacity-95 transition-all hover:scale-[1.01] hover:shadow-md"
          >
            {t({ en: 'API Reference Swagger', fr: 'Référence API Swagger', ar: 'مرجع واجهة التطبيقات Swagger', hi: 'एपीआई संदर्भ स्वैगर' })}
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#F8F9FB] border border-[#141F33]/10 px-8 py-3 text-xs font-bold text-[#141F33] shadow-sm hover:bg-[#F8F9FB] transition-all hover:scale-[1.01] hover:shadow-md"
          >
            {t({ en: 'Manage API Keys', fr: 'Gérer les clés API', ar: 'إدارة مفاتيح الـ API', hi: 'एपीआई कुंजी प्रबंधित करें' })}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#141F33]/10 text-start">
          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141F33] flex items-center justify-center mb-4">
              <Code className="w-5 h-5 text-[#141F33]" />
            </div>
            <h3 className="text-sm font-extrabold text-[#141F33]">JavaScript SDK</h3>
            <p className="text-xs text-[#141F33] font-semibold mt-2">Install our lightweight npm package to run chat streams and log usage data directly.</p>
          </div>

          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141F33] flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5 text-[#141F33]" />
            </div>
            <h3 className="text-sm font-extrabold text-[#141F33]">Python Library</h3>
            <p className="text-xs text-[#141F33] font-semibold mt-2">Fetch company request queues and automate data ingestion processes using our PyPI helper client.</p>
          </div>

          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-8 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#141F33] flex items-center justify-center mb-4">
              <Radio className="w-5 h-5 text-[#141F33]" />
            </div>
            <h3 className="text-sm font-extrabold text-[#141F33]">Outbound Webhooks</h3>
            <p className="text-xs text-[#141F33] font-semibold mt-2">Subscribe to real-time webhook dispatches to notify your Slack or customized backend servers on events.</p>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
