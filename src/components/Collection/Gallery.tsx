import type { Collection } from '@/payload-types'

import { Container } from '@/components/primitives/Container'
import React from 'react'

import { GalleryImage } from './GalleryImage'
import { GalleryVideo } from './GalleryVideo'

/** A vertical stack of blocks; each block lays its own contents out. */
export const Gallery: React.FC<{ items: Collection['gallery'] }> = ({ items }) => {
  if (!items?.length) return null

  return (
    <section className="pb-2xl md:pb-3xl">
      <Container>
        <div className="flex flex-col gap-lg">
          {items.map((item, i) =>
            item.blockType === 'galleryImage' ? (
              <GalleryImage key={item.id ?? i} block={item} />
            ) : (
              <GalleryVideo key={item.id ?? i} block={item} />
            ),
          )}
        </div>
      </Container>
    </section>
  )
}
