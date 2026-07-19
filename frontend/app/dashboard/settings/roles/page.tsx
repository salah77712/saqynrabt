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
    { key: 'view_automation', label: t({ en: 'View Call Automation dispatches', ar: 'Ø¹Ø±Ø¶ Ø¹Ù…Ù„ÙŠØ§Øª Ø£ØªÙ…ØªØ© Ø§Ù„Ù…ÙƒØ§Ù„Ù…Ø§Øª' }) },
    { key: 'edit_automation', label: t({ en: 'Assign & change request queues', ar: 'ØªØ¹Ø¯ÙŠÙ„ ÙˆØ¥Ø³Ù†Ø§Ø¯ Ø·Ø§Ø¨ÙˆØ± Ø§Ù„Ø·Ù„Ø¨Ø§Øª' }) },
    { key: 'view_chatbot', label: t({ en: 'Interact with internal knowledge chatbot', ar: 'Ø§Ù„ØªÙØ§Ø¹Ù„ Ù…Ø¹ Ø§Ù„Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ø°ÙƒÙŠ Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ' }) },
    { key: 'edit_chatbot', label: t({ en: 'Manage knowledge gaps & documents', ar: 'Ø¥Ø¯Ø§Ø±Ø© Ø§Ù„ÙØ¬ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ø±ÙÙŠØ© ÙˆØ§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª' }) },
    { key: 'manage_users', label: t({ en: 'Approve & invite staff accounts', ar: 'Ø¯Ø¹ÙˆØ© ÙˆØ¥Ø¯Ø§Ø±Ø© Ø­Ø³Ø§Ø¨Ø§Øª Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†' }) },
    { key: 'view_billing', label: t({ en: 'Access usage settings & billing invoices', ar: 'Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„Ø§Ø³ØªÙ‡Ù„Ø§Ùƒ ÙˆØ§Ù„ÙÙˆØªØ±Ø©' }) },
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
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Roles & Permissions', ar: 'Ø£Ø¯ÙˆØ§Ø± Ø§Ù„ÙØ±ÙŠÙ‚ ÙˆØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ù„Ø¯Ø®ÙˆÙ„' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Control what each team member can see and do.', ar: 'ØªØ­Ø¯ÙŠØ¯ Ø£Ø¯ÙˆØ§Ø± Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ù…Ø®ØµØµØ© ÙˆØªØ¹ÙŠÙŠÙ† ØµÙ„Ø§Ø­ÙŠØ§Øª Ø§Ù„Ù†Ø¸Ø§Ù….' })}</p>
      </div>

      {/* Form Custom Role */}
      <form onSubmit={handleCreate} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Custom Role Title', ar: 'Ù…Ø³Ù…Ù‰ Ø§Ù„Ø¯ÙˆØ± Ø§Ù„Ù…Ø®ØµØµ' })}</label>
          <input
            type="text"
            id="name"
            value={newRole.name}
            onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
            placeholder="E.g. Assistant Operations Manager"
            className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-primary mb-3">{t({ en: 'Grant Permissions', ar: 'Ù…Ù†Ø­ Ø§Ù„ØµÙ„Ø§Ø­ÙŠØ§Øª' })}</label>
          <div className="space-y-2 text-xs font-semibold">
            {availablePermissions.map((perm) => (
              <label key={perm.key} className="flex items-start gap-4 p-3 border border-primary/10 rounded-xl bg-surface cursor-pointer hover:border-primary transition-all">
                <input
                  type="checkbox"
                  checked={newRole.permissions.includes(perm.key)}
                  onChange={() => handleTogglePermission(perm.key)}
                  className="mt-0.5 h-4 w-4 rounded border-primary/20 text-primary focus:ring-2 focus:ring-royal"
                />
                <div>
                  <p className="text-xs font-bold text-primary">{perm.key}</p>
                  <p className="text-[10px] text-primary font-medium mt-0.5">{perm.label}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          {t({ en: 'Create Custom Access Role', ar: 'Ø¥Ù†Ø´Ø§Ø¡ Ø¯ÙˆØ± ÙˆØµÙˆÙ„ Ù…Ø®ØµØµ' })}
        </button>
      </form>

      {/* Roles list */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">{t({ en: 'Configured Access Roles', ar: 'Ø£Ø¯ÙˆØ§Ø± Ø§Ù„ÙˆØµÙˆÙ„ Ø§Ù„Ù…Ù‡ÙŠØ£Ø©' })}</h3>

        <div className="divide-y divide-[#141F33]/10">
          {roles.map((r) => (
            <div key={r.name} className="py-4 first:pt-0 last:pb-0 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-xs font-extrabold text-primary">{r.name}</p>
                <span className="bg-surface text-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {r.userCount} {t({ en: 'members', ar: 'Ø£Ø¹Ø¶Ø§Ø¡' })}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {r.permissions.map((p) => (
                  <span key={p} className="bg-surface text-accent border border-accent/10 font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full">
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


