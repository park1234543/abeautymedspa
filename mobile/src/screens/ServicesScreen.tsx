import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigation/RootNavigator';
import { SERVICES } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageSelector } from '../components/LanguageSelector';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function ServicesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { t } = useTranslation();

  const CATEGORIES = [
    { id: 'all', name: t('services', 'all') },
    { id: 'face', name: t('services', 'face') },
    { id: 'body', name: t('services', 'body') },
    { id: 'skin', name: t('services', 'skin') },
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <LanguageSelector />
        <Text style={styles.headerTitle}>{t('services', 'title')}</Text>
        <Text style={styles.headerSubtitle}>{t('services', 'subtitle')}</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll} contentContainerStyle={styles.categoriesContainer}>
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[styles.categoryButton, selectedCategory === category.id && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={[styles.categoryText, selectedCategory === category.id && styles.categoryTextActive]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.servicesList} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }} showsVerticalScrollIndicator={false}>
        {SERVICES.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
          >
            <Image source={service.image} style={styles.serviceImage} />
            <View style={styles.serviceContent}>
              <View style={styles.serviceHeader}>
                <View>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceNameEn}>{service.nameEn}</Text>
                </View>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
              <Text style={styles.serviceDescription} numberOfLines={2}>{service.description}</Text>
              <View style={styles.serviceFooter}>
                <View style={styles.serviceDuration}>
                  <Text style={styles.serviceDurationText}>{service.duration}{t('services', 'min')}</Text>
                </View>
                <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking')}>
                  <Text style={styles.bookButtonText}>{t('services', 'bookNow')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm, paddingBottom: SPACING.md },
  headerTitle: { fontSize: FONTS.sizes.xxxl, fontWeight: '700', color: COLORS.text, marginTop: SPACING.sm },
  headerSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: SPACING.xs },
  categoriesScroll: { flexGrow: 0, flexShrink: 0, height: 42 },
  categoriesContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.lg, paddingTop: 4, paddingBottom: 4, gap: SPACING.sm },
  categoryButton: { alignSelf: 'flex-start', paddingVertical: 5, paddingHorizontal: SPACING.md, borderRadius: RADIUS.full, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
  categoryButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryText: { fontSize: FONTS.sizes.sm, fontWeight: '500', color: COLORS.textSecondary },
  categoryTextActive: { color: COLORS.textWhite },
  servicesList: { flex: 1, paddingHorizontal: SPACING.lg, paddingTop: SPACING.sm },
  serviceCard: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, overflow: 'hidden', marginBottom: SPACING.md, ...SHADOWS.small },
  serviceImage: { width: '100%', height: 180 },
  serviceContent: { padding: SPACING.md },
  serviceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: SPACING.sm },
  serviceName: { fontSize: FONTS.sizes.lg, fontWeight: '700', color: COLORS.text },
  serviceNameEn: { fontSize: FONTS.sizes.xs, color: COLORS.textLight, marginTop: 2 },
  servicePrice: { fontSize: FONTS.sizes.xl, fontWeight: '700', color: COLORS.primary },
  serviceDescription: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, lineHeight: 20, marginBottom: SPACING.md },
  serviceFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  serviceDuration: { backgroundColor: COLORS.primaryLight + '30', paddingVertical: SPACING.xs, paddingHorizontal: SPACING.sm, borderRadius: RADIUS.sm },
  serviceDurationText: { fontSize: FONTS.sizes.xs, color: COLORS.primary, fontWeight: '500' },
  bookButton: { backgroundColor: COLORS.primary, paddingVertical: SPACING.sm, paddingHorizontal: SPACING.lg, borderRadius: RADIUS.md },
  bookButtonText: { fontSize: FONTS.sizes.sm, fontWeight: '600', color: COLORS.textWhite },
});
