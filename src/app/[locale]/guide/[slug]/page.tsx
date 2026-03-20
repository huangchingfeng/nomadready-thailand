import { notFound } from 'next/navigation';
import { getAllChapters, getChapterBySlug, getAdjacentChapters, extractHeadings } from '@/lib/content';
import { SUPPORTED_LOCALES } from '@/lib/i18n';
import Sidebar from '@/components/layout/Sidebar';
import ChapterReader from './ChapterReader';

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"];
  const chapters = getAllChapters("thailand");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const ch of chapters) {
      params.push({ locale, slug: ch.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug('thailand', slug);
  if (!chapter) return { title: 'Chapter Not Found' };

  const cleanTitle = chapter.title
    .replace(/^Chapter\s+\d+:\s*/, '')
    .replace(/^Bonus:\s*/, '');

  return {
    title: `${cleanTitle} — NomadReady: Thailand`,
    description: chapter.description,
    alternates: {
      canonical: `https://www.nomadreadyhq.com/en/thailand/${slug}`,
    },
  };
}

export default async function ChapterPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const chapter = getChapterBySlug('thailand', slug);

  if (!chapter) {
    notFound();
  }

  const allChapters = getAllChapters('thailand');
  const { prev, next } = getAdjacentChapters('thailand', slug);
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
      <Sidebar chapters={sidebarChapters} activeSlug={slug} country="thailand" locale={locale} />

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
        country="thailand"
      />
    </div>
  );
}
