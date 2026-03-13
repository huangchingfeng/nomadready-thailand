import Link from 'next/link';
import EmailSignupForm from '@/components/ui/EmailSignupForm';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 md:p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-2">
                Free update list
              </p>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Want updates before you book your next base?
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Join the NomadReady list for the free Thailand vs Bali cheat sheet, pricing updates, and new country launches.
              </p>
            </div>
            <div className="w-full lg:max-w-xl">
              <EmailSignupForm source="footer" compact />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-lg font-bold text-[var(--text-primary)]">
              Nomad<span className="text-cyan-500">Ready</span>
            </Link>
            <span className="text-xs text-[var(--text-muted)]">|</span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[var(--bg-secondary)] text-xs text-[var(--text-muted)] font-medium">
              Updated March 2026
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <Link href="/privacy" className="hover:text-[var(--text-primary)] transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[var(--text-primary)] transition-colors">
              Terms
            </Link>
            <Link href="/changelog" className="hover:text-[var(--text-primary)] transition-colors">
              What&apos;s New
            </Link>
            <a
              href="mailto:hello@nomadready.com"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-[var(--border)] text-center">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; 2026 NomadReady. All rights reserved. Not affiliated with any government or visa agency.
          </p>
        </div>
      </div>
    </footer>
  );
}
