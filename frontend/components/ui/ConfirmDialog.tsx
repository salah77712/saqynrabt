'use client';

import React, { useEffect, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
}: ConfirmDialogProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  useFocusTrap(open, backdropRef);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/30 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="bg-surface border border-primary/10 rounded-xl shadow-lg max-w-sm w-full p-6 animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2 rounded-full ${destructive ? 'bg-danger/10' : 'bg-warning/10'}`}>
            <AlertTriangle className={`w-5 h-5 ${destructive ? 'text-danger' : 'text-warning'}`} />
          </div>
          <button
            onClick={onClose}
            className="text-primary/40 hover:text-primary min-h-[32px] min-w-[32px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <h3 className="text-base font-bold text-primary mb-2">{title}</h3>
        <p className="text-xs text-primary/60 leading-relaxed mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border border-primary/10 text-primary text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 min-h-[44px] active:scale-95"
          >
            {cancelLabel}
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className={`text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 min-h-[44px] active:scale-95 ${
              destructive
                ? 'bg-danger text-surface hover:bg-danger/90'
                : 'bg-primary text-surface hover:bg-primary/90'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
