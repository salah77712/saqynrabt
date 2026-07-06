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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState<CompanyItem[]>([
    { id: '1', name: 'Al-Safa Hospitality Group', plan: 'Growth (Automation) + Growth (Chatbot)', employees: 23, maxEmployees: 150, status: 'active', joinDate: '2026-06-12' },
    { id: '2', name: 'Doha Clinical Centre', plan: 'Starter (Automation)', employees: 8, maxEmployees: 10, status: 'active', joinDate: '2026-06-20' },
    { id: '3', name: 'Gulf Transport Fleet', plan: 'Pro (Automation)', employees: 42, maxEmployees: 100, status: 'active', joinDate: '2026-06-29' },
    { id: '4', name: 'Qatar Real Estate Co.', plan: 'Enterprise (Chatbot)', employees: 184, maxEmployees: 500, status: 'active', joinDate: '2026-07-01' },
    { id: '5', name: 'Desert Auto Repair', plan: 'Starter (Automation)', employees: 3, maxEmployees: 10, status: 'suspended', joinDate: '2026-07-03' },
  ]);

  const handleSuspend = (id: string) => {
    setCompanies(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'suspended' : 'active' }
          : c
      )
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm(t({ en: 'Are you sure you want to delete this company tenant? This cannot be undone.', ar: 'هل أنت متأكد من حذف هذا العميل بالكامل؟ لا يمكن التراجع عن هذا الإجراء.' }))) {
      return;
    }
    setCompanies(prev => prev.filter(c => c.id !== id));
  };

  const filtered = companies.filter(c =>
    c.name?.toLowerCase().includes(search?.toLowerCase())
  );

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Client Workspace Directory', ar: 'دليل مساحات عمل العملاء' })}</h1>
          <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Monitor client limits, suspend services, and manage tenants.', ar: 'مراقبة حدود العملاء، تعليق الخدمات، وإدارة الحسابات.' })}</p>
        </div>

        <div>
          <input
            type="text"
            placeholder={t({ en: 'Search companies...', ar: 'البحث عن الشركات...' })}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="min-h-[44px] bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33] w-64 shadow-sm"
          />
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="bg-slate-50 border-b border-gray-200 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                <th className="px-6 py-4">{t({ en: 'Company Name', ar: 'اسم الشركة' })}</th>
                <th className="px-6 py-4">{t({ en: 'Plan Tier', ar: 'باقة الاشتراك' })}</th>
                <th className="px-6 py-4 text-center">{t({ en: 'Employees', ar: 'الموظفون' })}</th>
                <th className="px-6 py-4">{t({ en: 'Status', ar: 'الحالة' })}</th>
                <th className="px-6 py-4">{t({ en: 'Join Date', ar: 'تاريخ الانضمام' })}</th>
                <th className="px-6 py-4 text-center">{t({ en: 'Actions', ar: 'الإجراءات' })}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-slate-700">
              {paginated.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-[#141F33]">{company.name}</td>
                  <td className="px-6 py-4">{company.plan}</td>
                  <td className="px-6 py-4 text-center">{company.employees} / {company.maxEmployees}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                      company.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {company.status === 'active' ? t({ en: 'Active', ar: 'نشط' }) : t({ en: 'Suspended', ar: 'معلق' })}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-bold">{company.joinDate}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => alert(`Viewing detailed logs for ${company.name}`)}
                        className="bg-gray-50 border border-gray-200 text-slate-600 hover:text-[#141F33] hover:bg-slate-100 font-bold px-3 py-1.5 rounded-lg text-[10px] min-h-[32px]"
                      >
                        {t({ en: 'View', ar: 'عرض' })}
                      </button>
                      <button
                        onClick={() => handleSuspend(company.id)}
                        className={`font-bold px-3 py-1.5 rounded-lg text-[10px] min-h-[32px] text-white ${
                          company.status === 'active' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'
                        }`}
                      >
                        {company.status === 'active' ? t({ en: 'Suspend', ar: 'تعليق' }) : t({ en: 'Activate', ar: 'تفعيل' })}
                      </button>
                      <button
                        onClick={() => handleDelete(company.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] min-h-[32px]"
                      >
                        {t({ en: 'Delete', ar: 'حذف' })}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-xs font-bold text-[#718096]">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 min-h-[36px] transition-colors disabled:opacity-40"
          >
            {t({ en: 'Previous', ar: 'السابق' })}
          </button>
          <span>
            {t({ en: `Page ${page} of ${totalPages}`, ar: `الصفحة ${page} من ${totalPages}` })}
          </span>
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 min-h-[36px] transition-colors disabled:opacity-40"
          >
            {t({ en: 'Next', ar: 'التالي' })}
          </button>
        </div>
      )}

    </div>
  );
}
