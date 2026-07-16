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
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!clerkPublishableKey) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FB] px-6 text-center">
        <svg aria-hidden="true" className="w-10 h-10 text-[#2A5CFF] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-extrabold text-[#141F33] tracking-tight">Configuration Error</h1>
        <p className="text-xs font-semibold text-[#141F33] max-w-sm mt-3 leading-relaxed">
          Clerk authentication keys are missing. Please set{' '}
          <code className="bg-[#F8F9FB] px-1.5 py-0.5 rounded text-[10px] font-bold">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>{' '}
          in your environment variables to proceed.
        </p>
      </div>
    );
  }

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
