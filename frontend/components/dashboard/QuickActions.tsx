import * as React from 'react';
import Link from 'next/link';

interface ActionItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export function QuickActions({ actions }: { actions: ActionItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {actions.map((act) => (
        <Link
          key={act.href}
          href={act.href}
          className="flex flex-col items-center justify-center p-8 border border-[#F8F9FB] dark:border-[#141F33] rounded-xl bg-[#F8F9FB] dark:bg-[#141F33] shadow-sm hover:shadow-md hover:border-royal/20 hover:scale-[1.02] transition-all duration-300 text-center min-h-[100px]"
        >
          <span className="mb-2">
            {act.icon}
          </span>
          <span className="text-xs font-bold text-navy dark:text-[#F8F9FB]">
            {act.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
export default QuickActions;
