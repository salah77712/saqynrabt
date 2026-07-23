'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Building2, HeartPulse, Wrench, Car, Utensils, Ambulance, Bell, Flag, Construction, Scale, BarChart3, ShoppingBag } from 'lucide-react';

const industryIcons: Record<string, React.ReactNode> = {
  hospitality: <Building2 className="w-8 h-8 text-primary" />,
  healthcare: <HeartPulse className="w-8 h-8 text-primary" />,
  homeServices: <Wrench className="w-8 h-8 text-primary" />,
  realEstate: <Building2 className="w-8 h-8 text-primary" />,
  automotive: <Car className="w-8 h-8 text-primary" />,
  food: <Utensils className="w-8 h-8 text-primary" />,
  towing: <Ambulance className="w-8 h-8 text-primary" />,
  veterinary: <HeartPulse className="w-8 h-8 text-primary" />,
  plumbing: <Wrench className="w-8 h-8 text-primary" />,
  boutique: <Bell className="w-8 h-8 text-primary" />,
  catering: <Utensils className="w-8 h-8 text-primary" />,
  dealerships: <Flag className="w-8 h-8 text-primary" />,
  construction: <Construction className="w-8 h-8 text-primary" />,
  law: <Scale className="w-8 h-8 text-primary" />,
  accounting: <BarChart3 className="w-8 h-8 text-primary" />,
  retail: <ShoppingBag className="w-8 h-8 text-primary" />,
};

