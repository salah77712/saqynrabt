'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useLocale } from '../../providers';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loadingEmployee, setLoadingEmployee] = useState(true);

  useEffect(() => {
    if (!user) return;
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
    fetch('/api/employees')
      .then(res => res.json())
      .then((data: any) => {
        const list = Array.isArray(data) ? data : data?.employees || [];
        const emp = list.find((e: any) => e.clerk_user_id === user.id);
        if (emp) setEmployeeData(emp);
      })
      .catch(() => {})
      .finally(() => setLoadingEmployee(false));
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    try {
      await user.update({ firstName, lastName });
      if (employeeData) {
        await fetch(`/api/employees/${employeeData.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ first_name: firstName, last_name: lastName }),
        });
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <span className="h-8 w-8 rounded-full border-4 border-primary/10 border-t-[#2A5CFF] animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
          {t({ en: 'Profile', ar: 'الملف الشخصي' })}
        </h1>
        <p className="text-sm font-semibold text-primary mt-0.5">
          {t({ en: 'Manage your personal information and preferences.', ar: 'إدارة معلوماتك الشخصية وتفضيلاتك.' })}
        </p>
      </div>

      <div className="bg-surface border border-primary/10 rounded-xl shadow-sm overflow-hidden max-w-2xl">
        <div className="px-6 py-5 border-b border-primary/10 bg-surface flex items-center gap-4">
          <UserCircle className="w-10 h-10 text-primary" />
          <div>
            <h2 className="text-sm font-extrabold text-primary uppercase tracking-widest">
              {t({ en: 'Personal Information', ar: 'المعلومات الشخصية' })}
            </h2>
            <p className="text-xs font-semibold text-primary mt-0.5">
              {t({ en: 'Your email and role are managed by your admin.', ar: 'يتم إدارة بريدك الإلكتروني ودورك بواسطة المسؤول.' })}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
              {t({ en: 'Email', ar: 'البريد الإلكتروني' })}
            </label>
            <input
              type="email"
              value={user?.primaryEmailAddress?.emailAddress || ''}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 text-primary font-semibold text-sm opacity-60 cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {t({ en: 'First Name', ar: 'الاسم الأول' })}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-primary/10 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                placeholder={t({ en: 'Your first name', ar: 'اسمك الأول' })}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {t({ en: 'Last Name', ar: 'اسم العائلة' })}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-primary/10 text-primary font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                placeholder={t({ en: 'Your last name', ar: 'اسم عائلتك' })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-primary uppercase tracking-wider mb-2">
              {t({ en: 'Role', ar: 'الدور' })}
            </label>
            <input
              type="text"
              value={employeeData?.role || userRoleDisplay(user?.publicMetadata?.role as string || 'employee')}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 text-primary font-semibold text-sm opacity-60 cursor-not-allowed"
            />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 bg-primary hover:bg-primary text-surface disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? t({ en: 'Saving...', ar: 'جاري الحفظ...' }) : t({ en: 'Save Changes', ar: 'حفظ التغييرات' })}
            </button>
            {saved && (
              <span className="text-xs font-bold text-green-600">
                {t({ en: 'Profile updated successfully!', ar: 'تم تحديث الملف الشخصي بنجاح!' })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function userRoleDisplay(role: string): string {
  const labels: Record<string, string> = {
    admin: 'Admin / Owner',
    manager: 'Manager',
    employee: 'Team Member',
    viewer: 'Viewer',
  };
  return labels[role] || role;
}
