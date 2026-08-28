import type { Field } from 'payload'

/**
 * The retired gallery block builder, kept only so existing rows stay readable.
 *
 * Galleries are now two flat fields on `Collections` — `photos` and `videos`.
 * This field is hidden from the admin panel and exists purely so
 * `scripts/migrate-gallery.ts` can copy old block rows across. Delete it, and
 * the `collections_blocks_gallery_*` tables it owns, once every collection has
 * been migrated.
 *
 * @deprecated
 */

const legacyCaption = {
  name: 'caption',
  type: 'text' as const,
}

const LegacyImageBlock = {
  slug: 'galleryImage',
  interfaceName: 'GalleryImageBlock',
  labels: { singular: 'Images', plural: 'Image groups' },
  fields: [
    {
      name: 'images',
      type: 'upload' as const,
      relationTo: 'media' as const,
      hasMany: true,
      required: true,
    },
    {
      name: 'columns',
      type: 'select' as const,
      defaultValue: '3',
      options: [
        { label: 'One across', value: '1' },
        { label: 'Two across', value: '2' },
        { label: 'Three across', value: '3' },
      ],
    },
    {
      name: 'aspect',
      type: 'select' as const,
      defaultValue: 'natural',
      options: [
        { label: 'Natural', value: 'natural' },
        { label: 'Square', value: 'square' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Landscape', value: 'landscape' },
      ],
    },
    legacyCaption,
  ],
}

const LegacyVideoBlock = {
  slug: 'galleryVideo',
  interfaceName: 'GalleryVideoBlock',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'video',
      type: 'upload' as const,
      relationTo: 'media' as const,
      required: true,
    },
    {
      name: 'poster',
      type: 'upload' as const,
      relationTo: 'media' as const,
      required: true,
    },
    {
      name: 'playback',
      type: 'select' as const,
      defaultValue: 'loop',
      options: [
        { label: 'Silent loop', value: 'loop' },
        { label: 'Player', value: 'player' },
      ],
    },
    legacyCaption,
  ],
}

export const legacyGalleryField: Field = {
  name: 'gallery',
  type: 'blocks',
  blocks: [LegacyImageBlock, LegacyVideoBlock],
  admin: { hidden: true },
}
