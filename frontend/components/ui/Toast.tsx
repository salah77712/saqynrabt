'use client';

import * as React from 'react';
import { XIcon } from './Icons';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  React.useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(() => onClose(), 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColors = {
    success: 'bg-[#10B981] text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-[#141F33] text-white dark:bg-royal',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-between gap-4 px-4 py-3 rounded-xl shadow-2xl animate-slideUp max-w-sm ${bgColors[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className="text-xs font-bold leading-relaxed">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-white opacity-80 hover:opacity-100 font-bold text-xs"
          aria-label="Dismiss toast"
        >
          <XIcon className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
