import * as React from 'react';
import Link from 'next/link';

interface ActionItem {
  href: string;
  label: string;
  icon: string;
}

export function QuickActions({ actions }: { actions: ActionItem[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {actions.map((act) => (
        <Link
          key={act.href}
          href={act.href}
          className="flex flex-col items-center justify-center p-4 border border-gray-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm hover:shadow-md hover:border-royal/20 transition-all text-center min-h-[100px]"
        >
          <span className="text-xl mb-2" role="img" aria-hidden="true">
            {act.icon}
          </span>
          <span className="text-xs font-bold text-navy dark:text-white">
            {act.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
export default QuickActions;
