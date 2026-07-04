import * as React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export function EmptyState({ icon, title, description, actionText, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm max-w-sm mx-auto">
      <span className="text-4xl mb-4" role="img" aria-hidden="true">
        {icon}
      </span>
      <h3 className="font-bold text-navy dark:text-white text-base mb-1">
        {title}
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
export default EmptyState;
