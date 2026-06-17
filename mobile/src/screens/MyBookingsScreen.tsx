import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useBookingStore, BookingRecord, BookingStatus } from '../store/bookingStore';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type TabType = 'upcoming' | 'completed' | 'cancelled';

const TABS: { key: TabType; label: string }[] = [
  { key: 'upcoming', label: '예정' },
  { key: 'completed', label: '완료' },
  { key: 'cancelled', label: '취소' },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  upcoming: { label: '예정', color: '#2E7D32', bg: '#E8F5E9' },
  completed: { label: '완료', color: COLORS.accent, bg: COLORS.primaryLight + '40' },
  cancelled: { label: '취소', color: COLORS.error, bg: '#FFEBEE' },
};

function formatDate(isoString: string) {
  const d = new Date(isoString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

function getDday(isoString: string) {
  const now = new Date();
  const target = new Date(isoString);
  const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'D-Day';
  if (diff > 0) return `D-${diff}`;
  return `D+${Math.abs(diff)}`;
}

interface BookingCardProps {
  booking: BookingRecord;
  onCancel?: (id: string) => void;
  onRebook?: (booking: BookingRecord) => void;
}

function BookingCard({ booking, onCancel, onRebook }: BookingCardProps) {
  const status = STATUS_CONFIG[booking.status];
  const isUpcoming = booking.status === 'upcoming';
  const isCompleted = booking.status === 'completed';

  return (
    <View style={styles.card}>
      {/* Card Header */}
      <View style={styles.cardHeader}>
        <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
          <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
        </View>
        {isUpcoming && (
          <Text style={styles.ddayText}>{getDday(booking.date)}</Text>
        )}
      </View>

      {/* Service Info */}
      <View style={styles.serviceRow}>
        <View style={styles.serviceIconWrap}>
          <Ionicons name="sparkles-outline" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{booking.service.name}</Text>
          <Text style={styles.doctorName}>{booking.doctor.nameKo} · {booking.doctor.specialty}</Text>
        </View>
        <Text style={styles.price}>${booking.totalPrice}</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Date & Time */}
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={15} color={COLORS.textLight} />
          <Text style={styles.detailText}>{formatDate(booking.date)}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="time-outline" size={15} color={COLORS.textLight} />
          <Text style={styles.detailText}>{booking.time}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="hourglass-outline" size={15} color={COLORS.textLight} />
          <Text style={styles.detailText}>{booking.service.duration}분</Text>
        </View>
      </View>

      {/* Actions */}
      {(isUpcoming || isCompleted) && (
        <View style={styles.actionsRow}>
          {isUpcoming && (
            <>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => onCancel?.(booking.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelButtonText}>예약 취소</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.changeButton} activeOpacity={0.7}>
                <Text style={styles.changeButtonText}>일정 변경</Text>
              </TouchableOpacity>
            </>
          )}
          {isCompleted && (
            <TouchableOpacity
              style={styles.rebookButton}
              onPress={() => onRebook?.(booking)}
              activeOpacity={0.7}
            >
              <Ionicons name="refresh-outline" size={16} color={COLORS.textWhite} />
              <Text style={styles.rebookButtonText}>재예약</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

function EmptyState({ tab }: { tab: TabType }) {
  const config = {
    upcoming: { icon: 'calendar-outline' as const, text: '예정된 예약이 없어요' },
    completed: { icon: 'checkmark-circle-outline' as const, text: '완료된 시술 내역이 없어요' },
    cancelled: { icon: 'close-circle-outline' as const, text: '취소된 예약이 없어요' },
  };
  const { icon, text } = config[tab];
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={56} color={COLORS.border} />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

export function MyBookingsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const { bookingHistory, cancelBooking, loadBookingHistory } = useBookingStore();

  useEffect(() => {
    loadBookingHistory();
  }, []);

  const filtered = bookingHistory.filter((b) => b.status === activeTab);

  const handleCancel = (id: string) => {
    Alert.alert(
      '예약 취소',
      '정말 예약을 취소하시겠습니까?\n취소 후 복구가 어렵습니다.',
      [
        { text: '돌아가기', style: 'cancel' },
        {
          text: '취소하기',
          style: 'destructive',
          onPress: () => {
            cancelBooking(id);
            Alert.alert('완료', '예약이 취소되었습니다.');
          },
        },
      ]
    );
  };

  const handleRebook = (booking: BookingRecord) => {
    navigation.navigate('Booking');
  };

  const upcomingCount = bookingHistory.filter((b) => b.status === 'upcoming').length;
  const completedCount = bookingHistory.filter((b) => b.status === 'completed').length;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>내 예약</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Summary */}
      <View style={styles.summaryRow}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{upcomingCount}</Text>
          <Text style={styles.summaryLabel}>예정</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>{completedCount}</Text>
          <Text style={styles.summaryLabel}>완료</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNum}>
            ${bookingHistory
              .filter((b) => b.status === 'completed')
              .reduce((sum, b) => sum + b.totalPrice, 0)}
          </Text>
          <Text style={styles.summaryLabel}>누적 금액</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {TABS.map((tab) => {
          const count = bookingHistory.filter((b) => b.status === tab.key).length;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.tabActive]}
              onPress={() => setActiveTab(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
                {tab.label}
              </Text>
              {count > 0 && (
                <View style={[styles.tabBadge, activeTab === tab.key && styles.tabBadgeActive]}>
                  <Text style={[styles.tabBadgeText, activeTab === tab.key && styles.tabBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* List */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <EmptyState tab={activeTab} />
        ) : (
          filtered.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancel}
              onRebook={handleRebook}
            />
          ))
        )}
      </ScrollView>

      {/* FAB - New Booking */}
      {activeTab === 'upcoming' && (
        <TouchableOpacity
          style={[styles.fab, { bottom: insets.bottom + 24 }]}
          onPress={() => navigation.navigate('Booking')}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={24} color={COLORS.textWhite} />
          <Text style={styles.fabText}>새 예약</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },

  summaryRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    marginHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
    ...SHADOWS.small,
    marginBottom: SPACING.md,
  },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNum: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
  summaryLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, marginTop: 2 },
  summaryDivider: { width: 1, backgroundColor: COLORS.border },

  tabBar: {
    flexDirection: 'row',
    marginHorizontal: SPACING.lg,
    backgroundColor: COLORS.borderLight,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.md,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    gap: 4,
  },
  tabActive: { backgroundColor: COLORS.card, ...SHADOWS.small },
  tabText: { fontSize: FONTS.sizes.sm, fontWeight: '500', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.text, fontWeight: '700' },
  tabBadge: {
    backgroundColor: COLORS.border,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabBadgeActive: { backgroundColor: COLORS.primary },
  tabBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.textLight },
  tabBadgeTextActive: { color: COLORS.textWhite },

  list: { flex: 1 },
  listContent: { paddingHorizontal: SPACING.lg, gap: SPACING.md },

  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  statusText: { fontSize: FONTS.sizes.xs, fontWeight: '700' },
  ddayText: { fontSize: FONTS.sizes.sm, fontWeight: '700', color: COLORS.primary },

  serviceRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  serviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.text },
  doctorName: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary, marginTop: 2 },
  price: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.primary },

  divider: { height: 1, backgroundColor: COLORS.borderLight, marginVertical: SPACING.sm },

  detailsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  detailText: { fontSize: FONTS.sizes.xs, color: COLORS.textSecondary },

  actionsRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  cancelButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  cancelButtonText: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, fontWeight: '500' },
  changeButton: {
    flex: 1,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: COLORS.primary,
    alignItems: 'center',
  },
  changeButtonText: { fontSize: FONTS.sizes.sm, color: COLORS.primary, fontWeight: '600' },
  rebookButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  rebookButtonText: { fontSize: FONTS.sizes.sm, color: COLORS.textWhite, fontWeight: '600' },

  emptyContainer: { alignItems: 'center', paddingTop: 80, gap: SPACING.md },
  emptyText: { fontSize: FONTS.sizes.md, color: COLORS.textLight },

  fab: {
    position: 'absolute',
    right: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.full,
    gap: 6,
    ...SHADOWS.medium,
  },
  fabText: { color: COLORS.textWhite, fontWeight: '700', fontSize: FONTS.sizes.sm },
});
