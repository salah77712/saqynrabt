'use client';

import React, { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MapPin, Mail, Phone, LoaderCircle } from 'lucide-react';
import { useGlobalToast } from '../../lib/toast';

export default function ContactPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Demo Request',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useGlobalToast();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = t({ en: 'Name is required.', ar: 'الاسم مطلوب.' });
    }
    if (!formData.email.trim()) {
      newErrors.email = t({ en: 'Email is required.', ar: 'البريد الإلكتروني مطلوب.' });
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t({ en: 'Email is invalid.', ar: 'البريد الإلكتروني غير صالح.' });
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t({ en: 'Phone number is required.', ar: 'رقم الهاتف مطلوب.' });
    } else if (!/^\+?[\d\s\-().]{7,20}$/.test(formData.phone)) {
      newErrors.phone = t({ en: 'Enter a valid phone number (e.g. +974 5500 0000).', ar: 'أدخل رقم هاتف صحيح (مثال: 974+ 5500 0000).' });
    }
    if (!formData.message.trim()) {
      newErrors.message = t({ en: 'Message is required.', ar: 'الرسالة مطلوبة.' });
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Submission failed');
      addToast(
        t({ en: 'Message sent successfully! We\'ll get back to you within 24 hours.', ar: 'تم إرسال الرسالة بنجاح! سنعاود الاتصال بك خلال 24 ساعة.' }),
        'success',
      );
      setFormData({ name: '', email: '', phone: '', subject: 'Demo Request', message: '' });
      setErrors({});
    } catch {
      addToast(
        t({ en: 'Failed to send message. Please try again.', ar: 'فشل في إرسال الرسالة. حاول مرة أخرى.' }),
        'error',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 w-full">
        
        {/* Split Screen 50/50 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-30 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-primary mb-2">
              {t({ en: 'Send us a message', ar: 'Ø£Ø±Ø³Ù„ Ù„Ù†Ø§ Ø±Ø³Ø§Ù„Ø©' })}
            </h2>
            <p className="text-xs font-semibold text-primary mb-6">
              {t({ en: 'Fill out the form below and our team will get back to you shortly.', ar: 'Ø§Ù…Ù„Ø£ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ Ø£Ø¯Ù†Ø§Ù‡ ÙˆØ³ÙŠØªØµÙ„ Ø¨Ùƒ ÙØ±ÙŠÙ‚Ù†Ø§ Ù‚Ø±ÙŠØ¨Ù‹Ø§.' })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Name', ar: 'Ø§Ù„Ø§Ø³Ù…' })}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className={`w-full min-h-[44px] bg-surface border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal ${
                    errors.name ? 'border-red-600' : 'border-primary/10'
                  }`}
                />
                {errors.name && <p className="text-primary text-[10px] font-bold mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Email Address', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className={`w-full min-h-[44px] bg-surface border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal ${
                    errors.email ? 'border-red-600' : 'border-primary/10'
                  }`}
                />
                {errors.email && <p className="text-primary text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Phone Number', ar: 'Ø±Ù‚Ù… Ø§Ù„Ù‡Ø§ØªÙ' })}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="^\+?[\d\s\-().]{7,20}$"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  className={`w-full min-h-[44px] bg-surface border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal ${
                    errors.phone ? 'border-red-600' : 'border-primary/10'
                  }`}
                />
                {errors.phone && <p className="text-primary text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Subject', ar: 'Ø§Ù„Ù…ÙˆØ¶ÙˆØ¹' })}</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
                >
                  <option value="Demo Request">{t({ en: 'Demo Request', ar: 'Ø·Ù„Ø¨ Ø¹Ø±Ø¶ ØªÙˆØ¶ÙŠØ­ÙŠ' })}</option>
                  <option value="Support">{t({ en: 'Support', ar: 'Ø§Ù„Ø¯Ø¹Ù… Ø§Ù„ÙÙ†ÙŠ' })}</option>
                  <option value="Partnership">{t({ en: 'Partnership', ar: 'Ø´Ø±Ø§ÙƒØ©' })}</option>
                  <option value="Sales">{t({ en: 'Sales & Billing', ar: 'Ø§Ù„Ù…Ø¨ÙŠØ¹Ø§Øª ÙˆØ§Ù„ÙÙˆØªØ±Ø©' })}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Message', ar: 'Ø§Ù„Ø±Ø³Ø§Ù„Ø©' })}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  className={`w-full bg-surface border rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal resize-none ${
                    errors.message ? 'border-red-600' : 'border-primary/10'
                  }`}
                />
                {errors.message && <p className="text-primary text-[10px] font-bold mt-1">{errors.message}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-surface font-bold py-3 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
              >
                {submitting ? <LoaderCircle className="w-4 h-4 animate-spin" /> : t({ en: 'Submit Message', ar: 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø±Ø³Ø§Ù„Ø©' })}
              </button>
            </form>
          </div>

          {/* Right Column: Office Info */}
          <div className="space-y-8 lg:pt-8 text-center lg:text-start">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Get in touch', ar: 'ØªÙˆØ§ØµÙ„ Ù…Ø¹Ù†Ø§' })}</span>
              <h1 className="text-2xl md:text-4xl font-extrabold text-primary tracking-tight mt-3">
                {t({ en: 'Tell us what you need.', ar: 'Ø£Ø®Ø¨Ø±Ù†Ø§ Ø¨Ù…Ø§ ØªØ­ØªØ§Ø¬Ù‡.' })}
              </h1>
              <p className="text-sm font-semibold text-primary mt-4 leading-relaxed max-w-md mx-auto lg:mx-0">
                {t({ en: 'Bottlenecks in your operations? Questions about setup? Fill in the form and we\'ll get back to you within 24 hours.', ar: 'Ø¹Ù‚Ø¨Ø§Øª ÙÙŠ Ø¹Ù…Ù„ÙŠØ§ØªÙƒØŸ Ø£Ø³Ø¦Ù„Ø© Ø­ÙˆÙ„ Ø§Ù„Ø¥Ø¹Ø¯Ø§Ø¯ØŸ Ø§Ù…Ù„Ø£ Ø§Ù„Ù†Ù…ÙˆØ°Ø¬ ÙˆØ³Ù†Ø¹ÙˆØ¯ Ø¥Ù„ÙŠÙƒ Ø®Ù„Ø§Ù„ 24 Ø³Ø§Ø¹Ø©.' })}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-primary/10">
              <div className="flex flex-col lg:flex-row items-center gap-8 text-xs font-semibold">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-primary">{t({ en: 'Office Address', ar: 'Ø¹Ù†ÙˆØ§Ù† Ø§Ù„Ù…ÙƒØªØ¨' })}</p>
                  <p className="text-primary mt-0.5">Global Operations</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8 text-xs font-semibold">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-primary">{t({ en: 'General Inquiry', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</p>
                  <p className="text-primary mt-0.5">saqynrabt@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-8 text-xs font-semibold">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-primary">{t({ en: 'Support Hotline', ar: 'Ø®Ø· Ø§Ù„Ø¯Ø¹Ù…' })}</p>
                  <p className="text-primary mt-0.5">+974 5500 0000</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
