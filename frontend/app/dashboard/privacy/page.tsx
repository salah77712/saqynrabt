'use client';

import { useState } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';

function DownloadSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>; }
function TrashSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>; }
function AlertTriangleSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function CheckCircleSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>; }
function LoaderSvg() { return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>; }

export default function PrivacyDashboardPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [exporting, setExporting] = useState(false);
const [exportDone, setExportDone] = useState(false);
const [exportError, setExportError] = useState('');
const [deletionError, setDeletionError] = useState('');
const [deletionRequested, setDeletionRequested] = useState(false);
const [confirmDelete, setConfirmDelete] = useState(false);
const [deleting, setDeleting] = useState(false);
const [deletionConfirmed, setDeletionConfirmed] = useState(false);

const handleExport = async () => {
setExporting(true);
setExportError('');
try {
const res = await fetch('/api/privacy/export', {
headers: { Authorization: `Bearer ${await window.Clerk?.session?.getToken()}` },
});
if (!res.ok) {
const err = await res.json();
throw new Error(err.error || 'Export failed');
}
const blob = await res.blob();
const url = window.URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = `saqynrabt-data-export-${new Date().toISOString().split('T')[0]}.zip`;
a.click();
window.URL.revokeObjectURL(url);
setExportDone(true);
} catch (err: any) {
setExportError(err.message);
} finally {
setExporting(false);
}
};

const handleDeleteRequest = async () => {
if (!confirmDelete) return;
setDeleting(true);
try {
const res = await fetch('/api/privacy/delete', {
method: 'POST',
headers: {
Authorization: `Bearer ${await window.Clerk?.session?.getToken()}`,
'Content-Type': 'application/json',
},
body: JSON.stringify({ confirm: true }),
});
if (!res.ok) {
const err = await res.json();
throw new Error(err.error || 'Deletion request failed');
}
setDeletionConfirmed(true);
} catch (err: any) {
setDeletionError(err.message);
} finally {
setDeleting(false);
}
};

