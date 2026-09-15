import type { Metadata } from 'next'

import { JsonLd } from '@/components/JsonLd'
import { FindUs } from '@/components/Studio/FindUs'
import { Rental } from '@/components/Studio/Rental'
import { StudioGallery } from '@/components/Studio/StudioGallery'
import { StudioHead } from '@/components/Studio/StudioHead'
import { seoConfig } from '@/config/seo'
import { siteConfig } from '@/config/site'
import { facts, rates, shots, studio } from '@/config/studio'
import {
  breadcrumbJsonLd,
  buildMetadata,
  composeDescription,
  studioJsonLd,
} from '@/utilities/seo'
import React from 'react'

export default function StudioPage() {
  return (
    <main>
      <JsonLd
        data={[
          studioJsonLd(),
          breadcrumbJsonLd([
            { name: siteConfig.name, path: '/' },
            { name: studio.title, path: '/studio' },
          ]),
        ]}
      />
      <StudioHead />
      <StudioGallery shots={shots} />
      <Rental />
      <FindUs />
    </main>
  )
}

const factValue = (label: string) => facts.find((fact) => fact.label === label)?.value

/**
 * Opens on the exact phrase people search — "photography studio in
 * Thessaloniki" — and pulls size and price from the studio config, so the
 * description cannot drift from the page.
 */
const description = composeDescription(
  `Photography studio in ${siteConfig.city} for rent — ${factValue('Shooting floor')}, ${factValue('Backdrop wall')} backdrop wall, strobes. From ${rates[0]?.price}${rates[0]?.unit.replace(/\s+/g, '')}.`,
  seoConfig.studio.greek,
)

export const metadata: Metadata = buildMetadata({
  title: seoConfig.studio.title,
  description,
  path: '/studio',
})
