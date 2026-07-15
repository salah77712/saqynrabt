'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../../../providers';

interface WebhookItem {
  id: string;
  url: string;
  events: string[];
  created_at: string;
}

export default function WebhooksSettingsPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [webhooks, setWebhooks] = useState<WebhookItem[]>([]);
  const [url, setUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['booking.created']);
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' })
        .then(token => setJwtToken(token))
        .catch(err => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  const fetchWebhooks = () => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    setLoading(true);
    fetch(`${apiBase}/api/webhooks-outgoing`, { headers })
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setWebhooks(data);
        } else if (data && Array.isArray(data.webhooks)) {
          setWebhooks(data.webhooks);
        }
      })
      .catch(err => {
        console.warn('Failed to load webhooks, using mock:', err);
        setWebhooks([
          { id: 'w-1', url: 'https://api.alsafa.qa/webhook-receiver', events: ['booking.created', 'complaint.routed'], created_at: '2026-07-03T10:00:00Z' },
        ]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWebhooks();
  }, [jwtToken]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setRegistering(true);
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/webhooks-outgoing`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ url, events: selectedEvents })
    })
      .then(res => res.json())
      .then(() => {
        setUrl('');
        fetchWebhooks();
      })
      .catch(err => {
        console.error('Failed to register webhook, using mock fallback:', err);
        const mockNew: WebhookItem = {
          id: `w-${Date.now()}`,
          url,
          events: selectedEvents,
          created_at: new Date().toISOString(),
        };
        setWebhooks(prev => [mockNew, ...prev]);
        setUrl('');
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

    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/webhooks-outgoing?id=${id}`, {
      method: 'DELETE',
      headers
    })
      .then(res => res.json())
      .then(() => {
        setWebhooks(prev => prev.filter(w => w.id !== id));
      })
      .catch(err => {
        console.error('Revoke failed:', err);
        setWebhooks(prev => prev.filter(w => w.id !== id));
      });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Webhooks', ar: 'تكاملات الويب هوك الصادرة' })}</h1>
        <p className="text-xs text-[#141F33]/60 font-medium mt-0.5">{t({ en: 'Send real-time updates to your own systems.', ar: 'تسجيل روابط الويب هوك لاستلام تحديثات فورية حول أحداث مساحة العمل.' })}</p>
      </div>

      {/* Form Register */}
      <form onSubmit={handleRegister} className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
        
        <div>
          <label htmlFor="url" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Destination URL', ar: 'الرابط المستهدف' })}</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.yourdomain.com/webhook-receiver"
            className="w-full min-h-[44px] bg-[#F8F9FB] border border-[#141F33]/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#141F33] mb-3">{t({ en: 'Subscribe to Events', ar: 'الاشتراك في الأحداث' })}</label>
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
            {['booking.created', 'complaint.routed', 'chat.answered'].map((event) => (
              <label key={event} className="flex items-center gap-2 cursor-pointer p-3 border border-[#141F33]/10 rounded-xl bg-[#F8F9FB] hover:border-[#141F33] transition-colors">
                <input
                  type="checkbox"
                  checked={selectedEvents.includes(event)}
                  onChange={() => handleToggleEvent(event)}
                  className="h-4 w-4 rounded border-[#141F33]/20 text-[#141F33] focus:ring-[#141F33]"
                />
                <span className="font-mono text-[10px] text-[#141F33]">{event}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={registering}
          className="w-full bg-[#141F33] text-[#F8F9FB] font-bold py-3 px-6 rounded-xl text-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 min-h-[44px] flex items-center justify-center disabled:opacity-40"
        >
          {registering ? t({ en: 'Registering...', ar: 'جاري التسجيل...' }) : t({ en: 'Register Destination Webhook', ar: 'تسجيل الويب هوك الصادر' })}
        </button>

      </form>

      {/* Webhooks List */}
      <div className="bg-[#F8F9FB] border border-[#141F33]/10 rounded-2xl p-6 shadow-sm">
        <h3 className="text-xs font-extrabold text-[#141F33] uppercase tracking-wider mb-4">{t({ en: 'Active Webhook Endpoints', ar: 'روابط الويب هوك النشطة' })}</h3>

        {loading ? (
          <div className="py-6 flex justify-center">
            <span className="h-6 w-6 rounded-full border-4 border-[#141F33]/10 border-t-[#141F33] animate-spin" />
          </div>
        ) : webhooks.length === 0 ? (
          <p className="text-xs text-[#141F33] font-semibold text-center py-6">{t({ en: 'No outgoing webhooks registered.', ar: 'لا توجد روابط ويب هوك صادرة حاليًا.' })}</p>
        ) : (
          <div className="divide-y divide-[#141F33]/10">
            {webhooks.map((w) => (
              <div key={w.id} className="flex justify-between items-start py-4 first:pt-0 last:pb-0 gap-4">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-[#141F33] truncate">{w.url}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.events.map((e) => (
                      <span key={e} className="bg-[#F8F9FB] text-[#141F33] font-mono text-[8px] font-extrabold px-2 py-0.5 rounded-full border border-[#141F33]/10">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="text-[10px] font-bold text-[#141F33] hover:bg-[#F8F9FB] px-3 py-1.5 rounded-lg border border-[#141F33]/10 shrink-0"
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


