/**
 * Saves chat message rating feedback to Postgres database
 */
export async function saveRatingFeedback(
  request: Request,
  companyId: string,
  sql: any
): Promise<Response> {
  try {
    const body: any = await request.json();
    const messageId = body.chat_message_id;
    const rating = body.rating; // 1-5
    const comment = body.comment || '';

    if (!messageId || !rating) {
      return new Response(JSON.stringify({ error: 'MISSING_FIELDS' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Insert feedback log into NeonDB
    await sql`
      INSERT INTO chat_feedback (company_id, chat_message_id, rating, comment, created_at)
      VALUES (${companyId}, ${messageId}, ${rating}, ${comment}, NOW())
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: 'SAVE_FAILED', message: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
