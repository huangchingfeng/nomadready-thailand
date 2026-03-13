import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

export default function HomePage() {
  return (
    <div className="bg-[var(--bg-primary)] min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Updated March 2026
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.1] mb-6">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-cyan-500 bg-clip-text text-transparent">
              Next Destination
            </span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto mb-4">
            Interactive digital nomad guides — AI-powered, always updated, built for people who work remotely.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-16">
            Everything you need before you land. Visa, housing, coworking, banking, and more.
          </p>

          {/* Country cards */}
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto text-left">
            {/* Thailand */}
            <Link
              href="/thailand"
              className="group relative bg-[var(--bg-card)] border border-[var(--border)] hover:border-cyan-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Color accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-cyan-400 to-cyan-600" />

              <div className="p-7">
                {/* Flag + name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🇹🇭</span>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-cyan-400 transition-colors">
                      Thailand
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">#1 Digital Nomad Destination in SE Asia</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  Visa-friendly, affordable, world-class street food. Bangkok, Chiang Mai, Phuket, and more — all covered.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-6">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[var(--text-primary)] font-semibold">11</span> Chapters
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-semibold">3</span> Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    AI Assistant
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-500 group-hover:text-cyan-400 transition-colors">
                  Open Guide
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* Bali */}
            <Link
              href="/bali"
              className="group relative bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
            >
              {/* Color accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-500" />

              <div className="p-7">
                {/* Flag + name */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🇮🇩</span>
                  <div>
                    <h2 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-amber-400 transition-colors">
                      Bali, Indonesia
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">Where surf culture meets co-working</p>
                  </div>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                  Canggu, Ubud, Seminyak — stunning backdrops for remote work, affordable co-living, and a vibrant nomad scene.
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] mb-6">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[var(--text-primary)] font-semibold">11</span> Chapters
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-semibold">3</span> Free
                  </span>
                  <span className="flex items-center gap-1.5">
                    AI Assistant
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-500 group-hover:text-amber-400 transition-colors">
                  Open Guide
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Email capture */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-[var(--bg-card)] to-emerald-500/10 p-8 md:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
              Free lead magnet
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Get the Thailand vs Bali cheat sheet
            </h2>
            <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-6">
              A fast side-by-side comparison for visa reality, monthly budget, neighborhoods, Wi-Fi, and who each destination fits best.
              We&apos;ll also send major guide updates and launch offers.
            </p>
            <EmailSignupForm source="homepage-cheat-sheet" />
            <p className="mt-3 text-xs text-[var(--text-muted)]">
              No spam. Just useful updates for remote workers choosing their next base.
            </p>
          </div>
        </div>
      </section>

      {/* What's inside */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-[var(--border)] pt-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-3">
            What&apos;s inside every guide
          </h2>
          <p className="text-[var(--text-secondary)] text-center mb-10 text-sm">
            11 chapters. AI assistant. Interactive tools.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { icon: '🛂', title: 'Visa Complete Guide', desc: 'Every visa option explained side-by-side with costs and requirements.' },
              { icon: '💰', title: 'Cost of Living', desc: 'Exact monthly budgets from budget to premium, by city.' },
              { icon: '🏘️', title: 'Best Neighborhoods', desc: 'Where to base yourself based on your vibe, budget, and work style.' },
              { icon: '💻', title: 'Coworking Spaces', desc: 'Top spaces ranked by WiFi speed, price, and community.' },
              { icon: '📱', title: 'Internet & SIM Cards', desc: 'Best mobile plans and how to stay connected everywhere.' },
              { icon: '🏥', title: 'Healthcare & Safety', desc: 'Hospitals, insurance, emergency numbers, and scams to avoid.' },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5"
              >
                <span className="text-2xl mb-3 block">{item.icon}</span>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
