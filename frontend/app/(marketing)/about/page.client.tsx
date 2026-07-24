'use client';


import { useLocale } from '@/app/providers';

export default function AboutPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const ta = (obj: Record<string, string[]>) => obj[locale] || obj.en || [];

  const content = {
    eyebrow: { en: 'About Us', ar: 'من نحن' },
    title: { en: 'We are building the bridge between your callers and your team.', ar: 'نبني الجسر بين متصليك وفريقك.' },
    storyTitle: { en: 'Our Story', ar: 'قصتنا' },
    storyBody: {
      en: [
        'SAQYN RABT is a Qatar-based B2B SaaS company building AI-powered tools for front desks, service teams, and operations staff. We started with a simple observation: businesses of all sizes rely on people answering phones and routing requests, but the software available to them was built for large call centres, not real-world teams.',
        'Our platform connects external callers — customers, patients, tenants, leads, guests — directly to your internal workforce. AI voice captures the request, creates a workflow, and assigns it to the right person. No missed calls, no manual entry, no spreadsheets.',
        'We are currently in pilot phase, working with early customers across Qatar and the region to refine the product. Our team is small, focused, and hands-on. Every customer we onboard helps us build a better product.',
      ],
      ar: [
        'SAQYN RABT هي شركة B2B SaaS مقرها قطر، تبني أدوات مدعومة بالذكاء الاصطناعي لمكاتب الاستقبال وفرق الخدمة والعمليات. بدأنا من ملاحظة بسيطة: الشركات بجميع أحجامها تعتمد على أشخاص يردون على الهواتف ويوجهون الطلبات، لكن البرامج المتاحة لهم صُممت لمراكز اتصال ضخمة، وليس للفرق الحقيقية.',
        'منصتنا تربط المتصلين الخارجيين — العملاء والمرضى والمستأجرين والعملاء المحتملين والضيوف — مباشرة بقوتك العاملة الداخلية. يلتقط الذكاء الصوتي الطلب، وينشئ سير عمل، ويُسند المهمة للشخص المناسب. لا مكالمات ضائعة، لا إدخال يدوي، لا جداول بيانات.',
        'نحن حالياً في المرحلة التجريبية، نعمل مع عملاء أوائل في قطر والمنطقة لتحسين المنتج. فريقنا صغير ومركز ويعمل عن كثب مع كل عميل.',
      ],
    },
    badgeSecure: { en: 'Qatar-Based', ar: 'مقرها قطر' },
    badgePrivate: { en: 'B2B SaaS Platform', ar: 'منصة B2B سحابية' },
    badgeLive: { en: 'Pilot Phase', ar: 'مرحلة تجريبية' },
    badgeLocal: { en: 'Remote-First Team', ar: 'فريق عن بعد' },
  };

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans animate-fadeIn">
      <main className="flex-1 max-w-4xl mx-auto py-24 px-6 flex flex-col items-center">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t(content.eyebrow)}</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight tracking-tight mt-3">
            {t(content.title)}
          </h1>
        </div>

        {/* Story Section */}
        <div className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm w-full mb-12 text-center md:text-start">
          <h2 className="text-xl font-extrabold text-primary mb-4">{t(content.storyTitle)}</h2>
          <div className="space-y-4">
            {ta(content.storyBody).map((paragraph: string, i: number) => (
              <p key={i} className="text-sm font-medium text-primary/60 leading-relaxed">{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Trust Badges SVG Strip */}
        <div className="border-t border-primary/10 pt-12 w-full flex flex-wrap justify-center gap-12 md:gap-12">
          <div className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs font-bold text-primary">{t(content.badgeSecure)}</span>
          </div>

          <div className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs font-bold text-primary">{t(content.badgePrivate)}</span>
          </div>

          <div className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="text-xs font-bold text-primary">{t(content.badgeLive)}</span>
          </div>

          <div className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 transition-opacity">
            <svg aria-hidden="true" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-xs font-bold text-primary">{t(content.badgeLocal)}</span>
          </div>
        </div>

      </main>

    </div>
  );
}