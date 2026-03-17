import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/components/ui/ThemeProvider';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nomadreadyhq.com'),
  title: 'NomadReady — Digital Nomad Country Guides',
  description:
    'Interactive digital nomad guides for Thailand, Bali, and more. AI-powered, always updated. Visa, cost of living, neighborhoods, coworking, banking — everything you need before you land.',
  keywords: [
    'digital nomad',
    'nomad guide',
    'Thailand',
    'Bali',
    'visa guide',
    'cost of living',
    'remote work',
    'coworking',
  ],
  openGraph: {
    title: 'NomadReady — Digital Nomad Country Guides',
    description:
      'Interactive digital nomad guides for Thailand, Bali, and more. AI-powered tools, expert chapters, always updated.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.nomadreadyhq.com',
    siteName: 'NomadReady',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomadReady — Digital Nomad Country Guides',
    description:
      'Interactive digital nomad guides for Thailand, Bali, and more. AI-powered tools, expert chapters, always updated.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen transition-colors duration-200`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
