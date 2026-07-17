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
          className={`min-h-[44px] w-full rounded-xl border bg-surface px-4 py-2.5 text-xs font-semibold text-navy outline-none focus:bg-surface focus:ring-2 focus:ring-royal/20 transition-all duration-300 dark:bg-primary dark:text-surface ${
            error
? 'border-primary focus:border-primary focus:ring-2 focus:ring-royal/20'
: 'border-primary/10 dark:border-primary/30 focus:border-royal'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs font-bold text-primary leading-none">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
