export interface ProductTier {
  id: string;
  name: string;
  nameAr: string;
  priceUSD: number | null;
  setupUSD: number | null;
  priceQAR: number | null;
  setupQAR: number | null;
  description: string;
  descriptionAr: string;
  cta: string;
  ctaAr: string;
  popular: boolean;
  features: { en: string[]; ar: string[] };
}

export const AUTOMATION_TIERS: ProductTier[] = [
  {
    id: 'auto-starter',
    name: 'Starter',
    nameAr: 'المبتدئ',
    priceUSD: 410,
    setupUSD: 548,
    priceQAR: 1499,
    setupQAR: 1999,
    description: 'Best for small front desks.',
    descriptionAr: 'مثالي لمكاتب الاستقبال الصغيرة.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    popular: false,
    features: {
      en: ['Basic call answering', '500 text requests/mo', '250 voice mins/mo', '1 department routing', 'Standard support'],
      ar: ['رد أساسي على المكالمات', '500 طلب نصي/شهر', '250 دقيقة صوت/شهر', 'توجيه قسم واحد', 'دعم أساسي'],
    },
  },
  {
    id: 'auto-growth',
    name: 'Growth',
    nameAr: 'النمو',
    priceUSD: 685,
    setupUSD: 959,
    priceQAR: 2499,
    setupQAR: 3499,
    description: 'Best for growing operations.',
    descriptionAr: 'للعمليات المتنامية.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    popular: true,
    features: {
      en: ['Advanced call answering', '2,000 text requests/mo', '700 voice mins/mo', '3 dept routing', 'Complaint routing', 'Weekly report'],
      ar: ['رد متقدم على المكالمات', '2,000 طلب نصي/شهر', '700 دقيقة صوت/شهر', 'توجيه 3 أقسام', 'توجيه الشكاوى', 'تقرير أسبوعي'],
    },
  },
  {
    id: 'auto-pro',
    name: 'Professional',
    nameAr: 'المحترف',
    priceUSD: 1233,
    setupUSD: 1644,
    priceQAR: 4499,
    setupQAR: 5999,
    description: 'Best for multi-department teams.',
    descriptionAr: 'لفرق متعددة الأقسام.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    popular: false,
    features: {
      en: ['Advanced call answering', '5,000 text requests/mo', '1,500 voice mins/mo', '8 dept routing', 'Manager alerts', 'Priority support', '2 languages'],
      ar: ['رد متقدم على المكالمات', '5,000 طلب نصي/شهر', '1,500 دقيقة صوت/شهر', 'توجيه 8 أقسام', 'تنبيهات المدير', 'دعم ذو أولوية', 'لغتان'],
    },
  },
];

export const CHATBOT_TIERS: ProductTier[] = [
  {
    id: 'chat-starter',
    name: 'Starter',
    nameAr: 'المبتدئ',
    priceUSD: 822,
    setupUSD: 1370,
    priceQAR: 2999,
    setupQAR: 4999,
    description: 'Up to 50 employees.',
    descriptionAr: 'حتى 50 موظفاً.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    popular: false,
    features: {
      en: ['Private RAG AI', '2,000 questions/mo', '50 employees', '2 doc updates/mo', 'HR, SOP & Vacation rules'],
      ar: ['ذكاء اصطناعي خاص RAG', '2,000 سؤال/شهر', '50 موظفاً', 'تحديث مستندين/شهر', 'الموارد البشرية والسياسات'],
    },
  },
  {
    id: 'chat-growth',
    name: 'Growth',
    nameAr: 'النمو',
    priceUSD: 1370,
    setupUSD: 1918,
    priceQAR: 4999,
    setupQAR: 6999,
    description: 'Up to 150 employees.',
    descriptionAr: 'حتى 150 موظفاً.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    popular: true,
    features: {
      en: ['Private RAG AI', '5,000 questions/mo', '150 employees', '10 doc updates/mo', 'Advanced role training', '2 languages'],
      ar: ['ذكاء اصطناعي خاص RAG', '5,000 سؤال/شهر', '150 موظفاً', 'تحديث 10 مستندات/شهر', 'تدريب أدوار متقدم', 'لغتان'],
    },
  },
  {
    id: 'chat-enterprise',
    name: 'Enterprise',
    nameAr: 'المؤسسات',
    priceUSD: null,
    setupUSD: null,
    priceQAR: null,
    setupQAR: null,
    description: '151+ employees.',
    descriptionAr: '151+ موظفاً.',
    cta: 'Contact Sales',
    ctaAr: 'اتصل بالمبيعات',
    popular: false,
    features: {
      en: ['Unlimited employees', 'Unlimited questions', 'Unlimited documents', 'Dedicated knowledge base', 'Custom branding'],
      ar: ['موظفون غير محدودين', 'أسئلة غير محدودة', 'مستندات غير محدودة', 'قاعدة معرفة مخصصة', 'علامة تجارية مخصصة'],
    },
  },
];
