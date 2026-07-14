'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '../../providers';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { PricingCards } from '../../../components/PricingCards';
import { PhoneIcon, ChatIcon, AmbulanceIcon, ClipboardIcon, BarChartIcon, GlobeIcon, CheckIcon } from '../../../components/ui/Icons';
import { AUTOMATION_TIERS } from '../../../lib/pricing-config';
import * as React from 'react';

type Currency = 'USD' | 'QAR';

const GULF_TZ_KEYWORDS = ['Doha', 'Riyadh', 'Kuwait', 'Dubai', 'Cairo', 'Bahrain', 'Muscat', 'Baghdad', 'Damascus'];

const useCaseIcons: Record<string, React.ReactNode> = {
  phone: <PhoneIcon className="w-5 h-5 text-slate-600" />,
  chat: <ChatIcon className="w-5 h-5 text-slate-600" />,
  alert: <AmbulanceIcon className="w-5 h-5 text-slate-600" />,
  clipboard: <ClipboardIcon className="w-5 h-5 text-slate-600" />,
  chart: <BarChartIcon className="w-5 h-5 text-slate-600" />,
  globe: <GlobeIcon className="w-5 h-5 text-slate-600" />,
};

const useCases = {
  en: [
    { icon: 'phone', title: 'Call Answering 24/7', desc: 'AI answers every incoming call, even at 3 AM, with natural voice.' },
    { icon: 'chat', title: 'WhatsApp & SMS Parsing', desc: 'Automatically reads and categorises inbound messages from any channel.' },
    { icon: 'alert', title: 'Complaint Routing', desc: 'Flags urgent issues and routes them to the correct manager instantly.' },
    { icon: 'clipboard', title: 'Booking Capture', desc: 'Captures reservations, orders, and appointments without human input.' },
    { icon: 'chart', title: 'Live Transcripts', desc: 'Every call logged in real-time on your dashboard for full audit trail.' },
    { icon: 'globe', title: 'Multi-Language Support', desc: 'Handles Arabic and English simultaneously across all channels.' },
  ],
  ar: [
    { icon: 'phone', title: 'الرد على المكالمات 24/7', desc: 'يجيب الذكاء الاصطناعي على كل مكالمة واردة، حتى في الساعة 3 صباحاً، بصوت طبيعي.' },
    { icon: 'chat', title: 'تحليل واتساب والرسائل النصية', desc: 'يقرأ ويصنف الرسائل الواردة تلقائياً من أي قناة.' },
    { icon: 'alert', title: 'توجيه الشكاوى', desc: 'يحدد المشكلات العاجلة ويوجهها إلى المدير المناسب فوراً.' },
    { icon: 'clipboard', title: 'التقاط الحجوزات', desc: 'يلتقط الحجوزات والطلبات والمواعيد دون تدخل بشري.' },
    { icon: 'chart', title: 'النصوص الحية', desc: 'يتم تسجيل كل مكالمة في الوقت الفعلي على لوحة التحكم لسجل تدقيق كامل.' },
    { icon: 'globe', title: 'دعم متعدد اللغات', desc: 'يتعامل مع العربية والإنجليزية في وقت واحد عبر جميع القنوات.' },
  ],
};

const faqs = {
  en: [
    {
      q: 'What counts as a text request?',
      a: 'A text request is any inbound message received through your website chat widget, WhatsApp integration, contact form, or SMS number. Every message sent by a customer = 1 request.',
    },
    {
      q: 'Does this work for my hotel or clinic?',
      a: 'Yes. SAQYN RABT is industry-agnostic by design. We have templates pre-built for hospitality, healthcare, automotive, real estate, and 11 other sectors. Your onboarding call sets up the correct routing rules for your specific team.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most clients are live within 5 business days after the onboarding call. The setup fee covers our team configuring your department routing, voice scripts, and dashboard integrations.',
    },
    {
      q: 'Can I change my plan later?',
      a: 'Yes, you can upgrade at any time mid-cycle. Downgrades take effect at the next billing date. Contact our team to adjust.',
    },
  ],
  ar: [
    {
      q: 'ما الذي يعتبر طلباً نصياً؟',
      a: 'الطلب النصي هو أي رسالة واردة من خلال أداة الدردشة على موقعك، أو تكامل واتساب، أو نموذج الاتصال، أو رقم SMS. كل رسالة يرسلها العميل = طلب واحد.',
    },
    {
      q: 'هل يعمل هذا لفندقي أو عيادتي؟',
      a: 'نعم. SAQYN RABT غير مقيدة بصناعة معينة حسب التصميم. لدينا قوالب معدة مسبقاً للضيافة والرعاية الصحية والسيارات والعقارات و 11 قطاعاً آخر. مكالمة الإعداد تضبط قواعد التوجيه الصحيحة لفريقك.',
    },
    {
      q: 'كم يستغرق الإعداد؟',
      a: 'معظم العملاء يكونون جاهزين خلال 5 أيام عمل بعد مكالمة الإعداد. رسوم الإعداد تغطي تكوين توجيه الأقسام والنصوص الصوتية وتكاملات لوحة التحكم.',
    },
    {
      q: 'هل يمكنني تغيير خطتي لاحقاً؟',
      a: 'نعم، يمكنك الترقية في أي وقت منتصف الدورة. التخفيض يسري في تاريخ الفوترة التالي. اتصل بفريقنا للتعديل.',
    },
  ],
};

