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
          className={`min-h-[44px] w-full rounded-xl border bg-slate-50 px-4 py-2.5 text-sm font-normal text-navy outline-none focus:bg-white focus:ring-2 focus:ring-royal/20 transition-all dark:bg-slate-800 dark:text-white ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
              : 'border-gray-200 dark:border-gray-700 focus:border-royal'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-xs font-bold text-red-500 leading-none">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
