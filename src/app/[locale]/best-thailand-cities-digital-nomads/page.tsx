import Image from 'next/image';
import Link from 'next/link';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Best Thailand Cities for Digital Nomads — 30-Day Remote Work Test',
  description:
    'Compare Bangkok, Chiang Mai, Pattaya, Phuket, Hua Hin, and Koh Phangan for a 30-day Thailand digital nomad test.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/best-thailand-cities-digital-nomads' },
};

const cities = [
  ['Bangkok', 'Infrastructure', 'Best for calls, transit, hospitals, flights, food, and professional services. Weakness: intensity and cost drift.'],
  ['Chiang Mai', 'Community', 'Best for nomad community, cafes, slower routines, and lower pressure. Weakness: seasonal air quality and inland setting.'],
  ['Pattaya', 'Low-cost beach test', 'Best for beach access, Bangkok proximity, and long-stay services. Weakness: distraction management.'],
  ['Phuket', 'Premium island lifestyle', 'Best for scenery, fitness, beaches, and vacation value. Weakness: higher monthly variance.'],
  ['Hua Hin', 'Calm routine', 'Best for quieter beach living and fewer nightlife defaults. Weakness: thinner startup-nomad energy.'],
  ['Koh Phangan', 'Wellness/community', 'Best for island wellness and community pockets. Weakness: island logistics and seasonal fit.'],
];

const decisionRows = [
  ['Need deep work and calls', 'Bangkok or Chiang Mai'],
  ['Want beach with lower commitment', 'Pattaya'],
  ['Want calm beach routine', 'Hua Hin'],
  ['Want premium island month', 'Phuket'],
  ['Want wellness/community island feel', 'Koh Phangan'],
  ['Unsure and first time in Thailand', 'Bangkok first, then test one beach city'],
];

const faqs = [
  {
    q: 'What is the best Thailand city for digital nomads?',
    a: 'Bangkok is best for infrastructure, Chiang Mai for community, Pattaya for a low-cost beach test, Phuket for premium island lifestyle, and Hua Hin for calm routine.',
  },
  {
    q: 'Which Thailand beach city is best for remote work?',
    a: 'Pattaya is the easiest first beach test, Hua Hin is calmer, and Phuket is the stronger premium island option.',
  },
  {
    q: 'Should I start in Bangkok or a beach city?',
    a: 'If this is your first Thailand remote-work test, Bangkok is the safest logistics base. If you already know Thailand, a beach test can be useful.',
  },
];

export default async function BestThailandCitiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const beachUrl = `/${locale}/thailand-beach-workation`;
  const checklistUrl = `/${locale}/thailand-workation-checklist`;
  const pattayaUrl = `/${locale}/pattaya-workation`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Thailand Cities for Digital Nomads',
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    author: { '@type': 'Organization', name: 'NomadReady' },
    publisher: { '@type': 'Organization', name: 'NomadReady' },
    mainEntityOfPage: `https://www.nomadreadyhq.com/${locale}/best-thailand-cities-digital-nomads`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/photos/hero-thailand.jpg" alt="Thailand city and beach options for digital nomads" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pt-28">
            <Link href={`/${locale}/thailand`} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Thailand Guide
            </Link>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              Best Thailand Cities for Digital Nomads
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Start with your work pattern, not the city hype. The best Thailand base depends on
              whether you need infrastructure, community, beach life, calm, or a low-cost test.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={checklistUrl} className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Open 30-day checklist
              </Link>
              <Link href={beachUrl} className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300">
                Compare beach cities
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">Last reviewed: May 8, 2026</p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cities.map(([city, label, body]) => (
              <div key={city} className="rounded-lg border border-slate-800 bg-slate-900 p-5 max-sm:pr-14">
                <h2 className="text-lg font-semibold text-slate-100">{city}</h2>
                <p className="mt-2 text-sm font-medium text-cyan-300">{label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </section>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 max-w-3xl">
              <section className="prose prose-invert prose-slate max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Quick Verdict</h2>
                <p>
                  Bangkok is the safest logistics default. Chiang Mai is the community default.
                  Pattaya is the low-cost beach experiment. Phuket is the premium island option.
                  Hua Hin is the calm beach option. Koh Phangan is the wellness/community island bet.
                </p>
                <p>
                  If beach life is the main question, start with the{' '}
                  <Link href={beachUrl}>Thailand beach workation comparison</Link>. If Pattaya is
                  the likely test, use the <Link href={pattayaUrl}>Pattaya workation guide</Link>.
                </p>
              </section>

              <section className="mt-10 space-y-4">
                <h2 className="text-2xl font-bold text-slate-50">Decision Matrix</h2>
                {decisionRows.map(([need, pick]) => (
                  <div key={need} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-base font-semibold text-slate-100">{need}</h3>
                      <span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        {pick}
                      </span>
                    </div>
                  </div>
                ))}
              </section>

              <section className="prose prose-invert prose-slate mt-10 max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>30-Day Test Plan</h2>
                <p>
                  Do not solve Thailand with a permanent city choice. Run one city for 30 days, track
                  sleep, output, meals, transport, and budget, then decide whether to extend or rotate.
                  The goal is evidence, not a perfect first guess.
                </p>
                <h2>Sources and Further Reading</h2>
                <ul>
                  <li><a href="https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469">Tourism Authority of Thailand: Pattaya</a></li>
                  <li><a href="https://www.tourismthailand.org/Destinations/Provinces/Phuket/350">Tourism Authority of Thailand: Phuket</a></li>
                  <li><a href="https://www.tourismthailand.org/Destinations/Provinces/Hua-Hin/240">Tourism Authority of Thailand: Hua Hin</a></li>
                  <li><Link href={`/${locale}/thailand`}>NomadReady Thailand Guide</Link></li>
                </ul>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <h2 className="text-lg font-semibold text-slate-50">Default path</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  First time in Thailand: Bangkok for logistics, then one beach city or Chiang Mai
                  for a cleaner 30-day test.
                </p>
                <Link href={checklistUrl} className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Use checklist
                </Link>
              </div>
              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">FAQ</h2>
                <div className="mt-4 space-y-4">
                  {faqs.map((faq) => (
                    <div key={faq.q}>
                      <h3 className="text-sm font-semibold text-slate-100">{faq.q}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}
