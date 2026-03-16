'use client';

import { useState } from 'react';

interface EmailGateProps {
  chapterTitle: string;
  onUnlock: () => void;
}

export default function EmailGate({ chapterTitle, onUnlock }: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Send to FormSubmit
      await fetch('https://formsubmit.co/ajax/nikeshoxmiles@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          email,
          source: 'email-gate',
          chapter: chapterTitle,
          timestamp: new Date().toISOString(),
        }),
      });

      // Store in localStorage
      localStorage.setItem('nomadready_email', email);
      onUnlock();
    } catch {
      // Still unlock even if FormSubmit fails
      localStorage.setItem('nomadready_email', email);
      onUnlock();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mt-8">
      {/* Blur overlay gradient */}
      <div className="absolute -top-32 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--bg-primary)] z-10 pointer-events-none" />

      {/* Gate card */}
      <div className="relative z-20 bg-[var(--bg-card)]/80 backdrop-blur-sm border border-[var(--border)] rounded-xl p-8 md:p-12 text-center transition-colors duration-200">
        {/* Email icon */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
          Keep reading — just enter your email
        </h3>
        <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
          &ldquo;{chapterTitle}&rdquo; is free with email signup.
          Get instant access plus weekly nomad tips and updates.
        </p>

        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25 disabled:opacity-50"
            >
              {loading ? '...' : 'Unlock'}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        </form>

        <p className="mt-4 text-xs text-[var(--text-muted)]">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>

        {/* What they get */}
        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            3 more free chapters
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Weekly tips
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Policy alerts
          </span>
        </div>
      </div>
    </div>
  );
}
