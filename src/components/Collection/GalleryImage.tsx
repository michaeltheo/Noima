import type { GalleryImageBlock } from '@/payload-types'

import { Media } from '@/components/Media'
import { Reveal } from '@/components/primitives/Reveal'
import { cn } from '@/utilities/ui'
import React from 'react'

const columnClass: Record<string, string> = {
  '1': 'md:grid-cols-1',
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
}

/** `natural` uses CSS multi-column so each photo keeps its own shape. */
const masonryClass: Record<string, string> = {
  '1': 'md:columns-1',
  '2': 'md:columns-2',
  '3': 'md:columns-3',
}

const aspectClass: Record<string, string> = {
  square: 'aspect-square',
  portrait: 'aspect-4/5',
  landscape: 'aspect-3/2',
}

/** Sizes hint so Next requests a sensibly scaled file per column count. */
const sizesFor = (columns: string) =>
  columns === '1' ? '100vw' : `(max-width: 768px) 100vw, ${Math.round(100 / Number(columns))}vw`

export const GalleryImage: React.FC<{ block: GalleryImageBlock }> = ({ block }) => {
  // Depth-limited queries can return bare IDs; only populated docs can render.
  const images = (block.images ?? []).filter(
    (image): image is Exclude<typeof image, number> => typeof image === 'object' && image !== null,
  )
  if (!images.length) return null

  const columns = block.columns ?? '3'
  const aspect = block.aspect ?? 'natural'
  const sizes = sizesFor(columns)

  return (
    <Reveal as="figure">
      {aspect === 'natural' ? (
        <div className={cn('columns-1 gap-sm', masonryClass[columns])}>
          {images.map((image) => (
            <div key={image.id} className="mb-sm break-inside-avoid overflow-hidden rounded-[4px]">
              <Media resource={image} size={sizes} imgClassName="w-full h-auto" />
            </div>
          ))}
        </div>
      ) : (
        <div className={cn('grid grid-cols-1 gap-sm', columnClass[columns])}>
          {images.map((image) => (
            <div
              key={image.id}
              className={cn('relative w-full overflow-hidden rounded-[4px]', aspectClass[aspect])}
            >
              <Media resource={image} fill size={sizes} imgClassName="object-cover" />
            </div>
          ))}
        </div>
      )}

      {block.caption && (
        <figcaption className="mt-3 text-body-sm text-espresso-soft">{block.caption}</figcaption>
      )}
    </Reveal>
  )
}
