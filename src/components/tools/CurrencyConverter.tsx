'use client';

import { useState, useMemo, useCallback } from 'react';

// --- Types ---
interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToTHB: number; // 1 unit of this currency = X THB
}

// --- Constants ---
const CURRENCIES: CurrencyInfo[] = [
  { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭', rateToTHB: 1 },
  { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸', rateToTHB: 35 },
  { code: 'EUR', name: 'Euro', symbol: '\u20AC', flag: '🇪🇺', rateToTHB: 38 },
  { code: 'GBP', name: 'British Pound', symbol: '\u00A3', flag: '🇬🇧', rateToTHB: 44 },
  { code: 'JPY', name: 'Japanese Yen', symbol: '\u00A5', flag: '🇯🇵', rateToTHB: 0.23 },
  { code: 'KRW', name: 'Korean Won', symbol: '\u20A9', flag: '🇰🇷', rateToTHB: 0.025 },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷', rateToTHB: 6.5 },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺', rateToTHB: 22 },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦', rateToTHB: 25 },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬', rateToTHB: 26 },
];

interface QuickConvert {
  label: string;
  thb: number;
}

const QUICK_CONVERTS: QuickConvert[] = [
  { label: 'Street food meal', thb: 50 },
  { label: 'Coffee at a cafe', thb: 80 },
  { label: 'Coworking day pass', thb: 300 },
  { label: 'Thai massage (1hr)', thb: 350 },
  { label: 'Monthly gym membership', thb: 1500 },
  { label: 'Monthly rent (studio)', thb: 12000 },
];

const getCurrency = (code: string): CurrencyInfo =>
  CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];

// --- Component ---
export default function CurrencyConverter() {
  const [amount, setAmount] = useState<string>('1000');
  const [fromCode, setFromCode] = useState('THB');
  const [toCode, setToCode] = useState('USD');

  const fromCurrency = getCurrency(fromCode);
  const toCurrency = getCurrency(toCode);

  const convert = useCallback(
    (value: number, from: CurrencyInfo, to: CurrencyInfo): number => {
      // 先換算成 THB，再換算成目標幣別
      const inTHB = value * from.rateToTHB;
      return inTHB / to.rateToTHB;
    },
    []
  );

  const result = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    return convert(numAmount, fromCurrency, toCurrency);
  }, [amount, fromCurrency, toCurrency, convert]);

  const rateDisplay = useMemo(() => {
    const rate = convert(1, fromCurrency, toCurrency);
    return rate;
  }, [fromCurrency, toCurrency, convert]);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const formatNumber = (n: number): string => {
    if (n >= 1000) return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.01) return n.toFixed(4);
    return n.toFixed(6);
  };

  const handleQuickConvert = (thb: number) => {
    setFromCode('THB');
    setAmount(thb.toString());
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-2">
          Currency Converter
        </h2>
        <p className="text-slate-400">
          Quick THB conversions for your Thailand trip.
        </p>
      </div>

      {/* Converter card */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
        {/* Amount input */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-slate-300 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            step="any"
            className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-4 py-3 text-xl font-mono focus:border-cyan-500 focus:outline-none transition-all duration-200"
            placeholder="Enter amount..."
          />
        </div>

        {/* From / Swap / To */}
        <div className="flex items-center gap-3 mb-6">
          {/* From */}
          <div className="flex-1">
            <label className="block text-xs text-slate-500 mb-1.5">From</label>
            <select
              value={fromCode}
              onChange={(e) => setFromCode(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-3 py-2.5 focus:border-cyan-500 focus:outline-none transition-all duration-200"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Swap */}
          <button
            onClick={handleSwap}
            className="mt-5 w-10 h-10 rounded-full border border-slate-600 hover:border-cyan-500 flex items-center justify-center text-slate-400 hover:text-cyan-400 transition-all duration-200 flex-shrink-0"
            title="Swap currencies"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          {/* To */}
          <div className="flex-1">
            <label className="block text-xs text-slate-500 mb-1.5">To</label>
            <select
              value={toCode}
              onChange={(e) => setToCode(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 text-slate-100 rounded-lg px-3 py-2.5 focus:border-cyan-500 focus:outline-none transition-all duration-200"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code} — {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Result */}
        <div className="bg-slate-900/50 border border-slate-600 rounded-xl p-5 text-center">
          <p className="text-sm text-slate-500 mb-1">
            {fromCurrency.flag} {formatNumber(parseFloat(amount) || 0)} {fromCode} =
          </p>
          <p className="text-3xl sm:text-4xl font-bold text-cyan-400 font-mono transition-all duration-200">
            {toCurrency.symbol}{formatNumber(result)}
          </p>
          <p className="text-sm text-slate-500 mt-1">
            {toCurrency.flag} {toCurrency.name}
          </p>
        </div>

        {/* Rate display */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-1">
          <span>
            1 {fromCode} = {formatNumber(rateDisplay)} {toCode}
          </span>
          <span>
            1 {toCode} = {formatNumber(1 / rateDisplay)} {fromCode}
          </span>
        </div>
      </div>

      {/* Quick convert buttons */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">
          Quick Convert — Common Prices in Thailand
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {QUICK_CONVERTS.map((qc) => {
            const converted = convert(qc.thb, getCurrency('THB'), toCurrency);
            return (
              <button
                key={qc.label}
                onClick={() => handleQuickConvert(qc.thb)}
                className="text-left p-3 rounded-lg border border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-200 group"
              >
                <p className="text-xs text-slate-500 group-hover:text-slate-400">{qc.label}</p>
                <p className="text-sm font-semibold text-slate-200 mt-0.5">
                  {'\u0E3F'}{qc.thb.toLocaleString()}
                </p>
                {toCode !== 'THB' && (
                  <p className="text-xs text-cyan-500/70 mt-0.5">
                    {toCurrency.symbol}{formatNumber(converted)}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-600 text-center">
        Rates are approximate and for reference only. Last updated March 2026.
        Actual rates vary by exchange method (ATM, bank, street exchange).
      </p>
    </div>
  );
}
