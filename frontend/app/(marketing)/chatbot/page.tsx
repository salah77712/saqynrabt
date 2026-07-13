'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from '../../providers';
import { Footer } from '../../../components/Footer';
import { Header } from '../../../components/Header';
import { DocumentIcon, SearchIcon, LockIcon, TeamIcon, BarChartIcon, CheckIcon } from '../../../components/ui/Icons';
import * as React from 'react';

const chatbotTiers = [
  {
    id: 'chat-starter',
    title: { en: 'Starter', ar: 'المبتدئ' },
    subtitle: { en: 'Up to 50 employees.', ar: 'حتى 50 موظفاً.' },
    price: '2,999',
    setup: '4,999',
    popular: false,
    features: {
      en: ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
      ar: ['ذكاء اصطناعي خاص RAG', '2,000 سؤال/شهر', '50 موظفاً', 'تحديث مستندين/شهر', 'الموارد البشرية والسياسات'],
    },
  },
  {
    id: 'chat-growth',
    title: { en: 'Growth', ar: 'النمو' },
    subtitle: { en: 'Up to 150 employees.', ar: 'حتى 150 موظفاً.' },
    price: '4,999',
    setup: '6,999',
    popular: true,
    features: {
      en: ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
      ar: ['ذكاء اصطناعي خاص RAG', '5,000 سؤال/شهر', '150 موظفاً', 'تحديث 10 مستندات/شهر', 'تدريب أدوار متقدم', 'لغتان'],
    },
  },
  {
    id: 'chat-enterprise',
    title: { en: 'Enterprise', ar: 'المؤسسات' },
    subtitle: { en: '151+ employees.', ar: '151+ موظفاً.' },
    price: 'Custom',
    setup: 'Custom',
    popular: false,
    features: {
      en: ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
      ar: ['موظفون غير محدودين', 'أسئلة غير محدودة', 'مستندات غير محدودة', 'قاعدة معرفة مخصصة', 'علامة تجارية مخصصة'],
    },
    ctaContact: true,
  },
];

const capabilityIcons: Record<string, React.ReactNode> = {
  doc: <DocumentIcon className="w-5 h-5 text-slate-600" />,
  search: <SearchIcon className="w-5 h-5 text-slate-600" />,
  gap: <SearchIcon className="w-5 h-5 text-slate-600" />,
  lock: <LockIcon className="w-5 h-5 text-slate-600" />,
  team: <TeamIcon className="w-5 h-5 text-slate-600" />,
  chart: <BarChartIcon className="w-5 h-5 text-slate-600" />,
};

const capabilities = {
  en: [
    { icon: 'doc', title: 'PDF & Document Upload', desc: 'Upload your HR handbook, SOPs, and policies. The AI learns from them instantly.' },
    { icon: 'search', title: 'RAG-Powered Q&A', desc: 'Employees ask questions in plain language, the AI finds the exact answer from your documents.' },
    { icon: 'gap', title: 'Knowledge Gap Tracking', desc: 'See every question the AI couldn\'t answer — so you know exactly what documents to add.' },
    { icon: 'lock', title: 'Private & Isolated', desc: 'Your data never trains the model. It\'s locked to your company\'s knowledge base only.' },
    { icon: 'team', title: 'Employee Login & Roles', desc: 'Each employee has their own login. Admins manage access and document permissions.' },
    { icon: 'chart', title: 'Onboarding Accelerator', desc: 'New hires get instant answers to standard onboarding questions on day one.' },
  ],
  ar: [
    { icon: 'doc', title: 'رفع PDF والمستندات', desc: 'ارفع دليل الموظفين وسياساتك. يتعلم الذكاء الاصطناعي منها فوراً.' },
    { icon: 'search', title: 'أسئلة وأجوبة بتقنية RAG', desc: 'يسأل الموظفون بلغة بسيطة، ويجد الذكاء الاصطناعي الإجابة الدقيقة من مستنداتك.' },
    { icon: 'gap', title: 'تتبع الفجوات المعرفية', desc: 'رؤية كل سؤال لم يتمكن الذكاء الاصطناعي من الإجابة عليه - لتعرف بالضبط أي المستندات تحتاج لإضافتها.' },
    { icon: 'lock', title: 'خاص ومعزول', desc: 'بياناتك لا تدرب النموذج أبداً. مقفلة على قاعدة معرفة شركتك فقط.' },
    { icon: 'team', title: 'دخول الموظفين والأدوار', desc: 'لكل موظف دخول خاص. المدراء يديرون الوصول وصلاحيات المستندات.' },
    { icon: 'chart', title: 'مسرع التوظيف', desc: 'يحصل الموظفون الجدد على إجابات فورية لأسئلة التوظيف الأساسية من اليوم الأول.' },
  ],
};

