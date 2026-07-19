import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, type = 'text', ...props }, ref) => {
    const errorId = props.name ? `${props.name}-error` : undefined;
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          aria-describedby={error && errorId ? errorId : undefined}
          className={`min-h-[44px] w-full rounded-xl border bg-surface px-4 py-2.5 text-xs font-semibold text-navy outline-none focus:bg-surface focus:ring-2 transition-all duration-300 dark:bg-primary dark:text-surface ${
            error
              ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-primary/10 dark:border-primary/30 focus:border-royal focus:ring-royal/20'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p id={errorId} className="mt-1.5 text-xs font-bold text-primary leading-none">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
