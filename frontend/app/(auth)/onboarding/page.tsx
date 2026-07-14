'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useLocale } from '../../providers';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export default function OnboardingWizardPage() {
  const { locale } = useLocale();
  const router = useRouter();
  const { getToken, isSignedIn } = useAuth();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: '',
    companyName: '',
    industry: 'Hospitality',
    size: '11-50',
    setupPreference: 'both',
    teamInvites: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saqyn-onboarding');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setFormData(prev => ({ ...prev, ...parsed }));
        } catch {}
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saqyn-onboarding', JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = async () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      setSubmitting(true);
      try {
        if (isSignedIn) {
          await fetch('/api/onboarding', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
        }
        if (typeof window !== 'undefined') {
          localStorage.removeItem('saqyn-onboarding');
        }
        router.push('/dashboard');
      } catch {
        router.push('/dashboard');
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const getProgressPercentage = () => {
    return (step / 5) * 100;
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FB] items-center justify-center px-4 py-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-lg overflow-hidden animate-fadeIn flex flex-col justify-between min-h-[500px]">
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2">
          <div
            className="bg-[#2A5CFF] h-2 rounded-r transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="p-8 md:p-12 flex-1 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#718096]">
                {t({ en: `Step ${step} of 5`, ar: `الخطوة ${step} من 5` })}
              </span>
              <span className="text-xs font-bold text-[#2A5CFF]">{getProgressPercentage()}%</span>
            </div>

            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-[#141F33] leading-tight">
                  {t({ en: 'Welcome to SAQYN RABT', ar: 'مرحباً بك في SAQYN RABT' })}
                </h2>
                <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                  {t({ en: "Let's personalize your workspace dashboard. What is your full name?", ar: 'دعنا نخصص لوحة التحكم الخاصة بك. ما هو اسمك الكامل؟' })}
                </p>
                <div>
                  <label htmlFor="userName" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Your Name', ar: 'اسمك' })}</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Salah Al-Qahtani"
                    className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Company Details */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-[#141F33] leading-tight">
                  {t({ en: 'Company Details', ar: 'تفاصيل الشركة' })}
                </h2>
                <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                  {t({ en: 'Tell us a bit about your organization to set up your workspace.', ar: 'أخبرنا قليلاً عن شركتك لتهيئة مساحة العمل.' })}
                </p>
                
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Company Name', ar: 'اسم الشركة' })}</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Al-Safa Hospitality"
                    className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Industry', ar: 'القطاع' })}</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33] focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                    >
                      <option value="Hospitality">Hospitality</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Home Services">Home Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Company Size', ar: 'حجم الشركة' })}</label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-bold text-[#141F33] focus:outline-none focus:ring-2 focus:ring-[#141F33]"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-150">51-150 employees</option>
                      <option value="151+">151+ employees</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Product Setup */}
            {step === 3 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-[#141F33] leading-tight">
                  {t({ en: 'Product Preferences', ar: 'تفضيلات المنتجات' })}
                </h2>
                <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                  {t({ en: 'Choose which product workspace we should configure first.', ar: 'اختر مساحة عمل المنتج التي ترغب في تهيئتها أولاً.' })}
                </p>

                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#141F33] cursor-pointer bg-[#F8F9FB]">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="automation"
                      checked={formData.setupPreference === 'automation'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#141F33] focus:ring-[#141F33]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#141F33]">{t({ en: 'Set up Business Automation', ar: 'تهيئة أتمتة الأعمال' })}</p>
                      <p className="text-[10px] text-[#718096] font-medium mt-0.5">{t({ en: 'Automate guest phone bookings & complaints.', ar: 'أتمتة حجوزات الهاتف وشكاوى الضيوف.' })}</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#141F33] cursor-pointer bg-[#F8F9FB]">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="chatbot"
                      checked={formData.setupPreference === 'chatbot'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#141F33] focus:ring-[#141F33]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#141F33]">{t({ en: 'Set up Staff Knowledge Chatbot', ar: 'تهيئة مساعد معرفة الموظفين' })}</p>
                      <p className="text-[10px] text-[#718096] font-medium mt-0.5">{t({ en: 'Train AI on internal policies and handbook.', ar: 'تدريب الذكاء الاصطناعي على السياسات والكتيب الداخلي.' })}</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#141F33] cursor-pointer bg-[#F8F9FB]">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="both"
                      checked={formData.setupPreference === 'both'}
                      onChange={handleChange}
                      className="h-4 w-4 text-[#141F33] focus:ring-[#141F33]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#141F33]">{t({ en: 'Set up Both Products', ar: 'تهيئة كلا المنتجين' })}</p>
                      <p className="text-[10px] text-[#718096] font-medium mt-0.5">{t({ en: 'Unify internal knowledge and front-desk call automation.', ar: 'توحيد المعرفة الداخلية وأتمتة مكالمات الاستقبال.' })}</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Invite Team */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-[#141F33] leading-tight">
                  {t({ en: 'Invite Your Team', ar: 'دعوة فريقك' })}
                </h2>
                <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                  {t({ en: 'Add your staff members now so they can start accessing knowledge handbooks.', ar: 'أضف موظفيك الآن ليتمكنوا من الوصول لكتيبات المعرفة.' })}
                </p>
                
                <div>
                  <label htmlFor="teamInvites" className="block text-xs font-bold text-[#141F33] mb-1.5">
                    {t({ en: 'Team Emails (comma separated)', ar: 'البريد الإلكتروني للفريق (مفصول بفاصلة)' })}
                  </label>
                  <textarea
                    id="teamInvites"
                    name="teamInvites"
                    rows={3}
                    value={formData.teamInvites}
                    onChange={handleChange}
                    placeholder="manager@alsafa.qa, staff@alsafa.qa"
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33] resize-none"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Knowledge Base */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-[#141F33] leading-tight">
                  {t({ en: 'First Policy Document', ar: 'مستند السياسة الأول' })}
                </h2>
                <p className="text-xs font-semibold text-[#718096] leading-relaxed">
                  {t({ en: 'Upload your first SOP or employee handbook to train your RAG assistant immediately.', ar: 'قم بتحميل دليل الموظفين أو إجراء التشغيل لتدريب المساعد فورًا.' })}
                </p>

                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 bg-slate-50 flex flex-col items-center justify-center text-center">
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <p className="text-xs font-bold text-[#141F33]">{t({ en: 'Drop policy PDF here to start', ar: 'اسقط ملف PDF للسياسة هنا للبدء' })}</p>
                  <span className="text-[10px] text-[#718096] font-semibold mt-1">{t({ en: 'Or click below to browse (optional)', ar: 'أو اضغط أدناه للتصفح (اختياري)' })}</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-50 hover:bg-gray-100 text-[#141F33] font-bold py-3 px-6 rounded-xl border border-gray-200 transition-all text-xs min-h-[44px]"
              >
                {t({ en: 'Back', ar: 'السابق' })}
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-[#141F33] hover:opacity-95 text-white font-bold py-3 px-6 rounded-xl transition-all text-xs min-h-[44px] flex items-center justify-center"
            >
              {submitting
                ? t({ en: 'Saving...', ar: 'جاري الحفظ...' })
                : step === 5
                  ? t({ en: 'Complete Setup', ar: 'إكمال الإعداد' })
                  : t({ en: 'Continue', ar: 'متابعة' })}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
