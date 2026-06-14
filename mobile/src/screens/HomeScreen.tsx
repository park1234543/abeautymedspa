import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { SERVICES, DOCTORS } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Section */}
      <ImageBackground
        source={require('../../assets/images/hero-spa.jpg')}
        style={styles.heroContainer}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.heroGradient}
        >
          <View style={[styles.heroContent, { paddingTop: insets.top + 20 }]}>
            <Text style={styles.heroLogo}>A Beauty</Text>
            <Text style={styles.heroSubtitle}>MedSpa</Text>
            <Text style={styles.heroTitle}>
              당신의 아름다움을{'\n'}빛나게 합니다
            </Text>
            <TouchableOpacity
              style={styles.heroButton}
              onPress={() => navigation.navigate('Booking')}
              activeOpacity={0.8}
            >
              <Text style={styles.heroButtonText}>예약하기</Text>
              <Ionicons name="arrow-forward" size={20} color={COLORS.textWhite} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionText}>예약</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="call-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionText}>전화</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="location-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionText}>위치</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickActionItem}>
          <View style={styles.quickActionIcon}>
            <Ionicons name="chatbubble-outline" size={24} color={COLORS.primary} />
          </View>
          <Text style={styles.quickActionText}>상담</Text>
        </TouchableOpacity>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>인기 서비스</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>전체보기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScroll}
        >
          {SERVICES.slice(0, 4).map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: service.id })}
            >
              <Image source={service.image} style={styles.serviceImage} />
              <View style={styles.serviceContent}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceNameEn}>{service.nameEn}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Doctors Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>전문 의료진</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.doctorsScroll}
        >
          {DOCTORS.map((doctor) => (
            <View key={doctor.id} style={styles.doctorCard}>
              <Image source={doctor.image} style={styles.doctorImage} />
              <Text style={styles.doctorName}>{doctor.nameKo}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <Text style={styles.doctorExperience}>{doctor.experience} 경력</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>A Beauty MedSpa</Text>
        <Text style={styles.aboutDescription}>
          최첨단 의료 장비와 풍부한 경험을 갖춘 전문 의료진이 함께하는 프리미엄 메디스파입니다.
          고객 한 분 한 분께 맞춤형 서비스를 제공합니다.
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>년 경력</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>고객</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4.9</Text>
            <Text style={styles.statLabel}>평점</Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>지금 바로 상담 예약하세요</Text>
        <Text style={styles.ctaDescription}>
          전문 상담원이 친절히 안내해 드립니다
        </Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={() => navigation.navigate('Booking')}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>무료 상담 예약</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroContainer: {
    height: 450,
  },
  heroGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroContent: {
    padding: SPACING.lg,
  },
  heroLogo: {
    fontSize: 40,
    fontWeight: '300',
    color: COLORS.primary,
    letterSpacing: 4,
  },
  heroSubtitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '300',
    color: COLORS.textWhite,
    letterSpacing: 6,
    marginBottom: SPACING.md,
  },
  heroTitle: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '600',
    color: COLORS.textWhite,
    lineHeight: 34,
    marginBottom: SPACING.lg,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
    alignSelf: 'flex-start',
    gap: SPACING.sm,
  },
  heroButtonText: {
    color: COLORS.textWhite,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.card,
    marginTop: -20,
    marginHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    ...SHADOWS.medium,
  },
  quickActionItem: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryLight + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text,
    fontWeight: '500',
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
  },
  sectionLink: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.primary,
    fontWeight: '500',
  },
  servicesScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  serviceCard: {
    width: 180,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.small,
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceContent: {
    padding: SPACING.md,
  },
  serviceName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  serviceNameEn: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  servicePrice: {
    fontSize: FONTS.sizes.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  doctorsScroll: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  doctorCard: {
    width: 150,
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.small,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.sm,
  },
  doctorName: {
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  doctorSpecialty: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  doctorExperience: {
    fontSize: FONTS.sizes.xs,
    color: COLORS.primary,
    marginTop: 4,
  },
  aboutSection: {
    margin: SPACING.lg,
    padding: SPACING.lg,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    ...SHADOWS.small,
  },
  aboutTitle: {
    fontSize: FONTS.sizes.xl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  aboutDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.textSecondary,
  },
  ctaSection: {
    margin: SPACING.lg,
    padding: SPACING.xl,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: SPACING.xs,
  },
  ctaDescription: {
    fontSize: FONTS.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.lg,
  },
  ctaButton: {
    backgroundColor: COLORS.textWhite,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.md,
  },
  ctaButtonText: {
    color: COLORS.accent,
    fontSize: FONTS.sizes.md,
    fontWeight: '600',
  },
});
