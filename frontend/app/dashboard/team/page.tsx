'use client';

import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useLocale } from '../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../components/ui/Badge';
import { TeamTable } from '../../../components/dashboard/TeamTable';
import { LoadingSpinner } from '../../../components/ui/LoadingSpinner';
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
const [inviteErrors, setInviteErrors] = useState<{ name?: string; email?: string }>({});
const [inviteSubmitting, setInviteSubmitting] = useState(false);
const [teamSearch, setTeamSearch] = useState('');

const pending = data?.pending ?? [];
const active = data?.active ?? [];

const q = teamSearch.toLowerCase();
const filteredPending = pending.filter(m =>
  m.name.toLowerCase().includes(q) ||
  m.email.toLowerCase().includes(q) ||
  m.role.toLowerCase().includes(q)
);
const filteredActive = active.filter(m =>
  m.name.toLowerCase().includes(q) ||
  m.email.toLowerCase().includes(q) ||
  m.role.toLowerCase().includes(q)
);

const { getToken } = useAuth();

const handleAction = useCallback(async (id: string, action: 'approve' | 'suspend' | 'toggle-admin', currentRole?: string) => {
try {
const token = await getToken();
const buildHeaders = (): Record<string, string> => {
const h: Record<string, string> = { 'Content-Type': 'application/json' };
if (token) h['Authorization'] = `Bearer ${token}`;
return h;
};
if (action === 'toggle-admin') {
const newRole = currentRole === 'admin' ? 'employee' : 'admin';
const res = await fetch('/api/employees', {
method: 'PATCH',
headers: buildHeaders(),
body: JSON.stringify({ clerk_user_id: id, role: newRole }),
});
if (!res.ok) {
const data = await res.json();
addToast(data.error || 'Failed to update employee role', 'error');
}
} else {
await fetch('/api/approvals', {
method: 'POST',
headers: buildHeaders(),
body: JSON.stringify({ id, action }),
});
}
refetch();
} catch {
addToast('Action failed. Please try again.', 'error');
}
}, [refetch, addToast]);

const validateInvite = () => {
    const errors: { name?: string; email?: string } = {};
    if (!inviteName.trim()) errors.name = t('Name is required', 'الاسم مطلوب');
    if (!inviteEmail.trim()) errors.email = t('Email is required', 'البريد الإلكتروني مطلوب');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail)) errors.email = t('Invalid email format', 'تنسيق البريد الإلكتروني غير صالح');
    setInviteErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSendInvite = useCallback(async () => {
    if (!validateInvite()) return;
    setInviteSubmitting(true);

    try {
      const token = await getToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const res = await fetch('/api/approvals', {
        method: 'POST',
        headers,
        body: JSON.stringify({ action: 'invite', name: inviteName.trim(), email: inviteEmail.trim() }),
      });
      const result = await res.json();
      if (result.email_sent === true) {
        addToast('Invitation sent successfully', 'success');
      } else if (result.email_sent === false) {
        addToast('Invitation created. Email delivery failed — check EMAIL_API_KEY configuration.', 'error');
      } else {
        addToast('Invitation sent successfully', 'success');
      }
      refetch();
      setInviteModalOpen(false);
      setInviteName('');
      setInviteEmail('');
      setInviteErrors({});
    } catch {
      addToast('Failed to send invitation. Please try again.', 'error');
    }

    setInviteSubmitting(false);
  }, [inviteName, inviteEmail, refetch, addToast]);