const industries = {
  en: [
    { icon: 'hospitality', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties manage guest inquiries, room service requests, and complaints efficiently.' },
    { icon: 'healthcare', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
    { icon: 'homeServices', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
    { icon: 'realEstate', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
    { icon: 'automotive', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests.' },
    { icon: 'food', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
    { icon: 'towing', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
    { icon: 'veterinary', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
    { icon: 'plumbing', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
    { icon: 'boutique', title: 'Boutique Hotels', desc: 'Let guests get digital door codes at midnight. Handle late arrivals without front-desk staff.' },
    { icon: 'catering', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
    { icon: 'dealerships', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot even after hours.' },
    { icon: 'construction', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
    { icon: 'law', title: 'Law Firms', desc: 'Answer retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
    { icon: 'accounting', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
    { icon: 'retail', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
  ],
  ar: [
    { icon: 'hospitality', title: 'الضيافة', desc: 'تستخدم الفنادق والمنتجعات SAQYN RABT للتعامل مع استفسارات الضيوف وطلبات الغرف والشكاوى.' },
    { icon: 'healthcare', title: 'الرعاية الصحية', desc: 'تؤتمت العيادات والمستشفيات حجوزات المرضى وفرز الحالات الطارئة وتوجيه الاستفسارات للقسم المناسب فوراً.' },
    { icon: 'homeServices', title: 'الخدمات المنزلية', desc: 'يلتقط السبّاكون والكهربائيون مكالمات الطوارئ بعد ساعات العمل ويرسلون الفنيين فوراً.' },
    { icon: 'realEstate', title: 'العقارات', desc: 'يوجّه مديرو العقارات طلبات الصيانة لفرق العمل ويتعاملون مع استفسارات المستأجرين دون موظف استقبال.' },
    { icon: 'automotive', title: 'السيارات', desc: 'تؤتمت الوكالات وورش الإصلاح حجوزات الخدمة واستفسارات المخزون وطلبات عروض الأسعار.' },
    { icon: 'food', title: 'الأغذية والمشروبات', desc: 'تحجز المطاعم والمقاهي وخدمات التموين الطلبات خلال ساعات الذروة دون مكالمات فائتة.' },
    { icon: 'towing', title: 'السحب والخدمات على الطريق', desc: 'التقط السائقين العالقين واحصل على بيانات الموقع وأرسل أقرب شاحنة دون مكالمة هاتفية.' },
    { icon: 'veterinary', title: 'الطب البيطري', desc: 'افرز زيارات الحيوانات الأليفة الطارئة ووجّه الحالات العاجلة للممرض المناوب فوراً.' },
    { icon: 'plumbing', title: 'السباكة والتدفئة والتكييف', desc: 'توقف عن خسارة الأموال من مكالمات الإصلاح الفائتة بعد ساعات العمل.' },
    { icon: 'boutique', title: 'الفنادق البوتيكية', desc: 'دع الضيوف يحصلون على رموز الأبواب الرقمية في منتصف الليل. تعامل مع الوصول المتأخر دون موظفي استقبال.' },
    { icon: 'catering', title: 'المطاعم والتموين', desc: 'سعّر واحجز طلبات التموين دون الحاجة للاتصالات المتكررة.' },
    { icon: 'dealerships', title: 'وكالات السيارات', desc: 'أجب عن أسئلة المخزون حول السيارات المستعملة في ساحتك حتى بعد ساعات العمل.' },
    { icon: 'construction', title: 'البناء', desc: 'أبقِ مقاولي الباطن على علم بمواعيد تسليم المواد وتصاريح العمل في الموقع.' },
    { icon: 'law', title: 'شركات المحاماة', desc: 'أجب عن أسئلة رسوم التوكيل واستفسارات نماذج القبول. فرّغ المساعدين القانونيين للعمل المدفوع.' },
    { icon: 'accounting', title: 'المحاسبة والضرائب', desc: 'تعامل مع التحقق من حالة الاسترداد في موسم الضرائب دون موظف استقبال.' },
    { icon: 'retail', title: 'التجزئة والتجارة الإلكترونية', desc: 'أجب عن أسئلة المنتجات وعالج المرتجعات وتولى استفسارات العملاء.' },
  ],
  fr: [
    { icon: 'hospitality', title: 'Hospitalite', desc: 'Les hotels et complexes utilisent SAQYN RABT pour gerer les demandes des clients et les services aux etages.' },
    { icon: 'healthcare', title: 'Sante', desc: 'Les cliniques et hopitaux automatisent les reservations et orientent les demandes des patients.' },
    { icon: 'homeServices', title: 'Services a Domicile', desc: 'Les plombiers et electriciens capturent les appels d\'urgence hors heures et envoient des techniciens.' },
    { icon: 'realEstate', title: 'Immobilier', desc: 'Les gestionnaires immobiliers orientent les demandes de maintenance des locataires.' },
    { icon: 'automotive', title: 'Automobile', desc: 'Les concessions et ateliers automatisent les rendez-vous et les demandes de devis.' },
    { icon: 'food', title: 'Restauration', desc: 'Les restaurants et traiteurs prennent les commandes sans appels manques.' },
    { icon: 'towing', title: 'Depannage', desc: 'Capturez les conducteurs en panne et envoyez la depanneuse sans appel telephonique.' },
    { icon: 'veterinary', title: 'Veterinaire', desc: 'Triez les visites d\'urgence et orientez les cas urgents immediatement.' },
    { icon: 'plumbing', title: 'Plomberie & Chauffage', desc: 'Capturez chaque appel d\'urgence et envoyez votre equipe sur le terrain.' },
    { icon: 'boutique', title: 'Hotels Boutique', desc: 'Laissez les clients obtenir des codes de porte a minuit sans personnel de reception.' },
    { icon: 'catering', title: 'Traiteurs', desc: 'Reservez des commandes traiteur sans perdre de temps au telephone.' },
    { icon: 'dealerships', title: 'Concessions Auto', desc: 'Repondez aux questions sur les voitures d\'occasion meme apres les heures d\'ouverture.' },
    { icon: 'construction', title: 'Construction', desc: 'Tenez les sous-traitants informes sans appels manuels.' },
    { icon: 'law', title: 'Cabinets d\'Avocats', desc: 'Repondez aux questions de frais et liberez les assistants pour le travail facturable.' },
    { icon: 'accounting', title: 'Comptabilite & Fiscalite', desc: 'Suivez les remboursements fiscaux sans receptionniste.' },
    { icon: 'retail', title: 'Commerce & E-commerce', desc: 'Repondez aux questions produits et traitez les retours.' },
  ],
};


export default function IndustriesPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const list = industries[locale as keyof typeof industries] || industries.en;

  return (
    <div className="bg-surface text-primary min-h-screen flex flex-col font-sans" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-28 text-center">
        <span className="inline-block bg-primary text-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          {t({ en: 'Industries', ar: 'القطاعات' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Built for Front-Desk Operations Across Industries', ar: 'مصمم لعمليات مكتب الاستقبال عبر القطاعات' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'SAQYN RABT adapts to how your business handles calls, requests, and workflows. These are common use cases we support.', ar: 'SAQYN RABT تتكيف مع كيفية تعامل عملك مع المكالمات والطلبات وسير العمل. هذه حالات استخدام شائعة ندعمها.' })}
        </p>
      </section>

      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((ind) => (
              <div key={ind.title} className="bg-background border border-primary/10 rounded-xl p-8 shadow-sm hover:shadow-md transition-all shadow-card">
                <span className="text-3xl mb-3 block">{industryIcons[ind.icon] || <Building2 className="w-8 h-8 text-primary" />}</span>
                <h3 className="text-lg font-bold text-primary mb-2">{ind.title}</h3>
                <p className="text-sm text-primary leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            {t({ en: 'Do not see your industry?', ar: 'لا ترى قطاعك؟' })}
          </h2>
          <p className="text-primary mb-8">
            {t({ en: 'SAQYN RABT is industry-agnostic. We build custom workflows for any business type.', ar: 'SAQYN RABT غير مقيدة بصناعة معينة. نبني سير عمل مخصص لأي نوع عمل.' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold min-h-[44px] text-surface hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', ar: 'شاهد كيف يعمل' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
