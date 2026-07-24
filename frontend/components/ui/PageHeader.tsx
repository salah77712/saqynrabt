import * as React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, actions, className = '' }: PageHeaderProps) {
  return (
    <div className={`flex flex-col md:flex-row md:justify-between md:items-center gap-8 mb-6 ${className}`}>
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-xs text-primary font-bold mt-0.5">
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-4 w-full md:w-auto">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
