import type { Collection } from '@/payload-types'

import { Container } from '@/components/primitives/Container'
import React from 'react'

import { GalleryImage } from './GalleryImage'
import { GalleryVideo } from './GalleryVideo'
import type { GalleryType } from './GalleryFilter'

/**
 * A vertical stack of blocks; each block lays its own contents out.
 * `type` narrows to just the photo or just the video blocks.
 */
export const Gallery: React.FC<{ items: Collection['gallery']; type?: GalleryType }> = ({
  items,
  type,
}) => {
  const wanted = type === 'videos' ? 'galleryVideo' : type === 'photos' ? 'galleryImage' : null
  const blocks = wanted ? (items ?? []).filter((item) => item.blockType === wanted) : (items ?? [])

  if (!blocks.length) return null

  return (
    <section className="pb-2xl md:pb-3xl">
      <Container size="page">
        <div className="flex flex-col gap-lg">
          {blocks.map((item, i) =>
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
