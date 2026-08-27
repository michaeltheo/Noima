import type { Metadata, Viewport } from 'next'

import { AdminBar } from '@/components/AdminBar'
import { siteConfig } from '@/config/site'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { palette } from '@/styles/tokens'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { cn } from '@/utilities/ui'
import { Hanken_Grotesk } from 'next/font/google'
import { draftMode } from 'next/headers'
import React from 'react'

import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(hanken.variable)} lang={siteConfig.locale}>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="grain">
        <AdminBar adminBarProps={{ preview: isEnabled }} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: `${siteConfig.name} — Lifestyle`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: mergeOpenGraph(),
}

export const viewport: Viewport = {
  themeColor: palette.cream,
}
