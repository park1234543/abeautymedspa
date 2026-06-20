import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const isConfigured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);
const isNew = getApps().length === 0;
const app = isConfigured
  ? (isNew ? initializeApp(firebaseConfig) : getApp())
  : null as any;

function createAuth() {
  if (!isConfigured || !app) return null as any;
  if (!isNew) return getAuth(app);
  if (Platform.OS !== 'web') {
    try {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } catch {
      return getAuth(app);
    }
  }
  return getAuth(app);
}

export const auth = createAuth();
export const db = isConfigured && app ? getFirestore(app) : null as any;
export default app;
