export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  priceLabel: string;
  priceLabelAr: string;
  description: string;
  descriptionAr: string;
  cta: string;
  ctaAr: string;
  popular?: boolean;
  features: PricingFeature[];
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    nameAr: 'مبتدئ',
    price: 0,
    priceLabel: 'Free',
    priceLabelAr: 'مجاني',
    description: 'Perfect for small teams testing the platform.',
    descriptionAr: 'مثالي للفرق الصغيرة لاختبار المنصة.',
    cta: 'Get Started',
    ctaAr: 'ابدأ الآن',
    features: [
      { text: 'Basic call answering', included: true },
      { text: '500 text requests', included: true },
      { text: '1 department', included: true },
      { text: '50 RAG questions', included: true },
      { text: 'Email support', included: true },
      { text: 'Custom branding', included: false },
      { text: 'Priority support', included: false },
      { text: 'Unlimited documents', included: false },
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    nameAr: 'نمو',
    price: 299,
    priceLabel: '$299/mo',
    priceLabelAr: '٢٩٩ دولار/شهرياً',
    description: 'For growing businesses with active operations.',
    descriptionAr: 'للشركات المتنامية ذات العمليات النشطة.',
    cta: 'Start Free Trial',
    ctaAr: 'ابدأ النسخة التجريبية',
    popular: true,
    features: [
      { text: 'Basic call answering', included: true },
      { text: '5,000 text requests', included: true },
      { text: 'Up to 3 departments', included: true },
      { text: '1,000 RAG questions', included: true },
      { text: 'Email + Chat support', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Priority support', included: false },
      { text: 'Unlimited documents', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    nameAr: 'مؤسسة',
    price: 999,
    priceLabel: '$999/mo',
    priceLabelAr: '٩٩٩ دولار/شهرياً',
    description: 'Full-scale deployment with dedicated support.',
    descriptionAr: 'نشر كامل مع دعم مخصص.',
    cta: 'Contact Sales',
    ctaAr: 'اتصل بالمبيعات',
    features: [
      { text: 'Basic call answering', included: true },
      { text: 'Unlimited text requests', included: true },
      { text: 'Unlimited departments', included: true },
      { text: 'Unlimited RAG questions', included: true },
      { text: 'Email + Chat + Phone support', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Priority support', included: true },
      { text: 'Unlimited documents', included: true },
    ],
  },
];
