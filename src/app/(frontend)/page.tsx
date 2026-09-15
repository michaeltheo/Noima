import type { Metadata } from 'next'

import { Contact } from '@/components/Home/Contact'
import { Hero } from '@/components/Home/Hero'
import { Philosophy } from '@/components/Home/Philosophy'
import { Pillars } from '@/components/Home/Pillars'
import { seoConfig } from '@/config/seo'
import { buildMetadata, composeDescription } from '@/utilities/seo'
import React from 'react'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Pillars />
      <Philosophy />
      <Contact />
    </main>
  )
}

export const metadata: Metadata = buildMetadata({
  // Already names the brand, so it skips the "— NOIMA" template.
  title: seoConfig.home.title,
  absoluteTitle: true,
  description: composeDescription(seoConfig.home.description, seoConfig.home.greek),
  path: '/',
})
