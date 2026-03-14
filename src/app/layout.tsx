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
  metadataBase: new URL('https://website-zeta-vert-20.vercel.app'),
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
    url: 'https://website-zeta-vert-20.vercel.app',
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
