'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SUPPORTED_LOCALES, LOCALE_INFO, type Locale, isValidLocale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Extract current locale from path
  const segments = pathname.split('/').filter(Boolean);
  const currentLocale: Locale = (segments[0] && isValidLocale(segments[0])) ? segments[0] : 'en';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function getLocalizedPath(locale: Locale): string {
    const segs = pathname.split('/').filter(Boolean);
    if (segs.length > 0 && isValidLocale(segs[0])) {
      segs[0] = locale;
    } else {
      segs.unshift(locale);
    }
    return '/' + segs.join('/');
  }

  const info = LOCALE_INFO[currentLocale];

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
        aria-label="Switch language"
      >
        <span>{info.flag}</span>
        <span className="hidden sm:inline text-xs">{info.name}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg shadow-black/20 py-1 z-50 max-h-80 overflow-y-auto">
          {SUPPORTED_LOCALES.map((locale) => {
            const li = LOCALE_INFO[locale];
            return (
              <a
                key={locale}
                href={getLocalizedPath(locale)}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  locale === currentLocale
                    ? 'text-cyan-400 bg-cyan-500/5'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
                }`}
              >
                <span className="text-base">{li.flag}</span>
                <span>{li.name}</span>
                {locale === currentLocale && (
                  <svg className="w-4 h-4 ml-auto text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
