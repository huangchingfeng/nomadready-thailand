import Link from 'next/link';
import Image from 'next/image';

const sections = [
  {
    title: 'Best for monthly budget',
    thailand: '$1,200–2,200/month is realistic for most solo nomads outside luxury mode.',
    bali: '$1,400–2,500/month is realistic if you want decent accommodation in popular areas like Canggu or Ubud.',
  },
  {
    title: 'Best for visa simplicity',
    thailand: 'More mature nomad ecosystem, but visa strategy needs planning and regular policy checks.',
    bali: 'Easy to enter short-term, but long-stay setup often means using agents or switching visa pathways.',
  },
  {
    title: 'Best for work routine',
    thailand: 'Bangkok wins for urban convenience, Chiang Mai for focus, Phuket for island-life balance.',
    bali: 'Great for lifestyle and networking, but commute times and café Wi-Fi quality vary a lot by area.',
  },
  {
    title: 'Best neighborhoods',
    thailand: 'Bangkok (big-city convenience), Chiang Mai (focus + value), Phuket (beach + infrastructure).',
    bali: 'Canggu (social + trendy), Ubud (wellness + quieter), Seminyak (comfort), Sanur (slower pace).',
  },
  {
    title: 'Best for first-time Asia nomads',
    thailand: 'Usually the easier first base because transport, healthcare, and day-to-day infrastructure feel more predictable.',
    bali: 'Amazing lifestyle upside, but setup friction is higher if you dislike traffic, humidity, or fast-rising costs.',
  },
];

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export default function CheatSheetPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-16">
      <div className="mx-auto max-w-5xl">
        {/* Destination photos */}
        <div className="grid grid-cols-2 gap-3 mb-10 rounded-2xl overflow-hidden">
          <div className="relative h-48 md:h-64 overflow-hidden rounded-xl">
            <Image
              src="/images/photos/hero-thailand.jpg"
              alt="Thailand — temples, street food, and vibrant city life"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <span className="text-white font-bold text-lg">🇹🇭 Thailand</span>
            </div>
          </div>
          <div className="relative h-48 md:h-64 overflow-hidden rounded-xl">
            <Image
              src="/images/photos/hero-bali.jpg"
              alt="Bali — rice terraces, surf culture, and vibrant nomad scene"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <span className="text-white font-bold text-lg">🇮🇩 Bali</span>
            </div>
          </div>
        </div>

        <div className="mb-10 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Free cheat sheet</p>
          <h1 className="mb-4 text-3xl font-bold text-[var(--text-primary)] md:text-5xl">
            Thailand vs Bali for digital nomads
          </h1>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] md:text-base">
            A quick decision aid if you&apos;re choosing your next Southeast Asia base. Use this as the fast version,
            then open the full guides when you need neighborhood-level or visa-level detail.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-10">
          <div className="rounded-2xl border border-cyan-500/20 bg-[var(--bg-card)] p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">Thailand</p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Better if you want stronger infrastructure, easier healthcare access, and more city-to-island choice.
            </p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-[var(--bg-card)] p-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">Bali</p>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Better if you want scenery, wellness, community energy, and a lifestyle-first remote work setup.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
              <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">{section.title}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-sm font-semibold text-cyan-400">Thailand</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{section.thailand}</p>
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-amber-400">Bali</p>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{section.bali}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Link
            href="https://nomadready.gumroad.com/l/oiixgr?utm_source=cheat-sheet&utm_medium=site&utm_campaign=lead-magnet"
            className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-center text-sm font-semibold text-amber-300 transition hover:border-amber-400 hover:text-amber-200"
          >
            Open the Bali guide
          </Link>
          <Link
            href="https://nomadready.gumroad.com/l/exdzw?utm_source=cheat-sheet&utm_medium=site&utm_campaign=lead-magnet"
            className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-4 text-center text-sm font-semibold text-cyan-300 transition hover:border-cyan-400 hover:text-cyan-200"
          >
            Get the Thailand + Bali bundle
          </Link>
        </div>
      </div>
    </div>
  );
}
