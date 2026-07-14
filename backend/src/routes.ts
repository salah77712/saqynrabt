import { Router } from 'itty-router';
import type { IRequest } from 'itty-router';
import type { RequestWithContext, Env } from './utils';
import { corsHeaders, verifyJWT } from './utils';
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

  router.get('/wakeup', handleWakeup);
  router.get('/health', handleHealth);
  router.get('/public/check-invite', handleCheckInvite);

  router.post('/chat', handleChat);

  router.get('/automation', handleGetAutomations);
  router.post('/automation', handleCreateAutomation);

  router.get('/documents', handleGetDocuments);
  router.post('/documents', handleUploadDocument);
  router.delete('/documents/:id', handleDeleteDocument);

  router.post('/ingest', handleIngest);

  router.get('/employees', handleGetEmployees);
  router.patch('/employees/:id', handlePatchEmployee);

  router.get('/entitlements', handleGetEntitlements);
  router.get('/usage-stats', handleGetUsageStats);

  router.post('/feedback', handleFeedback);
  router.get('/export-logs', handleExportLogs);
  router.post('/overage-settings', handleOverageSettings);
  router.get('/knowledge-gaps', handleKnowledgeGaps);

  router.get('/voice/stream', handleVoiceStream);

  router.post('/webhook', handleClerkWebhook);
  router.post('/vapi-webhook', handleVapiWebhook);
  router.post('/message/webhook', handleMessageWebhook);

  router.post('/admin/migrate', handleAdminMigrate);
  router.get('/admin/incidents', handleListIncidents);
  router.post('/admin/incidents', handleCreateIncident);
  router.patch('/admin/incidents/:id', handleUpdateIncident);
  router.get('/admin/incidents/status', handleGetIncidentStatus);

  router.get('/privacy/export', handlePrivacyExport);
  router.post('/privacy/delete', handlePrivacyDelete);

  router.get('/legal/check-acceptance', handleCheckAcceptance);
  router.post('/legal/accept', handleLegalAccept);

  router.post('/audit/consent', handleConsentAudit);

  router.get('/approvals', handleGetApprovals);
  router.post('/approvals', handlePostApproval);

  router.get('/onboarding', handleGetOnboardingStatus);
  router.post('/onboarding', handlePostOnboarding);

  router.get('/chat/history', handleGetChatHistory);

  router.all('*', (request: RequestWithContext) => {
    return new Response(
      JSON.stringify({ error: 'Not found', path: new URL(request.url).pathname }),
      { status: 404, headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' } }
    );
  });

  return router;
}
