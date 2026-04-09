import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import { CookieConsent } from '@/components/cookie-consent'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
})

export const metadata: Metadata = {
  title: 'Paw & Co. Boutique | Exklusiver Tierbedarf & Luxus Hundebetten',
  description: 'Entdecken Sie exklusiven Premium-Tierbedarf bei Paw & Co. Boutique. Handgefertigte Luxus Hundebetten, edle Lederhalsbänder und nachhaltiges Zubehör. Designed in Germany.',
  generator: 'v0.app',
  keywords: [
    'Tierbedarf Luxus', 
    'Exklusive Hundebetten', 
    'Lederhalsbänder Hund', 
    'Premium Katzenzubehör', 
    'Hundezubehör Deutschland', 
    'Paw & Co Boutique',
    'Nachhaltiges Tierzubehör'
  ],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-mono antialiased">
        {children}
        <CookieConsent />
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
