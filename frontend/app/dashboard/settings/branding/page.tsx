'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';
import { useUnsavedChanges } from '../../../../hooks/useUnsavedChanges';
import { UnsavedChangesModal } from '../../../../components/settings/UnsavedChangesModal';
import { useKeyboardShortcut } from '../../../../hooks/useKeyboardShortcut';

export default function BrandingSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const formRef = useRef<HTMLFormElement>(null);
  const { isDirty, setDirty, markClean, showModal, confirmNavigation, cancelNavigation } = useUnsavedChanges();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [branding, setBranding] = useState({
    logo_url: '',
    primary_color_hex: '#141F33',
    secondary_color_hex: '#2A5CFF',
    font_family: 'Inter',
    chat_bot_name: 'SAQYN Assistant',
    chat_bot_avatar_url: '',
  });

  const apiFetch = (path: string, options?: RequestInit) =>
    fetch(`/api/branding${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

  useEffect(() => {
    setLoading(true);
    apiFetch('')
      .then(res => res.json())
      .then((data: any) => {
        if (data && data.branding) {
          setBranding(data.branding);
        }
      })
      .catch(err => {
        console.warn('Failed to load branding settings, using defaults:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  useKeyboardShortcut('s', () => {
    formRef.current?.requestSubmit();
  }, true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    apiFetch('', {
      method: 'POST',
      body: JSON.stringify({ branding }),
    })
      .then(res => res.json())
      .then(() => {
        markClean();
        addToast(t({ en: 'Branding options updated successfully!', ar: 'تم تحديث خيارات العلامة التجارية بنجاح!' }), 'success');
      })
      .catch(err => {
        console.error('Failed to save branding:', err);
        addToast(t({ en: 'Failed to update branding settings.', ar: 'فشل تحديث إعدادات العلامة التجارية.' }), 'error');
      })
      .finally(() => setSaving(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBranding(prev => ({ ...prev, [name]: value }));
    setDirty(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary">{t({ en: 'Branding', ar: 'إعدادات العلامة التجارية' })}</h1>
        <p className="text-xs text-primary/60 font-medium mt-0.5">{t({ en: 'Your logo, your colors, your AI assistant\'s look.', ar: 'شعارك وألوانك ومظهر مساعدك الذكي.' })}</p>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <span className="h-8 w-8 rounded-full border-4 border-primary/10 border-t-[#141F33] animate-spin" />
        </div>
      ) : (
        <form ref={formRef} onSubmit={handleSave} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
          
          {/* Logo URL */}
          <div>
            <label htmlFor="logo_url" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Company Logo Image URL', ar: 'رابط صورة شعار الشركة' })}</label>
            <input
              type="text"
              id="logo_url"
              name="logo_url"
              value={branding.logo_url}
              onChange={handleChange}
              placeholder="https://alsafa.qa/logo.png"
              className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-royal"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Primary color */}
            <div>
              <label htmlFor="primary_color_hex" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Primary Hex Color', ar: 'اللون الأساسي (Hex)' })}</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  name="primary_color_hex"
                  value={branding.primary_color_hex}
                  onChange={handleChange}
                  className="h-[44px] w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                />
                <input
                  type="text"
                  name="primary_color_hex"
                  value={branding.primary_color_hex}
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label htmlFor="secondary_color_hex" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Secondary Hex Color', ar: 'اللون الثانوي (Hex)' })}</label>
              <div className="flex gap-3">
                <input
                  type="color"
                  name="secondary_color_hex"
                  value={branding.secondary_color_hex}
                  onChange={handleChange}
                  className="h-[44px] w-12 bg-transparent border-0 cursor-pointer rounded-xl"
                />
                <input
                  type="text"
                  name="secondary_color_hex"
                  value={branding.secondary_color_hex}
                  onChange={handleChange}
                  className="flex-1 min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* AI Persona */}
          <div className="pt-4 border-t border-primary/10 space-y-4">
            <h3 className="text-xs font-extrabold text-primary/60 uppercase tracking-wider">{t({ en: 'AI Persona Config', ar: 'تكوين شخصية المساعد' })}</h3>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <label htmlFor="chat_bot_name" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'AI Assistant Name', ar: 'اسم المساعد الذكي' })}</label>
                <input
                  type="text"
                  id="chat_bot_name"
                  name="chat_bot_name"
                  value={branding.chat_bot_name}
                  onChange={handleChange}
                  placeholder="SAQYN Assistant"
                  className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label htmlFor="chat_bot_avatar_url" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Assistant Avatar URL', ar: 'رابط صورة المساعد' })}</label>
                <input
                  type="text"
                  id="chat_bot_avatar_url"
                  name="chat_bot_avatar_url"
                  value={branding.chat_bot_avatar_url}
                  onChange={handleChange}
                  placeholder="https://alsafa.qa/avatar.png"
                  className="w-full min-h-[44px] bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-300 min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {saving ? t({ en: 'Updating...', ar: 'جاري التحديث...' }) : t({ en: 'Save Branding Options', ar: 'حفظ إعدادات العلامة التجارية' })}
          </button>

        </form>
      )}

      <UnsavedChangesModal
        isOpen={showModal}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </div>
  );
}


