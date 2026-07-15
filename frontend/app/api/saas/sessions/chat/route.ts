import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { question, tenantId, userEmail } = await request.json();

    const targetEmail = userEmail || 'salah@alsafa.qa'; // fallback for demo/testing

    if (!question) {
      return NextResponse.json({ message: 'Missing question parameter' }, { status: 400 });
    }

    // Step 1: Query Employee table for user credentials & PTO balance
    const employee = await prisma.employee.findFirst({
      where: {
        work_email: targetEmail,
      },
    });

    // Step 2: Formulate context based on employee records
    let userContext = 'No employee database match found.';
    if (employee) {
      userContext = `User Info: Name: ${employee.first_name} ${employee.last_name}, Role: ${employee.job_title}, Department: ${employee.department}, Manager: ${employee.manager_name || 'None'}, PTO Balance: ${employee.pto_balance_remaining} days.`;
    }

    // Step 3: Mock policies or fetch policy chunks
    const mockPolicyContext = `
      Company Policy: Vacation claims must be submitted via the Oracle ERP interface.
      Emergency leave requires manager approval within 24 hours.
      SOP for hardware requests: Open a ticket in Jira.
    `;

    // Step 4: Construct dynamic mock RAG response with citation
    let replyText = '';
    let citation = 'Company_Handbook_v2.pdf';

    const cleanQuestion = question.toLowerCase();
    if (cleanQuestion.includes('pto') || cleanQuestion.includes('vacation') || cleanQuestion.includes('leave')) {
      const balance = employee ? employee.pto_balance_remaining.toString() : '15';
      replyText = `According to your HR files, you currently have ${balance} days of paid time off remaining in this cycle. You can submit requests via the internal portal.`;
      citation = 'HR_Leave_Policy_2026.pdf';
    } else if (cleanQuestion.includes('jira') || cleanQuestion.includes('sop') || cleanQuestion.includes('hardware')) {
      replyText = 'The Standard Operating Procedure (SOP) for new hardware is to submit a request ticket in Jira with approval from your manager.';
      citation = 'IT_Hardware_Procurement_SOP.pdf';
    } else {
      replyText = `Based on our company files, for "${question}", please refer to your manager or review the compliance center directories.`;
    }

    // Step 5: Save Chat Session & Message in database
    let session = await prisma.chatSession.findFirst({
      where: { tenantId: tenantId || 'demo-tenant-id' }
    });

    if (!session) {
      session = await prisma.chatSession.create({
        data: { tenantId: tenantId || 'demo-tenant-id' }
      });
    }

    await prisma.chatMessage.create({
      data: {
        sessionId: session.id,
        sender: 'assistant',
        text: replyText,
        citation: citation,
      }
    });

    return NextResponse.json({
      text: replyText,
      citation: citation,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
