export interface OnboardingState {
  userId: string;
  completedSteps: string[];
  lastActive: string;
}

export function updateOnboardingProgress(
  currentState: OnboardingState,
  stepCompleted: string
): OnboardingState {
  const steps = new Set(currentState.completedSteps);
  steps.add(stepCompleted);

  return {
    userId: currentState.userId,
    completedSteps: Array.from(steps),
    lastActive: new Date().toISOString(),
  };
}
