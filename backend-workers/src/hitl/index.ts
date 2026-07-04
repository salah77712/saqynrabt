/**
 * Human-in-the-Loop (HITL) task escalation orchestrator
 */
export async function escalateToHumanAgent(
  companyId: string,
  userQuery: string,
  suggestedAnswer: string,
  sql: any,
  env: any
): Promise<{ success: boolean; task_id?: string }> {
  try {
    // 1. Insert task into review queue table
    const [inserted] = await sql`
      INSERT INTO hitl_tasks (company_id, request, context, status, created_at)
      VALUES (${companyId}, ${userQuery}, ${suggestedAnswer}, 'pending', NOW())
      RETURNING id
    `;

    // 2. Dispatch Slack alert hook if configured
    const slackUrl = env.SLACK_WEBHOOK_URL;
    if (slackUrl) {
      await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🚨 *HITL Escalation alert for company ${companyId}*: Low-confidence query requiring review: "${userQuery}"`
        })
      });
    }

    return { success: true, task_id: inserted.id };
  } catch (err: any) {
    console.error('Failed to escalate task to human agents:', err);
    return { success: false };
  }
}
