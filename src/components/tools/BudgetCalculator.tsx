'use client';

import { useState, useMemo } from 'react';

// --- Types ---
type City = 'Bangkok' | 'ChiangMai' | 'Phuket' | 'KohSamui' | 'KohPhangan' | 'Pattaya';
type Lifestyle = 'budget' | 'comfortable' | 'premium';
type People = '1' | '2' | 'family';
type Cooking = 'cook' | 'mixed' | 'eat-out';
type Currency = 'THB' | 'USD' | 'EUR' | 'GBP' | 'BRL' | 'AUD';

interface CityData {
  label: string;
  ranges: Record<Lifestyle, [number, number]>;
  startup: number;
}

// --- Constants ---
const CITY_DATA: Record<City, CityData> = {
  Bangkok: {
    label: 'Bangkok',
    ranges: { budget: [25000, 40000], comfortable: [50000, 85000], premium: [105000, 200000] },
    startup: 35000,
  },
  ChiangMai: {
    label: 'Chiang Mai',
    ranges: { budget: [18000, 30000], comfortable: [35000, 60000], premium: [70000, 140000] },
    startup: 22000,
  },
  Phuket: {
    label: 'Phuket',
    ranges: { budget: [28000, 42000], comfortable: [50000, 85000], premium: [105000, 200000] },
    startup: 30000,
  },
  KohSamui: {
    label: 'Koh Samui',
    ranges: { budget: [20000, 35000], comfortable: [45000, 75000], premium: [90000, 180000] },
    startup: 25000,
  },
  KohPhangan: {
    label: 'Koh Phangan',
    ranges: { budget: [18000, 30000], comfortable: [40000, 65000], premium: [80000, 160000] },
    startup: 25000,
  },
  Pattaya: {
    label: 'Pattaya',
    ranges: { budget: [18000, 32000], comfortable: [40000, 70000], premium: [85000, 170000] },
    startup: 25000,
  },
};

const CITIES = Object.keys(CITY_DATA) as City[];

const LIFESTYLE_INFO: Record<Lifestyle, { label: string; desc: string }> = {
  budget: { label: 'Budget', desc: 'Shared rooms, street food, local transport' },
  comfortable: { label: 'Comfortable', desc: 'Studio/1BR, mix of eating, motorbike' },
  premium: { label: 'Premium', desc: 'Condo, fine dining, car/grab, gym' },
};

const PEOPLE_INFO: Record<People, { label: string; multiplier: number }> = {
  '1': { label: 'Solo', multiplier: 1 },
  '2': { label: 'Couple', multiplier: 1.55 },
  'family': { label: 'Family (3+)', multiplier: 2.0 },
};

const COWORKING_ADD: Record<Lifestyle, number> = { budget: 3000, comfortable: 5000, premium: 8000 };

const THB_PER_CURRENCY: Record<Currency, number> = {
  THB: 1,
  USD: 35,
  EUR: 38,
  GBP: 44,
  BRL: 6.7,
  AUD: 23,
};

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  THB: '฿',
  USD: '$',
  EUR: '€',
  GBP: '£',
  BRL: 'R$',
  AUD: 'A$',
};

const CURRENCIES: Currency[] = ['THB', 'USD', 'EUR', 'GBP', 'BRL', 'AUD'];

// 佔比分配（百分比形式）
const BREAKDOWN_RATIOS = {
  housing: 0.40,
  food: 0.25,
  transport: 0.10,
  utilities: 0.10,
  entertainment: 0.15,
};

const BREAKDOWN_COLORS: Record<string, { bg: string; label: string }> = {
  housing: { bg: 'bg-blue-500', label: 'Housing' },
  food: { bg: 'bg-green-500', label: 'Food' },
  transport: { bg: 'bg-yellow-500', label: 'Transport' },
  utilities: { bg: 'bg-purple-500', label: 'Utilities' },
  entertainment: { bg: 'bg-pink-500', label: 'Entertainment' },
  coworking: { bg: 'bg-cyan-500', label: 'Coworking' },
};

