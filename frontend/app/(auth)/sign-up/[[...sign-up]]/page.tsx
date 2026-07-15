'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '../../../providers';
import { Mail, Lock, Briefcase } from 'lucide-react';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [email, setEmail] = useState(emailParam);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Live password strength meter evaluation (Section 2.3)
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-[#F8F9FB]', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) return { label: t({ en: 'Weak', ar: 'ضعيف' }), color: 'bg-[#141F33]', score: 33 };
    if (score === 2) return { label: t({ en: 'Medium', ar: 'متوسط' }), color: 'bg-[#2A5CFF]', score: 66 };
    return { label: t({ en: 'Strong', ar: 'قوي' }), color: 'bg-[#2A5CFF]', score: 100 };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setError(t({ en: 'Passwords do not match.', ar: 'كلمات المرور غير متطابقة.' }));
      return;
    }

    if (!agree) {
      setError(t({ en: 'You must agree to the Terms and Privacy Policy.', ar: 'يجب عليك الموافقة على الشروط وسياسة الخصوصية.' }));
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Verify invitation if the URL contains an email parameter
      if (emailParam) {
        const inviteCheckRes = await fetch(`/api/check-invite?email=${encodeURIComponent(email)}`);
        const inviteCheckData = await inviteCheckRes.json();
        if (!inviteCheckRes.ok || !inviteCheckData.invited) {
          setError(t({
            en: 'This invitation is no longer valid or has expired.',
            ar: 'هذه الدعوة لم تعد صالحة أو انتهت صلاحيتها.'
          }));
          setLoading(false);
          return;
        }
      }

      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err: any) {
      console.error("SignUp Error:", err);
      const msg = err.errors?.[0]?.message || err.message || t({ en: 'Network error. Please check your connection and try again.', ar: 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.' });
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true);
    setError('');

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push('/onboarding');
      } else {
        console.error('Incomplete signup status:', completeSignUp);
        setError(t({ en: 'Sign up incomplete. Please try again.', ar: 'لم يكتمل التسجيل. يرجى المحاولة مرة أخرى.' }));
      }
    } catch (err: any) {
      console.error("Verification Error:", err);
      setError(err.errors?.[0]?.message || err.message || t({ en: 'Verification failed. Please check the code.', ar: 'فشل التحقق. يرجى التحقق من الرمز.' }));
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="flex min-h-screen bg-[#F8F9FB] items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <div className="bg-[#F8F9FB] rounded-[40px] shadow-xl p-8 border border-[#141F33]/10 w-full max-w-md animate-fadeIn text-center">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="flex flex-col items-center gap-1">
              <span className="text-[#141F33] font-extrabold text-2xl tracking-tight">SAQYN RABT</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#141F33]/60 font-bold">{t({ en: 'PRIVATE AI OPS', ar: 'عمليات الذكاء الاصطناعي الخاصة' })}</span>
            </Link>
          </div>

          <div className="text-4xl mb-4"><Mail className="w-10 h-10 text-primary inline-block" /></div>
          <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
            {t({ en: 'Verify Your Email', ar: 'تأكيد بريدك الإلكتروني' })}
          </h2>
          <p className="text-xs font-semibold text-[#141F33]/60 mb-6 leading-relaxed">
            {t({ 
              en: `Please enter the 6-digit verification code sent to ${email}.`, 
              ar: `يرجى إدخال رمز التحقق المكون من 6 أرقام المرسل إلى ${email}.` 
            })}
          </p>

{error && (
    <div className="bg-[#141F33] border border-[#141F33]/10 text-[#141F33] rounded-[40px] p-3.5 text-xs font-bold mb-6 text-center">
{error}
</div>
)}

          <form onSubmit={handleVerification} className="space-y-4">
            <input
              type="text"
              placeholder="123456"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] px-4 py-3 text-center text-sm font-bold tracking-widest text-[#141F33] focus:outline-none focus:ring-2 focus:ring-2 focus:ring-royal"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-[40px] text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
            >
              {loading ? t({ en: 'Verifying...', ar: 'جاري التحقق...' }) : t({ en: 'Verify & Activate Account', ar: 'التحقق وتنشيط الحساب' })}
            </button>
          </form>

        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] items-center justify-center px-4" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-[#F8F9FB] rounded-[40px] shadow-xl p-8 border border-[#141F33]/10 w-full max-w-md animate-fadeIn">
        
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="flex flex-col items-center gap-1">
            <span className="text-[#141F33] font-extrabold text-2xl tracking-tight">SAQYN RABT</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#141F33]/60 font-bold">{t({ en: 'PRIVATE AI OPS', ar: 'عمليات الذكاء الاصطناعي الخاصة' })}</span>
          </Link>
        </div>

{error && (
<div className="bg-[#141F33] border border-[#141F33]/10 text-[#141F33] rounded-[40px] p-3.5 text-xs font-bold mb-6" role="alert" aria-live="assertive">
{error}
</div>
)}

        {/* Dynamic Role & Account Type Notices */}
        {emailParam ? (
          <div className="mb-6 p-4 rounded-[40px] bg-[#F8F9FB] border border-[#2A5CFF]/10/80 text-[#2A5CFF] flex items-start gap-4.5 shadow-sm">
            <Lock className="w-5 h-5 text-[#141F33] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black tracking-wide uppercase text-[#2A5CFF]">
                {t({ en: "Invited Workspace Account", ar: "حساب مساحة عمل مدعو" })}
              </h4>
              <p className="text-[11px] leading-relaxed font-semibold text-[#2A5CFF]/90 mt-1">
                {t({
                  en: "You are registering as an invited employee. Your email address is locked to the address invited by your administrator.",
                  ar: "أنت تسجل كموظف مدعو. عنوان بريدك الإلكتروني مقفل على العنوان الذي دعاك إليه مسؤول النظام."
                })}
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 rounded-[40px] bg-[#F8F9FB] border border-[#2A5CFF]/10/80 text-[#141F33] flex items-start gap-4.5 shadow-sm">
            <Briefcase className="w-5 h-5 text-[#141F33] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-black tracking-wide uppercase text-[#2A5CFF]">
                {t({ en: "New Business Workspace", ar: "مساحة عمل جديدة للشركة" })}
              </h4>
              <p className="text-[11px] leading-relaxed font-semibold text-[#2A5CFF]/90 mt-1">
                {t({
                  en: "Creating a new business workspace? The email you register with will automatically receive the Administrator role with full dashboard access.",
                  ar: "هل تقوم بإنشاء مساحة عمل جديدة للشركة؟ سيتلقى البريد الإلكتروني الذي تسجل به تلقائياً دور المسؤول مع إمكانية الوصول الكامل للوحة التحكم."
                })}
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!!emailParam}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-2 focus:ring-royal disabled:opacity-70 disabled:cursor-not-allowed"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Password', ar: 'كلمة المرور' })}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-2 focus:ring-royal"
              required
            />
            {/* Live Password Strength Meter */}
            {password && (
              <div className="mt-3 flex items-center justify-between gap-4 text-[10px] font-bold">
                <div className="flex-1 bg-[#F8F9FB] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${strength.color} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <span className="text-[#141F33]/60 uppercase shrink-0">{strength.label}</span>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Confirm Password', ar: 'تأكيد كلمة المرور' })}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-[40px] px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-2 focus:ring-royal"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-4 py-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#141F33]/20 text-[#141F33] focus:ring-2 focus:ring-royal"
            />
            <span className="text-[11px] font-semibold text-[#141F33]/60">
              {t({ en: 'I agree to the Terms and Privacy Policy.', ar: 'أوافق على الشروط وسياسة الخصوصية.' })}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-[40px] text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {loading ? t({ en: 'Creating Account...', ar: 'جاري إنشاء الحساب...' }) : t({ en: 'Create Account', ar: 'إنشاء الحساب' })}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#141F33]/60 font-bold mt-8">
          {t({ en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' })}{' '}
          <Link href="/sign-in" className="text-[#2A5CFF] hover:underline">
            {t({ en: 'Sign In', ar: 'تسجيل الدخول' })}
          </Link>
        </p>

      </div>
    </div>
  );
}
