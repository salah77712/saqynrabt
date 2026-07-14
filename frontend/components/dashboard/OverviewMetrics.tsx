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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <Card key={metric.label} className="p-6">
          <p className="text-[10px] uppercase font-bold text-[#141F33] tracking-wider">
            {metric.label}
          </p>
          <p className="text-3xl font-extrabold text-navy dark:text-[#F8F9FB] mt-2">
            {metric.value}
          </p>
          {metric.change && (
            <p
              className={`text-xs font-semibold mt-2 ${
                metric.isPositive ? 'text-[#141F33]' : 'text-[#141F33]'
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
