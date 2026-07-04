import * as React from 'react';

export interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className={`w-full bg-gray-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden ${className}`}>
      <div
        className="bg-royal h-full transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}
