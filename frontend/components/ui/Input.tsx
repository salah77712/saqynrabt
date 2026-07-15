import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          className={`min-h-[44px] w-full rounded-xl border bg-[#F8F9FB] px-4 py-2.5 text-xs font-semibold text-navy outline-none focus:bg-[#F8F9FB] focus:ring-2 focus:ring-royal/20 transition-all dark:bg-[#141F33] dark:text-[#F8F9FB] ${
            error
? 'border-[#141F33] focus:border-[#141F33] focus:ring-[#141F33]/20'
: 'border-[#141F33]/10 dark:border-[#141F33]/30 focus:border-royal'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs font-bold text-[#141F33] leading-none">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
