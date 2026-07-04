'use client';

import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { TeamTable } from '../../../components/dashboard/TeamTable';
import { Modal } from '../../../components/ui/Modal';
import { Input } from '../../../components/ui/Input';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

export default function TeamDashboardPage() {
  const [members, setMembers] = useState<Employee[]>([
    { id: '1', name: 'John Doe', email: 'john@ Alsafa.qa', role: 'Staff Coordinator', status: 'active' },
    { id: '2', name: 'Sara Al-Mansoori', email: 'sara@Alsafa.qa', role: 'Operations Admin', status: 'active' },
    { id: '3', name: 'Fahad Rashid', email: 'fahad@company.com', role: 'Support Agent', status: 'pending' },
  ]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');

  const handleAction = (id: string, action: 'approve' | 'suspend') => {
    setMembers((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: action === 'approve' ? 'active' : 'pending',
          };
        }
        return m;
      })
    );
  };

  const handleSendInvite = () => {
    if (!inviteName || !inviteEmail) return;
    const newEmp: Employee = {
      id: Date.now().toString(),
      name: inviteName,
      email: inviteEmail,
      role: 'Staff Coordinator',
      status: 'pending',
    };
    setMembers((p) => [...p, newEmp]);
    setInviteModalOpen(false);
    setInviteName('');
    setInviteEmail('');
  };

  const pending = members.filter((m) => m.status === 'pending');
  const active = members.filter((m) => m.status === 'active');

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Workspace Directory</h1>
          <p className="text-xs text-slate-500 font-bold">Manage team access controls and coordinate staff approvals.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setInviteModalOpen(true)}>
          Invite Colleague
        </Button>
      </div>

      <div className="space-y-6">
        {pending.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-orange-500">
              Pending Approvals ({pending.length})
            </h3>
            <TeamTable members={pending} onAction={handleAction} />
          </div>
        )}

        <div className="space-y-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-navy dark:text-white">
            Active Members ({active.length})
          </h3>
          <TeamTable members={active} onAction={handleAction} />
        </div>
      </div>

      <Modal isOpen={inviteModalOpen} onClose={() => setInviteModalOpen(false)} title="Invite Colleague">
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
            <Input value={inviteName} onChange={(e) => setInviteName(e.target.value)} placeholder="Sara Al-Thani" />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Email Address</label>
            <Input value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} placeholder="sara@company.com" />
          </div>
          <Button variant="primary" className="w-full" onClick={handleSendInvite}>
            Send Invitation
          </Button>
        </div>
      </Modal>
    </main>
  );
}
export type { Employee };
