import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { publicToken, providerName, tenantId = 'demo-tenant-id' } = body;

    // If client is exchanging publicToken for a permanent account token
    if (publicToken) {
      // Typically we'd call Merge API token exchange here:
      // POST https://api.merge.dev/api/hris/v1/account-token with public_token
      const mockAccountToken = `acc_token_${Math.random().toString(36).substring(7)}`;

      // Save the integration details
      const integration = await prisma.integration.upsert({
        where: { id: tenantId },
        update: {
          linked_account_token: mockAccountToken,
          provider_name: providerName || 'Merge Provider',
          is_active: true,
          last_synced_at: new Date(),
        },
        create: {
          tenantId: tenantId,
          linked_account_token: mockAccountToken,
          provider_name: providerName || 'Merge Provider',
          is_active: true,
          last_synced_at: new Date(),
        },
      });

      return NextResponse.json({ success: true, integration });
    }

    // Otherwise, generate link token for initialization
    // Normally: POST https://api.merge.dev/api/hris/v1/link-token
    const mockLinkToken = `link_token_mock_${Math.random().toString(36).substring(7)}`;
    return NextResponse.json({ linkToken: mockLinkToken });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Error creating link' }, { status: 500 });
  }
}
