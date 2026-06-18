import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../i18n/translations';

const STORAGE_KEY = 'app_language';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()((set) => ({
  language: 'ko',
  setLanguage: (language) => {
    set({ language });
    AsyncStorage.setItem(STORAGE_KEY, language).catch(() => {});
  },
}));

AsyncStorage.getItem(STORAGE_KEY)
  .then((lang) => {
    if (lang && ['ko', 'en', 'es', 'zh'].includes(lang)) {
      useLanguageStore.setState({ language: lang as Language });
    }
  })
  .catch(() => {});
