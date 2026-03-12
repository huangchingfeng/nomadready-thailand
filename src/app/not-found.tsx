import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-cyan-500/20 mb-4">404</div>
        <h1 className="text-3xl font-bold text-slate-100 mb-3">
          Page not found
        </h1>
        <p className="text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-cyan-500/25"
          >
            Back to Home
          </Link>
          <Link
            href="/guide"
            className="px-6 py-3 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-slate-100 font-medium rounded-lg transition-all duration-200"
          >
            Read the Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
