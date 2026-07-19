import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide uppercase';

  const variants = {
    primary: 'bg-primary text-primary-foreground dark:bg-accent/10 dark:text-accent',
    secondary: 'bg-accent/10 text-accent',
    success: 'bg-success/10 text-success dark:bg-success/20 dark:text-success',
    danger: 'bg-danger/10 text-danger dark:bg-danger/20 dark:text-danger',
    warning: 'bg-warning/10 text-warning dark:bg-warning/20 dark:text-warning',
    info: 'bg-info/10 text-info dark:bg-info/20 dark:text-info',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}