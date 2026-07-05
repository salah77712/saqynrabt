'use client';

import React, { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '../../../providers';

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Live password strength meter evaluation (Section 2.3)
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-gray-100', score: 0 };
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

    if (score === 1) return { label: t({ en: 'Weak', ar: 'ضعيف' }), color: 'bg-red-500', score: 33 };
    if (score === 2) return { label: t({ en: 'Medium', ar: 'متوسط' }), color: 'bg-amber-500', score: 66 };
    return { label: t({ en: 'Strong', ar: 'قوي' }), color: 'bg-emerald-500', score: 100 };
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
      await signUp.create({
        emailAddress: email,
        password,
      });

      // Send the email verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      
      // Redirect to onboarding/verification page
      router.push('/onboarding');
    } catch (err: any) {
      console.error("SignUp Error:", err);
      const msg = err.errors?.[0]?.message || err.message || t({ en: 'Network error. Please check your connection and try again.', ar: 'خطأ في الشبكة. يرجى التحقق من الاتصال والمحاولة مرة أخرى.' });
      setError(msg);
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

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3.5 text-xs font-bold mb-6">
            ⚠️ {error}
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
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
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
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
              required
            />
            {/* Live Password Strength Meter */}
            {password && (
              <div className="mt-2 flex items-center justify-between gap-3 text-[10px] font-bold">
                <div className="flex-1 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`${strength.color} h-1.5 rounded-full transition-all duration-300`}
                    style={{ width: `${strength.score}%` }}
                  />
                </div>
                <span className="text-[#718096] uppercase shrink-0">{strength.label}</span>
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
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
              required
            />
          </div>

          {/* Terms Checkbox */}
          <label className="flex items-start gap-3 py-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#141F33] focus:ring-[#141F33]"
            />
            <span className="text-[11px] font-semibold text-[#718096]">
              {t({ en: 'I agree to the Terms and Privacy Policy.', ar: 'أوافق على الشروط وسياسة الخصوصية.' })}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {loading ? t({ en: 'Creating Account...', ar: 'جاري إنشاء الحساب...' }) : t({ en: 'Create Account', ar: 'إنشاء الحساب' })}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#718096] font-bold mt-8">
          {t({ en: 'Already have an account?', ar: 'لديك حساب بالفعل؟' })}{' '}
          <Link href="/sign-in" className="text-[#2A5CFF] hover:underline">
            {t({ en: 'Sign In', ar: 'تسجيل الدخول' })}
          </Link>
        </p>

      </div>
    </div>
  );
}
