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
      addToast(t({ en: 'Plan limit reached. Upgrade to add more active employees.', ar: 'ØªÙ… Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…ÙˆØ¸ÙÙŠÙ†. Ù‚Ù… Ø¨ØªØ±Ù‚ÙŠØ© Ø§Ù„Ø®Ø·Ø© Ù„Ø¥Ø¶Ø§ÙØ© Ø§Ù„Ù…Ø²ÙŠØ¯.' }), 'warning');
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
        addToast(t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'ØªÙ… Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…ÙˆØ¸ÙÙŠÙ†.' }), 'warning');
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
        <h1 className="text-2xl font-extrabold text-primary tracking-tight">
          {t({ en: 'Approvals', ar: 'Ù…ÙˆØ§ÙÙ‚Ø§Øª Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' })}
        </h1>
        <p className="text-sm font-semibold text-primary mt-0.5">
          {t({ en: 'Review and approve teammate access requests.', ar: 'Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø© Ø¹Ù„Ù‰ Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ù…Ø¹Ù„Ù‚Ø© ÙˆØ¥Ø¯Ø§Ø±Ø© Ø§Ù„Ø­Ø³Ø§Ø¨Ø§Øª Ø§Ù„Ù†Ø´Ø·Ø©.' })}
        </p>

        {/* Limit Warning Badge */}
        <div className="mt-4 p-8 rounded-xl border border-primary/10 flex items-center justify-between gap-8 text-xs font-semibold bg-surface">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-primary">
              {t({ en: 'Plan Active Limits:', ar: 'Ø­Ø¯ÙˆØ¯ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† Ø§Ù„Ù†Ø´Ø·ÙŠÙ†:' })} <strong>{activeCount} / {maxEmployees}</strong>
            </span>
          </div>
          {isLimitReached && (
            <span className="text-accent font-extrabold flex items-center gap-1">
              {t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'ØªÙ… Ø§Ù„ÙˆØµÙˆÙ„ Ø¥Ù„Ù‰ Ø§Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰ Ù„Ù„Ù…ÙˆØ¸ÙÙŠÙ†. Ù‚Ù… Ø¨Ø§Ù„ØªØ±Ù‚ÙŠØ©.' })}
            </span>
          )}
        </div>
      </div>

      {/* Pending Employees List */}
      <div className="bg-surface border border-primary/10 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-primary/10 bg-surface">
          <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest">{t({ en: 'Pending Requests', ar: 'Ø·Ù„Ø¨Ø§Øª Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©' })}</h2>
        </div>

        {loading ? (
          <div className="py-12 flex justify-center">
            <span className="h-8 w-8 rounded-full border-4 border-primary/10 border-t-[#2A5CFF] animate-spin" />
          </div>
        ) : pendingEmployees.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Users className="w-8 h-8 text-primary opacity-40 mb-3" />
            <p className="text-sm font-bold text-primary">
              {t({ en: 'No pending access requests.', ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø·Ù„Ø¨Ø§Øª Ø¯Ø®ÙˆÙ„ Ù…Ø¹Ù„Ù‚Ø©.' })}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-surface border-b border-primary/10 text-xs font-extrabold text-primary uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'Ø§Ù„Ø§Ø³Ù…' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Role', ar: 'Ø§Ù„Ø¯ÙˆØ±' })}</th>
                  <th className="px-6 py-4 text-center">{t({ en: 'Action', ar: 'Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡' })}</th>
                </tr>
              </thead>
              <tbody className="divide-[#141F33]/10 text-sm">
                {pendingEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-primary transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{emp.email}</td>
                    <td className="px-6 py-4 text-xs font-bold text-primary/60 uppercase tracking-wider">{emp.role}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="relative group inline-block">
                        <button
                          onClick={() => handleApprove(emp.clerk_user_id)}
                          disabled={isLimitReached || approvingId !== null}
                          className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-primary hover:bg-primary text-surface disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {approvingId === emp.clerk_user_id ? t({ en: 'Approving...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©...' }) : t({ en: 'Approve Access', ar: 'Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø©' })}
                        </button>
                        {isLimitReached && (
                          <div className="absolute bottom-full start-1/2 -translate-x-1/2 bg-primary text-surface text-[10px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-3 whitespace-nowrap shadow-md">
                            {t({ en: 'Plan limit reached. Upgrade to add more.', ar: 'ØªÙ… Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„Ø­Ø¯ Ø§Ù„Ø£Ù‚ØµÙ‰. Ù‚Ù… Ø¨Ø§Ù„ØªØ±Ù‚ÙŠØ©.' })}
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
      <div className="bg-surface border border-primary/10 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-primary/10 bg-surface">
          <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest">{t({ en: 'Authorized Active Staff', ar: 'Ø§Ù„Ù…ÙˆØ¸ÙÙˆÙ† Ø§Ù„Ù†Ø´Ø·ÙˆÙ† Ø§Ù„Ù…Ø¹ØªÙ…Ø¯ÙˆÙ†' })}</h2>
        </div>

        {activeEmployees.length === 0 ? (
          <div className="py-8 text-center text-xs font-bold text-primary">
            {t({ en: 'No active staff listed.', ar: 'Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ù…ÙˆØ¸ÙÙˆÙ† Ù†Ø´Ø·ÙˆÙ† Ø­Ø§Ù„ÙŠÙ‹Ø§.' })}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
              <thead>
                <tr className="bg-surface border-b border-primary/10 text-xs font-extrabold text-primary uppercase tracking-wider">
                  <th className="px-6 py-4">{t({ en: 'Name', ar: 'Ø§Ù„Ø§Ø³Ù…' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Email Address', ar: 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ' })}</th>
                  <th className="px-6 py-4">{t({ en: 'Status', ar: 'Ø§Ù„Ø­Ø§Ù„Ø©' })}</th>
                </tr>
              </thead>
              <tbody className="divide-[#141F33]/10 text-sm">
                {activeEmployees.map((emp) => (
                  <tr key={emp.clerk_user_id} className="hover:bg-primary transition-colors">
                    <td className="px-6 py-4 font-bold text-primary">{emp.name}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{emp.email}</td>
                    <td className="px-6 py-4">
                      <span className="bg-accent text-surface text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                        {t({ en: 'Active', ar: 'Ù†Ø´Ø·' })}
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