'use client';

import React from 'react';
import { useLocale } from '../app/providers';

interface EmployeeNode {
name: string;
role: string;
reports?: EmployeeNode[];
}

export function OrgChart() {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const orgTree: EmployeeNode = {
name: 'Sarah Al-Thani',
role: t('Operations Director', 'Ù…Ø¯ÙŠØ± Ø§Ù„Ø¹Ù…Ù„ÙŠØ§Øª'),
reports: [
{
  name: 'Fahad Rashid',
  role: t('Hospitality Manager', 'Ù…Ø¯ÙŠØ± Ù‚Ø³Ù… Ø§Ù„Ø¶ÙŠØ§ÙØ©'),
  reports: [
  { name: 'John Doe', role: t('Front Desk Associate', 'Ù…ÙˆØ¸Ù Ø§Ø³ØªÙ‚Ø¨Ø§Ù„') },
  { name: 'Jane Smith', role: t('Guest Relations Coordinator', 'Ù…Ù†Ø³Ù‚ Ø¹Ù„Ø§Ù‚Ø§Øª Ø§Ù„Ù†Ø²Ù„Ø§Ø¡') },
  ],
},
{
  name: 'Amna Jassim',
  role: t('Clinic Coordinator', 'Ù…Ù†Ø³Ù‚ Ø§Ù„Ø¹ÙŠØ§Ø¯Ø©'),
},
],
};

const renderNode = (node: EmployeeNode) => {
return (
<div key={node.name} className="flex flex-col items-center mt-4">
<div className="bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl p-4 shadow-sm w-48 text-center">
<p className="text-xs font-bold text-primary dark:text-surface">{node.name}</p>
<p className="text-[10px] text-primary/60 dark:text-surface/60 font-bold mt-1 uppercase tracking-wider">{node.role}</p>
</div>
{node.reports && node.reports.length > 0 && (
<div className="flex gap-8 mt-4 relative">
{node.reports.map((child) => renderNode(child))}
</div>
)}
</div>
);
};

return (
<div className="bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl p-8 overflow-x-auto w-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<h3 className="text-base font-bold text-primary dark:text-surface mb-1 text-center">
{t('Organizational Reporting Tree', 'Ø´Ø¬Ø±Ø© Ø§Ù„Ù‡ÙŠÙƒÙ„ Ø§Ù„ØªÙ†Ø¸ÙŠÙ…ÙŠ Ù„Ù„Ù…ÙˆØ¸ÙÙŠÙ†')}
</h3>
<p className="text-[10px] text-primary/60 dark:text-surface/60 font-semibold text-center mb-6">
{t('Visual representation of team hierarchies & supervisor lines.', 'ØªÙ…Ø«ÙŠÙ„ Ù…Ø±Ø¦ÙŠ Ù„Ù„ØªØ³Ù„Ø³Ù„ Ø§Ù„Ù‡Ø±Ù…ÙŠ Ù„Ù„ÙØ±ÙŠÙ‚ ÙˆØ®Ø·ÙˆØ· Ø§Ù„Ø¥Ø´Ø±Ø§Ù.')}
</p>
<div className="flex justify-center">
{renderNode(orgTree)}
</div>
</div>
);
}
