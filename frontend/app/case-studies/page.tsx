'use client';

import { useState } from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Check, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';

interface CaseStudy {
  slug: string;
  industry: string;
  title: string;
  result: string;
  metrics: string[];
  image: string;
  flag: string;
  location: string;
  meta: string;
}

const cases = {
  en: [
    {
      slug: 'hotel-doha',
      industry: 'Hospitality',
      title: '5-Star Hotel Cuts Front-Desk Calls by 60%',
      result: 'Automated late check-ins, room service requests, and complaint routing. Staff now focus on guest experience instead of phone duty.',
      metrics: ['60% fewer front-desk calls', '4.8 Star guest satisfaction', '24/7 call coverage'],
      image: '/images/hotel_case_study.png',
      flag: '🇶🇦',
      location: 'Doha, Qatar',
      meta: '450 Rooms • 12 Staff Saved'
    },
    {
      slug: 'clinic-dubai',
      industry: 'Healthcare',
      title: 'Private Clinic in Dubai Handles 2× Patient Intake',
      result: 'AI answers booking inquiries, triages urgent cases, and routes prescriptions to the pharmacy — all without a receptionist.',
      metrics: ['2× patient intake', 'Zero missed calls', '15-min avg response time'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'Dubai, UAE',
      meta: '12 Doctors • 24/7 Triage'
    },
    {
      slug: 'hvac-kuwait',
      industry: 'Home Services',
      title: 'Kuwait HVAC Company Captures Every Lead',
      result: 'Emergency calls are answered by AI, dispatch is triggered automatically, and technicians arrive on time every time.',
      metrics: ['Full lead capture', '30-min avg dispatch', '40% revenue increase'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'Kuwait City, Kuwait',
      meta: '25 Technicians • 0% Lead Waste'
    },
    {
      slug: 'realestate-riyadh',
      industry: 'Real Estate',
      title: 'Property Firm Automates Lead Response within 60s',
      result: 'AI answers buyer queries, qualifies leads based on budget, and schedules viewing sessions with agents automatically.',
      metrics: ['60-second response time', '3.8× conversion boost', 'Automated agent scheduling'],
      image: '/images/hotel_case_study.png',
      flag: '🇸🇦',
      location: 'Riyadh, KSA',
      meta: '1,500+ Properties • Instant Qualify'
    },
    {
      slug: 'ecommerce-abudhabi',
      industry: 'E-commerce',
      title: 'Retailer Automates WhatsApp Support, Conversion up 35%',
      result: 'Automated order status checking, returns management, and personalized checkout reminders via WhatsApp Business API.',
      metrics: ['35% conversion increase', '90% automated support', '24/7 tracking availability'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'Abu Dhabi, UAE',
      meta: '40k Monthly Orders • Zero Backlog'
    },
    {
      slug: 'logistics-alrayyan',
      industry: 'Logistics',
      title: 'Delivery Firm Cuts Support Workload by 45%',
      result: 'Customers check delivery status, schedule pickups, and resolve address issues instantly through an automated web agent.',
      metrics: ['45% support workload cut', '99% address verification', '12-sec average load'],
      image: '/images/home_case_study.png',
      flag: '🇶🇦',
      location: 'Al Rayyan, Qatar',
      meta: '150 Delivery Vehicles • Real-time status'
    },
    {
      slug: 'legal-manama',
      industry: 'Legal Services',
      title: 'Law Firm Captures 40% More Consultation Bookings',
      result: 'AI handles intake filtering, queries legal specializations, and books qualified consultations directly to lawyers calendars.',
      metrics: ['40% more consultations', '100% HIPAA/Privacy compliant', 'Instant intake filtering'],
      image: '/images/hotel_case_study.png',
      flag: '🇧🇭',
      location: 'Manama, Bahrain',
      meta: '8 Partners • Zero missed legal intakes'
    },
    {
      slug: 'rental-muscat',
      industry: 'Automotive',
      title: 'Muscat Car Rental Agency Cuts Booking Time by 70%',
      result: 'AI scans driver licenses, processes rental requests, and routes billing details to payments backend automatically.',
      metrics: ['70% booking time saved', 'Instant license scan', '85% repeat customers'],
      image: '/images/clinic_case_study.png',
      flag: '🇴🇲',
      location: 'Muscat, Oman',
      meta: '250 Vehicles • Fully digital intake'
    },
    {
      slug: 'education-jeddah',
      industry: 'Education',
      title: 'Jeddah Institute Automatically Coordinates 1,500 Students',
      result: 'AI acts as a study assistant, answers schedule queries, and manages student onboarding processes for multiple campuses.',
      metrics: ['1,500 students supported', '80% fewer admin calls', 'Instant schedule checks'],
      image: '/images/home_case_study.png',
      flag: '🇸🇦',
      location: 'Jeddah, KSA',
      meta: '3 Campuses • Multi-course coordination'
    },
    {
      slug: 'fintech-sharjah',
      industry: 'SaaS & Fintech',
      title: 'Sharjah Startup Reduces Onboarding Friction by 50%',
      result: 'AI guides new business customers through KYC verification, documentation checks, and setup queries automatically.',
      metrics: ['50% friction reduction', 'Instant KYC checklist guidance', '24/7 technical setup'],
      image: '/images/hotel_case_study.png',
      flag: '🇦🇪',
      location: 'Sharjah, UAE',
      meta: 'B2B Client Portal • Secure sandbox guidance'
    },
    {
      slug: 'dental-alwakrah',
      industry: 'Healthcare',
      title: 'Al Wakrah Dental Center Cuts No-Shows by 80%',
      result: 'Automated appointment confirmation, late cancellation warnings, and standby queue routing over WhatsApp.',
      metrics: ['80% fewer no-shows', 'Full standby queue fill', '98% patient feedback'],
      image: '/images/clinic_case_study.png',
      flag: '🇶🇦',
      location: 'Al Wakrah, Qatar',
      meta: '5 Surgery Rooms • 24/7 Standby routing'
    },
    {
      slug: 'spa-salmiya',
      industry: 'Beauty & Wellness',
      title: 'Salmiya Spa Increases Weekday Bookings by 30%',
      result: 'AI targets low-occupancy slots, proposes custom weekday packages, and handles reservations instantly.',
      metrics: ['30% more weekday bookings', 'Automated package upsell', 'Zero double bookings'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'Salmiya, Kuwait',
      meta: '12 Treatment Rooms • Occupancy target focus'
    },
    {
      slug: 'travel-salalah',
      industry: 'Tourism',
      title: 'Salalah Tour Operator Boosts Bookings 2.5×',
      result: 'AI answers queries about tour availability, local weather updates, and automates hotel booking voucher delivery.',
      metrics: ['2.5× booking increase', 'Automated voucher delivery', 'Multi-language translation'],
      image: '/images/hotel_case_study.png',
      flag: '🇴🇲',
      location: 'Salalah, Oman',
      meta: 'Khareef Season Specialist • Instant dispatch'
    },
    {
      slug: 'kitchen-dammam',
      industry: 'Food & Beverage',
      title: 'Dammam Cloud Kitchen Network Automates Phone Orders',
      result: 'AI answers high-volume customer orders, queries diet preferences, and syncs directly with kitchen POS terminals.',
      metrics: ['95% call answer rate', 'Direct kitchen POS sync', 'Zero order input error'],
      image: '/images/clinic_case_study.png',
      flag: '🇸🇦',
      location: 'Dammam, KSA',
      meta: '8 Kitchen Hubs • 5,000 Orders/day'
    },
    {
      slug: 'gym-ajman',
      industry: 'Fitness',
      title: 'Ajman Gym Chain Automates Membership Renewals by 90%',
      result: 'AI reminds members before expiry, manages payment links, and answers gym facility hours and trainer queries.',
      metrics: ['90% renewal automation', 'Instant billing links', '24/7 member inquiry answers'],
      image: '/images/home_case_study.png',
      flag: '🇦🇪',
      location: 'Ajman, UAE',
      meta: '4 Locations • 3,200 Members supported'
    },
  ] as CaseStudy[],
  ar: [
    {
      slug: 'hotel-doha',
      industry: 'الضيافة',
      title: 'فندق 5 نجوم يخفض مكالمات مكتب الاستقبال بنسبة 60%',
      result: 'أتمتة تسجيلات الوصول المتأخرة وطلبات خدمة الغرف وتوجيه الشكاوى. يركز الموظفون الآن على تجربة الضيوف بدلاً من الهاتف.',
      metrics: ['60% مكالمات أقل لمكتب الاستقبال', '4.8 رضا النزلاء', 'تغطية مكالمات 24/7'],
      image: '/images/hotel_case_study.png',
      flag: '🇶🇦',
      location: 'الدوحة، قطر',
      meta: '450 غرفة • توفير 12 موظفاً'
    },
    {
      slug: 'clinic-dubai',
      industry: 'الرعاية الصحية',
      title: 'عيادة خاصة في دبي تعالج ضعف عدد المرضى',
      result: 'يجيب الذكاء الاصطناعي على استفسارات الحجز ويفرز الحالات العاجلة ويوجه الوصفات إلى الصيدلية — كل ذلك بدون موظف استقبال.',
      metrics: ['ضعف عدد المرضى', 'صفر مكالمات فائتة', 'متوسط وقت الرد 15 دقيقة'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'دبي، الإمارات',
      meta: '12 طبيب • فرز حالات 24/7'
    },
    {
      slug: 'hvac-kuwait',
      industry: 'الخدمات المنزلية',
      title: 'شركة تكييف كويتية تلتقط كل العملاء المحتملين',
      result: 'يجيب الذكاء الاصطناعي على مكالمات الطوارئ، ويتم تفعيل التوجيه تلقائياً، ويصل الفنيون في الوقت المحدد في كل مرة.',
      metrics: ['التقاط كامل للعملاء المحتملين', 'متوسط التوجيه 30 دقيقة', 'زيادة الإيرادات 40%'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'الكويت، الكويت',
      meta: '25 فني • 0% ضياع عملاء'
    },
    {
      slug: 'realestate-riyadh',
      industry: 'العقارات',
      title: 'شركة عقارية تؤتمت الرد على العملاء خلال 60 ثانية',
      result: 'يجيب الذكاء الاصطناعي على استفسارات المشترين، ويؤهلهم حسب الميزانية، وينظم مواعيد المعاينة مع الوكلاء تلقائياً.',
      metrics: ['رد في 60 ثانية', 'زيادة التحويلات 3.8 ضعف', 'مواعيد معاينة مؤتمتة'],
      image: '/images/hotel_case_study.png',
      flag: '🇸🇦',
      location: 'الرياض، السعودية',
      meta: '1,500+ عقار • تأهيل فوري'
    },
    {
      slug: 'ecommerce-abudhabi',
      industry: 'التجارة الإلكترونية',
      title: 'متجر تجزئة يؤتمت دعم واتساب ويرفع التحويل 35%',
      result: 'تتبع الطلبات المؤتمت، وإدارة المرتجعات، وتذكير السلات المتروكة بشكل مخصص عبر واتساب بيزنس.',
      metrics: ['زيادة التحويل 35%', 'أتمتة الدعم بنسبة 90%', 'تتبع متاح 24/7'],
      image: '/images/clinic_case_study.png',
      flag: '🇦🇪',
      location: 'أبوظبي، الإمارات',
      meta: '40 ألف طلب شهرياً • صفر تراكم'
    },
    {
      slug: 'logistics-alrayyan',
      industry: 'الخدمات اللوجستية',
      title: 'شركة توصيل تخفض عبء الدعم بنسبة 45%',
      result: 'يتتبع العملاء شحناتهم، ويجدولون مواعيد الاستلام، ويحلون مشاكل العناوين فوراً عبر مساعد ويب ذكي.',
      metrics: ['خفض الدعم بنسبة 45%', 'تحقق من العناوين 99%', 'متوسط تحميل 12 ثانية'],
      image: '/images/home_case_study.png',
      flag: '🇶🇦',
      location: 'الريان، قطر',
      meta: '150 سيارة توصيل • حالة شحن فورية'
    },
    {
      slug: 'legal-manama',
      industry: 'الخدمات القانونية',
      title: 'مكتب محاماة يلتقط 40% أكثر من حجوزات الاستشارات',
      result: 'يقوم الذكاء الاصطناعي بفرز الاستفسارات وتحديد الاختصاصات وحجز الاستشارات مباشرة على تقويم المحامين.',
      metrics: ['40% استشارات أكثر', 'متوافق مع الخصوصية 100%', 'فرز فوري للطلبات'],
      image: '/images/hotel_case_study.png',
      flag: '🇧🇭',
      location: 'المنامة، البحرين',
      meta: '8 شركاء • صفر ضياع طلبات استشارة'
    },
    {
      slug: 'rental-muscat',
      industry: 'السيارات',
      title: 'وكالة تأجير سيارات بمسقط تخفض وقت الحجز 70%',
      result: 'يقوم المساعد بمسح رخص القيادة ضوئياً، ومعالجة طلبات الإيجار، وتوجيه بيانات الدفع تلقائياً.',
      metrics: ['توفير 70% من وقت الحجز', 'مسح رخصة فوري', '85% عملاء متكررين'],
      image: '/images/clinic_case_study.png',
      flag: '🇴🇲',
      location: 'مسقط، عمان',
      meta: '250 مركبة • تسجيل رقمي بالكامل'
    },
    {
      slug: 'education-jeddah',
      industry: 'التعليم',
      title: 'معهد بجدة ينسق شؤون 1,500 طالب تلقائياً',
      result: 'مساعد تعليمي ذكي يجيب على استفسارات الجداول الدراسية وينظم عملية تسجيل الطلاب للفروع المتعددة.',
      metrics: ['مساعدة 1,500 طالب', 'مكالمات إدارية أقل 80%', 'فحص فوري للجداول'],
      image: '/images/home_case_study.png',
      flag: '🇸🇦',
      location: 'جدة، السعودية',
      meta: '3 فروع • تنسيق مساقات متعددة'
    },
    {
      slug: 'fintech-sharjah',
      industry: 'الشركات الناشئة',
      title: 'شركة ناشئة بالشارقة تخفض عوائق التسجيل 50%',
      result: 'يساعد الذكاء الاصطناعي العملاء في خطوات التحقق من الهوية، وفحص المستندات، واستفسارات الإعداد.',
      metrics: ['خفض عوائق التسجيل 50%', 'مساعدة فورية بمتطلبات الهوية', 'إعداد تقني 24/7'],
      image: '/images/hotel_case_study.png',
      flag: '🇦🇪',
      location: 'الشارقة، الإمارات',
      meta: 'بوابة عملاء B2B • مساعدة إعداد آمنة'
    },
    {
      slug: 'dental-alwakrah',
      industry: 'الرعاية الصحية',
      title: 'مركز طب أسنان بالوكرة يخفض الغيابات بنسبة 80%',
      result: 'تأكيد المواعيد المؤتمت، وتنبيهات الإلغاء المتأخر، وجدولة طابور الانتظار عبر واتساب.',
      metrics: ['غيابات أقل بنسبة 80%', 'ملء طابور الاحتياط بالكامل', '98% تقييم المرضى'],
      image: '/images/clinic_case_study.png',
      flag: '🇶🇦',
      location: 'الوكرة، قطر',
      meta: '5 غرف علاج • تنظيم طابور انتظار 24/7'
    },
    {
      slug: 'spa-salmiya',
      industry: 'العناية والجمال',
      title: 'سبا بالسالمية يرفع حجوزات أيام الأسبوع بنسبة 30%',
      result: 'يستهدف الذكاء الاصطناعي الأوقات ذات الإشغال المنخفض، ويعرض باقات مخصصة، وينجز الحجز فوراً.',
      metrics: ['حجوزات أكثر 30%', 'عرض باقات مكملة مؤتمت', 'صفر حجوزات مزدوجة'],
      image: '/images/home_case_study.png',
      flag: '🇰🇼',
      location: 'السالمية، الكويت',
      meta: '12 غرفة علاج • تركيز على فترات الركود'
    },
    {
      slug: 'travel-salalah',
      industry: 'السياحة',
      title: 'منظم رحلات بصلالة يضاعف الحجوزات 2.5 مرة',
      result: 'يجيب الذكاء الاصطناعي على استفسارات الرحلات وأحوال الطقس، ويؤتمت إرسال قسائم الفنادق.',
      metrics: ['زيادة الحجوزات 2.5 ضعف', 'تسليم قسائم مؤتمت', 'ترجمة لغات متعددة'],
      image: '/images/hotel_case_study.png',
      flag: '🇴🇲',
      location: 'صلالة، عمان',
      meta: 'مختص بموسم الخريف • إرسال فوري للقسائم'
    },
    {
      slug: 'kitchen-dammam',
      industry: 'الأغذية والمشروبات',
      title: 'مطبخ سحابي بالدمام يؤتمت طلبات الهاتف',
      result: 'يجيب المساعد على مكالمات الطلبات المرتفعة، ويسجل الملاحظات الغذائية، ويزامنها مع نظام المطبخ.',
      metrics: ['إجابة مكالمات 95%', 'مزامنة فورية مع الكاشير', 'صفر أخطاء في تدوين الطلبات'],
      image: '/images/clinic_case_study.png',
      flag: '🇸🇦',
      location: 'الدمام، السعودية',
      meta: '8 مطابخ مركزية • 5,000 طلب يومياً'
    },
    {
      slug: 'gym-ajman',
      industry: 'اللياقة البدنية',
      title: 'نادي رياضي بعجمان يؤتمت تجديد الاشتراكات بنسبة 90%',
      result: 'يذكر المساعد الأعضاء قبل انتهاء الاشتراك، ويدير روابط الدفع، ويجيب على مواعيد الحصص.',
      metrics: ['أتمتة التجديد بنسبة 90%', 'روابط دفع فورية', 'إجابات على أسئلة الأعضاء 24/7'],
      image: '/images/home_case_study.png',
      flag: '🇦🇪',
      location: 'عجمان، الإمارات',
      meta: '4 مواقع • مساعدة 3,200 عضو'
    },
  ] as CaseStudy[],
};

export default function CaseStudiesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const list = cases[locale as keyof typeof cases] || cases.en;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sweepActive, setSweepActive] = useState(false);

  const playTickSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn('Audio Context not allowed by user interaction yet:', e);
    }
  };

  const triggerEffects = () => {
    playTickSound();
    setSweepActive(true);
    setTimeout(() => setSweepActive(false), 800);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
    triggerEffects();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
    triggerEffects();
  };

  const handleStart = (clientX: number) => {
    setStartX(clientX);
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || startX === null) return;
    const diff = startX - clientX;
    if (Math.abs(diff) > 60) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setStartX(null);
      setIsDragging(false);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    setStartX(null);
  };

  return (
    <div className="bg-white text-[#141F33] min-h-screen flex flex-col font-sans selection:bg-[#2A5CFF] selection:text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-10 text-center">
        <span className="inline-block bg-royal/10 text-royal text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Case Studies', ar: 'دراسات الحالة' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#141F33] leading-tight max-w-4xl mx-auto">
          {t({ en: 'Real Results from Real Businesses', ar: 'نتائج حقيقية من شركات حقيقية' })}
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#718096] max-w-2xl mx-auto font-medium">
          {t({ en: 'From the Middle East to the world — swipe to see how teams use SAQYN RABT to transform their operations.', ar: 'من الشرق الأوسط إلى العالم — اسحب لمشاهدة كيف تستخدم الفرق SAQYN RABT لتحويل عملياتهم.' })}
        </p>
      </section>

      {/* Swipeable Premium Showcase Slider */}
      <section className="py-12 bg-[#F8F9FB] overflow-hidden select-none">
        <div 
          className="relative max-w-6xl mx-auto px-6 flex flex-col items-center"
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => isDragging && handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {/* Main Cards Row */}
          <div className="relative w-full flex items-center justify-center min-h-[500px]">
            <div className="flex gap-6 items-center justify-center w-full max-w-4xl transition-all duration-500 ease-out">
              {list.map((item, idx) => {
                const offset = idx - currentIndex;
                const isActive = idx === currentIndex;
                const isPrev = idx === (currentIndex - 1 + list.length) % list.length;
                const isNext = idx === (currentIndex + 1) % list.length;

                // Hidden if outside focus group
                if (!isActive && !isPrev && !isNext) return null;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      if (!isActive) {
                        setCurrentIndex(idx);
                        triggerEffects();
                      }
                    }}
                    className={`relative w-[300px] md:w-[360px] h-[480px] rounded-[32px] overflow-hidden cursor-pointer shadow-xl transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
                      isActive 
                        ? 'scale-100 opacity-100 z-35 ring-2 ring-royal/20' 
                        : 'scale-90 opacity-40 filter blur-[2px] z-10 hover:opacity-60'
                    }`}
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Bottom Dark Gradient Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                    {/* Premium Sweep Shine (Active Card Only) */}
                    {isActive && sweepActive && (
                      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-100%] animate-[shineSweep_0.8s_ease-out]" />
                    )}

                    {/* Top Overlay Card Badges */}
                    <div className="absolute top-6 left-6 right-6 z-25 flex items-center justify-between">
                      <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-extrabold text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full">
                        {item.industry}
                      </span>
                      <span className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold border border-white/10">
                        <span>{item.flag}</span>
                        <span className="text-[10px] tracking-wide uppercase font-semibold">{item.location.split(',')[0]}</span>
                      </span>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 z-25 flex flex-col justify-end h-[60%]">
                      <div className="flex items-center gap-1.5 text-white/60 text-[10px] font-bold uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{item.location}</span>
                      </div>
                      <h2 className="text-white text-xl md:text-2xl font-black leading-snug mb-3">
                        {item.title}
                      </h2>
                      <p className="text-white/70 text-xs font-medium leading-relaxed mb-4 line-clamp-2">
                        {item.result}
                      </p>

                      {/* Explore Link */}
                      <Link
                        href={`/case-studies/${item.slug}`}
                        className="w-full flex items-center justify-between min-h-[44px] bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-xs px-5 py-3 rounded-2xl border border-white/20 transition-all duration-300"
                      >
                        <span>{t({ en: 'Explore Case Study', ar: 'استعرض دراسة الحالة' })}</span>
                        <span>{locale === 'ar' ? '←' : '→'}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slider Controllers & Indicators */}
          <div className="flex items-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              className="w-12 h-12 min-h-0 bg-white hover:bg-slate-50 border border-gray-200 text-navy flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Previous Study"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex items-center gap-2 max-w-xs md:max-w-md overflow-x-auto py-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setCurrentIndex(i);
                    triggerEffects();
                  }}
                  className={`min-h-0 rounded-full transition-all duration-300 shrink-0 ${
                    i === currentIndex ? 'w-6 h-2 bg-royal' : 'w-2 h-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-12 h-12 min-h-0 bg-white hover:bg-slate-50 border border-gray-200 text-navy flex items-center justify-center rounded-full shadow-sm hover:shadow active:scale-95 transition-all"
              aria-label="Next Study"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Detailed Metrics Panel of Active Card */}
        <div className="max-w-4xl mx-auto px-6 mt-12 animate-fadeIn" key={currentIndex}>
          <div className="bg-white border border-gray-200 rounded-[32px] p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#718096] mb-1 block">
                {list[currentIndex].meta}
              </span>
              <h3 className="text-lg font-extrabold text-[#141F33]">
                {locale === 'ar' ? 'المقاييس الرئيسية المحققة' : 'Key Metrics Achieved'}
              </h3>
            </div>
            <div className="flex flex-wrap gap-4 justify-end">
              {list[currentIndex].metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-royal/5 border border-royal/10 rounded-2xl px-5 py-3 shadow-sm">
                  <Check className="w-5 h-5 text-royal shrink-0" />
                  <span className="text-xs font-extrabold text-[#141F33]">{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold text-[#141F33] mb-4">
            {t({ en: 'Be the Next Success Story', ar: 'كن قصة النجاح التالية' })}
          </h2>
          <p className="text-[#718096] font-medium mb-8">
            {t({ en: 'Book a demo and see how SAQYN RABT can transform your operations.', ar: 'احجز عرضاً توضيحياً وشاهد كيف يمكن لـ SAQYN RABT تحويل عملياتك.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm px-8 py-4"
          >
            {t({ en: 'Book Your Demo Session', ar: 'احجز جلسة العرض الخاص بك' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
