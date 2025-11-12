import en from './en';
import vi from './vi';

export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
} as const;

export const defaultLang = 'en';

export const translations = {
  en,
  vi,
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as keyof typeof translations;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof translations) {
  return translations[lang];
}

export function getLocalizedPath(path: string, lang: string) {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}
