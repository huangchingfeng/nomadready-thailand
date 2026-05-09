import Image from 'next/image';
import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Pattaya Workation Field Guide — NomadReady',
  description:
    'A free city field guide for digital nomads testing Pattaya as a long-stay beach base: areas, work routines, costs, and nightlife-aware budget rules.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/pattaya-workation' },
};

const areas = [
  {
    name: 'Jomtien',
    bestFor: 'lowest-friction beach routine',
    signal: 'Better for mornings, walking, calmer nights, and value condos.',
  },
  {
    name: 'Pratumnak',
    bestFor: 'balanced long-stay base',
    signal: 'A quieter midpoint between Jomtien and Central Pattaya.',
  },
  {
    name: 'Central Pattaya',
    bestFor: 'short stays and field research',
    signal: 'Maximum convenience, but noise and impulse spending need rules.',
  },
  {
    name: 'Naklua / Wong Amat',
    bestFor: 'quieter upscale beach life',
    signal: 'Better sleep and nicer buildings, often with higher daily costs.',
  },
];

const rules = [
  'Choose your area based on the morning you want, not the night you imagine.',
  'Book accommodation you can actually work from: desk, chair, WiFi, and quiet matter.',
  'Track the next-day cost of nightlife, not just the receipt.',
  'Use Pattaya as fieldwork: interview long-stay visitors, test cafes, and map routines.',
];

export default async function PattayaWorkationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const guideUrl = `/${locale}/thailand/12-pattaya-workation-field-guide`;
  const checklistUrl = `/${locale}/pattaya-72-hour-workation-checklist`;

  return (
    <main className="min-h-screen bg-slate-950">
      <section className="relative min-h-[620px] overflow-hidden">
        <Image
          src="/images/photos/remote-work.jpg"
          alt="Remote work setup for a Thailand workation"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end px-6 pb-14 pt-24 lg:px-8">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Free NomadReady city field guide
            </p>
            <h1 className="text-4xl font-bold leading-tight text-slate-50 md:text-6xl">
              Pattaya can be a workation base if you design the routine first.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              A practical guide for remote workers testing Pattaya for 2 weeks to 3 months:
              where to stay, how to work, how to control costs, and how to avoid letting nightlife
              turn a cheap beach city into an expensive blur.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={checklistUrl}
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Use the 72-hour checklist
              </Link>
              <Link
                href={guideUrl}
                className="inline-flex items-center justify-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300"
              >
                Read the free field guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/70">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 md:grid-cols-4 lg:px-8">
          <div>
            <p className="text-3xl font-bold text-slate-50">5</p>
            <p className="mt-1 text-sm text-slate-400">areas compared for workation use</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-50">72h</p>
            <p className="mt-1 text-sm text-slate-400">fieldwork plan for your first test stay</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-50">30d</p>
            <p className="mt-1 text-sm text-slate-400">long-stay budget and routine frame</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-slate-50">0</p>
            <p className="mt-1 text-sm text-slate-400">romanticized nightlife advice</p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Why Pattaya
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-50">
              The city most nomad guides skip is also one of the most useful to study.
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400">
              Pattaya has beach access, lower costs than Phuket, a huge long-stay foreigner base,
              strong daily infrastructure, and enough distraction to punish weak planning. That makes
              it a perfect test case for NomadReady&apos;s city field guide format.
            </p>
            <Link
              href={`/${locale}/pattaya-digital-nomad-guide`}
              className="mt-6 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Read the full Pattaya digital nomad guide →
            </Link>
            <Link
              href={checklistUrl}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Run the 72-hour workation test →
            </Link>
            <Link
              href={`/${locale}/jomtien-vs-pratumnak`}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Compare Jomtien vs Pratumnak →
            </Link>
            <Link
              href={`/${locale}/pattaya-vs-phuket-digital-nomad`}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Compare Pattaya vs Phuket →
            </Link>
            <Link
              href={`/${locale}/pattaya-cost-of-living-digital-nomad`}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Estimate Pattaya cost of living →
            </Link>
            <Link
              href={`/${locale}/pattaya-without-nightlife-trap`}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Avoid the nightlife budget trap →
            </Link>
            <Link
              href={`/${locale}/thailand-beach-workation`}
              className="mt-3 inline-flex text-sm font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Compare Thailand beach workation bases →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <div key={area.name} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="text-lg font-semibold text-slate-100">{area.name}</h3>
                <p className="mt-2 text-sm font-medium text-cyan-300">{area.bestFor}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{area.signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              What the guide gives you
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-50">
              A work-first framework for a city that keeps trying to make you a tourist.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {rules.map((rule, index) => (
              <div key={rule} className="flex gap-4 rounded-lg border border-slate-800 bg-slate-950 p-5">
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-cyan-400 text-sm font-bold text-slate-950">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-slate-300">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-lg border border-cyan-500/30 bg-cyan-500/5 p-8 md:grid-cols-[1fr_0.9fr] md:p-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-50">
              Get the free guide, then use it as a fieldwork checklist.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              The Pattaya chapter is free. Use it before booking your area, during your first 72 hours,
              and after the trip to decide whether Pattaya deserves a real month.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href={checklistUrl}
                className="inline-flex items-center justify-center rounded-lg bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Use the checklist
              </Link>
              <Link
                href={guideUrl}
                className="inline-flex items-center justify-center rounded-lg border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-300"
              >
                Open the field guide
              </Link>
            </div>
          </div>
          <div className="rounded-lg bg-slate-950/80 p-5">
            <p className="mb-3 text-sm text-slate-400">
              Get the free Thailand vs Bali cheat sheet and future city field guide updates:
            </p>
            <EmailSignupForm source="pattaya-workation" />
          </div>
        </div>
      </section>
    </main>
  );
}
