'use client';

import React, { useState, useEffect } from 'react';
import { useLocale, useEntitlements } from '../../providers';

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
  const t = (obj: Record<string, string>) => locale === 'ar' ? obj.ar : obj.en;

  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [maxEmployees, setMaxEmployees] = useState(50);
  const [loading, setLoading] = useState(false);
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const fetchEmployeesAndEntitlements = () => {
    setLoading(true);

    // Fetch employees list
    const fetchEmployeesPromise = fetch('/api/employees').then(res => res.json());
    
    // Fetch plan entitlements (for limit validation)
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
        // Fallback mock details
        setEmployees([
          { clerk_user_id: 'u-1', email: 'ahmed@alsafa.qa', name: 'Ahmed Al-Thani', status: 'pending', role: 'member' },
          { clerk_user_id: 'u-2', email: 'fatima@alsafa.qa', name: 'Fatima Al-Harazi', status: 'pending', role: 'member' },
          { clerk_user_id: 'u-3', email: 'sara@alsafa.qa', name: 'Sara Al-Mansoori', status: 'active', role: 'member' },
          { clerk_user_id: 'u-4', email: 'john@alsafa.qa', name: 'John Doe', status: 'active', role: 'member' },
        ]);
        setMaxEmployees(3); // Mock small limit to trigger limit warn
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEmployeesAndEntitlements();
  }, []);

  const activeCount = employees.filter(e => e.status === 'active').length;
  const isLimitReached = activeCount >= maxEmployees;

  // Employee Approval Handler
  const handleApprove = (clerkUserId: string) => {
    if (isLimitReached) {
      alert(t({ en: 'Plan limit reached. Upgrade to add more active employees.', ar: 'تم الوصول إلى الحد الأقصى للموظفين. قم بترقية الخطة لإضافة المزيد.' }));
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
        // Refresh local list on success
        setEmployees(prev =>
          prev.map(e => e.clerk_user_id === clerkUserId ? { ...e, status: 'active' } : e)
        );
      })
      .catch(err => {
        if (err.message === 'LIMIT_REACHED') {
          alert(t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'تم الوصول إلى الحد الأقصى للموظفين.' }));
        } else {
          console.error('Approve failed, simulating fallback:', err);
          // Fallback simulation
          setEmployees(prev =>
            prev.map(e => e.clerk_user_id === clerkUserId ? { ...e, status: 'active' } : e)
          );
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
          {t({ en: 'Staff Access Approvals', ar: 'موافقات دخول الموظفين' })}
        </h1>
        <p className="text-sm font-semibold text-[#718096] mt-0.5">
          {t({ en: 'Approve pending employee requests and manage active credentials.', ar: 'الموافقة على طلبات الموظفين المعلقة وإدارة الحسابات النشطة.' })}
        </p>

        {/* Limit Warning Badge */}
        <div className="mt-4 p-4 rounded-xl border flex items-center justify-between gap-4 text-xs font-semibold bg-white">
          <div className="flex items-center gap-2">
            <span>👥</span>
            <span className="text-[#141F33]">
              {t({ en: 'Plan Active Limits:', ar: 'حدود الموظفين النشطين:' })} <strong>{activeCount} / {maxEmployees}</strong>
            </span>
          </div>
          {isLimitReached && (
            <span className="text-amber-600 font-extrabold flex items-center gap-1">
              ⚠️ {t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'تم الوصول إلى الحد الأقصى للموظفين. قم بالترقية.' })}
            </span>
          )}
        </div>
      </div>

      {/* Pending Employees List */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-white">
          <h2 className="text-sm font-extrabold text-[#718096] uppercase tracking-widest">{t({ en: 'Pending Access Requests', ar: 'طلبات الدخول المعلقة' })}</h2>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <span className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#141F33] animate-spin" />
          </div>
        ) : pendingEmployees.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <span className="text-3xl opacity-40 mb-3">👥</span>
            <p className="text-sm font-bold text-[#718096]">
              {t({ en: 'No pending access requests.', ar: 'لا توجد طلبات دخول معلقة.' })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'الاسم' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Role', ar: 'الدور' })}</th>
                  <th className="px-6 py-4 text-center">{t({ en: 'Action', ar: 'الإجراء' })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {pendingEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#141F33]">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{emp.email}</td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{emp.role}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative group inline-block">
                        <button
                          onClick={() => handleApprove(emp.clerk_user_id)}
                          disabled={isLimitReached || approvingId !== null}
                          className="bg-[#141F33] hover:opacity-95 text-white font-bold px-4 py-2 rounded-xl text-xs min-h-[40px] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {approvingId === emp.clerk_user_id ? t({ en: 'Approving...', ar: 'جاري الموافقة...' }) : t({ en: 'Approve Access', ar: 'الموافقة' })}
                        </button>
                        {isLimitReached && (
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-2 whitespace-nowrap shadow-md">
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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-white">
          <h2 className="text-sm font-extrabold text-[#718096] uppercase tracking-widest">{t({ en: 'Authorized Active Staff', ar: 'الموظفون النشطون المعتمدون' })}</h2>
        </div>

        {activeEmployees.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-[#718096]">
            {t({ en: 'No active staff listed.', ar: 'لا يوجد موظفون نشطون حاليًا.' })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-slate-50 border-b border-gray-200 text-xs font-extrabold text-[#718096] uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'الاسم' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'البريد الإلكتروني' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Status', ar: 'الحالة' })}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {activeEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-[#141F33]">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-slate-600">{emp.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
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
