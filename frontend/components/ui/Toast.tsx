'use client';

import * as React from 'react';
import { X, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  onClose?: () => void;
}

export function Toast({ message, type = 'success', onClose }: ToastProps) {
  const [isExiting, setIsExiting] = React.useState(false);

  const close = React.useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
  }, [isExiting]);

  React.useEffect(() => {
    if (!onClose) return;
    const timer = setTimeout(close, 5000);
    return () => clearTimeout(timer);
  }, [onClose, close]);

  const variants = {
    success: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400',
    error: 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400',
    warning: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/30 dark:border-amber-800 dark:text-amber-400',
    info: 'bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-400',
  };

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div
      className={`fixed bottom-6 end-6 z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-2xl max-w-sm border ${
        isExiting ? 'animate-slideDownExit' : 'animate-slideUp'
      } ${variants[type]}`}
      onAnimationEnd={() => { if (isExiting) onClose?.(); }}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 shrink-0" />
        <span className="text-xs font-bold leading-relaxed">{message}</span>
      </div>
      {onClose && (
        <button
          onClick={close}
          className="opacity-60 hover:opacity-100 font-bold text-xs shrink-0"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
