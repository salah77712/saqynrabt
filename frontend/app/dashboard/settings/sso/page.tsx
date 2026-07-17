'use client';

import React, { useState } from 'react';
import { useLocale } from '../../../providers';
import { Card } from '@/components/shadcn/card';
import { Button } from '@/components/shadcn/button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Toast } from '../../../../components/ui/Toast';

export default function SSOPage() {
  const { locale } = useLocale();
  const t = (obj: Record<string, string>) => obj[locale] || obj.en || '';
  const [samlEnabled, setSamlEnabled] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = () => {
    setToastMsg(t({en: 'SSO configuration updated.', ar: 'ØªÙ… ØªØ­Ø¯ÙŠØ« ØªÙƒÙˆÙŠÙ† SSO.'}));
  };

  return (
    <main id="main-content" className="p-8 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-primary dark:text-surface">{t({en: 'Single Sign-On (SSO)', ar: 'ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ø§Ù„Ù…ÙˆØ­Ø¯ Ù„Ù„Ù…Ø¤Ø³Ø³Ø§Øª (SSO)'})}</h1>
          <p className="text-xs text-primary font-bold">{t({en: 'Connect your company\'s identity system for one-click login.', ar: 'ØªÙƒÙˆÙŠÙ† ØªÙƒØ§Ù…Ù„Ø§Øª Ø§Ù„Ù‡ÙˆÙŠØ© Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ© (SAML 2.0 / OIDC).'})}</p>
        </div>
        <Badge variant={samlEnabled ? 'success' : 'primary'}>
          {samlEnabled ? t({en: 'SSO Active', ar: 'SSO Ù†Ø´Ø·'}) : t({en: 'SSO Inactive', ar: 'SSO ØºÙŠØ± Ù†Ø´Ø·'})}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<Card className="p-8 rounded-xl space-y-4">
  <h3 className="font-bold text-navy dark:text-surface text-base">{t({en: 'SSO Gateway Details', ar: 'ØªÙØ§ØµÙŠÙ„ Ø¨ÙˆØ§Ø¨Ø© SSO'})}</h3>
  <p className="text-xs text-primary leading-relaxed">
            {t({en: 'Integrate SAQYN authentication directly with enterprise credential stores like Okta, Azure AD, or Ping Identity.', ar: 'Ø¯Ù…Ø¬ Ù…ØµØ§Ø¯Ù‚Ø© SAQYN Ù…Ø¨Ø§Ø´Ø±Ø© Ù…Ø¹ Ù…Ø®Ø§Ø²Ù† Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„Ø§Ø¹ØªÙ…Ø§Ø¯ Ø§Ù„Ù…Ø¤Ø³Ø³ÙŠØ© Ù…Ø«Ù„ Okta Ø£Ùˆ Azure AD Ø£Ùˆ Ping Identity.'})}
          </p>

          <div className="flex items-center justify-between py-2 border-b border-primary/10">
            <span className="text-xs font-bold text-navy dark:text-surface">{t({en: 'Enable SAML Authentication', ar: 'ØªÙ…ÙƒÙŠÙ† Ù…ØµØ§Ø¯Ù‚Ø© SAML'})}</span>
            <input
              type="checkbox"
              checked={samlEnabled}
              onChange={(e) => setSamlEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-primary/20 text-primary focus:ring-2 focus:ring-royal"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-primary uppercase">{t({en: 'SAML Metadata XML URL', ar: 'Ø±Ø§Ø¨Ø· XML Ø¨ÙŠØ§Ù†Ø§Øª SAML Ø§Ù„ÙˆØµÙÙŠØ©'})}</label>
<Input
        value={metadataUrl}
        onChange={(e) => setMetadataUrl(e.target.value)}
        placeholder="https://identity.yourcorp.com/app/metadata"
        className="min-h-[44px] rounded-xl px-4 py-2 text-xs font-semibold"
            />
          </div>

          <Button variant="default" className="w-full py-3 px-6 rounded-xl text-xs font-bold min-h-[44px] transition-all duration-300 hover:shadow-md hover:scale-[1.02] active:scale-95" onClick={handleSave}>
            {t({en: 'Save SSO Settings', ar: 'Ø­ÙØ¸ Ø¥Ø¹Ø¯Ø§Ø¯Ø§Øª SSO'})}
          </Button>
        </Card>

<Card className="p-8 rounded-xl space-y-4">
  <h3 className="font-bold text-navy dark:text-surface text-base">{t({en: 'Metadata Downloads', ar: 'ØªÙ†Ø²ÙŠÙ„ Ø§Ù„Ø¨ÙŠØ§Ù†Ø§Øª Ø§Ù„ÙˆØµÙÙŠØ©'})}</h3>
          <p className="text-xs text-primary leading-relaxed">
            {t({en: 'To configure SSO in your Identity Provider (IdP) administration portal, download our service provider config properties.', ar: 'Ù„ØªÙƒÙˆÙŠÙ† SSO ÙÙŠ Ø¨ÙˆØ§Ø¨Ø© Ø¥Ø¯Ø§Ø±Ø© Ù…ÙˆÙØ± Ø§Ù„Ù‡ÙˆÙŠØ© (IdP)ØŒ Ù‚Ù… Ø¨ØªÙ†Ø²ÙŠÙ„ Ø®ØµØ§Ø¦Øµ ØªÙƒÙˆÙŠÙ† Ù…ÙˆÙØ± Ø§Ù„Ø®Ø¯Ù…Ø© Ù„Ø¯ÙŠÙ†Ø§.'})}
          </p>
          <Button variant="outline" className="w-full">
            {t({en: 'Download SAQYN SAML Metadata XML', ar: 'ØªÙ†Ø²ÙŠÙ„ Ø¨ÙŠØ§Ù†Ø§Øª SAML Ø§Ù„ÙˆØµÙÙŠØ© Ù„Ù€ SAQYN'})}
          </Button>
        </Card>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </main>
  );
}


