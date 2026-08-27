import type { Block } from 'payload'

/**
 * Gallery items are blocks rather than one polymorphic media array so that a
 * video carries the fields it actually needs — a poster (there is no transcode
 * step to generate one) and a playback mode — without dangling those fields on
 * every image.
 */

const span = {
  name: 'span',
  type: 'select' as const,
  defaultValue: 'full',
  options: [
    { label: 'Full width', value: 'full' },
    { label: 'Half width', value: 'half' },
    { label: 'One third', value: 'third' },
  ],
  admin: { description: 'How much of the row this item occupies on desktop.' },
}

const caption = {
  name: 'caption',
  type: 'text' as const,
  admin: { description: 'Optional line shown beneath the item.' },
}

export const GalleryImageBlock: Block = {
  slug: 'galleryImage',
  interfaceName: 'GalleryImageBlock',
  labels: { singular: 'Image', plural: 'Images' },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: { mimeType: { contains: 'image' } },
    },
    caption,
    span,
  ],
}

export const GalleryVideoBlock: Block = {
  slug: 'galleryVideo',
  interfaceName: 'GalleryVideoBlock',
  labels: { singular: 'Video', plural: 'Videos' },
  fields: [
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: { mimeType: { contains: 'video' } },
      admin: { description: 'MP4 (H.264) plays everywhere. Keep it web-optimised.' },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description:
          'Still shown before playback. Required because uploaded video is not transcoded, so no frame can be generated automatically.',
      },
    },
    {
      name: 'playback',
      type: 'select',
      required: true,
      defaultValue: 'loop',
      options: [
        { label: 'Silent loop — plays automatically, no controls', value: 'loop' },
        { label: 'Player — poster, play button and sound', value: 'player' },
      ],
    },
    caption,
    span,
  ],
}

export const galleryBlocks = [GalleryImageBlock, GalleryVideoBlock]