const faqs = {
  en: [
    {
      q: 'Is our company data private?',
      a: 'Absolutely. Your documents are stored in your isolated, encrypted knowledge base. The AI model is never trained on your data. Your SOPs and HR policies are never shared with any third party.',
    },
    {
      q: 'How many employees can we onboard?',
      a: 'The Starter plan supports up to 50 employees, Growth up to 150, and Enterprise is unlimited. You can upgrade at any time mid-cycle without losing any data or configurations.',
    },
    {
      q: 'What document formats are supported?',
      a: 'We currently support PDF, DOCX, and plain text files. Our team processes your documents during the setup phase and updates them whenever you send new versions.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most clients are live within 5-7 business days. The setup fee covers document processing, role configuration, employee seat setup, and your onboarding walkthrough call.',
    },
  ],
  ar: [
    {
      q: 'هل بيانات شركتنا خاصة؟',
      a: 'بالتأكيد. مستنداتك مخزنة في قاعدة معرفة معزولة ومشفرة. نموذج الذكاء الاصطناعي لا يتم تدريبه على بياناتك أبداً. سياساتك لا تتم مشاركتها مع أي طرف ثالث.',
    },
    {
      q: 'كم عدد الموظفين الذين يمكننا إضافتهم؟',
      a: 'خطة المبتدئ تدعم حتى 50 موظفاً، والنمو حتى 150، والمؤسسات غير محدود. يمكنك الترقية في أي وقت دون فقدان أي بيانات أو إعدادات.',
    },
    {
      q: 'ما هي صيغ المستندات المدعومة؟',
      a: 'ندعم حالياً PDF و DOCX والملفات النصية. فريقنا يعالج مستنداتك خلال مرحلة الإعداد ويحدثها عند إرسال نسخ جديدة.',
    },
    {
      q: 'كم يستغرق الإعداد؟',
      a: 'معظم العملاء يكونون جاهزين خلال 5-7 أيام عمل. رسوم الإعداد تغطي معالجة المستندات وتكوين الأدوار وتجهيز المقاعد ومكالمة التدريب.',
    },
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

export default function ChatbotPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';

  const caps = capabilities[locale as keyof typeof capabilities] || capabilities.en;
  const faqList = faqs[locale as keyof typeof faqs] || faqs.en;
  const tiers = chatbotTiers.map((tier) => ({
    ...tier,
    title: t(tier.title),
    subtitle: t(tier.subtitle),
    features: tier.features[locale as keyof typeof tier.features] || tier.features.en,
  }));

  return (
    <div className="bg-[#F8F9FB] text-[#1A202C] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 animate-fadeIn">
            {t({ en: 'Internal Company Chatbot', ar: 'مساعد الشركة الداخلي' })}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#141F33] leading-tight max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {t({ en: 'Your Company Knowledge. Instantly Accessible by Your Team.', ar: 'معرفة شركتك. متاحة فوراً لفريقك.' })}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#718096] max-w-2xl mx-auto leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {t({ en: 'A private RAG-powered AI trained only on your HR policies, SOPs, and onboarding documents. Your employees get answers, not chatbots.', ar: 'ذكاء اصطناعي خاص بتقنية RAG مدرب فقط على سياسات الموارد البشرية وإجراءات التشغيل ومستندات التوظيف. موظفوك يحصلون على إجابات، ليس روبوتات محادثة.' })}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn-primary text-sm px-8 py-4"
            >
              {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
            </button>
            <Link href="/#pricing" className="btn-secondary text-sm px-8 py-4">
              {t({ en: 'View Pricing', ar: 'عرض الأسعار' })}
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-white border-y border-gray-100 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-8">
                {t({ en: 'What your team can do with it', ar: 'ماذا يمكن لفريقك أن يفعل به' })}
              </h2>
              <div className="flex flex-col gap-4">
                {caps.map((cap, i) => (
                  <div
                    key={cap.title}
                    className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm card-hover animate-slideUp"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{capabilityIcons[cap.icon] || <DocumentIcon className="w-5 h-5 text-slate-600" />}</span>
                    <div>
                      <p className="font-extrabold text-slate-800 text-sm">{cap.title}</p>
                      <p className="text-[#718096] text-xs mt-0.5 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Mockup */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 flex flex-col gap-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-[#141F33] font-black text-base">
                  {t({ en: 'Company Assistant', ar: 'مساعد الشركة' })}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 rounded-full px-3 py-1">
                  {t({ en: 'Private', ar: 'خاص' })}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                <div className="self-end bg-[#141F33] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  {t({ en: 'How many vacation days do I have left?', ar: 'كم يوم إجازة متبقي لدي؟' })}
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  {t({ en: 'Based on your profile, you have', ar: 'بناءً على ملفك، لديك' })} <strong>{t({ en: '14 days', ar: '14 يوماً' })}</strong> {t({ en: 'remaining this cycle. Your next accrual of 2.5 days is on August 1st.', ar: 'متبقية هذه الدورة. استحقاقك القادم 2.5 يوم في 1 أغسطس.' })}
                </div>
                <div className="self-end bg-[#141F33] text-white text-sm px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[80%]">
                  {t({ en: 'What\'s the SOP for reporting a maintenance issue?', ar: 'ما هو الإجراء المعياري للإبلاغ عن مشكلة صيانة؟' })}
                </div>
                <div className="self-start bg-slate-100 text-gray-700 text-sm px-4 py-2.5 rounded-2xl rounded-bl-sm max-w-[85%]">
                  {t({ en: 'According to', ar: 'وفقاً لـ' })} <em>{t({ en: 'Operations Manual v3.2', ar: 'دليل العمليات الإصدار 3.2' })}</em>{t({ en: ', submit a ticket via the portal under', ar: '، أرسل تذكرة عبر البوابة تحت' })} <strong>{t({ en: 'Facilities → Maintenance', ar: 'المرافق ← الصيانة' })}</strong>. {t({ en: 'Urgent issues can be escalated directly to your floor supervisor.', ar: 'يمكن رفع المشكلات العاجلة مباشرة إلى مشرف الطابق.' })}
                </div>
                <div className="self-start bg-slate-50 border border-dashed border-gray-200 text-slate-400 text-xs px-4 py-2.5 rounded-2xl max-w-[85%] italic">
                  {t({ en: 'Sourced from: HR Handbook & Operations Manual', ar: 'المصدر: دليل الموارد البشرية ودليل العمليات' })}
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link href="/dashboard/chat" className="text-xs text-[#141F33] font-bold hover:underline">
                  {t({ en: 'View Full Chat Dashboard Demo →', ar: 'عرض عرض لوحة المحادثة الكامل ←' })}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 md:py-28 bg-[#F8F9FB]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#141F33] mb-3">
              {t({ en: 'Chatbot Pricing', ar: 'أسعار المساعد الذكي' })}
            </h2>
            <p className="text-[#718096] font-medium">
              {t({ en: 'All plans include private RAG setup, employee access, and your dedicated dashboard.', ar: 'جميع الخطط تشمل إعداد RAG خاص، وتجهيز الموظفين، ولوحة تحكم مخصصة.' })}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                className="relative bg-white border border-gray-200/80 rounded-2xl p-6 shadow-sm card-hover flex flex-col animate-slideUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#10B981] text-white text-[10px] font-extrabold tracking-widest px-4 py-1.5 rounded-full uppercase shadow-sm">
                    {t({ en: 'Popular', ar: 'الأكثر طلباً' })}
                  </span>
                )}
                <h3 className="text-xl font-extrabold text-[#141F33]">{tier.title}</h3>
                <p className="text-xs text-[#718096] font-medium mt-0.5 mb-4">{tier.subtitle}</p>
                <div className="mb-1">
                  {tier.price !== 'Custom' ? (
                    <>
                      <span className="text-4xl font-extrabold text-[#141F33]">{tier.price}</span>
                      <span className="text-[#718096] text-sm font-bold ml-1">
                        {t({ en: 'QAR / mo', ar: 'ريال / شهر' })}
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-[#141F33]">
                      {t({ en: 'Custom', ar: 'مخصص' })}
                    </span>
                  )}
                </div>
                <p className="text-[#10B981] font-bold text-sm mb-5">
                  {tier.setup !== 'Custom'
                    ? `${t({ en: '+', ar: '+' })} ${tier.setup} ${t({ en: 'QAR setup fee', ar: 'ريال رسوم إعداد' })}`
                    : t({ en: 'Custom setup fee', ar: 'رسوم إعداد مخصصة' })}
                </p>
                <ul className="flex flex-col gap-2 mb-6 flex-1">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                      <span className="text-[#10B981]"><CheckIcon className="w-4 h-4 text-emerald-500" /></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all min-h-[44px] ${
                    tier.ctaContact
                      ? 'border border-gray-200 bg-white text-[#141F33] hover:bg-gray-50 hover:scale-[1.02] active:scale-95'
                      : 'bg-[#141F33] text-white hover:scale-[1.02] hover:shadow-lg active:scale-95'
                  }`}
                >
                  {tier.ctaContact
                    ? t({ en: 'Contact Sales', ar: 'اتصل بالمبيعات' })
                    : t({ en: 'Get Started', ar: 'ابدأ الآن' })}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Demo Modal */}
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
