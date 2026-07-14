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
{ id: '1', title: 'New Employee registration request', titleAr: 'طلب تسجيل موظف جديد', time: '5m', read: false },
{ id: '2', title: 'Overage limit reached 80%', titleAr: 'تم بلوغ 80% من حد الباقة', time: '1h', read: false },
{ id: '3', title: 'Late checkout query resolved', titleAr: 'تم حل استفسار المغادرة المتأخرة', time: '3h', read: true },
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
className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-[#141F33]/5 transition-colors"
aria-label="Open notifications"
>
<Bell className="w-5 h-5 text-[#141F33]" />
{unreadCount > 0 && (
<span className="absolute top-0.5 right-0.5 bg-[#141F33] text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center border border-[#F8F9FB]">
{unreadCount}
</span>
)}
</button>

{isOpen && (
<div className="absolute right-0 rtl:right-auto rtl:left-0 mt-2 w-80 bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl shadow-xl z-50 overflow-hidden animate-slideDown">
<div className="flex items-center justify-between px-4 py-3 border-b border-[#141F33]/10 bg-[#F8F9FB]/50">
<span className="text-xs font-bold text-[#141F33]">
{t('Notifications', 'الإشعارات')}
</span>
{unreadCount > 0 && (
<button
onClick={markAllRead}
className="text-[10px] font-extrabold text-[#2A5CFF] hover:underline uppercase"
>
{t('Mark all read', 'تحديد الكل كمقروء')}
</button>
)}
</div>
<div className="max-h-72 overflow-y-auto">
{list.map((item) => (
<div
key={item.id}
className={`px-4 py-3 border-b border-[#141F33]/5 flex items-start gap-2.5 transition-colors ${
item.read ? 'opacity-70' : 'bg-[#141F33]/5'
}`}
>
<span className="text-sm mt-0.5">{item.read ? <Check className="w-4 h-4 text-[#141F33]/30" /> : <Bell className="w-4 h-4 text-[#2A5CFF]" />}</span>
<div className="flex-1 min-w-0">
<p className="text-xs font-bold text-[#141F33] leading-normal">
{t(item.title, item.titleAr)}
</p>
<p className="text-[10px] text-[#141F33]/60 font-semibold mt-1">
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
