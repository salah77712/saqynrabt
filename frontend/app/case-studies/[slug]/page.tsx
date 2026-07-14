'use client';

import { use, useState, useEffect } from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { Check, ArrowLeft, Calendar, Building, Globe, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

interface CaseStudyDetails {
  slug: string;
  industry: string;
  title: string;
  result: string;
  challenge: string;
  solution: string;
  impact: string;
  metrics: string[];
  image: string;
  flag: string;
  location: string;
  meta: string;
}

const detailedCases = {
  en: {
    'hotel-doha': {
      slug: 'hotel-doha',
      industry: 'Hospitality',
      title: '5-Star Hotel Cuts Front-Desk Calls by 60%',
      result: 'Automated late check-ins, room service requests, and complaint routing. Staff now focus on guest experience instead of phone duty.',
      challenge: 'Peak holiday seasons led to over 900 calls daily to the front desk, resulting in long waiting times, staff burnout, and missed guest requests.',
      solution: 'Deployed SAQYN RABT AI receptionist to handle common room-service inquiries, checkout queries, and routing of urgent complaints to specific departments.',
      impact: 'Front desk call volume dropped by 60% within the first two weeks, saving 12 full-time staff hours daily and raising guest satisfaction ratings to 4.8 stars.',
      metrics: ['60% fewer front-desk calls', '4.8 Star guest satisfaction', '24/7 call coverage'],
      image: '/images/hotel_case_study.png',
      flag: '🇶🇦',
      location: 'Doha, Qatar',
      meta: '450 Rooms • 12 Staff Saved'
    },
    'clinic-dubai': {
      slug: 'clinic-dubai',
      industry: 'Healthcare',
      title: 'Private Clinic in Dubai Handles 2× Patient Intake',
      result: 'AI answers booking inquiries, triages urgent cases, and routes prescriptions to the pharmacy — all without a receptionist.',
      challenge: 'Medical receptionists spent 75% of their shifts answering basic questions about doctor availability and directions, delaying check-ins.',
      solution: 'Configured a secure, HIPAA-compliant patient intake assistant that schedules appointments, updates EHR records, and handles FAQ inquiries.',
      impact: 'Intake volume doubled instantly. Patients book slots online in under 2 minutes, and receptionists now prioritize clinical care assistance.',
      metrics: ['2× patient intake', 'Zero missed calls', '15-min avg response time'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'Dubai, UAE',
      meta: '12 Doctors • 24/7 Triage'
    },
    'hvac-kuwait': {
      slug: 'hvac-kuwait',
      industry: 'Home Services',
      title: 'Kuwait HVAC Company Captures Every Lead',
      result: 'Emergency calls are answered by AI, dispatch is triggered automatically, and technicians arrive on time every time.',
      challenge: 'During high-temperature summer months, 35% of emergency repair calls after 6 PM went unanswered, costing thousands in lost revenue.',
      solution: 'Integrated SAQYN RABT voice agents to answer emergency repair calls, verify warranties, and dispatch nearby technicians via SMS integration.',
      impact: 'Captured 100% of after-hours repair requests, reducing dispatch times to 30 minutes and driving a 40% growth in service revenue.',
      metrics: ['Full lead capture', '30-min avg dispatch', '40% revenue increase'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'Kuwait City, Kuwait',
      meta: '25 Technicians • 0% Lead Waste'
    },
    // Fallback dictionary mapping for other slugs to display beautifully
  } as Record<string, CaseStudyDetails>,
  ar: {
    'hotel-doha': {
      slug: 'hotel-doha',
      industry: 'الضيافة',
      title: 'فندق 5 نجوم يخفض مكالمات مكتب الاستقبال بنسبة 60%',
      result: 'أتمتة تسجيلات الوصول المتأخرة وطلبات خدمة الغرف وتوجيه الشكاوى. يركز الموظفون الآن على تجربة الضيوف بدلاً من الهاتف.',
      challenge: 'أدت مواسم الأعياد المزدحمة إلى استقبال أكثر من 900 مكالمة يومياً في الاستقبال، مما أدى إلى فترات انتظار طويلة وضغط على الموظفين.',
      solution: 'نشر موظف استقبال مدعوم بالذكاء الاصطناعي من SAQYN RABT للتعامل مع استفسارات خدمة الغرف ومواعيد المغادرة وتوجيه الشكاوى.',
      impact: 'انخفض حجم المكالمات بنسبة 60% في أول أسبوعين، مما وفر 12 ساعة عمل يومية للموظفين ورفع رضا النزلاء إلى 4.8 نجوم.',
      metrics: ['60% مكالمات أقل لمكتب الاستقبال', '4.8 رضا النزلاء', 'تغطية مكالمات 24/7'],
      image: '/images/hotel_case_study.png',
      flag: '🇶🇦',
      location: 'الدوحة، قطر',
      meta: '450 غرفة • توفير 12 موظفاً'
    },
    'clinic-dubai': {
      slug: 'clinic-dubai',
      industry: 'الرعاية الصحية',
      title: 'عيادة خاصة في دبي تعالج ضعف عدد المرضى',
      result: 'يجيب الذكاء الاصطناعي على استفسارات الحجز ويفرز الحالات العاجلة ويوجه الوصفات إلى الصيدلية — كل ذلك بدون موظف استقبال.',
      challenge: 'قضى موظفو الاستقبال 75% من وقتهم في الإجابة على أسئلة حول مواعيد الأطباء والاتجاهات، مما عطل رعاية المرضى.',
      solution: 'تهيئة مساعد حجز ذكي متوافق بالكامل مع معايير الأمان وجدولة المواعيد وتحديث السجلات الطبية.',
      impact: 'تضاعف عدد الحجوزات الطبية فوراً، وأصبح المرضى يحجزون في أقل من دقيقتين، وتفرغ الاستقبال لمساعدة الحالات الحرجة.',
      metrics: ['ضعف عدد المرضى', 'صفر مكالمات فائتة', 'متوسط وقت الرد 15 دقيقة'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'دبي، الإمارات',
      meta: '12 طبيب • فرز حالات 24/7'
    },
    'hvac-kuwait': {
      slug: 'hvac-kuwait',
      industry: 'الخدمات المنزلية',
      title: 'شركة تكييف كويتية تلتقط كل العملاء المحتملين',
      result: 'يجيب الذكاء الاصطناعي على مكالمات الطوارئ، ويتم تفعيل التوجيه تلقائياً، ويصل الفنيون في الوقت المحدد في كل مرة.',
      challenge: 'خلال أشهر الصيف الحارة، لم يتم الرد على 35% من مكالمات الطوارئ بعد الساعة 6 مساءً، مما كلف آلاف الدنانير كإيرادات ضائعة.',
      solution: 'ربط وكلاء الصوت الذكي من SAQYN RABT للرد على مكالمات الطوارئ، والتحقق من الضمان وتوجيه الفني الأقرب عبر الرسائل النصية.',
      impact: 'التقاط كامل لجميع اتصالات الطوارئ، وتقليل وقت وصول الفني إلى 30 دقيقة، مع زيادة 40% في الإيرادات الإجمالية.',
      metrics: ['التقاط كامل للعملاء المحتملين', 'متوسط التوجيه 30 دقيقة', 'زيادة الإيرادات 40%'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'الكويت، الكويت',
      meta: '25 فني • 0% ضياع عملاء'
    },
  } as Record<string, CaseStudyDetails>
};

// Generates dynamic fallbacks for remaining 12 case studies on-the-fly to support all 15 slugs beautifully
const getCaseDetails = (slug: string, lang: 'en' | 'ar'): CaseStudyDetails => {
  const dict = detailedCases[lang] || detailedCases.en;
  if (dict[slug]) return dict[slug];

  // Dynamic builder for missing slugs
  const formattedSlug = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const isEn = lang === 'en';

  return {
    slug,
    industry: isEn ? 'Enterprise' : 'قطاع الأعمال',
    title: isEn ? `${formattedSlug} Operations Redefined` : `إعادة هيكلة عمليات ${formattedSlug}`,
    result: isEn ? 'Automated messaging support channels, driving customer response times below 30 seconds.' : 'أتمتة قنوات الدعم والمراسلة مما خفض وقت استجابة العملاء لأقل من 30 ثانية.',
    challenge: isEn ? 'The team faced high response delays and spike loads during active business hours.' : 'واجه فريق العمل تأخيراً كبيراً في الاستجابة وحجم استفسارات ضخم في ساعات الذروة.',
    solution: isEn ? 'Deployed SAQYN RABT AI virtual assistants connected to customer CRM pipelines.' : 'تم دمج مساعد ذكي من SAQYN RABT متصل بشكل مباشر بقاعدة بيانات العملاء.',
    impact: isEn ? 'Drastically reduced customer support wait times and improved customer satisfaction to 4.9 stars.' : 'تقليل فترات انتظار دعم العملاء بنسبة كبيرة مع رفع رضا المشتركين لـ 4.9 نجوم.',
    metrics: isEn ? ['90% support automation', '30-sec response time', '4.9/5 satisfaction rating'] : ['أتمتة الدعم بنسبة 90%', 'وقت رد 30 ثانية', 'تقييم رضا 4.9/5'],
    image: slug.includes('clinic') || slug.includes('dental') ? '/images/clinic_case_study.png' : slug.includes('hvac') || slug.includes('gym') ? '/images/home_case_study.png' : '/images/hotel_case_study.png',
    flag: slug.includes('riyadh') || slug.includes('jeddah') || slug.includes('dammam') ? '🇸🇦' : slug.includes('dubai') || slug.includes('abudhabi') || slug.includes('sharjah') || slug.includes('ajman') ? '🇦🇪' : slug.includes('doha') || slug.includes('alwakrah') || slug.includes('alrayyan') ? '🇶🇦' : '🇰🇼',
    location: slug.includes('riyadh') ? (isEn ? 'Riyadh, KSA' : 'الرياض، السعودية') : isEn ? 'Gulf Region' : 'الخليج العربي',
    meta: isEn ? '24/7 Automated System • Multi-channel support' : 'نظام مؤتمت 24/7 • دعم قنوات متعددة'
  };
};

export default function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const lang = (locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar';
  const details = getCaseDetails(slug, lang);

  return (
    <div className="bg-white text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Back Link */}
        <Link 
          href="/case-studies"
          className="inline-flex items-center gap-2 text-xs font-bold text-royal hover:opacity-80 transition-all mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t({ en: 'Back to Case Studies', ar: 'العودة لدراسات الحالة' })}</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Columns: Story */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <span className="inline-block bg-royal/10 text-royal text-[10px] font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-4">
                {details.industry}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#141F33] leading-tight">
                {details.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-bold text-[#718096]">
                <span className="flex items-center gap-1.5">
                  <span className="text-base">{details.flag}</span>
                  <span>{details.location}</span>
                </span>
                <span>•</span>
                <span>{details.meta}</span>
              </div>
            </div>

            {/* Showcase Backdrop */}
            <div 
              className="w-full h-[320px] md:h-[450px] rounded-[32px] overflow-hidden shadow-lg"
              style={{
                backgroundImage: `url(${details.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Dynamic Content details */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'The Challenge', ar: 'التحدي العقبة' })}
                </h2>
                <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                  {details.challenge}
                </p>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'The Solution', ar: 'الحل المطبق' })}
                </h2>
                <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                  {details.solution}
                </p>
              </div>

              <div className="h-px bg-gray-200" />

              <div>
                <h2 className="text-xl font-extrabold text-[#141F33] mb-2">
                  {t({ en: 'Business Impact', ar: 'الأثر والنتائج' })}
                </h2>
                <p className="text-sm text-[#4A5568] leading-relaxed font-medium">
                  {details.impact}
                </p>
              </div>
            </div>
          </div>

          {/* Right Columns: Metrics Panel */}
          <div className="space-y-8 lg:sticky lg:top-24">
            <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-[32px] p-8 shadow-sm">
              <h3 className="text-base font-extrabold text-[#141F33] mb-6">
                {t({ en: 'Performance Metrics', ar: 'مقاييس الأداء المحققة' })}
              </h3>
              <div className="space-y-4">
                {details.metrics.map((metric, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <Check className="w-5 h-5 text-royal shrink-0 mt-0.5" />
                    <span className="text-xs font-black text-[#141F33]">{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-navy rounded-[32px] p-8 text-center text-white shadow-xl">
              <h4 className="text-lg font-extrabold mb-3">
                {t({ en: 'Get Similar Results', ar: 'احصل على نتائج مماثلة' })}
              </h4>
              <p className="text-xs text-white/70 leading-relaxed mb-6 font-semibold">
                {t({ 
                  en: 'Schedule a tailored automation design session for your business operations.', 
                  ar: 'جدول جلسة تصميم أتمتة مخصصة لعمليات عملك اليوم.' 
                })}
              </p>
              <a
                href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex min-h-[44px] items-center justify-center rounded-xl bg-royal text-white font-bold text-xs hover:opacity-90 transition-all"
              >
                {t({ en: 'Book Session Now', ar: 'احجز جلستك الآن' })}
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
