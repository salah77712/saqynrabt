'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { useLocale } from '../../providers';

export default function DashboardAutomationError({
error,
reset,
}: {
error: Error & { digest?: string };
reset: () => void;
}) {
useEffect(() => { console.error(error); }, [error]);

const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

return (
<div className="flex items-center justify-center py-20">
<div className="text-center max-w-md">
<div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8F9FB]"><AlertTriangle className="w-6 h-6 text-[#141F33]" /></div>
<h2 className="text-2xl font-bold text-primary mb-2">{t({ en: 'Queue didn\'t load', ar: 'قائمة الانتظار غير متوفرة' })}</h2>
<p className="text-[#141F33] mb-2">{t({ en: 'We had trouble fetching the guest queue.', ar: 'يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.' })}</p>
<p className="text-sm text-[#141F33] mb-8">{t({ en: 'New requests are still being accepted. Hit try again to refresh.', ar: 'يرجى المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.' })}</p>
<div className="flex flex-col sm:flex-row gap-4 justify-center">
<button onClick={() => reset()} className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-[#F8F9FB] hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2">{t({ en: 'Try again', ar: 'حاول مرة أخرى' })}</button>
<a href="/dashboard" className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#141F33]/10 px-6 py-3 text-sm font-semibold text-primary hover:bg-[#141F33] transition-all">{t({ en: 'Back to Dashboard', ar: 'العودة إلى لوحة التحكم' })}</a>
</div>
</div>
</div>
);
}