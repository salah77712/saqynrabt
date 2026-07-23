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
        { q: 'Do you support multiple time zones?', a: 'Yes. Your intake platform handles inquiries from any time zone automatically.' },
      ],
    },
    {
      title: 'Billing & Plans',
      questions: [
        { q: 'Can I change my plan later?', a: 'Yes. Upgrade at any time mid-cycle. Downgrades take effect at the next billing date.' },
        { q: 'What happens if I exceed my limits?', a: 'Only if you enable overages. By default, the system stops at your plan limit so you never get surprise bills.' },
        { q: 'Is there a contract?', a: 'All plans are month- with no long-term contract. Enterprise plans may have annual terms.' },
      ],
    },
  ],
  ar: [
    {
      title: 'بدء الاستخدام',
      questions: [
        { q: 'كم من الوقت يستغرق الإعداد؟', a: 'معظم العملاء يبدأ تشغيلهم في غضون 5-7 أيام عمل بعد مكالمة الإعداد. تغطي رسوم الإعداد قيام فريقنا بتهيئة توجيه المكالمات والنصوص الصوتية وتكامل لوحة التحكم.' },
        { q: 'هل أحتاج لمهارات تقنية؟', a: 'لا. يتولى فريقنا كل عمليات التهيئة. ما عليك سوى حضور جلسة تدريبية لمدة ساعة واحدة مع موظفيك.' },
        { q: 'ما الذي يجب علي تقديمه؟', a: 'رقم هاتفك، وقائمة الأقسام، ومستندات إجراءات العمل (للروبوت)، وأي أسئلة شائعة حالية. نحن نتولى الباقي.' },
        { q: 'هل يمكنني التجربة قبل الالتزام؟', a: 'نعم. احجز عرضاً تجريبياً وسنريك مساحة عمل مباشرة مهيأة لقطاعك.' },
      ],
    },
    {
      title: 'الميزات والاستخدام',
      questions: [
        { q: 'ما هي القنوات التي تدعمها؟', a: 'المكالمات الهاتفية، وواتساب، والرسائل القصيرة، ورمز محادثة الويب، ونماذج الاتصال — كل ذلك من لوحة تحكم واحدة.' },
        { q: 'ما هي اللغات المدعومة؟', a: 'العربية والإنجليزية بشكل أساسي، مع توفر لغات إضافية في الخطط المخصصة.' },
        { q: 'هل يمكن دمجها مع أدواتي الحالية؟', a: 'نعم. نحن ندعم تكاملات CRM ومزامنة التقويم وربط API المخصص في خططنا الاحترافية والمؤسسية.' },
        { q: 'ما الذي يعتبر طلباً نصياً؟', a: 'أي رسالة واردة من خلال محادثة موقعك، أو واتساب، أو نموذج الاتصال، أو الرسائل القصيرة. كل رسالة عميل = طلب واحد.' },
      ],
    },
    {
      title: 'البيانات والأمان',
      questions: [
        { q: 'هل بيانات شركتي خاصة؟', a: 'بالتأكيد. يتم تخزين مستنداتك في قاعدة معرفية معزولة ومشفرة. لا يتم تدريب نموذج الذكاء الاصطناعي على بياناتك أبداً.' },
        { q: 'أين يتم تخزين بياناتي؟', a: 'يمكنك اختيار منطقة تخزين بياناتك: الشرق الأوسط، أو أوروبا، أو الولايات المتحدة. نحن متوافقون مع اللوائح المحلية.' },
        { q: 'هل تسجلون المكالمات؟', a: 'يتم تسجيل النصوص الحية في لوحة التحكم الخاصة بك للتدقيق والمراجعة. أنت تتحكم في سياسات الاحتفاظ بها.' },
      ],
    },
    {
      title: 'الخدمة العالمية',
      questions: [
        { q: 'هل خدماتكم مقتصرة على قطر؟', a: 'لا. نحن شركة عالمية نخدم العملاء في جميع أنحاء الشرق الأوسط وآسيا وأوروبا وإفريقيا والأمريكتين.' },
        { q: 'ما هي العملات المدعومة؟', a: 'نصدر الفواتير بالدولار الأمريكي، واليورو، والجنيه الإسترليني، والعملات المحلية. لا توجد رسوم تحويل مخفية.' },
        { q: 'هل تدعمون مناطق زمنية متعددة؟', a: 'نعم. يعمل مكتب الاستقبال الذكي لديك على مدار الساعة طوال أيام الأسبوع ويتعامل مع الاستفسارات تلقائياً من أي منطقة زمنية.' },
      ],
    },
    {
      title: 'الفواتير والخطط',
      questions: [
        { q: 'هل يمكنني تغيير خطتي لاحقاً؟', a: 'نعم. يمكنك الترقية في أي وقت خلال الدورة الفاتورية. تسري التخفيضات في موعد الفاتورة التالي.' },
        { q: 'ماذا يحدث إذا تجاوزت حدودي المسموحة؟', a: 'فقط إذا قمت بتمكين الاستهلاك الإضافي. بشكل افتراضي، يتوقف النظام عند حدود خطتك حتى لا تواجه فواتير مفاجئة.' },
        { q: 'هل هناك عقد التزام؟', a: 'جميع الخطط شهرية دون أي عقد طويل الأجل. قد تشتمل خطط المؤسسات الكبرى على شروط سنوية.' },
      ],
    },
  ]
};

export default function FAQPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const catList = categories[locale as keyof typeof categories] || categories.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'FAQ', ar: 'الأسئلة الشائعة' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-3xl mx-auto">
          {t({ en: 'Frequently Asked Questions', ar: 'الأسئلة الشائعة' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Everything you need to know about SAQYN RABT — from setup to global deployment.', ar: 'كل ما تريد معرفته عن SAQYN RABT — من الإعداد إلى النشر العالمي.' })}
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-20">
        {catList.map((cat) => (
          <div key={cat.title} className="mb-12">
            <h2 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-primary/10">{cat.title}</h2>
            <div className="space-y-3">
              {cat.questions.map((item, idx) => {
                const globalIdx = `${cat.title}-${idx}`;
                const isOpen = openIndex === idx;
                return (
                  <div key={globalIdx} className="border border-primary/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      aria-controls={globalIdx}
                      className="w-full flex items-center justify-between px-6 py-3 text-left font-bold text-primary text-xs min-h-[44px] hover:bg-surface transition-all duration-300"
                    >
                      <span>{item.q}</span>
                      <svg aria-hidden="true" className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                    </button>
                    {isOpen && (
                      <div id={globalIdx} role="region" className="px-6 pb-4 text-primary text-sm leading-relaxed">
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
