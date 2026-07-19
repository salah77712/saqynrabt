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
    success: 'bg-success/10 border-success/20 text-success dark:bg-success/20 dark:border-success/30 dark:text-success',
    error: 'bg-danger/10 border-danger/20 text-danger dark:bg-danger/20 dark:border-danger/30 dark:text-danger',
    warning: 'bg-warning/10 border-warning/20 text-warning dark:bg-warning/20 dark:border-warning/30 dark:text-warning',
    info: 'bg-info/10 border-info/20 text-info dark:bg-info/20 dark:border-info/30 dark:text-info',
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
      className={`fixed bottom-6 end-6 z-50 flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-elevation-high max-w-sm border ${isExiting ? 'animate-slideDownExit' : 'animate-slideUp'} ${variants[type]}`}
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