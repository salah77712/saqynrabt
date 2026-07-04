export interface IndustryCopy {
  id: string;
  label: string;
  headline: string;
  headlineAr: string;
  copy: string;
  copyAr: string;
}

export const industryList: IndustryCopy[] = [
  {
    id: 'default',
    label: 'All Industries',
    headline: 'Automate Every Customer Interaction. Empower Every Team Member.',
    headlineAr: 'أتمتة كل تفاعل مع العملاء. تمكين كل عضو في الفريق.',
    copy: 'The 24/7 AI front-desk and private staff knowledge hub built for any business – from clinics and workshops to retail and law firms.',
    copyAr: 'مكتب الاستقبال الذكي على مدار الساعة طوال أيام الأسبوع ومركز المعرفة الخاص بالموظفين والمصمم لأي عمل تجاري.',
  },
  {
    id: 'healthcare',
    label: '🏥 Healthcare',
    headline: 'Empower Your Medical Team. Automate Patient Intake.',
    headlineAr: 'تمكين فريقك الطبي. أتمتة استقبال المرضى.',
    copy: 'Reduce front-desk workload by automating patient bookings and triage inquiries.',
    copyAr: 'تقليل عبء العمل في مكتب الاستقبال عن طريق أتمتة حجوزات المرضى والاستفسارات.',
  },
  {
    id: 'law',
    label: '⚖️ Law Firms',
    headline: 'Empower Your Legal Team. Automate Client Intake.',
    headlineAr: 'تمكين فريقك القانوني. أتمتة استقبال العملاء.',
    copy: 'Respond to standard retainer inquiries and case status updates instantly.',
    copyAr: 'الرد على استفسارات الموكلين المعتادة وتحديثات حالة القضية على الفور.',
  },
  {
    id: 'hospitality',
    label: '🏨 Hospitality',
    headline: 'Empower Your Hospitality Staff. Coordinate Guest Services.',
    headlineAr: 'تمكين موظفي الضيافة. تنسيق خدمات النزلاء.',
    copy: 'Manage room requests, check-in rules, and booking questions with no delays.',
    copyAr: 'إدارة طلبات الغرف، وقواعد تسجيل الوصول، وأسئلة الحجز دون تأخير.',
  },
  {
    id: 'retail',
    label: '🛍️ Retail Stores',
    headline: 'Empower Your Retail Staff. Automate Customer Orders.',
    headlineAr: 'تمكين موظفي التجزئة. أتمتة طلبات العملاء.',
    copy: 'Handle product stock checks and shipping updates without picking up a phone.',
    copyAr: 'التعامل مع فحوصات مخزون المنتجات وتحديثات الشحن دون الحاجة للاتصال.',
  },
];
