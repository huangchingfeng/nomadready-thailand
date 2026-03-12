import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/chat/ChatWidget';
import ThemeProvider from '@/components/ui/ThemeProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://nomadready.com'),
  title: 'NomadReady: Thailand — Interactive Digital Nomad Guide',
  description:
    'The interactive guide that saves you 40+ hours of research. Visa guides, cost breakdowns, neighborhood picks, and AI-powered tools — everything you need before you land in Thailand.',
  keywords: [
    'digital nomad',
    'Thailand',
    'visa guide',
    'cost of living',
    'Bangkok',
    'Chiang Mai',
    'remote work',
    'nomad guide',
  ],
  openGraph: {
    title: 'NomadReady: Thailand — Interactive Digital Nomad Guide',
    description:
      'Save 40+ hours of research. AI-powered tools, 11 expert chapters, and always-updated info for digital nomads in Thailand.',
    type: 'website',
    locale: 'en_US',
    url: 'https://nomadready.com',
    siteName: 'NomadReady',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NomadReady: Thailand Digital Nomad Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NomadReady: Thailand — Interactive Digital Nomad Guide',
    description:
      'Save 40+ hours of research. AI-powered tools, 11 expert chapters, and always-updated info for digital nomads in Thailand.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased min-h-screen transition-colors duration-200`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
