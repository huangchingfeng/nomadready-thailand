'use client';

import { useState } from 'react';

type EmailSignupFormProps = {
  source?: string;
  compact?: boolean;
};

const KIT_SEQUENCE_ID = '2685295';
const KIT_API_URL = `https://api.convertkit.com/v3/sequences/${KIT_SEQUENCE_ID}/subscribe`;
const KIT_API_KEY = '7ttdxWfRmWRMUcUUcuYokA';

export default function EmailSignupForm({ source = 'homepage', compact = false }: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch(KIT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          fields: { source },
        }),
      });

      if (res.ok) {
        setStatus('success');
        localStorage.setItem('nomadready_email', email);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={compact ? 'text-center py-3' : 'text-center py-6 max-w-xl'}>
        <p className="text-cyan-400 font-semibold">✅ Check your inbox!</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">Your free cheat sheet is on the way.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={compact ? 'flex flex-col sm:flex-row gap-3' : 'flex flex-col sm:flex-row gap-3 max-w-xl'}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
      />

      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-50"
      >
        {status === 'loading' ? 'Sending...' : 'Get the free cheat sheet'}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
