'use client';

import React from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Badge } from '../../../../components/ui/Badge';

export default function IntegrationsSettingsPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';

  const integrations = [
    { id: 'slack', name: 'Slack Workspace', desc: t({en: 'Sync alert channels.', ar: 'Ù…Ø²Ø§Ù…Ù†Ø© Ù‚Ù†ÙˆØ§Øª Ø§Ù„ØªÙ†Ø¨ÙŠÙ‡Ø§Øª.'}), active: true },
    { id: 'teams', name: 'Microsoft Teams', desc: t({en: 'Sync incident tickets.', ar: 'Ù…Ø²Ø§Ù…Ù†Ø© ØªØ°Ø§ÙƒØ± Ø§Ù„Ø­ÙˆØ§Ø¯Ø«.'}), active: false },
    { id: 'zapier', name: 'Zapier Webhooks', desc: t({en: 'Trigger outgoing automations.', ar: 'ØªØ´ØºÙŠÙ„ Ø§Ù„Ø£ØªÙ…ØªØ© Ø§Ù„ØµØ§Ø¯Ø±Ø©.'}), active: true },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {integrations.map((int) => (
        <Card key={int.id} className="flex flex-col justify-between p-8">
          <div>
            <div className="flex justify-between items-start gap-8 mb-2">
              <h4 className="font-bold text-navy dark:text-surface text-sm">{int.name}</h4>
              <Badge variant={int.active ? 'success' : 'primary'}>
                {int.active ? t({en: 'Connected', ar: 'Ù…ØªØµÙ„'}) : t({en: 'Configure', ar: 'ØªÙƒÙˆÙŠÙ†'})}
              </Badge>
            </div>
            <p className="text-[10px] text-primary mt-1 leading-relaxed">
              {int.desc}
            </p>
          </div>
          <Button variant="outline" className="mt-6 w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px]">
            {int.active ? t({en: 'Manage', ar: 'Ø¥Ø¯Ø§Ø±Ø©'}) : t({en: 'Connect API', ar: 'Ø±Ø¨Ø· API'})}
          </Button>
        </Card>
      ))}
    </div>
  );
}


