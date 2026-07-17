'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs/legacy';
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
 <div className="bg-[#F8F9FB] rounded-xl shadow-xl p-8 border border-[#141F33]/10 w-full max-w-md animate-fadeIn">

 {/* Logo */}
 <div className="text-center mb-8">
 <Link href="/" className="flex flex-col items-center gap-1">
 <span className="text-[#141F33] font-extrabold text-2xl tracking-tight">SAQYN RABT</span>
 <span className="text-[10px] uppercase tracking-[0.2em] text-[#141F33]/60 font-bold">{t({ en: 'PRIVATE AI OPS', ar: 'عمليات الذكاء الاصطناعي الخاصة' })}</span>
 </Link>
 </div>

 {success ? (
 <div className="text-center space-y-4">
 <div className="h-12 w-12 rounded-full bg-[#F8F9FB] text-[#2A5CFF] flex items-center justify-center mx-auto">
 <Mail className="w-6 h-6 text-[#2A5CFF]" />
 </div>
 <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Check your email', ar: 'تحقق من بريدك الإلكتروني' })}</h2>
 <p className="text-xs font-semibold text-[#141F33]/60 leading-relaxed">
 {t({
 en: 'If an account exists with that email, we will send a password reset verification link.',
 ar: 'إذا كان هناك حساب بهذا البريد الإلكتروني، سنرسل رابط إعادة تعيين كلمة المرور.',
 })}
 </p>
<div className="pt-4">
      <Link
        href="/sign-in"
        className="inline-flex items-center justify-center py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] text-[#2A5CFF] hover:bg-[#141F33] transition-all"
      >
        {t({ en: 'Back to Sign In', ar: 'العودة لتسجيل الدخول' })}
      </Link>
    </div>
 </div>
 ) : (
 <>
{error && (
<div className="bg-[#141F33] border border-[#141F33]/10 text-[#141F33] rounded-xl p-3.5 text-xs font-bold mb-6" role="alert" aria-live="assertive">
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
 className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
 required
 />
 </div>

 <button
 type="submit"
 disabled={loading}
 className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
 >
 {loading ? t({ en: 'Sending Reset Link...', ar: 'جاري إرسال الرابط...' }) : t({ en: 'Send Reset Link', ar: 'إرسال رابط إعادة التعيين' })}
 </button>
 </form>

 <div className="text-center mt-6">
 <Link href="/sign-in" className="text-xs font-semibold text-[#2A5CFF] hover:underline">
 {t({ en: 'Back to Sign In', ar: 'العودة لتسجيل الدخول' })}
 </Link>
 </div>
 </>
 )}

 </div>
 </div>
 );
}
