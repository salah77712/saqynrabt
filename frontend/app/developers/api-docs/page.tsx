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
      desc: t({ en: 'Send queries to RAG Assistant. Returns JSON answers and citations.', ar: 'إرسال سؤال للمساعد. يعيد الإجابة والاقتباسات.' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ message: 'What are the check-in rules?' }, null, 2),
    },
    {
      method: 'POST',
      path: '/api/v1/automation',
      desc: t({ en: 'Create call dispatches directly inside the queue.', ar: 'إضافة مهام أتمتة جديدة مباشرة في طابور العمليات.' }),
      headers: [
        { name: 'x-api-key', desc: 'Active developer API key token' },
        { name: 'Content-Type', desc: 'application/json' },
      ],
      body: JSON.stringify({ customer_name: 'Karim', request_type: 'Booking' }, null, 2),
    },
  ];

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 w-full space-y-12">
        {/* Header */}
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'API Portal', ar: 'منصة الـ API' })}</span>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mt-2">
            {t({ en: 'Interactive Swagger Playground', ar: 'منصة تفاعلية لاختبار واجهة برمجة التطبيقات' })}
          </h1>
          <p className="text-xs font-semibold text-primary mt-2">
            {t({ en: 'Test endpoints with live API tokens inside the sandbox.', ar: 'اختبر واجهات البرمجة مع مفاتيح الوصول الحية في وضع الرمل.' })}
          </p>
        </div>

        {/* Endpoints */}
        <div className="space-y-8">
          {endpoints.map((ep, idx) => (
            <div key={idx} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-6">
              
              <div className="flex items-center gap-4">
                <span className="bg-accent text-surface text-xs font-extrabold px-3 py-1 rounded-lg uppercase tracking-wider">
                  {ep.method}
                </span>
                <span className="text-xs font-mono font-bold text-primary bg-surface border border-primary/10 px-3 py-1 rounded-lg">
                  {ep.path}
                </span>
              </div>

              <p className="text-xs font-semibold text-primary">{ep.desc}</p>

              <div>
                <h4 className="text-xs font-extrabold text-primary mb-2">Request Headers</h4>
                <div className="space-y-1.5">
                  {ep.headers.map((h, i) => (
                    <div key={i} className="flex justify-between items-center text-xs font-bold py-2 border-b border-primary/10">
                      <span className="font-mono text-accent">{h.name}</span>
                      <span className="text-primary">{h.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-extrabold text-primary mb-2">JSON Request Example</h4>
                <pre className="bg-primary text-primary/20 rounded-xl p-4 text-xs font-mono overflow-x-auto leading-relaxed">
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
