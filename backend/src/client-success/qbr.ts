export function compileQbrStatistics(usageData: {
  monthlyQueries: number[];
  voiceMinutes: number;
  unansweredQuestions: string[];
}) {
  const totalQueries = usageData.monthlyQueries.reduce((a, b) => a + b, 0);
  const averageAccuracy = 96.5; // Simulated retrieve rate
  
  return {
    qbrPeriod: 'Q2-2026',
    totalQueries,
    voiceMinutesConsumed: usageData.voiceMinutes,
    timeSavedHours: Math.round(totalQueries * 0.08), // Simulates 5 minutes saved per query
    accuracyScore: averageAccuracy,
    gapsDetectedCount: usageData.unansweredQuestions.length,
  };
}
