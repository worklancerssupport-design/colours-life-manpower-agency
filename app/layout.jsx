import './globals.css';
import { Plus_Jakarta_Sans, Spectral } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import SiteChrome from '@/components/SiteChrome';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import WebSiteSchema from '@/components/WebSiteSchema';
import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-spectral',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(agencyInfo.siteUrl),
  title: {
    default: fillPlaceholders(agencyInfo.seo.defaultTitle),
    template: fillPlaceholders(agencyInfo.seo.titleTemplate),
  },
  description: fillPlaceholders(agencyInfo.seo.defaultDescription),
  keywords: agencyInfo.seo.keywords,
  authors: [{ name: agencyInfo.owner, url: agencyInfo.siteUrl }],
  creator: agencyInfo.name,
  publisher: agencyInfo.name,
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
    locale: 'en_IN',
    url: agencyInfo.siteUrl,
    siteName: fillPlaceholders(agencyInfo.name),
    title: fillPlaceholders(agencyInfo.seo.ogTitle),
    description: fillPlaceholders(agencyInfo.seo.ogDescription),
    images: [
      {
        url: '/images/elderly-care-service-chennai.jpg',
        width: 1200,
        height: 896,
        alt: fillPlaceholders(agencyInfo.seo.ogImageAlt),
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: fillPlaceholders(agencyInfo.seo.twitterTitle),
    description: fillPlaceholders(agencyInfo.seo.twitterDescription),
    images: ['/images/elderly-care-service-chennai.jpg'],
  },
  alternates: {
    canonical: `${agencyInfo.siteUrl}/`,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#08152E',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${plusJakarta.variable} ${spectral.variable}`}>
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="manifest" href="/manifest.json" />
        <LocalBusinessSchema />
        <WebSiteSchema />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}