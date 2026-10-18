import { Analytics } from '@vercel/analytics/next'
import { Cairo } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const cairo = Cairo({ subsets: ['arabic'], display: 'swap', variable: '--font-cairo' })

export const metadata: Metadata = {
  title: 'ميثاق | للمحاماة والاستشارات القانونية',
  description: 'مكتب ميثاق للمحاماة والاستشارات القانونية — خبرة قانونية تحمي حقوقك.',
  generator: 'v0.app',
  icons: { icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Monogram-gaK9wq3aY28oLJP5OAHhDpqtxabKdq.png' },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1a2e',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body className={`${cairo.className} ${cairo.variable} antialiased`}>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
