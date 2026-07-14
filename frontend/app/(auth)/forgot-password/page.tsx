'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { useLocale } from '../../providers';
import { Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { isLoaded, signIn } = useSignIn();
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      await signIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || t({ en: 'Failed to send reset link.', ar: 'فشل إرسال رابط إعادة التعيين.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-200 w-full max-w-md animate-fadeIn">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span className="text-[#141F33] font-extrabold text-2xl tracking-tight">SAQYN RABT</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#718096] font-bold">{t({ en: 'PRIVATE AI OPS', ar: 'عمليات الذكاء الاصطناعي الخاصة' })}</span>
          </Link>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-emerald-600" />
            </div>
            <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Check your email', ar: 'تحقق من بريدك الإلكتروني' })}</h2>
            <p className="text-xs font-semibold text-[#718096] leading-relaxed">
              {t({
                en: 'If an account exists with that email, we will send a password reset verification link.',
                ar: 'إذا كان هناك حساب بهذا البريد الإلكتروني، فسنرسل لك رابط التحقق لإعادة تعيين كلمة المرور.'
              })}
            </p>
            <div className="pt-4">
              <Link href="/sign-in" className="text-xs font-bold text-[#2A5CFF] hover:underline">
                {t({ en: 'Back to Sign In', ar: 'العودة لتسجيل الدخول' })}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-bold mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
              >
                {loading ? t({ en: 'Sending Reset Link...', ar: 'جاري إرسال الرابط...' }) : t({ en: 'Send Reset Link', ar: 'إرسال رابط إعادة التعيين' })}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link href="/sign-in" className="text-xs font-bold text-[#2A5CFF] hover:underline">
                {t({ en: 'Back to Sign In', ar: 'العودة لتسجيل الدخول' })}
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
