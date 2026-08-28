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
 * Photo and film totals for a collection.
 *
 * `legacyGallery` covers collections that have not been through
 * `scripts/migrate-gallery.ts` yet; drop it with the legacy field.
 */
export const galleryCounts = (collection: Collection): { photos: number; videos: number } => {
  const legacy = legacyGallery(collection)

  return {
    photos: (collection.photos?.length ?? 0) + legacy.photos.length,
    videos: (collection.videos?.length ?? 0) + legacy.videos.length,
  }
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

/** Flattens the retired block builder into the same shape the flat fields have. */
const legacyGallery = (
  collection: Collection,
): { photos: Media[]; videos: { video: Media; poster: Media }[] } => {
  const photos: Media[] = []
  const videos: { video: Media; poster: Media }[] = []

  for (const block of collection.gallery ?? []) {
    if (block.blockType === 'galleryImage') {
      for (const image of block.images ?? []) if (populated(image)) photos.push(image)
    } else if (populated(block.video) && populated(block.poster)) {
      videos.push({ video: block.video, poster: block.poster })
    }
  }

  return { photos, videos }
}

/**
 * The ordered list of tiles for one tab of an album.
 *
 * The design renders a single continuous masonry, and photos and films live on
 * separate tabs, so each field maps straight onto its own sequence.
 */
export const galleryItems = (collection: Collection, type: 'photos' | 'videos'): GalleryItem[] => {
  const legacy = legacyGallery(collection)

  if (type === 'photos') {
    const photos = [...(collection.photos ?? []).filter(populated), ...legacy.photos]
    return photos.map((media, i) => ({ kind: 'photo', key: `photo-${i}-${media.id}`, media }))
  }

  const videos = [
    ...(collection.videos ?? []).flatMap(({ video, poster }) =>
      populated(video) && populated(poster) ? [{ video, poster }] : [],
    ),
    ...legacy.videos,
  ]

  return videos.map(({ video, poster }, i) => ({
    kind: 'video',
    key: `video-${i}-${video.id}`,
    media: video,
    poster,
  }))
}
