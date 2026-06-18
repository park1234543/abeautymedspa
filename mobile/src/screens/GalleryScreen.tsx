import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageSelector } from '../components/LanguageSelector';

const { width } = Dimensions.get('window');
const GAP = 8;
const COL = 3;
const imageSize = (width - SPACING.lg * 2 - GAP * (COL - 1)) / COL;

const GALLERY_IMAGES = [
  { id: '1', category: 'botox', image: require('../../assets/images/treatment-1.jpg') },
  { id: '2', category: 'filler', image: require('../../assets/images/treatment-2.jpg') },
  { id: '3', category: 'laser', image: require('../../assets/images/service-laser.jpg') },
  { id: '4', category: 'skincare', image: require('../../assets/images/service-skincare.jpg') },
  { id: '5', category: 'botox', image: require('../../assets/images/spa-interior-1.jpg') },
  { id: '6', category: 'filler', image: require('../../assets/images/spa-interior-2.jpg') },
  { id: '7', category: 'laser', image: require('../../assets/images/hero-spa-2.jpg') },
  { id: '8', category: 'skincare', image: require('../../assets/images/hero-spa-3.jpg') },
  { id: '9', category: 'botox', image: require('../../assets/images/hero-spa-4.jpg') },
];

export function GalleryScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const { t } = useTranslation();

  const CATEGORIES = [
    { id: 'all', name: t('gallery', 'all') },
    { id: 'botox', name: t('gallery', 'botox') },
    { id: 'filler', name: t('gallery', 'filler') },
    { id: 'laser', name: t('gallery', 'laser') },
    { id: 'skincare', name: t('gallery', 'skincare') },
  ];

  const filteredImages = selectedCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === selectedCategory);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerTitle}>{t('gallery', 'title')}</Text>
            <Text style={styles.headerSubtitle}>{t('gallery', 'subtitle')}</Text>
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

      {/* 3-Column Grid */}
      <ScrollView
        style={styles.galleryContainer}
        contentContainerStyle={[styles.galleryGrid, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {filteredImages.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.galleryItem}
            onPress={() => setSelectedImage(item)}
            activeOpacity={0.85}
          >
            <Image source={item.image} style={styles.galleryImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Fullscreen Modal */}
      <Modal visible={!!selectedImage} transparent animationType="fade" onRequestClose={() => setSelectedImage(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={selectedImage.image} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>
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

  galleryContainer: { flex: 1, paddingHorizontal: SPACING.lg },
  galleryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
    paddingTop: SPACING.md,
  },
  galleryItem: {
    width: imageSize,
    height: imageSize,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  galleryImage: { width: '100%', height: '100%' },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: { width: width, height: width * 1.2 },
});
