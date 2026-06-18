import { create } from 'zustand';
import { Platform } from 'react-native';

const getLocalStorage = (): Storage | null => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) return window.localStorage;
  } catch (_) {}
  return null;
};

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === 'web') return getLocalStorage()?.getItem(key) ?? null;
    const SecureStore = await import('expo-secure-store');
    return SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') { getLocalStorage()?.setItem(key, value); return; }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.setItemAsync(key, value);
  },
  deleteItem: async (key: string): Promise<void> => {
    if (Platform.OS === 'web') { getLocalStorage()?.removeItem(key); return; }
    const SecureStore = await import('expo-secure-store');
    return SecureStore.deleteItemAsync(key);
  },
};

const isFirebaseConfigured = () =>
  !!(process.env.EXPO_PUBLIC_FIREBASE_API_KEY && process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID);

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
  demoLogin: () => Promise<void>;
  loginWithGoogle: (googleUser: any) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  setUser: (user: User | null) => void;
  resetPassword: (email: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isAuthenticated: false,

  demoLogin: async () => {
    const demoUser: User = {
      id: 'demo_user',
      email: 'demo@abeauty.com',
      name: '데모 고객',
      phone: '010-1234-5678',
    };
    const demoToken = 'demo_token_' + Date.now();
    await storage.setItem('token', demoToken);
    await storage.setItem('user', JSON.stringify(demoUser));
    set({ user: demoUser, token: demoToken, isAuthenticated: true });
  },

  login: async (email: string, password: string) => {
    if (!email || !password) return false;

    if (isFirebaseConfigured()) {
      try {
        const { auth } = await import('../services/firebase');
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        const cred = await signInWithEmailAndPassword(auth, email, password);
        const fbUser = cred.user;
        const user: User = {
          id: fbUser.uid,
          email: fbUser.email ?? email,
          name: fbUser.displayName ?? email.split('@')[0],
        };
        const token = await fbUser.getIdToken();
        await storage.setItem('token', token);
        await storage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
        return true;
      } catch (e: any) {
        console.error('Firebase login error:', e.code);
        return false;
      }
    }

    // 개발용 fallback (Firebase 미설정 시)
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
  },

  loginWithGoogle: async (googleUser: any) => {
    try {
      if (isFirebaseConfigured() && googleUser.accessToken) {
        const { auth } = await import('../services/firebase');
        const { GoogleAuthProvider, signInWithCredential } = await import('firebase/auth');
        const credential = GoogleAuthProvider.credential(null, googleUser.accessToken);
        const cred = await signInWithCredential(auth, credential);
        const fbUser = cred.user;
        const user: User = {
          id: fbUser.uid,
          email: fbUser.email ?? googleUser.email,
          name: fbUser.displayName ?? googleUser.name,
        };
        const token = await fbUser.getIdToken();
        await storage.setItem('token', token);
        await storage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
        return true;
      }
      // Fallback: mock login with Google user info
      const mockToken = `google_${googleUser.id}_${Date.now()}`;
      const user: User = { id: googleUser.id, email: googleUser.email, name: googleUser.name };
      await storage.setItem('token', mockToken);
      await storage.setItem('user', JSON.stringify(user));
      set({ user, token: mockToken, isAuthenticated: true });
      return true;
    } catch (error) {
      console.error('Google login error:', error);
      return false;
    }
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    if (!name || !email || !password) return false;

    if (isFirebaseConfigured()) {
      try {
        const { auth, db } = await import('../services/firebase');
        const { createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
        const { doc, setDoc } = await import('firebase/firestore');
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        const user: User = { id: cred.user.uid, email, name, phone };
        await setDoc(doc(db, 'users', cred.user.uid), { name, email, phone: phone || '', createdAt: new Date().toISOString() });
        const token = await cred.user.getIdToken();
        await storage.setItem('token', token);
        await storage.setItem('user', JSON.stringify(user));
        set({ user, token, isAuthenticated: true });
        return true;
      } catch (e: any) {
        console.error('Firebase register error:', e.code);
        return false;
      }
    }

    // 개발용 fallback
    const mockUser: User = { id: 'local_' + email.split('@')[0], email, name, phone };
    const mockToken = 'local_token_' + Date.now();
    await storage.setItem('token', mockToken);
    await storage.setItem('user', JSON.stringify(mockUser));
    set({ user: mockUser, token: mockToken, isAuthenticated: true });
    return true;
  },

  resetPassword: async (email: string) => {
    if (!email) return false;
    if (isFirebaseConfigured()) {
      try {
        const { auth } = await import('../services/firebase');
        const { sendPasswordResetEmail } = await import('firebase/auth');
        await sendPasswordResetEmail(auth, email);
        return true;
      } catch (e) {
        console.error('Reset password error:', e);
        return false;
      }
    }
    return false;
  },

  logout: async () => {
    if (isFirebaseConfigured()) {
      try {
        const { auth } = await import('../services/firebase');
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      } catch (_) {}
    }
    await storage.deleteItem('token');
    await storage.deleteItem('user');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    try {
      if (isFirebaseConfigured()) {
        const { auth } = await import('../services/firebase');
        await new Promise<void>((resolve) => {
          const { onAuthStateChanged } = require('firebase/auth');
          const unsub = onAuthStateChanged(auth, async (fbUser: any) => {
            unsub();
            if (fbUser) {
              const raw = await storage.getItem('user');
              const user = raw ? JSON.parse(raw) : {
                id: fbUser.uid,
                email: fbUser.email,
                name: fbUser.displayName ?? fbUser.email?.split('@')[0],
              };
              const token = await fbUser.getIdToken();
              set({ user, token, isAuthenticated: true, isLoading: false });
            } else {
              set({ isLoading: false });
            }
            resolve();
          });
        });
        return;
      }

      const token = await storage.getItem('token');
      if (!token) { set({ isLoading: false }); return; }
      const raw = await storage.getItem('user');
      const user = raw ? JSON.parse(raw) : null;
      set({ user, token, isAuthenticated: !!user, isLoading: false });
    } catch (error) {
      try {
        const token = await storage.getItem('token');
        const raw = await storage.getItem('user');
        const user = raw ? JSON.parse(raw) : null;
        if (token && user) { set({ user, token, isAuthenticated: true, isLoading: false }); return; }
      } catch {}
      set({ isLoading: false });
    }
  },

  setUser: (user: User | null) => set({ user, isAuthenticated: !!user }),
}));
