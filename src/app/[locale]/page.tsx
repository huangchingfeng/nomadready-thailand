import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map(locale => ({ locale }));
}

const COUNTRIES = [
  { slug: 'thailand', name: 'Thailand', flag: '🇹🇭', desc: 'Bangkok · Chiang Mai · Islands' },
  { slug: 'bali', name: 'Bali, Indonesia', flag: '🇮🇩', desc: 'Canggu · Ubud · Sanur' },
];

export default async function Root({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Launch Banner */}
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-center py-3 px-4">
        <p className="text-sm md:text-base font-medium">
          🎉 Launch week! Get the full guide <strong>FREE</strong> — use code <code className="bg-white/20 px-2 py-0.5 rounded font-mono">LAUNCHFREE</code> at checkout →{' '}
          <a href="https://nomadready.gumroad.com" className="underline font-bold hover:text-cyan-200 transition">
            Grab it now
          </a>
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
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-[var(--text-primary)] mb-2">One-Time Purchase</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Pay once, get lifetime updates. No subscriptions, no upsells.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
