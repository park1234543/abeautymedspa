import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';
import { ko, enUS, es, zhCN } from 'date-fns/locale';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useBookingStore } from '../store/bookingStore';
import { SERVICES, DOCTORS } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { useLanguageStore } from '../store/languageStore';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const LOCALE_MAP = { ko, en: enUS, es, zh: zhCN };

export function BookingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { t, tArr } = useTranslation();
  const { language } = useLanguageStore();
  const dateLocale = LOCALE_MAP[language] || enUS;

  const {
    currentStep, selectedService, selectedDoctor, selectedDate, selectedTime, customerInfo,
    setService, setDoctor, setDate, setTime, setCustomerInfo, nextStep, prevStep, resetBooking,
  } = useBookingStore();

  const STEPS = tArr('booking', 'steps');

  const handleConfirmBooking = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      Alert.alert(t('booking', 'alertTitle'), t('booking', 'alertMsg'));
      return;
    }
    navigation.navigate('BookingConfirmation', { bookingId: 'booking-123' });
    resetBooking();
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {STEPS.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View style={[styles.stepCircle, index <= currentStep && styles.stepCircleActive]}>
            {index < currentStep ? (
              <Ionicons name="checkmark" size={14} color={COLORS.textWhite} />
            ) : (
              <Text style={[styles.stepNumber, index <= currentStep && styles.stepNumberActive]}>{index + 1}</Text>
            )}
          </View>
          <Text style={[styles.stepLabel, index === currentStep && styles.stepLabelActive]}>{step}</Text>
        </View>
      ))}
    </View>
  );

  const renderServiceStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{t('booking', 'selectService')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {SERVICES.map((service) => (
          <Pressable
            key={service.id}
            style={[styles.selectionCard, selectedService?.id === service.id && styles.selectionCardActive]}
            onPress={() => setService(service as any)}
          >
            <Image source={service.image} style={styles.selectionImage} />
            <View style={styles.selectionContent}>
              <Text style={styles.selectionTitle}>{service.name}</Text>
              <Text style={styles.selectionSubtitle}>{service.nameEn}</Text>
              <Text style={styles.selectionPrice}>${service.price}</Text>
            </View>
            {selectedService?.id === service.id && <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderDoctorStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>{t('booking', 'selectDoctor')}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DOCTORS.map((doctor) => (
          <Pressable
            key={doctor.id}
            style={[styles.doctorCard, selectedDoctor?.id === doctor.id && styles.doctorCardActive]}
            onPress={() => setDoctor(doctor as any)}
          >
            <Image source={doctor.image} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.nameKo}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorExperience}>{doctor.experience} {t('booking', 'career')}</Text>
            </View>
            {selectedDoctor?.id === doctor.id && <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );

  const renderDateTimeStep = () => {
    const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));
    return (
      <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>{t('booking', 'selectDate')}</Text>

        {Platform.OS === 'web' ? (
          <View style={styles.dateGridWeb}>
            {dates.map((date) => {
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <Pressable key={date.toISOString()} style={[styles.dateCard, isSelected && styles.dateCardActive]} onPress={() => setDate(date)}>
                  <Text style={[styles.dateDay, isSelected && styles.dateDayActive]}>{format(date, 'EEE', { locale: dateLocale })}</Text>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberActive]}>{format(date, 'd')}</Text>
                  <Text style={[styles.dateMonth, isSelected && styles.dateMonthActive]}>{format(date, 'MMM', { locale: dateLocale })}</Text>
                </Pressable>
              );
            })}
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroll} contentContainerStyle={{ paddingRight: SPACING.md }}>
            {dates.map((date) => {
              const isSelected = selectedDate?.toDateString() === date.toDateString();
              return (
                <Pressable key={date.toISOString()} style={[styles.dateCard, isSelected && styles.dateCardActive]} onPress={() => setDate(date)}>
                  <Text style={[styles.dateDay, isSelected && styles.dateDayActive]}>{format(date, 'EEE', { locale: dateLocale })}</Text>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberActive]}>{format(date, 'd')}</Text>
                  <Text style={[styles.dateMonth, isSelected && styles.dateMonthActive]}>{format(date, 'MMM', { locale: dateLocale })}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        )}

        <Text style={[styles.stepTitle, { marginTop: SPACING.lg }]}>{t('booking', 'selectTime')}</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <Pressable key={time} style={[styles.timeSlot, isSelected && styles.timeSlotActive]} onPress={() => setTime(time)}>
                <Text style={[styles.timeText, isSelected && styles.timeTextActive]}>{time}</Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    );
  };

  const renderInfoStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>{t('booking', 'enterInfo')}</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('booking', 'name')}</Text>
          <TextInput style={styles.input} placeholder={t('booking', 'namePlaceholder')} placeholderTextColor={COLORS.textLight} value={customerInfo.name} onChangeText={(text) => setCustomerInfo({ name: text })} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('booking', 'email')}</Text>
          <TextInput style={styles.input} placeholder={t('booking', 'emailPlaceholder')} placeholderTextColor={COLORS.textLight} value={customerInfo.email} onChangeText={(text) => setCustomerInfo({ email: text })} keyboardType="email-address" autoCapitalize="none" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('booking', 'phone')}</Text>
          <TextInput style={styles.input} placeholder={t('booking', 'phonePlaceholder')} placeholderTextColor={COLORS.textLight} value={customerInfo.phone} onChangeText={(text) => setCustomerInfo({ phone: text })} keyboardType="phone-pad" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>{t('booking', 'notes')}</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder={t('booking', 'notesPlaceholder')} placeholderTextColor={COLORS.textLight} value={customerInfo.notes} onChangeText={(text) => setCustomerInfo({ notes: text })} multiline numberOfLines={4} />
        </View>
      </View>
    </ScrollView>
  );

  const renderConfirmStep = () => (
    <ScrollView style={styles.stepContent} showsVerticalScrollIndicator={false}>
      <Text style={styles.stepTitle}>{t('booking', 'confirmBooking')}</Text>
      <View style={styles.summaryContainer}>
        {[
          [t('booking', 'service'), selectedService?.name],
          [t('booking', 'doctor'), selectedDoctor?.nameKo],
          [t('booking', 'date'), selectedDate ? format(selectedDate, 'yyyy-MM-dd (EEE)', { locale: dateLocale }) : ''],
          [t('booking', 'time'), selectedTime],
          [t('booking', 'customer'), customerInfo.name],
          [t('booking', 'contact'), customerInfo.phone],
        ].map(([label, value]) => (
          <View key={label} style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={styles.summaryValue}>{value}</Text>
          </View>
        ))}
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>{t('booking', 'total')}</Text>
          <Text style={styles.summaryPrice}>${selectedService?.price}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderServiceStep();
      case 1: return renderDoctorStep();
      case 2: return renderDateTimeStep();
      case 3: return renderInfoStep();
      case 4: return renderConfirmStep();
      default: return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!selectedService;
      case 1: return !!selectedDoctor;
      case 2: return !!selectedDate && !!selectedTime;
      case 3: return !!customerInfo.name && !!customerInfo.email && !!customerInfo.phone;
      case 4: return true;
      default: return false;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {renderStepIndicator()}
      {renderCurrentStep()}
      <View style={styles.bottomButtons}>
        {currentStep > 0 && (
          <Pressable style={styles.backButton} onPress={prevStep}>
            <Text style={styles.backButtonText}>{t('booking', 'prev')}</Text>
          </Pressable>
        )}
        <Pressable
          style={[styles.nextButton, !canProceed() && styles.nextButtonDisabled, currentStep === 0 && styles.nextButtonFull]}
          onPress={currentStep === 4 ? handleConfirmBooking : nextStep}
          disabled={!canProceed()}
        >
          <Text style={styles.nextButtonText}>{currentStep === 4 ? t('booking', 'confirm') : t('booking', 'next')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  stepIndicator: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, backgroundColor: COLORS.card, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  stepItem: { alignItems: 'center', gap: SPACING.xs },
  stepCircle: { width: 28, height: 28, borderRadius: RADIUS.full, backgroundColor: COLORS.border, justifyContent: 'center', alignItems: 'center' },
  stepCircleActive: { backgroundColor: COLORS.primary },
  stepNumber: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textLight },
  stepNumberActive: { color: COLORS.textWhite },
  stepLabel: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  stepLabelActive: { color: COLORS.primary, fontWeight: '600' },
  stepContent: { flex: 1, padding: SPACING.lg },
  stepTitle: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text, marginBottom: SPACING.md },
  selectionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.sm, marginBottom: SPACING.sm, borderWidth: 2, borderColor: 'transparent', cursor: 'pointer' as any, ...SHADOWS.small },
  selectionCardActive: { borderColor: COLORS.primary },
  selectionImage: { width: 70, height: 70, borderRadius: RADIUS.sm },
  selectionContent: { flex: 1, marginLeft: SPACING.md },
  selectionTitle: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  selectionSubtitle: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  selectionPrice: { fontSize: FONTS.sizes.md, fontWeight: '700', color: COLORS.primary, marginTop: 4 },
  doctorCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.card, borderRadius: RADIUS.md, padding: SPACING.md, marginBottom: SPACING.sm, borderWidth: 2, borderColor: 'transparent', cursor: 'pointer' as any, ...SHADOWS.small },
  doctorCardActive: { borderColor: COLORS.primary },
  doctorImage: { width: 60, height: 60, borderRadius: RADIUS.full },
  doctorInfo: { flex: 1, marginLeft: SPACING.md },
  doctorName: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  doctorSpecialty: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary },
  doctorExperience: { fontSize: FONTS.sizes.xs, color: COLORS.primary, marginTop: 2 },
  dateGridWeb: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  dateScroll: { marginBottom: SPACING.md, height: 110, flexGrow: 0 },
  dateCard: { alignItems: 'center', paddingVertical: SPACING.md, paddingHorizontal: SPACING.lg, marginRight: SPACING.sm, borderRadius: RADIUS.md, backgroundColor: COLORS.card, borderWidth: 2, borderColor: 'transparent', cursor: 'pointer' as any, ...SHADOWS.small },
  dateCardActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  dateDay: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  dateDayActive: { color: COLORS.textWhite },
  dateNumber: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.text },
  dateNumberActive: { color: COLORS.textWhite },
  dateMonth: { fontSize: FONTS.sizes.xs, color: COLORS.textLight },
  dateMonthActive: { color: COLORS.textWhite },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, paddingBottom: SPACING.xl },
  timeSlot: { paddingVertical: SPACING.sm, paddingHorizontal: SPACING.md, borderRadius: RADIUS.sm, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border, cursor: 'pointer' as any },
  timeSlotActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  timeText: { fontSize: FONTS.sizes.sm, color: COLORS.text },
  timeTextActive: { color: COLORS.textWhite, fontWeight: '600' },
  formContainer: { gap: SPACING.md, paddingBottom: SPACING.xl },
  inputGroup: { gap: SPACING.xs },
  inputLabel: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.text },
  input: { backgroundColor: COLORS.card, borderRadius: RADIUS.md, paddingHorizontal: SPACING.md, paddingVertical: SPACING.md, fontSize: FONTS.sizes.md, color: COLORS.text, borderWidth: 1, borderColor: COLORS.border },
  textArea: { height: 100, textAlignVertical: 'top' },
  summaryContainer: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.lg, marginBottom: SPACING.xl, ...SHADOWS.small },
  summaryItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  summaryLabel: { fontSize: FONTS.sizes.md, color: COLORS.textSecondary },
  summaryValue: { fontSize: FONTS.sizes.md, fontWeight: '500', color: COLORS.text },
  summaryDivider: { height: 1, backgroundColor: COLORS.border, marginVertical: SPACING.md },
  summaryPrice: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
  bottomButtons: { flexDirection: 'row', padding: SPACING.lg, gap: SPACING.md, backgroundColor: COLORS.card, borderTopWidth: 1, borderTopColor: COLORS.border },
  backButton: { flex: 1, paddingVertical: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center', cursor: 'pointer' as any },
  backButtonText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.text },
  nextButton: { flex: 2, backgroundColor: COLORS.primary, paddingVertical: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', cursor: 'pointer' as any },
  nextButtonFull: { flex: 1 },
  nextButtonDisabled: { opacity: 0.5 },
  nextButtonText: { fontSize: FONTS.sizes.md, fontWeight: '600', color: COLORS.textWhite },
});
