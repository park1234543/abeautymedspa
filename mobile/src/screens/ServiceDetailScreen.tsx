import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { SERVICES, getServiceName, getServiceDesc, LangKey } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';

const { width } = Dimensions.get('window');

type RouteParams = RouteProp<RootStackParamList, 'ServiceDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ServiceDetailScreen() {
  const route = useRoute<RouteParams>();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  const { t, language } = useTranslation();
  const service = SERVICES.find((s) => s.id === route.params.serviceId);

  if (!service) {
    return (
      <View style={styles.container}>
        <Text>{t('services', 'title')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      >
        {/* Image */}
        <Image source={service.image} style={styles.heroImage} />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{getServiceName(service, language as LangKey)}</Text>
            </View>
            <Text style={styles.price}>${service.price}</Text>
          </View>

          <Text style={styles.description}>{getServiceDesc(service, language as LangKey)}</Text>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoLabel}>{t('serviceDetail', 'duration')}</Text>
              <Text style={styles.infoValue}>{service.duration}{t('services', 'min')}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="refresh-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoLabel}>{t('serviceDetail', 'recovery')}</Text>
              <Text style={styles.infoValue}>{t('serviceDetail', 'recoveryVal')}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
              <Text style={styles.infoLabel}>{t('serviceDetail', 'lasting')}</Text>
              <Text style={styles.infoValue}>{t('serviceDetail', 'lastingVal')}</Text>
            </View>
          </View>

          {/* Benefits */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('serviceDetail', 'benefits')}</Text>
            <View style={styles.benefitsList}>
              {(['benefit1','benefit2','benefit3','benefit4'] as const).map((k) => (
                <View key={k} style={styles.benefitItem}>
                  <Ionicons name="checkmark-circle" size={20} color={COLORS.success} />
                  <Text style={styles.benefitText}>{t('serviceDetail', k)}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Process */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('serviceDetail', 'process')}</Text>
            <View style={styles.processList}>
              {[1,2,3].map((n) => (
                <View key={n} style={styles.processItem}>
                  <View style={styles.processNumber}>
                    <Text style={styles.processNumberText}>{n}</Text>
                  </View>
                  <View style={styles.processContent}>
                    <Text style={styles.processTitle}>{t('serviceDetail', `step${n}Title` as any)}</Text>
                    <Text style={styles.processDescription}>{t('serviceDetail', `step${n}Desc` as any)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomCta, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>{t('serviceDetail', 'price')}</Text>
          <Text style={styles.priceValue}>${service.price}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Booking')}
          activeOpacity={0.8}
        >
          <Text style={styles.bookButtonText}>{t('serviceDetail', 'bookNow')}</Text>
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
  heroImage: {
    width: width,
    height: 300,
  },
  content: {
    padding: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.text,
  },
  nameEn: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textLight,
    marginTop: 2,
  },
  price: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  description: {
    fontSize: FONTS.sizes.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
    marginBottom: SPACING.lg,
  },
  infoCards: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  infoCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    ...SHADOWS.small,
  },
  infoLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginTop: SPACING.sm,
  },
  infoValue: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  benefitsList: {
    gap: SPACING.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  benefitText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text,
  },
  processList: {
    gap: SPACING.lg,
  },
  processItem: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  processNumber: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processNumberText: {
    color: COLORS.textWhite,
    fontWeight: '600',
  },
  processContent: {
    flex: 1,
  },
  processTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  processDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  bottomCta: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SPACING.lg,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
  },
  priceValue: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xxl,
    borderRadius: RADIUS.md,
  },
  bookButtonText: {
    color: COLORS.textWhite,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
});
