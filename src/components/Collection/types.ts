import type { Media } from '@/payload-types'

/**
 * One tile in the masonry. Photos and videos share the grid — a video tile
 * shows its poster with a play badge, and opens the film in the lightbox.
 */
export type GalleryItem =
  | { kind: 'photo'; key: string; media: Media }
  | { kind: 'video'; key: string; media: Media; poster: Media }

/** Alt text for a tile whose upload has none: "Aristocracy — photo 3". */
export const galleryAlt = (title: string, item: GalleryItem, index: number): string =>
  `${title} — ${item.kind === 'photo' ? 'photo' : 'film'} ${index + 1}`
