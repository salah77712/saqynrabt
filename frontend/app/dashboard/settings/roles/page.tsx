'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';

interface RoleItem {
  name: string;
  permissions: string[];
  userCount: number;
}

export default function RolesSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [roles, setRoles] = useState<RoleItem[]>([
    { name: 'Admin', permissions: ['view_automation', 'edit_automation', 'view_chatbot', 'edit_chatbot', 'manage_users', 'view_billing'], userCount: 1 },
    { name: 'Front Desk Receptionist', permissions: ['view_automation', 'view_chatbot'], userCount: 3 },
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: [] as string[],
  });

  const availablePermissions = [
    { key: 'view_automation', label: t({ en: 'View Call Automation dispatches', ar: 'عرض عمليات أتمتة المكالمات' }) },
    { key: 'edit_automation', label: t({ en: 'Assign & change request queues', ar: 'تعديل وإسناد طابور الطلبات' }) },
    { key: 'view_chatbot', label: t({ en: 'Interact with internal knowledge chatbot', ar: 'التفاعل مع المساعد الذكي الداخلي' }) },
    { key: 'edit_chatbot', label: t({ en: 'Manage knowledge gaps & documents', ar: 'إدارة الفجوات المعرفية والمستندات' }) },
    { key: 'manage_users', label: t({ en: 'Approve & invite staff accounts', ar: 'دعوة وإدارة حسابات الموظفين' }) },
    { key: 'view_billing', label: t({ en: 'Access usage settings & billing invoices', ar: 'الوصول لإعدادات الاستهلاك والفوترة' }) },
  ];

  const handleTogglePermission = (key: string) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(key)
        ? prev.permissions.filter(p => p !== key)
        : [...prev.permissions, key]
    }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.name.trim()) return;

    setRoles(prev => [...prev, { ...newRole, userCount: 0 }]);
    setNewRole({ name: '', permissions: [] });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Roles & Permissions', ar: 'أدوار الفريق وصلاحيات الدخول' })}</h1>
        <p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'Control what each team member can see and do.', ar: 'تحديد أدوار الوصول المخصصة وتعيين صلاحيات النظام.' })}</p>
      </div>

      {/* Form Custom Role */}
      <form onSubmit={handleCreate} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Custom Role Title', ar: 'مسمى الدور المخصص' })}</label>
          <input
            type="text"
            id="name"
            value={newRole.name}
            onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
            placeholder="E.g. Assistant Operations Manager"
            className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#141F33] mb-3">{t({ en: 'Grant Permissions', ar: 'منح الصلاحيات' })}</label>
          <div className="space-y-2 text-xs font-semibold">
            {availablePermissions.map((perm) => (
              <label key={perm.key} className="flex items-start gap-3 p-3 border border-[#141F33]/10 rounded-xl bg-[#F8F9FB] cursor-pointer hover:border-[#141F33] transition-all">
                <input
                  type="checkbox"
                  checked={newRole.permissions.includes(perm.key)}
                  onChange={() => handleTogglePermission(perm.key)}
                  className="mt-0.5 h-4 w-4 rounded border-[#141F33]/20 text-[#141F33] focus:ring-[#141F33]"
                />
                <div>
                  <p className="text-xs font-bold text-[#141F33]">{perm.key}</p>
                  <p className="text-[10px] text-[#141F33] font-medium mt-0.5">{perm.label}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          {t({ en: 'Create Custom Access Role', ar: 'إنشاء دور وصول مخصص' })}
        </button>
      </form>

      {/* Roles list */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-wider mb-4">{t({ en: 'Configured Access Roles', ar: 'أدوار الوصول المهيأة' })}</h3>

        <div className="divide-y divide-[#141F33]/10">
          {roles.map((r) => (
            <div key={r.name} className="py-4 first:pt-0 last:pb-0 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-extrabold text-[#141F33]">{r.name}</p>
                <span className="bg-[#F8F9FB] text-[#141F33] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {r.userCount} {t({ en: 'members', ar: 'أعضاء' })}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.permissions.map((p) => (
                  <span key={p} className="bg-[#F8F9FB] text-[#2A5CFF] border border-[#2A5CFF]/10 font-mono text-[8px] font-extrabold px-2 py-0.5 rounded-full">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}


