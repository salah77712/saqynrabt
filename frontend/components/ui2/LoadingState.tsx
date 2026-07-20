'use client';

import React from 'react';

interface LoadingStateProps {
  rows?: number;
  type?: 'table' | 'card' | 'list';
}

function SkeletonBar({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-shimmer bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 bg-[length:200%_100%] rounded ${className}`} />
  );
}

export function LoadingState({ rows = 3, type = 'card' }: LoadingStateProps) {
  if (type === 'table') {
    return (
      <div className="space-y-3">
        <div className="flex gap-4 pb-3 border-b border-primary/10">
          {[40, 60, 30].map((w, i) => (
            <SkeletonBar key={i} className={`h-4 w-${w}`} />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3">
            {[40, 60, 30].map((w, j) => (
              <SkeletonBar key={j} className={`h-3 w-${w}`} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border border-primary/10 rounded-xl">
            <SkeletonBar className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <SkeletonBar className="h-3 w-3/5" />
              <SkeletonBar className="h-2 w-2/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="border border-primary/10 rounded-xl p-6 space-y-3">
          <SkeletonBar className="h-3 w-1/3" />
          <SkeletonBar className="h-8 w-1/2" />
          <SkeletonBar className="h-2 w-2/3" />
        </div>
      ))}
    </div>
  );
}