const queueItems = {
  en: [
    { label: 'Incoming Call — Room 204 noise complaint', dept: 'Housekeeping', status: 'Routed', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'WhatsApp — Late checkout request (2:30 PM)', dept: 'Front Desk', status: 'Approved', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'SMS — Airport transfer booking (07:00 tomorrow)', dept: 'Concierge', status: 'Captured', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    { label: 'Web Chat — Spa appointment request', dept: 'Wellness', status: 'Pending', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ],
  ar: [
    { label: 'مكالمة واردة — شكوى ضوضاء الغرفة 204', dept: 'التدبير المنزلي', status: 'تم التوجيه', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { label: 'واتساب — طلب مغادرة متأخر (2:30 مساءً)', dept: 'مكتب الاستقبال', status: 'تمت الموافقة', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'رسالة نصية — حجز نقل المطار (07:00 غداً)', dept: 'الكونسيرج', status: 'تم الالتقاط', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    { label: 'دردشة ويب — طلب موعد سبا', dept: 'العافية', status: 'قيد الانتظار', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  ],
};

function FAQItem({ q, a, open: defaultOpen }: { q: string; a: string; open?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false);
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
      >
        <span className="font-bold text-sm text-[#141F33] pr-4">{q}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-[#718096] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm text-[#718096] leading-relaxed animate-slideDown">
          {a}
        </div>
      )}
    </div>
  );
}

export default function AutomationPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>('USD');
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (GULF_TZ_KEYWORDS.some((k) => tz.includes(k))) {
        setCurrency('QAR');
      }
    } catch {}
  }, []);

  const cases = useCases[locale as keyof typeof useCases] || useCases.en;
  const faqList = faqs[locale as keyof typeof faqs] || faqs.en;
  const queue = queueItems[locale as keyof typeof queueItems] || queueItems.en;

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="relative overflow-hidden py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 animate-fadeIn">
            {t({ en: 'Business Automation', ar: 'أتمتة الأعمال' })}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#141F33] leading-tight max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {t({ en: 'Never Miss a Customer Call, Booking, or Complaint Again.', ar: 'لا تفوت مكالمة عميل أو حجز أو شكوى مرة أخرى.' })}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#718096] max-w-2xl mx-auto leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {t({ en: 'The 24/7 AI front-desk that handles external inquiries, routes requests, and manages your guest experience.', ar: 'مكتب استقبال ذكاء اصطناعي 24/7 يتعامل مع الاستفسارات الخارجية ويوجه الطلبات وينظم تجربة الضيوف.' })}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm px-8 py-4"
            >
              {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
            </button>
            <Link href="#pricing" className="btn-secondary text-sm px-8 py-4">
              {t({ en: 'View Pricing', ar: 'عرض الأسعار' })}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-8">
                {t({ en: 'What it handles for you', ar: 'ماذا يعالج نيابة عنك' })}
              </h2>
              <div className="flex flex-col gap-4">
                {cases.map((uc, i) => (
                  <div
                    key={uc.title}
                    className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm card-hover animate-slideUp"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{useCaseIcons[uc.icon] || <PhoneIcon className="w-5 h-5 text-slate-600" />}</span>
                    <div>
                      <p className="font-extrabold text-slate-800 text-sm">{uc.title}</p>
                      <p className="text-[#718096] text-xs mt-0.5 leading-relaxed">{uc.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 space-y-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[#141F33] font-black text-base">
                  {t({ en: 'Live Queue', ar: 'الطابور المباشر' })}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 rounded-full px-3 py-1">
                  {t({ en: 'Live', ar: 'مباشر' })}
                </span>
              </div>
              {queue.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.dept}</p>
                  </div>
                  <span className={`text-xs font-semibold border rounded-full px-3 py-1 whitespace-nowrap ml-3 ${item.color}`}>{item.status}</span>
                </div>
              ))}
              <div className="pt-2 text-center">
                <Link href="/dashboard/automation" className="text-xs text-[#141F33] font-bold hover:underline">
                  {t({ en: 'View Full Dashboard Demo →', ar: 'عرض لوحة التحكم الكاملة ←' })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-3">
              {t({ en: 'Automation Pricing', ar: 'أسعار الأتمتة' })}
            </h2>
            <p className="text-[#718096] font-medium">
              {t({ en: 'All plans include onboarding support and your dedicated dashboard.', ar: 'جميع الخطط تشمل دعم الإعداد ولوحة تحكم مخصصة.' })}
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className={`text-xs font-bold ${currency === 'USD' ? 'text-[#141F33]' : 'text-slate-400'}`}>USD</span>
            <button
              type="button"
              onClick={() => setCurrency(currency === 'USD' ? 'QAR' : 'USD')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                currency === 'QAR' ? 'bg-[#141F33]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  currency === 'QAR' ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${currency === 'QAR' ? 'text-[#141F33]' : 'text-slate-400'}`}>QAR</span>
          </div>

          <PricingCards tiers={AUTOMATION_TIERS} currency={currency} locale={locale} />
        </div>
      </section>

      <section className="bg-white border-y border-gray-100 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-10 text-center">
            {t({ en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' })}
          </h2>
          <div className="flex flex-col gap-4">
            {faqList.map((faq, i) => (
              <div key={faq.q} className="animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
                <FAQItem q={faq.q} a={faq.a} open={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white border border-gray-200 rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-extrabold text-[#141F33] mb-2">
              {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
            </h3>
            <p className="text-sm font-medium text-[#718096] mb-6 leading-relaxed">
              {t({ en: 'We\'ll walk you through setup in a 15-minute call.', ar: 'سنرشدك خلال الإعداد في مكالمة مدتها 15 دقيقة.' })}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
              </a>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-ghost text-sm"
              >
                {t({ en: 'Close', ar: 'إغلاق' })}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
