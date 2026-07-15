'use client';

import * as React from 'react';
import { X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const close = React.useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => onClose?.(), 200);
  }, [isExiting, onClose]);

  React.useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(close, 5000);
    return () => clearTimeout(timer);
  }, [onClose, close]);

  const bgColors = {
success: 'bg-[#2A5CFF] text-[#F8F9FB]',
  error: 'bg-[#141F33] text-[#F8F9FB]',
  info: 'bg-[#141F33] text-[#F8F9FB] dark:bg-royal',
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-between gap-8 px-4 py-3 rounded-[40px] shadow-2xl max-w-sm ${
        isExiting ? 'animate-slideDownExit' : 'animate-slideUp'
      } ${bgColors[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className="text-xs font-bold leading-relaxed">{message}</span>
      {onClose && (
        <button
          onClick={close}
          className="text-[#F8F9FB] opacity-80 hover:opacity-100 font-bold text-xs"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
