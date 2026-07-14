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
  description: { en: 'This policy explains what cookies are, how SAQYN RABT uses them on saqynrabt.com and subdomains, and your rights to control their use.', ar: 'توضح هذه السياسة ماهية ملفات تعريف الارتباط، وكيف تستخدمها SAQYN RABT على saqynrabt.com والنطاقات الفرعية، وحقوقك في التحكم في استخدامها.' },
  sections: [
    {
      title: { en: 'Introduction & Policy Scope', ar: 'المقدمة ونطاق السياسة' },
      body: {
        en: 'This Cookie Policy applies to all visitors and users of the SAQYN RABT website, dashboard, and any related subdomains (collectively, the "Platform"). Cookies are small text files stored on your device by your web browser when you visit a website. They help us remember your preferences, authenticate your session, and understand how the Platform is used. By continuing to use the Platform, you consent to the use of cookies as described in this policy. If you do not agree, you may disable cookies through your browser settings, though some features of the Platform may not function as intended.',
        ar: 'تنطبق سياسة ملفات تعريف الارتباط هذه على جميع الزوار والمستخدمين لموقع SAQYN RABT الإلكتروني ولوحة التحكم وأي نطاقات فرعية ذات صلة (يُشار إليها مجتمعة باسم "المنصة"). ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم تخزينها على جهازك بواسطة متصفح الويب عند زيارة موقع إلكتروني. تساعدنا في تذكر تفضيلاتك والتحقق من جلستك وفهم كيفية استخدام المنصة. باستمرارك في استخدام المنصة، فإنك توافق على استخدام ملفات تعريف الارتباط كما هو موضح في هذه السياسة. إذا كنت لا توافق، يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح، على الرغم من أن بعض ميزات المنصة قد لا تعمل كما هو متوقع.'
      }
    },
    {
      title: { en: 'Strictly Necessary Cookies', ar: 'ملفات تعريف الارتباط الضرورية' },
      body: {
        en: 'These cookies are essential for the Platform to function correctly. They enable core features such as secure user authentication (via Clerk), payment processing (via Stripe), and session state management. Without these cookies, services you have requested — such as logging into your dashboard or completing a transaction — cannot be provided. These cookies do not track browsing activity on third-party sites and do not require prior consent, though they are subject to this policy. Specific technologies include: Clerk session tokens for authentication, Stripe payment session cookies, and Redis-backed server cache identifiers that maintain dashboard continuity across page loads.',
        ar: 'ملفات تعريف الارتباط هذه ضرورية لتشغيل المنصة بشكل صحيح. تُمكّن الميزات الأساسية مثل التحقق الآمن من هوية المستخدم (عبر Clerk)، ومعالجة المدفوعات (عبر Stripe)، وإدارة حالة الجلسة. بدون ملفات تعريف الارتباط هذه، لا يمكن تقديم الخدمات التي طلبتها — مثل تسجيل الدخول إلى لوحة التحكم أو إتمام عملية شراء. لا تتتبع هذه الملفات نشاط التصفح على مواقع الطرف الثالث ولا تتطلب موافقة مسبقة، رغم أنها تخضع لهذه السياسة. تشمل التقنيات المحددة: رموز جلسة Clerk للمصادقة، وملفات جلسة الدفع من Stripe، ومعرفات ذاكرة التخزين المؤقت المدعومة من Redis التي تحافظ على استمرارية لوحة التحكم أثناء التنقل بين الصفحات.'
      }
    },
    {
      title: { en: 'Performance & Analytics Cookies', ar: 'ملفات أداء وتحليلات' },
      body: {
        en: 'We deploy analytics cookies to collect aggregated information about how visitors interact with the Platform. This includes pages visited, time spent on each page, error rates, and feature usage patterns. The data is anonymised and used exclusively to improve performance, identify bugs, and prioritise product development. We use first-party analytics instrumentation and may engage third-party services that place their own cookies for this purpose. These services are contractually prohibited from using the data for their own advertising or profiling. You may opt out of analytics cookies at any time; doing so will not affect access to the core functionality of the Platform.',
        ar: 'نستخدم ملفات تحليلات لجمع معلومات مجمعة حول كيفية تفاعل الزوار مع المنصة. يشمل ذلك الصفحات التي تمت زيارتها، والوقت المستغرق في كل صفحة، ومعدلات الأخطاء، وأنماط استخدام الميزات. يتم إخفاء هوية البيانات واستخدامها حصرياً لتحسين الأداء وتحديد الأخطاء وتحديد أولويات تطوير المنتج. نستخدم أدوات تحليلية داخلية وقد نستعين بخدمات طرف ثالث تضع ملفات تعريف الارتباط الخاصة بها لهذا الغرض. هذه الخدمات ملزمة تعاقدياً بعدم استخدام البيانات لأغراض الإعلان أو التوصيف الخاصة بها. يمكنك إلغاء الاشتراك في ملفات التحليلات في أي وقت؛ ولن يؤثر ذلك على الوصول إلى الوظائف الأساسية للمنصة.'
      }
    },
    {
      title: { en: 'Functional & Preference Cookies', ar: 'ملفات الوظائف والتفضيلات' },
      body: {
        en: 'These cookies allow the Platform to remember choices you make — such as your preferred language (Arabic or English), text direction (RTL or LTR), and any customised dashboard layouts — to deliver a more personalised experience. They may also store the state of interface elements like collapsed menus or dismissed banners so that we do not show you repeated notifications on every visit. The information these cookies collect is usually anonymised and does not track your browsing activity on other websites. Disabling these cookies may result in less personalised navigation and the loss of saved preferences between sessions.',
        ar: 'تسمح لك ملفات تعريف الارتباط هذه بتذكر الخيارات التي تقوم بها — مثل لغتك المفضلة (العربية أو الإنجليزية)، واتجاه النص (من اليمين إلى اليسار أو من اليسار إلى اليمين)، وتخطيطات لوحة التحكم المخصصة — لتقديم تجربة أكثر تخصيصاً. قد تخزن أيضاً حالة عناصر الواجهة مثل القوائم المطوية أو اللافتات التي تم إغلاقها حتى لا نعرض لك إشعارات متكررة في كل زيارة. المعلومات التي تجمعها ملفات تعريف الارتباط هذه عادة ما تكون مجهولة المصدر ولا تتتبع نشاط التصفح الخاص بك على مواقع الويب الأخرى. قد يؤدي تعطيل هذه الملفات إلى تجربة تصفح أقل تخصيصاً وفقدان التفضيلات المحفوظة بين الجلسات.'
      }
    },
    {
      title: { en: 'Managing Browser Cookie Controls', ar: 'إدارة ضوابط ملفات تعريف الارتباط في المتصفح' },
      body: {
        en: 'Most web browsers allow you to control cookies through their settings preferences. You may set your browser to block all cookies, delete cookies after each session, or notify you when a cookie is set. For detailed instructions, refer to your browser\'s help documentation: Chrome (Settings > Privacy and Security > Cookies and other site data), Firefox (Preferences > Privacy & Security > Cookies and Site Data), Safari (Preferences > Privacy > Cookies), and Edge (Settings > Cookies and site permissions). Please note that restricting or disabling cookies may impair the functionality of the Platform, particularly authentication and payment-related features.',
        ar: 'تسمح معظم متصفحات الويب بالتحكم في ملفات تعريف الارتباط من خلال إعدادات التفضيلات. يمكنك ضبط المتصفح لحظر جميع ملفات تعريف الارتباط، أو حذفها بعد كل جلسة، أو إعلامك عند تعيين ملف تعريف ارتباط. للاطلاع على التعليمات التفصيلية، راجع وثائق المساعدة الخاصة بالمتصفح: كروم (الإعدادات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات المواقع الأخرى)، فايرفوكس (التفضيلات > الخصوصية والأمان > ملفات تعريف الارتباط وبيانات المواقع)، سفاري (التفضيلات > الخصوصية > ملفات تعريف الارتباط)، وإيدج (الإعدادات > ملفات تعريف الارتباط وأذونات المواقع). يُرجى ملاحظة أن تقييد أو تعطيل ملفات تعريف الارتباط قد يؤثر على وظائف المنصة، خاصة الميزات المتعلقة بالمصادقة والدفع.'
      }
    },
    {
      title: { en: 'Compliance & Updates', ar: 'الامتثال والتحديثات' },
      body: {
        en: 'This Cookie Policy is maintained in alignment with applicable data protection regulations, including but not limited to the General Data Protection Regulation (GDPR) and the ePrivacy Directive. We review and update this policy periodically to reflect changes in our technology, services, and legal obligations. The "Last Updated" date at the top of this page indicates the most recent revision. Material changes will be communicated via a notice on the Platform or by email. Continued use of the Platform after a revision constitutes acceptance of the updated policy. For questions or requests related to cookies and data processing, contact us at privacy@saqynrabt.com.',
        ar: 'هذه السياسة متوافقة مع لوائح حماية البيانات المعمول بها، بما في ذلك على سبيل المثال لا الحصر اللائحة العامة لحماية البيانات (GDPR) وتوجيه الخصوصية الإلكترونية. نقوم بمراجعة وتحديث هذه السياسة بشكل دوري لتعكس التغييرات في تقنيتنا وخدماتنا والتزاماتنا القانونية. تاريخ "آخر تحديث" في أعلى هذه الصفحة يشير إلى أحدث مراجعة. سيتم الإبلاغ عن التغييرات الجوهرية عبر إشعار على المنصة أو عبر البريد الإلكتروني. الاستمرار في استخدام المنصة بعد المراجعة يعتبر قبولاً للسياسة المحدثة. للأسئلة أو الطلبات المتعلقة بملفات تعريف الارتباط ومعالجة البيانات، اتصل بنا على privacy@saqynrabt.com.'
      }
    }
  ]
};

export default function CookiePolicyPage() {
  return <MinimalPage eyebrow={content.eyebrow} title={content.title} description={content.description} sections={content.sections} />;
}
