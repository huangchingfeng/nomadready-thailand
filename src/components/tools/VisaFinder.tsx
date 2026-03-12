'use client';

import { useState, useCallback } from 'react';

// --- Types ---
type Nationality =
  | 'American' | 'British' | 'German' | 'French' | 'Australian'
  | 'Canadian' | 'Japanese' | 'Korean' | 'Taiwanese' | 'Brazilian'
  | 'Indian' | 'Chinese' | 'Other';

type StayDuration = '1-2 months' | '3-6 months' | '6-12 months' | '1+ year';
type Purpose = 'Remote work' | 'Freelance' | 'Tourism + work' | 'Study + work';
type VisaBudget = 'low' | 'medium' | 'high';

interface FormData {
  nationality: Nationality | '';
  income: number;
  duration: StayDuration | '';
  purpose: Purpose | '';
  budget: VisaBudget | '';
}

type IncomeCurrency = 'USD' | 'EUR' | 'GBP' | 'BRL';

const INCOME_CURRENCY_TO_USD: Record<IncomeCurrency, number> = {
  USD: 1,
  EUR: 1.09,
  GBP: 1.26,
  BRL: 0.19,
};

const INCOME_CURRENCY_SYMBOLS: Record<IncomeCurrency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  BRL: 'R$',
};

const INCOME_CURRENCIES: IncomeCurrency[] = ['USD', 'EUR', 'GBP', 'BRL'];

interface VisaRecommendation {
  name: string;
  cost: string;
  duration: string;
  requirement: string;
  verdict: string;
  isPrimary: boolean;
  warning?: string;
}

// --- Constants ---
const NATIONALITIES: Nationality[] = [
  'American', 'British', 'German', 'French', 'Australian',
  'Canadian', 'Japanese', 'Korean', 'Taiwanese', 'Brazilian',
  'Indian', 'Chinese', 'Other',
];

const VISA_EXEMPT_NATIONALITIES: Nationality[] = [
  'American', 'British', 'German', 'French', 'Australian',
  'Canadian', 'Japanese', 'Korean', 'Taiwanese',
];

const STAY_DURATIONS: StayDuration[] = ['1-2 months', '3-6 months', '6-12 months', '1+ year'];

const PURPOSES: Purpose[] = ['Remote work', 'Freelance', 'Tourism + work', 'Study + work'];

const BUDGET_OPTIONS: { value: VisaBudget; label: string }[] = [
  { value: 'low', label: 'Low (under $500)' },
  { value: 'medium', label: 'Medium ($500-$2,000)' },
  { value: 'high', label: 'High ($2,000+)' },
];

const STEPS = ['Nationality', 'Income', 'Duration', 'Purpose', 'Budget'] as const;

