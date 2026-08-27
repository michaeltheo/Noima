import type { GalleryItem } from '@/components/Collection/types'
import type { Collection, Media } from '@/payload-types'

/** The lightweight shape the category grid needs — safe to hand to a client component. */
export type CollectionSummary = {
  id: number
  title: string
  slug: string
  href: string
  description?: string | null
  cover?: Media | null
  photos: number
  videos: number
}

/**
 * Photo and video totals for a collection.
 *
 * Photos are counted across every image block, since one block now holds many
 * images; videos are one per video block.
 */
export const galleryCounts = (collection: Collection): { photos: number; videos: number } => {
  const blocks = collection.gallery ?? []

  return blocks.reduce(
    (totals, block) =>
      block.blockType === 'galleryImage'
        ? { ...totals, photos: totals.photos + (block.images?.length ?? 0) }
        : { ...totals, videos: totals.videos + 1 },
    { photos: 0, videos: 0 },
  )
}

export const toSummary = (collection: Collection, categorySlug: string): CollectionSummary => ({
  id: collection.id,
  title: collection.title,
  slug: collection.slug!,
  href: `/${categorySlug}/${collection.slug}`,
  description: collection.shortDescription,
  cover: typeof collection.coverImage === 'object' ? collection.coverImage : null,
  ...galleryCounts(collection),
})

const populated = (value: unknown): value is Media =>
  typeof value === 'object' && value !== null && 'url' in value

/**
 * Flattens the gallery blocks into a single ordered list of tiles.
 *
 * The design renders one continuous masonry rather than a stack of separately
 * laid-out blocks, so every image across every image block is pulled into the
 * same sequence.
 */
export const galleryItems = (collection: Collection, type: 'photos' | 'videos'): GalleryItem[] => {
  const blocks = collection.gallery ?? []
  const items: GalleryItem[] = []

  blocks.forEach((block, blockIndex) => {
    if (type === 'photos' && block.blockType === 'galleryImage') {
      ;(block.images ?? []).forEach((image, i) => {
        if (populated(image)) {
          items.push({ kind: 'photo', key: `${blockIndex}-${i}-${image.id}`, media: image })
        }
      })
    }

    if (type === 'videos' && block.blockType === 'galleryVideo') {
      if (populated(block.video) && populated(block.poster)) {
        items.push({
          kind: 'video',
          key: `${blockIndex}-${block.video.id}`,
          media: block.video,
          poster: block.poster,
        })
      }
    }
  })

  return items
}
