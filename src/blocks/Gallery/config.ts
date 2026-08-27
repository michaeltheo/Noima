import type { Block } from 'payload'

/**
 * A gallery is a vertical stack of blocks.
 *
 * The image block holds *many* images so an editor can drag a whole shoot in at
 * once and pick how it lays out, rather than adding one block per photo. Video
 * stays its own block because it needs a poster and a playback mode.
 */

const caption = {
  name: 'caption',
  type: 'text' as const,
  admin: { description: 'Optional line shown beneath this group.' },
}

export const GalleryImageBlock: Block = {
  slug: 'galleryImage',
  interfaceName: 'GalleryImageBlock',
  labels: { singular: 'Images', plural: 'Image groups' },
  fields: [
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      required: true,
      filterOptions: { mimeType: { contains: 'image' } },
      admin: {
        description:
          'Drag in as many photos as you like — they can be uploaded together. Drag to reorder.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'columns',
          type: 'select',
          required: true,
          defaultValue: '3',
          options: [
            { label: 'One across', value: '1' },
            { label: 'Two across', value: '2' },
            { label: 'Three across', value: '3' },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'aspect',
          type: 'select',
          required: true,
          defaultValue: 'natural',
          options: [
            { label: 'Natural — keep each photo’s own shape', value: 'natural' },
            { label: 'Square', value: 'square' },
            { label: 'Portrait', value: 'portrait' },
            { label: 'Landscape', value: 'landscape' },
          ],
          admin: { width: '50%' },
        },
      ],
    },
    caption,
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
  ],
}

export const galleryBlocks = [GalleryImageBlock, GalleryVideoBlock]
