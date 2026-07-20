'use client';

import React from 'react';

interface PageHeaderAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: PageHeaderAction[];
  compact?: boolean;
}

export function PageHeader({ title, description, actions, compact = false }: PageHeaderProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${compact ? 'mb-6' : 'mb-8'}`}>
      <div className="min-w-0">
        <h1 className="text-xl md:text-2xl font-bold text-primary">{title}</h1>
        {description && (
          <p className="text-xs text-primary/60 mt-1 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <div className="flex items-center gap-3 shrink-0">
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className={`inline-flex items-center gap-2 text-xs font-bold px-5 py-2.5 rounded-full transition-all duration-200 min-h-[44px] active:scale-95 ${
                action.variant === 'secondary' || !action.variant
                  ? 'border border-primary/10 bg-surface text-primary hover:bg-primary/5'
                  : 'bg-primary text-surface hover:bg-primary/90'
              }`}
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
