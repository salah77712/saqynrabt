import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const useAppStore = create<AppState>((set, get) => ({
  token: null,
  user: null,
  entitlements: null,
  notifications: [],
  setToken: async (token) => {
    if (token) {
      await AsyncStorage.setItem('saqyn-auth-token', token);
    } else {
      await AsyncStorage.removeItem('saqyn-auth-token');
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  setEntitlements: (entitlements) => set({ entitlements }),
  addNotification: (noti) => set((state) => ({ notifications: [noti, ...state.notifications] })),
  loadCachedState: async () => {
    const token = await AsyncStorage.getItem('saqyn-auth-token');
    if (token) set({ token });
  },
}));
