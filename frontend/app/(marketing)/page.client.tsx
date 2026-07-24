'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from '@/app/providers';
import Link from 'next/link';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

function FlowDiagram() {
  return (
    <svg viewBox="0 0 520 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <filter id="flow-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="currentColor" floodOpacity="0.08" />
        </filter>
        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
        </marker>
      </defs>

      <g opacity="0.06">
        <circle cx="260" cy="190" r="170" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="260" cy="190" r="120" stroke="currentColor" strokeWidth="1" fill="none" />
      </g>

      <g filter="url(#flow-shadow)">
        <rect x="30" y="140" width="130" height="100" rx="50" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
        <text x="95" y="180" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700" letterSpacing="1">CALLER</text>
        <text x="95" y="198" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="500" opacity="0.6">Customer / Lead</text>
      </g>

      <line x1="160" y1="190" x2="210" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#arrowhead)" />

      <g filter="url(#flow-shadow)">
        <rect x="215" y="120" width="140" height="140" rx="70" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="2" />
        <text x="285" y="180" textAnchor="middle" fill="var(--color-accent)" fontSize="11" fontWeight="700" letterSpacing="1">AI VOICE</text>
        <text x="285" y="198" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="500" opacity="0.6">Captures intent</text>
        <text x="285" y="214" textAnchor="middle" fill="var(--color-accent)" fontSize="8" fontWeight="600">⟳ Creates workflow</text>
      </g>

      <line x1="355" y1="190" x2="400" y2="190" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6,4" markerEnd="url(#arrowhead)" />

      <g filter="url(#flow-shadow)">
        <rect x="405" y="140" width="100" height="100" rx="50" fill="var(--color-surface)" stroke="currentColor" strokeWidth="2" />
        <text x="455" y="180" textAnchor="middle" fill="currentColor" fontSize="11" fontWeight="700" letterSpacing="1">TEAM</text>
        <text x="455" y="198" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="500" opacity="0.6">Acts on it</text>
      </g>
    </svg>
  );
}

function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="w-10 h-10 rounded-full bg-primary text-surface font-extrabold text-sm flex items-center justify-center shrink-0 mt-0.5">
        {number}
      </div>
      <div>
        <h3 className="text-base font-extrabold text-primary tracking-tight">{title}</h3>
        <p className="text-sm text-primary/60 font-medium mt-1 leading-relaxed max-w-sm">{description}</p>
      </div>
    </div>
  );
}

