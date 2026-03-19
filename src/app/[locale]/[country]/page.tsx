import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllChapters, SUPPORTED_COUNTRIES, type Country } from '@/lib/content';
import Sidebar from '@/components/layout/Sidebar';
import { chapterImages } from '@/lib/images';

interface PageProps {
  params: Promise<{ locale: string; country: string }>;
}

const COUNTRY_META: Record<Country, { name: string; description: string }> = {
  thailand: {
    name: 'Thailand',
    description: '11 chapters covering everything you need to live and work in Thailand. Chapters 1-3 are free.',
  },
  bali: {
    name: 'Bali, Indonesia',
    description: '11 chapters covering everything you need to live and work in Bali. Chapters 1-3 are free.',
  },
};

export async function generateStaticParams() {
  const locales = ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"];
  const params: { locale: string; country: string }[] = [];
  for (const locale of locales) {
    for (const country of SUPPORTED_COUNTRIES) {
      params.push({ locale, country });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { country } = await params;
  if (!SUPPORTED_COUNTRIES.includes(country as Country)) {
    return { title: 'Not Found' };
  }
  const meta = COUNTRY_META[country as Country];
  return {
    title: `${meta.name} Guide — NomadReady`,
    description: meta.description,
    alternates: {
      canonical: `https://www.nomadreadyhq.com/en/${country}`,
    },
  };
}

export default async function CountryGuidePage({ params }: PageProps) {
  const { country } = await params;

  if (!SUPPORTED_COUNTRIES.includes(country as Country)) {
    notFound();
  }

  const typedCountry = country as Country;
  const chapters = getAllChapters(typedCountry);
  const meta = COUNTRY_META[typedCountry];

  const sidebarChapters = chapters.map((ch) => ({
    slug: ch.slug,
    title: ch.title,
    chapterNumber: ch.chapterNumber,
    isFree: ch.isFree,
  }));

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar chapters={sidebarChapters} country={typedCountry} />

      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-4xl mx-auto">
          {/* Back to country selection */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Countries
          </Link>

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-3">
              {meta.name} Digital Nomad Guide
            </h1>
            <p className="text-[var(--text-secondary)] text-lg">
              {meta.description}
            </p>
          </div>

          {/* Chapter cards grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {chapters
              .filter((ch) => ch.chapterNumber > 0)
              .map((chapter) => {
                const displayTitle = chapter.title
                  .replace(/^Chapter\s+\d+:\s*/, '')
                  .replace(/^Bonus:\s*/, '');

                return (
                  <Link
                    key={chapter.slug}
                    href={`/${typedCountry}/${chapter.slug}`}
                    className="group bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] rounded-xl overflow-hidden transition-all duration-200"
                  >
                    {/* Chapter image (Thailand only for now) */}
                    {typedCountry === 'thailand' && chapterImages[chapter.chapterNumber] && (
                      <div className="relative h-32 w-full overflow-hidden">
                        <img
                          src={chapterImages[chapter.chapterNumber].url}
                          alt={chapterImages[chapter.chapterNumber].alt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        {/* Chapter number */}
                        <span className="w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-sm font-mono font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                          {chapter.chapterNumber === 11
                            ? '+'
                            : String(chapter.chapterNumber).padStart(2, '0')}
                        </span>

                        {/* Badge */}
                        {chapter.isFree ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                            Free
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Pro
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-cyan-500 mb-2 transition-colors">
                        {displayTitle}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                        {chapter.description}
                      </p>

                      {/* Read link */}
                      <span className="inline-flex items-center gap-1 mt-4 text-sm text-cyan-500 group-hover:text-cyan-400 font-medium transition-colors">
                        {chapter.isFree ? 'Read now' : 'View chapter'}
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
