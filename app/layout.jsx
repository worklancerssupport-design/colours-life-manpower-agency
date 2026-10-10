import './globals.css';
import SiteChrome from '@/components/SiteChrome';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import agencyInfo from '@/data/agency.json';
import { fillPlaceholders } from '@/lib/utils';

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
        height: 675,
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
    canonical: agencyInfo.siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#08152E" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <LocalBusinessSchema />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}