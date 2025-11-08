import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApi } from '../services/authApi';

type User = {
  id: string;
  name: string;
  email?: string;
  phone: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user?: User;
  token?: string;
  login: (payload: { emailOrPhone: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: undefined,
      token: undefined,
      async login(payload) {
        const response = await authApi.login(payload);
        set({ isAuthenticated: true, user: response.user, token: response.token });
      },
      logout() {
        set({ isAuthenticated: false, user: undefined, token: undefined });
      }
    }),
    {
      name: 'freshveggie-auth',
      storage: {
        getItem: (name: string) => AsyncStorage.getItem(name),
        setItem: (name: string, value: string) => AsyncStorage.setItem(name, value),
        removeItem: (name: string) => AsyncStorage.removeItem(name)
      }
    }
  )
);

