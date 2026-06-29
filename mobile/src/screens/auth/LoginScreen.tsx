import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/authStore';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useTranslation } from '../../i18n/useTranslation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { login, loginWithApple } = useAuthStore();
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) { setError(t('login', 'errorRequired')); return; }
    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);
    if (!success) setError(t('login', 'errorInvalid'));
  };

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const success = await loginWithApple({
        id: credential.user,
        email: credential.email,
        fullName: credential.fullName,
      });
      if (!success) setError(t('login', 'errorInvalid'));
    } catch (e: any) {
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        setError(t('login', 'errorInvalid'));
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 }]}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.logo}>A Beauty</Text>
          <Text style={styles.title}>{t('login', 'title')}</Text>
          <Text style={styles.subtitle}>{t('login', 'subtitle')}</Text>
        </View>

        {Platform.OS === 'ios' && (
          <View style={styles.appleSection}>
            <Text style={styles.appleLabel}>Sign in with Apple</Text>
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={RADIUS.md}
              style={styles.appleButton}
              onPress={handleAppleLogin}
            />
          </View>
        )}

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t('login', 'orEmail')}</Text>
          <View style={styles.dividerLine} />
        </View>

        {error ? (
          <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>
        ) : null}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('login', 'email')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder={t('login', 'emailPlaceholder')}
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={(t) => { setEmail(t); setError(''); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('login', 'password')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
              <TextInput
                style={styles.input}
                placeholder={t('login', 'passwordPlaceholder')}
                placeholderTextColor={COLORS.textLight}
                value={password}
                onChangeText={(t) => { setPassword(t); setError(''); }}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? <ActivityIndicator color={COLORS.textWhite} /> : <Text style={styles.loginButtonText}>{t('login', 'loginBtn')}</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>{t('login', 'noAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>{t('login', 'register')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { flexGrow: 1, paddingHorizontal: SPACING.lg },
  backButton: { width: 40, height: 40, justifyContent: 'center', marginBottom: SPACING.md },
  header: { marginBottom: SPACING.xl },
  logo: { fontSize: 32, fontWeight: '300', color: COLORS.primary, letterSpacing: 2, marginBottom: SPACING.lg },
  title: { fontSize: FONTS.sizes.xxxl, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.sm },
  subtitle: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary },
  appleSection: { marginBottom: SPACING.sm },
  appleLabel: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textSecondary, marginBottom: SPACING.xs },
  appleButton: { height: 50 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: SPACING.lg, gap: SPACING.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, paddingHorizontal: SPACING.xs },
  errorBox: { backgroundColor: 'rgba(220, 53, 69, 0.1)', borderWidth: 1, borderColor: 'rgba(220, 53, 69, 0.3)', borderRadius: RADIUS.sm, padding: SPACING.sm, marginBottom: SPACING.md },
  errorText: { color: '#dc3545', fontSize: FONTS.sizes.sm, textAlign: 'center' },
  form: { gap: SPACING.lg },
  inputContainer: { gap: SPACING.sm },
  label: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.text },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  input: { flex: 1, fontSize: FONTS.sizes.md, color: COLORS.text, paddingVertical: SPACING.xs },
  loginButton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.md, ...SHADOWS.small },
  buttonDisabled: { opacity: 0.7 },
  loginButtonText: { color: COLORS.textWhite, fontSize: FONTS.sizes.lg, fontWeight: '600' },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: SPACING.xxl },
  registerText: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary },
  registerLink: { fontSize: FONTS.sizes.md, color: COLORS.primary, fontWeight: '600' },
});
