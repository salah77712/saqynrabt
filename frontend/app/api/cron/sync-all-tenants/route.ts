import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    const expectedToken = `Bearer ${process.env.CRON_SECRET}`;

    if (!process.env.CRON_SECRET || authHeader !== expectedToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Select all active integrations with valid Merge tokens
    const activeIntegrations = await prisma.integration.findMany({
      where: {
        is_active: true,
        linked_account_token: { not: null }
      }
    });

    let syncReports = [];

    for (const integration of activeIntegrations) {
      try {
        // Trigger the internal sync logic
        const mergeUrl = 'https://api.merge.dev/api/hris/v1/employees';
        const response = await fetch(mergeUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${process.env.MERGE_API_KEY}`,
            'X-Account-Token': integration.linked_account_token!,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const mergeData = await response.json();
          const results = mergeData.results || [];

          for (const emp of results) {
            if (!emp.work_email) continue;
            await prisma.employee.upsert({
              where: {
                tenantId_work_email: {
                  tenantId: integration.tenantId,
                  work_email: emp.work_email,
                },
              },
              update: {
                first_name: emp.first_name || '',
                last_name: emp.last_name || '',
                job_title: emp.job_title || 'Worker',
                department: emp.department || 'Operations',
                manager_name: emp.manager ? `${emp.manager.first_name || ''} ${emp.manager.last_name || ''}`.trim() : null,
                pto_balance_remaining: emp.pto_balance_remaining || 0.0,
                employment_status: emp.employment_status || 'active',
                updated_at: new Date(),
              },
              create: {
                tenantId: integration.tenantId,
                remote_id: emp.id,
                first_name: emp.first_name || '',
                last_name: emp.last_name || '',
                work_email: emp.work_email,
                job_title: emp.job_title || 'Worker',
                department: emp.department || 'Operations',
                manager_name: emp.manager ? `${emp.manager.first_name || ''} ${emp.manager.last_name || ''}`.trim() : null,
                pto_balance_remaining: emp.pto_balance_remaining || 0.0,
                employment_status: emp.employment_status || 'active',
              },
            });
          }

          // Update last synced
          await prisma.integration.update({
            where: { id: integration.id },
            data: { last_synced_at: new Date() }
          });

          syncReports.push({ integrationId: integration.id, success: true, count: results.length });
        } else {
          syncReports.push({ integrationId: integration.id, success: false, error: 'Merge API Error' });
        }
      } catch (err: any) {
        syncReports.push({ integrationId: integration.id, success: false, error: err.message });
      }
    }

    return NextResponse.json({ success: true, reports: syncReports });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
