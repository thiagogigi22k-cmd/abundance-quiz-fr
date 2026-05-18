import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import UtmifyScripts from '@/components/utmify-scripts'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'The Age Of Abundance',
  description: 'Begin your manifestation journey',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-sans antialiased bg-[#0a0a0a] text-[#f5f5f5]" suppressHydrationWarning>
        {children}
        <Analytics />
        <UtmifyScripts />
      </body>
    </html>
  )
}
