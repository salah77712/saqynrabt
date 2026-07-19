import * as React from 'react';
import { Card } from '@/components/shadcn/card';
import { ProgressBar } from '../ui/ProgressBar';

interface UsageProps {
  title: string;
  icon: React.ReactNode;
  used: number;
  limit: number;
  label: string;
}

export function UsageCard({ title, icon, used, limit, label }: UsageProps) {
  const percent = limit > 0 ? (used / limit) * 100 : 0;

  return (
    <Card className="p-8 card-hover">
      <div className="flex items-center gap-4 border-b border-surface dark:border-primary pb-3 mb-4">
        <span className="flex items-center">{icon}</span>
        <h4 className="font-bold text-navy dark:text-surface text-sm">{title}</h4>
      </div>
      <div className="flex justify-between text-xs font-bold text-primary mb-1.5">
        <span>{label}</span>
        <span>
          {used} / {limit}
        </span>
      </div>
      <ProgressBar value={percent} />
    </Card>
  );
}
export default UsageCard;
