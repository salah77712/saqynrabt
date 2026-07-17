import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase';

  const variants = {
primary: 'bg-primary text-primary dark:bg-accent/10 dark:text-accent',
  secondary: 'bg-accent/10 text-accent',
  success: 'bg-accent/10 text-accent',
  danger: 'bg-primary text-primary',
  warning: 'bg-accent/10 text-accent',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
