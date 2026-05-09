import Image from 'next/image';
import Link from 'next/link';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Pattaya Without the Nightlife Trap — Budget and Routine Rules',
  description:
    'A practical remote-worker guide to Pattaya nightlife budgeting: sleep protection, cash rules, one-venue rule, recovery cost, and low-damage evenings.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/pattaya-without-nightlife-trap' },
};

const rules = [
  ['Cash ceiling', 'Set one entertainment budget before leaving the room. No ATM resets after the night starts.'],
  ['One venue rule', 'Choose one place or one plan. Venue-hopping is where budgets and sleep schedules break.'],
  ['Pay as you go', 'Avoid running tabs. The point is visibility, not austerity.'],
  ['No decisions after midnight', 'No bookings, no extensions, no new plans, no “just one more” logistics.'],
  ['Next-day accounting', 'Write down sleep hours, work output, and recovery cost the next morning.'],
];

const alternatives = [
  'Jomtien beach walk plus simple dinner.',
  'Gym, sauna, massage, early sleep.',
  'Koh Larn day trip planned as a weekend activity, not a work-night escape.',
  'Cafe work block followed by one planned drink and a fixed ride home.',
  'Pratumnak or Naklua dinner route instead of central nightlife default.',
];

const faqs = [
  {
    q: 'Can Pattaya work without nightlife?',
    a: 'Yes, but the base matters. Jomtien, Pratumnak, and Naklua make it easier to keep nightlife optional instead of default.',
  },
  {
    q: 'What is the safest budget rule?',
    a: 'Use a cash ceiling and no ATM reset after the night starts. The exact amount is personal; the key is deciding before the environment changes your decision-making.',
  },
  {
    q: 'Should remote workers avoid Central Pattaya?',
    a: 'Not always. Central is convenient, but for a first workation test it adds noise and impulse risk. Start elsewhere unless convenience is the priority.',
  },
];

export default async function PattayaNightlifePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const checklistUrl = `/${locale}/pattaya-72-hour-workation-checklist`;
  const jomtienUrl = `/${locale}/jomtien-vs-pratumnak`;
  const guideUrl = `/${locale}/pattaya-digital-nomad-guide`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pattaya Without the Nightlife Trap',
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    author: { '@type': 'Organization', name: 'NomadReady' },
    publisher: { '@type': 'Organization', name: 'NomadReady' },
    mainEntityOfPage: `https://www.nomadreadyhq.com/${locale}/pattaya-without-nightlife-trap`,
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/photos/bangkok-skyline.jpg" alt="Thailand city evening budgeting for remote workers" fill priority className="object-cover" />
            <div className="absolute inset-0 bg-slate-950/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pt-28">
            <Link href={guideUrl} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Pattaya Digital Nomad Guide
            </Link>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              Pattaya Without the Nightlife Trap
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              This is not moral advice. It is productivity accounting for remote workers who want
              Pattaya beach life without letting evenings spend tomorrow’s work output.
            </p>
            <p className="mt-6 text-sm text-slate-400">Last reviewed: May 8, 2026</p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 max-w-3xl">
              <section className="prose prose-invert prose-slate max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Quick Verdict</h2>
                <p>
                  Pattaya becomes expensive when nights are unplanned. The solution is not pretending
                  entertainment does not exist. It is making entertainment a controlled line item,
                  then measuring sleep and work output the next day.
                </p>
                <p>
                  If you are choosing a base now, compare <Link href={jomtienUrl}>Jomtien vs Pratumnak</Link>{' '}
                  and run the <Link href={checklistUrl}>72-hour checklist</Link> before extending.
                  For monthly planning, use the{' '}
                  <Link href={`/${locale}/pattaya-cost-of-living-digital-nomad`}>
                    Pattaya cost of living guide
                  </Link>
                  .
                </p>
              </section>

              <section className="mt-10 space-y-4">
                <h2 className="text-2xl font-bold text-slate-50">Five Rules</h2>
                {rules.map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
                  </div>
                ))}
              </section>

              <section className="prose prose-invert prose-slate mt-10 max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Low-Damage Evening Alternatives</h2>
                <ul>
                  {alternatives.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h2>When to Stay in Jomtien Instead</h2>
                <p>
                  If central Pattaya turns every evening into negotiation, move the default base
                  further away. Jomtien is not perfect, but it makes a boring productive morning
                  easier to protect.
                </p>
                <h2>Bottom Line</h2>
                <p>
                  The goal is not to remove fun. It is to stop fun from quietly becoming the most
                  expensive category in the month.
                </p>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <h2 className="text-lg font-semibold text-slate-50">Control rule</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Decide the night before the night starts. Do not let the city make the decision
                  after midnight.
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
