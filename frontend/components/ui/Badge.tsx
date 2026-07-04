import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wide uppercase';

  const variants = {
    primary: 'bg-[#141F33]/5 text-[#141F33] dark:bg-royal/10 dark:text-royal',
    secondary: 'bg-[#2A5CFF]/10 text-[#2A5CFF]',
    success: 'bg-[#10B981]/10 text-[#10B981]',
    danger: 'bg-red-500/10 text-red-500',
    warning: 'bg-orange-500/10 text-orange-500',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
