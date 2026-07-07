import type { Clerk as ClerkType } from '@clerk/nextjs/dist/types/client';

declare global {
  interface Window {
    Clerk?: ClerkType;
  }
}

export {};
