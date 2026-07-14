import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase';

  const variants = {
    primary: 'bg-navy/5 text-navy dark:bg-royal/10 dark:text-royal',
    secondary: 'bg-royal/10 text-royal',
    success: 'bg-accent/10 text-accent',
    danger: 'bg-red-500/10 text-red-500',
    warning: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
