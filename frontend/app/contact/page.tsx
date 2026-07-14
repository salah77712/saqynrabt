'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { MapPin, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const { locale } = useLocale();
  const router = useRouter();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    // Simulate submission api call
    setTimeout(() => {
      setSubmitting(false);
      router.push('/thank-you');
    }, 1000);
  };

  return (
    <div className="bg-[#F8F9FB] text-[#141F33] min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-6xl mx-auto py-24 px-6 lg:px-12 w-full">
        
        {/* Split Screen 50/50 Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy mb-2">
              {t({ en: 'Send us a message', ar: 'أرسل لنا رسالة' })}
            </h2>
            <p className="text-xs font-semibold text-[#141F33] mb-6">
              {t({ en: 'Fill out the form below and our team will get back to you shortly.', ar: 'املأ النموذج أدناه وسيتصل بك فريقنا قريبًا.' })}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-navy mb-1.5">{t({ en: 'Name', ar: 'الاسم' })}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  aria-invalid={!!errors.name}
                  className={`w-full min-h-[44px] bg-[#F8F9FB] border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy ${
                    errors.name ? 'border-red-500' : 'border-[#141F33]/10'
                  }`}
                />
                {errors.name && <p className="text-[#141F33] text-[10px] font-bold mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-navy mb-1.5">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  className={`w-full min-h-[44px] bg-[#F8F9FB] border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy ${
                    errors.email ? 'border-red-500' : 'border-[#141F33]/10'
                  }`}
                />
                {errors.email && <p className="text-[#141F33] text-[10px] font-bold mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-navy mb-1.5">{t({ en: 'Phone Number', ar: 'رقم الهاتف' })}</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-invalid={!!errors.phone}
                  className={`w-full min-h-[44px] bg-[#F8F9FB] border rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy ${
                    errors.phone ? 'border-red-500' : 'border-[#141F33]/10'
                  }`}
                />
                {errors.phone && <p className="text-[#141F33] text-[10px] font-bold mt-1">{errors.phone}</p>}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-xs font-bold text-navy mb-1.5">{t({ en: 'Subject', ar: 'الموضوع' })}</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-navy"
                >
                  <option value="Demo Request">{t({ en: 'Demo Request', ar: 'طلب عرض توضيحي' })}</option>
                  <option value="Support">{t({ en: 'Support', ar: 'الدعم الفني' })}</option>
                  <option value="Partnership">{t({ en: 'Partnership', ar: 'شراكة' })}</option>
                  <option value="Sales">{t({ en: 'Sales & Billing', ar: 'المبيعات والفوترة' })}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-navy mb-1.5">{t({ en: 'Message', ar: 'الرسالة' })}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  aria-invalid={!!errors.message}
                  className={`w-full bg-[#F8F9FB] border rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-navy resize-none ${
                    errors.message ? 'border-red-500' : 'border-[#141F33]/10'
                  }`}
                />
                {errors.message && <p className="text-[#141F33] text-[10px] font-bold mt-1">{errors.message}</p>}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
              >
                {submitting ? t({ en: 'Submitting...', ar: 'جاري الإرسال...' }) : t({ en: 'Submit Message', ar: 'إرسال الرسالة' })}
              </button>
            </form>
          </div>

          {/* Right Column: Office Info */}
          <div className="space-y-8 lg:pt-8 text-center lg:text-start">
            <div>
              <span className="text-xs font-extrabold tracking-widest text-[#2A5CFF] uppercase">{t({ en: 'Get in touch', ar: 'تواصل معنا' })}</span>
              <h1 className="text-4xl font-extrabold text-navy tracking-tight mt-3">
                {t({ en: 'Tell us what you need.', ar: 'أخبرنا بما تحتاجه.' })}
              </h1>
              <p className="text-sm font-semibold text-[#141F33] mt-4 leading-relaxed max-w-md mx-auto lg:mx-0">
                {t({ en: 'Bottlenecks in your operations? Questions about setup? Fill in the form and we\'ll get back to you within 24 hours.', ar: 'عقبات في عملياتك؟ أسئلة حول الإعداد؟ املأ النموذج وسنعود إليك خلال 24 ساعة.' })}
              </p>
            </div>

            <div className="space-y-6 pt-6 border-t border-[#141F33]/10">
              <div className="flex flex-col lg:flex-row items-center gap-4 text-xs font-semibold">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-navy">{t({ en: 'Office Address', ar: 'عنوان المكتب' })}</p>
                  <p className="text-[#141F33] mt-0.5">Global Operations</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4 text-xs font-semibold">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-navy">{t({ en: 'General Inquiry', ar: 'البريد الإلكتروني' })}</p>
                  <p className="text-[#141F33] mt-0.5">saqynrabt@gmail.com</p>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-4 text-xs font-semibold">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-navy">{t({ en: 'Support Hotline', ar: 'خط الدعم' })}</p>
                  <p className="text-[#141F33] mt-0.5">+974 5500 0000</p>
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
