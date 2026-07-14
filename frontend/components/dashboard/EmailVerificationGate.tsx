'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { UserButton } from '@clerk/nextjs';
import { useLocale } from '../../app/providers';
import { Mail, AlertTriangle, Check } from 'lucide-react';

export function EmailVerificationGate() {
  const { locale } = useLocale();
  const { user, isLoaded: userLoaded } = useUser();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [verificationCode, setVerificationCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifError, setVerifError] = useState('');
  const [resending, setResending] = useState(false);
  const [resendStatus, setResendStatus] = useState('');

  const isEmailVerified = !userLoaded || !user || user.emailAddresses.some(e => e.verification.status === 'verified');

  if (isEmailVerified) return null;

  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setVerifying(true);
    setVerifError('');
    try {
      const emailObj = user.emailAddresses.find(e => e.verification.status !== 'verified');
      if (emailObj) {
        await emailObj.attemptVerification({ code: verificationCode });
        window.location.reload();
      }
    } catch (err: any) {
      console.error(err);
      setVerifError(err.errors?.[0]?.message || err.message || 'Verification failed. Please check the code.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!user) return;
    setResending(true);
    setResendStatus('');
    try {
      const emailObj = user.emailAddresses.find(e => e.verification.status !== 'verified');
      if (emailObj) {
        await emailObj.prepareVerification({ strategy: 'email_code' });
        setResendStatus('Verification code resent successfully.');
      }
    } catch (err: any) {
      console.error(err);
      setVerifError('Failed to resend code. Please try again.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-[#F8F9FB] rounded-2xl shadow-xl p-8 md:p-12 border border-[#141F33]/10 w-full max-w-md animate-fadeIn text-center">
        <div className="mb-4"><Mail className="w-8 h-8 text-[#141F33]" /></div>
        <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
          {t({ en: 'Verify Your Email', ar: 'تأكيد بريدك الإلكتروني' })}
        </h2>
        <p className="text-xs font-semibold  mb-6 leading-relaxed">
          {t({
            en: 'Please enter the 6-digit verification code sent to your email.',
            ar: 'يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى بريدك الإلكتروني.'
          })}
        </p>

{verifError && (
<div className="bg-[#F8F9FB] rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
<AlertTriangle className="w-4 h-4 text-[#2A5CFF] inline mr-1" /> {verifError}
</div>
)}

{resendStatus && (
<div className="bg-[#F8F9FB] rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
<Check className="w-4 h-4 text-[#2A5CFF] inline mr-1" /> {resendStatus}
</div>
)}

        <form onSubmit={handleVerifyEmail} className="space-y-4">
          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full min-h-[44px]  rounded-xl px-4 py-2 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[#141F33]"
            required
          />
          <button
            type="submit"
            disabled={verifying}
            className="w-full bg-[#141F33]  font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {verifying ? t({ en: 'Verifying...', ar: 'جاري التحقق...' }) : t({ en: 'Verify & Activate Account', ar: 'التحقق وتنشيط الحساب' })}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            disabled={resending}
            onClick={handleResendCode}
            className="text-xs font-bold text-[#2A5CFF] hover:underline disabled:opacity-40"
          >
            {resending ? t({ en: 'Resending...', ar: 'جاري إعادة الإرسال...' }) : t({ en: 'Resend Verification Code', ar: 'إعادة إرسال رمز التحقق' })}
          </button>
          <div className="pt-4 border-t  flex items-center justify-center gap-2">
            <UserButton afterSignOutUrl="/" />
            <span className="text-[10px] text-[#141F33] font-bold">{t({ en: 'Sign Out', ar: 'تسجيل الخروج' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmailVerificationGate;
