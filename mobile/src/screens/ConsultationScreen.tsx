import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';

const GOLD = '#C9A96E';
const GOLD_LIGHT = 'rgba(201,169,110,0.1)';
const GOLD_BORDER = 'rgba(201,169,110,0.3)';

const TREATMENTS = [
  { ko: '페이셜', en: 'Facial', es: 'Facial', zh: '面部护理' },
  { ko: '마사지', en: 'Massage', es: 'Masaje', zh: '按摩' },
  { ko: '스킨케어', en: 'Skincare', es: 'Cuidado de Piel', zh: '护肤' },
  { ko: '네일 케어', en: 'Nail Care', es: 'Cuidado de Uñas', zh: '美甲护理' },
  { ko: '바디 케어', en: 'Body Care', es: 'Cuidado Corporal', zh: '身体护理' },
  { ko: '기타 / 모르겠음', en: 'Other / Not Sure', es: 'Otro / No Sé', zh: '其他 / 不确定' },
];

type Lang = 'ko' | 'en' | 'es' | 'zh';

export function ConsultationScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { t, language } = useTranslation();
  const lang = language as Lang;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const tx = {
    title: { ko: '예약 문의', en: 'Booking Inquiry', es: 'Consulta de Reserva', zh: '预约咨询' },
    subtitle: { ko: '담당자가 빠르게 연락드립니다', en: 'Our team will contact you shortly', es: 'Nuestro equipo se pondrá en contacto', zh: '我们的团队将尽快与您联系' },
    nameLabel: { ko: '이름', en: 'Name', es: 'Nombre', zh: '姓名' },
    namePlaceholder: { ko: '성함을 입력해 주세요', en: 'Enter your name', es: 'Ingresa tu nombre', zh: '请输入您的姓名' },
    phoneLabel: { ko: '연락처', en: 'Phone', es: 'Teléfono', zh: '电话' },
    phonePlaceholder: { ko: '전화번호를 입력해 주세요', en: 'Enter your phone number', es: 'Ingresa tu teléfono', zh: '请输入您的电话号码' },
    treatmentLabel: { ko: '관심 서비스', en: 'Service Interest', es: 'Servicio de Interés', zh: '感兴趣的服务' },
    messageLabel: { ko: '문의 내용', en: 'Message', es: 'Mensaje', zh: '咨询内容' },
    messagePlaceholder: { ko: '궁금하신 내용을 자유롭게 작성해 주세요', en: 'Tell us what you\'d like to know', es: 'Cuéntanos lo que quieres saber', zh: '请告诉我们您想了解的内容' },
    submit: { ko: '문의 신청하기', en: 'Submit Inquiry', es: 'Enviar Consulta', zh: '提交咨询' },
    successTitle: { ko: '문의 신청 완료!', en: 'Inquiry Submitted!', es: '¡Consulta Enviada!', zh: '咨询已提交！' },
    successMsg: { ko: '빠른 시일 내에 연락드리겠습니다.\n감사합니다 😊', en: 'We\'ll reach out to you soon.\nThank you 😊', es: 'Nos pondremos en contacto pronto.\n¡Gracias 😊', zh: '我们将尽快与您联系。\n感谢您 😊' },
    backHome: { ko: '홈으로 돌아가기', en: 'Back to Home', es: 'Volver al Inicio', zh: '返回首页' },
    required: { ko: '이름과 연락처를 입력해 주세요', en: 'Please enter your name and phone', es: 'Por favor ingresa tu nombre y teléfono', zh: '请输入姓名和电话' },
    infoBox: { ko: '문의 시간: 월-금 09:00 – 18:00\n주말 및 공휴일은 다음 영업일 회신', en: 'Hours: Mon-Fri 09:00 – 18:00\nWeekend inquiries replied next business day', es: 'Horario: Lun-Vie 09:00 – 18:00\nConsultas de fin de semana respondidas el próximo día hábil', zh: '咨询时间：周一至周五 09:00 – 18:00\n周末咨询将在下一个工作日回复' },
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('', tx.required[lang]);
      return;
    }
    setLoading(true);
    try {
      const subject = encodeURIComponent(`[A Beauty Spa] 상담 신청 - ${name}`);
      const body = encodeURIComponent(
        `이름: ${name}\n연락처: ${phone}\n관심 서비스: ${selectedTreatment || '미선택'}\n\n문의 내용:\n${message || '(없음)'}\n\n---\nA Beauty Spa 앱을 통한 상담 신청`
      );
      const mailUrl = `mailto:ys523333@naver.com?subject=${subject}&body=${body}`;
      const canOpen = await Linking.canOpenURL(mailUrl);
      if (canOpen) {
        await Linking.openURL(mailUrl);
        setSubmitted(true);
      } else {
        setSubmitted(true);
      }
    } catch (_) {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <View style={[styles.successWrap, { paddingTop: insets.top + 60 }]}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={72} color={GOLD} />
        </View>
        <Text style={styles.successTitle}>{tx.successTitle[lang]}</Text>
        <Text style={styles.successMsg}>{tx.successMsg[lang]}</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.85}>
          <Ionicons name="home-outline" size={18} color="#fff" />
          <Text style={styles.backBtnText}>{tx.backHome[lang]}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
          <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.eyebrow}>CONSULTATION</Text>
            <Text style={styles.headerTitle}>{tx.title[lang]}</Text>
          </View>
        </View>

        {/* Subtitle */}
        <View style={styles.subtitleWrap}>
          <Ionicons name="chatbubble-ellipses-outline" size={16} color={GOLD} />
          <Text style={styles.subtitle}>{tx.subtitle[lang]}</Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Ionicons name="time-outline" size={16} color={GOLD} />
          <Text style={styles.infoText}>{tx.infoBox[lang]}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>

          {/* Name */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{tx.nameLabel[lang]} *</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={18} color={GOLD} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={tx.namePlaceholder[lang]}
                placeholderTextColor={COLORS.textLight}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{tx.phoneLabel[lang]} *</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="call-outline" size={18} color={GOLD} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder={tx.phonePlaceholder[lang]}
                placeholderTextColor={COLORS.textLight}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                returnKeyType="next"
              />
            </View>
          </View>

          {/* Treatment */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{tx.treatmentLabel[lang]}</Text>
            <View style={styles.tagsWrap}>
              {TREATMENTS.map((t) => {
                const label = t[lang];
                const active = selectedTreatment === label;
                return (
                  <TouchableOpacity
                    key={label}
                    style={[styles.tag, active && styles.tagActive]}
                    onPress={() => setSelectedTreatment(active ? '' : label)}
                    activeOpacity={0.75}
                  >
                    <Text style={[styles.tagText, active && styles.tagTextActive]}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Message */}
          <View style={styles.fieldWrap}>
            <Text style={styles.fieldLabel}>{tx.messageLabel[lang]}</Text>
            <View style={[styles.inputWrap, styles.textareaWrap]}>
              <TextInput
                style={[styles.input, styles.textarea]}
                placeholder={tx.messagePlaceholder[lang]}
                placeholderTextColor={COLORS.textLight}
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && { opacity: 0.7 }]}
            onPress={handleSubmit}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading
              ? <Ionicons name="hourglass-outline" size={20} color="#fff" />
              : <Ionicons name="send-outline" size={18} color="#fff" />
            }
            <Text style={styles.submitBtnText}>{tx.submit[lang]}</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 12, gap: 12 },
  backIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center' },
  headerTitleWrap: {},
  eyebrow: { fontSize: 9, letterSpacing: 3, color: GOLD, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '700', color: COLORS.text, letterSpacing: 0.3 },
  subtitleWrap: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, marginBottom: 16 },
  subtitle: { fontSize: 13, color: COLORS.textSecondary },
  infoBox: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginHorizontal: 20, backgroundColor: GOLD_LIGHT, borderWidth: 1, borderColor: GOLD_BORDER, borderRadius: RADIUS.md, padding: 14, marginBottom: 28 },
  infoText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, flex: 1 },
  form: { paddingHorizontal: 20, gap: 22 },
  fieldWrap: { gap: 8 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: COLORS.text, letterSpacing: 0.3 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderColor: '#E8E0D8', borderRadius: RADIUS.md, backgroundColor: '#FAFAFA', paddingHorizontal: 14 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: COLORS.text, paddingVertical: 14 },
  textareaWrap: { alignItems: 'flex-start', paddingTop: 14 },
  textarea: { minHeight: 100, paddingVertical: 0 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: RADIUS.full, borderWidth: 1.5, borderColor: '#E8E0D8', backgroundColor: '#FAFAFA' },
  tagActive: { backgroundColor: GOLD, borderColor: GOLD },
  tagText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  tagTextActive: { color: '#fff', fontWeight: '700' },
  submitBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, backgroundColor: GOLD, paddingVertical: 17, borderRadius: RADIUS.full, ...SHADOWS.medium, marginTop: 8 },
  submitBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
  successWrap: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', paddingHorizontal: 40 },
  successIcon: { marginBottom: 24 },
  successTitle: { fontSize: 26, fontWeight: '700', color: COLORS.text, marginBottom: 12, textAlign: 'center' },
  successMsg: { fontSize: 15, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 24, marginBottom: 48 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: GOLD, paddingHorizontal: 32, paddingVertical: 15, borderRadius: RADIUS.full, ...SHADOWS.medium },
  backBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
});
