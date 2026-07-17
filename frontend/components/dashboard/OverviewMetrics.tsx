import * as React from 'react';
import { Card } from '@/components/shadcn/card';

interface MetricProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

export function OverviewMetrics({ metrics }: { metrics: MetricProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-8">
          <p className="text-[10px] uppercase font-bold text-primary tracking-wider">
            {metric.label}
          </p>
          <p className="text-3xl font-extrabold text-navy dark:text-surface mt-2">
            {metric.value}
          </p>
          {metric.change && (
            <p
              className={`text-xs font-semibold mt-3 ${
                metric.isPositive ? 'text-primary' : 'text-primary'
              }`}
            >
              {metric.change}
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}
export default OverviewMetrics;
