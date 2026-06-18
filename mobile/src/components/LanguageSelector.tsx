import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useLanguageStore } from '../store/languageStore';
import { Language, LANGUAGE_FLAGS, LANGUAGE_NAMES } from '../i18n/translations';
import { COLORS, RADIUS, SHADOWS } from '../constants/theme';

const LANGUAGES: Language[] = ['ko', 'en', 'es', 'zh'];

interface Props {
  tint?: 'light' | 'dark';
}

export function LanguageSelector({ tint = 'dark' }: Props) {
  const { language, setLanguage } = useLanguageStore();
  const [visible, setVisible] = useState(false);

  const isLight = tint === 'light';
  const btnBg = isLight ? 'rgba(255,255,255,0.18)' : 'rgba(212,165,116,0.12)';
  const btnBorder = isLight ? 'rgba(255,255,255,0.35)' : 'rgba(212,165,116,0.35)';
  const btnText = isLight ? '#fff' : COLORS.primary;

  return (
    <>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: btnBg, borderColor: btnBorder }]}
        onPress={() => setVisible(true)}
        activeOpacity={0.75}
      >
        <Text style={styles.flag}>{LANGUAGE_FLAGS[language]}</Text>
        <Text style={[styles.code, { color: btnText }]}>{language.toUpperCase()}</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.backdrop} onPress={() => setVisible(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>🌐 언어 선택</Text>
            {LANGUAGES.map((lang) => {
              const active = lang === language;
              return (
                <TouchableOpacity
                  key={lang}
                  style={[styles.option, active && styles.optionActive]}
                  onPress={() => { setLanguage(lang); setVisible(false); }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.optionFlag}>{LANGUAGE_FLAGS[lang]}</Text>
                  <Text style={[styles.optionName, active && styles.optionNameActive]}>
                    {LANGUAGE_NAMES[lang]}
                  </Text>
                  {active && <Text style={styles.check}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  flag: { fontSize: 15 },
  code: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    width: 260,
    backgroundColor: '#FDFAF7',
    borderRadius: RADIUS.xl,
    padding: 20,
    ...SHADOWS.large,
  },
  sheetTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 14,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 13,
    paddingHorizontal: 14,
    borderRadius: RADIUS.lg,
    marginBottom: 4,
    backgroundColor: 'transparent',
  },
  optionActive: {
    backgroundColor: 'rgba(212,165,116,0.12)',
  },
  optionFlag: { fontSize: 22 },
  optionName: { flex: 1, fontSize: 15, color: COLORS.text, fontWeight: '500' },
  optionNameActive: { color: COLORS.primary, fontWeight: '700' },
  check: { fontSize: 16, color: COLORS.primary, fontWeight: '700' },
});
