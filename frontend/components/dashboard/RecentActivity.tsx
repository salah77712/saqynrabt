import * as React from 'react';
import { Card } from '@/components/shadcn/card';
import { Zap, MessageSquare, Users } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'automation' | 'chat' | 'approval';
  title: string;
  time: string;
}

export function RecentActivity({ activities }: { activities: ActivityItem[] }) {
  return (
    <Card className="p-8">
      <h3 className="font-bold text-navy dark:text-surface text-base mb-4">
        Recent Activity Feed
      </h3>
      <div className="flex flex-col gap-8">
        {activities.map((act) => (
          <div
            key={act.id}
            className="flex items-center justify-between border-b border-surface dark:border-primary/30 pb-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
<span className="text-sm">
{act.type === 'automation' ? <Zap className="w-4 h-4 text-primary" /> : act.type === 'chat' ? <MessageSquare className="w-4 h-4 text-primary" /> : <Users className="w-4 h-4 text-primary" />}
</span>
              <p className="text-xs font-semibold text-navy dark:text-primary">
                {act.title}
              </p>
            </div>
            <span className="text-xs font-bold text-primary">{act.time}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
export default RecentActivity;