function ProductCard({
  badge,
  title,
  description,
  features,
  href,
  cta,
  accent,
}: {
  badge: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  cta: string;
  accent: boolean;
}) {
  return (
    <div className={`rounded-2xl p-8 flex flex-col ${accent ? 'bg-primary text-surface ring-2 ring-accent' : 'bg-surface border border-primary/10 text-primary'}`}>
      <span className={`text-xs font-extrabold uppercase tracking-widest ${accent ? 'text-accent' : 'text-accent'}`}>
        {badge}
      </span>
      <h3 className={`text-2xl font-extrabold tracking-tight mt-3 ${accent ? 'text-surface' : 'text-primary'}`}>
        {title}
      </h3>
      <p className={`text-sm font-medium mt-3 leading-relaxed ${accent ? 'text-primary-foreground/70' : 'text-primary/60'}`}>
        {description}
      </p>
      <ul className="mt-6 space-y-3 flex-1">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-xs font-semibold">
            <svg className={`w-4 h-4 shrink-0 mt-0.5 ${accent ? 'text-accent' : 'text-accent'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={accent ? 'text-surface/80' : 'text-primary/70'}>{f}</span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className={`mt-8 inline-flex items-center justify-center text-xs font-bold py-3 px-6 rounded-full transition-all duration-200 min-h-[44px] hover:scale-[1.02] active:scale-95 ${
          accent
            ? 'bg-surface text-primary hover:bg-surface/90'
            : 'bg-primary text-surface hover:bg-primary/90'
        }`}
      >
        {cta}
      </Link>
    </div>
  );
}

export default function MarketingPage() {
  const { locale } = useLocale();
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal(0.01);
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal(0.1);
  const { ref: productsRef, isVisible: productsVisible } = useScrollReveal(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal(0.1);

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans">
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-16 md:pt-24 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute -top-40 -start-40 w-[500px] h-[500px] rounded-full bg-accent/3 blur-3xl transition-all duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`absolute -bottom-40 -end-40 w-[400px] h-[400px] rounded-full bg-accent/2 blur-3xl transition-all duration-1000 delay-500 ${heroVisible ? 'opacity-100' : 'opacity-0'}`} />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className={`transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="inline-block bg-accent/10 border border-accent/20 text-accent text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                {t({ en: 'Early Access — Pilot Program', ar: 'دخول مبكر — برنامج تجريبي' })}
              </span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-primary">
                {t({
                  en: 'Calls come in. AI captures it. Your team gets it.',
                  ar: 'المكالمات ترد. الذكاء الاصطناعي يلتقطها. فريقك يستلمها.',
                })}
              </h1>

              <p className="text-base md:text-lg text-primary/60 font-semibold leading-relaxed mt-6 max-w-lg">
                {t({
                  en: 'SAQYN RABT connects every external call — from customers, patients, tenants, leads — directly to your internal workforce. AI voice answers, understands intent, creates a workflow, and assigns the right person. No missed calls. No manual entry.',
                  ar: 'يربط سقن ربط كل مكالمة خارجية — من العملاء والمرضى والمستأجرين والعملاء المحتملين — مباشرة بقوتك العاملة الداخلية. يجيب الذكاء الصوتي، ويفهم الهدف، وينشئ سير عمل، ويُسند المهمة للشخص المناسب.',
                })}
              </p>

              <div className="flex gap-4 mt-8">
                <Link
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-primary/90 text-surface text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-300 min-h-[44px] flex items-center shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
                >
                  {t({ en: 'Book a Free Demo', ar: 'احجز عرضاً تجريبياً' })}
                </Link>
                <Link
                  href="/features"
                  className="bg-transparent border border-primary/15 text-primary hover:bg-primary/5 text-xs font-bold px-8 py-3.5 rounded-full transition-all duration-300 min-h-[44px] flex items-center hover:scale-[1.02] active:scale-95"
                >
                  {t({ en: 'See How It Works', ar: 'شاهد كيف يعمل' })}
                </Link>
              </div>

              <p className="text-xs text-primary/40 font-semibold mt-4">
                {t({
                  en: 'No payment required. No commitment.',
                  ar: 'لا حاجة للدفع. لا التزام.',
                })}
              </p>
            </div>

            {/* Right */}
            <div className={`transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="bg-background border border-primary/10 rounded-2xl p-6 md:p-8 shadow-elevation-mid">
                <FlowDiagram />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section ref={stepsRef} className="py-16 md:py-24 bg-background">
        <div className={`mx-auto max-w-7xl px-6 lg:px-12 transition-all duration-700 ${stepsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/5 border border-primary/15 text-primary text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t({ en: 'How It Works', ar: 'آلية العمل' })}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
              {t({
                en: 'From incoming call to assigned task. No manual steps.',
                ar: 'من مكالمة واردة إلى مهمة مسندة. بدون خطوات يدوية.',
              })}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-16 mt-14">
            <StepCard
              number="01"
              title={t({ en: 'AI Answers the Call', ar: 'يجيب الذكاء الصوتي' })}
              description={t({
                en: 'Voice agent greets the caller, listens to their request, and asks clarifying questions to capture the full context.',
                ar: 'يرحب الوكيل الصوتي بالمتصل، ويستمع إلى طلبه، ويطرح أسئلة توضيحية لالتقاط السياق الكامل.',
              })}
            />
            <StepCard
              number="02"
              title={t({ en: 'Creates a Workflow', ar: 'ينشئ سير عمل' })}
              description={t({
                en: 'The system structures the request — appointment, maintenance ticket, sales lead, support case — and creates a trackable task.',
                ar: 'ينظم النظام الطلب — موعد، تذكرة صيانة، عميل محتمل، حالة دعم — وينشئ مهمة قابلة للتتبع.',
              })}
            />
            <StepCard
              number="03"
              title={t({ en: 'Assigns to Your Team', ar: 'يُسند لفريقك' })}
              description={t({
                en: 'The task is routed to the right department or employee. Your team sees it in their dashboard and takes it from there.',
                ar: 'تُوجه المهمة إلى القسم أو الموظف المناسب. يراها فريقك في لوحة التحكم ويتولونها من هناك.',
              })}
            />
          </div>
        </div>
      </section>

      {/* ── Two Products ── */}
      <section ref={productsRef} className="py-16 md:py-24">
        <div className={`mx-auto max-w-7xl px-6 lg:px-12 transition-all duration-700 ${productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block bg-accent/10 border border-accent/20 text-accent text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              {t({ en: 'Two Products, One Platform', ar: 'منتجين، منصة واحدة' })}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
              {t({
                en: 'Built for everyone who reaches your business.',
                ar: 'مصمم لكل من يتواصل مع عملك.',
              })}
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-6 md:gap-8">
            <div className="md:col-span-3">
              <ProductCard
                badge={t({ en: 'Product 1', ar: 'المنتج الأول' })}
                title={t({ en: 'AI Voice Agent', ar: 'الوكيل الصوتي' })}
                description={t({
                  en: 'For customers, patients, tenants, leads, and guests. Handles incoming calls, captures requests, and creates workflows for your team. Works across industries — clinics, real estate, logistics, hospitality, and more.',
                  ar: 'للمتصلين الخارجيين — العملاء والمرضى والمستأجرين والعملاء المحتملين والضيوف. يتعامل مع المكالمات الواردة، ويلتقط الطلبات، وينشئ سير عمل لفريقك.',
                })}
                features={[
                  t({ en: 'AI voice answers incoming calls 24/7', ar: 'الذكاء الصوتي يرد على المكالمات على مدار الساعة' }),
                  t({ en: 'Understands intent in Arabic and English', ar: 'يفهم الهدف بالعربية والإنجليزية' }),
                  t({ en: 'Creates trackable workflows and tasks', ar: 'ينشئ سير عمل ومهام قابلة للتتبع' }),
                  t({ en: 'Routes to the right department or employee', ar: 'يوجه إلى القسم أو الموظف المناسب' }),
                  t({ en: 'Audit trail for every interaction', ar: 'سجل تدقيق لكل تفاعل' }),
                ]}
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                cta={t({ en: 'Book a Demo', ar: 'احجز عرضاً تجريبياً' })}
                accent={true}
              />
            </div>

            <div className="md:col-span-2">
              <ProductCard
                badge={t({ en: 'Product 2', ar: 'المنتج الثاني' })}
                title={t({ en: 'Staff Knowledge Hub', ar: 'مركز معرفة الموظفين' })}
                description={t({
                  en: 'For employees and internal teams. A private AI chatbot connected to your company documents, HR policies, SOPs, and internal knowledge base.',
                  ar: 'للموظفين والفرق الداخلية. روبوت محادثة خاص متصل بمستندات شركتك وسياسات الموارد البشرية وإجراءات العمل.',
                })}
                features={[
                  t({ en: 'Answers from your uploaded documents', ar: 'يجيب من مستنداتك المرفوعة' }),
                  t({ en: 'Supports HR, operations, and policy queries', ar: 'يدعم استفسارات الموارد البشرية والعمليات والسياسات' }),
                  t({ en: 'Knowledge gap tracking', ar: 'تتبع فجوات المعرفة' }),
                  t({ en: 'Multi-language Q&A', ar: 'أسئلة وأجوبة متعددة اللغات' }),
                ]}
                href="/features"
                cta={t({ en: 'Explore Features', ar: 'استكشف الميزات' })}
                accent={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="py-16 md:py-24 bg-background">
        <div className={`mx-auto max-w-3xl px-6 text-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block bg-accent/10 border border-accent/20 text-accent text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {t({ en: 'Get Started', ar: 'ابدأ الآن' })}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
            {t({
              en: 'We are in pilot. Book a demo and we will set up your workspace.',
              ar: 'نحن في المرحلة التجريبية. احجز عرضاً وسنقوم بإعداد مساحة العمل الخاصة بك.',
            })}
          </h2>
          <p className="text-base text-primary/60 font-semibold mt-4 max-w-lg mx-auto leading-relaxed">
            {t({
              en: 'No templates. No sales pitch. A live walkthrough of how SAQYN RABT connects your external callers to your internal team.',
              ar: 'لا قوالب. لا عرض مبيعات. جولة حية لكيفية ربط سقن ربط لمتصلينك الخارجيين بفريقك الداخلي.',
            })}
          </p>
          <div className="mt-8">
            <Link
              href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/90 text-surface text-xs font-bold px-10 py-3.5 rounded-full transition-all duration-300 min-h-[44px] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              {t({ en: 'Book a Free Demo', ar: 'احجز عرضاً تجريبياً' })}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
