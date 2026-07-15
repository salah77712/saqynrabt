'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLocale } from '../app/providers';

/** All searchable pages for the site-wide search */
const searchIndex = [
{ href: '/', title: 'Home', titleAr: 'الرئيسية', category: 'Pages', keywords: 'home landing main' },
{ href: '/features', title: 'Features', titleAr: 'الميزات', category: 'Product', keywords: 'features product capabilities' },
{ href: '/industries', title: 'Industries', titleAr: 'الصناعات', category: 'Product', keywords: 'industries healthcare hospitality automotive' },
{ href: '/how-it-works', title: 'How It Works', titleAr: 'كيف يعمل', category: 'Product', keywords: 'how it works process steps' },
{ href: '/pricing', title: 'Pricing', titleAr: 'الأسعار', category: 'Product', keywords: 'pricing plans cost tiers' },
{ href: '/faq', title: 'FAQ', titleAr: 'الأسئلة الشائعة', category: 'Support', keywords: 'faq questions answers help' },
{ href: '/about', title: 'About', titleAr: 'عنا', category: 'Company', keywords: 'about company team mission' },
{ href: '/contact', title: 'Contact', titleAr: 'اتصل بنا', category: 'Company', keywords: 'contact sales email phone' },
{ href: '/case-studies', title: 'Case Studies', titleAr: 'دراسات الحالة', category: 'Company', keywords: 'case studies success stories' },
{ href: '/global', title: 'Global Presence', titleAr: 'الوجود العالمي', category: 'Company', keywords: 'global regions expansion' },
{ href: '/changelog', title: 'Changelog', titleAr: 'سجل التغييرات', category: 'Product', keywords: 'changelog updates releases' },
{ href: '/dashboard', title: 'Dashboard', titleAr: 'لوحة التحكم', category: 'App', keywords: 'dashboard overview home' },
{ href: '/dashboard/automation', title: 'Automation Dashboard', titleAr: 'لوحة الأتمتة', category: 'App', keywords: 'automation calls queue routing' },
{ href: '/dashboard/chat', title: 'Chat Assistant', titleAr: 'المساعد الذكي', category: 'App', keywords: 'chat assistant rag ai' },
{ href: '/dashboard/documents', title: 'Documents', titleAr: 'المستندات', category: 'App', keywords: 'documents upload files pdf' },
{ href: '/dashboard/approvals', title: 'Approvals', titleAr: 'الموافقات', category: 'App', keywords: 'approvals employees pending' },
{ href: '/dashboard/settings', title: 'Settings', titleAr: 'الإعدادات', category: 'App', keywords: 'settings account profile' },
{ href: '/help/getting-started', title: 'Getting Started', titleAr: 'البدء', category: 'Help', keywords: 'getting started setup onboarding' },
{ href: '/help/automation', title: 'Automation Help', titleAr: 'مساعدة الأتمتة', category: 'Help', keywords: 'automation help guide' },
{ href: '/help/chatbot', title: 'Chatbot Help', titleAr: 'مساعدة المساعد الذكي', category: 'Help', keywords: 'chatbot help guide rag' },
{ href: '/help/billing', title: 'Billing Help', titleAr: 'مساعدة الفوترة', category: 'Help', keywords: 'billing payment invoice' },
{ href: '/developers', title: 'Developers', titleAr: 'المطورين', category: 'Developers', keywords: 'developers api sdk' },
{ href: '/developers/api-docs', title: 'API Documentation', titleAr: 'وثائق API', category: 'Developers', keywords: 'api docs documentation reference' },
{ href: '/developers/plugins', title: 'Plugins', titleAr: 'الإضافات', category: 'Developers', keywords: 'plugins extensions marketplace' },
{ href: '/marketplace', title: 'Marketplace', titleAr: 'السوق', category: 'Product', keywords: 'marketplace integrations apps' },
{ href: '/privacy-policy', title: 'Privacy Policy', titleAr: 'سياسة الخصوصية', category: 'Legal', keywords: 'privacy policy data gdpr' },
{ href: '/terms-and-conditions', title: 'Terms & Conditions', titleAr: 'الشروط والأحكام', category: 'Legal', keywords: 'terms conditions legal agreement' },
];

