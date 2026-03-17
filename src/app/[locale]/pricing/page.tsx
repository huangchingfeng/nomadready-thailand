'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';


export default function PricingPage() {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'bali' | 'bundle'>('bali');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What do I get with the free plan?',
      a: 'You get full access to the first 3 chapters of any guide. Plus 5 AI assistant questions per day and the currency converter tool.',
    },
    {
      q: 'What\'s included in the Bali Guide?',
      a: 'All 12 expert chapters covering visas, cost of living, neighborhoods, coworking spaces, banking, healthcare, taxes, safety, and more. Includes lifetime access, unlimited AI assistant, and all future updates.',
    },
    {
      q: 'What\'s the Southeast Asia Bundle?',
      a: 'Get both Thailand and Bali guides at a discounted price. Perfect if you\'re planning to explore multiple countries or want maximum flexibility.',
    },
    {
      q: 'Can I upgrade later?',
      a: 'Yes! You can upgrade from a single guide to the bundle anytime. We\'ll credit your previous purchase.',
    },
    {
      q: 'How often are the guides updated?',
      a: 'We monitor visa policies, cost changes, and nomad scenes continuously. Major updates happen monthly. Policy changes are reflected within 48 hours. All lifetime purchases include free updates forever.',
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
      a: 'Yes! Vietnam, Portugal, and Mexico are in development. Bundle subscribers get early access and discounted upgrades to new country guides.',
    },
  ];

  const comparisonFeatures = [
    { feature: 'First 3 chapters per guide', free: true, single: true, bundle: true },
    { feature: 'All 12 chapters', free: false, single: '1 country', bundle: 'Thailand + Bali' },
    { feature: 'AI Travel Assistant', free: '5/day', single: 'Unlimited', bundle: 'Unlimited' },
    { feature: 'Smart Visa Finder', free: false, single: true, bundle: true },
    { feature: 'Budget Calculator', free: false, single: true, bundle: true },
    { feature: '30-day Checklist', free: false, single: true, bundle: true },
    { feature: 'Lifetime access', free: true, single: true, bundle: true },
    { feature: 'All future updates', free: true, single: true, bundle: true },
    { feature: 'Future country guides', free: false, single: false, bundle: 'Early access' },
    { feature: 'Priority support', free: false, single: true, bundle: true },
  ];

  // JSON-LD Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'NomadReady — Digital Nomad Guides for Southeast Asia',
    description: 'Interactive guides that save you 40+ hours of research. Expert chapters, AI-powered tools, budget calculator, visa finder, and 30-day action checklist for digital nomads.',
    brand: {
      '@type': 'Brand',
      name: 'NomadReady',
    },
    offers: [
      {
        '@type': 'Offer',
        name: 'Bali Digital Nomad Guide',
        price: '39.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://nomadready.gumroad.com/l/oiixgr',
      },
      {
        '@type': 'Offer',
        name: 'Southeast Asia Bundle (Thailand + Bali)',
        price: '59.00',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        availability: 'https://schema.org/InStock',
        url: 'https://nomadready.gumroad.com/l/exdzw',
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
            {' — '}Lifetime access from{' '}
            <span className="font-bold text-slate-100">$39</span>
            . Limited time.
          </p>
        </div>
      </div>

      {/* Header */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <Image
          src="/images/photos/hero-bali.jpg"
          alt="Bali rice terraces — your next remote work destination"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Start free with 3 chapters. Upgrade for complete guides to Thailand, Bali, or both.
          </p>
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
                  'First 3 chapters of any guide',
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

            {/* Bali Guide — highlighted */}
            <div className="relative bg-slate-800 border-2 border-cyan-500 rounded-2xl p-8 flex flex-col shadow-lg shadow-cyan-500/10">
              {/* Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1.5 bg-cyan-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                  🌴 Most Popular
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-2">Bali Guide</h2>
                <p className="text-sm text-slate-400">Everything you need for Bali</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-slate-100">$39</span>
              </div>
              <p className="text-sm text-emerald-400 mb-8">
                One-time payment — yours forever
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'All 12 expert chapters for Bali',
                  'Unlimited AI Travel Assistant',
                  'Smart Visa Finder tool',
                  'Budget Calculator',
                  '30-day interactive checklist',
                  'Lifetime content updates',
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
                href="https://nomadready.gumroad.com/l/oiixgr"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
              >
                Get Bali Guide — $39
              </a>
              <p className="text-center text-xs text-slate-500 mt-3">
                7-day money-back guarantee
              </p>
            </div>

            {/* Southeast Asia Bundle */}
            <div className="bg-slate-800 border border-purple-500/50 rounded-2xl p-8 flex flex-col">
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-slate-100 mb-2 flex items-center gap-2">
                  Southeast Asia Bundle
                  <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-xs font-medium rounded-full">
                    Save $19
                  </span>
                </h2>
                <p className="text-sm text-slate-400">Thailand + Bali combo</p>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-slate-100">$59</span>
                <span className="text-slate-500 line-through text-lg">$78</span>
              </div>
              <p className="text-sm text-purple-400 mb-8">
                Two countries, one price
              </p>
              <ul className="space-y-4 mb-10 flex-1">
                {[
                  'All 12 chapters for Thailand',
                  'All 12 chapters for Bali',
                  'Unlimited AI Travel Assistant',
                  'All tools for both countries',
                  '30-day checklists (both)',
                  'Lifetime updates for both',
                  'Early access to new countries',
                  'Priority support',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <svg className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://nomadready.gumroad.com/l/exdzw"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25"
              >
                Get Bundle — $59
              </a>
              <p className="text-center text-xs text-slate-500 mt-3">
                7-day money-back guarantee
              </p>
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
                  <th className="text-center text-sm font-semibold text-slate-300 px-6 py-4 w-24">
                    Free
                  </th>
                  <th className="text-center text-sm font-semibold text-cyan-400 px-6 py-4 w-28">
                    Single
                  </th>
                  <th className="text-center text-sm font-semibold text-purple-400 px-6 py-4 w-28">
                    Bundle
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
                      {row.single === true ? (
                        <svg className="w-5 h-5 text-cyan-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : row.single === false ? (
                        <svg className="w-5 h-5 text-slate-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-xs text-cyan-400 font-medium">{row.single}</span>
                      )}
                    </td>
                    <td className="text-center px-6 py-3.5">
                      {row.bundle === true ? (
                        <svg className="w-5 h-5 text-purple-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : row.bundle === false ? (
                        <svg className="w-5 h-5 text-slate-700 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <span className="text-xs text-purple-400 font-medium">{row.bundle}</span>
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
            Ready to plan your Southeast Asia move?
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-8">
            Start reading for free, or get lifetime access to expert guides.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://nomadready.gumroad.com/l/oiixgr"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
            >
              Get Bali Guide — $39
            </a>
            <a
              href="https://nomadready.gumroad.com/l/exdzw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Get Bundle — $59
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
