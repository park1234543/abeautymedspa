import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { COLORS, FONTS, SPACING, RADIUS } from '../constants/theme';
import { useTranslation } from '../i18n/useTranslation';

const GOLD = '#D4A574';

export function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { language } = useTranslation();

  const content = PRIVACY_CONTENT[language as keyof typeof PRIVACY_CONTENT] || PRIVACY_CONTENT.ko;

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{content.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 32 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBadge}>
          <Ionicons name="shield-checkmark-outline" size={32} color={GOLD} />
          <Text style={styles.topBadgeText}>{content.subtitle}</Text>
        </View>

        <Text style={styles.effectiveDate}>{content.effectiveDate}</Text>

        {content.sections.map((section, i) => (
          <View key={i} style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionNum}>
                <Text style={styles.sectionNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
            <Text style={styles.sectionBody}>{section.body}</Text>
          </View>
        ))}

        <View style={styles.contactBox}>
          <Text style={styles.contactTitle}>{content.contactTitle}</Text>
          <Text style={styles.contactText}>{content.contactText}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const PRIVACY_CONTENT = {
  ko: {
    title: '개인정보처리방침',
    subtitle: '고객님의 개인정보를 소중히 보호합니다',
    effectiveDate: '시행일: 2025년 1월 1일',
    sections: [
      {
        title: '수집하는 개인정보',
        body: 'A Beauty Med Spa는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다.\n\n• 이름, 이메일 주소, 전화번호\n• 예약 정보 (선택 서비스, 날짜, 시간)\n• 기기 정보 및 앱 사용 데이터\n\n개인정보는 서비스 이용에 동의하신 범위 내에서만 수집됩니다.',
      },
      {
        title: '개인정보의 이용 목적',
        body: '수집된 개인정보는 다음 목적으로 이용됩니다.\n\n• 예약 접수 및 확인 서비스 제공\n• 고객 상담 및 문의 응대\n• 서비스 이용 안내 및 공지사항 전달\n• 서비스 품질 향상을 위한 분석\n\n수집 목적 외 용도로 이용하지 않습니다.',
      },
      {
        title: '개인정보의 보유 및 파기',
        body: '개인정보는 수집·이용 목적이 달성된 후 즉시 파기합니다.\n\n• 회원 정보: 회원 탈퇴 시 즉시 삭제\n• 예약 정보: 예약 완료 후 3년간 보관 (관련 법령에 따라)\n• 전자상거래 기록: 5년간 보관 (전자상거래법)\n\n파기 시 복구 불가능한 방법으로 처리합니다.',
      },
      {
        title: '개인정보의 제3자 제공',
        body: 'A Beauty Med Spa는 원칙적으로 고객의 개인정보를 외부에 제공하지 않습니다.\n\n단, 다음의 경우 예외입니다.\n• 고객이 사전에 동의한 경우\n• 법령의 규정에 의한 경우\n• 수사 목적으로 법령이 정한 절차에 따른 경우',
      },
      {
        title: '개인정보의 안전성 확보',
        body: '개인정보 보호를 위해 다음 조치를 취합니다.\n\n• 개인정보 암호화 저장 및 전송\n• 해킹 등 외부 침입 방지 시스템 운영\n• 개인정보 접근 권한 최소화\n• 직원 대상 개인정보 보호 교육 실시',
      },
      {
        title: '이용자의 권리',
        body: '고객은 언제든지 다음과 같은 권리를 행사하실 수 있습니다.\n\n• 개인정보 열람 요청\n• 개인정보 정정·삭제 요청\n• 개인정보 처리 정지 요청\n• 동의 철회\n\n위 권리 행사는 앱 내 설정 또는 이메일을 통해 가능합니다.',
      },
      {
        title: '쿠키 및 자동 수집 정보',
        body: '앱 이용 과정에서 다음 정보가 자동으로 수집될 수 있습니다.\n\n• 기기 고유 식별자\n• 앱 이용 기록 및 접속 로그\n• 서비스 이용 통계\n\n이 정보는 서비스 개선 목적으로만 활용됩니다.',
      },
      {
        title: '개인정보처리방침의 변경',
        body: '개인정보처리방침은 법령 또는 내부 정책 변경에 따라 수정될 수 있습니다. 변경 사항은 앱 내 공지를 통해 사전 고지합니다.\n\n중요한 변경 사항은 최소 7일 전 고지하며, 고객의 동의가 필요한 경우 별도로 안내드립니다.',
      },
    ],
    contactTitle: '개인정보 보호 책임자',
    contactText: '이메일: privacy@abeautyspa.com\n전화: 02-0000-0000\n주소: 서울시 강남구 A Beauty Med Spa',
  },
  en: {
    title: 'Privacy Policy',
    subtitle: 'We protect your personal information',
    effectiveDate: 'Effective Date: January 1, 2025',
    sections: [
      {
        title: 'Information We Collect',
        body: 'A Beauty Med Spa collects the following personal information to provide our services:\n\n• Name, email address, phone number\n• Booking information (selected service, date, time)\n• Device information and app usage data\n\nWe only collect information within the scope you have consented to.',
      },
      {
        title: 'How We Use Your Information',
        body: 'Collected information is used for the following purposes:\n\n• Providing booking acceptance and confirmation services\n• Customer consultation and inquiry responses\n• Service usage guidance and announcements\n• Analysis for service quality improvement\n\nWe do not use your information for purposes beyond what is stated.',
      },
      {
        title: 'Data Retention and Deletion',
        body: 'Personal information is deleted immediately after the purpose of collection is achieved:\n\n• Member information: Deleted immediately upon account deletion\n• Booking records: Retained for 3 years after completion (per applicable law)\n• E-commerce records: Retained for 5 years (per E-commerce Act)\n\nData is destroyed using methods that prevent recovery.',
      },
      {
        title: 'Sharing with Third Parties',
        body: 'A Beauty Med Spa does not share your personal information with third parties.\n\nExceptions include:\n• When you have given prior consent\n• When required by law or regulation\n• When required by law enforcement following legal procedures',
      },
      {
        title: 'Data Security',
        body: 'We take the following measures to protect your personal information:\n\n• Encryption of stored and transmitted data\n• Anti-hacking and intrusion prevention systems\n• Minimized access to personal information\n• Regular employee privacy training',
      },
      {
        title: 'Your Rights',
        body: 'You may exercise the following rights at any time:\n\n• Request access to your personal information\n• Request correction or deletion of your information\n• Request restriction of processing\n• Withdraw consent\n\nRights can be exercised through app settings or via email.',
      },
      {
        title: 'Cookies & Automatic Data Collection',
        body: 'The following information may be collected automatically:\n\n• Device unique identifiers\n• App usage history and access logs\n• Service usage statistics\n\nThis information is used only to improve our services.',
      },
      {
        title: 'Changes to This Policy',
        body: 'This Privacy Policy may be updated due to changes in law or internal policy. Changes will be announced through in-app notifications.\n\nMaterial changes will be notified at least 7 days in advance. Where your consent is required, we will notify you separately.',
      },
    ],
    contactTitle: 'Privacy Officer',
    contactText: 'Email: privacy@abeautyspa.com\nPhone: +82-2-0000-0000\nAddress: A Beauty Med Spa, Gangnam, Seoul',
  },
  es: {
    title: 'Política de Privacidad',
    subtitle: 'Protegemos su información personal',
    effectiveDate: 'Fecha de vigencia: 1 de enero de 2025',
    sections: [
      {
        title: 'Información que Recopilamos',
        body: 'A Beauty Med Spa recopila la siguiente información personal para brindar nuestros servicios:\n\n• Nombre, dirección de correo electrónico, número de teléfono\n• Información de reserva (servicio seleccionado, fecha, hora)\n• Información del dispositivo y datos de uso de la aplicación\n\nSolo recopilamos información dentro del alcance que usted ha consentido.',
      },
      {
        title: 'Cómo Usamos su Información',
        body: 'La información recopilada se usa para los siguientes propósitos:\n\n• Brindar servicios de aceptación y confirmación de reservas\n• Consultas y respuestas a preguntas de clientes\n• Orientación sobre el uso del servicio y anuncios\n• Análisis para mejorar la calidad del servicio',
      },
      {
        title: 'Retención y Eliminación de Datos',
        body: 'La información personal se elimina inmediatamente después de lograr el propósito:\n\n• Información de miembros: eliminada al cerrar cuenta\n• Registros de reservas: retenidos 3 años (según ley aplicable)\n• Registros de comercio electrónico: retenidos 5 años',
      },
      {
        title: 'Compartir con Terceros',
        body: 'A Beauty Med Spa no comparte su información personal con terceros, salvo:\n\n• Cuando usted ha dado consentimiento previo\n• Cuando lo requiere la ley\n• Cuando lo requieren las fuerzas del orden siguiendo procedimientos legales',
      },
      {
        title: 'Seguridad de Datos',
        body: 'Tomamos las siguientes medidas para proteger su información:\n\n• Cifrado de datos almacenados y transmitidos\n• Sistemas de prevención de intrusiones\n• Acceso mínimo a información personal\n• Capacitación regular en privacidad para empleados',
      },
      {
        title: 'Sus Derechos',
        body: 'Puede ejercer los siguientes derechos en cualquier momento:\n\n• Solicitar acceso a su información personal\n• Solicitar corrección o eliminación\n• Solicitar restricción del procesamiento\n• Retirar el consentimiento',
      },
      {
        title: 'Cookies y Recopilación Automática',
        body: 'La siguiente información puede recopilarse automáticamente:\n\n• Identificadores únicos del dispositivo\n• Historial de uso de la aplicación\n• Estadísticas de uso del servicio',
      },
      {
        title: 'Cambios en Esta Política',
        body: 'Esta Política de Privacidad puede actualizarse. Los cambios se anunciarán a través de notificaciones en la aplicación con al menos 7 días de anticipación.',
      },
    ],
    contactTitle: 'Responsable de Privacidad',
    contactText: 'Email: privacy@abeautyspa.com\nTeléfono: +82-2-0000-0000\nDirección: A Beauty Med Spa, Gangnam, Seúl',
  },
  zh: {
    title: '隐私政策',
    subtitle: '我们保护您的个人信息',
    effectiveDate: '生效日期：2025年1月1日',
    sections: [
      {
        title: '我们收集的信息',
        body: 'A Beauty Med Spa为提供服务而收集以下个人信息：\n\n• 姓名、电子邮件地址、电话号码\n• 预约信息（所选服务、日期、时间）\n• 设备信息和应用程序使用数据\n\n我们仅在您同意的范围内收集信息。',
      },
      {
        title: '信息使用方式',
        body: '收集的信息用于以下目的：\n\n• 提供预约受理和确认服务\n• 客户咨询和问题解答\n• 服务使用指南和公告\n• 服务质量改善分析',
      },
      {
        title: '数据保留和删除',
        body: '个人信息在达成收集目的后立即删除：\n\n• 会员信息：注销账户时立即删除\n• 预约记录：完成后保留3年（依适用法律）\n• 电子商务记录：保留5年',
      },
      {
        title: '第三方共享',
        body: 'A Beauty Med Spa原则上不向外部提供客户个人信息。\n\n例外情况：\n• 客户事先同意\n• 法律规定要求\n• 执法机构依法程序要求',
      },
      {
        title: '数据安全',
        body: '我们采取以下措施保护您的信息：\n\n• 数据存储和传输加密\n• 防黑客和入侵防护系统\n• 最小化个人信息访问权限\n• 定期员工隐私培训',
      },
      {
        title: '您的权利',
        body: '您可以随时行使以下权利：\n\n• 请求访问您的个人信息\n• 请求更正或删除信息\n• 请求限制处理\n• 撤回同意',
      },
      {
        title: 'Cookie和自动数据收集',
        body: '以下信息可能自动收集：\n\n• 设备唯一标识符\n• 应用使用历史和访问日志\n• 服务使用统计',
      },
      {
        title: '政策变更',
        body: '本隐私政策可能因法律或内部政策变更而更新。重要变更将提前至少7天通过应用内通知告知。',
      },
    ],
    contactTitle: '隐私保护负责人',
    contactText: '电子邮件：privacy@abeautyspa.com\n电话：+82-2-0000-0000\n地址：首尔江南区 A Beauty Med Spa',
  },
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: COLORS.text },
  scroll: { paddingHorizontal: SPACING.lg, paddingTop: 24 },
  topBadge: { alignItems: 'center', marginBottom: 20, gap: 12 },
  topBadgeText: { fontSize: 14, color: COLORS.textSecondary, textAlign: 'center' },
  effectiveDate: { fontSize: 12, color: COLORS.textLight, marginBottom: 28, textAlign: 'center' },
  section: {
    marginBottom: 24,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  sectionNum: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: GOLD, alignItems: 'center', justifyContent: 'center',
  },
  sectionNumText: { fontSize: 12, fontWeight: '700', color: '#fff' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: COLORS.text, flex: 1 },
  sectionBody: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 21 },
  contactBox: {
    backgroundColor: 'rgba(212,165,116,0.08)',
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: 'rgba(212,165,116,0.25)',
    padding: 20,
    marginTop: 8,
  },
  contactTitle: { fontSize: 14, fontWeight: '700', color: GOLD, marginBottom: 8 },
  contactText: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 22 },
});
