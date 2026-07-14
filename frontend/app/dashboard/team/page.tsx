'use client';

import React, { useState, useCallback } from 'react';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../components/ui/Badge';
import { TeamTable } from '../../../components/dashboard/TeamTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { Input } from '../../../components/ui/Input';
import { Skeleton, SkeletonCard, SkeletonTable } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry, EmptyTeamState } from '../../../components/ui/EmptyState';
import { usePendingApprovals } from '../../../hooks/queries/usePendingApprovals';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { useGlobalToast } from '../../../lib/toast';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

export default function TeamDashboardPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;
  const { data, isLoading, isError, error, refetch } = usePendingApprovals();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const pending = data?.pending ?? [];
  const active = data?.active ?? [];

  const handleAction = useCallback(async (id: string, action: 'approve' | 'suspend' | 'toggle-admin', currentRole?: string) => {
    try {
      if (action === 'toggle-admin') {
        const newRole = currentRole === 'admin' ? 'employee' : 'admin';
        const res = await fetch('/api/employees', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clerk_user_id: id, role: newRole }),
        });
        if (!res.ok) {
          const data = await res.json();
          addToast(data.error || 'Failed to update employee role', 'error');
        }
      } else {
        await fetch('/api/approvals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, action }),
        });
      }
      refetch();
    } catch (err) {
      console.error('Action failed:', err);
    }
  }, [refetch]);

  const handleSendInvite = useCallback(async () => {
    if (!inviteName || !inviteEmail) return;

    try {
      await fetch('/api/approvals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'invite', name: inviteName, email: inviteEmail }),
      });
      refetch();
    } catch (err) {
      console.error('Invite failed:', err);
    }

    setInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  }, [inviteName, inviteEmail, refetch]);

  const renderMobileCard = (m: Employee) => (
    <div key={m.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-[#141F33] truncate">{m.name}</h4>
          <p className="text-[11px] text-slate-500 truncate">{m.email}</p>
        </div>
        <Badge variant={m.status === 'active' ? 'success' : 'primary'}>{m.status}</Badge>
      </div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-3">{m.role}</p>
      <div className="flex gap-2">
        {m.status === 'pending' ? (
          <button
            onClick={() => handleAction(m.id, 'approve')}
            className="flex-1 min-h-[44px] rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-xs"
          >
            Approve
          </button>
        ) : (
          <>
            <button
              onClick={() => handleAction(m.id, 'toggle-admin', m.role)}
              className={`flex-1 min-h-[44px] rounded-lg border font-bold text-xs ${
                m.role === 'admin' 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}
            >
              {m.role === 'admin' ? 'Demote' : 'Make Admin'}
            </button>
            <button
              onClick={() => handleAction(m.id, 'suspend')}
              className="flex-1 min-h-[44px] rounded-lg bg-red-50 border border-red-200 text-red-600 font-bold text-xs"
            >
              Suspend
            </button>
          </>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <main id="main-content" className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-slate-800 rounded-lg w-72 mb-2" />
          <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded-lg w-96" />
        </div>
        <SkeletonTable rows={3} />
      </main>
    );
  }

  if (isError) {
    return (
      <EmptyStateWithRetry
        message={error?.message || t('Failed to load team members.', 'فشل تحميل أعضاء الفريق.')}
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <main id="main-content" className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-[#141F33] dark:text-white">
            {t('Team', 'دليل مساحة العمل')}
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 font-bold">
            {t('Invite teammates, manage roles, and approve access requests.', 'إدارة ضوابط الوصول للفريق وتنسيق موافقات الموظفين.')}
          </p>
        </div>
        <Button variant="default" onClick={() => setInviteModalOpen(true)} className="min-h-[44px] text-xs md:text-sm w-full md:w-auto">
          {t('Invite Colleague', 'دعوة زميل')}
        </Button>
      </div>

      <div className="space-y-6">
        {pending.length > 0 ? (
          <div className="space-y-3">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-orange-500">
              {t('Pending Approvals', 'الموافقات المعلقة')} ({pending.length})
            </h3>
            {isMobile ? (
              <div className="space-y-3">{pending.map(renderMobileCard)}</div>
            ) : (
              <TeamTable members={pending} onAction={handleAction} />
            )}
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-orange-500">
              {t('Pending Approvals', 'الموافقات المعلقة')}
            </h3>
            <p className="text-xs text-slate-400">
              {t('No pending approvals.', 'لا توجد موافقات معلقة.')}
            </p>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-navy dark:text-white">
            {t('Active Members', 'الأعضاء النشطون')} ({active.length})
          </h3>
          {active.length === 0 ? (
            <EmptyTeamState onInvite={() => setInviteModalOpen(true)} />
          ) : isMobile ? (
            <div className="space-y-3">{active.map(renderMobileCard)}</div>
          ) : (
            <TeamTable members={active} onAction={handleAction} />
          )}
        </div>
      </div>

      <Dialog open={inviteModalOpen} onOpenChange={(open) => !open && setInviteModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('Invite Colleague', 'دعوة زميل')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t('Full Name', 'الاسم الكامل')}</label>
              <Input value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Sara Al-Thani" className="min-h-[44px] text-sm" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">{t('Email Address', 'البريد الإلكتروني')}</label>
              <Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="sara@company.com" className="min-h-[44px] text-sm" />
            </div>
            <Button variant="default" className="w-full min-h-[44px]" onClick={handleSendInvite}>
              {t('Send Invitation', 'إرسال الدعوة')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
export type { Employee };
