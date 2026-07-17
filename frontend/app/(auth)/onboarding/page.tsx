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
    <div className="flex min-h-screen bg-surface items-center justify-center px-4 py-12" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
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
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                {t({ en: `Step ${step} of 5`, ar: `Ø§Ù„Ø®Ø·ÙˆØ© ${step} Ù…Ù† 5` })}
              </span>
              <span className="text-xs font-bold text-accent">{getProgressPercentage()}%</span>
            </div>

            {/* Step 1: Welcome */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Welcome to SAQYN RABT', ar: 'Ù…Ø±Ø­Ø¨Ø§Ù‹ Ø¨Ùƒ ÙÙŠ SAQYN RABT' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: "Let's personalize your workspace dashboard. What is your full name?", ar: 'Ø¯Ø¹Ù†Ø§ Ù†Ø®ØµØµ Ù„ÙˆØ­Ø© Ø§Ù„ØªØ­ÙƒÙ… Ø§Ù„Ø®Ø§ØµØ© Ø¨Ùƒ. Ù…Ø§ Ù‡Ùˆ Ø§Ø³Ù…Ùƒ Ø§Ù„ÙƒØ§Ù…Ù„ØŸ' })}
                </p>
                <div>
                  <label htmlFor="userName" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Your Name', ar: 'Ø§Ø³Ù…Ùƒ' })}</label>
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
                  {t({ en: 'Company Details', ar: 'ØªÙØ§ØµÙŠÙ„ Ø§Ù„Ø´Ø±ÙƒØ©' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Tell us a bit about your organization to set up your workspace.', ar: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ù‚Ù„ÙŠÙ„Ø§Ù‹ Ø¹Ù† Ø´Ø±ÙƒØªÙƒ Ù„ØªÙ‡ÙŠØ¦Ø© Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„.' })}
                </p>
                
                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Company Name', ar: 'Ø§Ø³Ù… Ø§Ù„Ø´Ø±ÙƒØ©' })}</label>
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
                    <label htmlFor="industry" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Industry', ar: 'Ø§Ù„Ù‚Ø·Ø§Ø¹' })}</label>
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
                    <label htmlFor="size" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Company Size', ar: 'Ø­Ø¬Ù… Ø§Ù„Ø´Ø±ÙƒØ©' })}</label>
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
                  {t({ en: 'Product Preferences', ar: 'ØªÙØ¶ÙŠÙ„Ø§Øª Ø§Ù„Ù…Ù†ØªØ¬Ø§Øª' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Choose which product workspace we should configure first.', ar: 'Ø§Ø®ØªØ± Ù…Ø³Ø§Ø­Ø© Ø¹Ù…Ù„ Ø§Ù„Ù…Ù†ØªØ¬ Ø§Ù„ØªÙŠ ØªØ±ØºØ¨ ÙÙŠ ØªÙ‡ÙŠØ¦ØªÙ‡Ø§ Ø£ÙˆÙ„Ø§Ù‹.' })}
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
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Business Automation', ar: 'ØªÙ‡ÙŠØ¦Ø© Ø£ØªÙ…ØªØ© Ø§Ù„Ø£Ø¹Ù…Ø§Ù„' })}</p>
                      <p className="text-[10px] text-primary font-medium mt-0.5">{t({ en: 'Automate guest phone bookings & complaints.', ar: 'Ø£ØªÙ…ØªØ© Ø­Ø¬ÙˆØ²Ø§Øª Ø§Ù„Ù‡Ø§ØªÙ ÙˆØ´ÙƒØ§ÙˆÙ‰ Ø§Ù„Ø¶ÙŠÙˆÙ.' })}</p>
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
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Staff Knowledge Chatbot', ar: 'ØªÙ‡ÙŠØ¦Ø© Ù…Ø³Ø§Ø¹Ø¯ Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' })}</p>
                      <p className="text-[10px] text-primary font-medium mt-0.5">{t({ en: 'Train AI on internal policies and handbook.', ar: 'ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ Ø¹Ù„Ù‰ Ø§Ù„Ø³ÙŠØ§Ø³Ø§Øª ÙˆØ§Ù„ÙƒØªÙŠØ¨ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ.' })}</p>
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
                      <p className="text-xs font-bold text-primary">{t({ en: 'Set up Both Products', ar: 'ØªÙ‡ÙŠØ¦Ø© ÙƒÙ„Ø§ Ø§Ù„Ù…Ù†ØªØ¬ÙŠÙ†' })}</p>
                      <p className="text-[10px] text-primary font-medium mt-0.5">{t({ en: 'Unify internal knowledge and front-desk call automation.', ar: 'ØªÙˆØ­ÙŠØ¯ Ø§Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠØ© ÙˆØ£ØªÙ…ØªØ© Ù…ÙƒØ§Ù„Ù…Ø§Øª Ø§Ù„Ø§Ø³ØªÙ‚Ø¨Ø§Ù„.' })}</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Step 4: Invite Team */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <h2 className="text-2xl font-extrabold text-primary leading-tight">
                  {t({ en: 'Invite Your Team', ar: 'Ø¯Ø¹ÙˆØ© ÙØ±ÙŠÙ‚Ùƒ' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Add your staff members now so they can start accessing knowledge handbooks.', ar: 'Ø£Ø¶Ù Ù…ÙˆØ¸ÙÙŠÙƒ Ø§Ù„Ø¢Ù† Ù„ÙŠØªÙ…ÙƒÙ†ÙˆØ§ Ù…Ù† Ø§Ù„ÙˆØµÙˆÙ„ Ù„ÙƒØªÙŠØ¨Ø§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ©.' })}
                </p>
                
                <div>
                  <label htmlFor="teamInvites" className="block text-xs font-bold text-primary mb-1.5">
                    {t({ en: 'Team Emails (comma separated)', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ Ù„Ù„ÙØ±ÙŠÙ‚ (Ù…ÙØµÙˆÙ„ Ø¨ÙØ§ØµÙ„Ø©)' })}
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
                  {t({ en: 'First Policy Document', ar: 'Ù…Ø³ØªÙ†Ø¯ Ø§Ù„Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø£ÙˆÙ„' })}
                </h2>
                <p className="text-xs font-semibold text-primary leading-relaxed">
                  {t({ en: 'Upload your first SOP or employee handbook to train your RAG assistant immediately.', ar: 'Ù‚Ù… Ø¨ØªØ­Ù…ÙŠÙ„ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø£Ùˆ Ø¥Ø¬Ø±Ø§Ø¡ Ø§Ù„ØªØ´ØºÙŠÙ„ Ù„ØªØ¯Ø±ÙŠØ¨ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ ÙÙˆØ±Ù‹Ø§.' })}
                </p>

                <div className="border-2 border-dashed border-primary/10 rounded-xl p-8 bg-surface flex flex-col items-center justify-center text-center">
                  <FileText className="w-8 h-8 text-primary mb-2" />
                  <p className="text-xs font-bold text-primary">{t({ en: 'Drop policy PDF here to start', ar: 'Ø§Ø³Ù‚Ø· Ù…Ù„Ù PDF Ù„Ù„Ø³ÙŠØ§Ø³Ø© Ù‡Ù†Ø§ Ù„Ù„Ø¨Ø¯Ø¡' })}</p>
                  <span className="text-[10px] text-primary font-semibold mt-1">{t({ en: 'Or click below to browse (optional)', ar: 'Ø£Ùˆ Ø§Ø¶ØºØ· Ø£Ø¯Ù†Ø§Ù‡ Ù„Ù„ØªØµÙØ­ (Ø§Ø®ØªÙŠØ§Ø±ÙŠ)' })}</span>
                </div>
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
                {t({ en: 'Back', ar: 'Ø§Ù„Ø³Ø§Ø¨Ù‚' })}
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 bg-primary hover:opacity-95 text-surface font-bold py-3 px-6 rounded-xl transition-all text-xs min-h-[44px] flex items-center justify-center"
            >
              {submitting
                ? t({ en: 'Saving...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' })
                : step === 5
                  ? t({ en: 'Complete Setup', ar: 'Ø¥ÙƒÙ…Ø§Ù„ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯' })
                  : t({ en: 'Continue', ar: 'Ù…ØªØ§Ø¨Ø¹Ø©' })}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
