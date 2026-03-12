import type { Metadata } from 'next';
import Link from 'next/link';
import ChecklistWrapper from './ChecklistWrapper';

export const metadata: Metadata = {
  title: '30-Day Action Checklist — NomadReady: Thailand',
  description: 'Interactive step-by-step checklist from pre-departure to fully settled in Thailand. Track your progress and never miss a thing.',
};

export default function ChecklistPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/tools" className="hover:text-slate-300 transition-colors">Tools</Link>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-300">30-Day Checklist</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-3">30-Day Action Checklist</h1>
          <p className="text-slate-400">
            Your step-by-step plan from pre-departure to fully settled in Thailand.
          </p>
        </div>

        {/* Tool component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <ChecklistWrapper />
        </div>
      </div>
    </div>
  );
}
