'use client';

import { useState } from 'react';
import { track } from '@vercel/analytics';
import { getStoredAttribution } from '@/components/analytics/AttributionTracker';

type EmailSignupFormProps = {
  source?: string;
  compact?: boolean;
  buttonLabel?: string;
  successTitle?: string;
  successMessage?: string;
};

const KIT_SEQUENCE_ID = '2685295';
const KIT_API_URL = `https://api.convertkit.com/v3/sequences/${KIT_SEQUENCE_ID}/subscribe`;
const KIT_API_KEY = '7ttdxWfRmWRMUcUUcuYokA';

export default function EmailSignupForm({
  source = 'homepage',
  compact = false,
  buttonLabel = 'Get the free cheat sheet',
  successTitle = 'Check your inbox!',
  successMessage = 'Your free cheat sheet is on the way.',
}: EmailSignupFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const attribution = getStoredAttribution();
      track('email_signup_submit', {
        source,
        landing_path: attribution.landing_path || '',
        utm_source: attribution.utm_source || '',
        utm_medium: attribution.utm_medium || '',
        utm_campaign: attribution.utm_campaign || '',
      });

      const res = await fetch(KIT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          fields: {
            source,
            landing_path: attribution.landing_path || '',
            referrer: attribution.referrer || '',
            captured_at: attribution.captured_at || '',
            utm_source: attribution.utm_source || '',
            utm_medium: attribution.utm_medium || '',
            utm_campaign: attribution.utm_campaign || '',
            utm_content: attribution.utm_content || '',
            utm_term: attribution.utm_term || '',
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
        localStorage.setItem('nomadready_email', email);
        track('email_signup_success', {
          source,
          landing_path: attribution.landing_path || '',
          utm_source: attribution.utm_source || '',
          utm_medium: attribution.utm_medium || '',
          utm_campaign: attribution.utm_campaign || '',
        });
      } else {
        setStatus('error');
        track('email_signup_error', { source, reason: 'api_response' });
      }
    } catch {
      setStatus('error');
      track('email_signup_error', { source, reason: 'network' });
    }
  }

  if (status === 'success') {
    return (
      <div className={compact ? 'text-center py-3' : 'text-center py-6 max-w-xl'}>
        <p className="text-cyan-400 font-semibold">{successTitle}</p>
        <p className="text-sm text-[var(--text-secondary)] mt-1">{successMessage}</p>
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
        {status === 'loading' ? 'Sending...' : buttonLabel}
      </button>

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  );
}
