import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  findNodeHandle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS, RADIUS } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

const SPA_VIDEO_URI =
  'https://assets.mixkit.co/videos/preview/mixkit-relaxing-spa-stones-with-running-water-3209-large.mp4';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

function VideoBackground() {
  const containerRef = useRef<View>(null);

  useEffect(() => {
    if (Platform.OS !== 'web') return;

    const video = document.createElement('video');
    video.src = SPA_VIDEO_URI;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.setAttribute('playsinline', '');
    video.style.cssText = `
      position:absolute;top:0;left:0;
      width:100%;height:100%;
      object-fit:cover;z-index:0;
      pointer-events:none;
    `;

    const node = findNodeHandle(containerRef.current);
    const dom: any = node ? document.getElementById(String(node)) || containerRef.current : null;
    const parent: Element | null = dom
      ? (dom as any)._nativeTag
        ? null
        : (dom as HTMLElement)
      : null;

    if (parent instanceof HTMLElement) {
      parent.style.position = 'relative';
      parent.appendChild(video);
      video.play().catch(() => {});
      return () => { try { parent.removeChild(video); } catch {} };
    } else {
      document.body.appendChild(video);
      return () => { try { document.body.removeChild(video); } catch {} };
    }
  }, []);

  if (Platform.OS === 'web') {
    return (
      <View
        ref={containerRef}
        style={[StyleSheet.absoluteFillObject, { overflow: 'hidden' as any }]}
      >
        {/*
          We inject the video via DOM in useEffect above.
          This View just acts as a mount point.
        */}
      </View>
    );
  }

  return null;
}

export function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' && <VideoBackground />}

      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      >
        <View
          style={[
            styles.content,
            { paddingBottom: Math.max(insets.bottom, 32) + 16 },
          ]}
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <Text style={styles.logoText}>A Beauty</Text>
            <View style={styles.logoDivider} />
            <Text style={styles.logoSub}>MED SPA</Text>
          </View>

          {/* Badge */}
          <View style={styles.tagRow}>
            <View style={styles.tagPill}>
              <Text style={styles.tagText}>✦  Premium Aesthetic Experience</Text>
            </View>
          </View>

          {/* Headline */}
          <View style={styles.headlineArea}>
            <Text style={styles.headline}>Elevate Your</Text>
            <Text style={styles.headlineGold}>Natural Beauty</Text>
            <Text style={styles.description}>
              Advanced treatments by board-certified{'\n'}
              specialists. Your transformation starts here.
            </Text>
          </View>

          {/* Buttons */}
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
            By continuing, you agree to our Terms &amp; Privacy Policy
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0a06',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
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
