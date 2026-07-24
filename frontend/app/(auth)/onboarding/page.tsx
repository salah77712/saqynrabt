'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    <div className="flex min-h-screen bg-surface items-center justify-center px-4 py-12">
      <div className="bg-surface rounded-xl shadow-xl border border-primary/10 w-full max-w-lg overflow-hidden animate-fadeIn flex flex-col justify-between min-h-[500px]">
        
        {/* Progress Bar */}
        <div className="w-full bg-surface h-2">
          <div
            className="bg-accent h-2 rounded-r transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>

        <div className="p-8 flex-1 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-primary">
                {t({ en: `Step ${step} of 5`, ar: `الخطوة ${step} من 5` })}
              </span>
              <span className="text-xs font-bold text-accent">{getProgressPercentage()}%</span>
            </div>

            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Welcome to SAQYN RABT', ar: 'مرحباً بك في SAQYN RABT' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: "Let's personalize your workspace dashboard. What is your full name?", ar: 'دعنا نخصص لوحة التحكم الخاصة بك. ما هو اسمك الكامل؟' })}
                </p>
                <div>
                  <label htmlFor="userName" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Your Name', ar: 'اسمك' })}</label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={formData.userName}
                    onChange={handleChange}
                    placeholder="Salah Al-Qahtani"
                    className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Company Details */}
            {step === 2 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Company Details', ar: 'تفاصيل الشركة' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Tell us a bit about your organization to set up your workspace.', ar: 'أخبرنا قليلاً عن شركتك لتهيئة مساحة العمل.' })}
                </p>
                
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Company Name', ar: 'اسم الشركة' })}</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Al-Safa Hospitality"
                    className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <label htmlFor="industry" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Industry', ar: 'القطاع' })}</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-3 text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                    >
                      <option value="Hospitality">Hospitality</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Real Estate">Real Estate</option>
                      <option value="Home Services">Home Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Company Size', ar: 'حجم الشركة' })}</label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-3 text-xs font-bold text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
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
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Product Preferences', ar: 'تفضيلات المنتجات' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Choose which product workspace we should configure first.', ar: 'اختر مساحة عمل المنتج التي ترغب في تهيئتها أولاً.' })}
                </p>

                <div className="flex flex-col gap-4 pt-2">
                  <label className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary cursor-pointer bg-surface">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="automation"
                      checked={formData.setupPreference === 'automation'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-2 focus:ring-royal"
                    />
                    <div>
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Business Automation', ar: 'تهيئة أتمتة الأعمال' })}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Automate guest phone bookings & complaints.', ar: 'أتمتة حجوزات الهاتف وشكاوى الضيوف.' })}</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary cursor-pointer bg-surface">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="chatbot"
                      checked={formData.setupPreference === 'chatbot'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-2 focus:ring-royal"
                    />
                    <div>
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Staff Knowledge Chatbot', ar: 'تهيئة مساعد معرفة الموظفين' })}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Train AI on internal policies and handbook.', ar: 'تدريب الذكاء الاصطناعي على السياسات والكتيب الداخلي.' })}</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:border-primary cursor-pointer bg-surface">
                    <input
                      type="radio"
                      name="setupPreference"
                      value="both"
                      checked={formData.setupPreference === 'both'}
                      onChange={handleChange}
                      className="h-4 w-4 text-primary focus:ring-2 focus:ring-royal"
                    />
                    <div>
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Both Products', ar: 'تهيئة كلا المنتجين' })}</p>
                      <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Unify internal knowledge and front-desk call automation.', ar: 'توحيد المعرفة الداخلية وأتمتة مكالمات الاستقبال.' })}</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Invite Team */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Invite Your Team', ar: 'دعوة فريقك' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Add your staff members now so they can start accessing knowledge handbooks.', ar: 'أضف موظفيك الآن ليتمكنوا من الوصول لكتيبات المعرفة.' })}
                </p>
                
                <div>
                  <label htmlFor="teamInvites" className="block text-xs font-bold text-primary mb-1.5">
                    {t({ en: 'Team Emails (comma separated)', ar: 'البريد الإلكتروني للفريق (مفصول بفاصلة)' })}
                  </label>
                  <textarea
                    id="teamInvites"
                    name="teamInvites"
                    rows={3}
                    value={formData.teamInvites}
                    onChange={handleChange}
                    placeholder="manager@alsafa.qa, staff@alsafa.qa"
                    className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal resize-none min-h-[44px]"
                  />
                </div>
              </div>
            )}

            {/* Step 5: Knowledge Base */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'First Policy Document', ar: 'مستند السياسة الأول' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Upload your first SOP or employee handbook to train your RAG assistant immediately.', ar: 'قم بتحميل دليل الموظفين أو إجراء التشغيل لتدريب المساعد فورًا.' })}
                </p>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0] || null;
                    if (file && file.size > 20 * 1024 * 1024) {
                      setFileError(t({ en: 'File exceeds 20MB limit', ar: 'الملف يتجاوز الحد الأقصى 20 ميجابايت' }));
                      setSelectedFile(null);
                      return;
                    }
                    setFileError(null);
                    setSelectedFile(file);
                  }}
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 bg-surface flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                    selectedFile
                      ? 'border-green-500 bg-green-50/50'
                      : 'border-primary/10 hover:border-primary/30'
                  }`}
                >
                  {selectedFile ? (
                    <>
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <p className="text-xs font-bold text-green-700">{selectedFile.name}</p>
                      <span className="text-[10px] text-green-600 font-semibold mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB
                      </span>
                      <span className="text-[10px] text-primary font-medium mt-2">
                        {t({ en: 'Click to change', ar: 'انقر للتغيير' })}
                      </span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-8 h-8 text-primary mb-2" />
                      <p className="text-xs font-bold text-primary">{t({ en: 'Drop policy PDF here to start', ar: 'اسقط ملف PDF للسياسة هنا للبدء' })}</p>
                      <span className="text-xs text-primary font-semibold mt-1">{t({ en: 'Or click below to browse (optional)', ar: 'أو اضغط أدناه للتصفح (اختياري)' })}</span>
                    </>
                  )}
                </div>

                {fileError && (
                  <p className="text-xs font-semibold text-red-500 text-center">{fileError}</p>
                )}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-8 mt-8 pt-6 border-t border-primary/10">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-surface hover:bg-primary text-primary font-bold py-3 px-6 rounded-xl border border-primary/10 transition-all text-xs min-h-[44px]"
              >
                {t({ en: 'Back', ar: 'السابق' })}
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-primary hover:opacity-95 text-surface font-bold py-3 px-6 rounded-xl transition-all text-xs min-h-[44px] flex items-center justify-center"
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
