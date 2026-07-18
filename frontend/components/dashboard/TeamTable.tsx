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
    <div className="overflow-x-auto w-full border border-surface dark:border-slate-700 rounded-xl bg-surface dark:bg-[#07111F] shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 z-10 bg-[#F8F9FB] dark:bg-[#07111F]">
          <tr className="border-b border-surface dark:border-slate-700 text-[10px] font-black text-primary dark:text-surface uppercase tracking-wider">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            {onAction && <th className="p-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b border-surface dark:border-slate-700 last:border-0 odd:bg-white even:bg-[#F8F9FB] dark:odd:bg-[#07111F] dark:even:bg-slate-900 hover:bg-[#F8F9FB] dark:hover:bg-slate-800 transition-colors">
              <td className="p-4 text-xs font-bold text-navy dark:text-surface">{m.name}</td>
              <td className="p-4 text-xs text-primary dark:text-surface">{m.email}</td>
              <td className="p-4 text-xs font-semibold text-primary dark:text-surface uppercase tracking-wider">{m.role}</td>
              <td className="p-4">
                <span className={`text-xs font-bold ${m.status === 'active' ? 'text-primary dark:text-surface' : 'text-accent'}`}>{m.status}</span>
              </td>
              {onAction && (
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-4.5">
                    {m.status === 'pending' ? (
                      <button
                        onClick={() => onAction(m.id, 'approve')}
                        className="px-4 py-2 min-h-[44px] text-xs font-bold text-primary hover:text-primary"
                      >
                        Approve
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => onAction(m.id, 'toggle-admin', m.role)}
                          className={`px-4 py-2 min-h-[44px] text-xs font-bold ${
                            m.role === 'admin' 
? 'text-accent hover:text-accent'
: 'text-accent hover:text-accent'
                          }`}
                        >
                          {m.role === 'admin' ? 'Demote' : 'Make Admin'}
                        </button>
                        <button
                          onClick={() => onAction(m.id, 'suspend')}
className="px-4 py-2 min-h-[44px] rounded-xl text-xs font-bold text-primary transition-all duration-300 hover:scale-[1.02] active:scale-95 hover:text-primary"
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
