import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tenantId = (formData.get('tenantId') as string) || 'demo-tenant-id';

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    const text = await file.text();
    const lines = text.split('\n');
    
    // Expecting headers: first_name,last_name,work_email,job_title,department,manager_name,pto_balance,status
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    
    let importedCount = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      
      const row: Record<string, string> = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      const workEmail = row.work_email || row.email;
      if (!workEmail) continue;

      const ptoVal = parseFloat(row.pto_balance || row.pto_balance_remaining || '0');
      const ptoDecimal = isNaN(ptoVal) ? 0.0 : ptoVal;

      await prisma.employee.upsert({
        where: {
          tenantId_work_email: {
            tenantId: tenantId,
            work_email: workEmail,
          },
        },
        update: {
          first_name: row.first_name || '',
          last_name: row.last_name || '',
          job_title: row.job_title || 'Worker',
          department: row.department || 'Operations',
          manager_name: row.manager_name || null,
          pto_balance_remaining: ptoDecimal,
          employment_status: row.status || row.employment_status || 'active',
          updated_at: new Date(),
        },
        create: {
          tenantId: tenantId,
          first_name: row.first_name || '',
          last_name: row.last_name || '',
          work_email: workEmail,
          job_title: row.job_title || 'Worker',
          department: row.department || 'Operations',
          manager_name: row.manager_name || null,
          pto_balance_remaining: ptoDecimal,
          employment_status: row.status || row.employment_status || 'active',
        },
      });

      importedCount++;
    }

    return NextResponse.json({ success: true, count: importedCount });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'CSV Import Failed' }, { status: 500 });
  }
}
