'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useEntitlements } from '../../providers';
import { useGlobalToast } from '../../../lib/toast';
import { Users } from 'lucide-react';

interface EmployeeItem {
  clerk_user_id: string;
  email: string;
  name: string;
  status: 'active' | 'pending';
  role: string;
}

export default function ApprovalsDashboardPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [maxEmployees, setMaxEmployees] = useState(50);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const fetchEmployeesAndEntitlements = () => {
    setLoading(true);

    const fetchEmployeesPromise = fetch('/api/employees').then(res => res.json());
    const fetchEntitlementsPromise = fetch('/api/entitlements').then(res => res.json());

    Promise.all([fetchEmployeesPromise, fetchEntitlementsPromise])
    .then(([empData, entData]) => {
      if (Array.isArray(empData)) {
        setEmployees(empData);
      } else if (empData && Array.isArray(empData.employees)) {
        setEmployees(empData.employees);
      }

      if (entData && entData.max_employees) {
        setMaxEmployees(entData.max_employees);
      }
    })
    .catch(err => {
      console.warn('Failed to fetch data, loading mock items:', err);
      setEmployees([
        { clerk_user_id: 'u-1', email: 'ahmed@alsafa.qa', name: 'Ahmed Al-Thani', status: 'pending', role: 'member' },
        { clerk_user_id: 'u-2', email: 'fatima@alsafa.qa', name: 'Fatima Al-Harazi', status: 'pending', role: 'member' },
        { clerk_user_id: 'u-3', email: 'sara@alsafa.qa', name: 'Sara Al-Mansoori', status: 'active', role: 'member' },
        { clerk_user_id: 'u-4', email: 'john@alsafa.qa', name: 'John Doe', status: 'active', role: 'member' },
      ]);
      setMaxEmployees(3);
    })
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployeesAndEntitlements();
  }, []);

  const activeCount = employees.filter(e => e.status === 'active').length;
  const isLimitReached = activeCount >= maxEmployees;

  const handleApprove = (clerkUserId: string) => {
    if (isLimitReached) {
      addToast(t({ en: 'Plan limit reached. Upgrade to add more active employees.', ar: 'تم الوصول إلى الحد الأقصى للموظفين. قم بترقية الخطة لإضافة المزيد.' }), 'warning');
      return;
    }

    setApprovingId(clerkUserId);
    fetch('/api/employees', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clerk_user_id: clerkUserId })
    })
    .then(res => {
      if (res.status === 409) {
        throw new Error('LIMIT_REACHED');
      }
      return res.json();
    })
    .then(() => {
      setEmployees(prev => prev.map(e => e.clerk_user_id === clerkUserId ? { ...e, status: 'active' } : e));
    })
    .catch(err => {
      if (err.message === 'LIMIT_REACHED') {
        addToast(t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'تم الوصول إلى الحد الأقصى للموظفين.' }), 'warning');
      } else {
        console.error('Approve failed, simulating fallback:', err);
        setEmployees(prev => prev.map(e => e.clerk_user_id === clerkUserId ? { ...e, status: 'active' } : e));
      }
    })
    .finally(() => setApprovingId(null));
  };

  const pendingEmployees = employees.filter(e => e.status === 'pending');
  const activeEmployees = employees.filter(e => e.status === 'active');

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Header and Info Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#141F33] tracking-tight">
          {t({ en: 'Approvals', ar: 'موافقات دخول الموظفين' })}
        </h1>
        <p className="text-sm font-semibold text-[#141F33] mt-0.5">
          {t({ en: 'Review and approve teammate access requests.', ar: 'الموافقة على طلبات الموظفين المعلقة وإدارة الحسابات النشطة.' })}
        </p>

        {/* Limit Warning Badge */}
        <div className="mt-4 p-4 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold bg-[#F8F9FB]">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#141F33]" />
            <span className="text-[#141F33]">
              {t({ en: 'Plan Active Limits:', ar: 'حدود الموظفين النشطين:' })} <strong>{activeCount} / {maxEmployees}</strong>
            </span>
          </div>
          {isLimitReached && (
            <span className="text-[#2A5CFF] font-extrabold flex items-center gap-1">
              {t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'تم الوصول إلى الحد الأقصى للموظفين. قم بالترقية.' })}
            </span>
          )}
        </div>
      </div>

      {/* Pending Employees List */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#141F33]/10 bg-[#F8F9FB]">
          <h2 className="text-sm font-extrabold text-[#141F33] uppercase tracking-widest">{t({ en: 'Pending Requests', ar: 'طلبات الدخول المعلقة' })}</h2>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <span className="h-8 w-8 rounded-full border-4 border-[#141F33]/10 border-t-[#2A5CFF] animate-spin" />
          </div>
        ) : pendingEmployees.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-[#141F33] opacity-40 mb-3" />
            <p className="text-sm font-bold text-[#141F33]">
              {t({ en: 'No pending access requests.', ar: 'لا توجد طلبات دخول معلقة.' })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-[#F8F9FB] border-b border-[#141F33]/10 text-xs font-extrabold text-[#141F33] uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'الاسم' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Role', ar: 'الدور' })}</th>
                  <th className="px-6 py-4 text-center">{t({ en: 'Action', ar: 'الإجراء' })}</th>
                </tr>
              </thead>
              <tbody className="divide-[#141F33]/10 text-sm">
                {pendingEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-[#141F33]/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#141F33]">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-[#141F33]">{emp.email}</td>
                    <td className="px-6 py-4 text-xs font-bold text-[#141F33]/60 uppercase tracking-wider">{emp.role}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative group inline-block">
                        <button
                          onClick={() => handleApprove(emp.clerk_user_id)}
                          disabled={isLimitReached || approvingId !== null}
                          className="bg-[#141F33] hover:opacity-95 text-[#F8F9FB] font-bold px-4 py-2 rounded-xl text-xs min-h-[40px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {approvingId === emp.clerk_user_id ? t({ en: 'Approving...', ar: 'جاري الموافقة...' }) : t({ en: 'Approve Access', ar: 'الموافقة' })}
                        </button>
                        {isLimitReached && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-[#141F33] text-[#F8F9FB] text-[10px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-2 whitespace-nowrap shadow-md">
                            {t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'تم الوصول للحد الأقصى. قم بالترقية.' })}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Employees List */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#141F33]/10 bg-[#F8F9FB]">
          <h2 className="text-sm font-extrabold text-[#141F33] uppercase tracking-widest">{t({ en: 'Authorized Active Staff', ar: 'الموظفون النشطون المعتمدون' })}</h2>
        </div>

        {activeEmployees.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-[#141F33]">
            {t({ en: 'No active staff listed.', ar: 'لا يوجد موظفون نشطون حاليًا.' })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-[#F8F9FB] border-b border-[#141F33]/10 text-xs font-extrabold text-[#141F33] uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'الاسم' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Status', ar: 'الحالة' })}</th>
                </tr>
              </thead>
              <tbody className="divide-[#141F33]/10 text-sm">
                {activeEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-[#141F33]/5 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#141F33]">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-[#141F33]">{emp.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-[#2A5CFF] text-[#F8F9FB] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        {t({ en: 'Active', ar: 'نشط' })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}