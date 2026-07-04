import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className = '', variant = 'rectangular', ...props }: SkeletonProps) {
  const baseStyle = 'bg-gray-200 dark:bg-slate-800 animate-pulse';

  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full',
    rectangular: 'rounded-xl',
  };

  return <div className={`${baseStyle} ${variants[variant]} ${className}`} {...props} />;
}
