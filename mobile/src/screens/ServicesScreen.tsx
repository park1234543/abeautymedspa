import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
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

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const CARD_WIDTH = (width - SPACING.lg * 2 - CARD_GAP) / 2;

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

  const filtered = selectedCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>{t('services', 'title')}</Text>
            <Text style={styles.headerSubtitle}>{t('services', 'subtitle')}</Text>
          </View>
          <LanguageSelector />
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryButton, selectedCategory === cat.id && styles.categoryButtonActive]}
            onPress={() => setSelectedCategory(cat.id)}
          >
            <Text style={[styles.categoryText, selectedCategory === cat.id && styles.categoryTextActive]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 2-Column Grid */}
      <ScrollView
        style={styles.list}
        contentContainerStyle={[styles.grid, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
          >
            <Image source={service.image} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardName} numberOfLines={1}>{service.name}</Text>
              <Text style={styles.cardNameEn} numberOfLines={1}>{service.nameEn}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>${service.price}</Text>
                <View style={styles.cardDuration}>
                  <Text style={styles.cardDurationText}>{service.duration}{t('services', 'min')}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.bookBtn}
                onPress={() => navigation.navigate('Booking')}
                activeOpacity={0.8}
              >
                <Text style={styles.bookBtnText}>{t('services', 'bookNow')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: { paddingHorizontal: SPACING.lg, paddingTop: SPACING.md, paddingBottom: SPACING.sm },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: FONTS.sizes.xxxl, fontWeight: '700', color: COLORS.text },
  headerSubtitle: { fontSize: FONTS.sizes.sm, color: COLORS.textSecondary, marginTop: 2 },

  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    gap: SPACING.sm,
  },
  categoryButton: {
    paddingVertical: 7,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryButtonActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryText: { fontSize: FONTS.sizes.sm, fontWeight: '500', color: COLORS.textSecondary },
  categoryTextActive: { color: '#fff' },

  list: { flex: 1 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    gap: CARD_GAP,
  },

  card: {
    width: CARD_WIDTH,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  cardImage: { width: '100%', height: 120 },
  cardBody: { padding: 10 },
  cardName: { fontSize: 13, fontWeight: '700', color: COLORS.text },
  cardNameEn: { fontSize: 10, color: COLORS.textLight, marginTop: 1, marginBottom: 6 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  cardPrice: { fontSize: 14, fontWeight: '700', color: COLORS.primary },
  cardDuration: {
    backgroundColor: 'rgba(212,165,116,0.12)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  cardDurationText: { fontSize: 10, color: COLORS.primary, fontWeight: '500' },
  bookBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 7,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  bookBtnText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },
});
