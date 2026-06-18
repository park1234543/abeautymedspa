import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { useLanguageStore } from '../store/languageStore';
import { Language, LANGUAGE_FLAGS, LANGUAGE_NAMES } from '../i18n/translations';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LANGUAGES: Language[] = ['ko', 'en', 'es', 'zh'];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuthStore();
  const { bookingHistory, loadBookingHistory } = useBookingStore();
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageStore();
  const [showLangModal, setShowLangModal] = useState(false);

  useEffect(() => { loadBookingHistory(); }, []);

  const upcomingCount = bookingHistory.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookingHistory.filter((b) => b.status === 'completed').length;
  const totalSpent = bookingHistory.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.totalPrice, 0);

  const MENU_ITEMS = [
    { id: 'bookings', icon: 'calendar-outline' as const, title: t('profile', 'myBookings'), subtitle: `${t('profile', 'upcomingBookings')} ${upcomingCount}`, badge: upcomingCount > 0 ? upcomingCount : undefined, onPress: () => navigation.navigate('MyBookings') },
    { id: 'history', icon: 'time-outline' as const, title: t('profile', 'history'), subtitle: `${t('profile', 'completedTreatments')} ${completedCount}`, onPress: () => navigation.navigate('MyBookings') },
    { id: 'favorites', icon: 'heart-outline' as const, title: t('profile', 'favorites'), subtitle: t('profile', 'favoritesSub'), onPress: () => {} },
    { id: 'points', icon: 'gift-outline' as const, title: t('profile', 'points'), subtitle: t('profile', 'pointsSub'), onPress: () => {} },
  ];

  const SETTINGS_ITEMS = [
    { id: 'notifications', icon: 'notifications-outline' as const, title: t('profile', 'notifications'), onPress: () => {} },
    { id: 'language', icon: 'language-outline' as const, title: t('profile', 'language'), onPress: () => setShowLangModal(true) },
    { id: 'privacy', icon: 'shield-outline' as const, title: t('profile', 'privacy'), onPress: () => {} },
    { id: 'terms', icon: 'document-text-outline' as const, title: t('profile', 'terms'), onPress: () => {} },
    { id: 'help', icon: 'help-circle-outline' as const, title: t('profile', 'help'), onPress: () => {} },
  ];

  const handleLogout = () => {
    Alert.alert(t('profile', 'logoutTitle'), t('profile', 'logoutMsg'), [
      { text: t('profile', 'cancel'), style: 'cancel' },
      { text: t('profile', 'logout'), style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <>
      <ScrollView
        style={[styles.container, { paddingTop: insets.top }]}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{(user?.name || '?').charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.name || '사용자'}</Text>
            <Text style={styles.profileEmail}>{user?.email || 'user@example.com'}</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('MyBookings')} activeOpacity={0.7}>
            <Text style={styles.statNumber}>{upcomingCount}</Text>
            <Text style={styles.statLabel}>{t('profile', 'upcomingBookings')}</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <TouchableOpacity style={styles.statItem} onPress={() => navigation.navigate('MyBookings')} activeOpacity={0.7}>
            <Text style={styles.statNumber}>{completedCount}</Text>
            <Text style={styles.statLabel}>{t('profile', 'completedTreatments')}</Text>
          </TouchableOpacity>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>${totalSpent}</Text>
            <Text style={styles.statLabel}>{t('profile', 'totalSpent')}</Text>
          </View>
        </View>

        {/* Quick Action */}
        <TouchableOpacity style={styles.bookingBanner} onPress={() => navigation.navigate('Booking')} activeOpacity={0.85}>
          <View>
            <Text style={styles.bookingBannerTitle}>{t('profile', 'bookNew')}</Text>
            <Text style={styles.bookingBannerSub}>{t('profile', 'bookNewSub')}</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={COLORS.textWhite} />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile', 'myInfo')}</Text>
          <View style={styles.menuContainer}>
            {MENU_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem, index === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={22} color={COLORS.primary} />
                </View>
                <View style={styles.menuContent}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
                {item.badge ? (
                  <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('profile', 'settings')}</Text>
          <View style={styles.menuContainer}>
            {SETTINGS_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.settingsItem, index === SETTINGS_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.7}
                onPress={item.onPress}
              >
                <View style={styles.settingsIcon}>
                  <Ionicons name={item.icon} size={20} color={COLORS.textSecondary} />
                </View>
                <Text style={styles.settingsTitle}>{item.title}</Text>
                {item.id === 'language' && (
                  <Text style={styles.langBadge}>{LANGUAGE_FLAGS[language]} {language.toUpperCase()}</Text>
                )}
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>{t('profile', 'logout')}</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>{t('profile', 'version')} 1.0.0</Text>
      </ScrollView>

      {/* Language Modal */}
      <Modal visible={showLangModal} transparent animationType="slide" onRequestClose={() => setShowLangModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>{t('profile', 'selectLanguage')}</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang}
                style={[styles.langOption, language === lang && styles.langOptionActive]}
                onPress={() => { setLanguage(lang); setShowLangModal(false); }}
                activeOpacity={0.7}
              >
                <Text style={styles.langFlag}>{LANGUAGE_FLAGS[lang]}</Text>
                <Text style={[styles.langName, language === lang && styles.langNameActive]}>
                  {LANGUAGE_NAMES[lang]}
                </Text>
                {language === lang && <Ionicons name="checkmark-circle" size={22} color={COLORS.primary} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  profileHeader: { flexDirection: 'row', alignItems: 'center', padding: SPACING.lg, backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, marginTop: SPACING.md, borderRadius: RADIUS.lg, ...SHADOWS.small },
  avatarWrap: { width: 70, height: 70, borderRadius: 35, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 28, fontWeight: '700', color: COLORS.textWhite },
  profileInfo: { flex: 1, marginLeft: SPACING.md },
  profileName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  profileEmail: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: 2 },
  editButton: { width: 40, height: 40, borderRadius: RADIUS.full, backgroundColor: COLORS.primaryLight + '30', justifyContent: 'center', alignItems: 'center' },
  statsContainer: { flexDirection: 'row', backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, marginTop: SPACING.md, borderRadius: RADIUS.lg, padding: SPACING.lg, ...SHADOWS.small },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
  statLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, marginTop: 4, textAlign: 'center' },
  statDivider: { width: 1, backgroundColor: COLORS.border },
  bookingBanner: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.primary, marginHorizontal: SPACING.lg, marginTop: SPACING.md, borderRadius: RADIUS.lg, padding: SPACING.md, paddingHorizontal: SPACING.lg, ...SHADOWS.small },
  bookingBannerTitle: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.textWhite },
  bookingBannerSub: { fontSize: FONTS.sizes.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  section: { marginTop: SPACING.xl },
  sectionTitle: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.textSecondary, marginLeft: SPACING.lg, marginBottom: SPACING.sm },
  menuContainer: { backgroundColor: COLORS.card, marginHorizontal: SPACING.lg, borderRadius: RADIUS.lg, ...SHADOWS.small },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  menuIcon: { width: 44, height: 44, borderRadius: RADIUS.md, backgroundColor: COLORS.primaryLight + '30', justifyContent: 'center', alignItems: 'center' },
  menuContent: { flex: 1, marginLeft: SPACING.md },
  menuTitle: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  menuSubtitle: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: 2 },
  badge: { backgroundColor: COLORS.primary, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.textWhite },
  settingsItem: { flexDirection: 'row', alignItems: 'center', padding: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
  settingsIcon: { width: 32, justifyContent: 'center', alignItems: 'center' },
  settingsTitle: { flex: 1, fontSize: FONTS.sizes.md, color: COLORS.text, marginLeft: SPACING.sm },
  langBadge: { fontSize: 12, color: COLORS.primary, fontWeight: '600', marginRight: 8 },
  logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: SPACING.lg, marginTop: SPACING.xl, padding: SPACING.md, borderRadius: RADIUS.md, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.error + '30', gap: SPACING.sm },
  logoutText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.error },
  versionText: { textAlign: 'center', fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: SPACING.lg },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  modalHandle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#E0D8D0', alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 20 },
  langOption: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderRadius: 14, marginBottom: 8, backgroundColor: '#F8F5F2', borderWidth: 2, borderColor: 'transparent', gap: 12 },
  langOptionActive: { borderColor: COLORS.primary, backgroundColor: 'rgba(212,165,116,0.1)' },
  langFlag: { fontSize: 24 },
  langName: { flex: 1, fontSize: 16, fontWeight: '500', color: COLORS.text },
  langNameActive: { color: COLORS.primary, fontWeight: '700' },
});
