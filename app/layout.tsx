import { Analytics } from '@vercel/analytics/next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

// One family for the whole site; hierarchy comes from size and weight.
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-arabic',
})

export const metadata: Metadata = {
  title: 'ميثاق | للمحاماة والاستشارات القانونية - ثقة نادرة وأثر يدوم',
  description: 'مكتب ميثاق للمحاماة والاستشارات القانونية — صرح قانوني رائد يقدم نخبة من كبار المحامين للدفاع الحازم والاستشارات الاستراتيجية في مصر والعالم العربي.',
  icons: {
    icon: '/images/monogram.png',
    apple: '/images/monogram.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={plexArabic.variable}>
      <body className="bg-paper font-sans text-ink antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
