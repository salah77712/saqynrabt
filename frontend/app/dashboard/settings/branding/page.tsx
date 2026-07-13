'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useLocale, useEntitlements } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';

export default function BrandingSettingsPage() {
  const { locale } = useLocale();
  const { mockMode } = useEntitlements();
  const { getToken, isLoaded: authLoaded } = useAuth();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const [jwtToken, setJwtToken] = useState<string | null>(null);
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

  useEffect(() => {
    if (authLoaded && !mockMode) {
      getToken({ template: 'saqyn-jwt' })
        .then(token => setJwtToken(token))
        .catch(err => console.error('Failed to get token:', err));
    }
  }, [authLoaded, mockMode, getToken]);

  // Fetch current branding settings
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {};
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    setLoading(true);
    fetch(`${apiBase}/api/branding`, { headers })
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
  }, [jwtToken]);

  // Handle saving configurations
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const apiBase = process.env.NEXT_PUBLIC_API_URL || '';
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (jwtToken) {
      headers['Authorization'] = `Bearer ${jwtToken}`;
    } else {
      headers['Authorization'] = 'Bearer mock-token-salah-admin';
    }

    fetch(`${apiBase}/api/branding`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ branding })
    })
      .then(res => res.json())
      .then(() => {
        addToast(t({ en: 'Branding options updated successfully!', ar: 'تم تحديث خيارات الهوية البصرية بنجاح!' }), 'success');
      })
      .catch(err => {
        console.error('Failed to save branding:', err);
        addToast(t({ en: 'Failed to update branding settings.', ar: 'فشل حفظ إعدادات الهوية البصرية.' }), 'error');
      })
      .finally(() => setSaving(false));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBranding(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-[#141F33]">{t({ en: 'Branding', ar: 'إعدادات الهوية البصرية للعميل' })}</h1>
        <p className="text-xs text-[#718096] font-medium mt-0.5">{t({ en: 'Your logo, your colors, your AI assistant\'s look.', ar: 'تخصيص الشعارات، الألوان الأساسية، وصورة المساعد الذكي.' })}</p>
      </div>

      {loading ? (
        <div className="py-12 flex justify-center">
          <span className="h-8 w-8 rounded-full border-4 border-gray-200 border-t-[#141F33] animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          
          {/* Logo URL */}
          <div>
            <label htmlFor="logo_url" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Company Logo Image URL', ar: 'رابط صورة شعار الشركة' })}</label>
            <input
              type="text"
              id="logo_url"
              name="logo_url"
              value={branding.logo_url}
              onChange={handleChange}
              placeholder="https://alsafa.qa/logo.png"
              className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#141F33]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Primary color */}
            <div>
              <label htmlFor="primary_color_hex" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Primary Hex Color', ar: 'اللون الأساسي (Hex)' })}</label>
              <div className="flex gap-2">
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
                  className="flex-1 min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>

            {/* Secondary Color */}
            <div>
              <label htmlFor="secondary_color_hex" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Secondary Hex Color', ar: 'اللون الثانوي (Hex)' })}</label>
              <div className="flex gap-2">
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
                  className="flex-1 min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono font-bold"
                />
              </div>
            </div>
          </div>

          {/* AI Persona */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <h3 className="text-xs font-extrabold text-[#718096] uppercase tracking-wider">{t({ en: 'AI Persona Config', ar: 'إعدادات شخصية المساعد' })}</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="chat_bot_name" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'AI Assistant Name', ar: 'اسم المساعد الذكي' })}</label>
                <input
                  type="text"
                  id="chat_bot_name"
                  name="chat_bot_name"
                  value={branding.chat_bot_name}
                  onChange={handleChange}
                  placeholder="SAQYN Assistant"
                  className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold"
                />
              </div>

              <div>
                <label htmlFor="chat_bot_avatar_url" className="block text-xs font-bold text-[#141F33] mb-1.5">{t({ en: 'Assistant Avatar URL', ar: 'رابط صورة المساعد' })}</label>
                <input
                  type="text"
                  id="chat_bot_avatar_url"
                  name="chat_bot_avatar_url"
                  value={branding.chat_bot_avatar_url}
                  onChange={handleChange}
                  placeholder="https://alsafa.qa/avatar.png"
                  className="w-full min-h-[44px] bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-xs font-semibold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-[#141F33] text-white font-bold py-4 rounded-xl text-xs hover:opacity-95 transition-all min-h-[44px] flex items-center justify-center disabled:opacity-40"
          >
            {saving ? t({ en: 'Updating...', ar: 'جاري الحفظ...' }) : t({ en: 'Save Branding Options', ar: 'حفظ إعدادات الهوية البصرية' })}
          </button>

        </form>
      )}

    </div>
  );
}
