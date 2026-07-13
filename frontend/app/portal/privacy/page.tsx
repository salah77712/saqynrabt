'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useGlobalToast } from '../../../lib/toast';

export default function PublicPrivacyPortalPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState('access');
  const [details, setDetails] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      addToast('DSAR Request submitted successfully! We will process it within 30 days.', 'success');
      setEmail('');
      setDetails('');
    }, 800);
  };

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-xl mx-auto py-24 px-6 w-full space-y-8 animate-fadeIn">
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Privacy & Sovereignty', ar: 'الخصوصية وسيادة البيانات' })}</span>
          <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight mt-2">
            {t({ en: 'Data Subject Access Request (DSAR)', ar: 'طلب معلومات خصوصية البيانات (DSAR)' })}
          </h1>
          <p className="text-xs font-semibold text-[#718096] mt-2">
            {t({ en: 'Submit queries for access, rectification, or erasure under GDPR guidelines.', ar: 'إرسال طلبات الوصول، التصحيح، أو محو البيانات تحت لوائح GDPR.' })}
          </p>
        </div>

        {/* Form request */}
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-4">
          
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Your Email Address', ar: 'البريد الإلكتروني الخاص بك' })}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. karim@gmail.com"
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="requestType" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Request Category', ar: 'تصنيف الطلب' })}</label>
            <select
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33]"
            >
              <option value="access">GDPR Right to Access (Export details)</option>
              <option value="rectification">GDPR Right to Rectification (Correction)</option>
              <option value="erasure">GDPR Right to Erasure (Delete my data)</option>
            </select>
          </div>

          <div>
            <label htmlFor="details" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Request Scope details', ar: 'تفاصيل نطاق الطلب' })}</label>
            <textarea
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl p-4 text-xs font-semibold text-[#141F33] focus:outline-none resize-none"
              placeholder="Provide context details..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {sending ? t({ en: 'Submitting...', ar: 'جاري الإرسال...' }) : t({ en: 'Submit DSAR Request', ar: 'إرسال طلب الخصوصية' })}
          </button>

        </form>
      </main>

      <Footer />
    </div>
  );
}
