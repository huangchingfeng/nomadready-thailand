import { notFound } from 'next/navigation';
import {
  getAllChapters,
  getChapterBySlug,
  getAdjacentChapters,
  extractHeadings,
  SUPPORTED_COUNTRIES,
  type Country,
} from '@/lib/content';
import { SUPPORTED_LOCALES } from '@/lib/i18n';
import Sidebar from '@/components/layout/Sidebar';
import ChapterReader from '../../guide/[slug]/ChapterReader';

interface PageProps {
  params: Promise<{ locale: string; country: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"];
  const params: { locale: string; country: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const country of SUPPORTED_COUNTRIES) {
      const chapters = getAllChapters(country);
      for (const ch of chapters) {
        params.push({ locale, country, slug: ch.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { country, slug } = await params;
  if (!SUPPORTED_COUNTRIES.includes(country as Country)) {
    return { title: 'Not Found' };
  }
  const chapter = getChapterBySlug(country as Country, slug);
  if (!chapter) return { title: 'Chapter Not Found' };

  const countryName = country === 'bali' ? 'Bali' : 'Thailand';
  const cleanTitle = chapter.title
    .replace(/^Chapter\s+\d+:\s*/, '')
    .replace(/^Bonus:\s*/, '');

  return {
    title: `${cleanTitle} — NomadReady: ${countryName}`,
    description: chapter.description,
    alternates: {
      canonical: `https://www.nomadreadyhq.com/en/${country}/${slug}`,
    },
  };
}

export default async function CountryChapterPage({ params }: PageProps) {
  const { locale, country, slug } = await params;

  if (!SUPPORTED_COUNTRIES.includes(country as Country)) {
    notFound();
  }

  const typedCountry = country as Country;
  const chapter = getChapterBySlug(typedCountry, slug);

  if (!chapter) {
    notFound();
  }

  const allChapters = getAllChapters(typedCountry);
  const { prev, next } = getAdjacentChapters(typedCountry, slug);
  const headings = extractHeadings(chapter.content);

  const sidebarChapters = allChapters.map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    chapterNumber: ch.chapterNumber,
    isFree: ch.isFree,
  }));

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar chapters={sidebarChapters} activeSlug={slug} country={typedCountry} locale={locale} />

      {/* Client-side reader (handles auth gating) */}
      <ChapterReader
        chapter={{
          slug: chapter.slug,
          title: chapter.title,
          chapterNumber: chapter.chapterNumber,
          content: chapter.content,
          isFree: chapter.isFree,
          isEmailGated: chapter.isEmailGated,
          description: chapter.description,
        }}
        headings={headings}
        prev={prev ? { slug: prev.slug, title: prev.title } : null}
        next={next ? { slug: next.slug, title: next.title } : null}
        country={typedCountry}
      />
    </div>
  );
}