// --- Component ---
export default function VisaFinder() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    nationality: '',
    income: 50000,
    duration: '',
    purpose: '',
    budget: '',
  });
  const [incomeCurrency, setIncomeCurrency] = useState<IncomeCurrency>('USD');
  const [showResults, setShowResults] = useState(false);

  // Convert displayed income to USD for internal logic
  const incomeInUSD = Math.round(form.income * INCOME_CURRENCY_TO_USD[incomeCurrency]);

  const isVisaExempt = VISA_EXEMPT_NATIONALITIES.includes(form.nationality as Nationality);

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 0: return form.nationality !== '';
      case 1: return form.income >= 0;
      case 2: return form.duration !== '';
      case 3: return form.purpose !== '';
      case 4: return form.budget !== '';
      default: return false;
    }
  }, [step, form]);

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    setForm({ nationality: '', income: 50000, duration: '', purpose: '', budget: '' });
    setIncomeCurrency('USD');
    setStep(0);
    setShowResults(false);
  };

  const getRecommendations = (): VisaRecommendation[] => {
    const results: VisaRecommendation[] = [];
    const { duration, budget } = form;
    const income = incomeInUSD; // Use USD-converted income for all logic
    const isShort = duration === '1-2 months';
    const isMedium = duration === '3-6 months' || duration === '6-12 months';
    const isLong = duration === '6-12 months' || duration === '1+ year';

    // Primary recommendation logic
    if (income >= 80000 && isLong) {
      results.push({
        name: 'LTR Visa (Long-Term Resident)',
        cost: '$1,500-$3,000 (application + processing)',
        duration: '10 years',
        requirement: 'Income $80,000+/year or $250,000+ in assets',
        verdict: 'Best for high earners wanting long-term stability with tax benefits.',
        isPrimary: true,
      });
    } else if (income >= 40000 && (isMedium || isLong)) {
      results.push({
        name: 'DTV Visa (Destination Thailand Visa)',
        cost: '10,000 THB (~$285)',
        duration: '5 years (180-day stays, extendable)',
        requirement: 'Proof of remote work or digital nomad activity',
        verdict: 'Best value for mid-income remote workers. The go-to nomad visa.',
        isPrimary: true,
        warning: income < 60000
          ? 'DTV requires proof of 500,000 THB (~$14,000) in bank statements for the past 3 months. Make sure you can meet this requirement.'
          : undefined,
      });
    } else if (budget === 'high') {
      results.push({
        name: 'Thailand Elite Visa',
        cost: '600,000-2,000,000 THB ($17,000-$57,000)',
        duration: '5-20 years',
        requirement: 'Payment only. No income or work requirements.',
        verdict: 'Maximum convenience. Skip all bureaucracy with VIP treatment.',
        isPrimary: true,
      });
    } else if (isShort && isVisaExempt) {
      results.push({
        name: 'Visa Exemption (Visa-Free Entry)',
        cost: 'Free',
        duration: '30-60 days (extendable to 90 days)',
        requirement: `${form.nationality} passport holders get visa-free entry`,
        verdict: 'Easiest option for short stays. Extend at immigration for 1,900 THB.',
        isPrimary: true,
      });
    } else if (income < 40000 && isLong) {
      results.push({
        name: 'Education Visa (ED Visa)',
        cost: '2,000-5,000 THB (~$60-$140) + school fees',
        duration: '1 year (renewable)',
        requirement: 'Enroll in Thai language school or university program',
        verdict: 'Budget-friendly way to stay long-term while learning Thai.',
        isPrimary: true,
      });
    } else {
      results.push({
        name: 'Tourist Visa (TR Visa)',
        cost: '1,000-2,000 THB (~$30-$60)',
        duration: '60 days (extendable to 90 days)',
        requirement: 'Apply at Thai embassy/consulate before arrival',
        verdict: 'Good starting point if you want more time than visa exemption.',
        isPrimary: true,
      });
    }

    // Alternative recommendations
    if (!results.find(r => r.name.includes('DTV')) && income >= 30000 && !isShort) {
      results.push({
        name: 'DTV Visa (Destination Thailand Visa)',
        cost: '10,000 THB (~$285)',
        duration: '5 years (180-day stays, extendable)',
        requirement: 'Proof of remote work or digital nomad activity',
        verdict: 'Popular choice for nomads. Flexible and affordable.',
        isPrimary: false,
        warning: income < 60000
          ? 'DTV requires proof of 500,000 THB (~$14,000) in bank statements for the past 3 months. Make sure you can meet this requirement.'
          : undefined,
      });
    }

    if (!results.find(r => r.name.includes('LTR')) && income >= 60000) {
      results.push({
        name: 'LTR Visa (Long-Term Resident)',
        cost: '$1,500-$3,000',
        duration: '10 years',
        requirement: 'Income $80,000+/year — you may qualify soon',
        verdict: 'Consider if your income grows. Includes a 17% flat tax rate.',
        isPrimary: false,
      });
    }

    if (!results.find(r => r.name.includes('Elite')) && budget !== 'low') {
      results.push({
        name: 'Thailand Elite Visa',
        cost: '600,000+ THB ($17,000+)',
        duration: '5-20 years',
        requirement: 'Payment only',
        verdict: 'The "money solves everything" option. Airport limo included.',
        isPrimary: false,
      });
    }

    if (!results.find(r => r.name.includes('Education')) && isLong && income < 60000) {
      results.push({
        name: 'Education Visa (ED Visa)',
        cost: '~$60-$140 + school fees ($500-$2,000/yr)',
        duration: '1 year (renewable)',
        requirement: 'Enroll in a Thai language or Muay Thai program',
        verdict: 'Learn Thai while living legally long-term.',
        isPrimary: false,
      });
    }

    if (isShort && isVisaExempt && !results.find(r => r.name.includes('Visa Exemption'))) {
      results.push({
        name: 'Visa Exemption',
        cost: 'Free',
        duration: '30-60 days',
        requirement: `${form.nationality} passport — visa-free entry`,
        verdict: 'Try Thailand first, commit to a longer visa later.',
        isPrimary: false,
      });
    }

    return results;
  };

  const needsVisaWarning = !isVisaExempt && form.nationality !== '';

  // --- Step renderers ---
  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-slate-100">
              What is your nationality?
            </label>
            <select
              value={form.nationality}
              onChange={(e) => setForm({ ...form, nationality: e.target.value as Nationality })}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-all duration-200"
            >
              <option value="">Select nationality...</option>
              {NATIONALITIES.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {needsVisaWarning && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-amber-300 text-sm">
                <span className="font-semibold">Note:</span> {form.nationality} passport holders are NOT eligible for visa-free entry to Thailand. You will need to obtain a visa before arrival.
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-slate-100">
              What is your annual income?
            </label>

            {/* Currency selector */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-400">Currency:</span>
              <div className="inline-flex rounded-lg border border-slate-700 overflow-hidden">
                {INCOME_CURRENCIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setIncomeCurrency(c)}
                    className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                      incomeCurrency === c
                        ? 'bg-cyan-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={Math.round(200000 / INCOME_CURRENCY_TO_USD[incomeCurrency])}
                step={Math.round(5000 / INCOME_CURRENCY_TO_USD[incomeCurrency])}
                value={form.income}
                onChange={(e) => setForm({ ...form, income: parseInt(e.target.value) })}
                className="flex-1 accent-cyan-500 h-2"
              />
              <span className="text-cyan-400 font-mono text-lg font-semibold min-w-[120px] text-right">
                {INCOME_CURRENCY_SYMBOLS[incomeCurrency]}{form.income >= Math.round(200000 / INCOME_CURRENCY_TO_USD[incomeCurrency]) ? `${Math.round(200000 / INCOME_CURRENCY_TO_USD[incomeCurrency]).toLocaleString()}+` : form.income.toLocaleString()}
              </span>
            </div>
            <input
              type="number"
              min={0}
              max={Math.round(500000 / INCOME_CURRENCY_TO_USD[incomeCurrency])}
              value={form.income}
              onChange={(e) => setForm({ ...form, income: Math.max(0, parseInt(e.target.value) || 0) })}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-all duration-200"
              placeholder={`Enter exact amount in ${incomeCurrency}...`}
            />
            {incomeCurrency !== 'USD' && (
              <p className="text-xs text-slate-500">
                ≈ ${incomeInUSD.toLocaleString()} USD (auto-converted for visa requirements)
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-slate-100">
              How long do you plan to stay?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {STAY_DURATIONS.map((d) => (
                <button
                  key={d}
                  onClick={() => setForm({ ...form, duration: d })}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    form.duration === d
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-slate-100">
              What is your main purpose?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PURPOSES.map((p) => (
                <button
                  key={p}
                  onClick={() => setForm({ ...form, purpose: p })}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    form.purpose === p
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-slate-100">
              What is your budget for visa costs?
            </label>
            <div className="grid grid-cols-1 gap-3">
              {BUDGET_OPTIONS.map((b) => (
                <button
                  key={b.value}
                  onClick={() => setForm({ ...form, budget: b.value })}
                  className={`p-4 rounded-lg border text-left transition-all duration-200 ${
                    form.budget === b.value
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        );
    }
  };

  const recommendations = showResults ? getRecommendations() : [];
  const primary = recommendations.find((r) => r.isPrimary);
  const alternatives = recommendations.filter((r) => !r.isPrimary);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          Thailand Visa Finder
        </h2>
        <p className="text-slate-400">
          Answer 5 quick questions and we will recommend the best visa for your situation.
        </p>
      </div>

      {/* Progress bar */}
      {!showResults && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-400 mb-2">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`transition-all duration-200 ${
                  i <= step ? 'text-cyan-400 font-semibold' : ''
                }`}
              >
                {s}
              </span>
            ))}
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Form */}
      {!showResults && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
          <div className="min-h-[180px]">
            {renderStep()}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                step === 0
                  ? 'text-slate-600 cursor-not-allowed'
                  : 'text-slate-300 hover:text-slate-100 border border-slate-600 hover:border-slate-500'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                canProceed()
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {step === STEPS.length - 1 ? 'Get Recommendations' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* Results */}
      {showResults && (
        <div className="space-y-6 animate-in">
          {/* Profile summary */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-sm text-slate-400">
            <span className="text-slate-300 font-semibold">Based on your profile:</span>{' '}
            {form.nationality} national, {INCOME_CURRENCY_SYMBOLS[incomeCurrency]}{form.income.toLocaleString()}/year income{incomeCurrency !== 'USD' ? ` (~$${incomeInUSD.toLocaleString()} USD)` : ''},
            {' '}{form.duration} stay, {form.purpose?.toLowerCase()},{' '}
            {form.budget === 'low' ? 'budget-conscious' : form.budget === 'medium' ? 'moderate budget' : 'flexible budget'}.
          </div>

          {/* Visa warning for non-exempt */}
          {needsVisaWarning && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 text-amber-300">
              <p className="font-semibold mb-1">Important: Visa Required Before Arrival</p>
              <p className="text-sm text-amber-300/80">
                As a {form.nationality} passport holder, you cannot enter Thailand without a visa.
                Apply at a Thai embassy or consulate before your trip.
              </p>
            </div>
          )}

          {/* Primary recommendation */}
          {primary && (
            <div className="bg-slate-800/50 border-2 border-cyan-500 rounded-xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg">
                BEST MATCH
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4 pr-24">{primary.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Cost</p>
                  <p className="text-slate-200 font-medium">{primary.cost}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Duration</p>
                  <p className="text-slate-200 font-medium">{primary.duration}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Key Requirement</p>
                  <p className="text-slate-200 font-medium">{primary.requirement}</p>
                </div>
              </div>
              <p className="text-slate-300 italic border-t border-slate-700 pt-4">
                &ldquo;{primary.verdict}&rdquo;
              </p>
              {primary.warning && (
                <div className="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-amber-300 text-sm">
                  <span className="mr-1">&#9888;&#65039;</span> {primary.warning}
                </div>
              )}
            </div>
          )}

          {/* Alternatives */}
          {alternatives.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Alternative Options
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {alternatives.map((alt) => (
                  <div
                    key={alt.name}
                    className="bg-slate-800/50 border border-slate-700 rounded-xl p-5"
                  >
                    <h5 className="font-semibold text-slate-200 mb-3">{alt.name}</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Cost</span>
                        <span className="text-slate-300">{alt.cost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration</span>
                        <span className="text-slate-300">{alt.duration}</span>
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm mt-3 italic">{alt.verdict}</p>
                    {alt.warning && (
                      <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 text-amber-300 text-xs">
                        <span className="mr-1">&#9888;&#65039;</span> {alt.warning}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/guide/01-visa-guide"
              className="flex-1 text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg px-6 py-3 transition-all duration-200"
            >
              Read Full Visa Guide
            </a>
            <button
              onClick={handleReset}
              className="flex-1 text-center border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-semibold rounded-lg px-6 py-3 transition-all duration-200"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-in {
          animation: fadeSlideIn 0.4s ease-out;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
