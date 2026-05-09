import Image from 'next/image';
import Link from 'next/link';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: '30-Day Thailand Workation Checklist — NomadReady',
  description:
    'A practical 30-day Thailand workation checklist for remote workers: booking, visa checks, work setup, first 72 hours, budget, health, and city fit.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/thailand-workation-checklist' },
};

const phases = [
  {
    title: '30 Days Before',
    checks: ['Confirm passport validity and entry requirements.', 'Pick one primary city and one backup city.', 'Shortlist accommodation with desk, WiFi, and recent reviews.', 'Estimate monthly budget with rent, transport, food, gym, and insurance.'],
  },
  {
    title: '14 Days Before',
    checks: ['Ask accommodation for in-room speed test.', 'Prepare mobile data backup.', 'Map hospitals, pharmacies, laundry, gym, and grocery options.', 'Block first two workdays lightly if possible.'],
  },
  {
    title: '7 Days Before',
    checks: ['Download offline maps and key documents.', 'Confirm arrival transport.', 'Set first-week spending cap.', 'Write down your pass/fail criteria for extending.'],
  },
  {
    title: 'Arrival Day',
    checks: ['Test room WiFi and mobile signal.', 'Check desk, chair, outlets, lighting, and noise.', 'Find two default meals near the base.', 'Sleep early enough to judge the area honestly.'],
  },
  {
    title: 'First 72 Hours',
    checks: ['Complete two focused work blocks.', 'Take or simulate one call.', 'Test one backup cafe or coworking option.', 'Track transport friction and impulse spending.'],
  },
  {
    title: 'First Week',
    checks: ['Decide whether to extend, move areas, or move cities.', 'Review budget against reality.', 'Lock a repeatable work, food, and exercise routine.', 'Record what failed before committing to a month.'],
  },
];

const faqs = [
  {
    q: 'How long should a first Thailand workation be?',
    a: 'Thirty days is enough to test one city seriously. Book the first 5-7 nights only, then extend after the room and area pass.',
  },
  {
    q: 'What should remote workers test first in Thailand?',
    a: 'Test the room first: WiFi, mobile backup, desk, chair, noise, and call quality. Then test meals, transport, and budget.',
  },
  {
    q: 'Should I move cities during a 30-day test?',
    a: 'Only if the first city clearly fails. A split month can be useful, but too much movement turns the test into travel rather than workation data.',
  },
];

export default async function ThailandWorkationChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const citiesUrl = `/${locale}/best-thailand-cities-digital-nomads`;
  const pattayaChecklistUrl = `/${locale}/pattaya-72-hour-workation-checklist`;
  const calculatorUrl = `/${locale}/tools/budget-calculator`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '30-Day Thailand Workation Checklist',
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    author: { '@type': 'Organization', name: 'NomadReady' },
    publisher: { '@type': 'Organization', name: 'NomadReady' },
    mainEntityOfPage: `https://www.nomadreadyhq.com/${locale}/thailand-workation-checklist`,
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
            <Image src="/images/photos/passport.jpg" alt="Thailand workation preparation checklist" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-slate-950/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pt-28">
            <Link href={`/${locale}/thailand`} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Thailand Guide
            </Link>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              30-Day Thailand Workation Checklist
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A workation is not a vacation with a laptop. Use this checklist to protect sleep,
              calls, budget, food, transport, and your first-week decision.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={citiesUrl} className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Choose city
              </Link>
              <Link href={calculatorUrl} className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300">
                Estimate budget
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">Last reviewed: May 8, 2026</p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 max-w-3xl">
              <section className="space-y-4">
                {phases.map((phase) => (
                  <div key={phase.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <h2 className="text-xl font-bold text-slate-50">{phase.title}</h2>
                    <ul className="mt-5 space-y-3">
                      {phase.checks.map((check) => (
                        <li key={check} className="flex gap-3 text-sm leading-6 text-slate-300">
                          <span className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-cyan-400/70" />
                          <span>{check}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              <section className="prose prose-invert prose-slate mt-10 max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Decision Rule</h2>
                <p>
                  Extend only if the city supports the work week. If the room fails, move rooms. If
                  the city fails, move cities. If the routine fails everywhere, reduce movement before
                  blaming the destination.
                </p>
                <p>
                  For a Pattaya-specific version, use the{' '}
                  <Link href={pattayaChecklistUrl}>Pattaya 72-hour checklist</Link>.
                </p>
                <h2>Sources and Further Reading</h2>
                <ul>
                  <li><a href="https://www.thaievisa.go.th/visa/dtv-visa">Official Thai e-Visa: Destination Thailand Visa</a></li>
                  <li><Link href={`/${locale}/thailand`}>NomadReady Thailand Guide</Link></li>
                  <li><Link href={citiesUrl}>Best Thailand Cities for Digital Nomads</Link></li>
                </ul>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <h2 className="text-lg font-semibold text-slate-50">Core rule</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Book short first. Extend only after the room, routine, and budget pass real use.
                </p>
                <Link href={citiesUrl} className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Pick a city
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
