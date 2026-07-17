'use client';

import { createPortal } from 'react-dom';
import { AlertTriangle } from 'lucide-react';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function UnsavedChangesModal({ isOpen, onConfirm, onCancel }: UnsavedChangesModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-surface dark:bg-primary border border-primary/10 dark:border-primary/30 rounded-xl shadow-2xl p-8 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="w-6 h-6 text-accent shrink-0" />
          <h3 className="text-lg font-bold text-primary dark:text-surface">
            Unsaved Changes
          </h3>
        </div>
        <p className="text-sm text-primary dark:text-primary">
          You have unsaved changes. Are you sure you want to leave?
        </p>
        <div className="flex gap-4 mt-6">
<button
        onClick={onCancel}
        className="flex-1 border border-primary/10 dark:border-primary/30 text-primary dark:text-primary font-bold py-3 rounded-xl text-xs min-h-[44px] transition-all duration-300 hover:bg-primary dark:hover:bg-primary"
      >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-primary text-surface font-bold py-3 rounded-xl text-xs hover:bg-primary transition-all"
          >
            Leave
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
