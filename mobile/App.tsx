import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, ActivityIndicator, StyleSheet, Platform } from 'react-native';

import { RootNavigator } from './src/navigation/RootNavigator';
import { useAuthStore } from './src/store/authStore';
import { COLORS } from './src/constants/theme';

// Make NavigationContainer background transparent so video can show through
const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default function App() {
  const { isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    // 웹에서 토큰 없을 때 테스트 계정 자동 설정
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      const devUser = { id: 'dev_user', email: 'demo@abeauty.com', name: 'Demo User' };
      localStorage.setItem('token', 'local_token_dev');
      localStorage.setItem('user', JSON.stringify(devUser));
    }
    loadUser();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const content = (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webRoot}>
        <View style={styles.webFrame}>
          {content}
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  webRoot: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  webFrame: {
    width: 390,
    height: '100%' as any,
    maxHeight: 844,
    overflow: 'hidden' as any,
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
});
