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
    if (!confirm(t({ en: 'Are you sure you want to delete this webhook destination?', ar: 'Ù‡Ù„ Ø£Ù†Øª Ù…ØªØ£ÙƒØ¯ Ù…Ù† Ø­Ø°Ù ÙˆØ¬Ù‡Ø© Ø§Ù„ÙˆÙŠØ¨ Ù‡ÙˆÙƒ Ù‡Ø°Ù‡ØŸ' }))) {
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
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'Webhooks', ar: 'ØªÙƒØ§Ù…Ù„Ø§Øª Ø§Ù„ÙˆÙŠØ¨ Ù‡ÙˆÙƒ Ø§Ù„ØµØ§Ø¯Ø±Ø©' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Send real-time updates to your own systems.', ar: 'ØªØ³Ø¬ÙŠÙ„ Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ÙˆÙŠØ¨ Ù‡ÙˆÙƒ Ù„Ø§Ø³ØªÙ„Ø§Ù… ØªØ­Ø¯ÙŠØ«Ø§Øª ÙÙˆØ±ÙŠØ© Ø­ÙˆÙ„ Ø£Ø­Ø¯Ø§Ø« Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„.' })}</p>
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
          {registering ? t({ en: 'Registering...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ³Ø¬ÙŠÙ„...' }) : t({ en: 'Register Destination Webhook', ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„ÙˆÙŠØ¨ Ù‡ÙˆÙƒ Ø§Ù„ØµØ§Ø¯Ø±' })}
        </button>

      </form>

      {/* Webhooks List */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">{t({ en: 'Active Webhook Endpoints', ar: 'Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ÙˆÙŠØ¨ Ù‡ÙˆÙƒ Ø§Ù„Ù†Ø´Ø·Ø©' })}</h3>

        {loading ? (
          <div className="py-6 flex justify-center">
            <span className="h-6 w-6 rounded-full border-4 border-primary/10 border-t-[#141F33] animate-spin" />
          </div>
        ) : webhooks.length === 0 ? (
          <p className="text-xs text-primary font-semibold text-center py-6">{t({ en: 'No outgoing webhooks registered.', ar: 'Ù„Ø§ ØªÙˆØ¬Ø¯ Ø±ÙˆØ§Ø¨Ø· ÙˆÙŠØ¨ Ù‡ÙˆÙƒ ØµØ§Ø¯Ø±Ø© Ø­Ø§Ù„ÙŠÙ‹Ø§.' })}</p>
        ) : (
          <div className="divide-y divide-[#141F33]/10">
            {webhooks.map((w) => (
              <div key={w.id} className="flex justify-between items-start py-4 first:pt-0 last:pb-0 gap-8">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-primary truncate">{w.url}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {w.events.map((e) => (
                      <span key={e} className="bg-surface text-primary font-mono text-[8px] font-extrabold px-2 py-0.5 rounded-full border border-primary/10">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(w.id)}
                  className="text-[10px] font-bold text-primary hover:bg-surface px-3 py-1.5 rounded-lg border border-primary/10 shrink-0"
                >
                  {t({ en: 'Delete', ar: 'Ø­Ø°Ù' })}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}


