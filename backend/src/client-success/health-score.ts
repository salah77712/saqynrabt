export function calculateCompanyHealth(metrics: {
  loginFrequency: number; // logins per week
  questionsSent: number;
  openSupportTickets: number;
  csatRating: number; // 1 to 5
}): number {
  let score = 100;

  // Deduction rule 1: low usage
  if (metrics.loginFrequency < 2) score -= 20;
  
  // Deduction rule 2: open tickets
  score -= metrics.openSupportTickets * 10;

  // Deduction rule 3: low CSAT
  if (metrics.csatRating < 3.5) score -= 15;

  return Math.max(0, Math.min(100, score));
}
