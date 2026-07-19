import { NextResponse } from "next/server";
import { safeGetToken } from "@/lib/safe-auth";

export async function POST(request: Request) {
  const token = await safeGetToken();
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
  try {
    const body = await request.json().catch(() => ({}));
    const { publicToken } = body;

    if (publicToken) {
      const mockAccountToken = `acc_token_${Math.random().toString(36).substring(7)}`;
      return NextResponse.json({ success: true, integration: { linked_account_token: mockAccountToken } }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
    }

    const mockLinkToken = `link_token_mock_${Math.random().toString(36).substring(7)}`;
    return NextResponse.json({ linkToken: mockLinkToken }, { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  } catch (error: any) {
    return NextResponse.json({ message: error.message || "Error creating link" }, { status: 500, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } });
  }
}
