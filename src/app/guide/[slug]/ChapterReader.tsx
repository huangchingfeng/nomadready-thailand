'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { isProUser } from '@/lib/auth';
import ChapterContent from '@/components/guide/ChapterContent';
import ContentGate from '@/components/guide/ContentGate';
import EmailGate from '@/components/guide/EmailGate';

interface ChapterData {
  slug: string;
  title: string;
  chapterNumber: number;
  content: string;
  isFree: boolean;
  isEmailGated?: boolean;
  description: string;
}

interface HeadingData {
  id: string;
  text: string;
  level: number;
}

interface NavChapter {
  slug: string;
  title: string;
}

interface ChapterReaderProps {
  chapter: ChapterData;
  headings: HeadingData[];
  prev: NavChapter | null;
  next: NavChapter | null;
  country?: string;
}

export default function ChapterReader({ chapter, headings, prev, next, country = 'thailand' }: ChapterReaderProps) {
  const [isPro, setIsPro] = useState(false);
  const [hasEmail, setHasEmail] = useState(false);
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    setIsPro(isProUser());
    setHasEmail(!!localStorage.getItem('nomadready_email'));
  }, []);

  // 追蹤捲動位置高亮目錄
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  const isEmailGated = chapter.isEmailGated || (chapter.chapterNumber >= 4 && chapter.chapterNumber <= 6);
  const canRead = chapter.isFree || isPro || (isEmailGated && hasEmail);

  // 付費章節只顯示前幾段
  function getPreviewContent(content: string): string {
    const lines = content.split('\n');
    const result: string[] = [];
    let paragraphCount = 0;

    for (const line of lines) {
      result.push(line);
      // 空行後面跟著非標題的內容 = 一個段落結束
      if (line.trim() === '' && paragraphCount > 0) {
        paragraphCount++;
      }
      if (line.trim() !== '' && !line.startsWith('#')) {
        if (paragraphCount === 0) paragraphCount = 1;
      }
      // 取到約 3 個段落（含第一個表格）
      if (paragraphCount >= 4) break;
    }

    return result.join('\n');
  }

  const cleanTitle = chapter.title
    .replace(/^Chapter\s+\d+:\s*/, '')
    .replace(/^Bonus:\s*/, '');

  return (
    <div className="flex-1 min-w-0 flex">
      {/* Main content area */}
      <div className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Chapter meta */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] text-xs font-mono text-[var(--text-muted)]">
                {chapter.chapterNumber === 0
                  ? 'Intro'
                  : chapter.chapterNumber === 11
                    ? 'Bonus'
                    : `Chapter ${chapter.chapterNumber}`}
              </span>
              {chapter.isFree ? (
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  Free
                </span>
              ) : isEmailGated ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {hasEmail ? 'Free' : 'Email to unlock'}
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
          </div>

          {/* Chapter title */}
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-8">
            {cleanTitle}
          </h1>

          {/* Content */}
          {canRead ? (
            <ChapterContent content={chapter.content} />
          ) : (
            <>
              <div className="relative">
                <ChapterContent content={getPreviewContent(chapter.content)} />
                {isEmailGated && !hasEmail ? (
                  <EmailGate chapterTitle={cleanTitle} onUnlock={() => setHasEmail(true)} />
                ) : (
                  <ContentGate chapterTitle={cleanTitle} />
                )}
              </div>
            </>
          )}

          {/* Previous/Next navigation */}
          {canRead && (
            <nav className="mt-16 pt-8 border-t border-[var(--border)]">
              <div className="flex flex-col sm:flex-row items-stretch gap-4">
                {prev ? (
                  <Link
                    href={`/${country}/${prev.slug}`}
                    className="flex-1 group flex items-center gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all"
                  >
                    <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <div className="min-w-0">
                      <span className="text-xs text-[var(--text-muted)] block">Previous</span>
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate block">
                        {prev.title.replace(/^Chapter\s+\d+:\s*/, '').replace(/^Bonus:\s*/, '')}
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {next ? (
                  <Link
                    href={`/${country}/${next.slug}`}
                    className="flex-1 group flex items-center justify-end gap-3 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all text-right"
                  >
                    <div className="min-w-0">
                      <span className="text-xs text-[var(--text-muted)] block">Next</span>
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] truncate block">
                        {next.title.replace(/^Chapter\s+\d+:\s*/, '').replace(/^Bonus:\s*/, '')}
                      </span>
                    </div>
                    <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </nav>
          )}
        </div>
      </div>

      {/* Table of Contents (desktop only) */}
      {canRead && headings.length > 0 && (
        <aside className="hidden xl:block w-56 flex-shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-10 pr-4">
          <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            On this page
          </h4>
          <nav className="space-y-1">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={`
                  block text-xs leading-relaxed py-1 transition-colors duration-200
                  ${heading.level === 3 ? 'pl-3' : ''}
                  ${activeHeading === heading.id
                    ? 'text-cyan-400'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }
                `}
              >
                {heading.text}
              </a>
            ))}
          </nav>
        </aside>
      )}
    </div>
  );
}
