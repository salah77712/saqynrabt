export async function safeGetToken(): Promise<string | null> {
  try {
    const { auth } = await import("@clerk/nextjs/server");
    const { getToken } = await auth();
    return await getToken();
  } catch {
    return null;
  }
}
