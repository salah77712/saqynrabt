import { neon } from '@neondatabase/serverless';
import type { RequestWithContext, JWTPayload } from '../utils';
import { corsHeaders } from '../utils';

export type PlanFeature =
  | 'chatbot'
  | 'documents'
  | 'voice_automation'
  | 'workflows'
  | 'call_dashboard'
  | 'team'
  | 'approvals'
  | 'inbox'
  | 'integrations'
  | 'usage'
  | 'audit_logs'
  | 'settings'
  | 'billing_status'
  | 'admin_panel'
  | 'profile';

export const PLAN_FEATURES: Record<string, PlanFeature[]> = {
  chatbot: ['chatbot', 'documents', 'profile'],
  voice: ['voice_automation', 'workflows', 'call_dashboard', 'profile'],
  platform: [
    'chatbot', 'documents', 'voice_automation', 'workflows', 'call_dashboard',
    'team', 'approvals', 'inbox', 'integrations', 'usage', 'audit_logs',
    'settings', 'billing_status', 'admin_panel', 'profile',
  ],
};

/**
 * Resource-action permission check (LPAC)
 */
export function hasResourceActionPermission(
  memberPermissions: string[] | null | undefined,
  resource: 'documents' | 'employees' | 'billing' | 'settings',
  action: 'create' | 'read' | 'update' | 'delete'
): boolean {
  if (!memberPermissions || !Array.isArray(memberPermissions)) return false;
  return memberPermissions.includes(`${resource}:${action}`);
}

/**
 * Check whether a JWT payload grants a specific resource-action permission
 */
export function jwTPayloadHasPermission(
  jwt: JWTPayload,
  resource: 'documents' | 'employees' | 'billing' | 'settings',
  action: 'create' | 'read' | 'update' | 'delete'
): boolean {
  if (!jwt) return false;
  if (jwt.role === 'admin') return true;
  return hasResourceActionPermission(jwt.permissions, resource, action);
}

/**
 * Middleware factory — returns an itty-router handler that rejects
 * the request if the JWT lacks the given resource:action permission.
 */
export function requirePermission(
  resource: 'documents' | 'employees' | 'billing' | 'settings',
  action: 'create' | 'read' | 'update' | 'delete'
) {
  return async (request: RequestWithContext): Promise<Response | void> => {
    const jwt = request.jwt;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
    if (!jwTPayloadHasPermission(jwt, resource, action)) {
      return new Response(JSON.stringify({ error: 'Forbidden: insufficient permissions' }), {
        status: 403,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
  };
}

/**
 * Middleware factory — rejects the request if the JWT role is not in allowedRoles.
 */
export function requireRole(...allowedRoles: string[]) {
  return async (request: RequestWithContext): Promise<Response | void> => {
    const jwt = request.jwt;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
    if (!allowedRoles.includes(jwt.role || '')) {
      return new Response(JSON.stringify({ error: 'Forbidden: insufficient role' }), {
        status: 403,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
  };
}

/**
 * Wraps a handler so it first checks the JWT payload for the given permission.
 * If the check fails, a 403 response is returned immediately.
 */
export function withPermission<
  T extends (...args: any[]) => Promise<Response>,
>(
  resource: 'documents' | 'employees' | 'billing' | 'settings',
  action: 'create' | 'read' | 'update' | 'delete',
  handler: T
): T {
  const wrapped = async (request: RequestWithContext, ...rest: any[]) => {
    const jwt = request.jwt;
    if (!jwt) {
      const headers = { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' };
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
    }
    if (!jwTPayloadHasPermission(jwt, resource, action)) {
      const headers = { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' };
      return new Response(JSON.stringify({ error: 'Forbidden: insufficient permissions' }), { status: 403, headers });
    }
    return handler(request, ...rest);
  };
  return wrapped as unknown as T;
}

/**
 * Middleware — rejects if the JWT lacks a company_id (user hasn't onboarded).
 */
export function requireCompany() {
  return async (request: RequestWithContext): Promise<Response | void> => {
    const jwt = request.jwt;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
    if (!jwt.company_id) {
      return new Response(JSON.stringify({ error: 'onboarding_required' }), {
        status: 403,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
  };
}

/**
 * Rejects if the company's plan does not include the required feature.
 * Returns a plan-aware 403 with feature_not_in_plan.
 */
export function requirePlanFeature(feature: PlanFeature) {
  return async (request: RequestWithContext): Promise<Response | void> => {
    const jwt = request.jwt;
    if (!jwt) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }

    let planKey = jwt.plan_key || 'platform';
    const allowed = PLAN_FEATURES[planKey]?.includes(feature) ?? false;

    if (!allowed) {
      return new Response(JSON.stringify({ error: 'feature_not_in_plan', feature }), {
        status: 403,
        headers: { ...corsHeaders(request, request.env), 'Content-Type': 'application/json' },
      });
    }
  };
}
