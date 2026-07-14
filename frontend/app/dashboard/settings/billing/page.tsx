'use client';

import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';

function ShieldSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function AlertTriangleSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }

export default function BillingSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-[#141F33]">
          {t({ en: 'Billing & Subscription', ar: 'الفواتير والاشتراك' })}
        </h1>
        <p className="text-sm text-[#718096] mt-1">
          {t({ en: 'Manage your subscription, billing, and cancellation preferences.', ar: 'إدارة اشتراكك وفواتيرك وتفضيلات الإلغاء.' })}
        </p>
      </div>

      <Card className="p-6 border-green-100 bg-green-50/30">
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5"><ShieldSvg /></span>
          <div>
            <h2 className="text-sm font-bold text-green-800">
              {t({ en: '14-Day Trial Period', ar: 'فترة تجربة مدتها 14 يوماً' })}
            </h2>
            <p className="text-xs text-green-700 mt-1 leading-relaxed">
              {t({
                en: 'Under Qatari Law No. 8 of 2019 (Electronic Commerce), you have a 14-day cooling-off period from the date of initial sign-up. During this period, you may cancel and receive a full refund of the first month\'s fee. After 14 days, the standard no-refund policy applies as stated in our Terms of Service.',
                ar: 'بموجب قانون قطر رقم 8 لسنة 2019 (التجارة الإلكترونية)، لديك فترة تهدئة مدتها 14 يوماً من تاريخ التسجيل الأولي. خلال هذه الفترة، يمكنك الإلغاء واسترداد كامل رسوم الشهر الأول. بعد 14 يوماً، تنطبق سياسة عدم الاسترداد القياسية كما هو منصوص عليه في شروط الخدمة الخاصة بنا.',
              })}
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs text-green-700">
              <span className="font-bold">{t({ en: 'Status:', ar: 'الحالة:' })}</span>
              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                {t({ en: 'Active', ar: 'نشط' })}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-start gap-3">
          <span className="shrink-0 mt-0.5"><AlertTriangleSvg /></span>
          <div>
            <h2 className="text-sm font-bold text-[#141F33]">
              {t({ en: 'Cancellation Policy', ar: 'سياسة الإلغاء' })}
            </h2>
            <p className="text-xs text-[#718096] mt-1 leading-relaxed">
              {t({
                en: 'You may cancel your subscription at any time via the dashboard settings. Upon cancellation, the service remains active until the end of the current billing period. No refunds are issued for partial months of service. Setup fees are non-refundable after the onboarding call has taken place.',
                ar: 'يمكنك إلغاء اشتراكك في أي وقت عبر إعدادات لوحة التحكم. عند الإلغاء، تظل الخدمة نشطة حتى نهاية فترة الفوترة الحالية. لا يتم إصدار استرداد للأشهر الجزئية من الخدمة. رسوم الإعداد غير قابلة للاسترداد بعد إجراء مكالمة الإعداد.',
              })}
            </p>
            <Button variant="outline" className="mt-3 border-red-200 text-red-600 hover:bg-red-50">
              {t({ en: 'Cancel Subscription', ar: 'إلغاء الاشتراك' })}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
