import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const isMock = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 
                   process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA';

    let token: string | null = null;
    if (isMock) {
      token = 'mock-token-dummy_company-user_admin12345demo-admin';
    } else {
      const { getToken } = auth();
      token = await getToken();
    }

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/entitlements`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("BFF error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
