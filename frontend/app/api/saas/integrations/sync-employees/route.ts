import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { token, tenantId } = await request.json();

    if (!token || !tenantId) {
      return NextResponse.json({ message: 'Missing token or tenantId' }, { status: 400 });
    }

    // Step 1: Query Tenant details to check employee limits
    const tenant = await prisma.tenant.findUnique({
      where: { id: tenantId },
      include: { _count: { select: { employees: true } } }
    });

    if (!tenant) {
      return NextResponse.json({ message: 'Tenant not found' }, { status: 404 });
    }

    // Step 2: Fetch standardized employee records from Merge HRIS
    const mergeUrl = 'https://api.merge.dev/api/hris/v1/employees';
    const response = await fetch(mergeUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.MERGE_API_KEY}`,
        'X-Account-Token': token,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMsg = await response.text();
      return NextResponse.json({ message: `Merge API Error: ${errorMsg}` }, { status: response.status });
    }

    const mergeData = await response.json();
    const results = mergeData.results || [];

    // Step 3: Enforce strict 150-employee limit for Growth tier
    const incomingCount = results.length;
    const currentCount = tenant._count.employees;

    if (tenant.plan_tier !== 'Enterprise' && (currentCount + incomingCount > 150)) {
      return NextResponse.json(
        { message: 'Please upgrade to Enterprise to manage >150 employees.' },
        { status: 403 }
      );
    }

    // Step 4: Iterate and Upsert employee records
    let upsertCount = 0;
    for (const emp of results) {
      if (!emp.work_email) continue; // Skip if no valid work email

      await prisma.employee.upsert({
        where: {
          tenantId_work_email: {
            tenantId: tenantId,
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
          tenantId: tenantId,
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
      upsertCount++;
    }

    // Step 5: Update the Integration status record
    await prisma.integration.upsert({
      where: { id: tenantId }, // tied 1:1 for simplicity or map via tenantId + provider
      update: {
        last_synced_at: new Date(),
        is_active: true,
      },
      create: {
        tenantId: tenantId,
        provider_name: 'Merge',
        linked_account_token: token,
        last_synced_at: new Date(),
        is_active: true,
      }
    });

    return NextResponse.json({ success: true, count: upsertCount });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
