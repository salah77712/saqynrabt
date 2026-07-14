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
      className={`relative flex items-center justify-center rounded-full bg-[#F8F9FB] dark:bg-[#141F33] text-[#141F33] dark:text-[#F8F9FB] font-extrabold border border-[#141F33]/10 dark:border-[#141F33]/30 overflow-hidden ${sizes[size]} ${className}`}
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
