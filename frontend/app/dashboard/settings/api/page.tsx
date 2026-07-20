'use client';

import React, { useState, useEffect } from 'react';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';

interface ApiKeyItem {
  id: string;
  name: string;
  key_hint: string;
  created_at: string;
}

export default function ApiKeysSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [keyName, setKeyName] = useState('');
  const [newKeyVal, setNewKeyVal] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const apiFetch = (path: string, options?: RequestInit) =>
    fetch(`/api/api-keys${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

  const fetchKeys = () => {
    setLoading(true);
    apiFetch('')
      .then(res => res.json())
      .then((data: any) => {
        if (Array.isArray(data)) {
          setKeys(data);
        } else if (data && Array.isArray(data.keys)) {
          setKeys(data.keys);
        }
      })
      .catch(err => {
        console.warn('Failed to load keys:', err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyName.trim()) return;

    setGenerating(true);
    apiFetch('', {
      method: 'POST',
      body: JSON.stringify({ name: keyName }),
    })
      .then(res => res.json())
      .then((data: any) => {
        if (data && data.api_key) {
          setNewKeyVal(data.api_key);
          setKeyName('');
          fetchKeys();
        }
      })
      .catch(err => {
        console.error('Failed to generate key:', err);
        addToast(t({ en: 'Failed to generate API key.', ar: 'فشل إنشاء مفتاح API.' }), 'error');
      })
      .finally(() => setGenerating(false));
  };

  const handleRevoke = (id: string) => {
    if (!confirm(t({ en: 'Are you sure you want to revoke this API key? Outgoing integrations will break.', ar: 'هل أنت متأكد من إلغاء مفتاح API هذا؟ ستتوقف التكاملات الخارجية.' }))) {
      return;
    }

    apiFetch(`?id=${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setKeys(prev => prev.filter(k => k.id !== id));
      })
      .catch(err => {
        console.error('Failed to revoke:', err);
        addToast(t({ en: 'Failed to revoke API key.', ar: 'فشل إلغاء مفتاح API.' }), 'error');
      });
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Developer API Credentials', ar: 'بيانات وواجهات المطورين' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Create secure access tokens for custom CRM and PMS integrations.', ar: 'إنشاء رموز وصول آمنة لتكاملات CRM و PMS المخصصة.' })}</p>
      </div>

      {/* New Key Result Banner */}
      {newKeyVal && (
        <div className="bg-surface border border-accent/10 rounded-xl p-8 space-y-3">
          <h3 className="text-xs font-extrabold text-accent uppercase tracking-widest">{t({ en: 'API Key Created Successfully', ar: 'تم إنشاء مفتاح واجهة التطبيق بنجاح' })}</h3>
          <p className="text-xs text-accent font-semibold">{t({ en: 'Copy this key now. It will not be shown again for security reasons.', ar: 'انسخ هذا المفتاح الآن. لن يتم عرضه مرة أخرى لأسباب أمنية.' })}</p>
          <div className="flex gap-3">
            <input
              type="text"
              readOnly
              value={newKeyVal}
              className="flex-1 bg-surface border border-accent/10 rounded-xl px-4 py-2 text-xs font-mono font-bold text-primary min-h-[44px]"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(newKeyVal);
                addToast('Copied to clipboard', 'success');
              }}
              className="bg-accent hover:bg-emerald-700 text-surface font-bold px-6 py-3 min-h-[44px] rounded-xl text-xs transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
            >
              Copy
            </button>
          </div>
          <button
            onClick={() => setNewKeyVal(null)}
            className="text-xs text-accent font-bold hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form Generate */}
      <form onSubmit={handleGenerate} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex gap-8 items-end">
        <div className="flex-1">
          <label htmlFor="keyName" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Credential Key Name', ar: 'Ø§Ø³Ù… Ø§Ù„Ù…ÙØªØ§Ø­ Ø§Ù„ØªØ¹Ø±ÙŠÙÙŠ' })}</label>
          <input
            type="text"
            id="keyName"
            value={keyName}
            onChange={(e) => setKeyName(e.target.value)}
            placeholder="E.g. ERP Scheduler Token"
            className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={generating}
          className="bg-primary hover:opacity-95 text-surface font-bold px-6 py-3 rounded-xl text-xs min-h-[44px] flex items-center shrink-0 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
        >
          {generating ? t({ en: 'Generating...', ar: 'جاري الإنشاء...' }) : t({ en: 'Generate Key', ar: 'إنشاء مفتاح' })}
        </button>
      </form>

      {/* Keys List */}
      <div className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm">
        <h3 className="text-xs font-extrabold text-primary uppercase tracking-wider mb-4">{t({ en: 'Active API Keys', ar: 'مفاتيح واجهة التطبيقات النشطة' })}</h3>

        {loading ? (
          <div className="py-6 flex justify-center">
            <span className="h-6 w-6 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
          </div>
        ) : keys.length === 0 ? (
          <p className="text-xs text-primary font-semibold text-center py-6">{t({ en: 'No API keys configured yet.', ar: 'لا توجد مفاتيح واجهة تطبيقات مهيأة حالياً.' })}</p>
        ) : (
          <div className="divide-y divide-primary/10">
            {keys.map((k) => (
              <div key={k.id} className="flex justify-between items-center py-4 first:pt-0 last:pb-0 gap-8">
                <div className="min-w-0">
                  <p className="text-xs font-bold text-primary truncate">{k.name}</p>
                  <p className="text-xs font-mono text-primary font-bold mt-1">{k.key_hint}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-primary font-bold">{new Date(k.created_at).toLocaleDateString()}</span>
                  <button
                    onClick={() => handleRevoke(k.id)}
                    className="px-6 py-3 rounded-xl text-xs font-bold min-h-[44px] text-primary hover:bg-surface border border-primary/10 transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    {t({ en: 'Revoke', ar: 'إلغاء' })}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}


