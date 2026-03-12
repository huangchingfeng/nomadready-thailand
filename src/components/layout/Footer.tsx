import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border)] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
