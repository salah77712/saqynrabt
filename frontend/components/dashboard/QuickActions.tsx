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
          className="flex flex-col items-center justify-center p-8 border border-primary/10 rounded-xl bg-surface dark:bg-surface shadow-elevation-low card-hover hover:border-accent/20 hover:shadow-elevation-mid text-center min-h-[100px]"
        >
          <span className="mb-2">
            {act.icon}
          </span>
          <span className="text-xs font-bold text-navy dark:text-surface">
            {act.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
export default QuickActions;
