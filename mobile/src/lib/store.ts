import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'saqyn-auth-token';

interface Member {
  id: string;
  name: string;
  email: string;
  status: string;
}

interface AppState {
  token: string | null;
  user: any | null;
  entitlements: any | null;
  notifications: any[];
  setToken: (token: string | null) => Promise<void>;
  setUser: (user: any) => void;
  setEntitlements: (entitlements: any) => void;
  addNotification: (noti: any) => void;
  loadCachedState: () => Promise<void>;
}

export const useAppStore = create<AppState>((set) => ({
  token: null,
  user: null,
  entitlements: null,
  notifications: [],
  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  setEntitlements: (entitlements) => set({ entitlements }),
  addNotification: (noti) => set((state) => ({ notifications: [noti, ...state.notifications] })),
  loadCachedState: async () => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);
    if (token) set({ token });
  },
}));
