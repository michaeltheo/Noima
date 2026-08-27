import type { Metadata } from 'next'

import { Contact } from '@/components/Home/Contact'
import { Hero } from '@/components/Home/Hero'
import { Philosophy } from '@/components/Home/Philosophy'
import { Pillars } from '@/components/Home/Pillars'
import { siteConfig } from '@/config/site'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
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

export const metadata: Metadata = {
  title: `${siteConfig.name} — Lifestyle`,
  description: siteConfig.description,
  openGraph: mergeOpenGraph({
    title: `${siteConfig.name} — Lifestyle`,
    description: siteConfig.description,
  }),
}
