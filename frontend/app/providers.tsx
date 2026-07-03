'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';

export interface Entitlements {
  max_employees: number;
  max_documents: number;
  max_questions: number;
  dept_limit: number;
  active_employees: number;
  active_documents: number;
}

interface EntitlementsContextProps {
  entitlements: Entitlements | null;
  loading: boolean;
  refreshEntitlements: () => Promise<void>;
  mockMode: boolean;
  setMockMode: (val: boolean) => void;
}

const EntitlementsContext = createContext<EntitlementsContextProps>({
  entitlements: null,
  loading: true,
  refreshEntitlements: async () => {},
  mockMode: false,
  setMockMode: () => {},
});

export const useEntitlements = () => useContext(EntitlementsContext);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_Y2xlcmsuc2FxeW5yYWJ0LmNvbSQ'}>
      <EntitlementsProvider>
        {children}
      </EntitlementsProvider>
    </ClerkProvider>
  );
}

function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [loading, setLoading] = useState(true);
  const [mockMode, setMockMode] = useState(false);

  // Initialize mockMode if Clerk keys are missing to ensure smooth running
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY === 'pk_test_Y2xlcmsuc2FxeW5yYWJ0LmNvbSQ') {
      setMockMode(true);
      // set some mock entitlements so the demo works out-of-the-box
      setEntitlements({
        max_employees: 50,
        max_documents: 5,
        max_questions: 1000,
        dept_limit: 3,
        active_employees: 1,
        active_documents: 1
      });
      setLoading(false);
    }
  }, []);

  const refreshEntitlements = async () => {
    if (mockMode) return;
    if (!isSignedIn) {
      setEntitlements(null);
      setLoading(false);
      return;
    }
    try {
      const token = await getToken();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';
      const response = await fetch(`${apiUrl}/api/entitlements`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEntitlements(data);
      }
    } catch (err) {
      console.error('Failed to fetch entitlements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn && !mockMode) {
      refreshEntitlements();
    }
  }, [isLoaded, isSignedIn, mockMode]);

  return (
    <EntitlementsContext.Provider value={{ entitlements, loading, refreshEntitlements, mockMode, setMockMode }}>
      {children}
    </EntitlementsContext.Provider>
  );
}
