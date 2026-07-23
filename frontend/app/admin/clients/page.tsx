'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface ClientItem {
id: string;
name: string;
plan: string;
status: 'active' | 'suspended';
healthScore: number;
}

export default function AdminClientsPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [clients, setClients] = useState<ClientItem[]>([]);

return (
<div className="space-y-6 animate-fadeIn">
{/* Header */}
<div className="mb-6">
<h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Global Client Accounts', ar: 'حسابات العملاء الشاملة' })}</h1>
<p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Suspend/enable tenant access.', ar: 'لوحة إدارة موظفي SAQYN. إيقاف وتفعيل صلاحيات وصول العملاء.' })}</p>
</div>

{/* Empty State */}
<div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
<p className="text-sm font-bold text-primary/60">{t({ en: 'No client accounts yet — we are in pilot phase.', ar: 'لا توجد حسابات عملاء بعد — نحن في المرحلة التجريبية.' })}</p>
<p className="text-xs text-primary/40 mt-2">{t({ en: 'Client accounts will appear here once tenants are onboarded.', ar: 'ستظهر حسابات العملاء هنا بعد تسجيل الشركات.' })}</p>
</div>
</div>
);
}
