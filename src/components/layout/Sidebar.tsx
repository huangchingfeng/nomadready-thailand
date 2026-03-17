'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { isProUser } from '@/lib/auth';

interface SidebarChapter {
  slug: string;
  title: string;
  chapterNumber: number;
  isFree: boolean;
}

interface SidebarProps {
  chapters: SidebarChapter[];
  activeSlug?: string;
  country?: string;
  locale?: string;
}

export default function Sidebar({ chapters, activeSlug, country = 'thailand', locale }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(isProUser());
  }, []);

  // 簡化標題顯示
  function getDisplayTitle(chapter: SidebarChapter): string {
    const title = chapter.title;
    // 移除 "Chapter N: " 前綴
    const cleaned = title.replace(/^Chapter\s+\d+:\s*/, '').replace(/^Bonus:\s*/, '');
    return cleaned || title;
  }

  function getChapterLabel(chapter: SidebarChapter): string {
    if (chapter.chapterNumber === 0) return 'Intro';
    if (chapter.chapterNumber === 11) return 'Bonus';
    return String(chapter.chapterNumber).padStart(2, '0');
  }

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 left-6 z-40 w-12 h-12 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-full shadow-lg shadow-cyan-500/25 flex items-center justify-center transition-all duration-200"
        aria-label="Toggle chapter sidebar"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 z-40 lg:z-0
          w-72 lg:w-64 h-[calc(100vh-4rem)]
          bg-slate-900 lg:bg-transparent
          border-r border-slate-800 lg:border-none
          overflow-y-auto
          transition-transform duration-300 lg:transition-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="py-6 pr-4 pl-4 lg:pl-0">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
            Chapters
          </h2>
          <nav className="space-y-1">
            {chapters.map((chapter) => {
              const isActive = chapter.slug === activeSlug;
              const isLocked = !chapter.isFree && !isPro;

              return (
                <Link
                  key={chapter.slug}
                  href={`${locale ? `/${locale}` : ''}/${country}/${chapter.slug}`}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                    transition-all duration-200 group
                    ${isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-500 -ml-px'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }
                  `}
                >
                  {/* Chapter number badge */}
                  <span
                    className={`
                      flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center text-xs font-mono font-medium
                      ${isActive
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'bg-slate-800 text-slate-500 group-hover:text-slate-400'
                      }
                    `}
                  >
                    {getChapterLabel(chapter)}
                  </span>

                  {/* Title */}
                  <span className="flex-1 truncate text-[13px]">
                    {getDisplayTitle(chapter)}
                  </span>

                  {/* Lock icon for premium */}
                  {isLocked && (
                    <svg
                      className="w-3.5 h-3.5 text-purple-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
