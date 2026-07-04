/**
 * Agent-based internal tools registry
 */
export interface AgentTool {
  name: string;
  description: string;
  execute: (args: any, env: any, sql: any) => Promise<any>;
}

export const AGENT_TOOLS: Record<string, AgentTool> = {
  search_knowledge_base: {
    name: 'search_knowledge_base',
    description: 'Queries corporate SOP handbooks for answers. Requires "query" arg.',
    execute: async ({ query }, env, sql) => {
      // Mocked hybrid retrieval search
      return `Found context from company files matching "${query}": Vacation requests require a 5-day notice submitted via the approvals page.`;
    }
  },

  get_employee_balance: {
    name: 'get_employee_balance',
    description: 'Retrieves current vacation/sick leaves for an employee. Requires "employee_id".',
    execute: async ({ employee_id }, env, sql) => {
      return { employee_id, vacation_balance_days: 14, sick_leave_balance_days: 5 };
    }
  },

  book_appointment: {
    name: 'book_appointment',
    description: 'Schedules a booking for a client. Requires "customer_name" and "datetime".',
    execute: async ({ customer_name, datetime }, env, sql) => {
      return { success: true, booking_id: `b-${Date.now()}`, customer_name, datetime, status: 'confirmed' };
    }
  },

  send_email: {
    name: 'send_email',
    description: 'Sends alerts to recipients. Requires "recipient", "subject", and "body".',
    execute: async ({ recipient, subject, body }, env, sql) => {
      console.log(`[Agent Send Email]: to=${recipient}, subject=${subject}`);
      return { success: true };
    }
  },

  query_external_api: {
    name: 'query_external_api',
    description: 'Calls external REST APIs. Requires "url", "method", and optionally "body".',
    execute: async ({ url, method, body }, env, sql) => {
      try {
        const res = await fetch(url, {
          method: method || 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: body ? JSON.stringify(body) : undefined
        });
        return await res.json();
      } catch (err: any) {
        return { error: 'API_CALL_FAILED', message: err.message };
      }
    }
  }
};
