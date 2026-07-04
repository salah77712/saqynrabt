import type { Metadata } from 'next';
import MinimalPage from '../../components/MinimalPage';
import { pageMetadata } from '../../lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Cookie Policy | SAQYN RABT',
  description: 'Learn how SAQYN RABT uses cookies and similar technologies to improve site performance and user experience.',
  path: '/cookie-policy',
});

const content = {
  eyebrow: { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
  title: { en: 'Cookie Policy', ar: 'سياسة ملفات تعريف الارتباط' },
  description: { en: 'We use cookies and similar technologies to understand how visitors use our site and improve the experience over time.', ar: 'نستخدم ملفات تعريف الارتباط وتقنيات مماثلة لفهم كيفية استخدام الزوار لموقعنا وتحسين التجربة بمرور الوقت.' },
  sections: [
    { title: { en: 'What cookies do we use?', ar: 'ما هي ملفات تعريف الارتباط التي نستخدمها؟' }, body: { en: 'We use essential cookies for site functionality and analytics cookies to understand traffic and product performance.', ar: 'نستخدم ملفات تعريف الارتباط الأساسية لوظائف الموقع وملفات تعريف الارتباط التحليلية لفهم حركة المرور وأداء المنتج.' } },
    { title: { en: 'Managing preferences', ar: 'إدارة التفضيلات' }, body: { en: 'You may control or disable cookies in your browser settings, although some site features may be affected.', ar: 'يمكنك التحكم في ملفات تعريف الارتباط أو تعطيلها من إعدادات المتصفح، على الرغم من أن بعض ميزات الموقع قد تتأثر.' } },
  ]
};

export default function CookiePolicyPage() {
  return <MinimalPage eyebrow={content.eyebrow} title={content.title} description={content.description} sections={content.sections} />;
}
