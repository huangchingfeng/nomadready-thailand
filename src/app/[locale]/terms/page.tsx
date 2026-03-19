import Link from 'next/link';

export async function generateStaticParams() {
  return ["en","zh-cn","es","ja","ko","zh-tw","pt","fr","de"].map(locale => ({ locale }));
}

export const metadata = {
  title: 'Terms of Service — NomadReady',
  description: 'NomadReady terms of service and usage agreement.',
  alternates: { canonical: 'https://www.nomadreadyhq.com/en/terms' },
};

export default function TermsPage() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-slate-100 mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: March 2026</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">1. Acceptance of Terms</h2>
            <p className="text-slate-400 leading-relaxed">
              By accessing and using NomadReady, you agree to be bound by these Terms
              of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">2. Description of Service</h2>
            <p className="text-slate-400 leading-relaxed">
              NomadReady provides an interactive digital nomad guide for Thailand,
              including written chapters, AI-powered tools (Visa Finder, Budget Calculator),
              an AI travel assistant, and an interactive checklist. Content is updated
              regularly but is provided for informational purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">3. Free and Pro Plans</h2>
            <p className="text-slate-400 leading-relaxed">
              Free users have access to the first 3 chapters and 5 AI assistant questions
              per day. Pro users get access to all 11 chapters, unlimited AI assistant
              usage, and all interactive tools. Pro access requires a paid license purchased
              through Gumroad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">4. Refund Policy</h2>
            <p className="text-slate-400 leading-relaxed">
              We offer a 7-day money-back guarantee on all Pro purchases. If you are not
              satisfied within 7 days of purchase, contact us for a full refund. No
              questions asked.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">5. Intellectual Property</h2>
            <p className="text-slate-400 leading-relaxed">
              All content, including text, tools, and design, is the property of
              NomadReady. You may not reproduce, distribute, or create derivative works
              from our content without written permission. Each Pro license is for a
              single user.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">6. Disclaimer</h2>
            <p className="text-slate-400 leading-relaxed">
              NomadReady provides general information about living in Thailand as a
              digital nomad. This is not legal, tax, or immigration advice. Visa policies,
              costs, and regulations change frequently. Always verify current requirements
              with official government sources and consult qualified professionals for
              legal and tax matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">7. AI Assistant Disclaimer</h2>
            <p className="text-slate-400 leading-relaxed">
              The AI travel assistant provides answers based on our guide content and may
              not always be accurate. It should not be relied upon as the sole source of
              information for important decisions. Always cross-reference with official
              sources.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">8. Limitation of Liability</h2>
            <p className="text-slate-400 leading-relaxed">
              NomadReady is provided &ldquo;as is&rdquo; without warranties of any kind.
              We are not liable for any damages arising from the use of our service or
              reliance on our content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">9. Changes to Terms</h2>
            <p className="text-slate-400 leading-relaxed">
              We reserve the right to update these terms at any time. Continued use of
              the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-200 mb-3">10. Contact</h2>
            <p className="text-slate-400 leading-relaxed">
              For any questions about these terms, email us at{' '}
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
