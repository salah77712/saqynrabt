import { getAuth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';

export interface SafeAuthContext {
  userId: string | null;
  getToken: (options?: { template?: string }) => Promise<string | null>;
}

export function getSafeAuth(req: NextRequest): SafeAuthContext {
  try {
    const authData = getAuth(req);

    return {
      userId: authData.userId,
      getToken: async (options?: { template?: string }) => {
        try {
          // Always try without template first — returns raw Clerk session token
          // that the backend can verify with CLERK_SECRET_KEY via verifyToken()
          const token = await authData.getToken();
          return token;
        } catch (err) {
          console.warn('getToken failed:', err);
          return null;
        }
      }
    };
  } catch (err) {
    console.warn('getSafeAuth: Clerk context unavailable:', err);
    return {
      userId: null,
      getToken: async () => null,
    };
  }
}
