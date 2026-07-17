'use client';

import React, { useState, useRef } from 'react';
import { useLocale } from '../../../providers';
import { useGlobalToast } from '../../../../lib/toast';
import { useUnsavedChanges } from '../../../../hooks/useUnsavedChanges';
import { UnsavedChangesModal } from '../../../../components/settings/UnsavedChangesModal';
import { useKeyboardShortcut } from '../../../../hooks/useKeyboardShortcut';

export default function PromptsSettingsPage() {
  const { locale } = useLocale();
  const { addToast } = useGlobalToast();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const formRef = useRef<HTMLFormElement>(null);
  const { isDirty, setDirty, markClean, showModal, confirmNavigation, cancelNavigation } = useUnsavedChanges();

  const [prompt, setPrompt] = useState(
    "You are a private AI assistant for Al-Safa Hospitality. Answer queries using the provided handbook context. If you do not know the answer, respond with 'Low confidence'."
  );
  const [saving, setSaving] = useState(false);

  useKeyboardShortcut('s', () => {
    formRef.current?.requestSubmit();
  }, true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      markClean();
      addToast('System prompt configurations updated successfully!', 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-extrabold text-primary">{t({ en: 'AI Prompts', ar: 'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù†ØµÙˆØµ ÙˆØ§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø§Ù„Ø¨Ø±Ù…Ø¬ÙŠØ©' })}</h1>
        <p className="text-xs text-primary font-medium mt-0.5">{t({ en: 'Customize how your AI assistant responds to questions.', ar: 'ØªØ¹Ø¯ÙŠÙ„ Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª ÙˆØ§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø§Ù„ÙØ±Ø¹ÙŠØ© ÙˆØ¨Ø§Ø±Ø§Ù…ØªØ±Ø§Øª Ù…Ø®Ø±Ø¬Ø§Øª Ø§Ù„Ø°ÙƒØ§Ø¡ Ø§Ù„Ø§ØµØ·Ù†Ø§Ø¹ÙŠ.' })}</p>
      </div>

      {/* Editor */}
      <form ref={formRef} onSubmit={handleSave} className="bg-surface border border-primary/10 rounded-xl p-8 shadow-sm flex flex-col gap-8">
        
        <div>
          <label htmlFor="prompt" className="block text-xs font-bold text-primary mb-1.5">{t({ en: 'Core System Prompt Instruction', ar: 'Ø§Ù„ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø§Ù„Ø£Ø³Ø§Ø³ÙŠØ© Ù„Ù„Ù†Ø¸Ø§Ù…' })}</label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); setDirty(true); }}
            rows={6}
            className="w-full bg-surface border border-primary/10 rounded-xl px-4 py-2 text-xs font-mono font-semibold text-primary min-h-[44px] focus:outline-none focus:ring-1 focus:ring-2 focus:ring-royal"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary text-surface font-bold py-3 px-6 rounded-xl text-xs min-h-[44px] flex items-center justify-center transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-40"
        >
          {saving ? t({ en: 'Saving...', ar: 'Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­ÙØ¸...' }) : t({ en: 'Save System Prompt overrides', ar: 'Ø­ÙØ¸ ØªØ¹Ø¯ÙŠÙ„Ø§Øª ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø§Ù„Ù†Ø¸Ø§Ù…' })}
        </button>

      </form>

      <UnsavedChangesModal
        isOpen={showModal}
        onConfirm={confirmNavigation}
        onCancel={cancelNavigation}
      />
    </div>
  );
}


