import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'card' | 'table-row' | 'metric-card' | 'shimmer';
}

export function Skeleton({ className = '', variant = 'rectangular', ...props }: SkeletonProps) {
  const baseStyle = 'bg-primary/5 dark:bg-white/10 animate-pulse';

  const variants: Record<string, string> = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
    card: 'h-48 w-full rounded-xl',
    'table-row': 'h-12 w-full rounded-lg',
    'metric-card': 'h-28 w-full rounded-xl',
    shimmer: 'h-4 w-full rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 bg-[length:200%_100%] animate-shimmer',
  };

  return <div aria-busy="true" role="status" className={`${variant === 'shimmer' ? '' : baseStyle} ${variants[variant] || variants.rectangular} ${className}`} {...props}><span className="sr-only">Loading...</span></div>;
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/10 rounded-xl p-8 space-y-4">
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
      <Skeleton variant="table-row" className="bg-primary/5 dark:bg-white/10" />
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
