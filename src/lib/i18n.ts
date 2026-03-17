// i18n system for NomadReady
import type { ReactNode } from 'react';

export const SUPPORTED_LOCALES = [
  'en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'
] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export interface LocaleInfo {
  code: Locale;
  name: string;       // Native name
  flag: string;       // Emoji flag
  htmlLang: string;   // For <html lang="">
  ogLocale: string;   // For OpenGraph
}

export const LOCALE_INFO: Record<Locale, LocaleInfo> = {
  'en':    { code: 'en',    name: 'English',    flag: '🇬🇧', htmlLang: 'en',    ogLocale: 'en_US' },
  'zh-cn': { code: 'zh-cn', name: '简体中文',    flag: '🇨🇳', htmlLang: 'zh-CN', ogLocale: 'zh_CN' },
  'es':    { code: 'es',    name: 'Español',    flag: '🇪🇸', htmlLang: 'es',    ogLocale: 'es_ES' },
  'ja':    { code: 'ja',    name: '日本語',      flag: '🇯🇵', htmlLang: 'ja',    ogLocale: 'ja_JP' },
  'ko':    { code: 'ko',    name: '한국어',      flag: '🇰🇷', htmlLang: 'ko',    ogLocale: 'ko_KR' },
  'zh-tw': { code: 'zh-tw', name: '繁體中文',    flag: '🇹🇼', htmlLang: 'zh-TW', ogLocale: 'zh_TW' },
  'pt':    { code: 'pt',    name: 'Português',  flag: '🇧🇷', htmlLang: 'pt',    ogLocale: 'pt_BR' },
  'fr':    { code: 'fr',    name: 'Français',   flag: '🇫🇷', htmlLang: 'fr',    ogLocale: 'fr_FR' },
  'de':    { code: 'de',    name: 'Deutsch',    flag: '🇩🇪', htmlLang: 'de',    ogLocale: 'de_DE' },
};

export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

// Load translations
const translationCache: Partial<Record<Locale, Record<string, string>>> = {};

export async function loadTranslations(locale: Locale): Promise<Record<string, string>> {
  if (translationCache[locale]) return translationCache[locale]!;
  try {
    const mod = await import(`@/locales/${locale}.json`);
    translationCache[locale] = mod.default;
    return mod.default;
  } catch {
    // Fallback to English
    if (locale !== 'en') return loadTranslations('en');
    return {};
  }
}

// Synchronous translation getter (for server components that pre-load translations)
export function t(translations: Record<string, string>, key: string, params?: Record<string, string>): string {
  let text = translations[key] || key;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}

// Get locale from path segment
export function getLocaleFromPath(path: string): Locale {
  const segment = path.split('/').filter(Boolean)[0];
  if (segment && isValidLocale(segment)) return segment;
  return DEFAULT_LOCALE;
}

// Build localized path
export function localePath(locale: Locale, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${cleanPath}`;
}
