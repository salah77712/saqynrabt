'use client';

import * as React from 'react';
import { useLocale } from '../providers';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Building2, HeartPulse, Wrench, Car, Utensils, Ambulance, DollarSign, Bell, Flag, Construction, Scale, BarChart3, ShoppingBag } from 'lucide-react';

const industryIcons: Record<string, React.ReactNode> = {
  hospitality: <Building2 className="w-8 h-8 text-primary" />,
  healthcare: <HeartPulse className="w-8 h-8 text-primary" />,
  homeServices: <Wrench className="w-8 h-8 text-primary" />,
  realEstate: <Building2 className="w-8 h-8 text-primary" />,
  automotive: <Car className="w-8 h-8 text-primary" />,
  food: <Utensils className="w-8 h-8 text-primary" />,
  towing: <Ambulance className="w-8 h-8 text-primary" />,
  veterinary: <HeartPulse className="w-8 h-8 text-primary" />,
  plumbing: <DollarSign className="w-8 h-8 text-primary" />,
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
    { icon: 'hospitality', title: 'Hospitality', desc: 'Hotels, resorts, and boutique properties use SAQYN RABT to handle late check-ins, room service requests, and guest complaints 24/7.' },
    { icon: 'healthcare', title: 'Healthcare', desc: 'Clinics and hospitals automate patient bookings, triage emergencies, and route inquiries to the right department instantly.' },
    { icon: 'homeServices', title: 'Home Services', desc: 'Plumbers, electricians, and HVAC companies capture emergency calls after hours and dispatch technicians immediately.' },
    { icon: 'realEstate', title: 'Real Estate', desc: 'Property managers route maintenance requests to on-site crews and handle tenant inquiries without a receptionist.' },
    { icon: 'automotive', title: 'Automotive', desc: 'Dealerships and repair shops automate service bookings, inventory inquiries, and quote requests around the clock.' },
    { icon: 'food', title: 'Food & Beverage', desc: 'Restaurants, cafes, and catering services book reservations and takeout orders during peak hours without missed calls.' },
    { icon: 'towing', title: 'Towing & Roadside', desc: 'Capture stranded drivers, get GPS data, and dispatch the nearest truck without a phone call.' },
    { icon: 'veterinary', title: 'Veterinary', desc: 'Triage emergency pet visits and route urgent cases to the on-call nurse immediately.' },
    { icon: 'plumbing', title: 'Plumbing & HVAC', desc: 'Stop losing money from missed after-hours repair calls. Capture every lead and dispatch your field team.' },
    { icon: 'boutique', title: 'Boutique Hotels', desc: 'Let guests au digital door codes at midnight. Handle late arrivals without front-desk staff.' },
    { icon: 'catering', title: 'Restaurants & Catering', desc: 'Quote and book catering orders with no phone tag. Standardize large event bookings.' },
    { icon: 'dealerships', title: 'Auto Dealerships', desc: 'Answer real-time inventory questions about used cars on your lot â  even after hours.' },
    { icon: 'construction', title: 'Construction', desc: 'Keep subcontractors updated on material delivery times and site work permits without manual calls.' },
    { icon: 'law', title: 'Law Firms', desc: 'Au retainer fee questions and intake form inquiries. Free up paralegals for billable work.' },
    { icon: 'accounting', title: 'Accounting & Tax', desc: 'Handle tax season refund status checks without a receptionist. Route complex cases to senior accountants.' },
    { icon: 'retail', title: 'Retail & E-commerce', desc: 'Answer product questions, process returns, and handle customer inquiries across every channel.' },
  ],
  ar: [
    { icon: 'hospitality', title: 'الضيافة', desc: 'تستخدم الفنادق والمنتجعات SAQYN RABT للتعامل مع تسجيلات الوصول المتأخرة وطلبات الغرف وشكاوى الضيوف 24/7.' },
    { icon: 'healthcare', title: 'الرعاية الصحية', desc: 'تؤتمت العيادات والمستشفيات حجوزات المرضى وفرز الحالات الطارئة وتوجيه الاستفسارات للقسم المناسب فوراً.' },
    { icon: 'homeServices', title: 'الخدمات المنزلية', desc: 'يلتقط السباكون والكهربائيون مكالمات الطوارئ بعد ساعات العمل ويرسلون الفنيين فوراً.' },
    { icon: 'realEstate', title: 'العقارات', desc: 'يوجه مديرو العقارات طلبات الصيانة لفرق العمل ويتعاملون مع استفسارات المستأجرين دون موظف استقبال.' },
    { icon: 'automotive', title: 'السيارات', desc: 'تؤتمت الوكالات وورش الإصلاح حجوزات الخدمة واستفسارات المخزون وطلبات عروض الأسعار على مدار الساعة.' },
    { icon: 'food', title: 'الأغذية والمشروبات', desc: 'تحجز المطاعم والمقاهي وخدمات التموين الطلبات خلال ساعات الذروة دون مكالمات فائتة.' },
    { icon: 'towing', title: 'السحب والخدمات على الطريق', desc: 'التقط السائقين العالقين واحصل على بيانات الموقع GPS وأرسل أقرب شاحنة دون مكالمة هاتفية.' },
    { icon: 'veterinary', title: 'الطب البيطري', desc: 'افرز زيارات الحيوانات الأليفة الطارئة ووجّه الحالات العاجلة للممرض المناوب فوراً.' },
    { icon: 'plumbing', title: 'السباكة والتدفئة والتكييف', desc: 'توقف عن خسارة الأموال من مكالمات الإصلاح الفائتة بعد ساعات العمل. التقط كل فرصة وأرسل فريقك الميداني.' },
    { icon: 'boutique', title: 'الفنادق البوتيكية', desc: 'دع الضيوف يخصصون رموز الأبواب الرقمية في منتصف الليل. تعامل مع الوصول المتأخر دون موظفي استقبال.' },
    { icon: 'catering', title: 'المطاعم والتموين', desc: 'سعّر واحجز طلبات التموين دون الحاجة للاتصالات المتكررة. وحّد حجوزات الفعاليات الكبيرة.' },
    { icon: 'dealerships', title: 'وكالات السيارات', desc: 'أجب عن أسئلة المخزون في الوقت الفعلي حول السيارات المستعملة في ساحتك â حتى بعد ساعات العمل.' },
    { icon: 'construction', title: 'البناء', desc: 'أبقِ مقاولي الباطن على علم بمواعيد تسليم المواد وتصاريح العمل في الموقع دون مكالمات يدوية.' },
    { icon: 'law', title: 'شركات المحاماة', desc: 'أجب تلقائياً عن أسئلة رسوم التوكيل واستفسارات نماذج القبول. فرّغ المساعدين القانونيين للعمل المدفوع.' },
    { icon: 'accounting', title: 'المحاسبة والضرائب', desc: 'تعامل مع التحقق من حالة الاسترداد في موسم الضرائب دون موظف استقبال. وجّه الحالات المعقدة لكبار المحاسبين.' },
    { icon: 'retail', title: 'التجزئة والتجارة الإلكترونية', desc: 'أجب عن أسئلة المنتجات وعالج المرتجعات وتولى استفسارات العملاء عبر كل قنوات الاتصال.' },
  ],
  fr: [
    { icon: 'hospitality', title: 'HospitalitÃ©', desc: 'Les hÃ´tels et complexes utilisent SAQYN RABT pour gÃ©rer les arrivÃ©es tardives, le service d\'Ã©tage et les plaintes des clients 24/7.' },
    { icon: 'healthcare', title: 'SantÃ©', desc: 'Les cliniques et hÃ´pitaux automatisent les rÃ©servations, trient les urgences et orientent les demandes instantanÃ©ment.' },
    { icon: 'homeServices', title: 'Services Ã  Domicile', desc: 'Les plombiers et Ã©lectriciens capturent les appels d\'urgence hors heures et envoient des techniciens immÃ©diatement.' },
    { icon: 'realEstate', title: 'Immobilier', desc: 'Les gestionnaires immobiliers orientent les demandes de maintenance et gÃ¨rent les requÃªtes des locataires sans rÃ©ceptionniste.' },
    { icon: 'automotive', title: 'Automobile', desc: 'Les concessions et ateliers automatisent les rendez-vous, les questions de stock et les demandes de devis 24/7.' },
    { icon: 'food', title: 'Restauration', desc: 'Les restaurants et services traiteurs rÃ©servent des tables et prennent des commandes en heures de pointe sans appels manquÃ©s.' },
    { icon: 'towing', title: 'DÃ©pannage', desc: 'Capturez les conducteurs en panne, obtenez les donnÃ©es GPS et envoyez la dÃ©panneuse la plus proche sans appel tÃ©lÃ©phonique.' },
    { icon: 'veterinary', title: 'VÃ©tÃ©rinaire', desc: 'Triez les visites d\'urgence et orientez les cas urgents vers l\'infirmier de garde immÃ©diatement.' },
    { icon: 'plumbing', title: 'Plomberie & Chauffage', desc: 'ArrÃªtez de perdre de l\'argent avec les appels de rÃ©paration manquÃ©s. Capturez chaque prospect et envoyez votre Ã©quipe.' },
    { icon: 'boutique', title: 'HÃ´tels Boutique', desc: 'Laissez les clients s\'attribuer des codes de porte Ã  minuit. GÃ©rez les arrivÃ©es tardives sans personnel de rÃ©ception.' },
    { icon: 'catering', title: 'Restaurants & Traiteurs', desc: 'Faites des devis et rÃ©servez des commandes traiteur sans perdre de temps. Standardisez les grandes rÃ©servations.' },
    { icon: 'dealerships', title: 'Concessions Auto', desc: 'RÃ©pondez aux questions de stock en temps rÃ©el sur les voitures d\'occasion de votre parc, mÃªme aprÃ¨s les heures d\'ouverture.' },
    { icon: 'construction', title: 'Construction', desc: 'Tenez les sous-traitants informÃ©s des heures de livraison des matÃ©riaux et des permis de travail sans appels manuels.' },
    { icon: 'law', title: 'Cabinets d\'Avocats', desc: 'RÃ©pondez aux questions de frais de provision. LibÃ©rez les assistants juridiques pour le travail facturable.' },
    { icon: 'accounting', title: 'ComptabilitÃ© & FiscalitÃ©', desc: 'Gerez le suivi des remboursements fiscaux sans rÃ©ceptionniste. Orientez les cas complexes vers les comptables principaux.' },
    { icon: 'retail', title: 'Commerce & E-commerce', desc: 'RÃ©pondez aux questions sur les produits, gÃ©rez les retours et traitez les demandes des clients sur tous les canaux.' },
  ],
  hi: [
    { icon: 'hospitality', title: 'à¤à¤¤à¤¿à¤¥à¥à¤¯ à¤¸à¤¤à¥à¤à¤¾à¤°', desc: 'à¤¹à¥à¤à¤² à¤à¤° à¤°à¤¿à¤¸à¥à¤°à¥à¤ à¤¦à¥à¤° à¤¸à¥ à¤à¥à¤-à¤à¤¨, à¤°à¥à¤® à¤¸à¤°à¥à¤µà¤¿à¤¸ à¤à¤¨à¥à¤°à¥à¤§ à¤à¤° à¤à¤¤à¤¿à¤¥à¤¿ à¤¶à¤¿à¤à¤¾à¤¯à¤¤à¥à¤ à¤à¥ 24/7 à¤¸à¤à¤­à¤¾à¤²à¤¨à¥ à¤à¥ à¤²à¤¿à¤ SAQYN RABT à¤à¤¾ à¤à¤ªà¤¯à¥à¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'healthcare', title: 'à¤¸à¥à¤µà¤¾à¤¸à¥à¤¥à¥à¤¯ à¤¸à¥à¤µà¤¾', desc: 'à¤à¥à¤²à¤¿à¤¨à¤¿à¤ à¤à¤° à¤à¤¸à¥à¤ªà¤¤à¤¾à¤² à¤°à¥à¤à¥ à¤¬à¥à¤à¤¿à¤à¤ à¤à¥ à¤¸à¥à¤µà¤à¤¾à¤²à¤¿à¤¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤, à¤à¤ªà¤¾à¤¤ à¤¸à¥à¤¥à¤¿à¤¤à¤¿à¤¯à¥à¤ à¤à¥ à¤à¤¾à¤à¤à¤¤à¥ à¤¹à¥à¤, à¤à¤° à¤ªà¥à¤à¤¤à¤¾à¤ à¤à¥ à¤¤à¥à¤°à¤à¤¤ à¤¸à¤¹à¥ à¤µà¤¿à¤­à¤¾à¤ à¤®à¥à¤ à¤­à¥à¤à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'homeServices', title: 'à¤à¥à¤¹ à¤¸à¥à¤µà¤¾à¤à¤', desc: 'à¤ªà¥à¤²à¤à¤¬à¤°, à¤à¤²à¥à¤à¥à¤à¥à¤°à¥à¤¶à¤¿à¤¯à¤¨ à¤à¤° à¤à¤à¤µà¥à¤à¤¸à¥ à¤à¤à¤ªà¤¨à¤¿à¤¯à¤¾à¤ à¤à¤¾à¤® à¤à¥ à¤à¤à¤à¥à¤ à¤à¥ à¤¬à¤¾à¤¦ à¤à¤ªà¤¾à¤¤à¤à¤¾à¤²à¥à¤¨ à¤à¥à¤² à¤à¥à¤ªà¥à¤à¤° à¤à¤°à¤¤à¥ à¤¹à¥à¤ à¤à¤° à¤¤à¤à¤¨à¥à¤¶à¤¿à¤¯à¤¨à¥à¤ à¤à¥ à¤¤à¥à¤°à¤à¤¤ à¤­à¥à¤à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'realEstate', title: 'à¤°à¤¿à¤¯à¤² à¤à¤¸à¥à¤à¥à¤', desc: 'à¤¸à¤à¤ªà¤¤à¥à¤¤à¤¿ à¤ªà¥à¤°à¤¬à¤à¤§à¤ à¤°à¤à¤°à¤à¤¾à¤µ à¤à¤¨à¥à¤°à¥à¤§à¥à¤ à¤à¥ à¤à¤¨-à¤¸à¤¾à¤à¤ à¤à¥à¤°à¥ à¤à¥ à¤­à¥à¤à¤¤à¥ à¤¹à¥à¤ à¤à¤° à¤¬à¤¿à¤¨à¤¾ à¤°à¤¿à¤¸à¥à¤ªà¥à¤¶à¤¨à¤¿à¤¸à¥à¤ à¤à¥ à¤à¤¿à¤°à¤¾à¤¯à¥à¤¦à¤¾à¤° à¤ªà¥à¤à¤¤à¤¾à¤ à¤à¥ à¤¸à¤à¤­à¤¾à¤²à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'automotive', title: 'à¤à¤à¥à¤®à¥à¤à¤¿à¤µ', desc: 'à¤¡à¥à¤²à¤°à¤¶à¤¿à¤ª à¤à¤° à¤®à¤°à¤®à¥à¤®à¤¤ à¤¦à¥à¤à¤¾à¤¨à¥à¤ à¤à¥à¤¬à¥à¤¸à¥à¤ à¤à¤à¤à¥ à¤¸à¤°à¥à¤µà¤¿à¤¸ à¤¬à¥à¤à¤¿à¤à¤, à¤à¤¨à¥à¤µà¥à¤à¤à¥à¤°à¥ à¤ªà¥à¤à¤¤à¤¾à¤ à¤à¤° à¤à¥à¤ à¤à¤¨à¥à¤°à¥à¤§à¥à¤ à¤à¥ à¤¸à¥à¤µà¤à¤¾à¤²à¤¿à¤¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'food', title: 'à¤à¤¾à¤¦à¥à¤¯ à¤à¤° à¤ªà¥à¤¯', desc: 'à¤°à¥à¤¸à¥à¤à¥à¤°à¥à¤à¤, à¤à¥à¤«à¥ à¤à¤° à¤à¤¾à¤¨-à¤ªà¤¾à¤¨ à¤¸à¥à¤µà¤¾à¤à¤ à¤¬à¤¿à¤¨à¤¾ à¤®à¤¿à¤¸à¥à¤¡ à¤à¥à¤² à¤à¥ à¤µà¥à¤¯à¤¸à¥à¤¤ à¤à¤à¤à¥à¤ à¤à¥ à¤¦à¥à¤°à¤¾à¤¨ à¤à¤°à¤à¥à¤·à¤£ à¤à¤° à¤à¥à¤à¤à¤à¤ à¤à¤°à¥à¤¡à¤° à¤¬à¥à¤ à¤à¤°à¤¤à¥ à¤¹à¥à¤à¥¤' },
    { icon: 'towing', title: 'à¤owing à¤à¤° à¤¸à¤¡à¤¼à¤ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾', desc: 'à¤«à¤à¤¸à¥ à¤¹à¥à¤ à¤¡à¥à¤°à¤¾à¤à¤µà¤°à¥à¤ à¤à¥ à¤à¥à¤ªà¥à¤à¤° à¤à¤°à¥à¤, à¤à¥à¤ªà¥à¤à¤¸ à¤¡à¥à¤à¤¾ à¤ªà¥à¤°à¤¾à¤ªà¥à¤¤ à¤à¤°à¥à¤, à¤à¤° à¤¬à¤¿à¤¨à¤¾ à¤«à¥à¤¨ à¤à¥à¤² à¤à¥ à¤¨à¤¿à¤à¤à¤¤à¤® à¤à¥à¤°à¤ à¤à¥ à¤­à¥à¤à¥à¤à¥¤' },
    { icon: 'veterinary', title: 'à¤ªà¤¶à¥ à¤à¤¿à¤à¤¿à¤¤à¥à¤¸à¤¾', desc: 'à¤à¤ªà¤¾à¤¤à¤à¤¾à¤²à¥à¤¨ à¤ªà¤¾à¤²à¤¤à¥ à¤à¤¾à¤¨à¤µà¤°à¥à¤ à¤à¥ à¤¯à¤¾à¤¤à¥à¤°à¤¾à¤à¤ à¤à¥ à¤à¤¾à¤à¤à¥à¤ à¤à¤° à¤¤à¤¤à¥à¤à¤¾à¤² à¤®à¤¾à¤®à¤²à¥à¤ à¤à¥ à¤à¤¨-à¤à¥à¤² à¤¨à¤°à¥à¤¸ à¤à¥ à¤¤à¥à¤°à¤à¤¤ à¤­à¥à¤à¥à¤à¥¤' },
    { icon: 'plumbing', title: 'à¤ªà¥à¤²à¤à¤¬à¤¿à¤à¤ à¤à¤° à¤à¤à¤µà¥à¤à¤¸à¥', desc: 'à¤à¤¾à¤® à¤à¥ à¤à¤à¤à¥à¤ à¤à¥ à¤¬à¤¾à¤¦ à¤®à¤¿à¤¸à¥à¤¡ à¤°à¤¿à¤ªà¥à¤¯à¤° à¤à¥à¤² à¤¸à¥ à¤ªà¥à¤¸à¤¾ à¤à¥à¤¨à¤¾ à¤¬à¤à¤¦ à¤à¤°à¥à¤à¥¤ à¤¹à¤° à¤²à¥à¤¡ à¤à¥ à¤à¥à¤ªà¥à¤à¤° à¤à¤°à¥à¤ à¤à¤° à¤à¤ªà¤¨à¥ à¤«à¥à¤²à¥à¤¡ à¤à¥à¤® à¤à¥ à¤­à¥à¤à¥à¤à¥¤' },
    { icon: 'boutique', title: 'à¤¬à¥à¤à¥à¤ à¤¹à¥à¤à¤²', desc: 'à¤à¤¤à¤¿à¤¥à¤¿à¤¯à¥à¤ à¤à¥ à¤à¤§à¥ à¤°à¤¾à¤¤ à¤à¥ à¤¡à¤¿à¤à¤¿à¤à¤² à¤¡à¥à¤° à¤à¥à¤¡ à¤¸à¥à¤µà¤¤à¤ à¤à¤¸à¤¾à¤à¤¨ à¤à¤°à¤¨à¥ à¤¦à¥à¤à¥¤ à¤«à¥à¤°à¤à¤-à¤¡à¥à¤¸à¥à¤ à¤à¤°à¥à¤®à¤à¤¾à¤°à¤¿à¤¯à¥à¤ à¤à¥ à¤¬à¤¿à¤¨à¤¾ à¤¦à¥à¤° à¤¸à¥ à¤à¤¨à¥ à¤µà¤¾à¤²à¥à¤ à¤à¥ à¤¸à¤à¤­à¤¾à¤²à¥à¤à¥¤' },
    { icon: 'catering', title: 'à¤°à¥à¤¸à¥à¤à¥à¤°à¥à¤à¤ à¤à¤° à¤à¤¾à¤¨-à¤ªà¤¾à¤¨', desc: 'à¤¬à¤¿à¤¨à¤¾ à¤à¤¿à¤¸à¥ à¤«à¥à¤¨ à¤à¥à¤ à¤à¥ à¤à¤¾à¤¨-à¤ªà¤¾à¤¨ à¤à¥ à¤à¤°à¥à¤¡à¤° à¤à¥à¤ à¤à¤° à¤¬à¥à¤ à¤à¤°à¥à¤à¥¤ à¤¬à¤¡à¤¼à¥ à¤à¤µà¥à¤à¤ à¤¬à¥à¤à¤¿à¤à¤ à¤à¥ à¤®à¤¾à¤¨à¤à¥à¤à¥à¤¤ à¤à¤°à¥à¤à¥¤' },
    { icon: 'dealerships', title: 'à¤à¤à¥ à¤¡à¥à¤²à¤°à¤¶à¤¿à¤ª', desc: 'à¤à¤ªà¤¨à¥ à¤²à¥à¤ à¤ªà¤° à¤à¤¸à¥à¤¤à¥à¤®à¤¾à¤² à¤à¥ à¤à¤ à¤à¤¾à¤°à¥à¤ à¤à¥ à¤¬à¤¾à¤°à¥ à¤®à¥à¤ à¤µà¤¾à¤¸à¥à¤¤à¤µà¤¿à¤ à¤¸à¤®à¤¯ à¤®à¥à¤ à¤à¤¨à¥à¤µà¥à¤à¤à¥à¤°à¥ à¤¸à¤µà¤¾à¤²à¥à¤ à¤à¥ à¤à¤µà¤¾à¤¬ à¤¦à¥à¤ â à¤à¤¾à¤® à¤à¥ à¤à¤à¤à¥à¤ à¤à¥ à¤¬à¤¾à¤¦ à¤­à¥à¥¤' },
    { icon: 'construction', title: 'à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£', desc: 'à¤¬à¤¿à¤¨à¤¾ à¤®à¥à¤¨à¥à¤¯à¥à¤à¤² à¤à¥à¤² à¤à¥ à¤à¤ªà¤ à¥à¤à¥à¤¦à¤¾à¤°à¥à¤ à¤à¥ à¤¸à¤¾à¤®à¤à¥à¤°à¥ à¤µà¤¿à¤¤à¤°à¤£ à¤¸à¤®à¤¯ à¤à¤° à¤¸à¤¾à¤à¤ à¤à¤¾à¤°à¥à¤¯ à¤ªà¤°à¤®à¤¿à¤ à¤ªà¤° à¤à¤ªà¤¡à¥à¤ à¤°à¤à¥à¤à¥¤' },
    { icon: 'law', title: 'à¤²à¥ à¤«à¤°à¥à¤®', desc: 'à¤°à¤¿à¤à¥à¤¨à¤° à¤¶à¥à¤²à¥à¤ à¤¸à¤µà¤¾à¤²à¥à¤ à¤à¤° à¤à¤¨à¤à¥à¤ à¤«à¥à¤°à¥à¤® à¤ªà¥à¤à¤¤à¤¾à¤ à¤à¤¾ à¤¸à¥à¤µà¤¤à¤ à¤à¤¤à¥à¤¤à¤° à¤¦à¥à¤à¥¤ à¤¬à¤¿à¤² à¤¯à¥à¤à¥à¤¯ à¤à¤¾à¤® à¤à¥ à¤²à¤¿à¤ à¤ªà¥à¤°à¤¾à¤²à¥à¤à¤² à¤à¥ à¤à¤¾à¤²à¥ à¤à¤°à¥à¤à¥¤' },
    { icon: 'accounting', title: 'à¤²à¥à¤à¤¾à¤à¤à¤¨ à¤à¤° à¤à¤°', desc: 'à¤°à¤¿à¤¸à¥à¤ªà¥à¤¶à¤¨à¤¿à¤¸à¥à¤ à¤à¥ à¤¬à¤¿à¤¨à¤¾ à¤à¥à¤à¥à¤¸ à¤¸à¥à¤à¤¨ à¤°à¤¿à¤«à¤à¤¡ à¤¸à¥à¤¥à¤¿à¤¤à¤¿ à¤à¥ à¤à¤¾à¤à¤ à¤à¥ à¤¸à¤à¤­à¤¾à¤²à¥à¤à¥¤ à¤à¤à¤¿à¤² à¤®à¤¾à¤®à¤²à¥à¤ à¤à¥ à¤µà¤°à¤¿à¤·à¥à¤  à¤²à¥à¤à¤¾à¤à¤¾à¤°à¥à¤ à¤à¥ à¤­à¥à¤à¥à¤à¥¤' },
    { icon: 'retail', title: 'à¤à¥à¤¦à¤°à¤¾ à¤à¤° à¤-à¤à¥à¤®à¤°à¥à¤¸', desc: 'à¤à¤¤à¥à¤ªà¤¾à¤¦ à¤¸à¤µà¤¾à¤²à¥à¤ à¤à¥ à¤à¤µà¤¾à¤¬ à¤¦à¥à¤, à¤°à¤¿à¤à¤°à¥à¤¨ à¤ªà¥à¤°à¥à¤¸à¥à¤¸ à¤à¤°à¥à¤ à¤à¤° à¤¹à¤° à¤à¥à¤¨à¤² à¤ªà¤° à¤à¥à¤°à¤¾à¤¹à¤à¥à¤ à¤à¥ à¤ªà¥à¤à¤¤à¤¾à¤ à¤¸à¤à¤­à¤¾à¤²à¥à¤à¥¤' },
  ]
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
          {t({ en: 'Industries', fr: 'Secteurs d\'activitÃ©', ar: 'القطاعات', hi: 'à¤à¤¦à¥à¤¯à¥à¤' })}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight max-w-4xl mx-auto">
          {t({ en: 'Built for 16 Industries â Worldwide', fr: 'ConÃ§u pour 16 secteurs â Dans le monde entier', ar: 'مصمم لـ 16 قطاعاً â حول العالم', hi: '16 à¤à¤¦à¥à¤¯à¥à¤à¥à¤ à¤à¥ à¤²à¤¿à¤ à¤¨à¤¿à¤°à¥à¤®à¤¿à¤¤ â à¤¦à¥à¤¨à¤¿à¤¯à¤¾ à¤­à¤° à¤®à¥à¤' })}
        </h1>
        <p className="mt-4 text-lg text-primary max-w-2xl mx-auto">
          {t({ en: 'Global headquarters with local expertise. Our platform adapts to your industry, language, and time zone.', fr: 'SiÃ¨ge mondial avec expertise locale. Notre plateforme s\'adapte Ã  votre secteur, votre langue et votre fuseau horaire.', ar: 'مقر عالمي مع خبرة محلية. منصتنا تتكيف مع قطاعك ولغتك ومنطقتك الزمنية.', hi: 'à¤¸à¥à¤¥à¤¾à¤¨à¥à¤¯ à¤µà¤¿à¤¶à¥à¤·à¤à¥à¤à¤¤à¤¾ à¤à¥ à¤¸à¤¾à¤¥ à¤µà¥à¤¶à¥à¤µà¤¿à¤ à¤®à¥à¤à¥à¤¯à¤¾à¤²à¤¯à¥¤ à¤¹à¤®à¤¾à¤°à¤¾ à¤®à¤à¤ à¤à¤ªà¤à¥ à¤à¤¦à¥à¤¯à¥à¤, à¤­à¤¾à¤·à¤¾ à¤à¤° à¤¸à¤®à¤¯ à¤à¥à¤·à¥à¤¤à¥à¤° à¤à¥ à¤à¤¨à¥à¤à¥à¤² à¤¹à¥à¥¤' })}
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
            {t({ en: 'Don\'t see your industry?', fr: 'Vous ne voyez pas votre secteur ?', ar: 'لا ترى قطاعك؟', hi: 'à¤à¤ªà¤¨à¤¾ à¤à¤¦à¥à¤¯à¥à¤ à¤¨à¤¹à¥à¤ à¤¦à¤¿à¤ à¤°à¤¹à¤¾ à¤¹à¥?' })}
          </h2>
          <p className="text-primary mb-8">
            {t({ en: 'SAQYN RABT is industry-agnostic. We build custom workflows for any business type.', fr: 'SAQYN RABT est indÃ©pendant du secteur. Nous construisons des flux de travail personnalisÃ©s pour tout type d\'entreprise.', ar: 'SAQYN RABT غير مقيدة بصناعة معينة. نبني سير عمل مخصص لأي نوع عمل.', hi: 'SAQYN RABT à¤à¤¦à¥à¤¯à¥à¤-à¤à¤à¥à¤à¥à¤¯à¤µà¤¾à¤¦à¥ à¤¹à¥à¥¤ à¤¹à¤® à¤à¤¿à¤¸à¥ à¤­à¥ à¤ªà¥à¤°à¤à¤¾à¤° à¤à¥ à¤µà¥à¤¯à¤µà¤¸à¤¾à¤¯ à¤à¥ à¤²à¤¿à¤ à¤à¤¸à¥à¤à¤® à¤µà¤°à¥à¤à¤«à¤¼à¥à¤²à¥ à¤¬à¤¨à¤¾à¤¤à¥ à¤¹à¥à¤à¥¤' })}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/saqynrabt/demo'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-xs font-bold min-h-[44px] text-surface hover:opacity-90 transition-all"
          >
            {t({ en: 'See how it works', fr: 'DÃ©couvrez comment Ã§a marche', ar: 'شاهد كيف يعمل', hi: 'à¤¦à¥à¤à¥à¤ à¤¯à¤¹ à¤à¥à¤¸à¥ à¤à¤¾à¤® à¤à¤°à¤¤à¤¾ à¤¹à¥' })}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
