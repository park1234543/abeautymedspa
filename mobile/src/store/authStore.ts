import { create } from 'zustand';
import { Platform } from 'react-native';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api';
import type { GoogleUser } from '../services/googleAuth';

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
      return;
    }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.setItemAsync(key, value);
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
      return;
    }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.deleteItemAsync(key);
  },
};

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (googleUser: GoogleUser) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,

  loginWithGoogle: async (googleUser: GoogleUser) => {
    try {
      const mockToken = `google_${googleUser.id}_${Date.now()}`;
      const user: User = {
        id: googleUser.id,
        email: googleUser.email,
        name: googleUser.name,
      };
      await storage.setItem('token', mockToken);
      await storage.setItem('user', JSON.stringify(user));
      set({ user, token: mockToken, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await storage.setItem('token', data.token);
        await storage.setItem('user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token, isAuthenticated: true });
        return true;
      }
    } catch (_) {}

    // 외부 API 미연결 시 로컬 임시 로그인
    if (email && password) {
      const mockUser: User = {
        id: 'local_' + email.split('@')[0],
        email,
        name: email.split('@')[0],
      };
      const mockToken = 'local_token_' + Date.now();
      await storage.setItem('token', mockToken);
      await storage.setItem('user', JSON.stringify(mockUser));
      set({ user: mockUser, token: mockToken, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.register}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });

      if (!response.ok) {
        return false;
      }

      const data = await response.json();
      await storage.setItem('token', data.token);
      
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await storage.deleteItem('token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  loadUser: async () => {
    try {
      const token = await storage.getItem('token');
      if (!token) { set({ isLoading: false }); return; }

      // 로컬 임시 토큰 처리
      if (token.startsWith('local_token_') || token.startsWith('google_')) {
        const raw = await storage.getItem('user');
        const user = raw ? JSON.parse(raw) : null;
        set({ user, token, isAuthenticated: !!user, isLoading: false });
        return;
      }

      const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.me}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        set({ user: data.user, token, isAuthenticated: true, isLoading: false });
      } else {
        await storage.deleteItem('token');
        set({ isLoading: false });
      }
    } catch (error) {
      // 네트워크 오류 시 저장된 유저 정보로 복원
      try {
        const token = await storage.getItem('token');
        const raw = await storage.getItem('user');
        const user = raw ? JSON.parse(raw) : null;
        if (token && user) {
          set({ user, token, isAuthenticated: true, isLoading: false });
          return;
        }
      } catch {}
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
