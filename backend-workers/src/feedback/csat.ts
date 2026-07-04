export async function saveCsatRating(
  db: any,
  requestId: string,
  rating: number,
  comment?: string
) {
  const query = `
    UPDATE automation_requests
    SET csat_rating = $1, csat_comment = $2, csat_submitted_at = NOW()
    WHERE id = $3
  `;
  return db.query(query, [rating, comment || null, requestId]);
}
