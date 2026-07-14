'use client';

import { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

const categories = {
  en: [
    {
      title: 'Getting Started',
      questions: [
        { q: 'How long does setup take?', a: 'Most clients are live within 5–7 business days after the onboarding call. The setup fee covers our team configuring your routing, voice scripts, and dashboard integrations.' },
        { q: 'Do I need technical skills?', a: 'No. Our team handles all configuration. You only need to attend a 1-hour training session with your staff.' },
        { q: 'What do I need to provide?', a: 'Your phone number, department list, SOP documents (for the chatbot), and any existing FAQ materials. We handle the rest.' },
        { q: 'Can I try before committing?', a: 'Yes. Book a demo and we\'ll show you a live workspace configured for your industry.' },
      ],
    },
    {
      title: 'Features & Usage',
      questions: [
        { q: 'What channels does it support?', a: 'Phone calls, WhatsApp, SMS, web chat widget, and contact forms — all from one dashboard.' },
        { q: 'What languages does it support?', a: 'Arabic and English out of the box, with additional languages available on custom plans.' },
        { q: 'Can it integrate with my existing tools?', a: 'Yes. We support CRM integrations, calendar sync, and custom API hooks on our Professional and Enterprise plans.' },
        { q: 'What counts as a text request?', a: 'Any inbound message through your website chat, WhatsApp, contact form, or SMS. Each customer message = 1 request.' },
      ],
    },
    {
      title: 'Data & Security',
      questions: [
        { q: 'Is my company data private?', a: 'Absolutely. Your documents are stored in an isolated, encrypted knowledge base. The AI model is never trained on your data.' },
        { q: 'Where is my data stored?', a: 'You can choose your data region: Middle East, Europe, or United States. We are compliant with local regulations.' },
        { q: 'Do you record calls?', a: 'Live transcripts are logged on your dashboard for audit. You control retention policies.' },
      ],
    },
    {
      title: 'Global Service',
      questions: [
        { q: 'Are you only for Qatar?', a: 'No. We are a global company serving clients across the Middle East, Asia, Europe, Africa, and the Americas.' },
        { q: 'What currencies do you support?', a: 'We invoice in USD, EUR, GBP, and local currencies. No hidden conversion fees.' },
        { q: 'Do you support multiple time zones?', a: 'Yes. Your AI front-desk operates 24/7 and handles inquiries from any time zone automatically.' },
      ],
    },
    {
      title: 'Billing & Plans',
      questions: [
        { q: 'Can I change my plan later?', a: 'Yes. Upgrade at any time mid-cycle. Downgrades take effect at the next billing date.' },
        { q: 'What happens if I exceed my limits?', a: 'Only if you enable overages. By default, the system stops at your plan limit so you never get surprise bills.' },
        { q: 'Is there a contract?', a: 'All plans are month-to-month with no long-term contract. Enterprise plans may have annual terms.' },
      ],
    },
  ],
  ar: [
    {
      title: 'بدء الاستخدام',
      questions: [
        { q: 'كم يستغرق الإعداد؟', a: 'معظم العملاء يكونون جاهزين خلال 5-7 أيام عمل بعد مكالمة الإعداد. تغطي رسوم الإعداد تكوين التوجيه والنصوص الصوتية وتكاملات لوحة التحكم.' },
        { q: 'هل أحتاج إلى مهارات تقنية؟', a: 'لا. فريقنا يتولى كل التهيئة. ما عليك سوى حضور جلسة تدريبية مدتها ساعة مع موظفيك.' },
        { q: 'ماذا أحتاج لتقديمه؟', a: 'رقم هاتفك وقائمة الأقسام ومستندات إجراءات التشغيل (للمساعد الذكي) وأي مواد أسئلة شائعة موجودة. نحن نتولى الباقي.' },
        { q: 'هل يمكنني التجربة قبل الالتزام؟', a: 'نعم. احجز عرضاً توضيحياً وسنريك مساحة عمل مباشرة مكونة لقطاعك.' },
      ],
    },
    {
      title: 'الميزات والاستخدام',
      questions: [
        { q: 'ما القنوات التي يدعمها؟', a: 'المكالمات الهاتفية وواتساب والرسائل النصية وأداة الدردشة على الويب ونماذج الاتصال — كلها من لوحة تحكم واحدة.' },
        { q: 'ما اللغات التي يدعمها؟', a: 'العربية والإنجليزية بشكل افتراضي، مع لغات إضافية متاحة في الخطط المخصصة.' },
        { q: 'هل يمكنه التكامل مع أدواتي الحالية؟', a: 'نعم. ندعم تكامل CRM ومزامنة التقويم وخطافات API المخصصة في خططنا الاحترافية والمؤسسية.' },
        { q: 'ما الذي يعتبر طلباً نصياً؟', a: 'أي رسالة واردة عبر الدردشة على موقعك أو واتساب أو نموذج الاتصال أو SMS. كل رسالة عميل = طلب واحد.' },
      ],
    },
    {
      title: 'البيانات والأمان',
      questions: [
        { q: 'هل بيانات شركتي خاصة؟', a: 'بالتأكيد. مستنداتك مخزنة في قاعدة معرفة معزولة ومشفرة. النموذج لا يُدرّب على بياناتك أبداً.' },
        { q: 'أين تُخزّن بياناتي؟', a: 'يمكنك اختيار منطقة بياناتك: الشرق الأوسط أو أوروبا أو الولايات المتحدة. نحن متوافقون مع اللوائح المحلية.' },
        { q: 'هل تسجلون المكالمات؟', a: 'يتم تسجيل النصوص الحية على لوحة التحكم للتدقيق. أنت تتحكم في سياسات الاحتفاظ.' },
      ],
    },
    {
      title: 'الخدمة العالمية',
      questions: [
        { q: 'هل أنتم فقط لقطر؟', a: 'لا. نحن شركة عالمية نخدم عملاء في الشرق الأوسط وآسيا وأوروبا وأفريقيا والأمريكتين.' },
        { q: 'ما العملات التي تدعمونها؟', a: 'نصدر الفواتير بالدولار واليورو والجنيه الإسترليني والعملات المحلية. لا رسوم تحويل خفية.' },
        { q: 'هل تدعمون مناطق زمنية متعددة؟', a: 'نعم. مكتب الاستقبال الذكي يعمل 24/7 ويتعامل مع الاستفسارات من أي منطقة زمنية تلقائياً.' },
      ],
    },
    {
      title: 'الفواتير والخطط',
      questions: [
        { q: 'هل يمكنني تغيير خطتي لاحقاً؟', a: 'نعم. الترقية في أي وقت منتصف الدورة. التخفيض يسري في تاريخ الفوترة التالي.' },
        { q: 'ماذا يحدث إذا تجاوزت حدي؟', a: 'فقط إذا فعّلت الاستخدام الزائد. افتراضياً، يتوقف النظام عند حد خطتك حتى لا تحصل على فواتير مفاجئة.' },
        { q: 'هل هناك عقد؟', a: 'جميع الخطط شهرية بدون عقد طويل الأجل. الخطط المؤسسية قد يكون لها شروط سنوية.' },
      ],
    },
  ],
};

export default function FAQPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const catList = categories[locale as keyof typeof categories] || categories.en;

  return (
    <div className="bg-white text-slate-900 min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'FAQ', ar: 'الأسئلة الشائعة' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
          {t({ en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' })}
        </h1>
        <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
          {t({ en: 'Everything you need to know about SAQYN RABT — from setup to global deployment.', ar: 'كل ما تريد معرفته عن SAQYN RABT — من الإعداد إلى النشر العالمي.' })}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {catList.map((cat) => (
          <div key={cat.title} className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-slate-200">{cat.title}</h2>
            <div className="space-y-3">
              {cat.questions.map((item, idx) => {
                const globalIdx = `${cat.title}-${idx}`;
                const isOpen = openIndex === idx;
                return (
                  <div key={globalIdx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={globalIdx}
                      className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-primary hover:bg-slate-50 transition-all"
                    >
                      <span>{item.q}</span>
                      <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    {isOpen && (
                      <div id={globalIdx} role="region" className="px-6 pb-4 text-slate-500 text-sm leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <Footer />
    </div>
  );
}
