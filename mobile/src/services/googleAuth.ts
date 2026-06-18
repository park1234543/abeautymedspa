import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export const isExpoGo = Constants.appOwnership === 'expo';

export interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  accessToken: string;
}

export function useGoogleAuth() {
  const webClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;
  const androidClientId = process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID || webClientId;
  const iosClientId = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID || webClientId;

  const [request, response, promptAsync] = Google.useAuthRequest(
    isExpoGo
      ? { webClientId, androidClientId, iosClientId, selectAccount: true }
      : { webClientId, androidClientId, iosClientId, selectAccount: true }
  );

  return { request, response, promptAsync, isExpoGo };
}

export async function fetchGoogleUserInfo(accessToken: string): Promise<GoogleUser> {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error('Failed to fetch Google user info');
  const data = await res.json();
  return {
    id: data.sub,
    email: data.email,
    name: data.name,
    picture: data.picture,
    accessToken,
  };
}
