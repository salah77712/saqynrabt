'use client';

import React, { useState } from 'react';
import { useLocale } from '../../providers';

interface ClientItem {
  id: string;
  name: string;
  plan: string;
  status: 'active' | 'suspended';
  healthScore: number;
}

export default function AdminClientsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [clients, setClients] = useState<ClientItem[]>([
    { id: 'c-1', name: 'Al-Safa Hospitality', plan: 'Enterprise Plus', status: 'active', healthScore: 94 },
    { id: 'c-2', name: 'Al-Rayyan Clinical Clinic', plan: 'Growth Plan', status: 'active', healthScore: 78 },
  ]);

  const handleToggleStatus = (id: string) => {
    setClients(prev =>
      prev.map(c => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'suspended' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl py-12 px-6 mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Global Client Accounts', ar: 'حسابات العملاء الشاملة' })}</h1>
        <p className="text-xs text-[#141F33] font-medium mt-0.5">{t({ en: 'SAQYN staff administrative panel. Suspend/enable tenant access.', ar: 'لوحة إدارة موظفي SAQYN. إيقاف وتفعيل صلاحيات وصول العملاء.' })}</p>
      </div>

      {/* Clients list */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <div className="divide-y divide-[#141F33]/10">
          {clients.map((c) => (
            <div key={c.id} className="py-4 flex justify-between items-center gap-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-xs font-extrabold text-[#141F33]">{c.name}</p>
                <div className="flex gap-2 items-center mt-1">
                  <span className="text-[10px] text-[#141F33] font-bold">{c.plan}</span>
                  <span className="text-[10px] text-[#2A5CFF] font-bold">CHS: {c.healthScore}%</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                  c.status === 'active' ? 'bg-[#F8F9FB] text-[#2A5CFF]' : 'bg-[#F8F9FB] text-[#141F33]'
                }`}>
                  {c.status}
                </span>

                <button
                  onClick={() => handleToggleStatus(c.id)}
                  className={`py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 border ${
                    c.status === 'active' ? 'text-[#141F33] border-[#141F33]/10 hover:bg-[#141F33]/5' : 'text-[#2A5CFF] border-[#141F33]/10 hover:bg-[#141F33]/5'
                  }`}
                >
                  {c.status === 'active' ? 'Suspend' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
