import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import Constants, { ExecutionEnvironment } from 'expo-constants';

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

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  offlineAccess: true,
});

export async function signInWithGoogle(): Promise<GoogleUser> {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const userInfo = await GoogleSignin.signIn();
  const tokens = await GoogleSignin.getTokens();
  return {
    id: userInfo.data?.user.id || '',
    email: userInfo.data?.user.email || '',
    name: userInfo.data?.user.name || '',
    picture: userInfo.data?.user.photo || undefined,
    accessToken: tokens.accessToken,
  };
}

export async function signOutGoogle(): Promise<void> {
  await GoogleSignin.signOut();
}