return (
<div className="space-y-6 max-w-2xl">
<div>
<h1 className="text-xl font-bold text-[#141F33]">
{t({ en: 'Privacy', ar: 'خصوصية البيانات والامتثال' })}
</h1>
<p className="text-sm text-[#718096] mt-1">
{t({
en: 'Manage your personal data rights under Qatari Law No. 13 of 2016.',
ar: 'إدارة حقوق بياناتك الشخصية بموجب قانون قطر رقم 13 لسنة 2016.',
})}
</p>
</div>

<Card className="p-6">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#F8F9FB] flex items-center justify-center shrink-0 text-[#2A5CFF]">
<DownloadSvg />
</div>
<div className="flex-1">
<h2 className="text-sm font-bold text-[#141F33]">
{t({ en: 'Export My Data', ar: 'تصدير بياناتي' })}
</h2>
<p className="text-xs text-[#718096] mt-1">
{t({
en: 'Download all your company data — documents, chat history, and account info — in one archive.',
ar: 'قم بتنزيل أرشيف كامل لبيانات شركتك، بما في ذلك المستندات المرفوعة وسجل المحادثات ومعلومات الحساب.',
})}
</p>

{exportDone ? (
<div className="mt-3 flex items-center gap-2 text-[#2A5CFF] text-xs">
<CheckCircleSvg />
{t({ en: 'Export completed successfully.', ar: 'تم التصدير بنجاح.' })}
</div>
) : (
<Button
variant="default"
className="mt-3"
onClick={handleExport}
disabled={exporting}
>
{exporting ? (
<span className="flex items-center gap-2">
<LoaderSvg />
{t({ en: 'Exporting...', ar: 'جاري التصدير...' })}
</span>
) : (
t({ en: 'Export My Data', ar: 'تصدير بياناتي' })
)}
</Button>
)}

{exportError && (
<p className="mt-2 text-xs text-[#141F33]">{exportError}</p>
)}
</div>
</div>
</Card>

<Card className="p-6 border-[#141F33]/10">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded-xl bg-[#F8F9FB] flex items-center justify-center shrink-0 text-[#141F33]">
<TrashSvg />
</div>
<div className="flex-1">
<h2 className="text-sm font-bold text-[#141F33]">
{t({ en: 'Request Account Deletion', ar: 'طلب حذف الحساب' })}
</h2>
<p className="text-xs text-[#718096] mt-1">
{t({
en: 'Request permanent deletion of your account and all associated data. A 30-day grace period applies under Qatari Civil Code Article 190 before data is permanently erased.',
ar: 'طلب حذف دائم لحسابك وجميع البيانات المرتبطة به. تنطبق فترة سماح مدتها 30 يوماً بموجب المادة 190 من القانون المدني القطري قبل محو البيانات نهائياً.',
})}
</p>

{deletionConfirmed ? (
<div className="mt-3 flex items-start gap-2 text-[#2A5CFF] text-xs bg-[#F8F9FB] border border-[#141F33]/10 p-3 rounded-xl">
<AlertTriangleSvg />
<div>
<p className="font-bold">
{t({ en: 'Deletion Request Submitted', ar: 'تم تقديم طلب الحذف' })}
</p>
<p className="mt-1">
{t({
en: 'Your request has been received. A 30-day grace period is now in effect. Your account will be permanently deleted after this period unless you cancel the request.',
ar: 'تم استلام طلبك. فترة سماح مدتها 30 يوماً سارية الآن. سيتم حذف حسابك نهائياً بعد هذه الفترة ما لم تلغي الطلب.',
})}
</p>
</div>
</div>
) : deletionRequested ? (
<div className="mt-3 space-y-2">
<label className="flex items-center gap-2 text-xs text-[#718096]">
<input
type="checkbox"
checked={confirmDelete}
onChange={(e) => setConfirmDelete(e.target.checked)}
className="accent-[#141F33]"
/>
{t({
en: 'I confirm that I want to delete my account and all associated data. I understand there is a 30-day grace period.',
ar: 'أؤكد أنني أرغب في حذف حسابي وجميع البيانات المرتبطة به. أفهم أن هناك فترة سماح مدتها 30 يوماً.',
})}
</label>
<div className="flex gap-2">
<Button
variant="destructive"
onClick={handleDeleteRequest}
disabled={!confirmDelete || deleting}
>
{deleting ? (
<span className="flex items-center gap-2">
<LoaderSvg />
{t({ en: 'Processing...', ar: 'جاري المعالجة...' })}
</span>
) : (
t({ en: 'Confirm Deletion', ar: 'تأكيد الحذف' })
)}
</Button>
<Button variant="outline" onClick={() => setDeletionRequested(false)}>
{t({ en: 'Cancel', ar: 'إلغاء' })}
</Button>
</div>
</div>
) : (
<Button
variant="outline"
className="mt-3 border-[#141F33]/10 text-[#141F33] hover:bg-[#141F33]/5"
onClick={() => setDeletionRequested(true)}
>
{t({ en: 'Request Account Deletion', ar: 'طلب حذف الحساب' })}
</Button>
)}

{deletionError && (
<p className="mt-2 text-xs text-[#141F33]">{deletionError}</p>
)}
</div>
</div>
</Card>

<div className="text-xs text-[#718096] border-t border-[#141F33]/10 pt-4">
<p>
{t({
en: 'Under Qatari Law No. 13 of 2016, you have the right to access, rectify, and erase your personal data. Requests are processed within 30 days. For assistance, contact dpo@saqynrabt.com.',
ar: 'بموجب قانون قطر رقم 13 لسنة 2016، لديك الحق في الوصول إلى بياناتك الشخصية وتصحيحها ومحوها. تتم معالجة الطلبات في غضون 30 يوماً. للمساعدة، اتصل على dpo@saqynrabt.com.',
})}
</p>
</div>
</div>
);
}