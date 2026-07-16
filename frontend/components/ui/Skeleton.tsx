import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table-row' | 'metric-card';
}

export function Skeleton({ className = '', variant = 'rectangular', ...props }: SkeletonProps) {
  const baseStyle = 'bg-[#F8F9FB] dark:bg-[#141F33] animate-pulse';

  const variants: Record<string, string> = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'h-48 w-full rounded-xl',
    'table-row': 'h-12 w-full rounded-lg',
    'metric-card': 'h-28 w-full rounded-xl',
  };

  return <div className={`${baseStyle} ${variants[variant] || variants.rectangular} ${className}`} {...props} />;
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#141F33]/30 rounded-xl p-8 space-y-4">
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="text" className="w-2/3" />
      <Skeleton variant="rectangular" className="h-4 w-full" />
      <div className="flex justify-between">
        <Skeleton variant="text" className="w-1/4" />
        <Skeleton variant="text" className="w-1/4" />
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <Skeleton variant="table-row" className="bg-[#F8F9FB] dark:bg-[#141F33]" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} variant="table-row" />
      ))}
    </div>
  );
}

export function SkeletonMetricGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} variant="metric-card" />
      ))}
    </div>
  );
}
