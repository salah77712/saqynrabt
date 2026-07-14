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
role: t('Operations Director', 'مدير العمليات'),
reports: [
{
  name: 'Fahad Rashid',
  role: t('Hospitality Manager', 'مدير قسم الضيافة'),
  reports: [
  { name: 'John Doe', role: t('Front Desk Associate', 'موظف استقبال') },
  { name: 'Jane Smith', role: t('Guest Relations Coordinator', 'منسق علاقات النزلاء') },
  ],
},
{
  name: 'Amna Jassim',
  role: t('Clinic Coordinator', 'منسق العيادة'),
},
],
};

const renderNode = (node: EmployeeNode) => {
return (
<div key={node.name} className="flex flex-col items-center mt-4">
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl p-4 shadow-sm w-48 text-center">
<p className="text-xs font-bold text-[#141F33]">{node.name}</p>
<p className="text-[10px] text-[#141F33]/60 font-bold mt-1 uppercase tracking-wider">{node.role}</p>
</div>
{node.reports && node.reports.length > 0 && (
<div className="flex gap-4 mt-4 relative">
{node.reports.map((child) => renderNode(child))}
</div>
)}
</div>
);
};

return (
<div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 overflow-x-auto w-full" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
<h3 className="text-base font-bold text-[#141F33] mb-1 text-center">
{t('Organizational Reporting Tree', 'شجرة الهيكل التنظيمي للموظفين')}
</h3>
<p className="text-[10px] text-[#141F33]/60 font-semibold text-center mb-6">
{t('Visual representation of team hierarchies & supervisor lines.', 'تمثيل مرئي للتسلسل الهرمي للفريق وخطوط الإشراف.')}
</p>
<div className="flex justify-center">
{renderNode(orgTree)}
</div>
</div>
);
}
