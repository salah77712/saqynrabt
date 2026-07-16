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
<div className="overflow-x-auto w-full border border-[#F8F9FB] dark:border-[#141F33] rounded-xl bg-[#F8F9FB] dark:bg-[#141F33] shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
<tr className="bg-[#F8F9FB] dark:bg-[#141F33] border-b text-[10px] font-black text-[#141F33] uppercase tracking-wider">
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
              className="border-b  last:border-0  cursor-pointer transition-all duration-300 hover:shadow-md hover:scale-[1.01] active:scale-95"
            >
              <td className="p-4 text-xs font-bold ">{req.customer}</td>
              <td className="p-4 text-xs font-semibold ">{req.type}</td>
              <td className="p-4 text-xs text-[#141F33]">{req.time}</td>
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
