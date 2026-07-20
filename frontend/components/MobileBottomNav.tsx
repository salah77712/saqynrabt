'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from '../app/providers';
import { Home, Zap, MessageSquare, Users, Settings } from 'lucide-react';

const navItems = [
{ name: { en: 'Home', ar: 'الرئيسية' }, path: '/dashboard', icon: <Home className="w-5 h-5" /> },
{ name: { en: 'Automation', ar: 'الأتمتة' }, path: '/dashboard/automation', icon: <Zap className="w-5 h-5" /> },
{ name: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
{ name: { en: 'Team', ar: 'الفريق' }, path: '/dashboard/team', icon: <Users className="w-5 h-5" /> },
{ name: { en: 'Settings', ar: 'الإعدادات' }, path: '/dashboard/settings', icon: <Settings className="w-5 h-5" /> },
];

interface MobileBottomNavProps {
userRole?: string;
}

export function MobileBottomNav({ userRole = 'employee' }: MobileBottomNavProps) {
const pathname = usePathname();
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const filteredNavItems = userRole === 'employee'
? [
  { name: { en: 'Chat', ar: 'المحادثة' }, path: '/dashboard/chat', icon: <MessageSquare className="w-5 h-5" /> },
  { name: { en: 'Workflows', ar: 'سير العمل' }, path: '/dashboard/workflows', icon: <Zap className="w-5 h-5" /> },
  ]
: navItems;

return (
<nav
aria-label="Mobile navigation"
className="fixed bottom-0 start-0 end-0 z-50 bg-surface/80 dark:bg-background/80 backdrop-blur-xl border-t border-primary/10 md:hidden shadow-lg"
style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)', height: 'calc(64px + env(safe-area-inset-bottom, 0px))' }}
>
<div className="flex justify-around items-center h-16 px-2">
{filteredNavItems.map((item) => {
const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
return (
<Link
key={item.path}
href={item.path}
aria-label={t(item.name.en, item.name.ar)}
className={`relative flex flex-1 flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] gap-0.5 rounded-lg transition-colors ${
isActive ? 'text-primary' : 'text-primary/40'
}`}
>
{isActive && (
<span className="absolute top-0 start-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
)}
{item.icon}
<span className={`text-xs font-bold uppercase tracking-wider ${
isActive ? 'text-primary' : 'text-primary/40'
}`}>
{t(item.name.en, item.name.ar)}
</span>
</Link>
);
})}
</div>
</nav>
);
}

export default MobileBottomNav;
