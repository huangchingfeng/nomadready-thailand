'use client';

import Link from 'next/link';

interface ContentGateProps {
  chapterTitle: string;
}

export default function ContentGate({ chapterTitle }: ContentGateProps) {
  return (
    <div className="relative mt-8">
      {/* Blur overlay gradient */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-primary)] z-10 pointer-events-none" />

      {/* Gate card */}
      <div className="relative z-20 bg-[var(--bg-card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl p-8 md:p-12 text-center transition-colors duration-200">
        {/* Lock icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Unlock All 11 Chapters — $39 Lifetime
        </h3>
        <p className="text-[var(--text-secondary)] mb-2 max-w-md mx-auto">
          &ldquo;{chapterTitle}&rdquo; is part of the Pro guide.
          Get lifetime access to all chapters, tools, and future updates with one payment.
        </p>

        {/* Pricing quick view */}
        <div className="flex items-center justify-center gap-3 my-6">
          <span className="text-3xl font-bold text-[var(--text-primary)]">$39</span>
          <span className="text-[var(--text-muted)]">one-time</span>
          <span className="text-[var(--text-muted)] mx-1">or</span>
          <span className="text-3xl font-bold text-[var(--text-primary)]">$9</span>
          <span className="text-[var(--text-muted)]">/month</span>
          <span className="inline-flex px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
            Best Value
          </span>
        </div>

        {/* Money-back guarantee */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
          <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="text-sm font-medium text-emerald-400">7-day money-back guarantee</span>
        </div>

        {/* What's included */}
        <ul className="text-sm text-[var(--text-secondary)] space-y-2 mb-8 max-w-xs mx-auto text-left">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            All 11 expert chapters
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Smart Visa Finder tool
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Budget Calculator
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            30-day interactive checklist
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Lifetime updates
          </li>
        </ul>

        {/* CTA */}
        <Link
          href="/pricing"
          className="inline-flex items-center px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
        >
          Get Lifetime Access — $39
          <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>

        <p className="mt-4 text-xs text-[var(--text-muted)]">
          Or{' '}
          <Link href="/guide" className="text-cyan-500 hover:text-cyan-400 underline">
            start with our 3 free chapters
          </Link>
        </p>
      </div>
    </div>
  );
}
