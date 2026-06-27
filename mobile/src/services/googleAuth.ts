import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

export const isExpoGo =
  Constants.executionEnvironment === ExecutionEnvironment.StoreClient ||
  Constants.appOwnership === 'expo';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
}

export function configureGoogleSignin() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    offlineAccess: true,
  });
}

export async function signInWithGoogle(): Promise<GoogleUser> {
  configureGoogleSignin();
  if (Platform.OS === 'android') {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  }
  const response = await GoogleSignin.signIn();
  const tokens = await GoogleSignin.getTokens();
  const user = (response as any)?.data?.user ?? (response as any)?.user ?? {};
  return {
    id: user.id || '',
    email: user.email || '',
    name: user.name || '',
    picture: user.photo || undefined,
    accessToken: tokens.accessToken,
  };
}

export async function signOutGoogle(): Promise<void> {
  await GoogleSignin.signOut();
}
