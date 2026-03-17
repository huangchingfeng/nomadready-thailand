import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUPPORTED_LOCALES, LOCALE_INFO, isValidLocale, loadTranslations, type Locale } from '@/lib/i18n';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const info = LOCALE_INFO[locale];

  // Load translations
  let t: Record<string, string> = {};
  try {
    t = (await import(`@/locales/${locale}.json`)).default;
  } catch {
    t = (await import('@/locales/en.json')).default;
  }

  return {
    title: `${t['site.name']} — ${t['site.tagline']}`,
    description: t['site.description'],
    openGraph: {
      locale: info.ogLocale,
    },
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map(l => [LOCALE_INFO[l].htmlLang, `/${l}`])
      ),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const translations = await loadTranslations(typedLocale);

  return (
    <>
      <Navbar locale={typedLocale} translations={translations} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
