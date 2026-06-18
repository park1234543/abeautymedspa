import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Video, ResizeMode } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { COLORS, RADIUS } from '../../constants/theme';
import { useTranslation } from '../../i18n/useTranslation';
import { useLanguageStore } from '../../store/languageStore';
import { Language, LANGUAGE_FLAGS, LANGUAGE_NAMES } from '../../i18n/translations';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Welcome'>;

const LANGUAGES: Language[] = ['ko', 'en', 'es', 'zh'];

function WebVideoBackground() {
  const videoRef = useRef<any>(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);
  return (
    <video
      ref={videoRef}
      src="/assets/videos/spa-background-web.mp4"
      autoPlay loop muted playsInline
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
    />
  );
}

export function WelcomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();

  const overlay = (
    <LinearGradient
      colors={['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.45)', 'rgba(0,0,0,0.92)']}
      style={styles.fill}
      pointerEvents="none"
    />
  );

  const buttons = (
    <View style={[styles.content, { paddingBottom: Math.max(insets.bottom, 32) + 16 }]}>
      {/* Language Switcher */}
      <View style={styles.langRow}>
        {LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang}
            style={[styles.langBtn, language === lang && styles.langBtnActive]}
            onPress={() => setLanguage(lang)}
            activeOpacity={0.7}
          >
            <Text style={styles.langFlag}>{LANGUAGE_FLAGS[lang]}</Text>
            <Text style={[styles.langLabel, language === lang && styles.langLabelActive]}>
              {lang.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.logoArea}>
        <Text style={styles.logoText}>A Beauty</Text>
        <View style={styles.logoDivider} />
        <Text style={styles.logoSub}>MED SPA</Text>
      </View>

      <View style={styles.tagRow}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{t('welcome', 'tagline')}</Text>
        </View>
      </View>

      <View style={styles.headlineArea}>
        <Text style={styles.headline}>{t('welcome', 'headline1')}</Text>
        <Text style={styles.headlineGold}>{t('welcome', 'headline2')}</Text>
        <Text style={styles.description}>{t('welcome', 'description')}</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>{t('welcome', 'signIn')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate('Register')}
          activeOpacity={0.85}
        >
          <Text style={styles.secondaryButtonText}>{t('welcome', 'createAccount')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')} activeOpacity={0.7}>
        <Text style={[styles.footerNote, { textDecorationLine: 'underline' }]}>{t('welcome', 'terms')}</Text>
      </TouchableOpacity>
    </View>
  );

  if (Platform.OS === 'web') {
    return (
      <View style={styles.root}>
        <WebVideoBackground />
        {overlay}
        {buttons}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <Video
        source={require('../../../assets/videos/spa-background-web.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay isLooping isMuted
      />
      {overlay}
      {buttons}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0d0a06', justifyContent: 'flex-end' },
  fill: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  content: { paddingHorizontal: 28, paddingTop: 24 },

  langRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  langBtnActive: {
    borderColor: 'rgba(212,165,116,0.7)',
    backgroundColor: 'rgba(212,165,116,0.18)',
  },
  langFlag: { fontSize: 13 },
  langLabel: { fontSize: 10, fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5 },
  langLabelActive: { color: '#D4A574' },

  logoArea: { flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 12 },
  logoText: { fontSize: 22, fontWeight: '300', color: COLORS.primary, letterSpacing: 3 },
  logoDivider: { width: 1, height: 20, backgroundColor: 'rgba(212,165,116,0.45)' },
  logoSub: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.65)', letterSpacing: 6 },

  tagRow: { marginBottom: 20 },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,165,116,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(212,165,116,0.4)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  tagText: { color: COLORS.primary, fontSize: 11, fontWeight: '500', letterSpacing: 0.8 },

  headlineArea: { marginBottom: 40 },
  headline: { fontSize: 44, fontWeight: '200', color: '#fff', letterSpacing: 0.5, lineHeight: 52 },
  headlineGold: { fontSize: 44, fontWeight: '600', color: COLORS.primary, letterSpacing: 0.5, lineHeight: 54, marginBottom: 18 },
  description: { fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 22, letterSpacing: 0.2 },

  buttonGroup: { gap: 12, marginBottom: 20 },
  primaryButton: { backgroundColor: COLORS.primary, paddingVertical: 17, borderRadius: RADIUS.md, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: 2 },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingVertical: 17,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
  },
  secondaryButtonText: { color: 'rgba(255,255,255,0.85)', fontSize: 16, fontWeight: '300', letterSpacing: 1.5 },
  footerNote: { textAlign: 'center', color: 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: 0.2 },
});