// City comparisons per currency (thresholds in that currency's units)
const CITY_COMPARISONS: Record<string, { threshold: number; city: string }[]> = {
  USD: [
    { threshold: 1200, city: 'a small town in rural Mississippi' },
    { threshold: 1800, city: 'Boise, Idaho' },
    { threshold: 2500, city: 'Austin, Texas' },
    { threshold: 3500, city: 'Denver, Colorado' },
    { threshold: 5000, city: 'San Francisco, California' },
    { threshold: Infinity, city: 'Manhattan, New York' },
  ],
  EUR: [
    { threshold: 1000, city: 'a small town in rural Portugal' },
    { threshold: 1600, city: 'Lisbon, Portugal' },
    { threshold: 2200, city: 'Berlin, Germany' },
    { threshold: 3200, city: 'Amsterdam, Netherlands' },
    { threshold: 4500, city: 'Paris, France' },
    { threshold: Infinity, city: 'Zurich, Switzerland' },
  ],
  GBP: [
    { threshold: 900, city: 'a small town in Wales' },
    { threshold: 1400, city: 'Edinburgh, Scotland' },
    { threshold: 2000, city: 'Manchester, England' },
    { threshold: 2800, city: 'Bristol, England' },
    { threshold: 4000, city: 'Central London' },
    { threshold: Infinity, city: 'Mayfair, London' },
  ],
  BRL: [
    { threshold: 4000, city: 'a small town in the Northeast' },
    { threshold: 6000, city: 'Florianópolis' },
    { threshold: 9000, city: 'Belo Horizonte' },
    { threshold: 13000, city: 'Rio de Janeiro' },
    { threshold: 18000, city: 'São Paulo' },
    { threshold: Infinity, city: 'Jardins, São Paulo' },
  ],
  AUD: [
    { threshold: 1800, city: 'a regional town in Tasmania' },
    { threshold: 2600, city: 'Brisbane, Queensland' },
    { threshold: 3500, city: 'Melbourne, Victoria' },
    { threshold: 4500, city: 'Sydney, NSW' },
    { threshold: 6000, city: 'Bondi Beach, Sydney' },
    { threshold: Infinity, city: 'CBD Sydney penthouse territory' },
  ],
};

