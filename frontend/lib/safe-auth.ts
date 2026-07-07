import { auth } from "@clerk/nextjs/server";

export async function safeGetToken(): Promise<string | null> {
  try {
    const { getToken } = await auth();
    return await getToken();
  } catch (e) {
    console.error("[safeGetToken] failed:", e);
    return null;
  }
}
