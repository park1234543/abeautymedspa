import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';

import { RootStackParamList } from '../navigation/RootNavigator';
import { useBookingStore } from '../store/bookingStore';
import { SERVICES, DOCTORS } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const STEPS = ['서비스', '의사', '날짜/시간', '정보', '확인'];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

export function BookingScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    currentStep,
    selectedService,
    selectedDoctor,
    selectedDate,
    selectedTime,
    customerInfo,
    setService,
    setDoctor,
    setDate,
    setTime,
    setCustomerInfo,
    nextStep,
    prevStep,
    resetBooking,
  } = useBookingStore();

  const handleConfirmBooking = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      Alert.alert('알림', '모든 필수 정보를 입력해주세요.');
      return;
    }
    // Here you would make the API call
    navigation.navigate('BookingConfirmation', { bookingId: 'booking-123' });
    resetBooking();
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {STEPS.map((step, index) => (
        <View key={step} style={styles.stepItem}>
          <View
            style={[
              styles.stepCircle,
              index <= currentStep && styles.stepCircleActive,
            ]}
          >
            {index < currentStep ? (
              <Ionicons name="checkmark" size={14} color={COLORS.textWhite} />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  index <= currentStep && styles.stepNumberActive,
                ]}
              >
                {index + 1}
              </Text>
            )}
          </View>
          <Text
            style={[
              styles.stepLabel,
              index === currentStep && styles.stepLabelActive,
            ]}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderServiceStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>서비스를 선택하세요</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={[
              styles.selectionCard,
              selectedService?.id === service.id && styles.selectionCardActive,
            ]}
            onPress={() => setService(service as any)}
            activeOpacity={0.8}
          >
            <Image source={service.image} style={styles.selectionImage} />
            <View style={styles.selectionContent}>
              <Text style={styles.selectionTitle}>{service.name}</Text>
              <Text style={styles.selectionSubtitle}>{service.nameEn}</Text>
              <Text style={styles.selectionPrice}>${service.price}</Text>
            </View>
            {selectedService?.id === service.id && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderDoctorStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>담당 의사를 선택하세요</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {DOCTORS.map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={[
              styles.doctorCard,
              selectedDoctor?.id === doctor.id && styles.doctorCardActive,
            ]}
            onPress={() => setDoctor(doctor as any)}
            activeOpacity={0.8}
          >
            <Image source={doctor.image} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.nameKo}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorExperience}>{doctor.experience} 경력</Text>
            </View>
            {selectedDoctor?.id === doctor.id && (
              <Ionicons name="checkmark-circle" size={24} color={COLORS.primary} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderDateTimeStep = () => {
    const dates = Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1));

    return (
      <View style={styles.stepContent}>
        <Text style={styles.stepTitle}>날짜를 선택하세요</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dates.map((date) => {
            const isSelected = selectedDate?.toDateString() === date.toDateString();
            return (
              <TouchableOpacity
                key={date.toISOString()}
                style={[styles.dateCard, isSelected && styles.dateCardActive]}
                onPress={() => setDate(date)}
              >
                <Text style={[styles.dateDay, isSelected && styles.dateDayActive]}>
                  {format(date, 'EEE', { locale: ko })}
                </Text>
                <Text style={[styles.dateNumber, isSelected && styles.dateNumberActive]}>
                  {format(date, 'd')}
                </Text>
                <Text style={[styles.dateMonth, isSelected && styles.dateMonthActive]}>
                  {format(date, 'MMM', { locale: ko })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={[styles.stepTitle, { marginTop: SPACING.lg }]}>시간을 선택하세요</Text>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <TouchableOpacity
                key={time}
                style={[styles.timeSlot, isSelected && styles.timeSlotActive]}
                onPress={() => setTime(time)}
              >
                <Text style={[styles.timeText, isSelected && styles.timeTextActive]}>
                  {time}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const renderInfoStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>예약자 정보를 입력하세요</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>이름 *</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            placeholderTextColor={COLORS.textLight}
            value={customerInfo.name}
            onChangeText={(text) => setCustomerInfo({ name: text })}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>이메일 *</Text>
          <TextInput
            style={styles.input}
            placeholder="이메일을 입력하세요"
            placeholderTextColor={COLORS.textLight}
            value={customerInfo.email}
            onChangeText={(text) => setCustomerInfo({ email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>전화번호 *</Text>
          <TextInput
            style={styles.input}
            placeholder="전화번호를 입력하세요"
            placeholderTextColor={COLORS.textLight}
            value={customerInfo.phone}
            onChangeText={(text) => setCustomerInfo({ phone: text })}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>요청 사항</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="특별 요청 사항이 있으면 입력하세요"
            placeholderTextColor={COLORS.textLight}
            value={customerInfo.notes}
            onChangeText={(text) => setCustomerInfo({ notes: text })}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>예약 정보를 확인하세요</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>서비스</Text>
          <Text style={styles.summaryValue}>{selectedService?.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>담당 의사</Text>
          <Text style={styles.summaryValue}>{selectedDoctor?.nameKo}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>날짜</Text>
          <Text style={styles.summaryValue}>
            {selectedDate && format(selectedDate, 'yyyy년 M월 d일 (EEE)', { locale: ko })}
          </Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>시간</Text>
          <Text style={styles.summaryValue}>{selectedTime}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>예약자</Text>
          <Text style={styles.summaryValue}>{customerInfo.name}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>연락처</Text>
          <Text style={styles.summaryValue}>{customerInfo.phone}</Text>
        </View>
        <View style={styles.summaryDivider} />
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>총 금액</Text>
          <Text style={styles.summaryPrice}>${selectedService?.price}</Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderServiceStep();
      case 1:
        return renderDoctorStep();
      case 2:
        return renderDateTimeStep();
      case 3:
        return renderInfoStep();
      case 4:
        return renderConfirmStep();
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedService;
      case 1:
        return !!selectedDoctor;
      case 2:
        return !!selectedDate && !!selectedTime;
      case 3:
        return !!customerInfo.name && !!customerInfo.email && !!customerInfo.phone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {renderStepIndicator()}
      {renderCurrentStep()}

      {/* Navigation Buttons */}
      <View style={styles.bottomButtons}>
        {currentStep > 0 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={prevStep}
            activeOpacity={0.8}
          >
            <Text style={styles.backButtonText}>이전</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !canProceed() && styles.nextButtonDisabled,
            currentStep === 0 && styles.nextButtonFull,
          ]}
          onPress={currentStep === 4 ? handleConfirmBooking : nextStep}
          disabled={!canProceed()}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === 4 ? '예약 완료' : '다음'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  stepItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleActive: {
    backgroundColor: COLORS.primary,
  },
  stepNumber: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  stepNumberActive: {
    color: COLORS.textWhite,
  },
  stepLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
  },
  stepLabelActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  stepContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  stepTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  selectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small,
  },
  selectionCardActive: {
    borderColor: COLORS.primary,
  },
  selectionImage: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.sm,
  },
  selectionContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  selectionTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  selectionSubtitle: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
  },
  selectionPrice: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 4,
  },
  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small,
  },
  doctorCardActive: {
    borderColor: COLORS.primary,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.full,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  doctorName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  doctorSpecialty: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  doctorExperience: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    marginTop: 2,
  },
  dateScroll: {
    marginBottom: SPACING.md,
  },
  dateCard: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginRight: SPACING.sm,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: 'transparent',
    ...SHADOWS.small,
  },
  dateCardActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dateDay: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
  },
  dateDayActive: {
    color: COLORS.textWhite,
  },
  dateNumber: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  dateNumberActive: {
    color: COLORS.textWhite,
  },
  dateMonth: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
  },
  dateMonthActive: {
    color: COLORS.textWhite,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  timeSlot: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  timeSlotActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
  },
  timeTextActive: {
    color: COLORS.textWhite,
    fontWeight: '600',
  },
  formContainer: {
    gap: SPACING.md,
  },
  inputGroup: {
    gap: SPACING.xs,
  },
  inputLabel: {
    fontSize: FONTS.sizes.sm,
    fontWeight: '600',
    color: COLORS.text,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  summaryContainer: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOWS.small,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  summaryLabel: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
  },
  summaryValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.md,
  },
  summaryPrice: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: SPACING.lg,
    gap: SPACING.md,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  backButton: {
    flex: 1,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  nextButton: {
    flex: 2,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
  },
  nextButtonFull: {
    flex: 1,
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
});
