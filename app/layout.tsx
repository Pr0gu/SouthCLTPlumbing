import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1B2E4A',
};

export const metadata: Metadata = {
  title: 'Plumber South Charlotte NC | 24/7 Emergency Plumbing | South Charlotte Plumbing',
  description:
    "South Charlotte's most trusted plumber. Licensed & insured, 24/7 emergency service, upfront pricing. Serving Myers Park, Ballantyne, SouthPark, Weddington & all of South Charlotte. Call 980-405-4186.",
  keywords: [
    'plumber south charlotte nc',
    'plumber near me',
    'emergency plumber charlotte',
    'leak detection charlotte nc',
    'water heater repair charlotte',
    'drain cleaning south charlotte',
    '24/7 plumber charlotte nc',
    'plumber myers park',
    'plumber ballantyne',
    'plumber southpark charlotte',
    'licensed plumber charlotte nc',
    'sewer line repair charlotte',
    'pipe repair charlotte nc',
    'south charlotte plumbing',
  ],
  authors: [{ name: 'South Charlotte Plumbing' }],
  creator: 'South Charlotte Plumbing',
  publisher: 'South Charlotte Plumbing',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://southcharlotteplumbing.com',
    siteName: 'South Charlotte Plumbing',
    title: 'Plumber South Charlotte NC | 24/7 Emergency Plumbing | South Charlotte Plumbing',
    description:
      "South Charlotte's most trusted plumber. Licensed & insured, 24/7 emergency service, upfront pricing. Serving Myers Park, Ballantyne, SouthPark & more. Call 980-405-4186.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plumber South Charlotte NC | 24/7 Emergency Plumbing | South Charlotte Plumbing',
    description:
      "South Charlotte's most trusted plumber. Licensed & insured, 24/7 emergency plumbing. Call 980-405-4186.",
  },
  alternates: {
    canonical: 'https://southcharlotteplumbing.com',
  },
  metadataBase: new URL('https://southcharlotteplumbing.com'),
};

import StructuredData from '@/components/common/StructuredData';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-brand-gold focus:px-4 focus:py-2 focus:text-white focus:font-bold"
        >
          Skip to main content
        </a>
        {children}
        <StructuredData />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
