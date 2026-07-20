'use client';

import React from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../../components/ui/Badge';

export default function SecuritySettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  return (
    <Card className="p-8 rounded-xl space-y-4 max-w-xl">
      <h3 className="font-bold text-navy dark:text-surface text-base">{t({en: 'Security', ar: 'Ø³ÙŠØ§Ø³Ø§Øª Ø£Ù…Ø§Ù† Ø§Ù„Ø­Ø³Ø§Ø¨'})}</h3>
      <p className="text-xs text-primary leading-relaxed">
        {t({en: 'Manage login security, devices, and two-factor authentication.', ar: 'Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª Ø§Ù„ØªØ­Ù‚Ù‚ Ù…Ù† Ø§Ù„Ù‡ÙˆÙŠØ© ÙˆØ³Ø¬Ù„Ø§Øª Ø§Ù„Ø£Ø¬Ù‡Ø²Ø© ÙˆØªÙƒÙˆÙŠÙ†Ø§Øª Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© Ø§Ù„Ø«Ù†Ø§Ø¦ÙŠØ©.'})}
      </p>

      <div className="flex justify-between items-center py-2 border-b border-primary/10">
        <div>
          <p className="text-xs font-bold text-navy dark:text-surface">{t({en: 'Multi-Factor Authentication (MFA)', ar: 'Ø§Ù„Ù…ØµØ§Ø¯Ù‚Ø© Ù…ØªØ¹Ø¯Ø¯Ø© Ø§Ù„Ø¹ÙˆØ§Ù…Ù„ (MFA)'})}</p>
          <p className="text-xs text-primary mt-0.5">{t({en: 'Protect logins via standard SMS/TOTP codes.', ar: 'Ø­Ù…Ø§ÙŠØ© ØªØ³Ø¬ÙŠÙ„Ø§Øª Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø¹Ø¨Ø± Ø±Ù…ÙˆØ² SMS/TOTP Ø§Ù„Ù‚ÙŠØ§Ø³ÙŠØ©.'})}</p>
        </div>
        <Badge variant="primary">{t({en: 'Active', ar: 'Ù†Ø´Ø·'})}</Badge>
      </div>

      <Button variant="ghost" className="w-full">
        {t({en: 'Reset Workspace Password', ar: 'Ø¥Ø¹Ø§Ø¯Ø© ØªØ¹ÙŠÙŠÙ† ÙƒÙ„Ù…Ø© Ù…Ø±ÙˆØ± Ù…Ø³Ø§Ø­Ø© Ø§Ù„Ø¹Ù…Ù„'})}
      </Button>
    </Card>
  );
}


