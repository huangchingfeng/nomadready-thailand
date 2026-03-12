'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly' | 'lifetime'>('lifetime');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What do I get with the free plan?',
      a: 'You get full access to the first 3 chapters: Visa Complete Guide, Cost of Living Breakdown, and Best Neighborhoods. Plus 5 AI assistant questions per day and the currency converter tool.',
    },
    {
      q: 'How long does Pro access last?',
      a: 'Monthly plans renew every 30 days. Yearly plans renew every 12 months. The Lifetime plan is a one-time purchase — pay once and keep access forever, including all future updates and new country guides.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes! Cancel anytime from your account. You\'ll keep access until the end of your current billing period. No questions asked. Lifetime plans never need cancellation — it\'s yours forever.',
    },
    {
      q: 'How often is the guide updated?',
      a: 'We monitor Thailand\'s visa policies, cost changes, and nomad scene continuously. Major updates happen monthly. Policy changes are reflected within 48 hours.',
    },
    {
      q: 'Is this just a PDF?',
      a: 'No. NomadReady is an interactive web platform with AI-powered tools (Visa Finder, Budget Calculator), a 30-day tracking checklist, and an AI travel assistant. It\'s much more than a static guide.',
    },
    {
      q: 'Do you offer refunds?',
      a: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied, just email us within 7 days of purchase for a full refund.',
    },
    {
      q: 'Can I share my account?',
      a: 'Each license is for a single user. We offer team pricing for groups of 5+ — contact us for details.',
    },
    {
      q: 'Will there be guides for other countries?',
      a: 'Yes! Portugal, Mexico, and Bali are in development. Lifetime subscribers get all future country guides included at no extra cost.',
    },
  ];

  const comparisonFeatures = [
    { feature: 'Chapters 1-3 (Visa, Cost, Neighborhoods)', free: true, pro: true },
    { feature: 'Chapters 4-10 (Coworking, Banking, Tax, etc.)', free: false, pro: true },
    { feature: 'Bonus: 30-Day Action Checklist', free: false, pro: true },
    { feature: 'AI Travel Assistant', free: '5/day', pro: 'Unlimited' },
    { feature: 'Smart Visa Finder tool', free: false, pro: true },
    { feature: 'Budget Calculator', free: false, pro: true },
    { feature: 'Interactive Checklist tracker', free: false, pro: true },
    { feature: 'Currency Converter', free: true, pro: true },
    { feature: 'Content updates', free: true, pro: true },
    { feature: 'All future country guides', free: false, pro: 'Lifetime only' },
    { feature: 'Priority support', free: false, pro: true },
  ];

  // JSON-LD Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NomadReady Pro — Thailand Digital Nomad Guide',
    description: 'The interactive guide that saves you 40+ hours of research. 11 expert chapters, AI-powered tools, budget calculator, visa finder, and 30-day action checklist for digital nomads moving to Thailand.',
    brand: {
      '@type': 'Brand',
      name: 'NomadReady',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Monthly',
        price: '9.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://nomadready.gumroad.com/l/pro',
      },
      {
        '@type': 'Offer',
        name: 'Yearly',
        price: '69.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://nomadready.gumroad.com/l/pro',
      },
      {
        '@type': 'Offer',
        name: 'Lifetime',
        price: '39.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://nomadready.gumroad.com/l/lifetime',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
    },
  };

  // JSON-LD FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-slate-950 min-h-screen">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Launch pricing urgency banner */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-cyan-500/10 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-center">
          <p className="text-sm text-slate-300">
            <span className="mr-2">🚀</span>
            <span className="font-semibold text-cyan-400">Launch Special</span>
            {' — '}Lifetime access at{' '}
            <span className="font-bold text-slate-100">$39</span>
            <span className="text-slate-500 line-through ml-1">$79</span>
            . Limited time.
          </p>
        </div>
      </div>

      {/* Header */}
      <section className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Start free with 3 chapters. Upgrade to Pro for the complete Thailand toolkit.
          </p>
        </div>
      </section>

      {/* Billing toggle — 3 options */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Yearly
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                Save 36%
              </span>
            </button>
            <button
              onClick={() => setBillingCycle('lifetime')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'lifetime'
                  ? 'bg-slate-800 text-slate-100'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              Lifetime
              <span className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full">
                Best Value
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">Free</h2>
                <p className="text-sm text-slate-400">Perfect for getting started</p>
              </div>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-slate-100">$0</span>
                <span className="text-slate-500">forever</span>
              </div>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'First 3 expert chapters',
                  'AI Travel Assistant (5 questions/day)',
                  'Currency converter tool',
                  'Content updates included',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <svg className="w-5 h-5 text-slate-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/guide"
                className="block w-full text-center px-6 py-3.5 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-medium rounded-lg transition-all duration-200"
              >
                Read Free Chapters
              </Link>
            </div>

            {/* Lifetime — highlighted */}
            <div className="relative bg-slate-800 border-2 border-cyan-500 rounded-2xl p-8 flex flex-col shadow-lg shadow-cyan-500/10">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                  Most Popular — One-Time Payment
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">Lifetime</h2>
                <p className="text-sm text-slate-400">Pay once, yours forever</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-slate-100">$39</span>
                <span className="text-slate-500 line-through text-lg">$79</span>
              </div>
              <p className="text-sm text-emerald-400 mb-8">
                One-time payment — no recurring fees
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'All 11 expert chapters',
                  'Unlimited AI Travel Assistant',
                  'Smart Visa Finder tool',
                  'Budget Calculator',
                  '30-day interactive checklist',
                  'Lifetime content updates',
                  'All future country guides included',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <svg className="w-5 h-5 text-cyan-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://nomadready.gumroad.com/l/lifetime"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
              >
                Get Lifetime Access — $39
              </a>
              <p className="text-center text-xs text-slate-500 mt-3">
                7-day money-back guarantee
              </p>
            </div>

            {/* Pro (Monthly/Yearly) */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">Pro</h2>
                <p className="text-sm text-slate-400">Flexible subscription</p>
              </div>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl font-bold text-slate-100">
                  {billingCycle === 'monthly' ? '$9' : billingCycle === 'yearly' ? '$69' : '$9'}
                </span>
                <span className="text-slate-500">
                  /{billingCycle === 'yearly' ? 'year' : 'month'}
                </span>
              </div>
              {billingCycle === 'yearly' ? (
                <p className="text-sm text-slate-500 mb-8">
                  That&apos;s just $5.75/month
                </p>
              ) : billingCycle === 'monthly' ? (
                <p className="text-sm text-slate-500 mb-8">
                  or $69/year (save 36%)
                </p>
              ) : (
                <p className="text-sm text-slate-500 mb-8">
                  Starting at $9/month or $69/year
                </p>
              )}
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'All 11 expert chapters',
                  'Smart Visa Finder tool',
                  'Budget Calculator',
                  '30-day interactive checklist',
                  'AI Travel Assistant (unlimited)',
                  'Content updates while subscribed',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <svg className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://nomadready.gumroad.com/l/pro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-medium rounded-lg transition-all duration-200"
              >
                Subscribe to Pro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-100 text-center mb-10">
            Feature comparison
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-800">
                  <th className="text-left text-sm font-semibold text-slate-300 px-6 py-4">
                    Feature
                  </th>
                  <th className="text-center text-sm font-semibold text-slate-300 px-6 py-4 w-28">
                    Free
                  </th>
                  <th className="text-center text-sm font-semibold text-cyan-400 px-6 py-4 w-28">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-700/50 ${
                      i % 2 === 0 ? 'bg-slate-800/30' : ''
                    }`}
                  >
                    <td className="text-sm text-slate-400 px-6 py-3.5">{row.feature}</td>
                    <td className="text-center px-6 py-3.5">
                      {row.free === true ? (
                        <svg className="w-5 h-5 text-slate-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : row.free === false ? (
                        <svg className="w-5 h-5 text-slate-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-xs text-slate-500">{row.free}</span>
                      )}
                    </td>
                    <td className="text-center px-6 py-3.5">
                      {row.pro === true ? (
                        <svg className="w-5 h-5 text-cyan-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-xs text-cyan-400 font-medium">{row.pro}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-100 text-center mb-10">
            Frequently asked questions
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium text-slate-200 pr-4">{faq.q}</span>
                  <svg
                    className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4">
                    <p className="text-sm text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">
            Ready to plan your Thailand move?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Start reading for free, or get lifetime access for one payment of $39.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://nomadready.gumroad.com/l/lifetime"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
            >
              Get Lifetime Access — $39
            </a>
            <Link
              href="/guide"
              className="px-8 py-3.5 border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-medium rounded-lg transition-all duration-200"
            >
              Read Free Chapters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
