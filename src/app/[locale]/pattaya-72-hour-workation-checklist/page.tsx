import Image from 'next/image';
import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Pattaya 72-Hour Workation Test Checklist — NomadReady',
  description:
    'A practical 72-hour Pattaya workation checklist for remote workers testing accommodation, WiFi, noise, food, transport, budget, and routine fit.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/pattaya-72-hour-workation-checklist' },
  openGraph: {
    title: 'Pattaya 72-Hour Workation Test Checklist',
    description:
      'Use this checklist before booking a full Pattaya month: room, WiFi, noise, food, transport, spending, and decision rules.',
    url: 'https://www.nomadreadyhq.com/en/pattaya-72-hour-workation-checklist',
    type: 'article',
  },
};

const prepChecks = [
  'Book 5-7 nights only. Do not commit to a full month before the test.',
  'Ask for an in-room WiFi speed test and confirm mobile signal works inside the unit.',
  'Confirm there is a real desk, usable chair, and enough outlets for your work setup.',
  'Scan recent reviews for construction, street noise, thin walls, and elevator problems.',
  'Set one evening budget before arrival and decide which nights are work nights.',
];

const dayCards = [
  {
    title: 'Day 1: Room Reality',
    goal: 'Prove the room can support work before you judge the city.',
    checks: [
      'Run WiFi tests at morning, afternoon, and evening peak time.',
      'Take one real work call from the room or test a call recording.',
      'Sit at the desk for a full 90-minute block and note chair comfort.',
      'Check night noise from hallway, road, nearby venues, and building neighbors.',
      'Walk to the closest grocery, laundry, pharmacy, and two simple meal options.',
    ],
  },
  {
    title: 'Day 2: Work Infrastructure',
    goal: 'Find a backup work plan and a repeatable daily routine.',
    checks: [
      'Test one cafe or coworking-style work block for at least two hours.',
      'Measure door-to-door transport time to Central Pattaya and Jomtien Beach.',
      'Map three default meals: cheap, healthy, and late-night low-damage.',
      'Check gym access, walking route, or beach routine you can repeat.',
      'Track every receipt and separate useful spending from impulse spending.',
    ],
  },
  {
    title: 'Day 3: Area Comparison',
    goal: 'Compare your base against one alternative before extending.',
    checks: [
      'Visit one competing area: Jomtien, Pratumnak, Central, Naklua, or Wong Amat.',
      'Compare morning feel, food access, walkability, ride cost, and noise risk.',
      'Talk to one long-stay visitor, condo staff member, cafe owner, or operator.',
      'Review whether the city improved or weakened your sleep and work output.',
      'Decide whether to extend, move areas, or leave Pattaya as a short test only.',
    ],
  },
];

const scoreRows = [
  ['Sleep', 'Did you sleep 7+ hours without noise, stress, or recovery drag?'],
  ['Work', 'Could you complete two focused blocks and one call without workaround pain?'],
  ['Food', 'Do you have repeatable meals that do not require daily decision fatigue?'],
  ['Transport', 'Can you move around without resenting cost, waiting, or friction?'],
  ['Budget', 'Did spending match the plan after entertainment, rides, cafes, and recovery?'],
  ['Distraction', 'Did the area make good choices easier or harder by default?'],
];

const decisions = [
  {
    label: 'Extend 2-4 weeks',
    body: 'Choose this only if sleep, work, food, and spending all passed. Keep the same area unless one weakness is obvious.',
  },
  {
    label: 'Move areas',
    body: 'Choose this if the city works but the base does not. Jomtien and Pratumnak are usually the first comparison.',
  },
  {
    label: 'Leave after the test',
    body: 'Choose this if the city consistently weakens work output, sleep, or spending discipline. That is useful data.',
  },
];

const faqs = [
  {
    q: 'Is 72 hours enough to test Pattaya for remote work?',
    a: 'It is enough to reject a bad base and identify the biggest risks. It is not enough to prove a perfect month, so extend in stages rather than booking 30 days immediately.',
  },
  {
    q: 'Where should I run the first Pattaya workation test?',
    a: 'Start with Jomtien if you want a simple beach routine. Start with Pratumnak if you want a quieter midpoint. Avoid central zones for the first test unless convenience matters more than sleep.',
  },
  {
    q: 'What is the most important thing to test first?',
    a: 'Test the room first: WiFi, desk, chair, noise, and mobile backup. A good city cannot save a bad remote-work room.',
  },
];

