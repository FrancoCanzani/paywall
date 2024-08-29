import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Script from 'next/script';

const karla = Karla({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Paywall Skipper - Access News Without Limits',
    template: '%s | Paywall Skipper',
  },
  description:
    'Bypass paywalls and access premium content from various news sites and publications for free with Paywall Skipper.',
  keywords: [
    'paywall bypass',
    'free news access',
    'article reader',
    'premium content access',
  ],
  authors: [{ name: 'Franco Canzani' }],
  creator: 'Franco Canzani',
  publisher: 'Paywall Skipper',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://paywallskip.com',
    siteName: 'Paywall Skipper',
    title: 'Paywall Skipper - Access News Without Limits',
    description:
      'Access premium news content without paywalls - free and easy.',
    images: [
      {
        url: 'https://paywallskip.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Paywall Skipper - Access News Without Limits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paywall Skipper - Access News Without Limits',
    description:
      'Access premium news content without paywalls - free and easy.',
    images: ['https://paywallskip.com/opengraph-image'],
    creator: '@francocanzani',
  },
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://paywallskip.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={karla.className}>
        {children}
        <Toaster richColors />
        <Script id='schema-org' type='application/ld+json'>
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Paywall Skipper",
              "url": "https://paywallskip.com",
              "description": "Access premium news content without paywalls - free and easy.",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "All",
              "offers": {
                "@type": "Offer",
                "price": "0"
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
