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

import { format } from 'date-fns';
import { ko, enUS, es, zhCN } from 'date-fns/locale';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useBookingStore, BookingRecord } from '../store/bookingStore';
import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { getServiceName, getDoctorName, LangKey } from '../constants/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LOCALE_MAP: Record<string, Locale> = { ko, en: enUS, es, zh: zhCN };
function formatDate(d: Date, lang: string) {
  const locale = LOCALE_MAP[lang] || enUS;
  return format(d, 'PPP (EEE)', { locale });
}

export function BookingConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { t, language } = useTranslation();
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

  const dateLabel = selectedDate ? formatDate(selectedDate, language) : '-';
  const serviceLabel = selectedService ? getServiceName(selectedService, language as LangKey) : '-';
  const doctorLabel = selectedDoctor ? getDoctorName(selectedDoctor, language as LangKey) : '-';

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <Ionicons name="checkmark" size={48} color={COLORS.textWhite} />
          </View>
        </View>

        <Text style={styles.title}>{t('bookingConfirm', 'title')}</Text>
        <Text style={styles.subtitle}>{t('bookingConfirm', 'subtitle')}</Text>

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
          <Text style={styles.noticeText}>{t('bookingConfirm', 'notice')}</Text>
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
          <Text style={styles.secondaryButtonText}>{t('bookingConfirm', 'goHome')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            resetBooking();
            navigation.navigate('MyBookings');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryButtonText}>{t('bookingConfirm', 'myBookings')}</Text>
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
