'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface CompanyItem {
  id: string;
  name: string;
  plan: string;
  employees: number;
  maxEmployees: number;
  status: 'active' | 'suspended';
  joinDate: string;
}

export default function AdminCompaniesPage() {
  const { locale } = useLocale();

  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState<CompanyItem[]>([]);

  const filtered = companies.filter(c =>
    c.name?.toLowerCase().includes(search?.toLowerCase())
  );

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="space-y-6 animate-fadeIn">

      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Client Workspace Directory', ar: 'دليل مساحات عمل العملاء' })}</h1>
          <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Monitor client limits, suspend services, and manage tenants.', ar: 'مراقبة حدود العملاء، تعليق الخدمات، وإدارة الحسابات.' })}</p>
        </div>

        <div>
          <input
            type="text"
            placeholder={t({ en: 'Search companies...', ar: 'البحث عن الشركات...' })}
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal w-64"
          />
        </div>
      </div>

      {/* Empty State */}
      <div className="bg-surface border border-primary/10 rounded-xl p-12 shadow-sm text-center">
        <p className="text-sm font-bold text-primary/60">{t({ en: 'No tenants yet — we are in pilot phase.', ar: 'لا يوجد عملاء بعد — نحن في المرحلة التجريبية.' })}</p>
        <p className="text-xs text-primary/40 mt-2">{t({ en: 'Tenant companies will appear here once onboarded.', ar: 'ستظهر شركات العملاء هنا بعد التسجيل.' })}</p>
      </div>

    </div>
  );
}
