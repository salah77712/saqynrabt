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
const token = await (window as any).Clerk?.session?.getToken();
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

const handleSendInvite = useCallback(async () => {
if (!inviteName || !inviteEmail) return;

try {
const token = await (window as any).Clerk?.session?.getToken();
const headers: Record<string, string> = { 'Content-Type': 'application/json' };
if (token) headers['Authorization'] = `Bearer ${token}`;
await fetch('/api/approvals', {
method: 'POST',
headers,
body: JSON.stringify({ action: 'invite', name: inviteName, email: inviteEmail }),
});
addToast('Invitation sent successfully', 'success');
refetch();
} catch {
addToast('Failed to send invitation. Please try again.', 'error');
}

setInviteModalOpen(false);
setInviteName('');
setInviteEmail('');
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
<p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-3">{m.role}</p>
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
message={error?.message || t('Failed to load team members.', 'ÙØ´Ù„ ØªØ­Ù…ÙŠÙ„ Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„ÙØ±ÙŠÙ‚.')}
onRetry={() => refetch()}
/>
);
}

return (
<main id="main-content" className="space-y-6">
<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 mb-6">
<div>
<h1 className="text-xl md:text-2xl font-black text-primary dark:text-surface">
{t('Team', 'Ø¯Ù„ÙŠÙ„ Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„')}
</h1>
<p className="text-[10px] md:text-xs text-primary font-bold">
{t('Invite teammates, manage roles, and approve access requests.', 'Ø¥Ø¯Ø§Ø±Ø© Ø¶ÙˆØ§Ø¨Ø· Ø§Ù„ÙˆØµÙˆÙ„ Ù„Ù„ÙØ±ÙŠÙ‚ ÙˆØªÙ†Ø³ÙŠÙ‚ Ù…ÙˆØ§ÙÙ‚Ø§Øª Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†.')}
</p>
</div>
<Button variant="default" onClick={() => setInviteModalOpen(true)} className="py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] w-full md:w-auto">
{t('Invite Colleague', 'Ø¯Ø¹ÙˆØ© Ø²Ù…ÙŠÙ„')}
</Button>
</div>

<div className="space-y-6">
{pending.length > 0 ? (
<div className="space-y-3">
<h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-accent">
{t('Pending Approvals', 'Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø§Øª Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©')} ({pending.length})
</h3>
{isMobile ? (
<div className="space-y-3">{pending.map(renderMobileCard)}</div>
) : (
<TeamTable members={pending} onAction={handleAction} />
)}
</div>
) : (
<div className="space-y-3">
<h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-accent">
{t('Pending Approvals', 'Ø§Ù„Ù…ÙˆØ§ÙÙ‚Ø§Øª Ø§Ù„Ù…Ø¹Ù„Ù‚Ø©')}
</h3>
<p className="text-xs text-primary">
{t('No pending approvals.', 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ù…ÙˆØ§ÙÙ‚Ø§Øª Ù…Ø¹Ù„Ù‚Ø©.')}
</p>
</div>
)}

<div className="space-y-3">
<h3 className="text-xs md:text-sm font-black uppercase tracking-wider text-navy dark:text-surface">
{t('Active Members', 'Ø§Ù„Ø£Ø¹Ø¶Ø§Ø¡ Ø§Ù„Ù†Ø´Ø·ÙˆÙ†')} ({active.length})
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
<DialogTitle>{t('Invite Colleague', 'Ø¯Ø¹ÙˆØ© Ø²Ù…ÙŠÙ„')}</DialogTitle>
</DialogHeader>
<div className="space-y-4">
<div>
<label className="block text-[10px] font-bold text-primary uppercase mb-1">{t('Full Name', 'Ø§Ù„Ø§Ø³Ù… Ø§Ù„ÙƒØ§Ù…Ù„')}</label>
<Input value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Sara Al-Thani" className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold" />
</div>
<div>
<label className="block text-[10px] font-bold text-primary uppercase mb-1">{t('Email Address', 'Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ')}</label>
<Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="sara@company.com" className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold" />
</div>
<Button variant="default" className="w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]" onClick={handleSendInvite}>
{t('Send Invitation', 'Ø¥Ø±Ø³Ø§Ù„ Ø§Ù„Ø¯Ø¹ÙˆØ©')}
</Button>
</div>
</DialogContent>
</Dialog>
</main>
);
}
export type { Employee };