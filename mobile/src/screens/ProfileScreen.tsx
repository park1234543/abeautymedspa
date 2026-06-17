import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useAuthStore } from '../store/authStore';
import { useBookingStore } from '../store/bookingStore';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SETTINGS_ITEMS = [
  { id: 'notifications', icon: 'notifications-outline' as const, title: '알림 설정' },
  { id: 'language', icon: 'language-outline' as const, title: '언어 설정' },
  { id: 'privacy', icon: 'shield-outline' as const, title: '개인정보 처리방침' },
  { id: 'terms', icon: 'document-text-outline' as const, title: '이용약관' },
  { id: 'help', icon: 'help-circle-outline' as const, title: '고객센터' },
];

export function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const { user, logout } = useAuthStore();
  const { bookingHistory, loadBookingHistory } = useBookingStore();

  useEffect(() => {
    loadBookingHistory();
  }, []);

  const upcomingCount = bookingHistory.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookingHistory.filter((b) => b.status === 'completed').length;
  const totalSpent = bookingHistory
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const MENU_ITEMS = [
    {
      id: 'bookings',
      icon: 'calendar-outline' as const,
      title: '내 예약',
      subtitle: `예정 ${upcomingCount}건`,
      badge: upcomingCount > 0 ? upcomingCount : undefined,
      onPress: () => navigation.navigate('MyBookings'),
    },
    {
      id: 'history',
      icon: 'time-outline' as const,
      title: '시술 기록',
      subtitle: `완료 ${completedCount}건`,
      onPress: () => navigation.navigate('MyBookings'),
    },
    {
      id: 'favorites',
      icon: 'heart-outline' as const,
      title: '찜한 서비스',
      subtitle: '관심 서비스 목록',
      onPress: () => {},
    },
    {
      id: 'points',
      icon: 'gift-outline' as const,
      title: '포인트',
      subtitle: '적립 포인트 및 쿠폰',
      onPress: () => {},
    },
  ];

  const handleLogout = () => {
    Alert.alert('로그아웃', '정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      { text: '로그아웃', style: 'destructive', onPress: logout },
    ]);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>
            {(user?.name || '사용자').charAt(0).toUpperCase()}
          </Text>
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
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation.navigate('MyBookings')}
          activeOpacity={0.7}
        >
          <Text style={styles.statNumber}>{upcomingCount}</Text>
          <Text style={styles.statLabel}>예정 예약</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <TouchableOpacity
          style={styles.statItem}
          onPress={() => navigation.navigate('MyBookings')}
          activeOpacity={0.7}
        >
          <Text style={styles.statNumber}>{completedCount}</Text>
          <Text style={styles.statLabel}>시술 완료</Text>
        </TouchableOpacity>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>${totalSpent}</Text>
          <Text style={styles.statLabel}>누적 금액</Text>
        </View>
      </View>

      {/* Quick Action - 예약하기 */}
      <TouchableOpacity
        style={styles.bookingBanner}
        onPress={() => navigation.navigate('Booking')}
        activeOpacity={0.85}
      >
        <View>
          <Text style={styles.bookingBannerTitle}>새 예약 하기</Text>
          <Text style={styles.bookingBannerSub}>프리미엄 시술을 지금 예약하세요</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color={COLORS.textWhite} />
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 정보</Text>
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 },
              ]}
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
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.badge}</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>설정</Text>
        <View style={styles.menuContainer}>
          {SETTINGS_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.settingsItem,
                index === SETTINGS_ITEMS.length - 1 && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.settingsIcon}>
                <Ionicons name={item.icon} size={20} color={COLORS.textSecondary} />
              </View>
              <Text style={styles.settingsTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Ionicons name="log-out-outline" size={20} color={COLORS.error} />
        <Text style={styles.logoutText}>로그아웃</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>버전 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  avatarWrap: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.textWhite,
  },
  profileInfo: { flex: 1, marginLeft: SPACING.md },
  profileName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  profileEmail: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: 2 },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
  statLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, marginTop: 4 },
  statDivider: { width: 1, backgroundColor: COLORS.border },

  bookingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.md,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    paddingHorizontal: SPACING.lg,
    ...SHADOWS.small,
  },
  bookingBannerTitle: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.textWhite },
  bookingBannerSub: { fontSize: FONTS.sizes.xs, color: 'rgba(255,255,255,0.75)', marginTop: 2 },

  section: { marginTop: SPACING.xl },
  sectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  menuContainer: {
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  menuIcon: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: { flex: 1, marginLeft: SPACING.md },
  menuTitle: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  menuSubtitle: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: 2 },
  badge: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: COLORS.textWhite },

  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  settingsIcon: { width: 32, justifyContent: 'center', alignItems: 'center' },
  settingsTitle: { flex: 1, fontSize: FONTS.sizes.md, color: COLORS.text, marginLeft: SPACING.sm },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.xl,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.error + '30',
    gap: SPACING.sm,
  },
  logoutText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.error },
  versionText: {
    textAlign: 'center',
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginTop: SPACING.lg,
  },
});
