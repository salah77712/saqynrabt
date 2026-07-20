import * as React from 'react';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Download } from 'lucide-react';
import { useGlobalToast } from '@/lib/toast';

interface MetricProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
}

function downloadMetricsCSV(metrics: MetricProps[], onSuccess?: () => void) {
  const headers = ['Metric', 'Value', 'Change'];
  const rows = metrics.map(m => [
    m.label,
    String(m.value),
    m.change || '',
  ]);
  const csv = [headers, ...rows].map(r => r.map(c => `"${c.replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dashboard_metrics_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  onSuccess?.();
}

export function OverviewMetrics({ metrics }: { metrics: MetricProps[] }) {
  const { addToast } = useGlobalToast();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => downloadMetricsCSV(metrics, () => addToast('Report downloaded successfully', 'success'))}
          className="inline-flex items-center gap-2 text-xs font-bold"
        >
          <Download className="w-3.5 h-3.5" />
          Download Report
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((metric) => (
          <Card key={metric.label} className="p-8 card-hover">
            <p className="text-xs uppercase font-bold text-primary tracking-wider">
              {metric.label}
            </p>
            <p className="text-3xl font-extrabold text-navy dark:text-surface mt-2">
              {metric.value}
            </p>
            {metric.change && (
              <p
                className={`text-xs font-semibold mt-3 ${
                  metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {metric.change}
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
export default OverviewMetrics;
