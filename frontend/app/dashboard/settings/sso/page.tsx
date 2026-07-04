'use client';

import React, { useState } from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Input } from '../../../../components/ui/Input';
import { Badge } from '../../../../components/ui/Badge';
import { Toast } from '../../../../components/ui/Toast';

export default function SSOPage() {
  const [samlEnabled, setSamlEnabled] = useState(false);
  const [metadataUrl, setMetadataUrl] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSave = () => {
    setToastMsg('SSO configuration updated.');
  };

  return (
    <main id="main-content" className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#141F33] dark:text-white">Enterprise Single Sign-On (SSO)</h1>
          <p className="text-xs text-slate-500 font-bold">Configure corporate identity integrations (SAML 2.0 / OIDC).</p>
        </div>
        <Badge variant={samlEnabled ? 'success' : 'primary'}>
          {samlEnabled ? 'SSO Active' : 'SSO Inactive'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-base">SSO Gateway Details</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Integrate SAQYN authentication directly with enterprise credential stores like Okta, Azure AD, or Ping Identity.
          </p>

          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-xs font-bold text-navy dark:text-white">Enable SAML Authentication</span>
            <input
              type="checkbox"
              checked={samlEnabled}
              onChange={(e) => setSamlEnabled(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-royal focus:ring-royal"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] font-bold text-slate-400 uppercase">SAML Metadata XML URL</label>
            <Input
              value={metadataUrl}
              onChange={(e) => setMetadataUrl(e.target.value)}
              placeholder="https://identity.yourcorp.com/app/metadata"
            />
          </div>

          <Button variant="primary" className="w-full" onClick={handleSave}>
            Save SSO Settings
          </Button>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-bold text-navy dark:text-white text-base">Metadata Downloads</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            To configure SSO in your Identity Provider (IdP) administration portal, download our service provider config properties.
          </p>
          <Button variant="outline" className="w-full">
            Download SAQYN SAML Metadata XML
          </Button>
        </Card>
      </div>

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg(null)} />}
    </main>
  );
}
