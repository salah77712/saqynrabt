'use client';

import React from 'react';
import { Card } from '../../../../components/ui/Card';
import { Button } from '../../../../components/ui/Button';
import { Badge } from '../../../../components/ui/Badge';

export default function SecuritySettingsPage() {
  return (
    <Card className="space-y-4 max-w-md">
      <h3 className="font-bold text-navy dark:text-white text-base">Account Security Policies</h3>
      <p className="text-xs text-slate-500 leading-relaxed">
        Verify identity verification settings, device logs, and two-factor configurations.
      </p>

      <div className="flex justify-between items-center py-2 border-b border-gray-100">
        <div>
          <p className="text-xs font-bold text-navy dark:text-white">Multi-Factor Authentication (MFA)</p>
          <p className="text-[10px] text-slate-400 mt-0.5">Protect logins via standard SMS/TOTP codes.</p>
        </div>
        <Badge variant="primary">Active</Badge>
      </div>

      <Button variant="outline" className="w-full">
        Reset Workspace Password
      </Button>
    </Card>
  );
}
