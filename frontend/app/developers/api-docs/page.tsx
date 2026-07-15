'use client';

import React from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';

export default function DevelopersApiDocsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const endpoints = [
    {
      method: 'POST',
      path: '/api/v1/chat',
      desc: t({ en: 'Send queries to RAG Assistant. Returns JSON answers and citations.', fr: 'Envoyer des requêtes à l\'assistant RAG. Renvoie des réponses JSON et des citations.', ar: 'إرسال سؤال للمساعد. يعيد الإجابة والاقتباسات.', hi: 'आरएजी सहायक को प्रश्न भेजें। JSON उत्तर और उद्धरण लौटाता है।' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ message: 'What are the check-in rules?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/v1/automation',
      desc: t({ en: 'Create call dispatches directly inside the queue.', fr: 'Créer des répartitions d\'appels directement dans la file d\'attente.', ar: 'إضافة مهام أتمتة جديدة مباشرة في طابور العمليات.', hi: 'कॉल डिस्पैच सीधे कतार के अंदर बनाएं।' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ customer_name: 'Karim', request_type: 'Booking' }, null, 2),
    },
  ];

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'API Portal', fr: 'Portail API', ar: 'منصة الـ API', hi: 'एपीआई पोर्टल' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Interactive Swagger Playground', fr: 'Aire de jeux Swagger interactive', ar: 'منصة تفاعلية لاختبار واجهة برمجة التطبيقات', hi: 'इंटरएक्टिव स्वैगर प्लेग्राउंड' })}
          </h1>
          <p className="text-xs font-semibold text-[#141F33] mt-2">
            {t({ en: 'Test endpoints with live API tokens inside the sandbox.', fr: 'Tester les points de terminaison avec des jetons API en direct dans le bac à sable.', ar: 'اختبر واجهات البرمجة مع مفاتيح الوصول الحية في وضع الرمل.', hi: 'सैंडबॉक्स के अंदर लाइव एपीआई टोकन के साथ एंडपॉइंट्स का परीक्षण करें।' })}
          </p>
        </div>

        {/* Endpoints */}
        <div className="space-y-8">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] p-8 shadow-sm space-y-6">
              
              <div className="flex items-center gap-4">
                <span className="bg-[#2A5CFF] text-[#F8F9FB] text-[10px] font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-[#141F33] bg-[#F8F9FB] border border-[#141F33]/10 px-3 py-1 rounded-lg">
                  {ep.path}
                </span>
              </div>

              <p className="text-xs font-semibold text-[#141F33]">{ep.desc}</p>

              <div>
                <h4 className="text-xs font-extrabold text-[#141F33] mb-2">Request Headers</h4>
                <div className="space-y-1.5">
                  {ep.headers.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-[10px] font-bold py-2 border-b border-[#141F33]/10">
                      <span className="font-mono text-[#2A5CFF]">{h.name}</span>
                      <span className="text-[#141F33]">{h.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-[#141F33] mb-2">JSON Request Example</h4>
                <pre className="bg-[#141F33] text-[#141F33]/20 rounded-[40px] p-4 text-[10px] font-mono overflow-x-auto leading-relaxed">
                  {ep.body}
                </pre>
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
