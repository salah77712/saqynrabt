/**
 * Workflow engine evaluation and routing handlers
 */
export interface WorkflowRule {
  id: string;
  company_id: string;
  name: string;
  trigger: 'booking.created' | 'complaint.routed' | 'chat.answered';
  action: 'Send Slack Notification' | 'Trigger outbound Webhook' | 'Send Admin Email';
  active: boolean;
}

/**
 * Evaluates company workflows when a specific event fires
 */
export async function triggerWorkflowEvent(
  companyId: string,
  event: 'booking.created' | 'complaint.routed' | 'chat.answered',
  payload: any,
  sql: any,
  env: any
): Promise<void> {
  try {
    // 1. Fetch active workflows for tenant
    const rules: WorkflowRule[] = await sql`
      SELECT id, name, trigger, action, active
      FROM workflows
      WHERE company_id = ${companyId} AND trigger = ${event} AND active = true
    `;

    for (const rule of rules) {
      console.log(`Triggering workflow rule "${rule.name}" for company ${companyId}`);

      if (rule.action === 'Send Slack Notification') {
        await sendSlackAlert(env, companyId, rule.name, payload);
      } else if (rule.action === 'Trigger outbound Webhook') {
        await dispatchOutboundWebhook(env, companyId, event, payload, sql);
      } else if (rule.action === 'Send Admin Email') {
        // Send alert via templates
      }
    }
  } catch (err) {
    console.error('Workflow evaluation failed:', err);
  }
}

/**
 * Sends a Slack Webhook message
 */
async function sendSlackAlert(
  env: any,
  companyId: string,
  ruleName: string,
  payload: any
): Promise<void> {
  const slackUrl = env.SLACK_WEBHOOK_URL;
  if (!slackUrl) {
    console.log('[Slack Mock Alert]: no webhook URL configured.');
    return;
  }

  try {
    await fetch(slackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `[!] *SAQYN WORKFLOW: ${ruleName}*\nEvent details: ${JSON.stringify(payload)}`
      })
    });
  } catch (err) {
    console.error('Slack webhook dispatch failed:', err);
  }
}

/**
 * Dispatches payload to external registered webhooks
 */
async function dispatchOutboundWebhook(
  env: any,
  companyId: string,
  event: string,
  payload: any,
  sql: any
): Promise<void> {
  try {
    const endpoints = await sql`
      SELECT url FROM webhooks_outgoing
      WHERE company_id = ${companyId}
    `;

    for (const ep of endpoints) {
      fetch(ep.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, payload, timestamp: new Date().toISOString() })
      }).catch(err => console.error(`Webhook send failed for ${ep.url}:`, err));
    }
  } catch (err) {
    console.error('Outbound webhook query failed:', err);
  }
}
