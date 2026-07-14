import { AGENT_TOOLS } from './tools';

export interface AgentStep {
  thought: string;
  tool?: string;
  toolInput?: any;
  observation?: string;
}

/**
 * Custom agent reasoning loop (Think -> Act -> Observe -> Repeat)
 */
export async function runAgentExecutor(
  query: string,
  allowedTools: string[],
  env: any,
  sql: any
): Promise<{ finalAnswer: string; steps: AgentStep[] }> {
  const steps: AgentStep[] = [];
  let currentPrompt = `You are a private operations assistant. The user wants to: "${query}". Determine what to do next.`;
  let finalAnswer = '';
  
  // Maximum of 3 reasoning iterations
  for (let iteration = 1; iteration <= 3; iteration++) {
    console.log(`[Agent reasoning loop] Iteration ${iteration}`);

    // 1. Generate a reasoning thought (in a real app, this queries LLM with tool instructions)
    let thought = `Thinking step ${iteration}: Need to evaluate query.`;
    let toolToCall: string | undefined = undefined;
    let toolInput: any = undefined;

    // Simulate simple routing heuristics based on query text
    if (iteration === 1) {
      if (query.toLowerCase().includes('vacation') || query.toLowerCase().includes('balance')) {
        thought = 'Query asks about vacation balance. I must fetch details from the database.';
        toolToCall = 'get_employee_balance';
        toolInput = { employee_id: 'emp-101' };
      } else if (query.toLowerCase().includes('book') || query.toLowerCase().includes('appointment')) {
        thought = 'User wants to schedule a booking. Calling the appointment scheduler.';
        toolToCall = 'book_appointment';
        toolInput = { customer_name: 'Karim', datetime: '2026-07-05T10:00:00Z' };
      } else {
        thought = 'User is asking a policy question. Searching the corporate knowledge base.';
        toolToCall = 'search_knowledge_base';
        toolInput = { query };
      }
    } else if (iteration === 2) {
      thought = 'Retrieved data successfully. Preparing confirmation alerts.';
      toolToCall = 'send_email';
      toolInput = { recipient: 'manager@alsafa.qa', subject: 'Agent Task Completed', body: 'Alert' };
    } else {
      thought = 'All tasks completed successfully. Synthesizing final response.';
    }

    // 2. Perform the Action if tool is allowed
    let observation = '';
    if (toolToCall && allowedTools.includes(toolToCall)) {
      const tool = AGENT_TOOLS[toolToCall];
      if (tool) {
        try {
          const result = await tool.execute(toolInput, env, sql);
          observation = JSON.stringify(result);
        } catch (err: any) {
          observation = `Error calling tool: ${err.message}`;
        }
      } else {
        observation = `Tool "${toolToCall}" not registered in the system.`;
      }
    }

    steps.push({
      thought,
      tool: toolToCall,
      toolInput,
      observation: observation || undefined
    });

    if (!toolToCall) {
      finalAnswer = `I have processed your request. Details: ${steps[iteration - 2]?.observation || 'Success.'}`;
      break;
    }
  }

  if (!finalAnswer) {
    finalAnswer = 'Processed. Action items completed and synced with corporate channels.';
  }

  return { finalAnswer, steps };
}
