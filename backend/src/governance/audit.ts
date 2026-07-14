export async function logAiDecision(
  db: any,
  companyId: string,
  userId: string,
  input: string,
  output: string,
  model: string,
  score: number
) {
  const query = `
    INSERT INTO ai_decision_logs (company_id, user_id, input_text, output_text, model_version, confidence_score, logged_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW())
  `;
  return db.query(query, [companyId, userId, input, output, model, score]);
}
