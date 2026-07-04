import * as React from 'react';
import { Card } from '../ui/Card';

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
          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            {metric.label}
          </p>
          <p className="text-3xl font-extrabold text-navy dark:text-white mt-2">
            {metric.value}
          </p>
          {metric.change && (
            <p
              className={`text-xs font-semibold mt-2 ${
                metric.isPositive ? 'text-emerald-500' : 'text-red-500'
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
