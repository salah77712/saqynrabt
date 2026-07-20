'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 border border-danger/20 rounded-xl bg-danger/5 max-w-md mx-auto">
      <AlertTriangle className="w-10 h-10 text-danger mb-4" />
      <h3 className="text-base font-bold text-danger mb-1">{title}</h3>
      <p className="text-xs text-primary/60 leading-relaxed mb-6 max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-danger text-surface text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 min-h-[44px] active:scale-95"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
