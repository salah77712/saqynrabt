'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../../../providers';

interface WebhookItem {
  id: string;
  url: string;
  events: string[];
  created_at: string;
}

export default function WebhooksSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [url, setUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['booking.created']);
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  const apiFetch = (path: string, options?: RequestInit) =>
    fetch(`/api/webhooks-outgoing${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

  const fetchWebhooks = () => {
    setLoading(true);
    apiFetch('')
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setWebhooks(data);
        } else if (data && Array.isArray(data.webhooks)) {
          setWebhooks(data.webhooks);
        }
      })
      .catch(err => {
        console.warn('Failed to load webhooks:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWebhooks();
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setRegistering(true);
    apiFetch('', {
      method: 'POST',
      body: JSON.stringify({ url, events: selectedEvents }),
    })
      .then(res => res.json())
      .then(() => {
        setUrl('');
        fetchWebhooks();
      })
      .catch(err => {
        console.error('Failed to register webhook:', err);
      })
      .finally(() => setRegistering(false));
  };

  const handleToggleEvent = (event: string) => {
    setSelectedEvents(prev =>
      prev.includes(event) ? prev.filter(e => e !== event) : [...prev, event]
    );
  };

  const handleDelete = (id: string) => {
    if (!confirm(t({ en: 'Are you sure you want to delete this webhook destination?', ar: 'هل أنت متأكد من حذف وجهة الويب هوك هذه؟' }))) {
      return;
    }

    apiFetch(`?id=${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setWebhooks(prev => prev.filter(w => w.id !== id));
      })
      .catch(err => {
        console.error('Delete failed:', err);
      });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Webhooks', ar: 'تسجيل روابط الويب هوك الصادرة' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Send real-time updates to your own systems.', ar: 'تسجيل روابط الويب هوك لاستلام تحديثات فورية حول أحداث مساحة العمل.' })}</p>
      </div>

      {/* Form Register */}
      <form onSubmit={handleRegister} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
        
        <div>
          <label htmlFor="url" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Destination URL', ar: 'Ø§Ù„Ø±Ø§Ø¨Ø· Ø§Ù„Ù…Ø³ØªÙ‡Ø¯Ù' })}</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.yourdomain.com/webhook-receiver"
            className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-primary mb-3">{t({ en: 'Subscribe to Events', ar: 'Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ÙÙŠ Ø§Ù„Ø£Ø­Ø¯Ø§Ø«' })}</label>
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
            {['booking.created', 'complaint.routed', 'chat.answered'].map((event) => (
              <label key={event} className="flex items-center gap-3 cursor-pointer p-3 border border-primary/10 rounded-xl bg-surface hover:border-primary transition-colors">
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event)}
                  onChange={() => handleToggleEvent(event)}
                  className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-2 focus:ring-royal"
                />
                <span className="font-mono text-[10px] text-primary">{event}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={registering}
          className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        >
          {registering ? t({ en: 'Registering...', ar: 'جاري التسجيل...' }) : t({ en: 'Register Destination Webhook', ar: 'تسجيل الويب هوك الصادر' })}
        </button>

      </form>

      {/* Webhooks List */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">{t({ en: 'Active Webhook Endpoints', ar: 'روابط الويب هوك النشطة' })}</h3>

        {loading ? (
          <div className="py-6 flex justify-center">
            <span className="h-6 w-6 rounded-full border-4 border-primary/10 border-t-[#141F33] animate-spin" />
          </div>
        ) : webhooks.length === 0 ? (
          <p className="text-xs text-primary font-semibold text-center py-6">{t({ en: 'No outgoing webhooks registered.', ar: 'لا توجد روابط ويب هوك صادرة حالياً.' })}</p>
        ) : (
          <div className="divide-y divide-[#141F33]/10">
            {webhooks.map((w) => (
              <div key={w.id} className="flex justify-between items-start py-4 first:pt-0 last:pb-0 gap-8">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-primary truncate">{w.url}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.events.map((e) => (
                      <span key={e} className="bg-surface text-primary font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-primary/10">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="text-[10px] font-bold text-primary hover:bg-surface px-3 py-1.5 rounded-lg border border-primary/10 shrink-0"
                >
                  {t({ en: 'Delete', ar: 'حذف' })}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}


