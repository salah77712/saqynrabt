import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className = '', hoverEffect = true, children, ...props }: CardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-all duration-300 ${
        hoverEffect ? 'hover:shadow-md hover:scale-[1.01] hover:border-gray-200 dark:hover:border-gray-700' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
