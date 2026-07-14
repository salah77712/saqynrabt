import { Router } from 'itty-router';
import type { IRequest } from 'itty-router';
import type { RequestWithContext, Env } from './utils';
import { corsHeaders, verifyJWT } from './utils';
import { requirePermission, requireRole } from './security/authorization';
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

  // Chat & Knowledge — documents:read
  router.post('/chat', handleChat);
  router.get('/knowledge-gaps', handleKnowledgeGaps);
  router.get('/chat/history', handleGetChatHistory);

  // Automation — settings:read / settings:create
  router.get('/automation', requirePermission('settings', 'read'), handleGetAutomations);
  router.post('/automation', requirePermission('settings', 'create'), handleCreateAutomation);

  // Documents — granular CRUD
  router.get('/documents', requirePermission('documents', 'read'), handleGetDocuments);
  router.post('/documents', requirePermission('documents', 'create'), handleUploadDocument);
  router.delete('/documents/:id', requirePermission('documents', 'delete'), handleDeleteDocument);
  router.post('/ingest', requirePermission('documents', 'create'), handleIngest);

  // Employees — employees:read / employees:update
  router.get('/employees', requirePermission('employees', 'read'), handleGetEmployees);
  router.patch('/employees/:id', requirePermission('employees', 'update'), handlePatchEmployee);

  // Billing — billing:read / billing:update
  router.get('/entitlements', requirePermission('billing', 'read'), handleGetEntitlements);
  router.get('/usage-stats', requirePermission('billing', 'read'), handleGetUsageStats);
  router.post('/overage-settings', requirePermission('billing', 'update'), handleOverageSettings);

  // Feedback — settings:create
  router.post('/feedback', requirePermission('settings', 'create'), handleFeedback);

  // Export / Settings — settings:read / settings:create
  router.get('/export-logs', requirePermission('settings', 'read'), handleExportLogs);

  // Voice — documents:read
  router.get('/voice/stream', requirePermission('documents', 'read'), handleVoiceStream);

  // Admin — role: admin only
  router.post('/admin/migrate', requireRole('admin'), handleAdminMigrate);
  router.get('/admin/incidents', requireRole('admin'), handleListIncidents);
  router.post('/admin/incidents', requireRole('admin'), handleCreateIncident);
  router.patch('/admin/incidents/:id', requireRole('admin'), handleUpdateIncident);
  router.get('/admin/incidents/status', requireRole('admin'), handleGetIncidentStatus);

  // Privacy / DSAR — settings:read / settings:update
  router.get('/privacy/export', requirePermission('settings', 'read'), handlePrivacyExport);
  router.post('/privacy/delete', requirePermission('settings', 'update'), handlePrivacyDelete);

  // Legal — settings:read / settings:update
  router.get('/legal/check-acceptance', requirePermission('settings', 'read'), handleCheckAcceptance);
  router.post('/legal/accept', requirePermission('settings', 'update'), handleLegalAccept);

  // Consent audit — settings:read
  router.post('/audit/consent', requirePermission('settings', 'read'), handleConsentAudit);

  // Approvals — employees:read / employees:update
  router.get('/approvals', requirePermission('employees', 'read'), handleGetApprovals);
  router.post('/approvals', requirePermission('employees', 'update'), handlePostApproval);

  // Onboarding — settings:read / settings:update
  router.get('/onboarding', requirePermission('settings', 'read'), handleGetOnboardingStatus);
  router.post('/onboarding', requirePermission('settings', 'update'), handlePostOnboarding);

  router.all('*', (request: RequestWithContext) => {
    return new Response(
      JSON.stringify({ error: 'Not found', path: new URL(request.url).pathname }),
      { status: 404, headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' } }
    );
  });

  return router;
}
