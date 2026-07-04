import * as React from 'react';
import { Card } from '../ui/Card';

interface ActivityItem {
  id: string;
  type: 'automation' | 'chat' | 'approval';
  title: string;
  time: string;
}

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card className="p-6">
      <h3 className="font-bold text-navy dark:text-white text-base mb-4">
        Recent Activity Feed
      </h3>
      <div className="flex flex-col gap-3">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800/50 pb-3 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">
                {act.type === 'automation' ? '📞' : act.type === 'chat' ? '💬' : '👥'}
              </span>
              <p className="text-xs font-semibold text-navy dark:text-slate-300">
                {act.title}
              </p>
            </div>
            <span className="text-[10px] font-bold text-slate-400">{act.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default RecentActivity;
