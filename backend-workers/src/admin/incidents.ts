/**
 * Security Incident Management endpoints for admin dashboard.
 * Supports creating, updating, and listing security incidents.
 * Compliant with Qatari Law No. 13 of 2016 breach notification requirements.
 */

import { neon } from '@neondatabase/serverless';
import { verifyJWT, corsHeaders, logAudit } from '../utils';
import type { Env } from '../utils';

interface CreateIncidentBody {
  incidentType: 'data_breach' | 'system_outage' | 'unauthorised_access' | 'vulnerability' | 'other';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedResources?: string;
  startTime?: string;
}

interface UpdateIncidentBody {
  status?: 'new' | 'investigation' | 'containment' | 'eradication' | 'recovery' | 'closed';
  assignedTo?: string;
  clientNotified?: boolean;
  timelineAction?: string;
  timelineNote?: string;
}

export async function handleListIncidents(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  const authHeader = request.headers.get('Authorization');
  const jwt = await verifyJWT(authHeader, env);
  if (!jwt) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers });
  }

  if (jwt.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), { status: 403, headers });
  }

  const url = new URL(request.url);
  const statusFilter = url.searchParams.get('status');
  const severityFilter = url.searchParams.get('severity');

  try {
    const sql = neon(env.DATABASE_URL);
    let query = sql`SELECT * FROM security_incidents`;

    if (statusFilter) {
      query = sql`${query} WHERE status = ${statusFilter}`;
    }
    if (severityFilter) {
      query = sql`${query} AND severity = ${severityFilter}`;
    }

    query = sql`${query} ORDER BY created_at DESC LIMIT 100`;

    const incidents = await query;
    return new Response(JSON.stringify({ incidents }), { status: 200, headers });

  } catch (err: any) {
    console.error('Failed to list incidents:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleCreateIncident(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  const authHeader = request.headers.get('Authorization');
  const jwt = await verifyJWT(authHeader, env);
  if (!jwt || jwt.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), { status: 403, headers });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  let body: CreateIncidentBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers });
  }

  if (!body.title || !body.description || !body.incidentType || !body.severity) {
    return new Response(JSON.stringify({ error: 'title, description, incidentType, and severity are required' }), { status: 400, headers });
  }

  try {
    const sql = neon(env.DATABASE_URL);

    const [incident] = await sql`
      INSERT INTO security_incidents (incident_type, severity, title, description, affected_resources, start_time, reported_by)
      VALUES (
        ${body.incidentType},
        ${body.severity},
        ${body.title},
        ${body.description},
        ${body.affectedResources || null},
        ${body.startTime ? new Date(body.startTime) : null},
        ${jwt.email || jwt.sub}
      )
      RETURNING *
    `;

    // Add initial timeline entry
    await sql`
      INSERT INTO incident_timeline (incident_id, action, actor, note)
      VALUES (${incident.id}, 'Incident created', ${jwt.email || jwt.sub}, ${`Reported as ${body.severity} ${body.incidentType}`})
    `;

    await logAudit(env, 'admin', jwt.sub, 'incident_created', {
      incidentId: incident.id,
      type: body.incidentType,
      severity: body.severity,
    });

    // If critical/high data breach, trigger notification workflow
    if (body.severity === 'critical' || (body.severity === 'high' && body.incidentType === 'data_breach')) {
      triggerBreachNotification(incident, env);
    }

    return new Response(JSON.stringify({ incident }), { status: 201, headers });

  } catch (err: any) {
    console.error('Failed to create incident:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

export async function handleUpdateIncident(request: Request, env: Env, incidentId: string): Promise<Response> {
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  const authHeader = request.headers.get('Authorization');
  const jwt = await verifyJWT(authHeader, env);
  if (!jwt || jwt.role !== 'admin') {
    return new Response(JSON.stringify({ error: 'Forbidden: admin access required' }), { status: 403, headers });
  }

  if (request.method !== 'PATCH') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  let body: UpdateIncidentBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400, headers });
  }

  try {
    const sql = neon(env.DATABASE_URL);

    const updates: string[] = [];
    const values: any[] = [];

    if (body.status) {
      updates.push(`status = ${body.status}`);
      values.push(body.status);

      if (body.timelineAction) {
        await sql`
          INSERT INTO incident_timeline (incident_id, action, actor, note)
          VALUES (${incidentId}, ${body.timelineAction}, ${jwt.email || jwt.sub}, ${body.timelineNote || null})
        `;
      }
    }

    if (body.assignedTo) {
      updates.push(`assigned_to = ${body.assignedTo}`);
    }

    if (body.clientNotified !== undefined) {
      updates.push(`client_notified = ${body.clientNotified}`);
      updates.push(`notified_at = ${body.clientNotified ? new Date() : null}`);
    }

    if (updates.length > 0) {
      updates.push(`updated_at = NOW()`);
      await sql`
        UPDATE security_incidents SET ${updates.join(', ')} WHERE id = ${incidentId}
      `;
    }

    const [incident] = await sql`SELECT * FROM security_incidents WHERE id = ${incidentId}`;

    await logAudit(env, 'admin', jwt.sub, 'incident_updated', {
      incidentId,
      changes: body,
    });

    return new Response(JSON.stringify({ incident }), { status: 200, headers });

  } catch (err: any) {
    console.error('Failed to update incident:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500, headers });
  }
}

async function triggerBreachNotification(incident: any, env: Env): Promise<void> {
  try {
    console.log('Triggering breach notification for incident:', incident.id);

    const sql = neon(env.DATABASE_URL);
    const affectedClients = await sql`
      SELECT DISTINCT company_id FROM audit_logs WHERE action = 'data_breach'
    `;

    for (const client of affectedClients) {
      await sql`
        INSERT INTO audit_logs (company_id, user_id, action, details)
        VALUES (${client.company_id}, 'system', 'data_breach_notification', ${JSON.stringify({
          incidentId: incident.id,
          type: incident.incident_type,
          severity: incident.severity,
          notifiedAt: new Date().toISOString(),
        })}, NULL, NULL)
      `;
    }
  } catch (err) {
    console.error('Breach notification failed:', err);
  }
}

export async function handleGetIncidentStatus(request: Request, env: Env): Promise<Response> {
  const headers = corsHeaders(request, env);
  headers['Content-Type'] = 'application/json';

  try {
    const sql = neon(env.DATABASE_URL);
    const activeIncidents = await sql`
      SELECT id, severity, status, title, created_at, updated_at
      FROM security_incidents
      WHERE status NOT IN ('closed', 'recovery')
      ORDER BY severity DESC, created_at DESC
    `;

    const hasActiveIncidents = activeIncidents.length > 0;
    return new Response(JSON.stringify({
      status: hasActiveIncidents ? 'incident_active' : 'all_operational',
      activeIncidents: activeIncidents.length,
      incidents: activeIncidents,
    }), { status: 200, headers });

  } catch (err: any) {
    console.error('Failed to get incident status:', err);
    return new Response(JSON.stringify({ status: 'unknown', error: err.message }), { status: 500, headers });
  }
}