interface SearchOverlayProps {
isOpen: boolean;
onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
const { locale } = useLocale();
const [query, setQuery] = useState('');
const [selectedIndex, setSelectedIndex] = useState(0);
const inputRef = useRef<HTMLInputElement>(null);
const resultsRef = useRef<HTMLDivElement>(null);

const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

// Filter results
const results = query.trim()
? searchIndex.filter((item) => {
  const q = query.toLowerCase();
  return (
  item.title?.toLowerCase().includes(q) ||
  item.titleAr.includes(query) ||
  item.keywords?.toLowerCase().includes(q) ||
  item.href?.toLowerCase().includes(q)
  );
})
: [];

// Reset selection when results change
useEffect(() => {
setSelectedIndex(0);
}, [results.length]);

// Focus input on open
useEffect(() => {
if (isOpen) {
  setQuery('');
  setSelectedIndex(0);
  // Small delay to ensure DOM is ready
  const timer = setTimeout(() => inputRef.current?.focus(), 50);
  return () => clearTimeout(timer);
}
}, [isOpen]);

// Keyboard navigation
const handleKeyDown = useCallback(
(e: React.KeyboardEvent) => {
  if (e.key === 'Escape') {
  onClose();
  return;
  }
  if (e.key === 'ArrowDown') {
  e.preventDefault();
  setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
  }
  if (e.key === 'ArrowUp') {
  e.preventDefault();
  setSelectedIndex((prev) => Math.max(prev - 1, 0));
  }
  if (e.key === 'Enter' && results[selectedIndex]) {
  onClose();
  window.location.href = results[selectedIndex].href;
  }
},
[results, selectedIndex, onClose]
);

// Scroll selected item into view
useEffect(() => {
const container = resultsRef.current;
if (!container) return;
const selected = container.children[selectedIndex] as HTMLElement | undefined;
if (selected) {
  selected.scrollIntoView({ block: 'nearest' });
}
}, [selectedIndex]);

if (!isOpen) return null;

// Group results by category
const grouped = results.reduce<Record<string, typeof searchIndex>>((acc, item) => {
if (!acc[item.category]) acc[item.category] = [];
acc[item.category].push(item);
return acc;
}, {});

let flatIndex = -1;

return (
<div
className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 search-backdrop bg-[#141F33]"
onClick={(e) => {
if (e.target === e.currentTarget) onClose();
}}
role="dialog"
aria-modal="true"
aria-label={t('Search', 'بحث')}
>
<div className="w-full max-w-xl bg-[#F8F9FB] rounded-[40px] shadow-2xl border border-[#141F33]/10 overflow-hidden animate-slideDown">
{/* Search Input */}
<div className="flex items-center gap-4 px-5 py-4 border-b border-[#141F33]/10">
<svg className="h-5 w-5 text-[#141F33]/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<circle cx="11" cy="11" r="8" />
<path d="m21 21-4.35-4.35" strokeLinecap="round" />
</svg>
<input
ref={inputRef}
type="text"
value={query}
onChange={(e) => setQuery(e.target.value)}
onKeyDown={handleKeyDown}
placeholder={t('Search pages, help, and docs...', 'ابحث في الصفحات والمساعدة والوثائق...')}
className="flex-1 bg-transparent text-[#141F33] text-sm font-medium placeholder:text-[#141F33]/40 outline-none min-h-[36px]"
autoComplete="off"
spellCheck={false}
/>
<kbd className="hidden sm:inline-flex items-center gap-1 rounded-md border border-[#141F33]/10 bg-[#F8F9FB] px-2 py-1 text-[10px] font-bold text-[#141F33]/60 tracking-wider">
ESC
</kbd>
</div>

{/* Results */}
<div
ref={resultsRef}
className="max-h-[50vh] overflow-y-auto"
>
{query.trim() && results.length === 0 && (
<div className="px-5 py-8 text-center">
<p className="text-sm text-[#141F33]/60 font-medium">
{t('No results found for', 'لا توجد نتائج لـ')} &quot;{query}&quot;
</p>
<p className="text-xs text-[#141F33]/40 mt-2">
{t('Try a different search term', 'جرب مصطلح بحث مختلف')}
</p>
</div>
)}

{Object.entries(grouped).map(([category, items]) => (
<div key={category}>
<div className="px-5 pt-3 pb-1">
<span className="text-[10px] font-extrabold uppercase tracking-widest text-[#141F33]/60">
{category}
</span>
</div>
{items.map((item) => {
  flatIndex++;
  const idx = flatIndex;
  return (
  <Link
  key={item.href}
  href={item.href}
  onClick={onClose}
  className={`flex items-center gap-4 px-5 py-3 transition-colors ${
  idx === selectedIndex
  ? 'bg-[#141F33] text-[#141F33]'
  : 'text-[#141F33]/70 hover:bg-[#141F33]'
  }`}
  >
  <PageIcon />
  <div className="flex-1 min-w-0">
  <p className="text-sm font-semibold truncate">
  {locale === 'ar' ? item.titleAr : item.title}
  </p>
  <p className="text-xs text-[#141F33]/60 truncate">{item.href}</p>
  </div>
  <svg
  className="h-4 w-4 text-[#141F33]/40 flex-shrink-0 rtl:rotate-180"
  viewBox="0 0 20 20"
  fill="currentColor"
  >
  <path
  fillRule="evenodd"
  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
  clipRule="evenodd"
  />
  </svg>
  </Link>
  );
})}
</div>
))}

{/* Empty state (no query yet) */}
{!query.trim() && (
<div className="px-5 py-6 text-center">
<p className="text-sm text-[#141F33]/60 font-medium">
{t('Start typing to search…', 'ابدأ بالكتابة للبحث…')}
</p>
<div className="mt-4 flex flex-wrap justify-center gap-3">
{['Features', 'Pricing', 'Help', 'API'].map((tag) => (
<button
key={tag}
type="button"
onClick={() => setQuery(tag)}
className="rounded-full border border-[#141F33]/10 bg-[#F8F9FB] px-3 py-1.5 text-xs font-semibold text-[#141F33]/60 hover:bg-[#141F33] transition-colors min-h-[44px]"
>
{tag}
</button>
))}
</div>
</div>
)}
</div>

{/* Footer */}
<div className="flex items-center justify-between px-5 py-3 border-t border-[#141F33]/10 bg-[#F8F9FB]">
<div className="flex items-center gap-4 text-[10px] font-bold text-[#141F33]/60 uppercase tracking-wider">
<span className="flex items-center gap-1">
<kbd className="rounded border border-[#141F33]/10 bg-[#F8F9FB] px-1.5 py-0.5">↑↓</kbd>
{t('Navigate', 'تنقل')}
</span>
<span className="flex items-center gap-1">
<kbd className="rounded border border-[#141F33]/10 bg-[#F8F9FB] px-1.5 py-0.5">Enter</kbd>
{t('Open', 'افتح')}
</span>
</div>
<span className="text-[10px] font-bold text-[#141F33]/60 uppercase tracking-wider">
{t('Powered by SAQYN', 'مدعوم من ساقين')}
</span>
</div>
</div>
</div>
);
}

function PageIcon() {
return (
<svg className="h-4 w-4 text-[#141F33]/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
<path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
</svg>
);
}
