const costTiers = {
  voiceMinuteCost: 0.15, // QAR per minute
  textRequestCost: 0.05, // QAR per text query
};

export function computeUsageCosts(usage: {
  voiceMinutesUsed: number;
  textRequestsUsed: number;
}): { voiceTotal: number; textTotal: number; grandTotal: number } {
  const voiceTotal = usage.voiceMinutesUsed * costTiers.voiceMinuteCost;
  const textTotal = usage.textRequestsUsed * costTiers.textRequestCost;

  return {
    voiceTotal: Math.round(voiceTotal * 100) / 100,
    textTotal: Math.round(textTotal * 100) / 100,
    grandTotal: Math.round((voiceTotal + textTotal) * 100) / 100,
  };
}