const renderMobileCard = (m: Employee) => (
<div key={m.id} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
<div className="flex items-start justify-between mb-2">
<div className="flex-1 min-w-0">
<h4 className="text-sm font-bold text-primary truncate">{m.name}</h4>
<p className="text-[11px] text-primary truncate">{m.email}</p>
</div>
<Badge variant={m.status === 'active' ? 'success' : 'primary'}>{m.status}</Badge>
</div>
<p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{m.role}</p>
<div className="flex gap-3">
{m.status === 'pending' ? (
<button
          onClick={() => handleAction(m.id, 'approve')}
          className="flex-1 min-h-[44px] py-3 px-6 rounded-xl bg-surface border border-primary/10 text-accent font-bold text-xs"
        >
          Approve
        </button>
) : (
<>
<button
onClick={() => handleAction(m.id, 'toggle-admin', m.role)}
className={`flex-1 min-h-[44px] py-3 px-6 rounded-xl border font-bold text-xs ${
m.role === 'admin'
? 'bg-surface border-primary/10 text-accent'
: 'bg-surface border-primary/10 text-accent'
}`}
>
{m.role === 'admin' ? 'Demote' : 'Make Admin'}
</button>
<button
        onClick={() => handleAction(m.id, 'suspend')}
        className="flex-1 min-h-[44px] py-3 px-6 rounded-xl bg-surface border border-primary/10 text-primary font-bold text-xs"
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
<div className="animate-fadeIn">
<div className="h-8 bg-primary dark:bg-primary rounded-lg w-72 mb-2" />
<div className="h-4 bg-primary dark:bg-primary rounded-lg w-96" />
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
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mb-6">
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
          {t('Team', 'دليل مساحة العمل')}
</h1>
<p className="text-xs md:text-xs text-primary font-bold">
{t('Invite teammates, manage roles, and approve access requests.', 'إدارة ضوابط الوصول للفريق وتنسيق موافقات الموظفين.')}
</p>
</div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-primary/40" />
            <input
              type="text"
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
              placeholder={t('Search team members...', 'البحث عن أعضاء الفريق...')}
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent"
              aria-label={t('Search team members', 'البحث عن أعضاء الفريق')}
            />
          </div>
          <Button variant="primary" onClick={() => { setInviteModalOpen(true); setInviteErrors({}); }} className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] whitespace-nowrap">
            {t('Invite Colleague', 'دعوة زميل')}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
{pending.length > 0 ? (
            <div className="space-y-3">
<h3 className="text-lg font-extrabold text-accent">
                {t('Pending Approvals', 'الموافقات المعلقة')} ({filteredPending.length})
</h3>
          {isMobile ? (
            <div className="space-y-3">{filteredPending.map(renderMobileCard)}</div>
          ) : (
            <TeamTable members={filteredPending} onAction={handleAction} />
          )}
</div>
) : (
<div className="space-y-3">
<h3 className="text-lg font-extrabold text-accent">
            {t('Pending Approvals', 'الموافقات المعلقة')}
</h3>
<p className="text-xs text-primary">
{t('No pending approvals.', 'لا توجد موافقات معلقة.')}
</p>
</div>
)}

<div className="space-y-3">
<h3 className="text-lg font-extrabold text-navy dark:text-surface">
            {t('Active Members', 'الأعضاء النشطون')} ({filteredActive.length})
</h3>
          {filteredActive.length === 0 && active.length === 0 ? (
            <EmptyTeamState onInvite={() => setInviteModalOpen(true)} />
          ) : isMobile ? (
            <div className="space-y-3">{filteredActive.map(renderMobileCard)}</div>
          ) : (
            <TeamTable members={filteredActive} onAction={handleAction} />
          )}
</div>
</div>

<Dialog open={inviteModalOpen} onOpenChange={(open) => !open && setInviteModalOpen(false)}>
<DialogContent>
<DialogHeader>
<DialogTitle>{t('Invite Colleague', 'دعوة زميل')}</DialogTitle>
</DialogHeader>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSendInvite(); }} noValidate>
          <div>
            <label htmlFor="invite-name" className="block text-xs font-bold text-primary uppercase mb-1">{t('Full Name', 'الاسم الكامل')}</label>
            <Input
              id="invite-name"
              name="invite-name"
              value={inviteName}
              onChange={(e) => { setInviteName(e.target.value); setInviteErrors(prev => ({ ...prev, name: undefined })); }}
              placeholder="Sara Al-Thani"
              error={inviteErrors.name}
              aria-invalid={!!inviteErrors.name}
              aria-describedby={inviteErrors.name ? 'invite-name-error' : undefined}
              className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold"
            />
            {inviteErrors.name && <p id="invite-name-error" className="mt-1.5 text-xs font-bold text-red-500">{inviteErrors.name}</p>}
          </div>
          <div>
            <label htmlFor="invite-email" className="block text-xs font-bold text-primary uppercase mb-1">{t('Email Address', 'البريد الإلكتروني')}</label>
            <Input
              id="invite-email"
              name="invite-email"
              type="email"
              value={inviteEmail}
              onChange={(e) => { setInviteEmail(e.target.value); setInviteErrors(prev => ({ ...prev, email: undefined })); }}
              placeholder="sara@company.com"
              error={inviteErrors.email}
              aria-invalid={!!inviteErrors.email}
              aria-describedby={inviteErrors.email ? 'invite-email-error' : undefined}
              className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold"
            />
            {inviteErrors.email && <p id="invite-email-error" className="mt-1.5 text-xs font-bold text-red-500">{inviteErrors.email}</p>}
          </div>
          <Button
            variant="primary"
            type="submit"
            disabled={inviteSubmitting}
            className="w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] flex items-center justify-center gap-2"
          >
            {inviteSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                {t('Sending...', 'جاري الإرسال...')}
              </>
            ) : (
              t('Send Invitation', 'إرسال الدعوة')
            )}
          </Button>
        </form>
</DialogContent>
</Dialog>
</main>
);
}
export type { Employee };