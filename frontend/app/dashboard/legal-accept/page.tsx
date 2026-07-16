'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from '../../providers';

function ShieldSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function CheckCircleSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
function AlertTriangleSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function LoaderSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="animate-spin"
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}

interface AcceptanceStatus {
tos: { accepted: boolean; acceptedAt: string | null; currentVersion: string | null; needsAccept: boolean };
dpa: { accepted: boolean; acceptedAt: string | null; currentVersion: string | null; needsAccept: boolean };
}

export default function LegalAcceptPage() {
const { locale } = useLocale();
const router = useRouter();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [status, setStatus] = useState<AcceptanceStatus | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');
const [tosChecked, setTosChecked] = useState(false);
const [dpaChecked, setDpaChecked] = useState(false);
const [submitting, setSubmitting] = useState(false);
const [accepted, setAccepted] = useState(false);

useEffect(() => {
checkStatus();
}, []);

const checkStatus = async () => {
try {
const token = await window.Clerk?.session?.getToken();
const res = await fetch('/api/legal/check-acceptance', {
headers: { Authorization: `Bearer ${token}` },
});
if (!res.ok) throw new Error('Failed to check status');
const data = await res.json();
setStatus(data);

if (!data.tos.needsAccept && !data.dpa.needsAccept) {
setAccepted(true);
}
} catch (err: any) {
setError(err.message);
} finally {
setLoading(false);
}
};

const handleAccept = async () => {
setSubmitting(true);
setError('');
try {
const token = await window.Clerk?.session?.getToken();

if (status?.tos.needsAccept) {
const tosRes = await fetch('/api/legal/accept', {
method: 'POST',
headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
body: JSON.stringify({ documentType: 'tos', versionHash: status.tos.currentVersion }),
});
if (!tosRes.ok) {
const err = await tosRes.json();
throw new Error(err.error || 'TOS acceptance failed');
}
}

if (status?.dpa.needsAccept) {
const dpaRes = await fetch('/api/legal/accept', {
method: 'POST',
headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
body: JSON.stringify({ documentType: 'dpa', versionHash: status.dpa.currentVersion }),
});
if (!dpaRes.ok) {
const err = await dpaRes.json();
throw new Error(err.error || 'DPA acceptance failed');
}
}

setAccepted(true);
setTimeout(() => router.push('/dashboard'), 1500);
} catch (err: any) {
setError(err.message);
} finally {
setSubmitting(false);
}
};

if (loading) {
return (
<div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
<LoaderSvg />
</div>
);
}

if (accepted) {
return (
<div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-8">
<div className="max-w-md text-center">
<CheckCircleSvg />
<h1 className="mt-4 text-xl font-bold text-[#141F33]">
{t({ en: 'All Legal Terms Accepted', ar: 'تم قبول جميع الشروط القانونية' })}
</h1>
<p className="mt-3 text-sm text-[#141F33]">
{t({
en: 'Redirecting you to the dashboard...',
ar: 'جاري إعادة توجيهك إلى لوحة التحكم...',
})}
</p>
</div>
</div>
);
}

const needsAccept = status?.tos.needsAccept || status?.dpa.needsAccept;

if (!needsAccept) {
router.push('/dashboard');
return null;
}

return (
<div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-8 animate-fadeIn" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<div className="max-w-lg w-full bg-[#F8F9FB] rounded-xl shadow-xl p-8">
<div className="flex items-center gap-4 mb-6">
<ShieldSvg />
<div>
<h1 className="text-lg font-bold text-[#141F33]">
{t({ en: 'Acceptance of Legal Terms', ar: 'قبول الشروط القانونية' })}
</h1>
<p className="text-xs text-[#141F33]">
{t({
en: 'Under Qatari Law No. 8 of 2019, you must accept these terms to continue.',
ar: 'بموجب قانون قطر رقم 8 لسنة 2019، يجب عليك قبول هذه الشروط للمتابعة.',
})}
</p>
</div>
</div>

<div className="gap-8">
{status?.tos.needsAccept && (
<label className="flex items-start gap-4 p-4 rounded-xl border border-[#141F33]/10 hover:border-[#141F33]/30 cursor-pointer transition-colors">
<input
type="checkbox"
checked={tosChecked}
onChange={(e) => setTosChecked(e.target.checked)}
className="mt-0.5 accent-[#141F33]"
/>
<div>
<p className="text-sm font-bold text-[#141F33]">
{t({ en: 'Terms of Service', ar: 'شروط الخدمة' })}
</p>
<p className="text-xs text-[#141F33] mt-1">
{t({
en: 'I have read and agree to the Terms of Service.',
ar: 'لقد قرأت وأوافق على شروط الخدمة.',
})}
</p>
<Link
href="/terms-and-conditions"
target="_blank"
className="text-xs font-bold text-[#2A5CFF] hover:underline mt-1 inline-block"
>
{t({ en: 'Read Full Terms \u2192', ar: 'اقرأ الشروط كاملة \u2190' })}
</Link>
</div>
</label>
)}

{status?.dpa.needsAccept && (
<label className="flex items-start gap-4 p-4 rounded-xl border border-[#141F33]/10 hover:border-[#141F33]/30 cursor-pointer transition-colors">
<input
type="checkbox"
checked={dpaChecked}
onChange={(e) => setDpaChecked(e.target.checked)}
className="mt-0.5 accent-[#141F33]"
/>
<div>
<p className="text-sm font-bold text-[#141F33]">
{t({ en: 'Data Processing Agreement (DPA)', ar: 'اتفاقية معالجة البيانات' })}
</p>
<p className="text-xs text-[#141F33] mt-1">
{t({
en: 'I have read and agree to the Data Processing Agreement.',
ar: 'لقد قرأت وأوافق على اتفاقية معالجة البيانات.',
})}
</p>
<Link
href="/terms-and-conditions"
target="_blank"
className="text-xs font-bold text-[#2A5CFF] hover:underline mt-1 inline-block"
>
{t({ en: 'Read Full DPA \u2192', ar: 'اقرأ الاتفاقية كاملة \u2190' })}
</Link>
</div>
</label>
)}
</div>

{error && (
<div className="mt-4 flex items-start gap-3 text-[#141F33] text-xs bg-[#F8F9FB] border border-[#141F33]/10 p-3 rounded-xl">
<AlertTriangleSvg />
<p>{error}</p>
</div>
)}

<button
type="button"
onClick={handleAccept}
disabled={!tosChecked || !dpaChecked || submitting}
className="mt-6 w-full py-3 px-6 min-h-[44px] rounded-xl bg-[#141F33] text-[#F8F9FB] text-xs font-bold hover:bg-[#141F33] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-3"
>
{submitting ? (
<>
<LoaderSvg />
{t({ en: 'Submitting...', ar: 'جاري الإرسال...' })}
</>
) : (
t({ en: 'Accept & Continue', ar: 'قبول والمتابعة' })
)}
</button>

<p className="mt-3 text-xs text-[#141F33] text-center">
{t({
en: 'By clicking "Accept & Continue", you electronically sign these documents. Your acceptance is recorded with your IP address and user agent for audit purposes.',
ar: 'بالنقر على "قبول والمتابعة"، فإنك توقع إلكترونياً على هذه المستندات. يتم تسجيل قبولك مع عنوان IP الخاص بك ووكيل المستخدم لأغراض التدقيق.',
})}
</p>
</div>
</div>
);
}