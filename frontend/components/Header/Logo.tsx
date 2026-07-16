import * as React from 'react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 group select-none"
      aria-label="SAQYN RABT home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#141F33] dark:bg-[#141F33] text-sm font-bold text-[#F8F9FB] shadow-sm group-hover:scale-105 transition-transform">
        S
      </div>
      <p className="text-sm font-extrabold tracking-[0.15em] text-[#141F33] dark:text-[#F8F9FB] group-hover:text-royal transition-colors">
        SAQYN RABT
      </p>
    </Link>
  );
}
