type EmailSignupFormProps = {
  source?: string;
  compact?: boolean;
};

const FORM_ACTION = 'https://formsubmit.co/nikeshoxmiles@gmail.com';
const NEXT_URL = 'https://nomadready-thailand.vercel.app/subscribe/success';

export default function EmailSignupForm({ source = 'homepage', compact = false }: EmailSignupFormProps) {
  return (
    <form
      action={FORM_ACTION}
      method="POST"
      className={compact ? 'flex flex-col sm:flex-row gap-3' : 'flex flex-col sm:flex-row gap-3 max-w-xl'}
    >
      <input type="hidden" name="_subject" value={`NomadReady signup (${source})`} />
      <input type="hidden" name="_next" value={NEXT_URL} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="source" value={source} />

      <input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      />

      <button
        type="submit"
        className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Get the free cheat sheet
      </button>
    </form>
  );
}
