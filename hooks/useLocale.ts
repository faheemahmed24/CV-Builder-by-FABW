import { useMemo } from 'react';
import en from '../locales/en.json';
import ur from '../locales/ur.json';
import ar from '../locales/ar.json';

export type LocaleStrings = typeof en;

const locales: Record<string, LocaleStrings> = {
  en,
  ur,
  ar,
};

export function useLocale(lang: string): LocaleStrings {
  const strings = useMemo(() => locales[lang] || en, [lang]);
  return strings;
}

export interface Language {
  code: string;
  name: string;
  rtl: boolean;
}

export function useAvailableLanguages(): Language[] {
  return [
    { code: 'en', name: 'English', rtl: false },
    { code: 'ur', name: 'اردو', rtl: true },
    { code: 'ar', name: 'العربية', rtl: true },
    { code: 'hi', name: 'हिन्दी', rtl: false },
    { code: 'fr', name: 'Français', rtl: false },
    { code: 'es', name: 'Español', rtl: false },
    { code: 'de', name: 'Deutsch', rtl: false },
    { code: 'tr', name: 'Türkçe', rtl: false },
    { code: 'zh', name: '中文', rtl: false },
    { code: 'fa', name: 'فارسی', rtl: true }
  ];
}
