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
      setError(err.errors?.[0]?.message || t({ en: 'Failed to send reset link.', ar: 'ÙØ´Ù„ Ø¥Ø±Ø³Ø§Ù„ Ø±Ø§Ø¨Ø· Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ¹ÙŠÙŠÙ†.' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-[#F8F9FB] rounded-2xl shadow-xl p-6 border border-[#141F33]/10 w-full max-w-md animate-fadeIn">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span className="text-[#141F33] font-extrabold text-2xl tracking-tight">SAQYN RABT</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#141F33] font-bold">{t({ en: 'PRIVATE AI OPS', ar: 'Ø¹Ù…Ù„ÙŠØ§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø§Ù„Ø®Ø§ØµØ©' })}</span>
          </Link>
        </div>

        {success ? (
          <div className="text-center space-y-4">
            <div className="h-12 w-12 rounded-full bg-[#F8F9FB] text-[#2A5CFF] flex items-center justify-center mx-auto">
              <Mail className="w-6 h-6 text-[#2A5CFF]" />
            </div>
            <h2 className="text-lg font-extrabold text-[#141F33]">{t({ en: 'Check your email', ar: 'ØªØ­Ù‚Ù‚ Ù…Ù† Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</h2>
            <p className="text-xs font-semibold text-[#141F33]/60 leading-relaxed">
              {t({
                en: 'If an account exists with that email, we will send a password reset verification link.',
                ar: 'Ø¥Ø°Ø§ ÙƒØ§Ù† Ù‡Ù†Ø§Ùƒ Ø­Ø³Ø§Ø¨ Ø¨Ù‡Ø°Ø§ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØŒ ÙØ³Ù†Ø±Ø³Ù„ Ù„Ùƒ Ø±Ø§Ø¨Ø· Ø§Ù„ØªØ­Ù‚Ù‚ Ù„Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±.'
              })}
            </p>
            <div className="pt-4">
              <Link href="/sign-in" className="text-xs font-bold text-[#2A5CFF] hover:underline">
                {t({ en: 'Back to Sign In', ar: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„' })}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-[#141F33]/5 border border-[#141F33]/10 text-[#141F33] rounded-xl p-3.5 text-xs font-bold mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Email Address', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
              >
                {loading ? t({ en: 'Sending Reset Link...', ar: 'Ø¬Ø§Ø±ÙŠ Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø§Ø¨Ø·...' }) : t({ en: 'Send Reset Link', ar: 'Ø¥Ø±Ø³Ø§Ù„ Ø±Ø§Ø¨Ø· Ø¥Ø¹Ø§Ø¯Ø© Ø§Ù„ØªØ¹ÙŠÙŠÙ†' })}
              </button>
            </form>

            <div className="text-center mt-6">
              <Link href="/sign-in" className="text-xs font-bold text-[#2A5CFF] hover:underline">
                {t({ en: 'Back to Sign In', ar: 'Ø§Ù„Ø¹ÙˆØ¯Ø© Ù„ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„' })}
              </Link>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
