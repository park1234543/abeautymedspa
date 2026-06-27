import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  Animated,
  Linking,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation/RootNavigator';
import { SERVICES, DOCTORS, getServiceName, getDoctorName, getDoctorSpecialty, LangKey } from '../constants/api';
import { COLORS, FONTS, SPACING, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';
import { LanguageSelector } from '../components/LanguageSelector';

const { width } = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const GOLD = '#D4A574';
const GOLD_LIGHT = 'rgba(212,165,116,0.15)';
const GOLD_BORDER = 'rgba(212,165,116,0.35)';

const GALLERY_ITEMS = [
  { id: '1', image: require('../../assets/images/treatment-1.jpg'),    label: 'Facial' },
  { id: '2', image: require('../../assets/images/service-skincare.jpg'), label: 'Skincare' },
  { id: '3', image: require('../../assets/images/service-filler.jpg'),  label: 'Massage' },
  { id: '4', image: require('../../assets/images/service-laser.jpg'),   label: 'Nail Care' },
  { id: '5', image: require('../../assets/images/spa-interior-1.jpg'),  label: 'Spa' },
  { id: '6', image: require('../../assets/images/treatment-2.jpg'),     label: 'Body Care' },
];

const REVIEWS = [
  {
    id: '1', name: '김지현', rating: 5, date: '2025.05',
    service: 'Facial',
    text: {
      ko: '페이셜 후 피부가 정말 환해졌어요! 전문 스태프 분들이 꼼꼼하게 설명해주셔서 너무 좋았습니다.',
      en: 'My skin glowed after the facial! The specialists explained everything thoroughly.',
      es: '¡Mi piel brilló tras el facial! Los especialistas explicaron todo detalladamente.',
      zh: '护理后皮肤真的亮了！专家们解释得非常详细。',
    },
  },
  {
    id: '2', name: 'Sarah M.', rating: 5, date: '2025.04',
    service: 'Massage',
    text: {
      ko: '마사지가 기대 이상이었어요. 완전히 릴렉스가 됐습니다.',
      en: 'The massage exceeded my expectations. I was completely relaxed.',
      es: 'El masaje superó mis expectativas. Me relajé completamente.',
      zh: '按摩效果超出预期，整个人完全放松了。',
    },
  },
  {
    id: '3', name: '이수진', rating: 5, date: '2025.04',
    service: 'Skincare',
    text: {
      ko: '스킨케어 받고 피부가 완전히 달라졌어요. 직원분들도 너무 친절합니다.',
      en: 'My skin changed completely after skincare. The staff is incredibly kind.',
      es: 'Mi piel cambió completamente tras el skincare. El personal es muy amable.',
      zh: '护肤后皮肤焕然一新，工作人员非常亲切。',
    },
  },
  {
    id: '4', name: 'Michael K.', rating: 4, date: '2025.03',
    service: 'Skincare',
    text: {
      ko: '스킨케어 패키지가 가성비 최고예요. 다음 달에 또 방문할 예정입니다.',
      en: 'Best value skincare package. Planning to visit again next month!',
      es: 'El mejor paquete de skincare calidad-precio. ¡Planeo volver el mes que viene!',
      zh: '护肤套餐性价比超高，下个月还会再来！',
    },
  },
  {
    id: '5', name: '박민서', rating: 5, date: '2025.03',
    service: 'Body Care',
    text: {
      ko: '바디 케어 후 몸이 정말 가벼워졌어요. 확실히 효과가 있습니다!',
      en: 'My body felt so light after body care. It definitely works!',
      es: 'Mi cuerpo se sintió muy ligero después del cuidado corporal. ¡Definitivamente funciona!',
      zh: '身体护理后感觉轻盈多了，效果非常明显！',
    },
  },
];

const HERO_IMAGES = [
  require('../../assets/images/treatment-1.jpg'),
  require('../../assets/images/service-skincare.jpg'),
  require('../../assets/images/spa-interior-2.jpg'),
  require('../../assets/images/treatment-2.jpg'),
  require('../../assets/images/service-laser.jpg'),
  require('../../assets/images/spa-interior-1.jpg'),
];

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { t, language } = useTranslation();

  const [slideIdx, setSlideIdx] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const galleryAnim = useRef(new Animated.Value(0)).current;

  const CARD_WIDTH = 160 + 14; // width + gap
  const LOOP_WIDTH = CARD_WIDTH * GALLERY_ITEMS.length;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(galleryAnim, {
        toValue: -LOOP_WIDTH,
        duration: LOOP_WIDTH * 18,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start(() => {
        setSlideIdx(i => (i + 1) % HERO_IMAGES.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }).start();
      });
    }, 4000);
    return () => clearInterval(timer);
  }, [fadeAnim]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* ── HERO ── */}
      <View style={[styles.hero, { paddingTop: insets.top }]}>
        <Animated.Image
          source={HERO_IMAGES[slideIdx]}
          style={[StyleSheet.absoluteFillObject, { opacity: fadeAnim }]}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.18)', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.82)']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.heroTopBar}>
          <View>
            <Text style={styles.heroBrandEn}>A Beauty</Text>
            <Text style={styles.heroBrandSub}>P R E M I U M  S P A</Text>
          </View>
          <View style={styles.heroTopRight}>
            <LanguageSelector tint="light" />
            <TouchableOpacity style={styles.heroTopBtn}>
              <Ionicons name="notifications-outline" size={22} color="rgba(255,255,255,0.8)" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroBody}>
          <View style={styles.heroDividerRow}>
            <View style={styles.heroDividerLine} />
            <Text style={styles.heroDividerText}>{t('home', 'premiumAesthetic')}</Text>
            <View style={styles.heroDividerLine} />
          </View>

          <Text style={styles.heroTitle}>
            {t('home', 'headline1')}{'\n'}
            <Text style={styles.heroTitleAccent}>{t('home', 'headline2')}</Text>
          </Text>

          <Text style={styles.heroDesc}>{t('home', 'heroDesc')}</Text>
        </View>

        <View style={styles.heroBottom}>
          <TouchableOpacity
            style={styles.heroBtn}
            onPress={() => navigation.navigate('Booking')}
            activeOpacity={0.85}
          >
            <Text style={styles.heroBtnText}>{t('home', 'bookNow')}</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </TouchableOpacity>

          <View style={styles.heroStats}>
            {[
              ['10K+', t('home', 'customers')],
              ['4.9★', t('home', 'rating')],
              ['15Y', t('home', 'experience')],
            ].map(([n, l]) => (
              <View key={l} style={styles.heroStatItem}>
                <Text style={styles.heroStatNum}>{n}</Text>
                <Text style={styles.heroStatLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 슬라이드 도트 */}
        <View style={styles.heroDots}>
          {HERO_IMAGES.map((_, i) => (
            <View key={i} style={[styles.heroDot, i === slideIdx && styles.heroDotActive]} />
          ))}
        </View>
      </View>

      {/* ── QUICK ACTIONS ── */}
      <View style={styles.quickWrap}>
        <View style={styles.quickCard}>
          {([
            {
              icon: 'calendar-outline',
              label: t('home', 'quickBook'),
              onPress: () => navigation.navigate('Booking'),
            },
            {
              icon: 'call-outline',
              label: t('home', 'quickCall'),
              onPress: () => Linking.openURL('tel:5516552426'),
            },
            {
              icon: 'location-outline',
              label: t('home', 'quickLocation'),
              onPress: () => Linking.openURL('https://maps.google.com/?q=16321+Main+St,+Chino,+CA+91708'),
            },
            {
              icon: 'chatbubble-outline',
              label: t('home', 'quickConsult'),
              onPress: () => navigation.navigate('Consultation'),
            },
          ] as const).map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.quickItem}
              activeOpacity={0.7}
              onPress={item.onPress}
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
            <Text style={styles.sectionEyebrow}>{t('home', 'ourTreatments')}</Text>
            <Text style={styles.sectionTitle}>{t('home', 'popularServices')}</Text>
          </View>
          <TouchableOpacity style={styles.sectionMore}>
            <Text style={styles.sectionMoreText}>{t('home', 'viewAll')}</Text>
            <Ionicons name="chevron-forward" size={14} color={GOLD} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {SERVICES.slice(0, 5).map((svc) => (
            <TouchableOpacity
              key={svc.id}
              style={styles.svcCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ServiceDetail', { serviceId: svc.id })}
            >
              <Image source={svc.image} style={styles.svcImage} />
              <LinearGradient colors={['transparent', 'rgba(0,0,0,0.72)']} style={styles.svcOverlay} />
              <View style={styles.svcContent}>
                <Text style={styles.svcName}>{getServiceName(svc, language as LangKey)}</Text>
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
            <Text style={styles.sectionEyebrow}>{t('home', 'meetExperts')}</Text>
            <Text style={styles.sectionTitle}>{t('home', 'ourDoctors')}</Text>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {DOCTORS.map((doc) => (
            <View key={doc.id} style={styles.docCard}>
              <Image source={doc.image} style={styles.docCardImage} />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.78)']}
                style={StyleSheet.absoluteFillObject}
              />
              <View style={styles.docBadge}>
                <Text style={styles.docBadgeText}>MD</Text>
              </View>
              <View style={styles.docContent}>
                <Text style={styles.docName}>{getDoctorName(doc, language as LangKey)}</Text>
                <Text style={styles.docSpecialty}>{getDoctorSpecialty(doc, language as LangKey)}</Text>
                <View style={styles.docExpRow}>
                  <Ionicons name="ribbon-outline" size={11} color={GOLD} />
                  <Text style={styles.docExp}>{doc.experience} {t('home', 'career')}</Text>
                </View>
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
          <Text style={styles.aboutEyebrow}>{t('home', 'aboutUs')}</Text>
          <Text style={styles.aboutTitle}>{t('home', 'aboutTitle')}</Text>
          <Text style={styles.aboutDesc}>{t('home', 'aboutDesc')}</Text>

          <View style={styles.aboutStats}>
            {[
              ['15+', t('home', 'yearsExp')],
              ['10K+', t('home', 'customers')],
              ['4.9', t('home', 'rating')],
            ].map(([n, l], i) => (
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

      {/* ── GALLERY ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionEyebrow}>{t('home', 'ourGallery')}</Text>
            <Text style={styles.sectionTitle}>{t('home', 'galleryTitle')}</Text>
          </View>
          <TouchableOpacity style={styles.sectionMore} onPress={() => navigation.navigate('Gallery')}>
            <Text style={styles.sectionMoreText}>{t('home', 'viewAll')}</Text>
            <Ionicons name="chevron-forward" size={14} color={GOLD} />
          </TouchableOpacity>
        </View>
        <View style={styles.galleryStrip}>
          <Animated.View
            style={[styles.galleryRow, { transform: [{ translateX: galleryAnim }] }]}
          >
            {[...GALLERY_ITEMS, ...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, idx) => (
              <TouchableOpacity
                key={`${item.id}-${idx}`}
                style={styles.galleryCard}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Gallery')}
              >
                <Image source={item.image} style={styles.galleryCardImage} />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.65)']} style={styles.galleryOverlay} />
                <View style={styles.galleryLabel}>
                  <Text style={styles.galleryLabelText}>{item.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>
      </View>

      {/* ── REVIEWS ── */}
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <View>
            <Text style={styles.sectionEyebrow}>{t('home', 'ourReviews')}</Text>
            <Text style={styles.sectionTitle}>{t('home', 'reviewsTitle')}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={13} color={GOLD} />
            <Text style={styles.ratingBadgeText}>4.9</Text>
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {REVIEWS.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Text style={styles.reviewAvatarText}>{review.name[0]}</Text>
                </View>
                <View style={styles.reviewHeaderInfo}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewService}>{review.service}</Text>
                </View>
              </View>
              <View style={styles.reviewStars}>
                {[1,2,3,4,5].map(i => (
                  <Ionicons key={i} name="star" size={12} color={i <= review.rating ? GOLD : '#ddd'} />
                ))}
              </View>
              <Text style={styles.reviewText}>{review.text[language as 'ko'|'en'|'es'|'zh'] ?? review.text.ko}</Text>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ── CTA / CONSULTATION BANNER ── */}
      <View style={styles.ctaWrap}>
        <LinearGradient
          colors={['#1A1209', '#2C1F0A', '#1A1209']}
          style={styles.ctaBanner}
        >
          <View style={styles.ctaBannerDeco}>
            <Ionicons name="sparkles" size={48} color="rgba(201,169,110,0.12)" />
          </View>
          <Text style={styles.ctaBannerEyebrow}>FREE CONSULTATION</Text>
          <Text style={styles.ctaBannerTitle}>{t('home', 'ctaBtn')}</Text>
          <Text style={styles.ctaBannerSub}>{t('home', 'ctaSub')}</Text>

          <View style={styles.ctaBannerBtns}>
            <TouchableOpacity
              style={styles.ctaPrimary}
              onPress={() => navigation.navigate('Consultation')}
              activeOpacity={0.85}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#fff" />
              <Text style={styles.ctaPrimaryText}>{t('home', 'quickConsult')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ctaSecondary}
              onPress={() => navigation.navigate('Booking')}
              activeOpacity={0.85}
            >
              <Ionicons name="calendar-outline" size={18} color={GOLD} />
              <Text style={styles.ctaSecondaryText}>{t('home', 'quickBook')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.ctaContactRow}>
            <TouchableOpacity style={styles.ctaContact} onPress={() => Linking.openURL('tel:5516552426')} activeOpacity={0.7}>
              <Ionicons name="call-outline" size={14} color="rgba(201,169,110,0.7)" />
              <Text style={styles.ctaContactText}>(551) 655-2426</Text>
            </TouchableOpacity>
            <View style={styles.ctaContactDot} />
            <TouchableOpacity style={styles.ctaContact} onPress={() => Linking.openURL('https://maps.google.com/?q=16321+Main+St,+Chino,+CA+91708')} activeOpacity={0.7}>
              <Ionicons name="location-outline" size={14} color="rgba(201,169,110,0.7)" />
              <Text style={styles.ctaContactText}>Chino, CA 91708</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { height: 560, justifyContent: 'space-between', overflow: 'hidden' },
  heroDots: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, paddingBottom: 14 },
  heroDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' },
  heroDotActive: { width: 18, backgroundColor: GOLD },
  heroTopBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, paddingTop: 16 },
  heroTopRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroBrandEn: { fontSize: 22, fontWeight: '300', color: GOLD, letterSpacing: 4 },
  heroBrandSub: { fontSize: 10, fontWeight: '400', color: 'rgba(255,255,255,0.55)', letterSpacing: 6, marginTop: 2 },
  heroTopBtn: { width: 38, height: 38, borderRadius: 19, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', justifyContent: 'center', alignItems: 'center' },
  heroBody: { paddingHorizontal: 28, width: '100%' },
  heroDividerRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 20 },
  heroDividerLine: { flex: 1, height: 0.5, backgroundColor: GOLD_BORDER },
  heroDividerText: { fontSize: 9, letterSpacing: 3, color: GOLD, fontWeight: '500', marginHorizontal: 10 },
  heroTitle: { fontSize: 30, fontWeight: '300', color: '#fff', letterSpacing: 0.3, lineHeight: 40 },
  heroTitleAccent: { fontSize: 30, fontWeight: '700', color: GOLD, letterSpacing: 0.3, lineHeight: 40 },
  heroDesc: { fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.8, marginTop: 8 },
  heroBottom: { paddingHorizontal: 28, paddingBottom: 32 },
  heroBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, alignSelf: 'flex-start', backgroundColor: GOLD, paddingVertical: 13, paddingHorizontal: 28, borderRadius: RADIUS.full, marginBottom: 24 },
  heroBtnText: { color: '#fff', fontSize: 14, fontWeight: '600', letterSpacing: 1 },
  heroStats: { flexDirection: 'row', gap: 32 },
  heroStatItem: {},
  heroStatNum: { fontSize: 18, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  heroStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, marginTop: 2 },
  quickWrap: { paddingHorizontal: SPACING.lg, marginTop: -22 },
  quickCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: RADIUS.lg, paddingVertical: 20, paddingHorizontal: 8, ...SHADOWS.medium, justifyContent: 'space-around' },
  quickItem: { alignItems: 'center', gap: 6, flex: 1 },
  quickIconBg: { width: 50, height: 50, borderRadius: 25, backgroundColor: GOLD_LIGHT, borderWidth: 1, borderColor: GOLD_BORDER, justifyContent: 'center', alignItems: 'center' },
  quickLabel: { fontSize: 12, color: COLORS.text, fontWeight: '500', letterSpacing: 0.3 },
  section: { marginTop: 36 },
  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: SPACING.lg, marginBottom: 16 },
  sectionEyebrow: { fontSize: 9, letterSpacing: 3, color: GOLD, fontWeight: '600', marginBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: COLORS.text, letterSpacing: 0.3 },
  sectionMore: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  sectionMoreText: { fontSize: 12, color: GOLD, fontWeight: '500' },
  hScroll: { paddingHorizontal: SPACING.lg, gap: 14 },
  svcCard: { width: 170, height: 230, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.medium },
  svcImage: { width: '100%', height: '100%', position: 'absolute' },
  svcOverlay: { ...StyleSheet.absoluteFillObject },
  svcContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  svcNameEn: { fontSize: 9, letterSpacing: 2, color: GOLD, fontWeight: '600', marginBottom: 2 },
  svcName: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 8 },
  svcFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  svcDuration: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  svcPrice: { fontSize: 15, fontWeight: '700', color: GOLD },
  docCard: { width: 170, height: 230, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.medium },
  docCardImage: { width: '100%', height: '100%', position: 'absolute' },
  docBadge: { position: 'absolute', top: 12, right: 12, backgroundColor: GOLD, borderRadius: 8, paddingHorizontal: 7, paddingVertical: 3 },
  docBadgeText: { fontSize: 9, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  docContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  docName: { fontSize: 15, fontWeight: '700', color: '#fff' },
  docSpecialty: { fontSize: 10, color: 'rgba(255,255,255,0.75)', marginTop: 3, lineHeight: 14 },
  docExpRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 7 },
  docExp: { fontSize: 10, color: GOLD, fontWeight: '600' },
  aboutWrap: { marginHorizontal: SPACING.lg, marginTop: 36 },
  aboutCard: { borderRadius: RADIUS.xl, padding: 28, overflow: 'hidden' },
  aboutTopLine: { width: 32, height: 2, backgroundColor: GOLD, marginBottom: 16 },
  aboutEyebrow: { fontSize: 9, letterSpacing: 3, color: GOLD, fontWeight: '600', marginBottom: 8 },
  aboutTitle: { fontSize: 22, fontWeight: '300', color: '#fff', letterSpacing: 2, marginBottom: 12 },
  aboutDesc: { fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 22, marginBottom: 28 },
  aboutStats: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 20, borderTopWidth: 0.5, borderTopColor: 'rgba(212,165,116,0.25)' },
  aboutStatDiv: { width: 0.5, backgroundColor: 'rgba(212,165,116,0.25)' },
  aboutStatItem: { alignItems: 'center', flex: 1 },
  aboutStatNum: { fontSize: 22, fontWeight: '700', color: GOLD, letterSpacing: 0.5 },
  aboutStatLabel: { fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4, letterSpacing: 0.5 },
  galleryStrip: { overflow: 'hidden', paddingLeft: SPACING.lg },
  galleryRow: { flexDirection: 'row', gap: 14 },
  galleryCard: { width: 160, height: 220, borderRadius: RADIUS.lg, overflow: 'hidden', ...SHADOWS.medium },
  galleryCardImage: { width: '100%', height: '100%', position: 'absolute' },
  galleryOverlay: { ...StyleSheet.absoluteFillObject },
  galleryLabel: { position: 'absolute', bottom: 12, left: 12 },
  galleryLabelText: { fontSize: 13, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },

  ratingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: GOLD_LIGHT, borderWidth: 1, borderColor: GOLD_BORDER, borderRadius: RADIUS.full, paddingHorizontal: 10, paddingVertical: 4 },
  ratingBadgeText: { fontSize: 13, fontWeight: '700', color: GOLD },

  reviewCard: { width: 240, backgroundColor: '#fff', borderRadius: RADIUS.lg, padding: 18, ...SHADOWS.medium, borderWidth: 1, borderColor: 'rgba(212,165,116,0.15)', gap: 8 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: GOLD, justifyContent: 'center', alignItems: 'center' },
  reviewAvatarText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  reviewHeaderInfo: { flex: 1 },
  reviewName: { fontSize: 14, fontWeight: '700', color: COLORS.text },
  reviewService: { fontSize: 11, color: COLORS.textLight, marginTop: 1 },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 20, flex: 1 },
  reviewDate: { fontSize: 11, color: COLORS.textLight, alignSelf: 'flex-end' },

  ctaWrap: { marginHorizontal: SPACING.lg, marginTop: 36, marginBottom: 8 },
  ctaBanner: { borderRadius: RADIUS.xl, padding: 28, overflow: 'hidden', gap: 0 },
  ctaBannerDeco: { position: 'absolute', right: 20, top: 20 },
  ctaBannerEyebrow: { fontSize: 9, letterSpacing: 4, color: GOLD, fontWeight: '600', marginBottom: 8 },
  ctaBannerTitle: { fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: 0.3, marginBottom: 8 },
  ctaBannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 0.5, marginBottom: 24 },
  ctaBannerBtns: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  ctaPrimary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: GOLD, paddingVertical: 14, borderRadius: RADIUS.full },
  ctaPrimaryText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  ctaSecondary: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderWidth: 1.5, borderColor: GOLD_BORDER, paddingVertical: 14, borderRadius: RADIUS.full },
  ctaSecondaryText: { color: GOLD, fontSize: 14, fontWeight: '700' },
  ctaContactRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  ctaContact: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  ctaContactText: { fontSize: 12, color: 'rgba(201,169,110,0.7)', fontWeight: '500' },
  ctaContactDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: 'rgba(201,169,110,0.3)' },
});
