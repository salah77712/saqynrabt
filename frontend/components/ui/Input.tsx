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
          className={`min-h-[44px] w-full rounded-xl border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground outline-none focus:bg-surface focus:ring-2 transition-all duration-300 ${
            error
              ? 'border-danger focus:border-danger focus:ring-2 focus:ring-danger/20'
              : 'border-border focus:border-accent focus:ring-2 focus:ring-accent/20'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p id={errorId} className="mt-1.5 text-xs font-bold text-danger leading-none">
            {error}
          </p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';