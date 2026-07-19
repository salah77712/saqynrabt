'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../../providers';
import { EmptyState } from '../../../components/ui/EmptyState';
import { Inbox } from 'lucide-react';

interface OmnichannelMessage {
id: string;
sender: string;
body: string;
channel: 'WhatsApp' | 'SMS' | 'WebChat' | 'Email';
timestamp: string;
}

const MOCK_MESSAGES: OmnichannelMessage[] = [
{ id: 'm-1', sender: '+974 5555 1234', body: 'I need to cancel my booking.', channel: 'WhatsApp', timestamp: '2026-07-04T12:00:00Z' },
{ id: 'm-2', sender: 'support@alsafa.qa', body: 'SOP file is missing in chatbot chunks.', channel: 'Email', timestamp: '2026-07-04T12:05:00Z' },
];

export default function OmnichannelInboxPage() {
const { locale } = useLocale();
const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

const [messages, setMessages] = useState<OmnichannelMessage[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(false);
const [filterChannel, setFilterChannel] = useState<string>('All');
const [lastUpdated, setLastUpdated] = useState<number | null>(null);

const fetchMessages = () => {
fetch('/api/chat/history')
.then(res => res.json())
.then((data: any) => {
const list = Array.isArray(data) ? data : data?.messages || data?.history || [];
if (list.length > 0) {
setMessages(list.slice(0, 20));
} else {
setMessages(MOCK_MESSAGES);
}
setLastUpdated(Date.now());
})
.catch(() => {
setError(true);
setMessages(MOCK_MESSAGES);
setLastUpdated(Date.now());
})
.finally(() => setLoading(false));
};

useEffect(() => {
fetchMessages();
const interval = setInterval(fetchMessages, 15000);
return () => clearInterval(interval);
}, []);

const filtered = filterChannel === 'All' ? messages : messages.filter(m => m.channel === filterChannel);

return (
<div className="space-y-6 animate-fadeIn">

{/* Header */}
<div>
<h1 className="text-2xl md:text-3xl font-extrabold text-primary dark:text-surface tracking-tight">{t({ en: 'Inbox', ar: 'صندوق البريد الموحد للقنوات' })}</h1>
<p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'WhatsApp, SMS, web chat, and email — all in one place.', ar: 'تجميع رسائل العملاء من الواتساب، والرسائل النصية، والمحادثات المباشرة، والبريد الإلكتروني.' })}</p>
</div>

{lastUpdated && (
<div className="text-[10px] font-bold text-primary/60 flex items-center gap-1">
{t({en: 'Last updated:', ar: 'آخر تحديث:'})} {new Date(lastUpdated).toLocaleTimeString()}
</div>
)}

{error && (
<div className="bg-surface border border-primary/10 text-accent rounded-xl p-3 text-xs font-semibold">
{t({ en: 'Could not load fresh data. Showing sample messages.', ar: 'تعذر تحميل البيانات الحديثة. يتم عرض رسائل نموذجية.' })}
</div>
)}

{/* Filter Chips */}
<div className="flex gap-3 text-xs font-bold">
{['All', 'WhatsApp', 'Email', 'SMS'].map((ch) => (
<button
key={ch}
onClick={() => setFilterChannel(ch)}
className={`px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] border transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 ${
            filterChannel === ch
              ? 'bg-primary border-primary text-surface'
              : 'bg-surface border-primary/10 text-primary hover:bg-primary'
            }`}
>
{ch}
</button>
))}
</div>

{/* Inbox List */}
<div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
{loading ? (
<p className="text-xs text-primary font-semibold text-center py-6">
{t({ en: 'Loading messages...', ar: 'Ø¬Ø§Ø±ÙŠ ØªØ­Ù…ÙŠÙ„ Ø§Ù„Ø±Ø³Ø§Ø¦Ù„...' })}
</p>
) : filtered.length === 0 ? (
<EmptyState
icon={<Inbox className="w-10 h-10 text-primary/40" />}
              title={t({ en: 'No messages found', ar: 'Ù„Ù… ÙŠØªÙ… Ø§Ù„Ø¹Ø«ÙˆØ± Ø¹Ù„Ù‰ Ø±Ø³Ø§Ø¦Ù„' })}
              description={t({ en: 'Your inbox is empty. Messages from WhatsApp, SMS, email, and web chat will appear here.', ar: 'ØµÙ†Ø¯ÙˆÙ‚ Ø§Ù„Ø¨Ø±ÙŠØ¯ ÙØ§Ø±Øº. Ø³ØªØ¸Ù‡Ø± Ø±Ø³Ø§Ø¦Ù„ Ù…Ù† ÙˆØ§ØªØ³Ø§Ø¨ØŒ Ø§Ù„Ø±Ø³Ø§Ø¦Ù„ Ø§Ù„Ù†ØµÙŠØ©ØŒ Ø§Ù„Ø¨Ø±ÙŠØ¯ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØŒ ÙˆØ§Ù„Ù…Ø­Ø§Ø¯Ø«Ø© Ù‡Ù†Ø§.' })}
compact
/>
) : (
<div className="divide-y divide-[#141F33]/10">
{filtered.map((msg) => (
<div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-start gap-8">
<div className="min-w-0">
<div className="flex items-center gap-3">
<span className="text-xs font-extrabold text-primary">{msg.sender}</span>
<span className="bg-surface text-primary font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary/10">
{msg.channel}
</span>
</div>
<p className="text-xs text-primary font-semibold mt-1 leading-normal">{msg.body}</p>
</div>
<span className="text-[10px] text-primary font-bold shrink-0">{new Date(msg.timestamp).toLocaleTimeString()}</span>
</div>
))}
</div>
)}
</div>

</div>
);
}