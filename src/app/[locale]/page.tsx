import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

const COUNTRIES = [
  { slug: 'thailand', name: 'Thailand', flag: '🇹🇭', desc: 'Bangkok · Chiang Mai · Pattaya' },
  { slug: 'bali', name: 'Bali, Indonesia', flag: '🇮🇩', desc: 'Canggu · Ubud · Sanur' },
];

export default async function Root({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Launch Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-3 px-4">
        <p className="text-sm font-medium leading-6 md:text-base">
          Founding 50: full guide for <strong>$9</strong> with{' '}
          <code className="rounded bg-white/20 px-2 py-0.5 font-mono">FOUNDING50</code>{' '}
          <a href="https://nomadready.gumroad.com" className="underline font-bold hover:text-cyan-200 transition">
            Get access
          </a>
          <span className="ml-2 hidden text-xs text-cyan-200 sm:inline">Only 50 spots available</span>
        </p>
      </div>
      {/* Hero */}
      <section className="relative px-6 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-4">
          NomadReady
        </h1>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
          The most practical digital nomad guides for Southeast Asia.
          <br />
          Visas, costs, coworking, banking, taxes — all verified and updated weekly.
        </p>

        {/* Country selector */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          {COUNTRIES.map(c => (
            <Link
              key={c.slug}
              href={`/${locale}/${c.slug}`}
              className="group flex items-center gap-4 px-6 py-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-cyan-500/50 transition"
            >
              <span className="text-4xl">{c.flag}</span>
              <div className="text-left">
                <span className="block text-lg font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition">
                  {c.name}
                </span>
                <span className="text-sm text-[var(--text-muted)]">{c.desc}</span>
              </div>
            </Link>
          ))}
        </div>

        {/* City spotlight */}
        <div className="max-w-2xl mx-auto mb-12 space-y-3">
          <Link
            href={`/${locale}/pattaya-workation`}
            className="group block text-left bg-[var(--bg-card)] border border-cyan-500/30 hover:border-cyan-400 rounded-xl p-5 transition"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-medium text-cyan-400 mb-3">
                  New free city field guide
                </span>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] group-hover:text-cyan-400 transition">
                  Pattaya Workation Field Guide
                </h2>
                <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                  Beach life, remote work routines, long-stay areas, cost control, and nightlife-aware rules for a saner Pattaya month.
                </p>
              </div>
              <span className="text-cyan-400 text-sm font-medium whitespace-nowrap mt-9">
                Read →
              </span>
            </div>
          </Link>
          <Link
            href={`/${locale}/pattaya-digital-nomad-guide`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Read the SEO guide: Pattaya Digital Nomad Guide 2026 →
          </Link>
          <Link
            href={`/${locale}/pattaya-72-hour-workation-checklist`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Use the checklist: Pattaya 72-hour workation test →
          </Link>
          <Link
            href={`/${locale}/pattaya-vs-phuket-digital-nomad`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Compare beach bases: Pattaya vs Phuket for digital nomads →
          </Link>
          <Link
            href={`/${locale}/thailand-beach-workation`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Broader guide: Thailand beach workation comparison →
          </Link>
          <Link
            href={`/${locale}/best-thailand-cities-digital-nomads`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Choose a base: best Thailand cities for digital nomads →
          </Link>
          <Link
            href={`/${locale}/thailand-workation-checklist`}
            className="block text-sm font-medium text-cyan-500 hover:text-cyan-400"
          >
            Prepare the trip: 30-day Thailand workation checklist →
          </Link>
        </div>

        {/* Email signup */}
        <div className="max-w-xl mx-auto">
          <p className="text-sm text-[var(--text-muted)] mb-3">
            Get the free Thailand vs Bali cheat sheet:
          </p>
          <EmailSignupForm source="homepage" />
        </div>
      </section>

      {/* Value props */}
      <section className="px-6 py-16 border-t border-[var(--border)]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-3">📋</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Updated Weekly</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Visa rules, prices, and policies change fast. We track them so you don&apos;t have to.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">💰</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">Real Prices</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Every cost figure is verified against actual listings. No 2018 blog post numbers.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-3">🧭</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">City Field Guides</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Country-level planning plus city-level reality checks for places like Pattaya, Bangkok, Chiang Mai, and Bali.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
