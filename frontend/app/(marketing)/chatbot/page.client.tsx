'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLocale } from '@/app/providers';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { PricingCards } from '@/components/PricingCards';
import { FileText, Search, Lock, Users, BarChart3, Check } from 'lucide-react';
import { CHATBOT_TIERS } from '@/lib/pricing-config';
import * as React from 'react';

type Currency = 'USD' | 'QAR';

const GULF_TZ_KEYWORDS = ['Doha', 'Riyadh', 'Kuwait', 'Dubai', 'Cairo', 'Bahrain', 'Muscat', 'Baghdad', 'Damascus'];

const capabilityIcons: Record<string, React.ReactNode> = {
  doc: <FileText className="w-5 h-5 text-primary" />,
  search: <Search className="w-5 h-5 text-primary" />,
  gap: <Search className="w-5 h-5 text-primary" />,
  lock: <Lock className="w-5 h-5 text-primary" />,
  team: <Users className="w-5 h-5 text-primary" />,
  chart: <BarChart3 className="w-5 h-5 text-primary" />,
};

const capabilities = {
  en: [
    { icon: 'doc', title: 'PDF & Document Upload', desc: 'Upload your HR handbook, SOPs, and policies. Your documents are uploaded and queued for indexing.' },
    { icon: 'search', title: 'RAG-Powered Q&A', desc: 'Employees ask questions in plain language, the AI searches your uploaded documents to find relevant answers.' },
    { icon: 'gap', title: 'Knowledge Gap Tracking', desc: 'See every question the AI couldn\'t answer — helps you know what documents to add.' },
    { icon: 'lock', title: 'Private & Isolated', desc: 'Your data never trains the model. It\'s locked to your company\'s knowledge base only.' },
    { icon: 'team', title: 'Employee Login & Roles', desc: 'Each employee has their own login. Admins manage access and document permissions.' },
    { icon: 'chart', title: 'Onboarding Accelerator', desc: 'New hires get instant answers to standard onboarding questions on day one.' },
  ],
  ar: [
    { icon: 'doc', title: 'رفع PDF والمستندات', desc: 'ارفع دليل الموظفين وسياساتك. مستنداتك مرفوعة وبانتظار الفهرسة.' },
    { icon: 'search', title: 'أسئلة وأجوبة بتقنية RAG', desc: 'يسأل الموظفون بلغة بسيطة، ويبحث الذكاء الاصطناعي في مستنداتك للعثور على الإجابات المناسبة.' },
    { icon: 'gap', title: 'تتبع الفجوات المعرفية', desc: 'رؤية كل سؤال لم يتمكن الذكاء الاصطناعي من الإجابة عليه - يساعدك على معرفة المستندات التي تحتاج لإضافتها.' },
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
    <div className="bg-surface border border-primary/10 rounded-xl shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-surface"
      >
        <span className="font-bold text-sm text-primary pe-4">{q}</span>
        <svg aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-primary transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-sm text-primary leading-relaxed animate-slideDown">
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
  const [currency, setCurrency] = useState<Currency>('USD');
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo';
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(isModalOpen, modalRef);

  useEffect(() => {
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (GULF_TZ_KEYWORDS.some((k) => tz.includes(k))) {
        setCurrency('QAR');
      }
    } catch {}
  }, []);

  const caps = capabilities[locale as keyof typeof capabilities] || capabilities.en;
  const faqList = faqs[locale as keyof typeof faqs] || faqs.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans selection:bg-accent selection:text-surface">
      <section className="relative overflow-hidden py-20 md:py-28 bg-[radial-gradient(circle_at_top_right,_rgba(42,92,255,0.05),_transparent_35%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <span className="inline-block bg-royal/10 text-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6 animate-fadeIn">
            {t({ en: 'Internal Company Chatbot', ar: 'مساعد الشركة الداخلي' })}
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary leading-tight max-w-4xl mx-auto animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            {t({ en: 'Your Company Knowledge. Instantly Accessible by Your Team.', ar: 'معرفة شركتك. متاحة فوراً لفريقك.' })}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-primary max-w-2xl mx-auto leading-relaxed font-medium animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {t({ en: 'A private AI assistant for your team. Upload your company documents and let employees ask questions in plain language.', ar: 'مساعد ذكاء اصطناعي خاص لفريقك. ارفع مستندات شركتك ودع الموظفين يطرحون الأسئلة بلغة بسيطة.' })}
          </p>
          <div className="mt-10 flex flex-wrap gap-8 justify-center animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] bg-primary text-surface hover:opacity-95 transition-all"
            >
              {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
            </button>
            <Link
        href="#pricing"
        className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] border border-primary/10 text-primary bg-surface hover:bg-primary transition-all"
      >{t({ en: 'View Pricing', ar: 'عرض الأسعار' })}</Link>
          </div>
        </div>
      </section>

      <section className="bg-surface border-y border-primary/10 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-30 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-8">
                {t({ en: 'What your team can do with it', ar: 'ماذا يمكن لفريقك أن يفعل به' })}
              </h2>
              <div className="flex flex-col gap-8">
                {caps.map((cap, i) => (
                  <div
                    key={cap.title}
                    className="flex items-start gap-8 bg-surface border border-primary/10 rounded-xl p-8 shadow-sm card-hover animate-slideUp"
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <span className="text-2xl mt-0.5 shrink-0">{capabilityIcons[cap.icon] || <FileText className="w-5 h-5 text-primary" />}</span>
                    <div>
                      <p className="font-extrabold text-primary text-sm">{cap.title}</p>
                      <p className="text-primary text-xs mt-0.5 leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface rounded-xl border border-primary/10 p-8 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-primary font-black text-base mb-6">
                {t({ en: 'How It Works', ar: 'كيف يعمل' })}
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-surface text-sm font-bold flex items-center justify-center shrink-0">1</span>
                  <div>
                    <p className="font-extrabold text-primary text-sm">{t({ en: 'Upload Documents', ar: 'ارفع المستندات' })}</p>
                    <p className="text-primary text-xs mt-1 leading-relaxed">{t({ en: 'Upload your HR policies, SOPs, and onboarding materials. We support PDF, DOCX, and text files.', ar: 'ارفع سياسات الموارد البشرية وإجراءات التشغيل ومستندات التوظيف. ندعم PDF و DOCX والملفات النصية.' })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-surface text-sm font-bold flex items-center justify-center shrink-0">2</span>
                  <div>
                    <p className="font-extrabold text-primary text-sm">{t({ en: 'AI Indexes Content', ar: 'يفهرس الذكاء الاصطناعي المحتوى' })}</p>
                    <p className="text-primary text-xs mt-1 leading-relaxed">{t({ en: 'Our system processes your documents so the AI can search them intelligently.', ar: 'يقوم نظامنا بمعالجة مستنداتك ليتمكن الذكاء الاصطناعي من البحث فيها بذكاء.' })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-primary text-surface text-sm font-bold flex items-center justify-center shrink-0">3</span>
                  <div>
                    <p className="font-extrabold text-primary text-sm">{t({ en: 'Employees Ask Questions', ar: 'يسأل الموظفون' })}</p>
                    <p className="text-primary text-xs mt-1 leading-relaxed">{t({ en: 'Your team asks questions in plain language and gets answers sourced from your documents.', ar: 'فريقك يطرح الأسئلة بلغة بسيطة ويحصل على إجابات من مستنداتك.' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-28 bg-surface">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              {t({ en: 'Chatbot Pricing', ar: 'أسعار المساعد الذكي' })}
            </h2>
            <p className="text-primary font-medium">
              {t({ en: 'All plans include document upload, employee access, and your dedicated dashboard.', ar: 'جميع الخطط تشمل رفع المستندات، وتجهيز الموظفين، ولوحة تحكم مخصصة.' })}
            </p>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <span className={`text-xs font-bold ${currency === 'USD' ? 'text-primary' : 'text-primary/40'}`}>USD</span>
            <button
              type="button"
              onClick={() => setCurrency(currency === 'USD' ? 'QAR' : 'USD')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                currency === 'QAR' ? 'bg-primary' : 'bg-surface'
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-surface rounded-full shadow-sm transition-transform ${
                  currency === 'QAR' ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
            <span className={`text-xs font-bold ${currency === 'QAR' ? 'text-primary' : 'text-primary/40'}`}>QAR</span>
          </div>

          <PricingCards tiers={CHATBOT_TIERS} currency={currency} locale={locale} />
        </div>
      </section>

      <section className="bg-surface border-y border-primary/10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-10 text-center">
            {t({ en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' })}
          </h2>
          <div className="flex flex-col gap-8">
            {faqList.map((faq, i) => (
              <div key={faq.q} className="animate-slideUp" style={{ animationDelay: `${i * 0.08}s` }}>
                <FAQItem q={faq.q} a={faq.a} open={i === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div ref={modalRef} className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-primary backdrop-blur-sm animate-fadeIn" role="dialog" aria-modal="true" aria-label={t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}>
          <div className="bg-surface border border-primary/10 rounded-xl max-w-md w-full p-8 shadow-2xl animate-scaleIn">
            <h3 className="text-xl font-extrabold text-primary mb-2">
              {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
            </h3>
            <p className="text-sm font-medium text-primary mb-6 leading-relaxed">
              {t({ en: 'We\'ll walk you through setup in a 15-minute call.', ar: 'سنرشدك خلال الإعداد في مكالمة مدتها 15 دقيقة.' })}
            </p>
            <div className="flex flex-col gap-4">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] bg-primary text-surface hover:opacity-90 transition-all"
              >
                {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
              </a>
              <button
                type="button"
onClick={() => setIsModalOpen(false)}
        className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] border border-primary/10 text-primary bg-surface hover:bg-primary transition-all"
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
