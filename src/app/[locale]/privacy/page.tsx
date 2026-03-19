import Link from 'next/link';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export const metadata = {
  title: 'Privacy Policy — NomadReady',
  description: 'NomadReady privacy policy. Learn how we handle your data.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/privacy' },
};

export default function PrivacyPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: March 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">1. Data We Collect</h2>
            <p className="text-slate-400 leading-relaxed">
              We collect minimal data to provide our services. This includes:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 mt-2">
              <li>Email address (if you purchase a Pro license)</li>
              <li>Payment information (processed securely by Gumroad)</li>
              <li>Usage data (chat questions, page views — anonymized)</li>
              <li>License key (stored locally in your browser)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">2. How We Use Your Data</h2>
            <p className="text-slate-400 leading-relaxed">
              We use your data to:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 mt-2">
              <li>Deliver and maintain the NomadReady service</li>
              <li>Process purchases and manage your license</li>
              <li>Improve our guide content and AI assistant</li>
              <li>Send product updates (only if you opt in)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">3. Data Storage</h2>
            <p className="text-slate-400 leading-relaxed">
              Your license key and chat preferences are stored locally in your browser
              using localStorage and sessionStorage. We do not store personal data on
              our servers beyond what is necessary to process payments through Gumroad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">4. Third-Party Services</h2>
            <p className="text-slate-400 leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-slate-400 space-y-1 mt-2">
              <li>Gumroad — payment processing</li>
              <li>Vercel — hosting</li>
              <li>OpenAI — AI assistant functionality</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">5. Cookies</h2>
            <p className="text-slate-400 leading-relaxed">
              We use essential cookies only. No tracking cookies or advertising cookies
              are used. Your chat usage and license status are stored in localStorage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">6. Your Rights</h2>
            <p className="text-slate-400 leading-relaxed">
              You can clear all locally stored data by clearing your browser storage.
              To request deletion of any data associated with your purchase, contact us
              at support@nomadready.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">7. Contact</h2>
            <p className="text-slate-400 leading-relaxed">
              For any privacy-related questions, email us at{' '}
              <a href="mailto:support@nomadready.com" className="text-cyan-400 hover:text-cyan-300">
                support@nomadready.com
              </a>.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <Link href="/" className="text-cyan-400 hover:text-cyan-300 text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
