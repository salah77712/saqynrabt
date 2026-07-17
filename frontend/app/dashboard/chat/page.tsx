'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, ClipboardList } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { useLocale } from '../../providers';
import { Button } from '@/components/shadcn/button';
import { Card } from '@/components/shadcn/card';
import { Input } from '../../../components/ui/Input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shadcn/dialog';
import { Badge } from '../../../components/ui/Badge';
import { Skeleton, SkeletonCard } from '../../../components/ui/Skeleton';
import { EmptyStateWithRetry } from '../../../components/ui/EmptyState';
import { useChatHistory } from '../../../hooks/queries/useChatHistory';
import { PullToRefresh } from '../../../components/PullToRefresh';
import { useGlobalToast } from '../../../lib/toast';

interface KnowledgeGap {
id: string;
question: string;
count: number;
}

export default function ChatbotDashboardPage() {
const { locale } = useLocale();
const { addToast } = useGlobalToast();
const t = (en: string, ar: string) => locale === 'ar' ? (ar || en) : en;

const [gaps, setGaps] = useState<KnowledgeGap[]>([]);
const [gapsLoading, setGapsLoading] = useState(true);
const [gapsError, setGapsError] = useState(false);
const [selectedGap, setSelectedGap] = useState<string | null>(null);
const [isGapModalOpen, setIsGapModalOpen] = useState(false);
const [showGapsSheet, setShowGapsSheet] = useState(false);
const [chatInput, setChatInput] = useState('');
const messagesEndRef = useRef<HTMLDivElement>(null);

const { data: chatHistory, isLoading: historyLoading } = useChatHistory();

const scrollToBottom = useCallback(() => {
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, []);

const fetchGaps = useCallback(async () => {
try {
setGapsError(false);
const res = await fetch('/api/knowledge-gaps');
const data = await res.json();
if (Array.isArray(data)) {
setGaps(data);
} else if (data && Array.isArray(data.gaps)) {
setGaps(data.gaps);
} else {
setGaps([]);
}
} catch {
setGapsError(true);
setGaps([]);
} finally {
setGapsLoading(false);
}
}, []);

useEffect(() => {
fetchGaps();
const interval = setInterval(fetchGaps, 30_000);
return () => clearInterval(interval);
}, [fetchGaps]);

const { messages, sendMessage, status } = useChat({
messages: [
{
id: 'welcome-msg',
role: 'system',
parts: [{ type: 'text' as const, text: locale === 'ar'
? 'Ù…Ø±Ø­Ø¨Ø§Ù‹! Ø£Ù†Ø§ Ù…Ø³Ø§Ø¹Ø¯ Ø§Ù„Ù…Ø¹Ø±ÙØ© Ø§Ù„Ø¯Ø§Ø®Ù„ÙŠ Ù„Ø´Ø±ÙƒØ© SAQYN RABT. Ø§Ø³Ø£Ù„Ù†ÙŠ Ø£ÙŠ Ø³Ø¤Ø§Ù„ Ø­ÙˆÙ„ Ø§Ù„Ù…ÙˆØ§Ø±Ø¯ Ø§Ù„Ø¨Ø´Ø±ÙŠØ©ØŒ Ø£Ùˆ Ø³ÙŠØ§Ø³Ø§Øª Ø§Ù„ØªØ´ØºÙŠÙ„.'
: 'Welcome! I am the SAQYN RABT Internal Staff Knowledge Assistant. Ask me anything about HR policies, SOPs, or company guidelines.' }],
},
],
});
const isLoading = status === 'submitted';
const getMessageText = (msg: typeof messages[number]) =>
  msg.parts?.map(p => (p as any).type === 'text' ? (p as any).text : '').filter(Boolean).join('') || '';

useEffect(() => {
scrollToBottom();
}, [messages, scrollToBottom]);

const handleRefresh = useCallback(async () => {
return new Promise<void>((resolve) => {
setTimeout(resolve, 800);
});
}, []);

const copyToClipboard = useCallback((text: string) => {
navigator.clipboard.writeText(text).then(() => {
addToast(t('Copied to clipboard', 'ØªÙ… Ø§Ù„Ù†Ø³Ø® Ø¥Ù„Ù‰ Ø§Ù„Ø­Ø§ÙØ¸Ø©'), 'success');
});
}, [t]);

const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
const handleTouchStart = useCallback((text: string) => {
longPressTimer.current = setTimeout(() => {
copyToClipboard(text);
}, 500);
}, [copyToClipboard]);

const handleTouchEnd = useCallback(() => {
if (longPressTimer.current) {
clearTimeout(longPressTimer.current);
longPressTimer.current = null;
}
}, []);

if (historyLoading) {
return (
<div className="animate-fadeIn">
<div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8">
<SkeletonCard />
<div className="hidden xl:block">
<SkeletonCard />
</div>
</div>
</div>
);
}

return (
<PullToRefresh onRefresh={handleRefresh}>
<div className="animate-fadeIn">
<div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8">
<Card className="flex flex-col overflow-hidden p-0 h-[500px] xl:h-[650px]">
<div className="px-4 md:px-6 py-3 md:py-4 border-b border-primary/10 bg-surface flex items-center justify-between shrink-0">
<div className="flex-1 min-w-0">
<h2 className="text-xs md:text-sm font-black text-primary uppercase truncate">
{t('Staff Knowledge Assistant', 'Ù…Ø³Ø§Ø¹Ø¯ Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†')}
</h2>
<p className="text-[9px] md:text-[10px] text-primary font-bold mt-0.5 truncate">
{t('Answers from your documents only', 'Ø¥Ø¬Ø§Ø¨Ø§Øª Ù…ÙˆØ«ÙˆÙ‚Ø© ÙˆÙ…Ø³ØªØ®Ø±Ø¬Ø© Ù…Ù† Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª ÙÙ‚Ø·')}
</p>
</div>
<div className="flex items-center gap-3">
{isLoading && (
<span className="inline-flex items-center gap-1 text-royal">
{[0, 160, 320].map((delay) => (
<span
key={delay}
className="inline-block w-1.5 h-1.5 bg-current rounded-full animate-bounce"
style={{ animationDelay: `${delay}ms` }}
/>
))}
</span>
)}
<button
onClick={() => setShowGapsSheet(true)}
aria-label={t('Show knowledge gaps', 'Ø¹Ø±Ø¶ ÙØ¬ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ©')}
 className="xl:hidden w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-primary text-primary transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 min-h-[44px] min-w-[44px] px-6 font-bold"
>
<ClipboardList className="w-4 h-4 text-primary" />
</button>
</div>
</div>

<div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-surface"
style={{ WebkitOverflowScrolling: 'touch' }}
aria-live="polite"
aria-label={t('Chat messages', 'Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù…Ø­Ø§Ø¯Ø«Ø©')}>
{messages.filter((m) => m.role !== 'system').map((msg) => (
<div
key={msg.id}
className={`flex flex-col ${
(msg.role as string) === 'user' ? 'ms-auto items-end' : 'me-auto items-start'
}`}
style={{ maxWidth: '85%' }}
onTouchStart={() => handleTouchStart(getMessageText(msg))}
onTouchEnd={handleTouchEnd}
onContextMenu={(e) => {
e.preventDefault();
copyToClipboard(getMessageText(msg));
}}
>
<div
className={`p-3 md:p-4 rounded-xl text-[11px] md:text-xs font-semibold leading-relaxed shadow-sm ${
(msg.role as string) === 'user'
? 'bg-primary text-surface rounded-be-none'
: 'bg-surface text-primary border border-primary/10 rounded-bs-none'
}`}
>
{getMessageText(msg)}
</div>
</div>
))}
<div ref={messagesEndRef} />
</div>

<form onSubmit={(e) => { e.preventDefault(); sendMessage({ text: chatInput }); setChatInput(''); }} className="p-3 md:p-4 border-t border-primary/10 bg-surface shrink-0">
<div className="flex items-center gap-3 md:gap-4">
<Input
value={chatInput}
onChange={(e) => setChatInput(e.target.value)}
placeholder={t('Ask a question...', 'Ø§Ø³Ø£Ù„ Ø³Ø¤Ø§Ù„Ø§Ù‹...')}
className="min-h-[44px] text-xs md:text-sm"
/>
<Button type="submit" disabled={isLoading || !chatInput} className="min-h-[44px] min-w-[44px] whitespace-nowrap text-xs md:text-sm py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95">
{t('Send', 'Ø¥Ø±Ø³Ø§Ù„')}
</Button>
</div>
</form>
</Card>

<Card className="hidden xl:flex flex-col justify-between p-8">
<div className="space-y-4">
<div className="pb-3 border-b border-primary/10">
<h3 className="text-sm font-black text-primary uppercase tracking-wide">
{t('Unanswered Questions', 'ÙØ¬ÙˆØ§Øª Ù…Ø¹Ø±ÙØ© Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ†')}
</h3>
<p className="text-[10px] text-primary font-bold mt-1">
{t('Questions your team asked that the AI couldn\'t answer. Upload docs to fill the gaps.', 'Ø§Ø³ØªÙØ³Ø§Ø±Ø§Øª Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† ØºÙŠØ± Ø§Ù„Ù…Ø¬Ø§Ø¨Ø©. ÙŠØ±Ø¬Ù‰ ØªØ­Ø¯ÙŠØ« Ø§Ù„Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª Ù„ØªØºØ·ÙŠØªÙ‡Ø§.')}
</p>
</div>

{gapsLoading ? (
<div className="space-y-3">
{[1, 2, 3].map((i) => (
<Skeleton key={i} variant="rectangular" className="h-16 w-full" />
))}
</div>
) : gapsError ? (
<p className="text-xs text-primary">
{t('Could not load knowledge gaps.', 'ØªØ¹Ø°Ø± ØªØ­Ù…ÙŠÙ„ ÙØ¬ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ©.')}
</p>
) : gaps.length === 0 ? (
<p className="text-xs text-primary">
{t('No knowledge gaps detected yet. Ask questions to identify gaps.', 'Ù„Ù… ÙŠØªÙ… Ø§ÙƒØªØ´Ø§Ù Ø£ÙŠ ÙØ¬ÙˆØ§Øª Ù…Ø¹Ø±ÙÙŠØ© Ø¨Ø¹Ø¯. Ø§Ø·Ø±Ø­ Ø£Ø³Ø¦Ù„Ø© Ù„ØªØ­Ø¯ÙŠØ¯ Ø§Ù„ÙØ¬ÙˆØ§Øª.')}
</p>
) : (
<div className="space-y-3">
{gaps.map((gap) => (
<div
key={gap.id}
onClick={() => {
setSelectedGap(gap.question);
setIsGapModalOpen(true);
}}
onKeyDown={(e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
setSelectedGap(gap.question);
setIsGapModalOpen(true);
}
}}
role="button"
tabIndex={0}
className="bg-surface border border-primary/10 rounded-xl p-3.5 hover:border-royal transition-all cursor-pointer flex items-start justify-between gap-4"
>
<p className="text-xs font-bold text-primary leading-normal">
&ldquo;{gap.question}&rdquo;
</p>
<Badge variant="warning">{gap.count}x</Badge>
</div>
))}
</div>
)}
</div>

<Button variant="outline" className="w-full mt-6 min-h-[44px] py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={() => setIsGapModalOpen(true)}>
{t('Review Gaps', 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø§Ù„ÙØ¬ÙˆØ§Øª')}
</Button>
</Card>
</div>

{showGapsSheet && (
<div className="fixed inset-0 z-50 flex items-end xl:hidden">
<div className="fixed inset-0 bg-black backdrop-blur-sm" onClick={() => setShowGapsSheet(false)} />
<div className="relative w-full bg-surface rounded-t-2xl shadow-2xl max-h-[70vh] overflow-y-auto animate-fadeIn p-5"
style={{ paddingBottom: 'calc(16px + env(safe-area-inset-bottom, 0px))' }}>
<div className="flex items-center justify-between mb-4">
<h3 className="text-sm font-black text-primary uppercase tracking-wide">
{t('Knowledge Gaps', 'ÙØ¬ÙˆØ§Øª Ø§Ù„Ù…Ø¹Ø±ÙØ©')}
</h3>
<button
onClick={() => setShowGapsSheet(false)}
className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-primary text-primary transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 min-h-[44px] min-w-[44px] px-6 font-bold"
>
<X className="w-4 h-4" />
</button>
</div>
<div className="space-y-3">
{gapsLoading ? (
<Skeleton variant="rectangular" className="h-32 w-full" />
) : gaps.length === 0 ? (
<p className="text-xs text-primary">
{t('No gaps detected.', 'Ù„Ù… ÙŠØªÙ… Ø§ÙƒØªØ´Ø§Ù Ø£ÙŠ ÙØ¬ÙˆØ§Øª.')}
</p>
) : (
gaps.map((gap) => (
<div
key={gap.id}
onClick={() => {
setSelectedGap(gap.question);
setIsGapModalOpen(true);
}}
onKeyDown={(e) => {
if (e.key === 'Enter' || e.key === ' ') {
e.preventDefault();
setSelectedGap(gap.question);
setIsGapModalOpen(true);
}
}}
role="button"
tabIndex={0}
className="bg-surface border border-primary/10 rounded-xl p-3.5 flex items-start justify-between gap-4"
>
<p className="text-xs font-bold text-primary leading-normal">
&ldquo;{gap.question}&rdquo;
</p>
<Badge variant="warning">{gap.count}x</Badge>
</div>
))
)}
</div>
<Button variant="outline" className="w-full mt-4 min-h-[44px] py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={() => setIsGapModalOpen(true)}>
{t('Review All Gaps', 'Ù…Ø±Ø§Ø¬Ø¹Ø© Ø¬Ù…ÙŠØ¹ Ø§Ù„ÙØ¬ÙˆØ§Øª')}
</Button>
</div>
</div>
)}

<Dialog open={isGapModalOpen} onOpenChange={(open) => !open && setIsGapModalOpen(false)}>
<DialogContent>
<DialogHeader>
<DialogTitle>Resolve Knowledge Gap</DialogTitle>
</DialogHeader>
<p className="text-xs text-primary mb-4 leading-relaxed">
{t(
'The following query was not answered by the current indexed documents. Upload a PDF containing the correct policy details to fix this.',
'ØªÙ… Ø·Ø±Ø­ Ù‡Ø°Ø§ Ø§Ù„Ø³Ø¤Ø§Ù„ Ù…Ù† Ù‚Ø¨Ù„ Ø§Ù„Ù…ÙˆØ¸ÙÙŠÙ† ÙˆÙ„ÙƒÙ† ØªØ¹Ø°Ø± Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø© Ø¹Ù„ÙŠÙ‡ Ø¨Ù†Ø§Ø¡Ù‹ Ø¹Ù„Ù‰ Ø§Ù„Ù…Ø³ØªÙ†Ø¯Ø§Øª Ø§Ù„Ø­Ø§Ù„ÙŠØ©.'
)}
</p>
<div className="bg-surface border border-primary/10 rounded-xl p-4 mb-6">
<p className="text-sm font-bold text-primary">
&ldquo;{selectedGap || (gaps.length > 0 ? gaps[0].question : t('No question selected', 'Ù„Ù… ÙŠØªÙ… ØªØ­Ø¯ÙŠØ¯ Ø³Ø¤Ø§Ù„'))}&rdquo;
</p>
</div>
<div className="flex gap-4">
<Button variant="default" className="flex-1 min-h-[44px] py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={() => setIsGapModalOpen(false)}>
Upload Document
</Button>
<Button variant="outline" className="min-h-[44px] py-3 px-6 rounded-xl font-bold transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={() => setIsGapModalOpen(false)}>
Cancel
</Button>
</div>
</DialogContent>
</Dialog>
</div>
</PullToRefresh>
);
}