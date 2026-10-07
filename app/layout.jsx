import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileStickyBar from '@/components/MobileStickyBar';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import agencyInfo from '@/data/agency.json';

export const metadata = {
  metadataBase: new URL(agencyInfo.siteUrl),
  title: {
    default: "Manpower Agency in Thoraipakkam, Chennai | Colours Life Manpower Agency",
    template: "%s | Colours Life Manpower Agency"
  },
  description: "Colours Life Manpower Agency provides trusted cooks, maids, baby care, newborn care, elderly care, patient care, Brahmin cooks, and drivers in Okkiyam Thoraipakkam, OMR, and Chennai.",
  keywords: [
    "manpower agency near me",
    "manpower agency in Thoraipakkam",
    "manpower agency in Okkiyam Thoraipakkam",
    "manpower agency in Chennai",
    "manpower agency near OMR",
    "domestic help agency in Chennai",
    "maid agency in Thoraipakkam",
    "maid service in Thoraipakkam",
    "cook agency in Chennai",
    "cook service in Thoraipakkam",
    "Brahmin cook service in Chennai",
    "baby care service in Chennai",
    "newborn baby care in Chennai",
    "elderly care service in Chennai",
    "patient care service in Chennai",
    "driver service in Chennai",
    "domestic workers in Chennai",
    "home care services in Chennai"
  ],
  authors: [{ name: "Thomas R", url: agencyInfo.siteUrl }],
  creator: "Colours Life Manpower Agency",
  publisher: "Colours Life Manpower Agency",
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
    siteName: 'Colours Life Manpower Agency',
    title: "Manpower Agency in Thoraipakkam | Colours Life Manpower Agency",
    description: "Colours Life Manpower Agency provides cooks, maids, baby care, newborn care, elderly care, patient care, Brahmin cooks and drivers in Thoraipakkam and Chennai.",
    images: [
      {
        url: '/images/hero-chennai-manpower.jpg',
        width: 1200,
        height: 675,
        alt: 'Colours Life Manpower Agency - Domestic Staff and Caregivers in Chennai',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Colours Life Manpower Agency - Domestic Help in Chennai",
    description: "Cooks, maids, baby care, newborn care, elderly caregivers, patient care, Brahmin cooks and drivers in Chennai & Thoraipakkam.",
    images: ['/images/hero-chennai-manpower.jpg'],
  },
  alternates: {
    canonical: agencyInfo.siteUrl,
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <LocalBusinessSchema />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