// --- Component ---
export default function BudgetCalculator() {
  const [city, setCity] = useState<City>('Bangkok');
  const [lifestyle, setLifestyle] = useState<Lifestyle>('comfortable');
  const [people, setPeople] = useState<People>('1');
  const [coworking, setCoworking] = useState(true);
  const [cooking, setCooking] = useState<Cooking>('mixed');
  const [includeStartup, setIncludeStartup] = useState(false);
  const [currency, setCurrency] = useState<Currency>('THB');
  const [personalIncome, setPersonalIncome] = useState<string>('');

  const calc = useMemo(() => {
    const data = CITY_DATA[city];
    const [low, high] = data.ranges[lifestyle];
    const baseBudget = Math.round((low + high) / 2);

    // 人數調整
    const multiplier = PEOPLE_INFO[people].multiplier;
    let adjusted = Math.round(baseBudget * multiplier);

    // 食物調整（只作用在食物佔比部分）
    const foodPortion = adjusted * BREAKDOWN_RATIOS.food;
    let foodAdjustment = 0;
    if (cooking === 'cook') foodAdjustment = -foodPortion * 0.15;
    if (cooking === 'eat-out') foodAdjustment = foodPortion * 0.20;
    adjusted = Math.round(adjusted + foodAdjustment);

    // Coworking
    const coworkingCost = coworking ? COWORKING_ADD[lifestyle] : 0;
    const totalMonthly = adjusted + coworkingCost;

    // 分類明細
    const baseForBreakdown = adjusted;
    const breakdown: Record<string, number> = {
      housing: Math.round(baseForBreakdown * BREAKDOWN_RATIOS.housing),
      food: Math.round(baseForBreakdown * BREAKDOWN_RATIOS.food + foodAdjustment),
      transport: Math.round(baseForBreakdown * BREAKDOWN_RATIOS.transport),
      utilities: Math.round(baseForBreakdown * BREAKDOWN_RATIOS.utilities),
      entertainment: Math.round(baseForBreakdown * BREAKDOWN_RATIOS.entertainment),
    };
    if (coworking) breakdown.coworking = coworkingCost;

    // 校正尾差
    const breakdownSum = Object.values(breakdown).reduce((a, b) => a + b, 0);
    const diff = totalMonthly - breakdownSum;
    breakdown.housing += diff;

    // Startup
    const startupCost = includeStartup ? data.startup : 0;
    const firstMonth = totalMonthly + startupCost;

    // USD equivalent (always computed for salary comparison)
    const totalUSD = Math.round(totalMonthly / THB_PER_CURRENCY.USD);

    // 佔平均美國 nomad 薪資百分比（假設 $72,000/年 = $6,000/月）
    const avgNomadMonthly = 6000;
    const percentOfSalary = Math.round((totalUSD / avgNomadMonthly) * 100);

    // Personal income percentage (if provided)
    const parsedIncome = parseFloat(personalIncome);
    const hasPersonalIncome = !isNaN(parsedIncome) && parsedIncome > 0;
    const personalMonthlyIncome = hasPersonalIncome ? parsedIncome / 12 : 0;
    // Convert personal income (entered in selected currency) to THB, then to USD for comparison
    const personalMonthlyUSD = hasPersonalIncome
      ? Math.round((personalMonthlyIncome * THB_PER_CURRENCY[currency]) / THB_PER_CURRENCY.USD)
      : 0;
    const percentOfPersonalIncome = hasPersonalIncome && personalMonthlyUSD > 0
      ? Math.round((totalUSD / personalMonthlyUSD) * 100)
      : 0;

    // Currency-aware city comparison
    const comparisonCurrency = currency === 'THB' ? 'USD' : currency;
    const totalInComparisonCurrency = Math.round(totalMonthly / THB_PER_CURRENCY[comparisonCurrency]);
    const comparisons = CITY_COMPARISONS[comparisonCurrency] || CITY_COMPARISONS.USD;
    const comparisonCity = comparisons.find((c) => totalInComparisonCurrency <= c.threshold)?.city || 'a major city';

    return {
      totalMonthly,
      totalUSD,
      breakdown,
      startupCost,
      firstMonth,
      comparisonCity,
      comparisonCurrency,
      percentOfSalary,
      hasPersonalIncome,
      percentOfPersonalIncome,
    };
  }, [city, lifestyle, people, coworking, cooking, includeStartup, currency, personalIncome]);

  const fmt = (thb: number): string => {
    if (currency === 'THB') return `฿${thb.toLocaleString()}`;
    const converted = Math.round(thb / THB_PER_CURRENCY[currency]);
    return `${CURRENCY_SYMBOLS[currency]}${converted.toLocaleString()}`;
  };

  const maxBreakdown = Math.max(...Object.values(calc.breakdown));

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          Thailand Budget Calculator
        </h2>
        <p className="text-slate-400">
          Estimate your monthly cost of living as a digital nomad in Thailand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* --- Inputs (left) --- */}
        <div className="lg:col-span-2 space-y-5">
          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">City</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value as City)}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none transition-all duration-200"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>{CITY_DATA[c].label}</option>
              ))}
            </select>
          </div>

          {/* Lifestyle */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Lifestyle Tier</label>
            <div className="space-y-2">
              {(Object.keys(LIFESTYLE_INFO) as Lifestyle[]).map((l) => (
                <label
                  key={l}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                    lifestyle === l
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="lifestyle"
                    value={l}
                    checked={lifestyle === l}
                    onChange={() => setLifestyle(l)}
                    className="mt-1 accent-cyan-500"
                  />
                  <div>
                    <p className={`font-medium ${lifestyle === l ? 'text-cyan-400' : 'text-slate-200'}`}>
                      {LIFESTYLE_INFO[l].label}
                    </p>
                    <p className="text-xs text-slate-500">{LIFESTYLE_INFO[l].desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* People */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Number of People</label>
            <div className="flex gap-2">
              {(Object.keys(PEOPLE_INFO) as People[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setPeople(p)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    people === p
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {PEOPLE_INFO[p].label}
                </button>
              ))}
            </div>
          </div>

          {/* Coworking */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Include Coworking?</label>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setCoworking(val)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    coworking === val
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {val ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>

          {/* Cooking */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">Cooking vs Eating Out</label>
            <div className="flex gap-2">
              {([
                { val: 'cook' as Cooking, label: 'Mostly Cook' },
                { val: 'mixed' as Cooking, label: 'Mixed' },
                { val: 'eat-out' as Cooking, label: 'Mostly Eat Out' },
              ]).map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setCooking(opt.val)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    cooking === opt.val
                      ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                      : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Startup costs */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeStartup}
                onChange={(e) => setIncludeStartup(e.target.checked)}
                className="accent-cyan-500 w-4 h-4"
              />
              <div>
                <span className="text-sm font-semibold text-slate-300">Include startup costs?</span>
                <p className="text-xs text-slate-500">First month extras: deposit, furnishing, SIM</p>
              </div>
            </label>
          </div>
        </div>

        {/* --- Results (right) --- */}
        <div className="lg:col-span-3 space-y-5">
          {/* Currency selector */}
          <div className="flex justify-end">
            <div className="inline-flex rounded-lg border border-slate-700 overflow-hidden flex-wrap">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
                    currency === c
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Big number */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
            <p className="text-sm text-slate-400 mb-1">Estimated Monthly Budget</p>
            <p className="text-4xl sm:text-5xl font-bold text-slate-100 transition-all duration-200">
              {fmt(calc.totalMonthly)}
            </p>
            <p className="text-slate-500 text-sm mt-2">
              {currency === 'THB'
                ? `~$${calc.totalUSD.toLocaleString()} USD`
                : `~฿${calc.totalMonthly.toLocaleString()} THB`}
              {currency !== 'THB' && currency !== 'USD' && (
                <span> / ~${calc.totalUSD.toLocaleString()} USD</span>
              )}
            </p>

            {/* Budget meter */}
            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs text-green-400">Budget</span>
              <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden relative">
                <div className="absolute inset-0 flex">
                  <div className="w-1/3 bg-green-500/20" />
                  <div className="w-1/3 bg-yellow-500/20" />
                  <div className="w-1/3 bg-red-500/20" />
                </div>
                <div
                  className={`h-full rounded-full transition-all duration-500 relative z-10 ${
                    lifestyle === 'budget'
                      ? 'bg-green-500'
                      : lifestyle === 'comfortable'
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: lifestyle === 'budget' ? '33%' : lifestyle === 'comfortable' ? '66%' : '100%',
                  }}
                />
              </div>
              <span className="text-xs text-red-400">Premium</span>
            </div>
          </div>

          {/* Breakdown bars */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
              Monthly Breakdown
            </h3>
            <div className="space-y-3">
              {Object.entries(calc.breakdown).map(([key, value]) => {
                const info = BREAKDOWN_COLORS[key];
                if (!info || value <= 0) return null;
                const pct = (value / maxBreakdown) * 100;
                return (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-300">{info.label}</span>
                      <span className="text-slate-400 font-mono">{fmt(value)}</span>
                    </div>
                    <div className="h-4 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${info.bg} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Personal income input */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <label className="block text-sm font-semibold text-slate-300 mb-2">
              Your Monthly Income <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm font-mono">{CURRENCY_SYMBOLS[currency]}</span>
              <input
                type="number"
                min={0}
                value={personalIncome}
                onChange={(e) => setPersonalIncome(e.target.value)}
                placeholder={`Annual income in ${currency}`}
                className="flex-1 bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-2.5 focus:border-cyan-500 focus:outline-none transition-all duration-200 text-sm"
              />
              <span className="text-xs text-slate-500">/year</span>
            </div>
            <p className="text-xs text-slate-500 mt-1.5">
              Enter your annual income in {currency} to see how Thailand fits your budget.
            </p>
          </div>

          {/* Comparison text */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 space-y-2">
            {calc.hasPersonalIncome ? (
              <p className="text-slate-300 text-sm">
                That is{' '}
                <span className={`font-semibold ${calc.percentOfPersonalIncome <= 40 ? 'text-green-400' : calc.percentOfPersonalIncome <= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {calc.percentOfPersonalIncome}%
                </span>{' '}
                of your monthly income.
                {calc.percentOfPersonalIncome <= 30 && ' You will have plenty of room to save!'}
                {calc.percentOfPersonalIncome > 30 && calc.percentOfPersonalIncome <= 50 && ' A comfortable ratio for most nomads.'}
                {calc.percentOfPersonalIncome > 50 && calc.percentOfPersonalIncome <= 70 && ' Consider adjusting your lifestyle tier.'}
                {calc.percentOfPersonalIncome > 70 && ' This may be tight — consider a lower tier or cheaper city.'}
              </p>
            ) : (
              <p className="text-slate-300 text-sm">
                That is{' '}
                <span className="text-cyan-400 font-semibold">{calc.percentOfSalary}%</span>{' '}
                of the average US nomad salary ($6,000/month).
              </p>
            )}
            {calc.hasPersonalIncome && (
              <p className="text-slate-400 text-xs">
                Also {calc.percentOfSalary}% of the average US nomad salary ($6,000/month).
              </p>
            )}
            <p className="text-slate-300 text-sm">
              Equivalent to living in{' '}
              <span className="text-cyan-400 font-semibold">{calc.comparisonCity}</span>.
            </p>
          </div>

          {/* Startup costs */}
          {includeStartup && (
            <div className="bg-slate-800/50 border border-amber-500/30 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-amber-300 uppercase tracking-wider mb-2">
                First Month Total
              </h3>
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="text-slate-400 text-sm">Monthly budget + startup costs</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Startup: {fmt(calc.startupCost)} (deposit, furnishing, SIM, etc.)
                  </p>
                </div>
                <p className="text-2xl font-bold text-amber-300">
                  {fmt(calc.firstMonth)}
                </p>
              </div>
            </div>
          )}

          {/* Link */}
          <a
            href="/guide/02-cost-of-living"
            className="block text-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg px-6 py-3 transition-all duration-200"
          >
            See Detailed Cost Breakdown
          </a>
        </div>
      </div>
    </div>
  );
}
