import * as React from 'react';
import Link from 'next/link';

interface FooterColumnProps {
  title: string;
  links: Array<{ href: string; label: string }>;
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-primary/55">
        {title}
      </h3>
      <ul className="flex flex-col gap-4">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs font-medium tracking-wide text-primary/85 hover:text-royal transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
