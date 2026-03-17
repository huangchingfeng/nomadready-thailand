import type { Metadata } from 'next';
import Link from 'next/link';
import BudgetCalculatorWrapper from './BudgetCalculatorWrapper';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Budget Calculator — NomadReady: Thailand',
  description: 'Choose your city and lifestyle level. See exact monthly cost breakdowns for Bangkok, Chiang Mai, Phuket, Pattaya, and Koh Samui.',
};

export default function BudgetCalculatorPage() {
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
            <span className="text-slate-300">Budget Calculator</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-3">Budget Calculator</h1>
          <p className="text-slate-400">
            Choose your city and lifestyle. See exactly what Thailand costs per month.
          </p>
        </div>

        {/* Tool component */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8">
          <BudgetCalculatorWrapper />
        </div>
      </div>
    </div>
  );
}
