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
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/authStore';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../../constants/theme';
import { useTranslation } from '../../i18n/useTranslation';
import { useGoogleAuth, fetchGoogleUserInfo, isExpoGo } from '../../services/googleAuth';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

const GOOGLE_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || '';

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { register, loginWithGoogle } = useAuthStore();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const { request, response, promptAsync } = useGoogleAuth();

  React.useEffect(() => {
    if (response?.type === 'success') {
      const accessToken = response.authentication?.accessToken ?? (response as any).params?.access_token;
      if (accessToken) {
        handleGoogleSuccess(accessToken);
      } else {
        setIsGoogleLoading(false);
      }
    } else if (response?.type === 'error' || response?.type === 'dismiss' || response?.type === 'cancel') {
      setIsGoogleLoading(false);
    }
  }, [response]);

  const handleGoogleSuccess = async (accessToken: string) => {
    try {
      const googleUser = await fetchGoogleUserInfo(accessToken);
      const success = await loginWithGoogle(googleUser);
      if (!success) Alert.alert(t('register', 'failTitle'), t('register', 'errorFailed'));
    } catch {
      Alert.alert(t('register', 'failTitle'), t('register', 'errorFailed'));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    if (isExpoGo) {
      Alert.alert(
        'Google 로그인',
        'Expo Go에서는 Google 로그인이 지원되지 않습니다.\n\n실제 앱 빌드(APK/IPA) 설치 후 사용하거나,\n이메일로 가입해 주세요.',
        [{ text: '확인' }]
      );
      return;
    }
    setIsGoogleLoading(true);
    await promptAsync();
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(t('register', 'alertTitle'), t('register', 'errorRequired'));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t('register', 'alertTitle'), t('register', 'errorPasswordMatch'));
      return;
    }
    if (password.length < 8) {
      Alert.alert(t('register', 'alertTitle'), t('register', 'errorPasswordLength'));
      return;
    }
    setIsLoading(true);
    const success = await register(name, email, password, phone);
    setIsLoading(false);
    if (!success) Alert.alert(t('register', 'failTitle'), t('register', 'errorFailed'));
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
          <Text style={styles.title}>{t('register', 'title')}</Text>
          <Text style={styles.subtitle}>{t('register', 'subtitle')}</Text>
        </View>

        <TouchableOpacity
          style={[styles.googleButton, (isGoogleLoading || !request) && styles.buttonDisabled]}
          onPress={handleGoogleRegister}
          disabled={isGoogleLoading || !request}
          activeOpacity={0.8}
        >
          {isGoogleLoading ? (
            <ActivityIndicator color={COLORS.text} size="small" />
          ) : (
            <>
              <View style={styles.googleIconWrap}><Text style={styles.googleIconText}>G</Text></View>
              <Text style={styles.googleButtonText}>{t('login', 'google')}</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>{t('login', 'orEmail')}</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('register', 'name')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={COLORS.textLight} />
              <TextInput style={styles.input} placeholder={t('register', 'namePlaceholder')} placeholderTextColor={COLORS.textLight} value={name} onChangeText={setName} autoCorrect={false} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('login', 'email')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={COLORS.textLight} />
              <TextInput style={styles.input} placeholder={t('login', 'emailPlaceholder')} placeholderTextColor={COLORS.textLight} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('register', 'phone')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={COLORS.textLight} />
              <TextInput style={styles.input} placeholder={t('register', 'phonePlaceholder')} placeholderTextColor={COLORS.textLight} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('register', 'password')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
              <TextInput style={styles.input} placeholder={t('register', 'passwordPlaceholder')} placeholderTextColor={COLORS.textLight} value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>{t('register', 'confirmPassword')}</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color={COLORS.textLight} />
              <TextInput style={styles.input} placeholder={t('register', 'confirmPlaceholder')} placeholderTextColor={COLORS.textLight} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPassword} />
            </View>
          </View>

          <TouchableOpacity style={[styles.registerButton, isLoading && styles.registerButtonDisabled]} onPress={handleRegister} disabled={isLoading} activeOpacity={0.8}>
            {isLoading ? <ActivityIndicator color={COLORS.textWhite} /> : <Text style={styles.registerButtonText}>{t('register', 'registerBtn')}</Text>}
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>{t('register', 'hasAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>{t('register', 'signIn')}</Text>
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
  form: { gap: SPACING.md },
  inputContainer: { gap: SPACING.xs },
  label: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.text },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm },
  input: { flex: 1, fontSize: FONTS.sizes.md, color: COLORS.text, paddingVertical: SPACING.xs },
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: COLORS.border, borderRadius: RADIUS.md, paddingVertical: SPACING.md, gap: SPACING.sm, marginBottom: SPACING.md, ...SHADOWS.small },
  googleIconWrap: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#4285F4', alignItems: 'center', justifyContent: 'center' },
  googleIconText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  googleButtonText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md, gap: SPACING.sm },
  dividerLine: { flex: 1, height: 1, backgroundColor: COLORS.border },
  dividerText: { fontSize: FONTS.sizes.sm, color: COLORS.textLight, paddingHorizontal: SPACING.xs },
  buttonDisabled: { opacity: 0.7 },
  registerButton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.md, ...SHADOWS.small },
  registerButtonDisabled: { opacity: 0.7 },
  registerButtonText: { color: COLORS.textWhite, fontSize: FONTS.sizes.lg, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: SPACING.xl },
  loginText: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary },
  loginLink: { fontSize: FONTS.sizes.md, color: COLORS.primary, fontWeight: '600' },
});
