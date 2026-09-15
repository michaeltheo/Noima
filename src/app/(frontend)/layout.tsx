import type { Metadata, Viewport } from 'next'

import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { JsonLd } from '@/components/JsonLd'
import { palette } from '@/styles/tokens'
import { getServerSideURL } from '@/utilities/getURL'
import { composeDescription, organizationJsonLd, websiteJsonLd } from '@/utilities/seo'
import { cn } from '@/utilities/ui'
import { Hanken_Grotesk, Inter } from 'next/font/google'
import React from 'react'

import './globals.css'

const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

/** Mobile menu face. Variable font, so no weights are listed. */
const inter = Inter({
  subsets: ['latin', 'greek'],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(hanken.variable, inter.variable)} lang={siteConfig.locale}>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="grain">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

const defaultDescription = composeDescription(seoConfig.home.description, seoConfig.home.greek)

/**
 * Fallbacks for any page that sets less. Pages call `buildMetadata`, which
 * replaces these wholesale. No canonical here: every route would inherit it,
 * the 404 included.
 */
export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: seoConfig.home.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: defaultDescription,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    locale: 'en_US',
    title: seoConfig.home.title,
    description: defaultDescription,
    images: [seoConfig.defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    images: [seoConfig.defaultImage],
  },
}

export const viewport: Viewport = {
  themeColor: palette.cream,
}
