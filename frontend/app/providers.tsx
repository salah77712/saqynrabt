'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 30_000,
    },
  },
});

export type Locale = 'en' | 'fr' | 'ar' | 'hi';

interface LanguageContextProps {
  locale: Locale;
  setLocale: (value: string) => void;
}

const LanguageContext = createContext<LanguageContextProps>({
  locale: 'en',
  setLocale: () => {},
});

export const useLocale = () => useContext(LanguageContext);

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

export function getCookieConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('cookie_consent_accepted') === 'accepted';
}

export function Providers({ children }: { children: React.ReactNode }) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Z3VpZGluZy1jdWItMTcuY2xlcmsuYWNjb3VudHMuZGV2JA";

  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider publishableKey={clerkPublishableKey}>
        <LanguageProvider>
          <EntitlementsProvider>
            {children}
          </EntitlementsProvider>
        </LanguageProvider>
      </ClerkProvider>
    </QueryClientProvider>
  );
}

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const validLocales: Locale[] = ['en', 'fr', 'ar', 'hi'];

  const setLocale = (value: string) => {
    if (validLocales.includes(value as Locale)) {
      setLocaleState(value as Locale);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = window.localStorage.getItem('saqyn-locale') || '';
      if (savedLocale && validLocales.includes(savedLocale as Locale)) {
        setLocaleState(savedLocale as Locale);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('saqyn-locale', locale);
    }
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

function EntitlementsProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const [entitlements, setEntitlements] = useState<Entitlements | null>(null);
  const [loading, setLoading] = useState(true);
  const [mockMode, setMockMode] = useState(false);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      setMockMode(true);
      setEntitlements({
        max_employees: 50,
        max_documents: 5,
        max_questions: 1000,
        dept_limit: 3,
        active_employees: 1,
        active_documents: 1,
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
      const response = await fetch('/api/entitlements');
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
