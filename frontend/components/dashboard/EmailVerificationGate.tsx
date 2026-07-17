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
    <div className="min-h-screen bg-surface flex items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-surface rounded-xl shadow-xl p-8 md:p-12 border border-primary/10 w-full max-w-md animate-fadeIn text-center">
        <div className="mb-4"><Mail className="w-8 h-8 text-primary" /></div>
        <h2 className="text-xl font-extrabold text-primary mb-2">
          {t({ en: 'Verify Your Email', ar: 'ØªØ£ÙƒÙŠØ¯ Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}
        </h2>
        <p className="text-xs font-semibold  mb-6 leading-relaxed">
          {t({
            en: 'Please enter the 6-digit verification code sent to your email.',
            ar: 'ÙŠØ±Ø¬Ù‰ Ø¥Ø¯Ø®Ø§Ù„ Ø±Ù…Ø² Ø§Ù„ØªØ­Ù‚Ù‚ Ø§Ù„Ù…ÙƒÙˆÙ† Ù…Ù† 6 Ø£Ø±Ù‚Ø§Ù… Ø§Ù„Ù…Ø±Ø³Ù„ Ø¥Ù„Ù‰ Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ.'
          })}
        </p>

{verifError && (
<div className="bg-surface rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
<AlertTriangle className="w-4 h-4 text-accent inline me-1" /> {verifError}
</div>
)}

{resendStatus && (
<div className="bg-surface rounded-xl p-3.5 text-xs font-bold mb-6 text-left">
<Check className="w-4 h-4 text-accent inline me-1" /> {resendStatus}
</div>
)}

        <form onSubmit={handleVerifyEmail} className="space-y-4">
          <input
            type="text"
            placeholder="123456"
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            aria-label={t({ en: 'Email verification code', ar: 'Ø±Ù…Ø² Ø§Ù„ØªØ­Ù‚Ù‚ Ù„Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}
            className="w-full min-h-[44px]  rounded-xl px-4 py-2 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            required
          />
          <button
            type="submit"
            disabled={verifying}
            className="w-full bg-primary  font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center disabled:opacity-40 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
          >
            {verifying ? t({ en: 'Verifying...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù‚Ù‚...' }) : t({ en: 'Verify & Activate Account', ar: 'Ø§Ù„ØªØ­Ù‚Ù‚ ÙˆØªÙ†Ø´ÙŠØ· Ø§Ù„Ø­Ø³Ø§Ø¨' })}
          </button>
        </form>

        <div className="mt-6 flex flex-col gap-4">
          <button
            type="button"
            disabled={resending}
            onClick={handleResendCode}
            className="text-xs font-bold text-accent hover:underline disabled:opacity-40"
          >
            {resending ? t({ en: 'Resending...', ar: 'Ø¬Ø§Ø±ÙŠ Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„Ø¥Ø±Ø³Ø§Ù„...' }) : t({ en: 'Resend Verification Code', ar: 'Ø¥Ø¹Ø§Ø¯Ø© Ø¥Ø±Ø³Ø§Ù„ Ø±Ù…Ø² Ø§Ù„ØªØ­Ù‚Ù‚' })}
          </button>
          <div className="pt-4 border-t  flex items-center justify-center gap-3">
            <UserButton />
            <span className="text-[10px] text-primary font-bold">{t({ en: 'Sign Out', ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬' })}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmailVerificationGate;
