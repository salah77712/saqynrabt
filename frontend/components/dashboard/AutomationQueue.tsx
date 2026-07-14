import * as React from 'react';
import { Badge } from '../ui/Badge';

interface RequestItem {
  id: string;
  type: string;
  customer: string;
  time: string;
  status: 'pending' | 'assigned' | 'completed';
}

interface AutomationQueueProps {
  requests: RequestItem[];
  onSelect: (item: RequestItem) => void;
}

export function AutomationQueue({ requests, onSelect }: AutomationQueueProps) {
  return (
    <div className="overflow-x-auto w-full border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 text-[10px] font-black text-slate-400 uppercase tracking-wider">
            <th className="p-4">Customer</th>
            <th className="p-4">Request Type</th>
            <th className="p-4">Received</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req.id}
              onClick={() => onSelect(req)}
              className="border-b border-gray-50 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95"
            >
              <td className="p-4 text-xs font-bold text-navy dark:text-white">{req.customer}</td>
              <td className="p-4 text-xs font-semibold text-slate-600 dark:text-slate-400">{req.type}</td>
              <td className="p-4 text-xs text-slate-400">{req.time}</td>
              <td className="p-4">
                <Badge variant={req.status === 'completed' ? 'success' : req.status === 'assigned' ? 'primary' : 'danger'}>
                  {req.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default AutomationQueue;
