import type { Metadata } from 'next'

import { FindUs } from '@/components/Studio/FindUs'
import { Rental } from '@/components/Studio/Rental'
import { StudioGallery } from '@/components/Studio/StudioGallery'
import { StudioHead } from '@/components/Studio/StudioHead'
import { shots, studio } from '@/config/studio'
import { siteConfig } from '@/config/site'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import React from 'react'

export default function StudioPage() {
  return (
    <main>
      <StudioHead />
      <StudioGallery shots={shots} />
      <Rental />
      <FindUs />
    </main>
  )
}

const title = `${studio.title}, ${siteConfig.city}`

export const metadata: Metadata = {
  title,
  description: studio.lead,
  openGraph: mergeOpenGraph({ title: `${siteConfig.name} — ${title}`, description: studio.lead }),
}
