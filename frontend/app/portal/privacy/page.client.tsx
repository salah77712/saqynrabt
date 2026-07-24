'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';
import { Header } from '../../../components/Header';
import { Footer } from '../../../components/Footer';
import { useGlobalToast } from '../../../lib/toast';

export default function PublicPrivacyPortalPage() {
const { locale } = useLocale();
const { addToast } = useGlobalToast();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [email, setEmail] = useState('');
const [requestType, setRequestType] = useState('access');
const [details, setDetails] = useState('');
const [sending, setSending] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
e.preventDefault();
setSending(true);

setTimeout(() => {
setSending(false);
addToast('DSAR Request submitted successfully! We will process it within 30 days.', 'success');
setEmail('');
setDetails('');
}, 800);
};

return (
<div className="bg-surface text-primary dark:text-surface min-h-screen flex flex-col font-sans">
<Header />

<main className="flex-1 max-w-xl mx-auto py-24 px-6 w-full space-y-8 animate-fadeIn">
{/* Header */}
<div className="text-center">
<span className="text-xs font-extrabold tracking-widest text-accent uppercase">{t({ en: 'Privacy & Sovereignty', ar: 'الخصوصية وسيادة البيانات' })}</span>
<h1 className="text-xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight mt-2">
{t({ en: 'Data Subject Access Request (DSAR)', ar: 'طلب معلومات خصوصية البيانات (DSAR)' })}
</h1>
<p className="text-xs font-semibold text-primary mt-2">
{t({ en: 'Submit queries for access, rectification, or erasure under GDPR guidelines.', ar: 'إرسال طلبات الوصول، التصحيح، أو محو البيانات تحت لوائح GDPR.' })}
</p>
</div>

{/* Form request */}
<form onSubmit={handleSubmit} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm space-y-4">

<div>
<label htmlFor="email" className="block text-xs font-bold text-primary dark:text-surface mb-1.5">{t({ en: 'Your Email Address', ar: 'البريد الإلكتروني الخاص بك' })}</label>
<input
type="email"
id="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="name@company.com"
className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-accent"
required
/>
</div>

<div>
<label htmlFor="type" className="block text-xs font-bold text-primary dark:text-surface mb-1.5">{t({ en: 'Request Type', ar: 'نوع الطلب' })}</label>
<select
id="type"
value={requestType}
onChange={(e) => setRequestType(e.target.value)}
className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-bold text-primary"
>
<option value="access">Access Personal Data</option>
<option value="erasure">Erasure (Forget Me)</option>
<option value="rectification">Rectify Error</option>
</select>
</div>

<div>
<label htmlFor="details" className="block text-xs font-bold text-primary dark:text-surface mb-1.5">{t({ en: 'Request Scope details', ar: 'تفاصيل نطاق الطلب' })}</label>
<textarea
id="details"
value={details}
onChange={(e) => setDetails(e.target.value)}
rows={4}
className="w-full bg-surface border border-primary/10 rounded-xl p-4 text-xs font-semibold text-primary focus:outline-none focus:border-accent resize-none"
placeholder="Provide context details..."
required
/>
</div>

<button
type="submit"
disabled={sending}
className="w-full btn-primary text-xs"
>
{sending ? t({ en: 'Submitting...', ar: 'جاري الإرسال...' }) : t({ en: 'Submit DSAR Request', ar: 'إرسال طلب الخصوصية' })}
</button>

</form>
</main>

<Footer />
</div>
);
}
