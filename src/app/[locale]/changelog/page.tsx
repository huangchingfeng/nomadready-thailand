import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: "What's New — Guide Updates | NomadReady: Thailand",
  description:
    'See the latest updates to the NomadReady Thailand guide — new chapters, policy changes, tool improvements, and more.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/changelog' },
};

const changelogEntries = [
  {
    month: 'March 2026',
    items: [
      {
        tag: 'Policy Update',
        tagColor: 'bg-amber-500/10 text-amber-400',
        title: 'Cannabis law section updated',
        desc: 'Thailand re-criminalized recreational cannabis as of June 2025. The Safety & Practical Tips chapter now reflects current law and penalties.',
      },
      {
        tag: 'New Feature',
        tagColor: 'bg-cyan-500/10 text-cyan-400',
        title: 'Added EUR, GBP, BRL, AUD to Budget Calculator',
        desc: 'The Budget Calculator now supports six currencies beyond USD, with live exchange rates.',
      },
      {
        tag: 'Content',
        tagColor: 'bg-emerald-500/10 text-emerald-400',
        title: 'Expanded EU and LATAM tax guidance',
        desc: 'Chapter 8 now covers tax obligations for German, French, Spanish, and Brazilian nomads in more detail.',
      },
      {
        tag: 'Correction',
        tagColor: 'bg-purple-500/10 text-purple-400',
        title: 'DTAC references updated to True',
        desc: 'All mentions of DTAC have been updated to True following the 2023 merger with True Corporation.',
      },
    ],
  },
  {
    month: 'February 2026',
    items: [
      {
        tag: 'Launch',
        tagColor: 'bg-cyan-500/10 text-cyan-400',
        title: 'Initial launch of NomadReady: Thailand',
        desc: '11 expert chapters, AI Travel Assistant, Smart Visa Finder, Budget Calculator, and 30-day interactive checklist — all live.',
      },
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Header */}
        <div className="mb-14">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
            What&apos;s New — Guide Updates
          </h1>
          <p className="text-slate-400 text-lg">
            We continuously update the guide as policies change and new information becomes available.
            Here&apos;s what&apos;s changed recently.
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {changelogEntries.map((entry) => (
            <div key={entry.month}>
              {/* Month header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="flex-shrink-0 w-3 h-3 rounded-full bg-cyan-500" />
                <h2 className="text-xl font-semibold text-slate-100">{entry.month}</h2>
              </div>

              {/* Items */}
              <div className="ml-1.5 border-l border-slate-800 pl-8 space-y-6">
                {entry.items.map((item, i) => (
                  <div
                    key={i}
                    className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5"
                  >
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                    <h3 className="text-slate-100 font-semibold mb-1.5">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Subscribe prompt */}
        <div className="mt-16 p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
          <p className="text-slate-300 mb-2">Want to be notified of major updates?</p>
          <p className="text-sm text-slate-500">
            Pro subscribers automatically get email notifications when we update critical content like visa policies.
          </p>
        </div>
      </div>
    </div>
  );
}
