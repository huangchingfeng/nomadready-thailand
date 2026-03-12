import Link from 'next/link';
import Image from 'next/image';
import { getAllChapters } from '@/lib/content';
import { heroImages, chapterImages } from '@/lib/images';

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <div className="bg-[var(--bg-primary)] transition-colors duration-200">
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={heroImages[0].url}
            alt={heroImages[0].alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[var(--bg-primary)]/85 dark:bg-[var(--bg-primary)]/80" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Updated March 2026
            </div>

            {/* Brand tagline */}
            <p className="text-lg md:text-xl font-medium text-[var(--text-secondary)] tracking-wide uppercase mb-4">
              Thailand,{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                Figured Out.
              </span>
            </p>

            {/* SEO H1 */}
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-6">
              The Complete{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
                Digital Nomad Guide
              </span>{' '}
              to Thailand
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10">
              The interactive guide that saves you 40+ hours of research.
              AI-powered. Always updated. Built for digital nomads.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                href="/guide"
                className="w-full sm:w-auto px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25 text-center"
              >
                Start Planning Your Thailand Move
              </Link>
              <Link
                href="/guide/visa-complete-guide"
                className="w-full sm:w-auto px-8 py-3.5 border border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium rounded-lg transition-all duration-200 text-center"
              >
                Read the Free Visa Guide
              </Link>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-[var(--text-muted)]">
              <span className="flex items-center gap-2">
                <span className="text-[var(--text-primary)] font-semibold">11</span> Chapters
              </span>
              <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
              <span className="flex items-center gap-2">
                <span className="text-[var(--text-primary)] font-semibold">5</span> Cities
              </span>
              <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
              <span className="flex items-center gap-2">
                Updated <span className="text-[var(--text-primary)] font-semibold">March 2026</span>
              </span>
              <span className="hidden sm:block w-px h-4 bg-[var(--border)]" />
              <span className="flex items-center gap-2">
                AI Assistant <span className="text-emerald-500 font-semibold">Included</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          PROBLEM SECTION
          ========================================== */}
      <section className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Tired of outdated Reddit posts?
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Most Thailand guides are written by tourists, not nomads. Here&apos;s what you&apos;re probably dealing with:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: '40+ hours of scattered research',
                desc: 'Reddit, Facebook groups, YouTube, blogs — none of it organized or verified.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ),
                title: 'Outdated visa information',
                desc: 'Thailand changed visa rules in Nov 2025. Most guides still show old policies.',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Conflicting advice everywhere',
                desc: '"Get an Elite visa!" vs "Just do visa runs!" — which is actually right for you?',
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                ),
                title: 'No real budget numbers',
                desc: '"Thailand is cheap!" — but what does $1,500/mo actually get you in Bangkok vs Chiang Mai?',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] transition-colors duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          FEATURES GRID
          ========================================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Everything you need, in one place
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Not just another PDF guide. NomadReady is an interactive platform built specifically for digital nomads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                  </svg>
                ),
                title: 'AI Travel Assistant',
                desc: 'Ask anything about Thailand. Get instant, accurate answers based on our expert content.',
                color: 'cyan',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                  </svg>
                ),
                title: 'Smart Visa Finder',
                desc: 'Input your nationality and income. Get personalized visa recommendations instantly.',
                color: 'emerald',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
                  </svg>
                ),
                title: 'Budget Calculator',
                desc: 'Choose your city and lifestyle. See exact monthly costs broken down by category.',
                color: 'amber',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Interactive Checklist',
                desc: '30-day action plan. Track your progress step by step. Never miss a thing.',
                color: 'purple',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                ),
                title: '11 Expert Chapters',
                desc: 'Visa, housing, banking, healthcare, tax, safety — everything covered in detail.',
                color: 'cyan',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                  </svg>
                ),
                title: 'Always Updated',
                desc: 'We monitor policy changes and update the guide. Your info stays current.',
                color: 'emerald',
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: 'Solo Female Traveler Resources',
                desc: 'City-by-city safety ratings, women-specific communities, health resources, and practical tips from women who\u2019ve done it.',
                color: 'rose',
              },
            ].map((feature, i) => {
              const colorMap: Record<string, string> = {
                cyan: 'bg-cyan-500/10 text-cyan-500 group-hover:border-cyan-500/50',
                emerald: 'bg-emerald-500/10 text-emerald-500 group-hover:border-emerald-500/50',
                amber: 'bg-amber-500/10 text-amber-500 group-hover:border-amber-500/50',
                purple: 'bg-purple-500/10 text-purple-500 group-hover:border-purple-500/50',
                rose: 'bg-rose-500/10 text-rose-500 group-hover:border-rose-500/50',
              };
              const borderHover: Record<string, string> = {
                cyan: 'hover:border-cyan-500/50',
                emerald: 'hover:border-emerald-500/50',
                amber: 'hover:border-amber-500/50',
                purple: 'hover:border-purple-500/50',
                rose: 'hover:border-rose-500/50',
              };

              return (
                <div
                  key={i}
                  className={`group bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 transition-all duration-200 ${borderHover[feature.color]}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      colorMap[feature.color]?.split(' ').slice(0, 2).join(' ')
                    }`}
                  >
                    <span className={colorMap[feature.color]?.split(' ')[1]}>
                      {feature.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          PERSONA CALLOUTS
          ========================================== */}
      <section className="py-10 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-[var(--text-muted)]">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cyan-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Built for <span className="text-[var(--text-primary)]">developers, designers, freelancers &amp; remote teams</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Whether you earn <span className="text-[var(--text-primary)]">$3,000 or $10,000/month</span>
            </span>
            <span className="hidden sm:block w-px h-4 bg-slate-700" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              From <span className="text-[var(--text-primary)]">Americans to Europeans to Latin Americans</span>
            </span>
          </div>
        </div>
      </section>

      {/* ==========================================
          SOCIAL PROOF
          ========================================== */}
      <section className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Trusted by nomads worldwide
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Hear from people who planned their move with NomadReady.
            </p>
          </div>

          {/* Testimonial cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
            {[
              {
                quote: 'The visa comparison table alone saved me 20 hours of research. I went with the DTV and the guide walked me through every step.',
                name: 'Jake M.',
                role: 'Software Developer',
                location: 'Austin, TX',
                initials: 'JM',
                color: 'bg-cyan-500/20 text-cyan-400',
              },
              {
                quote: 'Finally a guide that covers EU tax implications. The banking section helped me set up Wise properly before I even landed.',
                name: 'Anna K.',
                role: 'Freelance Designer',
                location: 'Berlin',
                initials: 'AK',
                color: 'bg-emerald-500/20 text-emerald-400',
              },
              {
                quote: 'I was nervous about budgeting on $3,500/month. This guide showed me Chiang Mai is not just doable — it\'s amazing.',
                name: 'Carlos R.',
                role: 'Backend Developer',
                location: 'S\u00e3o Paulo',
                initials: 'CR',
                color: 'bg-amber-500/20 text-amber-400',
              },
              {
                quote: 'We used the budget calculator for couples and the checklist for our move. Best \u00a350 we\'ve spent on this journey.',
                name: 'Sarah & Mark T.',
                role: 'Remote Workers',
                location: 'London',
                initials: 'SM',
                color: 'bg-purple-500/20 text-purple-400',
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col transition-colors duration-200"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1 mb-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${testimonial.color}`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{testimonial.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{testimonial.role}, {testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm">
            <div className="text-center">
              <span className="block text-2xl font-bold text-[var(--text-primary)]">2,000+</span>
              <span className="text-[var(--text-muted)]">nomads planned their move</span>
            </div>
            <span className="hidden sm:block w-px h-10 bg-[var(--border)]" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-[var(--text-primary)]">11 chapters</span>
              <span className="text-[var(--text-muted)]">always updated</span>
            </div>
            <span className="hidden sm:block w-px h-10 bg-[var(--border)]" />
            <div className="text-center">
              <span className="block text-2xl font-bold text-cyan-400">4.9/5</span>
              <span className="text-[var(--text-muted)]">average rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CHAPTER PREVIEW
          ========================================== */}
      <section id="chapters" className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              What&apos;s inside the guide
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              11 expert chapters covering everything from visas to community life.
              Start with 3 free chapters.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {chapters
              .filter((ch) => ch.chapterNumber > 0)
              .map((chapter) => {
                const displayTitle = chapter.title
                  .replace(/^Chapter\s+\d+:\s*/, '')
                  .replace(/^Bonus:\s*/, '');

                return (
                  <Link
                    key={chapter.slug}
                    href={`/guide/${chapter.slug}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] hover:border-[var(--text-muted)] transition-all duration-200 group"
                  >
                    {/* Chapter thumbnail */}
                    <div className="flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden relative hidden sm:block">
                      {chapterImages[chapter.chapterNumber] ? (
                        <Image
                          src={chapterImages[chapter.chapterNumber].url}
                          alt={chapterImages[chapter.chapterNumber].alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full bg-[var(--bg-secondary)]" />
                      )}
                    </div>

                    {/* Number (mobile) */}
                    <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--bg-secondary)] flex items-center justify-center text-sm font-mono font-medium text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] sm:hidden">
                      {chapter.chapterNumber === 11
                        ? '+'
                        : String(chapter.chapterNumber).padStart(2, '0')}
                    </span>

                    {/* Title */}
                    <span className="flex-1 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors font-medium">
                      {displayTitle}
                    </span>

                    {/* Badge */}
                    {chapter.isFree ? (
                      <span className="flex-shrink-0 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                        Free
                      </span>
                    ) : (
                      <span className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pro
                      </span>
                    )}

                    {/* Arrow */}
                    <svg
                      className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-secondary)] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      {/* ==========================================
          PRICING SECTION
          ========================================== */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-[var(--text-secondary)] text-lg">
              Start free. Upgrade when you&apos;re ready to go all-in on Thailand.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-8 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-[var(--text-primary)]">$0</span>
                <span className="text-[var(--text-muted)]">forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'First 3 chapters (Visa, Cost, Neighborhoods)',
                  'AI Travel Assistant (5 questions/day)',
                  'Currency converter tool',
                  'Community access',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                    <svg className="w-4 h-4 text-[var(--text-muted)] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/guide"
                className="block w-full text-center px-6 py-3 border border-[var(--border)] hover:border-[var(--text-muted)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium rounded-lg transition-all duration-200"
              >
                Read Free Chapters
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative bg-[var(--bg-card)] border-2 border-cyan-500/50 rounded-xl p-8 transition-colors duration-200">
              {/* Popular badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wide">
                  Most Popular
                </span>
              </div>

              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold text-[var(--text-primary)]">$9</span>
                <span className="text-[var(--text-muted)]">/month</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-[var(--text-muted)]">or $69/year</span>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                  Save 36%
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'All 11 expert chapters',
                  'Smart Visa Finder tool',
                  'Budget Calculator',
                  '30-day interactive checklist',
                  'AI Assistant (unlimited)',
                  'Lifetime content updates',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-primary)]">
                    <svg className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block w-full text-center px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
              >
                Get Full Access — $39 Lifetime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FINAL CTA
          ========================================== */}
      <section className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Ready to move to Thailand?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Start with 3 free chapters and the AI assistant.
            No credit card required.
          </p>
          <Link
            href="/guide"
            className="inline-flex items-center px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25 text-lg"
          >
            Start Planning Your Move
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
