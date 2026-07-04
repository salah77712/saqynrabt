'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'card' | 'list' | 'table' | 'text';
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  if (variant === 'card') {
    return (
      <div className={`h-32 w-full bg-slate-100 rounded-2xl animate-pulse border border-slate-200/50 ${className}`} />
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-3 w-full">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`h-12 w-full bg-slate-100 rounded-xl animate-pulse ${className}`} />
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="space-y-4 w-full">
        <div className="h-10 w-full bg-slate-200 rounded-xl animate-pulse" />
        {[1, 2, 3].map((i) => (
          <div key={i} className={`h-12 w-full bg-slate-100 rounded-xl animate-pulse ${className}`} />
        ))}
      </div>
    );
  }

  return (
    <div className={`h-4 bg-slate-100 rounded-md animate-pulse ${className}`} />
  );
}
