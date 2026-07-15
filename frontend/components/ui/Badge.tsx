import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const baseStyle = 'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase';

  const variants = {
primary: 'bg-[#141F33] text-[#141F33] dark:bg-[#2A5CFF]/10 dark:text-[#2A5CFF]',
  secondary: 'bg-[#2A5CFF]/10 text-[#2A5CFF]',
  success: 'bg-[#2A5CFF]/10 text-[#2A5CFF]',
  danger: 'bg-[#141F33] text-[#141F33]',
  warning: 'bg-[#2A5CFF]/10 text-[#2A5CFF]',
  };

  return (
    <span className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
