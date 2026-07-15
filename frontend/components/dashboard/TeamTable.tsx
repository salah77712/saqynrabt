import * as React from 'react';
import { Badge } from '../ui/Badge';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending';
}

interface TeamTableProps {
  members: Employee[];
  onAction?: (id: string, action: 'approve' | 'suspend' | 'toggle-admin', role?: string) => void;
}

export function TeamTable({ members, onAction }: TeamTableProps) {
  return (
    <div className="overflow-x-auto w-full border border-[#F8F9FB] dark:border-[#141F33] rounded-2xl bg-[#F8F9FB] dark:bg-[#141F33] shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#F8F9FB] dark:bg-[#141F33] border-b border-[#F8F9FB] dark:border-[#141F33] text-[10px] font-black text-[#141F33] uppercase tracking-wider">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            {onAction && <th className="p-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b border-[#F8F9FB] dark:border-[#141F33] last:border-0 hover:bg-[#141F33]/5 transition-colors">
              <td className="p-4 text-xs font-bold text-navy dark:text-[#F8F9FB]">{m.name}</td>
              <td className="p-4 text-xs text-[#141F33] dark:text-[#141F33]">{m.email}</td>
              <td className="p-4 text-xs font-semibold text-[#141F33] uppercase tracking-wider">{m.role}</td>
<td className="p-4">
<span className={`text-xs font-bold ${m.status === 'active' ? 'text-[#141F33]' : 'text-[#2A5CFF]'}`}>{m.status}</span>
</td>
              {onAction && (
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-3.5">
                    {m.status === 'pending' ? (
                      <button
                        onClick={() => onAction(m.id, 'approve')}
                        className="px-4 py-2 min-h-[44px] text-xs font-bold text-[#141F33] hover:text-[#141F33]"
                      >
                        Approve
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onAction(m.id, 'toggle-admin', m.role)}
                          className={`px-4 py-2 min-h-[44px] text-xs font-bold ${
                            m.role === 'admin' 
? 'text-[#2A5CFF] hover:text-[#2A5CFF]'
: 'text-[#2A5CFF] hover:text-[#2A5CFF]'
                          }`}
                        >
                          {m.role === 'admin' ? 'Demote' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => onAction(m.id, 'suspend')}
                          className="px-4 py-2 min-h-[44px] text-xs font-bold text-[#141F33] hover:text-[#141F33]"
                        >
                          Suspend
                        </button>
                      </>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TeamTable;
