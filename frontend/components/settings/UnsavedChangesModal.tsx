'use client';

import { createPortal } from 'react-dom';
import { WarningIcon } from '../ui/Icons';

interface UnsavedChangesModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function UnsavedChangesModal({ isOpen, onConfirm, onCancel }: UnsavedChangesModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl p-6 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-4">
          <WarningIcon className="w-6 h-6 text-amber-500 shrink-0" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Unsaved Changes
          </h3>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          You have unsaved changes. Are you sure you want to leave?
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-200 dark:border-gray-700 text-slate-700 dark:text-slate-300 font-bold py-3 rounded-xl text-xs hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
          >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl text-xs hover:bg-red-700 transition-all"
          >
            Leave
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
