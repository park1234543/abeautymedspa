import translations from './translations';
import { useLanguageStore } from '../store/languageStore';
import { Language } from './translations';

type DeepValue<T> = T extends Record<string, infer V>
  ? V extends string
    ? T
    : DeepValue<V>
  : never;

export function useTranslation() {
  const { language } = useLanguageStore();

  function t(section: keyof typeof translations, key: string): string {
    const sec = translations[section] as any;
    if (!sec) return key;
    const entry = sec[key];
    if (!entry) return key;
    if (typeof entry === 'object' && !Array.isArray(entry)) {
      return entry[language] ?? entry['ko'] ?? key;
    }
    return key;
  }

  function tArr(section: keyof typeof translations, key: string): string[] {
    const sec = translations[section] as any;
    if (!sec) return [];
    const entry = sec[key];
    if (!entry) return [];
    if (typeof entry === 'object' && Array.isArray(entry[language])) {
      return entry[language];
    }
    return entry['ko'] ?? [];
  }

  function tFmt(section: keyof typeof translations, key: string, vars: Record<string, string | number>): string {
    let str = t(section, key);
    for (const [k, v] of Object.entries(vars)) {
      str = str.replace(`{${k}}`, String(v));
    }
    return str;
  }

  return { t, tArr, tFmt, language };
}
