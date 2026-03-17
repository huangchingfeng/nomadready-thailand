import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['en', 'zh-cn', 'es', 'ja', 'ko', 'zh-tw', 'pt', 'fr', 'de'];
const DEFAULT_LOCALE = 'en';

// Paths that should NOT be locale-prefixed
const EXCLUDED_PATHS = [
  '/api/',
  '/_next/',
  '/images/',
  '/favicon',
  '/sitemap',
  '/robots',
  '/google',   // Google verification files
  '/opengraph',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (EXCLUDED_PATHS.some(p => pathname.startsWith(p)) || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Check if path already has a locale prefix
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && SUPPORTED_LOCALES.includes(firstSegment)) {
    // Already has locale — continue
    return NextResponse.next();
  }

  // No locale prefix — redirect to default locale
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all paths except static files and API
    '/((?!_next/static|_next/image|favicon.ico|images|api).*)',
  ],
};
