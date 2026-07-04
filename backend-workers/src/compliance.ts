/**
 * GDPR & Privacy Compliance Tools (Export and Deletion)
 */

/**
 * Exports all personal details and log references belonging to a client user
 */
export async function exportUserData(
  clerkUserId: string,
  sql: any
): Promise<any> {
  const [member] = await sql`
    SELECT name, email, role, permissions, status, created_at
    FROM company_members
    WHERE clerk_user_id = ${clerkUserId}
  `;

  if (!member) {
    throw new Error('User not found');
  }

  // Fetch all chat logs associated with the user email
  const chatLogs = await sql`
    SELECT question, response, created_at
    FROM chat_logs
    WHERE employee_email = ${member.email}
    ORDER BY created_at DESC
  `;

  return {
    profile: member,
    activity_logs: chatLogs,
    exported_at: new Date().toISOString(),
  };
}

/**
 * Anonymizes or deletes personal records upon request (GDPR "Right to be Forgotten")
 */
export async function deleteUserData(
  clerkUserId: string,
  sql: any
): Promise<{ success: boolean }> {
  const [member] = await sql`
    SELECT email FROM company_members WHERE clerk_user_id = ${clerkUserId}
  `;

  if (member) {
    // 1. Redact employee email identifiers from chat histories
    await sql`
      UPDATE chat_logs
      SET employee_email = 'anonymized-user@saqynrabt.com'
      WHERE employee_email = ${member.email}
    `;
  }

  // 2. Remove member record from workspace directory
  await sql`
    DELETE FROM company_members
    WHERE clerk_user_id = ${clerkUserId}
  `;

  return { success: true };
}
