import { Router } from 'itty-router';
import type { IRequest } from 'itty-router';
import type { RequestWithContext, Env } from './utils';
import { corsHeaders, verifyJWT } from './utils';
import { requirePermission, requireRole, requirePlanFeature, requireCompany } from './security/authorization';
import { handleWakeup, handleHealth, handleAdminMigrate, handleCheckInvite } from './handlers/public';
import { handleChat } from './handlers/chat';
import { handleGetAutomations, handleCreateAutomation } from './handlers/automation';
import { handleGetDocuments, handleUploadDocument, handleDeleteDocument, handleIngest } from './handlers/documents';
import {
  handleGetEmployees, handlePatchEmployee,
  handleGetEntitlements, handleGetUsageStats,
  handleFeedback, handleExportLogs,
  handleOverageSettings, handleKnowledgeGaps,
} from './handlers/employees';
import { handleClerkWebhook, handleVapiWebhook, handleMessageWebhook } from './handlers/webhooks';
import { handleVoiceStream } from './handlers/voice';
import { handlePrivacyExport, handlePrivacyDelete } from './compliance/dsar-export';
import { handleLegalAccept, handleCheckAcceptance } from './compliance/legal-accept';
import { handleConsentAudit } from './compliance/consent-audit';
import { handleListIncidents, handleCreateIncident, handleUpdateIncident, handleGetIncidentStatus } from './admin/incidents';
import { handleGetApprovals, handlePostApproval } from './handlers/approvals';
import { handleGetOnboardingStatus, handlePostOnboarding } from './handlers/onboarding';
import { handleGetChatHistory } from './handlers/chat-history';
import { handlePurgeAll } from './handlers/purge';

export function createRouter(env: Env) {
  const router = Router<RequestWithContext, any[], Response>({
    base: '/api',
  });

  router.all('*', async (request: RequestWithContext) => {
    request.env = env;
    const url = new URL(request.url);

    const authHeader = request.headers.get('Authorization');
    request.jwt = await verifyJWT(authHeader, env) || undefined;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }
  });

  // Public routes (no auth required)
  router.get('/wakeup', handleWakeup);
  router.get('/health', handleHealth);
  router.get('/public/check-invite', handleCheckInvite);

  // Webhooks (verified via signature, not JWT)
  router.post('/webhook', handleClerkWebhook);
  router.post('/vapi-webhook', handleVapiWebhook);
  router.post('/message/webhook', handleMessageWebhook);

  // Chat & Knowledge — requires chatbot plan + company
  router.post('/chat', requireCompany(), requirePlanFeature('chatbot'), handleChat);
  router.get('/knowledge-gaps', requireCompany(), requirePlanFeature('chatbot'), handleKnowledgeGaps);
  router.get('/chat/history', requireCompany(), requirePlanFeature('chatbot'), handleGetChatHistory);

  // Automation (Workflows) — requires workflows plan + settings permission
  router.get('/automation', requireCompany(), requirePlanFeature('workflows'), requirePermission('settings', 'read'), handleGetAutomations);
  router.post('/automation', requireCompany(), requirePlanFeature('workflows'), requirePermission('settings', 'create'), handleCreateAutomation);

  // Documents — requires documents plan
  router.get('/documents', requireCompany(), requirePlanFeature('documents'), requirePermission('documents', 'read'), handleGetDocuments);
  router.post('/documents', requireCompany(), requirePlanFeature('documents'), requirePermission('documents', 'create'), handleUploadDocument);
  router.delete('/documents/:id', requireCompany(), requirePlanFeature('documents'), requirePermission('documents', 'delete'), handleDeleteDocument);
  router.post('/ingest', requireCompany(), requirePlanFeature('documents'), requirePermission('documents', 'create'), handleIngest);

  // Employees / Team — requires team plan
  router.get('/employees', requireCompany(), requirePlanFeature('team'), requirePermission('employees', 'read'), handleGetEmployees);
  router.patch('/employees/:id', requireCompany(), requirePlanFeature('team'), requirePermission('employees', 'update'), handlePatchEmployee);

  // Billing / Entitlements — requires billing_status plan (settings permission)
  router.get('/entitlements', requireCompany(), requirePlanFeature('billing_status'), requirePermission('billing', 'read'), handleGetEntitlements);
  router.get('/usage-stats', requireCompany(), requirePlanFeature('usage'), requirePermission('billing', 'read'), handleGetUsageStats);
  router.post('/overage-settings', requireCompany(), requirePlanFeature('settings'), requirePermission('billing', 'update'), handleOverageSettings);

  // Feedback — requires settings plan
  router.post('/feedback', requireCompany(), requirePlanFeature('settings'), handleFeedback);

  // Export / Audit Logs — requires audit_logs plan
  router.get('/export-logs', requireCompany(), requirePlanFeature('audit_logs'), requirePermission('settings', 'read'), handleExportLogs);

  // Voice — requires voice_automation plan
  router.get('/voice/stream', requireCompany(), requirePlanFeature('voice_automation'), handleVoiceStream);

  // Admin — role: admin only (no plan check — internal tool)
  router.post('/admin/migrate', handleAdminMigrate);
  router.get('/admin/incidents', requireRole('admin'), handleListIncidents);
  router.post('/admin/incidents', requireRole('admin'), handleCreateIncident);
  router.patch('/admin/incidents/:id', requireRole('admin'), handleUpdateIncident);
  router.get('/admin/incidents/status', requireRole('admin'), handleGetIncidentStatus);
  router.post('/admin/purge', requireRole('admin'), handlePurgeAll);

  // Privacy / DSAR — requires settings plan
  router.get('/privacy/export', requireCompany(), requirePlanFeature('settings'), requirePermission('settings', 'read'), handlePrivacyExport);
  router.post('/privacy/delete', requireCompany(), requirePlanFeature('settings'), requirePermission('settings', 'update'), handlePrivacyDelete);

  // Legal — requires settings plan
  router.get('/legal/check-acceptance', requireCompany(), requirePlanFeature('settings'), requirePermission('settings', 'read'), handleCheckAcceptance);
  router.post('/legal/accept', requireCompany(), requirePlanFeature('settings'), requirePermission('settings', 'update'), handleLegalAccept);

  // Consent audit — requires settings plan
  router.post('/audit/consent', requireCompany(), requirePlanFeature('settings'), requirePermission('settings', 'read'), handleConsentAudit);

  // Approvals — requires approvals plan
  router.get('/approvals', requireCompany(), requirePlanFeature('approvals'), requirePermission('employees', 'read'), handleGetApprovals);
  router.post('/approvals', requireCompany(), requirePlanFeature('approvals'), requirePermission('employees', 'update'), handlePostApproval);

  // Onboarding — no permission gate (user may not have company_id yet)
  router.get('/onboarding', handleGetOnboardingStatus);
  router.post('/onboarding', handlePostOnboarding);

  router.all('*', (request: RequestWithContext) => {
    return new Response(
      JSON.stringify({ error: 'Not found', path: new URL(request.url).pathname }),
      { status: 404, headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' } }
    );
  });

  return router;
}
