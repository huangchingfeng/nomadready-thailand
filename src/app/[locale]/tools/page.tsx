import Link from 'next/link';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export const metadata = {
  title: 'Tools — NomadReady: Thailand',
  description: 'Interactive tools for digital nomads: Smart Visa Finder, Budget Calculator, 30-Day Checklist, and Currency Converter.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/tools' },
};

const tools = [
  {
    slug: 'visa-finder',
    title: 'Smart Visa Finder',
    description:
      'Answer a few questions about your nationality, income, and plans. Get personalized visa recommendations with step-by-step application guides.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
      </svg>
    ),
    color: 'emerald',
    isFree: false,
  },
  {
    slug: 'budget-calculator',
    title: 'Budget Calculator',
    description:
      'Choose your city (Bangkok, Chiang Mai, Phuket, Pattaya, or Koh Samui) and lifestyle level. See exact monthly cost breakdowns by category.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
      </svg>
    ),
    color: 'amber',
    isFree: false,
  },
  {
    slug: 'checklist',
    title: '30-Day Action Checklist',
    description:
      'Interactive step-by-step checklist from pre-departure to fully settled. Track your progress, mark tasks complete, and never miss a thing.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'purple',
    isFree: false,
  },
  {
    slug: null, // Not a separate page — just info
    title: 'Currency Converter',
    description:
      'Quick THB to USD/EUR/GBP conversions. See real-time exchange rates and understand what things actually cost in your home currency.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'cyan',
    isFree: true,
  },
];

export default function ToolsPage() {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    emerald: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-500',
      border: 'hover:border-emerald-500/50',
    },
    amber: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-500',
      border: 'hover:border-amber-500/50',
    },
    purple: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-500',
      border: 'hover:border-purple-500/50',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-500',
      border: 'hover:border-cyan-500/50',
    },
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Interactive Tools
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Don&apos;t just read about Thailand. Use our AI-powered tools to get personalized answers.
          </p>
        </div>
      </section>

      {/* Tool cards */}
      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {tools.map((tool, i) => {
              const colors = colorMap[tool.color];
              const CardWrapper = tool.slug
                ? ({ children }: { children: React.ReactNode }) => (
                    <Link href={`/tools/${tool.slug}`} className="block">
                      {children}
                    </Link>
                  )
                : ({ children }: { children: React.ReactNode }) => <>{children}</>;

              return (
                <CardWrapper key={i}>
                  <div
                    className={`group bg-slate-800 border border-slate-700 rounded-xl p-8 transition-all duration-200 h-full ${colors.border}`}
                  >
                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${colors.bg}`}
                      >
                        <span className={colors.text}>{tool.icon}</span>
                      </div>
                      {tool.isFree ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                          Free
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Pro
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold text-slate-100 mb-3">{tool.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    {tool.slug ? (
                      <span className="inline-flex items-center gap-1.5 text-sm text-cyan-500 group-hover:text-cyan-400 font-medium transition-colors">
                        Try it
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                        Available in all chapters
                      </span>
                    )}
                  </div>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
