'use client';

import React, { useState } from 'react';
import { useLocale } from '../app/providers';
import { Bell, Check } from 'lucide-react';

interface Notification {
id: string;
title: string;
titleAr: string;
time: string;
read: boolean;
}

export function NotificationCenter() {
const { locale } = useLocale();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const [isOpen, setIsOpen] = useState(false);
const [list, setList] = useState<Notification[]>([
{ id: '1', title: 'New Employee registration request', titleAr: 'Ø·Ù„Ø¨ ØªØ³Ø¬ÙŠÙ„ Ù…ÙˆØ¸Ù Ø¬Ø¯ÙŠØ¯', time: '5m', read: false },
{ id: '2', title: 'Overage limit reached 80%', titleAr: 'ØªÙ… Ø¨Ù„ÙˆØº 80% Ù…Ù† Ø­Ø¯ Ø§Ù„Ø¨Ø§Ù‚Ø©', time: '1h', read: false },
{ id: '3', title: 'Late checkout query resolved', titleAr: 'ØªÙ… Ø­Ù„ Ø§Ø³ØªÙØ³Ø§Ø± Ø§Ù„Ù…ØºØ§Ø¯Ø±Ø© Ø§Ù„Ù…ØªØ£Ø®Ø±Ø©', time: '3h', read: true },
]);

const toggleOpen = () => setIsOpen((prev) => !prev);

const markAllRead = () => {
setList((prev) => prev.map((item) => ({ ...item, read: true })));
};

const unreadCount = list.filter((n) => !n.read).length;

return (
<div className="relative">
<button
onClick={toggleOpen}
className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-primary dark:hover:bg-accent transition-all duration-300 min-h-[44px] min-w-[44px]"
aria-label="Open notifications"
>
<Bell className="w-5 h-5 text-primary dark:text-surface" />
{unreadCount > 0 && (
<span className="absolute top-0.5 end-0.5 bg-primary text-surface text-xs font-black h-4 w-4 rounded-full flex items-center justify-center border border-surface">
{unreadCount}
</span>
)}
</button>

{isOpen && (
<div className="absolute end-0 rtl:end-auto rtl:start-0 mt-3 w-80 bg-surface dark:bg-primary border border-primary/10 dark:border-surface/10 rounded-xl shadow-xl z-50 overflow-hidden animate-slideDown">
<div className="flex items-center justify-between px-4 py-3 border-b border-primary/10 dark:border-surface/10 bg-surface dark:bg-primary">
<span className="text-xs font-bold text-primary dark:text-surface">
            {t('Notifications', 'Ø§Ù„Ø¥Ø´Ø¹Ø§Ø±Ø§Øª')}
</span>
{unreadCount > 0 && (
<button
onClick={markAllRead}
className="text-xs font-extrabold text-accent hover:underline uppercase"
>
{t('Mark all read', 'ØªØ­Ø¯ÙŠØ¯ Ø§Ù„ÙƒÙ„ ÙƒÙ…Ù‚Ø±ÙˆØ¡')}
</button>
)}
</div>
<div className="max-h-72 overflow-y-auto">
{list.map((item) => (
<div
key={item.id}
className={`px-4 py-3 border-b border-primary/5 dark:border-surface/10 flex items-start gap-3.5 transition-colors ${
item.read ? 'opacity-70' : 'bg-primary'
}`}
>
<span className="text-sm mt-0.5">{item.read ? <Check className="w-4 h-4 text-primary/30 dark:text-surface/40" /> : <Bell className="w-4 h-4 text-accent" />}</span>
<div className="flex-1 min-w-0">
<p className="text-xs font-bold text-primary dark:text-surface leading-normal">
{t(item.title, item.titleAr)}
</p>
<p className="text-xs text-primary/60 dark:text-surface/60 font-semibold mt-1">
{item.time}
</p>
</div>
</div>
))}
</div>
</div>
)}
</div>
);
}
