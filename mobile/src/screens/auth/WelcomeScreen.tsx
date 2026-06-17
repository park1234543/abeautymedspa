import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS, RADIUS } from '../../constants/theme';
import { VideoBackground } from '../../components/VideoBackground';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

export function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const content = (
    <>
      <VideoBackground />
      <LinearGradient
        colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.40)', 'rgba(0,0,0,0.90)']}
        style={styles.fill}
        pointerEvents="none"
      />
      <View style={[styles.fill, styles.content, { paddingBottom: Math.max(insets.bottom, 32) + 16 }]}>
        <View style={styles.logoArea}>
          <Text style={styles.logoText}>A Beauty</Text>
          <View style={styles.logoDivider} />
          <Text style={styles.logoSub}>MED SPA</Text>
        </View>

        <View style={styles.tagRow}>
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>✦  Premium Aesthetic Experience</Text>
          </View>
        </View>

        <View style={styles.headlineArea}>
          <Text style={styles.headline}>Elevate Your</Text>
          <Text style={styles.headlineGold}>Natural Beauty</Text>
          <Text style={styles.description}>
            Advanced treatments by board-certified{'\n'}
            specialists. Your transformation starts here.
          </Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerNote}>
          By continuing, you agree to our Terms & Privacy Policy
        </Text>
      </View>
    </>
  );

  if (Platform.OS === 'web') {
    return <View style={[styles.root, { backgroundColor: 'transparent' }]}>{content}</View>;
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/hero-spa.jpg')}
      style={styles.root}
      resizeMode="cover"
    >
      {content}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0d0a06',
  },
  fill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    justifyContent: 'flex-end',
    paddingHorizontal: 28,
    paddingTop: 24,
  },
  logoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '300',
    color: COLORS.primary,
    letterSpacing: 3,
  },
  logoDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(212,165,116,0.45)',
  },
  logoSub: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.65)',
    letterSpacing: 6,
  },
  tagRow: {
    marginBottom: 20,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,165,116,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212,165,116,0.4)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.8,
  },
  headlineArea: {
    marginBottom: 40,
  },
  headline: {
    fontSize: 44,
    fontWeight: '200',
    color: '#fff',
    letterSpacing: 0.5,
    lineHeight: 52,
  },
  headlineGold: {
    fontSize: 44,
    fontWeight: '600',
    color: COLORS.primary,
    letterSpacing: 0.5,
    lineHeight: 54,
    marginBottom: 18,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  buttonGroup: {
    gap: 12,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 17,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 17,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 16,
    fontWeight: '300',
    letterSpacing: 1.5,
  },
  footerNote: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.28)',
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
