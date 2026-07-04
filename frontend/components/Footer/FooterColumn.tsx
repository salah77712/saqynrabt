import * as React from 'react';
import Link from 'next/link';

interface FooterColumnProps {
  title: string;
  links: Array<{ href: string; label: string }>;
}

export function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">
        {title}
      </h3>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 font-medium hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
