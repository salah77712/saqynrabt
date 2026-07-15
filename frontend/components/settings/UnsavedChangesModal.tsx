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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#141F33] backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-sm bg-[#F8F9FB] dark:bg-[#141F33] border border-[#141F33]/10 dark:border-[#141F33]/30 rounded-[40px] shadow-2xl p-8 relative animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <AlertTriangle className="w-6 h-6 text-[#2A5CFF] shrink-0" />
          <h3 className="text-lg font-bold text-[#141F33] dark:text-[#F8F9FB]">
            Unsaved Changes
          </h3>
        </div>
        <p className="text-sm text-[#141F33] dark:text-[#141F33]">
          You have unsaved changes. Are you sure you want to leave?
        </p>
        <div className="flex gap-4 mt-6">
<button
        onClick={onCancel}
        className="flex-1 border border-[#141F33]/10 dark:border-[#141F33]/30 text-[#141F33] dark:text-[#141F33] font-bold py-3 rounded-[40px] text-xs min-h-[44px] transition-all duration-300 hover:bg-[#141F33] dark:hover:bg-[#141F33]"
      >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#141F33] text-[#F8F9FB] font-bold py-3 rounded-[40px] text-xs hover:bg-[#141F33] transition-all"
          >
            Leave
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
