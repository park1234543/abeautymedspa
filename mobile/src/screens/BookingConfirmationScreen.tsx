import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useBookingStore, BookingRecord } from '../store/bookingStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const days = ['일', '월', '화', '수', '목', '금', '토'];
function formatDate(d: Date) {
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일 (${days[d.getDay()]})`;
}

export function BookingConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    selectedService,
    selectedDoctor,
    selectedDate,
    selectedTime,
    customerInfo,
    addBookingRecord,
    resetBooking,
  } = useBookingStore();

  useEffect(() => {
    if (selectedService && selectedDoctor && selectedDate && selectedTime) {
      const record: BookingRecord = {
        id: `bk_${Date.now()}`,
        service: selectedService,
        doctor: selectedDoctor,
        date: selectedDate.toISOString(),
        time: selectedTime,
        customerInfo,
        status: 'upcoming',
        totalPrice: selectedService.price,
        createdAt: new Date().toISOString(),
      };
      addBookingRecord(record);
    }
  }, []);

  const dateLabel = selectedDate ? formatDate(selectedDate) : '날짜 미정';
  const serviceLabel = selectedService ? `${selectedService.name}` : '서비스 미정';
  const doctorLabel = selectedDoctor ? selectedDoctor.nameKo : '의사 미정';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <Ionicons name="checkmark" size={48} color={COLORS.textWhite} />
          </View>
        </View>

        <Text style={styles.title}>예약이 완료되었습니다</Text>
        <Text style={styles.subtitle}>
          예약 확인 이메일이 발송되었습니다.{'\n'}
          궁금한 점이 있으시면 언제든 연락주세요.
        </Text>

        {/* Booking Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="calendar-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{dateLabel} {selectedTime}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="sparkles-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>{serviceLabel} · {doctorLabel}</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>A Beauty MedSpa</Text>
          </View>
          {selectedService && (
            <View style={styles.infoRow}>
              <Ionicons name="card-outline" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>${selectedService.price}</Text>
            </View>
          )}
        </View>

        {/* Notice */}
        <View style={styles.noticeCard}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.noticeText}>
            예약 변경 또는 취소는 최소 24시간 전에 연락해 주세요.
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => {
            resetBooking();
            navigation.navigate('Main');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.secondaryButtonText}>홈으로</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            resetBooking();
            navigation.navigate('MyBookings');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>내 예약 확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },
  iconContainer: { marginBottom: SPACING.lg },
  iconBg: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.success,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: SPACING.xl,
  },
  infoCard: {
    width: '100%',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  infoText: { fontSize: FONTS.sizes.md, color: COLORS.text },
  noticeCard: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.primaryLight + '30',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  noticeText: { flex: 1, fontSize: FONTS.sizes.sm, color: COLORS.text, lineHeight: 20 },
  buttonContainer: { flexDirection: 'row', paddingHorizontal: SPACING.lg, gap: SPACING.md },
  secondaryButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  secondaryButtonText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  primaryButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  primaryButtonText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.textWhite },
});
