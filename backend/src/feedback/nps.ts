export async function saveNpsResponse(
  db: any,
  companyId: string,
  userId: string,
  rating: number,
  comment: string
) {
  const query = `
    INSERT INTO nps_responses (company_id, user_id, rating, comment, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  return db.query(query, [companyId, userId, rating, comment]);
}

export function shouldPromptNps(lastPromptDate?: string): boolean {
  if (!lastPromptDate) return true;
  const ninetyDays = 90 * 24 * 60 * 60 * 1000;
  return Date.now() - new Date(lastPromptDate).getTime() > ninetyDays;
}
