'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  actions,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key close handler & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      
      {/* Backdrop click close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="bg-white border border-gray-200 rounded-2xl w-full max-w-lg p-8 shadow-2xl relative z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Title */}
        <h3 id="modal-title" className="text-lg font-extrabold text-[#141F33]">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-xs font-semibold text-[#718096] mt-1 mb-6 leading-relaxed">
            {description}
          </p>
        )}

        {/* Body content slot */}
        <div className="mb-8 mt-4 text-xs font-semibold text-slate-700 leading-relaxed">
          {children}
        </div>

        {/* Footer actions slot */}
        {actions && (
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
            {actions}
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all text-xs font-bold"
          aria-label="Close Modal"
        >
          ✕
        </button>

      </div>
    </div>
  );
}
