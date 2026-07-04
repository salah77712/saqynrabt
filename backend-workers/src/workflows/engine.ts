interface WorkflowStep {
  id: string;
  type: 'trigger' | 'condition' | 'action';
  actionType?: string;
  params?: Record<string, any>;
}

export async function executeWorkflow(
  steps: WorkflowStep[],
  context: Record<string, any>
): Promise<Record<string, any>> {
  let currentContext = { ...context };

  for (const step of steps) {
    if (step.type === 'trigger') {
      currentContext.triggerFired = true;
      currentContext.triggeredAt = new Date().toISOString();
    } else if (step.type === 'condition') {
      // Basic business hours condition check simulation
      const hour = new Date().getHours();
      const isOutsideHours = hour > 18 || hour < 8;
      currentContext.isOutsideHours = isOutsideHours;
      
      if (step.actionType === 'check_hours' && !isOutsideHours) {
        // Stop execution chain if condition fails
        break;
      }
    } else if (step.type === 'action') {
      currentContext.actionCompleted = true;
      currentContext.actionTimestamp = new Date().toISOString();
      currentContext.routedAgent = 'Secure-SOP-AI';
    }
  }

  return currentContext;
}
