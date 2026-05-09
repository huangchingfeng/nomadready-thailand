import Image from 'next/image';
import Link from 'next/link';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Pattaya Cost of Living for Digital Nomads — Productive Month Budget',
  description:
    'A practical Pattaya cost of living guide for digital nomads: budget categories, hidden leaks, sample month structure, and productivity-aware spending rules.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/pattaya-cost-of-living-digital-nomad' },
};

const budgetModes = [
  ['Budget mode', 'Simple Jomtien room, Thai food, limited cafe spend, public songthaew routes, strict evening budget.'],
  ['Comfortable mode', 'Better condo, gym, mixed restaurants, occasional rides, one or two planned nights out.'],
  ['Premium mode', 'Sea-view unit, more private transport, nicer restaurants, frequent entertainment, and higher recovery risk.'],
];

const categories = [
  ['Accommodation', 'The room is the core work tool. Pay for quiet, desk quality, chair comfort, and reliable internet before view or location flex.'],
  ['Food', 'Build three default meals: cheap, healthy, and late-night low-damage. Decision fatigue is a budget leak.'],
  ['Transport', 'Short rides feel small until they become daily. Track rides separately from rent and food.'],
  ['Work setup', 'Budget for mobile backup, cafe work blocks, headphones, and a fallback place for calls.'],
  ['Fitness and health', 'A gym or repeatable walk route protects the month more than another tourist activity.'],
  ['Entertainment', 'Plan it as a category, not as leftover money. Pattaya punishes vague evening budgets.'],
];

const leaks = [
  'Booking a cheap room that cannot support calls or sleep.',
  'Treating every night as flexible instead of pre-deciding work nights.',
  'Using ride-hailing for small trips without tracking monthly total.',
  'Eating randomly instead of having default meals near the base.',
  'Counting only receipts and ignoring next-day recovery cost.',
];

const faqs = [
  {
    q: 'Is Pattaya cheap for digital nomads?',
    a: 'Pattaya can be one of Thailand’s cheaper beach bases, but only if accommodation, transport, and entertainment are controlled. A cheap room plus uncontrolled nights can become expensive fast.',
  },
  {
    q: 'What is the biggest hidden cost in Pattaya?',
    a: 'The biggest hidden cost is usually next-day productivity loss: poor sleep, recovery time, missed calls, and extra spending after unplanned nights.',
  },
  {
    q: 'Should I book a full month to save money?',
    a: 'Not first. Book 5-7 nights, run a 72-hour test, then extend only if sleep, work, food, and budget pass.',
  },
];

export default async function PattayaCostPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const checklistUrl = `/${locale}/pattaya-72-hour-workation-checklist`;
  const calculatorUrl = `/${locale}/tools/budget-calculator`;
  const guideUrl = `/${locale}/pattaya-digital-nomad-guide`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pattaya Cost of Living for Digital Nomads',
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    author: { '@type': 'Organization', name: 'NomadReady' },
    publisher: { '@type': 'Organization', name: 'NomadReady' },
    mainEntityOfPage: `https://www.nomadreadyhq.com/${locale}/pattaya-cost-of-living-digital-nomad`,
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
            <Image src="/images/photos/market.jpg" alt="Thailand market spending for remote workers" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-slate-950/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pt-28">
            <Link href={guideUrl} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Pattaya Digital Nomad Guide
            </Link>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              Pattaya Cost of Living for Digital Nomads
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              The useful question is not the cheapest Pattaya month. It is what a productive month
              costs after sleep, work output, transport, food, and entertainment are counted.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={calculatorUrl} className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Open budget calculator
              </Link>
              <Link href={checklistUrl} className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300">
                Run 72-hour test
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-400">Last reviewed: May 8, 2026</p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <section className="grid gap-4 md:grid-cols-3">
            {budgetModes.map(([title, body]) => (
              <div key={title} className="rounded-lg border border-slate-800 bg-slate-900 p-5 max-sm:pr-14">
                <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </section>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 max-w-3xl">
              <section className="prose prose-invert prose-slate max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Quick Verdict</h2>
                <p>
                  Pattaya can be a controlled low-cost beach base, but the budget fails when you
                  optimize rent and ignore recovery, transport, and impulse spending. Track the
                  month as a work system, not a vacation ledger.
                </p>
                <p>
                  Use the built-in <Link href={calculatorUrl}>Thailand budget calculator</Link> for
                  scenario planning, then run the <Link href={checklistUrl}>72-hour checklist</Link>{' '}
                  before extending a booking.
                </p>
              </section>

              <section className="mt-10 space-y-4">
                <h2 className="text-2xl font-bold text-slate-50">Budget Categories</h2>
                {categories.map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
                  </div>
                ))}
              </section>

              <section className="prose prose-invert prose-slate mt-10 max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Where Costs Leak</h2>
                <ul>
                  {leaks.map((leak) => (
                    <li key={leak}>{leak}</li>
                  ))}
                </ul>

                <h2>Sample Productive Month Structure</h2>
                <p>
                  Plan the month around four fixed work nights per week, two flexible evenings, one
                  full recovery day, a default gym or walk routine, and a weekly budget review. If
                  that sounds too rigid, Pattaya will likely become more expensive than expected.
                </p>

                <h2>Bottom Line</h2>
                <p>
                  Pattaya is cheap only when the routine is designed. Start with the{' '}
                  <Link href={checklistUrl}>72-hour test</Link>, then use the calculator to choose
                  a budget mode you can actually maintain.
                </p>

                <h2>Sources and Further Reading</h2>
                <ul>
                  <li><a href="https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469">Tourism Authority of Thailand: Pattaya</a></li>
                  <li><Link href={`/${locale}/thailand/02-cost-of-living`}>NomadReady Thailand Cost of Living</Link></li>
                  <li><Link href={calculatorUrl}>NomadReady Budget Calculator</Link></li>
                  <li><Link href={`/${locale}/pattaya-without-nightlife-trap`}>NomadReady Pattaya Without the Nightlife Trap</Link></li>
                </ul>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <h2 className="text-lg font-semibold text-slate-50">Budget rule</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Track receipts and next-day output. A cheap night that kills tomorrow’s work block
                  is not cheap.
                </p>
                <Link href={calculatorUrl} className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                  Calculate budget
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
