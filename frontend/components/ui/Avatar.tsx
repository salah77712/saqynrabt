import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ className = '', src, name, size = 'md', ...props }: AvatarProps) {
  const [error, setError] = React.useState(false);

  const getInitials = (userName: string) => {
    return userName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };

  return (
    <div
      className={`relative flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-navy dark:text-white font-extrabold border border-gray-200/50 dark:border-slate-700/50 overflow-hidden ${sizes[size]} ${className}`}
      {...props}
    >
      {src && !error ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          onError={() => setError(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}
