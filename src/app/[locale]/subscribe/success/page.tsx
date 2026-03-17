import Link from 'next/link';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export default function SubscribeSuccessPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] px-4 py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-12">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
          You&apos;re in
        </p>
        <h1 className="mb-4 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
          Check your inbox, then grab the cheat sheet
        </h1>
        <p className="mb-8 text-base leading-relaxed text-[var(--text-secondary)]">
          If this is your first time using the signup form, FormSubmit may send a confirmation email first.
          Once confirmed, future signups will land directly in the NomadReady inbox.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/cheat-sheet"
            className="rounded-2xl bg-cyan-500 px-5 py-4 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Open the free cheat sheet
          </Link>
          <Link
            href="/pricing"
            className="rounded-2xl border border-[var(--border)] px-5 py-4 text-center text-sm font-semibold text-[var(--text-primary)] transition hover:border-cyan-500/50 hover:text-cyan-400"
          >
            See full guides pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