export default async function PattayaChecklistPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const fieldGuideUrl = `/${locale}/thailand/12-pattaya-workation-field-guide`;
  const jomtienUrl = `/${locale}/jomtien-vs-pratumnak`;
  const pattayaGuideUrl = `/${locale}/pattaya-digital-nomad-guide`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Pattaya 72-Hour Workation Test Checklist',
    description:
      'A practical 72-hour Pattaya workation checklist for remote workers testing accommodation, WiFi, noise, food, transport, budget, and routine fit.',
    datePublished: '2026-05-08',
    dateModified: '2026-05-08',
    author: {
      '@type': 'Organization',
      name: 'NomadReady',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NomadReady',
    },
    mainEntityOfPage: `https://www.nomadreadyhq.com/${locale}/pattaya-72-hour-workation-checklist`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article>
        <header className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/photos/coworking.jpg"
              alt="Remote work checklist for a Pattaya workation"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-950/82" />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 pt-24 lg:px-8 lg:pt-28">
            <Link href={`/${locale}/pattaya-workation`} className="text-sm font-medium text-cyan-300 hover:text-cyan-200">
              Pattaya Workation
            </Link>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              Pattaya 72-Hour Workation Test Checklist
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              Use this before booking a full month. The goal is to test the room, the area,
              and your routine fast enough to avoid an expensive wrong base.
            </p>
            <div className="mt-8 max-w-xl rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
              <p className="mb-3 text-sm text-slate-300">
                Get checklist updates and future Pattaya field notes:
              </p>
              <EmailSignupForm
                source="pattaya-72-hour-checklist"
                buttonLabel="Get checklist updates"
                successTitle="You are on the Pattaya checklist list."
                successMessage="Use the checklist below now; future field notes will go to your inbox."
              />
            </div>
            <p className="mt-6 text-sm text-slate-400">Last reviewed: May 8, 2026</p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <section className="grid gap-4 md:grid-cols-3">
            {decisions.map((decision) => (
              <div key={decision.label} className="rounded-lg border border-slate-800 bg-slate-900 p-5 max-sm:pr-14">
                <h2 className="text-lg font-semibold text-slate-100">{decision.label}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{decision.body}</p>
              </div>
            ))}
          </section>

          <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="min-w-0 max-w-3xl">
              <section className="prose prose-invert prose-slate max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Before Arrival</h2>
                <p>
                  Do not treat Pattaya as one decision. Treat it as a field test. Your first 72
                  hours should answer whether the room, area, and city support your actual work week.
                </p>
              </section>

              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-5">
                <ul className="space-y-3">
                  {prepChecks.map((check) => (
                    <li key={check} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <span className="mt-1 h-4 w-4 flex-shrink-0 rounded border border-cyan-400/70" />
                      <span>{check}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <section className="mt-10 space-y-4">
                <h2 className="text-2xl font-bold text-slate-50">The 72-Hour Test</h2>
                {dayCards.map((day) => (
                  <div key={day.title} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <h3 className="text-lg font-semibold text-slate-100">{day.title}</h3>
                    <p className="mt-2 text-sm font-medium text-cyan-300">{day.goal}</p>
                    <ul className="mt-5 space-y-3">
                      {day.checks.map((check) => (
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
                <h2>Score the Base</h2>
                <p>
                  Score each category from 1 to 5. A Pattaya base should not be extended unless
                  sleep, work, and budget all score at least 4.
                </p>
              </section>

              <div className="mt-6 grid gap-4">
                {scoreRows.map(([label, body]) => (
                  <div key={label} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="text-base font-semibold text-slate-100">{label}</h3>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <span
                            key={score}
                            className="flex h-7 w-7 items-center justify-center rounded-md border border-slate-700 text-xs text-slate-400"
                          >
                            {score}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{body}</p>
                  </div>
                ))}
              </div>

              <section className="prose prose-invert prose-slate mt-10 max-w-none prose-a:text-cyan-300 prose-strong:text-slate-100">
                <h2>Decision Rule</h2>
                <p>
                  Extend only when the base supports the week you actually need. If the room fails,
                  move rooms. If the area fails, compare{' '}
                  <Link href={jomtienUrl}>Jomtien vs Pratumnak</Link>. If the city fails, leave
                  without treating the test as a mistake.
                </p>
                <p>
                  For the full area matrix and work-first Pattaya framework, use the free{' '}
                  <Link href={fieldGuideUrl}>Pattaya Workation Field Guide</Link>.
                </p>

                <h2>Sources and Further Reading</h2>
                <ul>
                  <li>
                    <a href="https://www.tourismthailand.org/Destinations/Provinces/Pattaya/469">
                      Tourism Authority of Thailand: Pattaya
                    </a>
                  </li>
                  <li>
                    <Link href={pattayaGuideUrl}>NomadReady Pattaya Digital Nomad Guide</Link>
                  </li>
                  <li>
                    <Link href={jomtienUrl}>NomadReady Jomtien vs Pratumnak Comparison</Link>
                  </li>
                </ul>
              </section>
            </div>

            <aside className="lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-5">
                <h2 className="text-lg font-semibold text-slate-50">Pass threshold</h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Extend only if sleep, work, and budget each score 4 or higher after the first
                  three days.
                </p>
                <Link
                  href={fieldGuideUrl}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Open field guide
                </Link>
              </div>

              <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  FAQ
                </h2>
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
