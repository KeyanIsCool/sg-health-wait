import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EmergencyBanner from '@/components/EmergencyBanner';
import MobileNav from '@/components/MobileNav';
import ReminderWorkerMount from '@/components/ReminderWorkerMount';
import ThemeScript from '@/components/ThemeScript';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SG Health Wait — Singapore healthcare wait times & nearby A&E, polyclinics, GPs',
    template: '%s · SG Health Wait',
  },
  description: 'Compare Singapore hospitals, A&E departments, polyclinics and GPs. Live estimated wait times, nearest facilities, polyclinic appointment reminders.',
  openGraph: { siteName: 'SG Health Wait', type: 'website', locale: 'en_SG' },
  twitter: { card: 'summary_large_image' },
  manifest: '/manifest.webmanifest',
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbfbfd' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0f1a' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  return (
    <html lang="en-SG" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeScript />
        <a href="#main" className="skip-link">Skip to main content</a>
        <EmergencyBanner />
        <Header />
        <main id="main" className="flex-1 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileNav />
        <ReminderWorkerMount />
        {adsenseClient ? (
          <Script async strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
            crossOrigin="anonymous" />
        ) : null}
      </body>
    </html>
  );
}
