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

const GOLD = '#D4A574';
const GOLD_LIGHT = 'rgba(212,165,116,0.15)';
const GOLD_BORDER = 'rgba(212,165,116,0.35)';

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── HERO ── */}
      <ImageBackground
        source={require('../../assets/images/hero-spa.jpg')}
        style={[styles.hero, { paddingTop: insets.top }]}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.18)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.82)']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top bar */}
        <View style={styles.heroTopBar}>
          <View>
            <Text style={styles.heroBrandEn}>A Beauty</Text>
            <Text style={styles.heroBrandSub}>M E D  S P A</Text>
          </View>
          <TouchableOpacity style={styles.heroTopBtn}>
            <Ionicons name="notifications-outline" size={22} color="rgba(255,255,255,0.8)" />
          </TouchableOpacity>
        </View>

        {/* Center copy */}
        <View style={styles.heroBody}>
          <View style={styles.heroDividerRow}>
            <View style={styles.heroDividerLine} />
            <Text style={styles.heroDividerText}>PREMIUM AESTHETIC</Text>
            <View style={styles.heroDividerLine} />
          </View>

          <Text style={styles.heroTitle}>당신의 아름다움을</Text>
          <Text style={styles.heroTitleAccent}>빛나게 합니다</Text>

          <Text style={styles.heroDesc}>
            board-certified specialists · advanced treatments
          </Text>
        </View>

        {/* Bottom CTA */}
        <View style={styles.heroBottom}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => navigation.navigate('Booking')}
            activeOpacity={0.85}
          >
            <Text style={styles.heroBtnText}>예약하기</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroStats}>
            {[['10K+','고객'],['4.9★','평점'],['15Y','경력']].map(([n,l]) => (
              <View key={l} style={styles.heroStatItem}>
                <Text style={styles.heroStatNum}>{n}</Text>
                <Text style={styles.heroStatLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>
      </ImageBackground>

      {/* ── QUICK ACTIONS ── */}
      <View style={styles.quickWrap}>
        <View style={styles.quickCard}>
          {[
            { icon: 'calendar-outline', label: '예약' },
            { icon: 'call-outline',     label: '전화' },
            { icon: 'location-outline', label: '위치' },
            { icon: 'chatbubble-outline', label: '상담' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.quickItem} activeOpacity={0.7}
              onPress={item.label === '예약' ? () => navigation.navigate('Booking') : undefined}
            >
              <View style={styles.quickIconBg}>
                <Ionicons name={item.icon as any} size={22} color={GOLD} />
              </View>
              <Text style={styles.quickLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── SERVICES ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionEyebrow}>OUR TREATMENTS</Text>
            <Text style={styles.sectionTitle}>인기 서비스</Text>
          </View>
          <TouchableOpacity style={styles.sectionMore}>
            <Text style={styles.sectionMoreText}>전체보기</Text>
            <Ionicons name="chevron-forward" size={14} color={GOLD} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
        >
          {SERVICES.slice(0, 5).map((svc) => (
            <TouchableOpacity
              key={svc.id}
              style={styles.svcCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: svc.id })}
            >
              <Image source={svc.image} style={styles.svcImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.72)']}
                style={styles.svcOverlay}
              />
              <View style={styles.svcContent}>
                <Text style={styles.svcNameEn}>{svc.nameEn.toUpperCase()}</Text>
                <Text style={styles.svcName}>{svc.name}</Text>
                <View style={styles.svcFooter}>
                  <Text style={styles.svcDuration}>{svc.duration}min</Text>
                  <Text style={styles.svcPrice}>${svc.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── DOCTORS ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionEyebrow}>MEET THE EXPERTS</Text>
            <Text style={styles.sectionTitle}>전문 의료진</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hScroll}
        >
          {DOCTORS.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <View style={styles.docImgWrap}>
                <Image source={doc.image} style={styles.docImage} />
                <View style={styles.docBadge}>
                  <Text style={styles.docBadgeText}>MD</Text>
                </View>
              </View>
              <Text style={styles.docName}>{doc.nameKo}</Text>
              <Text style={styles.docSpecialty}>{doc.specialty}</Text>
              <View style={styles.docExpRow}>
                <Ionicons name="ribbon-outline" size={12} color={GOLD} />
                <Text style={styles.docExp}>{doc.experience} 경력</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ── ABOUT BANNER ── */}
      <View style={styles.aboutWrap}>
        <LinearGradient
          colors={['#1a1208', '#2d1f0d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aboutCard}
        >
          <View style={styles.aboutTopLine} />
          <Text style={styles.aboutEyebrow}>ABOUT US</Text>
          <Text style={styles.aboutTitle}>A Beauty MedSpa</Text>
          <Text style={styles.aboutDesc}>
            최첨단 의료 장비와 풍부한 경험의 전문 의료진이 함께하는{'\n'}
            프리미엄 메디스파입니다.
          </Text>

          <View style={styles.aboutStats}>
            {[['15+','년 경력'],['10K+','고객'],['4.9','평점']].map(([n,l],i) => (
              <React.Fragment key={l}>
                {i > 0 && <View style={styles.aboutStatDiv} />}
                <View style={styles.aboutStatItem}>
                  <Text style={styles.aboutStatNum}>{n}</Text>
                  <Text style={styles.aboutStatLabel}>{l}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </LinearGradient>
      </View>

      {/* ── CTA ── */}
      <View style={styles.ctaWrap}>
        <TouchableOpacity
          style={styles.ctaBtn}
          onPress={() => navigation.navigate('Booking')}
          activeOpacity={0.85}
        >
          <Text style={styles.ctaBtnText}>무료 상담 예약하기</Text>
          <Ionicons name="arrow-forward-circle" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.ctaSub}>전문 상담원이 친절히 안내해 드립니다</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  /* HERO */
  hero: { height: 560, justifyContent: 'space-between' },
  heroTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 28,
    paddingTop: 16,
  },
  heroBrandEn: {
    fontSize: 22,
    fontWeight: '300',
    color: GOLD,
    letterSpacing: 4,
  },
  heroBrandSub: {
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 6,
    marginTop: 2,
  },
  heroTopBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  heroBody: { paddingHorizontal: 28, alignItems: 'flex-start' },
  heroDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  heroDividerLine: { flex: 1, height: 0.5, backgroundColor: GOLD_BORDER },
  heroDividerText: {
    fontSize: 9,
    letterSpacing: 3,
    color: GOLD,
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '200',
    color: '#fff',
    letterSpacing: 0.5,
    lineHeight: 42,
  },
  heroTitleAccent: {
    fontSize: 34,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 0.5,
    lineHeight: 44,
    marginBottom: 16,
  },
  heroDesc: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
  },

  heroBottom: { paddingHorizontal: 28, paddingBottom: 32 },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    backgroundColor: GOLD,
    paddingVertical: 13,
    paddingHorizontal: 28,
    borderRadius: RADIUS.full,
    marginBottom: 24,
  },
  heroBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  heroStats: { flexDirection: 'row', gap: 32 },
  heroStatItem: {},
  heroStatNum: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
  },
  heroStatLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    marginTop: 2,
  },

  /* QUICK */
  quickWrap: { paddingHorizontal: SPACING.lg, marginTop: -22 },
  quickCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    paddingVertical: 20,
    paddingHorizontal: 8,
    ...SHADOWS.medium,
    justifyContent: 'space-around',
  },
  quickItem: { alignItems: 'center', gap: 6, flex: 1 },
  quickIconBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: GOLD_LIGHT,
    borderWidth: 1,
    borderColor: GOLD_BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLabel: {
    fontSize: 12,
    color: COLORS.text,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  /* SECTION HEADER */
  section: { marginTop: 36 },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    marginBottom: 16,
  },
  sectionEyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: GOLD,
    fontWeight: '600',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: 0.3,
  },
  sectionMore: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  sectionMoreText: { fontSize: 12, color: GOLD, fontWeight: '500' },

  hScroll: { paddingHorizontal: SPACING.lg, gap: 14 },

  /* SERVICE CARD */
  svcCard: {
    width: 170,
    height: 230,
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  svcImage: { width: '100%', height: '100%', position: 'absolute' },
  svcOverlay: { ...StyleSheet.absoluteFillObject },
  svcContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
  },
  svcNameEn: {
    fontSize: 9,
    letterSpacing: 2,
    color: GOLD,
    fontWeight: '600',
    marginBottom: 2,
  },
  svcName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  svcFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  svcDuration: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  svcPrice: { fontSize: 15, fontWeight: '700', color: GOLD },

  /* DOCTOR CARD */
  docCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: RADIUS.lg,
    padding: 16,
    alignItems: 'center',
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  docImgWrap: { position: 'relative', marginBottom: 12 },
  docImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: GOLD_BORDER,
  },
  docBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: GOLD,
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  docBadgeText: { fontSize: 9, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  docName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    textAlign: 'center',
  },
  docSpecialty: {
    fontSize: 10,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 3,
    lineHeight: 14,
  },
  docExpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 6,
  },
  docExp: { fontSize: 10, color: GOLD, fontWeight: '600' },

  /* ABOUT */
  aboutWrap: { marginHorizontal: SPACING.lg, marginTop: 36 },
  aboutCard: {
    borderRadius: RADIUS.xl,
    padding: 28,
    overflow: 'hidden',
  },
  aboutTopLine: {
    width: 32,
    height: 2,
    backgroundColor: GOLD,
    marginBottom: 16,
  },
  aboutEyebrow: {
    fontSize: 9,
    letterSpacing: 3,
    color: GOLD,
    fontWeight: '600',
    marginBottom: 8,
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 12,
  },
  aboutDesc: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
    lineHeight: 22,
    marginBottom: 28,
  },
  aboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(212,165,116,0.25)',
  },
  aboutStatDiv: { width: 0.5, backgroundColor: 'rgba(212,165,116,0.25)' },
  aboutStatItem: { alignItems: 'center', flex: 1 },
  aboutStatNum: {
    fontSize: 22,
    fontWeight: '700',
    color: GOLD,
    letterSpacing: 0.5,
  },
  aboutStatLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.45)',
    marginTop: 4,
    letterSpacing: 0.5,
  },

  /* CTA */
  ctaWrap: {
    marginHorizontal: SPACING.lg,
    marginTop: 24,
    alignItems: 'center',
  },
  ctaBtn: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: GOLD,
    paddingVertical: 17,
    borderRadius: RADIUS.full,
    ...SHADOWS.medium,
    marginBottom: 10,
  },
  ctaBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  ctaSub: {
    fontSize: 12,
    color: COLORS.textLight,
    letterSpacing: 0.3,
  },
});
