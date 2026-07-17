'use client';

import React, { useState } from 'react';
import { useSignIn } from '@clerk/nextjs/legacy';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [factorStrategy, setFactorStrategy] = useState<'totp' | 'email_code' | 'phone_code' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else if (result.status === 'needs_second_factor') {
        const totpFactor = result.supportedSecondFactors?.find(f => f.strategy === 'totp');
        const emailFactor = result.supportedSecondFactors?.find(f => (f.strategy as string) === 'email_code');
        const phoneFactor = result.supportedSecondFactors?.find(f => (f.strategy as string) === 'phone_code');
        
        const strategy: string | undefined = totpFactor?.strategy || (emailFactor ? 'email_code' : undefined) || (phoneFactor ? 'phone_code' : undefined);
        
        if (strategy) {
          setFactorStrategy(strategy as any);
          if (strategy === 'email_code' || strategy === 'phone_code') {
            await signIn.prepareSecondFactor({ strategy } as any);
          }
          setShow2FA(true);
        } else {
          setError(t({ en: 'No supported second factor strategy found.', ar: 'لم يتم العثور على طريقة تحقق ثنائية مدعومة.' }));
        }
      } else {
        console.log('SignIn status incomplete:', result);
        setError(t({ 
          en: `Additional verification steps required (Status: ${result.status}).`, 
          ar: `مطلوب خطوات تحقق إضافية (الحالة: ${result.status}).` 
        }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || t({ en: 'Invalid email or password.', ar: 'البريد الإلكتروني أو كلمة المرور غير صالحة.' }));
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !factorStrategy) return;

    setLoading(true);
    setError('');

    try {
      const result = await (signIn.attemptSecondFactor as any)({
        strategy: factorStrategy,
        code: twoFactorCode,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/dashboard');
      } else {
        setError(t({ en: 'Verification failed. Please try again.', ar: 'فشل التحقق. يرجى المحاولة مرة أخرى.' }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || t({ en: 'Verification failed. Please check the code.', ar: 'فشل التحقق. يرجى التحقق من الرمز.' }));
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (strategy: 'oauth_google') => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/dashboard',
      });
    } catch (err: any) {
      console.error('OAuth failed:', err);
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

{error && (
<div className="bg-[#141F33] border border-[#141F33]/10 text-[#141F33] rounded-xl p-3.5 text-xs font-bold mb-6" role="alert" aria-live="assertive">
{error}
</div>
)}

        {show2FA ? (
          /* Two-Factor Authentication Form */
          <form onSubmit={handle2FASubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-sm font-bold text-[#141F33] mb-1">
                {t({ en: 'Two-Factor Authentication', ar: 'التحقق بخطوتين' })}
              </h3>
              <p className="text-[11px] text-[#141F33] font-semibold">
                {factorStrategy === 'totp' 
                  ? t({ en: 'Enter the code from your authenticator app.', ar: 'أدخل الرمز من تطبيق المصادقة الخاص بك.' })
                  : t({ en: 'Enter the verification code sent to your device.', ar: 'أدخل رمز التحقق المرسل إلى جهازك.' })
                }
              </p>
            </div>
            
            <div>
              <input
                type="text"
                placeholder="123456"
                maxLength={6}
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                aria-label={t({ en: 'Two-factor authentication code', ar: 'رمز التحقق بخطوتين' })}
                className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
            >
              {loading ? t({ en: 'Verifying...', ar: 'جاري التحقق...' }) : t({ en: 'Verify & Sign In', ar: 'التحقق وتسجيل الدخول' })}
            </button>

<button
        type="button"
        onClick={() => setShow2FA(false)}
        className="w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] text-[#141F33] bg-[#F8F9FB] border border-[#141F33]/10 hover:bg-[#141F33] transition-all"
      >
        {t({ en: 'Back to Sign In', ar: 'العودة لتسجيل الدخول' })}
      </button>
          </form>
        ) : (
          /* Standard Sign-In Form */
          <>
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

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="password" className="block text-xs font-bold text-[#141F33]">{t({ en: 'Password', ar: 'كلمة المرور' })}</label>
                  <Link href="/forgot-password" className="text-[10px] font-bold text-[#2A5CFF] hover:underline">
                    {t({ en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' })}
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
              >
                {loading ? t({ en: 'Signing In...', ar: 'جاري تسجيل الدخول...' }) : t({ en: 'Sign In', ar: 'تسجيل الدخول' })}
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#141F33]/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#F8F9FB] px-3 text-[#141F33] font-bold">{t({ en: 'Or continue with', ar: 'أو الاستمرار بواسطة' })}</span>
              </div>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-8">
              <button
                onClick={() => handleOAuth('oauth_google')}
                className="flex items-center justify-center border border-[#141F33]/10 rounded-xl py-3 px-6 text-xs font-bold text-[#141F33] hover:bg-[#141F33] transition-colors min-h-[44px]"
              >
                Google
              </button>
              <button
                onClick={() => addToast('Enterprise SSO login is coming soon.', 'info')}
                className="flex items-center justify-center border border-[#141F33]/10 rounded-xl py-3 px-6 text-xs font-bold text-[#141F33] hover:bg-[#141F33] transition-colors min-h-[44px]"
              >
                SSO
              </button>
            </div>

            {/* Footer Link */}
            <p className="text-center text-xs text-[#141F33] font-bold mt-8">
              {t({ en: "Don't have an account?", ar: 'ليس لديك حساب؟' })}{' '}
              <Link href="/sign-up" className="text-[#2A5CFF] hover:underline">
                {t({ en: 'Sign Up', ar: 'إنشاء حساب' })}
              </Link>
            </p>
          </>
        )}

      </div>
    </div>
  );
}
