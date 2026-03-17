'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { isProUser } from '@/lib/auth';
import ThemeToggle from '@/components/ui/ThemeToggle';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { isValidLocale, type Locale } from '@/lib/i18n';

// Simple translation keys for navbar
const NAV_TRANSLATIONS: Record<Locale, { guide: string; tools: string; pricing: string; getAccess: string; pro: string; proActive: string; tagline: string }> = {
  'en':    { guide: 'Guide', tools: 'Tools', pricing: 'Pricing', getAccess: 'Get Full Access', pro: 'Pro', proActive: 'Pro Active', tagline: 'For all nomads — developers, designers, freelancers & families' },
  'zh-cn': { guide: '指南', tools: '工具', pricing: '价格', getAccess: '获取完整版', pro: 'Pro', proActive: 'Pro 已激活', tagline: '为所有游牧者打造 — 开发者、设计师、自由职业者和家庭' },
  'zh-tw': { guide: '指南', tools: '工具', pricing: '方案', getAccess: '取得完整版', pro: 'Pro', proActive: 'Pro 已啟用', tagline: '為所有遊牧者打造 — 開發者、設計師、自由工作者與家庭' },
  'es':    { guide: 'Guía', tools: 'Herramientas', pricing: 'Precios', getAccess: 'Acceso Completo', pro: 'Pro', proActive: 'Pro Activo', tagline: 'Para todos los nómadas — desarrolladores, diseñadores, freelancers y familias' },
  'ja':    { guide: 'ガイド', tools: 'ツール', pricing: '料金', getAccess: 'フルアクセス', pro: 'Pro', proActive: 'Pro 有効', tagline: 'すべてのノマドのために — 開発者、デザイナー、フリーランス、ファミリー' },
  'ko':    { guide: '가이드', tools: '도구', pricing: '가격', getAccess: '전체 이용권', pro: 'Pro', proActive: 'Pro 활성화됨', tagline: '모든 노마드를 위해 — 개발자, 디자이너, 프리랜서, 가족' },
  'pt':    { guide: 'Guia', tools: 'Ferramentas', pricing: 'Preços', getAccess: 'Acesso Completo', pro: 'Pro', proActive: 'Pro Ativo', tagline: 'Para todos os nômades — devs, designers, freelancers e famílias' },
  'fr':    { guide: 'Guide', tools: 'Outils', pricing: 'Tarifs', getAccess: 'Accès Complet', pro: 'Pro', proActive: 'Pro Actif', tagline: 'Pour tous les nomades — développeurs, designers, freelances et familles' },
  'de':    { guide: 'Guide', tools: 'Tools', pricing: 'Preise', getAccess: 'Vollzugang', pro: 'Pro', proActive: 'Pro Aktiv', tagline: 'Für alle Nomaden — Entwickler, Designer, Freelancer & Familien' },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const pathname = usePathname();

  // Extract locale from URL
  const segments = pathname.split('/').filter(Boolean);
  const locale: Locale = (segments[0] && isValidLocale(segments[0])) ? segments[0] : 'en';
  const t = NAV_TRANSLATIONS[locale];
  const prefix = `/${locale}`;

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  const navLinks = [
    { href: `${prefix}/guide`, label: t.guide },
    { href: `${prefix}/tools`, label: t.tools },
    { href: `${prefix}/pricing`, label: t.pricing },
  ];

  return (
    <nav className="sticky top-0 z-50 h-16 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href={prefix} className="flex items-center gap-2 group">
          <span className="text-xl font-bold text-[var(--text-primary)] tracking-tight">
            Nomad<span className="text-cyan-500">Ready</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-cyan-500 group-hover:bg-cyan-400 transition-colors" />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          {isPro ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium border border-cyan-500/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {t.pro}
            </span>
          ) : (
            <Link href={`${prefix}/pricing`} className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-sm font-semibold rounded-lg transition-all duration-200">
              {t.getAccess}
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border)] transition-colors duration-200">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-[var(--text-secondary)] hover:text-[var(--text-primary)] py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <p className="text-xs text-[var(--text-muted)] pt-2 pb-1">{t.tagline}</p>
            <div className="pt-3 border-t border-[var(--border)]">
              {isPro ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {t.proActive}
                </span>
              ) : (
                <Link href={`${prefix}/pricing`} className="block w-full text-center px-4 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all" onClick={() => setIsMenuOpen(false)}>
                  {t.getAccess}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
