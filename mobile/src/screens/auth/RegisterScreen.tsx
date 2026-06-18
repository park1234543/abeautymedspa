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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { register } = useAuthStore();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  registerButton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.md, ...SHADOWS.small },
  registerButtonDisabled: { opacity: 0.7 },
  registerButtonText: { color: COLORS.textWhite, fontSize: FONTS.sizes.lg, fontWeight: '600' },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 'auto', paddingTop: SPACING.xl },
  loginText: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary },
  loginLink: { fontSize: FONTS.sizes.md, color: COLORS.primary, fontWeight: '600' },
});
