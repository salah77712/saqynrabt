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
  onAction?: (id: string, action: 'approve' | 'suspend') => void;
}

export function TeamTable({ members, onAction }: TeamTableProps) {
  return (
    <div className="overflow-x-auto w-full border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            {onAction && <th className="p-4 text-right">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id} className="border-b border-gray-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/20 transition-colors">
              <td className="p-4 text-xs font-bold text-navy dark:text-white">{m.name}</td>
              <td className="p-4 text-xs text-slate-600 dark:text-slate-400">{m.email}</td>
              <td className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.role}</td>
              <td className="p-4">
                <Badge variant={m.status === 'active' ? 'success' : 'primary'}>
                  {m.status}
                </Badge>
              </td>
              {onAction && (
                <td className="p-4 text-right">
                  {m.status === 'pending' ? (
                    <button
                      onClick={() => onAction(m.id, 'approve')}
                      className="text-xs font-bold text-emerald-500 hover:text-emerald-700"
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => onAction(m.id, 'suspend')}
                      className="text-xs font-bold text-red-500 hover:text-red-700"
                    >
                      Suspend
                    </button>
                  )}
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
